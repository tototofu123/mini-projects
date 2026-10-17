# Ornith-1.0-9B

**File:** `ornith-1.0-9b-Q4_K_M.gguf` (5.63 GB)  
**Base:** Gemma 4 + Qwen3.5 | **Context:** 262K | **Vision:** No  
**Speed:** ~41 tok/s | **Online:** SWE-Bench 69.4%, Terminal-Bench 43.1% (best 9B)

## Overall Score: 6.3/10 (Rank #2)

| Aspect | Score |
|--------|-------|
| Coding Accuracy | 8.0 |
| Reasoning & Depth | 6.5 |
| Hallucination Resistance | 1.0 |
| Output Completeness | 7.0 |
| Speed & Efficiency | 9.0 |

## Best Scenarios

### 1. Automated Bug Fixing & SWE-Bench Style Tasks
- Highest SWE-Bench Verified score (69.4%) of any 9B model — beats Gemma 4-31B (52%)
- Deliberately trained on self-scaffolding RL for real-world GitHub issue resolution
- Best model in the group for autonomous patch generation

### 2. Gotcha-Aware & Edge-Case Problem Solving
- Only model to pass the "car wash" gotcha test
- Terminal-Bench 2.1 score (43.1%) demonstrates strong CLI-based debugging
- Good at detecting trick questions and edge cases in prompts

### 3. Agentic Coding Workflows (Tool Use)
- Joint RL training on scaffold + solution generation
- Designed for multi-step coding: plan → tool call → verify → iterate
- Produced good 301-line CSS with dark mode for Q4 website

## Weaknesses
- **Worst hallucination resistance** — invented boto3 APIs, fell for all 5 trick questions
- **Only 3/10 on harder benchmark** — depth issues on complex problems
- **No vision support** — text-only model
- **Output quality drops under tight token budgets**
