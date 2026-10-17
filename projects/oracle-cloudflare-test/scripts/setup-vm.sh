#!/bin/bash
# Oracle Cloud ARM VM setup script
# Run as root or with sudo on a fresh Ubuntu 22.04/24.04 ARM instance

set -e

echo "=== Updating system ==="
apt update && apt upgrade -y

echo "=== Installing build tools ==="
apt install -y cmake build-essential python3 python3-pip git curl wget

echo "=== Installing Python deps ==="
pip3 install fastapi uvicorn pydantic httpx aiosqlite joblib python-dotenv chromadb sentence-transformers

echo "=== Building llama.cpp ==="
cd /opt
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build -DGGML_NATIVE=ON
cmake --build build --config Release -j$(nproc)

echo "=== Downloading Qwen2.5 7B Q4_K_M ==="
./build/bin/llama-cli -hf ggml-org/Qwen2.5-7B-Instruct-Q4_K_M-GGUF --verbose false

echo "=== Setup complete ==="
echo "llama-server binary: /opt/llama.cpp/build/bin/llama-server"
echo "Model: ~/.cache/huggingface/hub/models--ggml-org--Qwen2.5-7B-Instruct-Q4_K_M-GGUF"
