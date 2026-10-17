# Local Models Testing Benchmark

LLM coding benchmark evaluating 4 local 9-12B parameter models across **20 diverse questions** (10 LeetCode-style + 10 harder/diverse) covering algorithmic coding, web development, 3D graphics, hallucination resistance, and system design.

## Models

| Model | File | Size | Speed | Easy (40) | Hard (10) | **Total 50** | Rank |
|-------|------|------|-------|-----------|-----------|-------------|------|
| **Gemma4-Agentic** | gemma4-v2-Q3_K_M.gguf | 12B Q3KM (6.09 GB) | ~37 tok/s | 40/40 | 4/10 | **44 (88%)** | 4 |
| **Qwythos-9B** | Qwythos-9B-Claude-Mythos-5-1M-Q4_K_M.gguf | 9B Q4KM (5.63 GB) | ~41 tok/s | 39/40 | 3/10 | **42 (84%)** | 1 |
| **Ornith-1.0-9B** | ornith-1.0-9b-Q4_K_M.gguf | 9B Q4KM (5.63 GB) | ~41 tok/s | 37/40 | 3/10 | **40 (80%)** | 2 |
| **Gemma4-Coder** | gemma4-coding-Q3_K_M.gguf | 12B Q3KM (6.09 GB) | ~38 tok/s | 34/40 | 5/10 | **39 (78%)** | 3 |

## Quick Scenario Guide

| Need | Pick | Why |
|------|------|-----|
| **Long-context / vision / all-rounder** | **Qwythos-9B** | 1M context, vision support, fastest, best HTML output |
| **Agentic coding / SWE-bench tasks** | **Ornith-1.0-9B** | 69.4% SWE-Bench Verified, gotcha-aware, best at 9B |
| **Hard algorithms / safety review** | **Gemma4-Coder** | Won harder benchmark, best hallucination resistance |
| **Quick easy tasks / tool use** | **Gemma4-Agentic** | 100% on easy benchmark, tau2-bench optimized |

See `ranking/` folder for detailed per-model analyses, scores across 5 aspects, and pros/cons.

## Questions (Benchmark 2 — Harder)

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

- **Gemma-Coder won the harder benchmark (5/10)**, but **Gemma-Agentic won the easy one (40/40)** — no single model dominates both.
- **Hard algorithm problems expose a critical flaw**: all models burn 600+ tokens on `[Start thinking]` blocks, running out of budget before completing code.
- **Hallucination is rampant** — only Gemma4-Coder refused the non-existent product query; 0/4 models refused the AI feature or legal citation.
- **Qwythos had the best HTML output** (424-line complete CSS climbing society page) but no `</html>` closing tag.
- **Gemma-Coder produced the only complete file** with `</html>` (Three.js castle).
- **Token budget of 4096 tokens still insufficient** for complete HTML pages — 8-11KB output needed.

## Structure

```
local models testing/
├── 01-split-array/ ... 10-database-login-system/  # Per-question directories
├── ranking/                                         # Per-model rankings & scenario guides
│   ├── qwythos-9b.md
│   ├── ornith-1.0-9b.md
│   ├── gemma4-coder.md
│   └── gemma4-agentic.md
├── results.json                                     # Full structured results
├── run_benchmark.py                                 # Benchmark harness
└── README.md
```

Each question directory contains subdirectories per model with their raw `response.ext` and extracted `output.ext`.
