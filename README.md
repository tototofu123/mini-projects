# Jumping Game

An infinite vertical platform jumper — climb as high as you can by jumping between procedurally placed platforms. Available as both a **Python (Pygame)** desktop game and a **HTML/JS** browser game.

Play it online: https://tototofu123.github.io/jumping-game/

## Features

- Infinite procedurally generated platforms with varied path shapes (straight, zigzag, U-curves, drift)
- Smooth camera scrolling as you climb
- Keyboard + touch controls (mobile-friendly)
- Score tracking

## Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Move left | `A` / `←` | Tap & drag left side |
| Move right | `D` / `→` | Tap & drag right side |
| Jump | `Space` / `↑` | Quick tap or swipe up |
| Restart | `Space` / `R` | Tap on game over |

## Getting Started

### Python version

```bash
pip install pygame
python game.py
```

### Browser version

Open `index.html` in any browser — no build step required.

## CI/CD

- Pull requests automatically run Python syntax checks and JS linting
- Merging to `main` deploys the HTML game to GitHub Pages
- New issues are auto-assigned to Copilot for triage
