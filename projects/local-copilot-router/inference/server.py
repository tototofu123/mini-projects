"""OpenAI-compatible inference via llama-server (streaming + reasoning).

llama-server exposes /v1/chat/completions with SSE streaming and
--reasoning-format deepseek which separates `reasoning_content`
(thinking) from `content` (final answer).
"""
import json, shutil, subprocess, time, urllib.request
from pathlib import Path
from typing import List, Dict, Optional, Iterator

class LocalServer:
    """Manages a llama-server process and talks to it via HTTP."""

    def __init__(self, model_path: str, host: str = "127.0.0.1", port: int = 8081,
                 n_ctx: int = 8192, n_gpu_layers: int = -1,
                 llama_server: Optional[str] = None):
        self.model_path = Path(model_path)
        self.host = host
        self.port = port
        self.n_ctx = n_ctx
        self.n_gpu_layers = n_gpu_layers
        self.llama_server = llama_server or shutil.which("llama-server")
        self.proc = None
        if self.llama_server is None:
            raise RuntimeError("llama-server not found. Install via: winget install ggml.llamacpp")

    @property
    def base_url(self) -> str:
        return f"http://{self.host}:{self.port}"

    def start(self, wait_timeout: float = 120.0) -> None:
        if self._alive():
            return
        self.proc = subprocess.Popen(
            [
                self.llama_server,
                "-m", str(self.model_path),
                "--host", self.host,
                "--port", str(self.port),
                "-c", str(self.n_ctx),
                "-ngl", str(self.n_gpu_layers),
                "--jinja",
                "--reasoning-format", "deepseek",
                "--reasoning-budget", "256",
                "--no-webui",
            ],
            stdin=subprocess.DEVNULL,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            creationflags=subprocess.CREATE_NO_WINDOW,
        )
        deadline = time.time() + wait_timeout
        while time.time() < deadline:
            if self._alive():
                print(f"[server] ready on {self.base_url}")
                return
            time.sleep(1.0)
        raise TimeoutError(f"llama-server did not start within {wait_timeout}s")

    def stop(self) -> None:
        if self.proc:
            self.proc.terminate()
            try:
                self.proc.wait(timeout=10)
            except subprocess.TimeoutExpired:
                self.proc.kill()
            self.proc = None

    def _alive(self) -> bool:
        try:
            with urllib.request.urlopen(f"{self.base_url}/health", timeout=2) as r:
                return r.status == 200
        except Exception:
            return False

    def chat(self, messages: List[Dict], max_tokens: int = 512,
             temperature: float = 0.7, stream: bool = False) -> Dict:
        """Single (non-streaming) chat completion."""
        body = {
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": False,
        }
        req = urllib.request.Request(
            f"{self.base_url}/v1/chat/completions",
            data=json.dumps(body).encode(),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=600) as r:
            data = json.loads(r.read())
        choice = data["choices"][0]["message"]
        return {
            "content": choice.get("content", ""),
            "reasoning": choice.get("reasoning_content", ""),
        }

    def chat_stream(self, messages: List[Dict], max_tokens: int = 512,
                    temperature: float = 0.7) -> Iterator[Dict]:
        """Yield SSE deltas: {"type": "reasoning"|"content", "delta": str}."""
        body = {
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": True,
        }
        req = urllib.request.Request(
            f"{self.base_url}/v1/chat/completions",
            data=json.dumps(body).encode(),
            headers={"Content-Type": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=600) as r:
            for raw in r:
                line = raw.decode("utf-8", errors="replace").strip()
                if not line.startswith("data:"):
                    continue
                payload = line[5:].strip()
                if payload == "[DONE]":
                    break
                try:
                    chunk = json.loads(payload)
                except json.JSONDecodeError:
                    continue
                delta = chunk["choices"][0].get("delta", {})
                if delta.get("reasoning_content"):
                    yield {"type": "reasoning", "delta": delta["reasoning_content"]}
                if delta.get("content"):
                    yield {"type": "content", "delta": delta["content"]}
