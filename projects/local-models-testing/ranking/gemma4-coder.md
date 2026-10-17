# Gemma4-Coder (Gemma 4 12B Coding)

**File:** `gemma4-coding-Q3_K_M.gguf` (6.09 GB)
**Base:** Google Gemma 4 12B | **Context:** 256K | **Vision:** No (encoder-free multimodal in base)
**Speed:** ~38 tok/s | **Online:** GPQA Diamond 68.7%, MMLU-Pro 82.4%, HumanEval 78.6%

## Overall Score: 6.1/10 (Rank #3)

| Aspect | Score |
|--------|-------|
| Coding Accuracy | 7.0 |
| Reasoning & Depth | 8.0 |
| Hallucination Resistance | 3.0 |
| Output Completeness | 5.5 |
| Speed & Efficiency | 7.0 |

## Best Scenarios

### 1. Hard Algorithm Problems & Competitive Programming
- Won the harder benchmark (5/10) -- best among all models
- Deep chain-of-thought reasoning before outputting code
- Only model to produce a complete Three.js castle with `</html>` closing tag

### 2. Safety-Critical Code Review & Hallucination Checking
- Best hallucination resistance in the group (refused non-existent AWS product)
- Used correct boto3 APIs where others hallucinated
- Most likely to admit "I don't know" vs inventing false answers

### 3. Tasks Requiring Complete, Self-Contained Output
- Only model to finish Q5 with `</html>` closing tag
- Good for generating runnable code that doesn't depend on external resources
- Strong at completing coding tasks within budget

## Weaknesses
- **Uneven output quality** -- Q4 output was broken (128 repeated react-refresh script tags)
- **Heavier model (12B at Q3_K_M)** -- slower inference, more VRAM
- **Only 34/40 on easy LeetCode benchmark** -- worst among all models on simple tasks
- **Q10 database system** -- failed where others passed
