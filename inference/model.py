"""llama.cpp inference via llama-cli subprocess."""
import shutil, subprocess
from pathlib import Path
from typing import List, Dict, Optional

class LocalModel:
    """Runs GGUF inference by shelling out to llama-cli.

    Avoids the llama-cpp-python C++ build — uses the WinGet-installed
    llama-cli binary with CUDA support.
    """

    def __init__(self, model_path: str, n_ctx: int = 4096, n_gpu_layers: int = -1,
                 llama_cli: Optional[str] = None, llama_server: Optional[str] = None):
        self.model_path = Path(model_path)
        self.n_ctx = n_ctx
        self.n_gpu_layers = n_gpu_layers
        self.llama_cli = llama_cli or shutil.which("llama-cli")
        self.llama_server = llama_server or shutil.which("llama-server")
        if self.llama_cli is None:
            raise RuntimeError("llama-cli not found. Install via: winget install ggml.llamacpp")

    def generate(self, prompt: str, max_tokens: int = 512,
                 temperature: float = 0.7, system: str = "") -> str:
        """Generate a completion for a single user prompt."""
        cmd = [
            self.llama_cli,
            "-m", str(self.model_path),
            "-c", str(self.n_ctx),
            "-ngl", str(self.n_gpu_layers),
            "-n", str(max_tokens),
            "--temp", str(temperature),
            "--no-display-prompt",
            "-no-cnv",
        ]
        if system:
            cmd += ["-sys", system]
        cmd += ["-p", prompt]

        proc = subprocess.run(
            cmd, capture_output=True, text=True, encoding="utf-8", errors="replace"
        )
        if proc.returncode != 0:
            raise RuntimeError(f"llama-cli failed ({proc.returncode}): {proc.stderr[-500:]}")
        return proc.stdout.strip()

    def chat(self, messages: List[Dict], max_tokens: int = 512,
             temperature: float = 0.7) -> str:
        """Chat completion using the model's Jinja chat template (--jinja)."""
        cmd = [
            self.llama_cli,
            "-m", str(self.model_path),
            "-c", str(self.n_ctx),
            "-ngl", str(self.n_gpu_layers),
            "-n", str(max_tokens),
            "--temp", str(temperature),
            "--no-display-prompt",
            "--jinja",
            "-no-cnv",
        ]
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            cmd += ["-p", f"<|{role}|>\n{content}\n"]

        proc = subprocess.run(
            cmd, capture_output=True, text=True, encoding="utf-8", errors="replace"
        )
        if proc.returncode != 0:
            raise RuntimeError(f"llama-cli failed ({proc.returncode}): {proc.stderr[-500:]}")
        return proc.stdout.strip()
