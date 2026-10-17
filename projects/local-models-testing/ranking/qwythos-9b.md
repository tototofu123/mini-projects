# Qwythos-9B-Claude-Mythos-5-1M

**File:** `Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf` (5.63 GB)  
**Base:** Qwen3.5-9B | **Context:** 1M (YaRN) | **Vision:** Yes (mmproj)  
**Speed:** ~41 tok/s | **Online:** +34pt MMLU, +30pt gsm8k-strict over base

## Overall Score: 6.8/10 (Rank #1)

| Aspect | Score |
|--------|-------|
| Coding Accuracy | 8.0 |
| Reasoning & Depth | 6.5 |
| Hallucination Resistance | 2.0 |
| Output Completeness | 8.5 |
| Speed & Efficiency | 9.0 |

## Best Scenarios

### 1. Long-Context Document Analysis & Codebase Reasoning
- 1M token context fits entire codebases, research papers, or legal documents
- Best output/token ratio — produces rich, well-structured output without wasting tokens
- Hybrid Gated-DeltaNet attention handles long sequences efficiently

### 2. Visual + Text Multimodal Tasks
- Only model in the group with vision support (via mmproj)
- Read screenshots, diagrams, handwritten notes alongside text
- Great for document extraction, chart reading, UI screenshot analysis

### 3. Fast Everyday Coding & General Q&A
- Fastest inference tied with Ornith (~41 tok/s, no heavy thinking overhead)
- Produced the most complete HTML output (424-line full CSS climbing society page)
- Good balance of speed, quality, and versatility for daily use

## Weaknesses
- **Hallucination resistance is poor** — 0/5 trick questions refused, invented false legal standards
- **Lost the car wash gotcha** — Ornith was the only model to pass
- **Hard benchmark only 3/10** — struggles with deep algorithmic reasoning
