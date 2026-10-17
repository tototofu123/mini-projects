"""llama.cpp inference via llama-completion subprocess.

Uses file redirection instead of capture_output: llama.cpp CUDA builds
keep the stdout pipe open on Windows, deadlocking capture-based reads.
"""
import shutil, subprocess, tempfile, os
from pathlib import Path
from typing import List, Dict, Optional

class LocalModel:
    """Runs GGUF inference by shelling out to llama-completion.

    Avoids the llama-cpp-python C++ build — uses the WinGet-installed
    llama.cpp binaries with CUDA support.
    """

    def __init__(self, model_path: str, n_ctx: int = 4096, n_gpu_layers: int = -1,
                 llama_cli: Optional[str] = None):
        self.model_path = Path(model_path)
        self.n_ctx = n_ctx
        self.n_gpu_layers = n_gpu_layers
        self.llama_cli = llama_cli or shutil.which("llama-completion")
        if self.llama_cli is None:
            raise RuntimeError("llama-completion not found. Install via: winget install ggml.llamacpp")

    def _run(self, args: List[str]) -> str:
        with tempfile.TemporaryDirectory() as td:
            out_file = os.path.join(td, "out.txt")
            with open(out_file, "w", encoding="utf-8") as fout, \
                 open(os.path.join(td, "err.txt"), "w", encoding="utf-8") as ferr, \
                 open(os.devnull, "r") as fin:
                proc = subprocess.run(
                    args,
                    stdin=fin, stdout=fout, stderr=ferr,
                    timeout=600, creationflags=subprocess.CREATE_NO_WINDOW,
                )
            with open(out_file, encoding="utf-8", errors="replace") as f:
                return f.read().strip()

    def _base_cmd(self, max_tokens: int, temperature: float) -> List[str]:
        return [
            self.llama_cli,
            "-m", str(self.model_path),
            "-c", str(self.n_ctx),
            "-ngl", str(self.n_gpu_layers),
            "-n", str(max_tokens),
            "--temp", str(temperature),
            "--no-display-prompt",
            "--reasoning", "off",
        ]

    def generate(self, prompt: str, max_tokens: int = 512,
                 temperature: float = 0.7, system: str = "") -> str:
        """Generate a completion for a single user prompt."""
        cmd = self._base_cmd(max_tokens, temperature)
        cmd += ["-no-cnv", "--skip-chat-parsing"]
        if system:
            cmd += ["-sys", system]
        cmd += ["-p", prompt]
        return self._run(cmd)

    def chat(self, messages: List[Dict], max_tokens: int = 512,
             temperature: float = 0.7) -> str:
        """Chat completion using the model's Jinja chat template (--jinja)."""
        cmd = self._base_cmd(max_tokens, temperature)
        cmd += ["--jinja", "--single-turn"]
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            cmd += ["-p", f"<|{role}|>\n{content}\n"]
        return self._run(cmd)
