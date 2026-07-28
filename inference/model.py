"""llama.cpp inference wrapper for MiniCPM5-1B."""
from pathlib import Path
from typing import Optional, List, Dict

class LocalModel:
    """Wrapper around llama.cpp for local inference."""
    
    def __init__(self, model_path: str, n_ctx: int = 4096, n_gpu_layers: int = -1):
        self.model_path = Path(model_path)
        self.n_ctx = n_ctx
        self.n_gpu_layers = n_gpu_layers
        self.llm = None
    
    def load(self):
        from llama_cpp import Llama
        self.llm = Llama(
            model_path=str(self.model_path),
            n_ctx=self.n_ctx,
            n_gpu_layers=self.n_gpu_layers,
            verbose=False,
        )
    
    def generate(self, prompt: str, max_tokens: int = 512, 
                 temperature: float = 0.7) -> str:
        if self.llm is None:
            self.load()
        response = self.llm.create_chat_completion(
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response["choices"][0]["message"]["content"]
    
    def unload(self):
        self.llm = None
