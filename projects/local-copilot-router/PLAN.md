# Local Copilot Router — Full Plan

## One-line Goal
Build a local-first coding copilot that answers routine questions from a fine-tuned 1B model, and intelligently escalates to web search or online LLMs when it doesn't know.

---

## Stage 1: Foundation ✓ (Done)

**Tech:** Python, huggingface_hub, datasets, venv

**What was done:**
- Project scaffolded with `scripts/`, `training/`, `inference/`, `router/`, `models/`, `data/`
- Model: `openbmb/MiniCPM5-1B` (~2GB BF16) downloaded to `models/base/`
- Dataset: `ise-uiuc/Magicoder_OSS_Instruct_75K` — 10K formatted coding Q&A pairs saved to `data/datasets/magicoder_10k/`

**Achieved:** Raw materials ready for fine-tuning.

**What was learned:**
- HuggingFace snapshot downloads, dataset streaming, chat-template formatting

---

## Stage 2: Fine-Tuning (Current)

**Tech:** Unsloth, QLoRA (4-bit), SFTTrainer, TRL, transformers

**Goal:** Fine-tune MiniCPM5-1B on 10K coding instructions so it can:
- Write code from natural language descriptions
- Explain code and debug simple issues
- Follow instruction format reliably

**What will be done:**
1. Load MiniCPM5-1B in 4-bit with Unsloth's `FastLanguageModel` — fits 8GB VRAM
2. Attach LoRA adapters (rank 32) on all linear layers to learn coding patterns
3. Format Magicoder examples with the model's native chat template
4. Train with `SFTTrainer` for 1 epoch (~2500 steps)
5. Save LoRA weights + merge into a single BF16 checkpoint
6. Convert merged model to GGUF (Q8_0) for fast inference with llama.cpp

**What will be learned:**
- QLoRA: how 4-bit base + low-rank adapters works, why rank matters
- SFT: supervised fine-tuning on instruction data, loss masking, chat templates
- Unsloth: the 2x memory savings from custom Triton kernels
- GGUF conversion: quantization formats, trade-offs between size and quality

**Output:** `models/gguf/minicpm5-copilot-q8_0.gguf` (~1.1GB)

---

## Stage 3: Tool Calling & Router

**Tech:** llama.cpp, llama-cpp-python, duckduckgo_search, Playwright

**Goal:** The model can call a web search tool when it doesn't know the answer.

**How it works:**
1. User sends a query
2. The fine-tuned model generates a response
3. Router inspects the response for uncertainty signals OR detects time-sensitive keywords in the query
4. If uncertain/outdated → search the web, summarize results, and return
5. If confident → return model's answer directly

**Tool calling pattern:**
The model doesn't need special function-calling training. Instead:
- Router acts as the "tool caller" — it decides when to invoke search
- Future: fine-tune the model to emit `<search>query</search>` tokens natively

**What will be learned:**
- Router design: heuristics vs classifiers for query routing
- Web search integration: DuckDuckGo API, rate limits, result summarization
- Uncertainty detection: signal extraction from model outputs
- Tool-augmented generation: the pattern of "think → decide → act → respond"

**Output:** Working CLI copilot that can search the web.

---

## Stage 4: CLI & API

**Tech:** Python argparse/click, asyncio, OpenAI-compatible API

**Goal:** A polished CLI you can chat with, plus an API server.

**Features:**
- Interactive chat loop with streaming responses
- `/search` command to force web search
- `--mode local|online|auto` flag to control routing
- Optional OpenAI-compatible server (drop-in replacement for Copilot)

**What will be learned:**
- Streaming response handling
- Context management across multi-turn conversations
- API design patterns

---

## Stage 5: Self-Evolving (Future)

**Tech:** The same stack + evaluation harness + automated retraining

**Goal:** The model improves itself over time.

**How:**
1. Every query-response pair is logged (with router decision + user rating)
2. Hard cases (where search was needed or answer was bad) are collected
3. Periodically, new training data is synthesized from these hard cases
4. Model is re-fine-tuned automatically

**What will be learned:**
- Data flywheel design: how to close the loop from deployment → training
- Automated evaluation: judging output quality without humans
- Active learning: which examples to collect for maximum improvement

---

## Stage 6: Harnessing / Multi-Agent (Future)

**Tech:** Python asyncio, subprocess orchestration, tool definitions

**Goal:** The copilot can break down complex tasks and dispatch subtasks.

**How:**
- User says "refactor this project's auth to use JWT"
- Model plans the changes, then dispatches:
  - Agent 1: read existing auth code
  - Agent 2: generate JWT utility functions
  - Agent 3: write tests
- Orchestrator collects results and presents a unified diff

**What will be learned:**
- Multi-agent orchestration: task decomposition, dependency management
- Agent tool use: giving models read/write/exec capabilities safely
- State management across agent calls

---

## Final Project (End of Month)

A CLI tool you run in your terminal:
```
$ copilot "write a function to merge two sorted lists"
[local] Here's a merge function in Python...
```

```
$ copilot "what's the latest version of React?"
[search] According to search results, React 19 was released...
```

**Key capabilities:**
- Fine-tuned 1B model answers routine coding questions locally
- Router escalates to web search for current/latest-library questions
- Fully local: no API keys needed (except optional online LLM fallback)
- CLI and optional API server
- Portable: single GGUF file + Python wrapper

**What was learned total:**
- Fine-tuning a small language model on domain-specific data with QLoRA
- Deploying quantized models with llama.cpp
- Building a router that decides local vs external execution
- Tool calling patterns for web search integration
- Self-improvement loop design
- Multi-agent task orchestration

---

## Non-Goals
- No huge model (staying at 1B)
- No production-grade infra
- No perfect accuracy — good enough for daily use
- No cloud dependency (optional)
