# Local Copilot Router

A local-first coding copilot that routes queries between a fine-tuned 1B-parameter local model, online LLMs (Perplexity, Bing AI), and web search. Runs a Pygame GUI on port 8081.

## Features

- **Search-first architecture** — every factual query goes to web search; the local model synthesizes grounded answers
- **Multi-source search** — DuckDuckGo, Perplexity, Bing AI with content extraction
- **Name memory** — remembers your name across sessions (`/name`, `/forget`)
- **Geo/clock** — location-aware time, weather, greeting tailoring
- **Greeting routing** — small talk stays local, factual queries search the web
- **Pygame GUI** — streaming text output, chat history, dark theme

## Quick Start

```bash
pip install -r requirements.txt
playwright install chromium

# Launch GUI (port 8081)
python copilot_gui.py

# Or use CLI
python copilot.py "what is a closure?"
python copilot.py --mode search "latest React version"
python copilot.py --interactive
```

## Stack

- Python 3.12, Unsloth, Hugging Face transformers
- llama-cpp-python for local inference (GGUF)
- DuckDuckGo search + Playwright for web scraping
- Pygame for GUI

## Architecture

```
User Query
    ↓
Router (router.py)
    ├─ Greeting? → Local response (no search)
    ├─ Name query? → Local memory
    ├─ Geo/clock? → Local utility
    └─ Factual? → Web Search → Content Extract → Model Synthesis
         ↓
    SearchClient (search.py)
    ├─ DuckDuckGo (default)
    ├─ Perplexity (online LLM)
    └─ Bing AI (online LLM)
         ↓
    LocalModel (inference/model.py)
    └─ GGUF via llama-cpp-python
         ↓
    Response (streamed to GUI)
```

## Repo Structure

```
copilot.py          CLI entry point
copilot_gui.py      Pygame GUI (port 8081)
copilot.bat         Windows launcher (CLI)
copilot_gui.bat     Windows launcher (GUI)

router/             Query routing logic
  router.py         Routing decisions, name memory, greeting handling
  search.py         DuckDuckGo + Playwright scraping
  geo.py            Location-aware time/weather

inference/          Local model inference
  model.py          GGUF loader via llama-cpp-python

training/           Fine-tuning scripts
  train.py          Unsloth fine-tuning pipeline

models/             Model files (GGUF format)
data/               Training datasets
scripts/            Utility scripts
```

## Search Sources

| Source | Type | Status |
|--------|------|--------|
| DuckDuckGo | Web search | ✅ Default |
| Perplexity | Online LLM | ✅ Working |
| Bing AI | Online LLM | ✅ Working |
| Google AI Overview | Online LLM | ❌ IP captcha blocked |

## GUI

- Streaming text output (word-by-word animation)
- Chat history (scrollable)
- Dark theme with syntax highlighting
- Auto-connects to llama-server on port 8081

## Tests

```bash
pytest tests/ -v
```

## Status

All features implemented and working. See `docs/STATUS.md` for details.
