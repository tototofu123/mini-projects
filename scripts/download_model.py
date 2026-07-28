"""Download MiniCPM5-1B base model from HuggingFace."""
from huggingface_hub import snapshot_download
import os

model_id = "openbmb/MiniCPM5-1B"
local_dir = os.path.join("models", "base")

print(f"Downloading {model_id} to {local_dir}...")
os.makedirs(local_dir, exist_ok=True)

snapshot_download(
    repo_id=model_id,
    local_dir=local_dir,
    local_dir_use_symlinks=False,
    resume_download=True,
)

print(f"Done. Model saved to {local_dir}")
