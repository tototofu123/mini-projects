# Oracle Cloud — HKUST Climbing Society

Personal Oracle Cloud Always Free tier setup for the climbing society's LLM and infrastructure.

## Resources (Always Free, permanent)

| Resource | Spec |
|---|---|
| Compute | 2 OCPU ARM (Ampere A1) + 12 GB RAM |
| Storage | 200 GB block volume |
| Network | 1 public IP, 50 Mbps egress |
| Database | 1 Autonomous DB (20 GB) |
| Object Storage | 20 GB |

## What Runs Here

- **llama.cpp** serving Qwen2.5 7B for climbing society chatbot
- **ChromaDB** vector store for RAG
- **FastAPI** chat API endpoint
- **Supabase read proxy** for public/private data
- **Admin CLI** for backend management

## Setup

```bash
# SSH into VM
ssh -i keys/oracle-arm-ed25519 ubuntu@<PUBLIC_IP>

# Install deps
sudo apt update && sudo apt install -y cmake build-essential python3-pip

# Build llama.cpp
cd /opt
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build -DGGML_NATIVE=ON
cmake --build build --config Release -j2

# Download model
./build/bin/llama-cli -hf ggml-org/Qwen2.5-7B-Instruct-Q4_K_M-GGUF

# Start server
./build/bin/llama-server -hf ggml-org/Qwen2.5-7B-Instruct-Q4_K_M-GGUF --port 8080
```

## Keep-Alive

Oracle reclaims idle instances (< 20% CPU/network/memory over 7 days). Set up a cron heartbeat:

```bash
# Add to crontab
*/5 * * * * curl -s http://localhost:8080/health > /dev/null 2>&1
```

## Folders

- `scripts/` — setup, deploy, heartbeat scripts
- `configs/` — nginx, systemd, env files
- `docs/` — architecture plans, notes
