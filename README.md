# Local Copilot Router

A local-first coding copilot that routes queries between a fine-tuned local model, online LLMs, and web search.

## Goal

Ship a working local coding assistant before semester starts — fast for routine tasks, smart about when to escalate.

## Status

Planning / scaffolding

## Stack

- Python, Unsloth, Hugging Face transformers
- Ollama for local inference
- DuckDuckGo search + Playwright for web fallback
- Optional: VS Code extension (stretch)

## Repo Structure

```
data/          # Training datasets
training/      # Fine-tuning scripts
inference/     # Local model inference
router/        # Query routing logic
eval/          # Evaluation benchmarks
docs/          # Planning and notes
```
