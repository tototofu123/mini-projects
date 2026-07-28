# PLAN

## One-line Goal
Build a local coding copilot fine-tuned from stronger model outputs, with a router that escalates hard queries to online LLMs or search.

## MVP
1. Pick base model (Qwen2.5-Coder 1.5B)
2. Generate ~100 high-quality prompt-response pairs via strong models
3. LoRA fine-tune with Unsloth
4. Local inference via Ollama
5. Rule-based router: local vs online vs search
6. CLI demo

## Architecture

- **Data Gen:** Strong models produce examples for: bug-fix, explain, refactor, test-gen, docstring
- **Training:** LoRA/QLoRA via Unsloth on a small coder model
- **Router v1:** Token count + keyword heuristics
  - short/simple → local
  - long/complex → online LLM
  - current-info → DuckDuckGo search
- **Inference:** Ollama for local, API calls for online, Playwright for search

## Stretch Goals
- VS Code extension (LSP-compatible)
- Benchmark local vs routed accuracy
- Auto-eval on coding benchmarks

## Risks
- Synthetic data quality too low
- Fine-tune overfits to narrow patterns
- Router too naive to be useful

## Fallback
- Skip VS Code, keep terminal-only
- Keep router rule-based
- Focus on one solid local model
