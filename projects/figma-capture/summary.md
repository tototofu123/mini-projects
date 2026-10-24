# OCR Model Bench — Final Summary

## Goal
Comprehensively test and rank OCR/vision models on 10 diverse images, standardize image handling, and document findings for MCP server routing decisions.

## Test Images (10 total)
| # | Content | Type |
|---|---------|------|
| 1 | Connect 4 "GAME OVER / PLAYER WINS / MAIN MENU" | Simple text overlay |
| 2 | Python Connect 4 scoring function in VS Code | Code screenshot |
| 3 | n8n workflow: Schedule → Search Summarizer → Gmail | Workflow diagram |
| 4 | AI Technical Report newsletter (Transformer arch, quantization) | Dense technical text |
| 5 | HKUST Climbing events: Speed Competition + Sisyphus Fun Day | Mixed layout (nav, events) |
| 6 | RSA encryption: x^e mod n, security notes | Math/LaTeX |
| 7 | Pascal's Triangle / Fibonacci quiz (multiple choice) | Math problem |
| 8 | "哪棵本地農產品最能代表你?" — Traditional Chinese quiz ad | CJK text |
| 9 | GitHub: "tototofu123/is-it-ai-image" repo | Repository metadata |
| 10 | Google One "Upload proof of enrolment" form | Form UI text |

## Models Tested (7 total, all via llama.cpp except PaddleOCR-VL via llama-server)

| Model | Size | Params | Backend |
|-------|------|--------|---------|
| LightOnOCR-2-1B | 639 MB | 1.0B | llama-mtmd-cli Q8_0 |
| chandra-ocr-2 | 3.1 GB | 2.0B | llama-mtmd-cli Q4_K_M |
| dots.mocr | 1.3 GB | 1.8B | llama-mtmd-cli q5_k_m |
| chandra v1 | 5.0 GB | 8.0B | llama-mtmd-cli Q4_K_M |
| olmOCR-2-7B-1025 | 4.7 GB | 7.0B | llama-mtmd-cli Q4_K_M |
| Infinity-Parser-7B | 4.7 GB | 7.0B | llama-mtmd-cli Q4_K_M |
| PaddleOCR-VL-1.6 | 935 MB | 1.6B | llama-server (port 18333) |

## Blocked (triton dependency, Linux-only)
- GRM-OCR (82.1*): requires `einops` + `triton` — no triton on Windows
- Falcon-OCR (80.3*): requires `triton` for custom CUDA kernels
- Both have no GGUF variants — only PyTorch/transformers with `trust_remote_code`

## Overall Ranking (average text similarity vs official answers)

| Rank | Model | Sim | CharAcc | WER | Halluc | AvgLen |
|------|-------|-----|---------|-----|--------|--------|
| 1 | **paddleocr-vl (1.6B)** | **0.576** | 0.145 | 1.33 | 0.47 | 986 |
| 2 | **olmocr-2-7b (7B)** | **0.564** | 0.162 | 0.97 | 0.36 | 545 |
| 3 | infinity-parser-7b (7B) | 0.494 | 0.077 | 1.52 | 0.43 | 719 |
| 4 | lightonocr-2-1b (1B) | 0.389 | 0.036 | 2.31 | 0.58 | 1022 |
| 5 | chandra-v1 (8B) | 0.379 | 0.040 | 2.07 | 0.60 | 887 |
| 6 | dots-mocr (1.8B) | 0.347 | 0.092 | 1.73 | 0.47 | 702 |
| 7 | chandra-ocr-2 (2B) | 0.149 | 0.021 | 3.44 | 0.85 | 1179 |

## Per-Image Best Model
| Image | Best Model | Sim | Notes |
|-------|-----------|-----|-------|
| 1 (Connect 4) | lightonocr-2-1b | 0.984 | Perfect extraction of simple overlay |
| 2 (Python code) | olmocr-2-7b | 0.695 | Best code fidelity |
| 3 (n8n workflow) | chandra-v1 | 0.745 | Best at diagram descriptions |
| 4 (Tech report) | infinity-parser-7b | 0.292 | All models struggled — long text |
| 5 (HKUST events) | olmocr-2-7b | 0.635 | Best layout preservation |
| 6 (RSA math) | paddleocr-vl | 0.779 | Best math text extraction |
| 7 (Pascal quiz) | olmocr-2-7b | 0.644 | Best at problem text |
| 8 (HK TC) | **paddleocr-vl** | **0.966** | Only model that reads Traditional Chinese |
| 9 (GitHub repo) | olmocr-2-7b | 0.659 | Best repo metadata extraction |
| 10 (Google One form) | paddleocr-vl | 0.700 | Best form text extraction |

## CJK Performance (image 8 — Traditional Chinese)
| Model | Sim | CharAcc |
|-------|-----|---------|
| **paddleocr-vl** | **0.966** | **0.951** |
| All 6 llama.cpp models | 0.000–0.024 | 0.000 |

All 6 llama.cpp models produce mojibake for Traditional Chinese. PaddleOCR-VL is the only working solution for CJK.

## Code/Technical Content (avg of images 2, 6, 7)
| Model | Avg Sim |
|-------|---------|
| olmocr-2-7b | 0.672 |
| infinity-parser-7b | 0.605 |
| paddleocr-vl | 0.584 |
| lightonocr-2-1b | 0.438 |

## Key Conclusions
1. **No single model dominates** — pick by use case
2. **For CJK**: PaddleOCR-VL (only option, 0.966 similarity)
3. **For code/technical**: olmOCR-2-7B (overall best technical content)
4. **For speed/complexity**: PaddleOCR-VL (1.6B, 0.7–3.2s) rivals olmOCR-2-7B (7B, slower)
5. **For simple text**: LightOnOCR-2-1B is near-perfect and fastest (1B)
6. **chandra-ocr-2** is worst across all metrics — avoid
7. **GRM-OCR and Falcon-OCR** are impossible on Windows (triton dependency)

## Recommended MCP Server Routing
- **Chinese content** → PaddleOCR-VL (port 18333)
- **Code/technical screenshots** → olmOCR-2-7B or Infinity-Parser-7B
- **Simple text** → LightOnOCR-2-1B (fastest)
- **General purpose** → olmOCR-2-7B (best balanced)

## Disk Usage
- Total cache: ~22 GB for all 7 models
- Each model: LightOnOCR (1.1 GB), chandra-ocr-2 (3.4 GB), dots.mocr (2.6 GB), chandra v1 (5.8 GB), olmOCR-2-7B (6.0 GB), Infinity-Parser-7B (5.5 GB), PaddleOCR-VL (1.8 GB)
- Images: 10 standardized PNGs in `sources/`, ~30 MB total
