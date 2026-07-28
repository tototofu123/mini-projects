# TASKS

## Stage 1: Foundation ✓
- [x] scaffold project structure
- [x] download MiniCPM5-1B model
- [x] download Magicoder dataset (10K)
- [x] create venv + install deps

## Stage 2: Fine-Tuning (Current)
- [ ] install Unsloth
- [ ] run training/train.py (fully automated)
- [ ] verify GGUF output at models/gguf/

## Stage 3: Router + Tool Calling
- [ ] implement search fallback router
- [ ] test with real queries
- [ ] tune uncertainty heuristics

## Stage 4: CLI & API
- [ ] interactive chat mode
- [ ] OpenAI-compatible server
- [ ] streaming responses

## Stage 5: Self-Evolving (Future)
- [ ] log all queries + decisions
- [ ] collect hard cases
- [ ] auto-retrain pipeline

## Stage 6: Harnessing / Multi-Agent (Future)
- [ ] task decomposition
- [ ] subtask dispatch
- [ ] result aggregation
