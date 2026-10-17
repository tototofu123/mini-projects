# mini-projects

Small, self-contained experiments — games, visual toys, teaching tools, throwaway
scripts. Nothing here is a product; the point is having them somewhere findable
instead of scattered across a dozen near-empty repositories.

Each subdirectory under `projects/` is a former standalone repository. **Its full
commit history is preserved** — see [Provenance](#provenance) below.

## Live sites

| Project | Description |
| --- | --- |
| [connect4](https://tototofu123.github.io/mini-projects/connect4/) | Connect Four in Python with a terminal/UI interface |
| [fingercount](https://tototofu123.github.io/mini-projects/fingercount/) | Real-time finger-count gesture recognition (OpenCV) |
| [char-to-bitmap](https://tototofu123.github.io/mini-projects/char-to-bitmap/) | Render text as high-resolution bitmap typography |
| [shell-basics](https://tototofu123.github.io/mini-projects/shell-basics/) | Interactive shell-command teaching tool |

## Everything else

**Games**
- [`barricade-game`](projects/barricade-game) — Barricade (Malefiz) with Gemini-powered AI opponents

**Python experiments**
- [`sketchbook-python-lab2`](projects/sketchbook-python-lab2-10102023) — Turtle-based CLI drawing
- [`fourier_draw`](projects/fourier_draw) — Discrete Fourier Transform epicycle drawing engine
- [`time-encrypt`](projects/time-encrypt) — Time-based key derivation and XOR ciphers
- [`local-models-testing`](projects/local-models-testing) — LLM coding benchmark, 4 models × 10 questions

**Tooling**
- [`local-copilot-router`](projects/local-copilot-router) — Routes prompts across local LLM runtimes
- [`svg-migration-script`](projects/svg-migration-script) — Batch metadata + dedup for large SVG icon libraries
- [`npm-cwd-guard-skill`](projects/npm-cwd-guard-skill) — Agent skill enforcing correct working-directory resolution
- [`exampledemo`](projects/exampledemo) — Triggers automated updates to the public repo blog hub

## Provenance

These were separate public repositories. They were merged here on 2026-10-17 with
`git subtree add`, which relocates each tree under `projects/<name>/` **and brings
across every commit**. Nothing was squashed or rewritten — each project's original
branch tip is still an ancestor of `main`, so `git log --follow` traces any file
back to the repository it came from.

To see one project's original standalone history:

```bash
git log --oneline --follow projects/connect4/connect4.py
```

Former repositories, retained (not deleted):

| Was | Now |
| --- | --- |
| `tototofu123/connect4` | `projects/connect4` |
| `tototofu123/fingercount` | `projects/fingercount` |
| `tototofu123/char-to-bitmap` | `projects/char-to-bitmap` |
| `tototofu123/shell-basics` | `projects/shell-basics` |
| `tototofu123/barricade-game` | `projects/barricade-game` |
| `tototofu123/sketchbook-python-lab2-10102023` | `projects/sketchbook-python-lab2-10102023` |
| `tototofu123/fourier_draw` | `projects/fourier_draw` |
| `tototofu123/time-encrypt` | `projects/time-encrypt` |
| `tototofu123/svg-migration-script` | `projects/svg-migration-script` |
| `tototofu123/local-models-testing` | `projects/local-models-testing` |
| `tototofu123/local-copilot-router` | `projects/local-copilot-router` |
| `tototofu123/exampledemo` | `projects/exampledemo` |
| `tototofu123/npm-cwd-guard-skill` | `projects/npm-cwd-guard-skill` |

## License

Varies per project — see each subdirectory. Where a project has no explicit
license, treat it as private.