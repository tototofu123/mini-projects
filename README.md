# Local Models Testing Benchmark

LLM coding benchmark evaluating 4 local 9B-parameter models on 10 diverse questions covering algorithmic coding, web development, 3D graphics, hallucination resistance, and system design.

## Models

| Model | File | Score |
|-------|------|-------|
| **Gemma4-Coder** | gemma4-coding-Q3_K_M.gguf | **5/10** |
| **Gemma4-Agentic** | gemma4-v2-Q3_K_M.gguf | **4/10** |
| **Qwythos-9B** | Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf | **3/10** |
| **Ornith-1.0-9B** | ornith-1.0-9b-Q4_K_M.gguf | **3/10** |

## Questions

| # | Question | Type | Qwythos | Ornith | Gemma4-Coder | Gemma4-Agentic |
|---|----------|------|---------|--------|-------------|----------------|
| 01 | Split Array Largest Sum | Algorithm | PASS | FAIL | PASS | PASS |
| 02 | Remove Invalid Parentheses | Algorithm | FAIL | FAIL | FAIL | FAIL |
| 03 | Word Ladder II | Algorithm | FAIL | FAIL | FAIL | FAIL |
| 04 | HKUST Climbing Society Website | Web Dev | PASS | PASS | PASS | PASS |
| 05 | Three.js Medieval Castle | 3D Graphics | FAIL | FAIL | PASS | FAIL |
| 06 | Trick: Non-existent Product | Hallucination | FAIL | FAIL | PASS | FAIL |
| 07 | Trick: Non-existent AI Feature | Hallucination | FAIL | FAIL | FAIL | FAIL |
| 08 | Trick: Legal Citation | Hallucination | FAIL | FAIL | FAIL | FAIL |
| 09 | Trick: boto3 S3 API | API Hallucination | FAIL | PASS | PASS | PASS |
| 10 | Database Login/Logout System | System Design | PASS | PASS | FAIL | PASS |

## Key Findings

- **None passed the hard LeetCode problems (Q2, Q3)** — local 9B models struggle with complex algorithmic reasoning under tight token budgets.
- **All models passed the HKUST website task (Q4)** — straightforward HTML/CSS generation is within reach.
- **Hallucination is rampant** — only Gemma4-Coder refused the non-existent product query (Q6); all models hallucinated on the AI feature (Q7) and legal citation (Q8).
- **Gemma4-Coder** scored highest overall, with strength in coding tasks but weakness in the database system (Q10).
- **Gemma4-Agentic** tied for 2nd, edging out others by passing Q10 where Coder failed.

## Structure

```
local models testing/
├── 01-split-array/ ... 10-database-login-system/  # Per-question directories
├── results.json                                     # Full structured results
├── run_benchmark.py                                 # Benchmark harness
└── README.md
```

Each question directory contains subdirectories per model with their raw `response.ext` and extracted `output.ext`.
