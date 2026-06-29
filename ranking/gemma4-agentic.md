# Gemma4-Agentic (Gemma 4 12B Agentic v2)

**File:** `gemma4-v2-Q3_K_M.gguf` (6.09 GB)
**Base:** Google Gemma 4 12B | **Context:** 256K | **Vision:** No (encoder-free multimodal in base)
**Speed:** ~37 tok/s | **Online:** tau2-bench agentic optimization, base ~15% on telecom

## Overall Score: 5.6/10 (Rank #4)

| Aspect | Score |
|--------|-------|
| Coding Accuracy | 8.5 |
| Reasoning & Depth | 7.0 |
| Hallucination Resistance | 1.0 |
| Output Completeness | 6.0 |
| Speed & Efficiency | 5.5 |

## Best Scenarios

### 1. Easy & Straightforward Coding Tasks
- Won the easy LeetCode benchmark 40/40 (100%) -- flawless on simple problems
- Perfect for quick function-level coding where the task is clear
- Low error rate when the problem space is well-defined

### 2. Agentic Tool-Use Workflows
- Designed and optimized for tau2-bench agentic tool use
- Good at multi-step reasoning with tool calls (read -> plan -> execute -> verify)
- Agentic variant specifically tuned for tool orchestration

### 3. Quick Frontend Prototyping (Tailwind + Lucide)
- Produced decent 206-line Tailwind/Lucide page for Q4
- Good at combining CDN libraries (Tailwind, Lucide icons)
- Fast turnaround for simple UI mockups

## Weaknesses
- **Heaviest thinking overhead** -- burns 600+ tokens on `[Start thinking]` blocks before producing output
- **Slowest inference** ~37 tok/s with thinking overhead
- **Full hallucination** -- 0/5 trick questions detected
- **Only 4/10 on harder benchmark** -- performance degrades significantly on complex problems
- **Output frequently truncated** -- runs out of token budget due to thinking overhead
