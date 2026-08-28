# Object Click Game — Floating Sort

Tablet game (iPad 11" / 1180×820) for autism research — sky blue `#8ECAE6` + sharp colours.

**Play:** https://tototofu123.github.io/object-click-game/

**Rules**
- Objects float up from bottom — new random colors/shapes spawn (circle / triangle / square)
- `Current` shows target: e.g. `orange circle X2` (color + shape + count 1-3)
- `Next` is at least one different (color, shape, or both)
- Circle → **tap**, Triangle → **slice (swipe)**, Square → **double-tap quickly**
- Every clear `+1` score, `Current` `X3→X0` then flips to `Next`
- 30s timer

**Metrics logged on-device** (`splash-sort-logs.json` via Export not shown in simple UI, but `app.html` logs `x,y,t,pressure,jerk,off,dwell,eff,switchErr`):
- Jerk on swipes (Springer 2024), pressure (PMC4995518), accuracy/off + dwell (Nature 2023), switch error DCCS (PMC10241451 / PMC8545993), path efficiency (Strathprints 2022), τ flagged only

**Files**
- `index.html` — playable (GitHub Pages entry)
- `app.html` — same
- `kids-game-tablet.pen` — Pencil design (Home/Gameplay/Moodboard + Research Hub + 5 labs + Unified sketch)
- `research.html` — 5 labs overview

**Run locally:** open `index.html` on iPad / `http://127.0.0.1:8897/app.html`

**Pencil:** `C:\Users\totot\Documents\antigravity_projects\kids-splash-sort\kids-game-tablet.pen` — sky + sharp, `Baloo 2`/`Nunito`, `3px #0F1B2D` hard shadow

