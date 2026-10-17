---
name: Quoridor Rustic
colors:
  board-surface: "#DEB887"
  board-grid: "#8B4513"
  pawn-p1: "#2563EB"
  pawn-p2: "#DC2626"
  wall-solid: "#1F2937"
  wall-ghost: "#1F293780"
  text-primary: "#1A1C1E"
  background: "#F7F5F2"
typography:
  h1:
    fontFamily: system-ui, sans-serif
    fontSize: 2.5rem
  body-md:
    fontFamily: system-ui, sans-serif
    fontSize: 1rem
rounded:
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  cell-size: 48px
  wall-gap: 12px
  board-padding: 24px
components:
  board:
    backgroundColor: "{colors.board-surface}"
    padding: "{spacing.board-padding}"
    rounded: "{rounded.md}"
  cell:
    backgroundColor: "{colors.board-grid}"
    rounded: "{rounded.sm}"
  wall:
    backgroundColor: "{colors.wall-solid}"
    rounded: "{rounded.sm}"
  pawn-1:
    backgroundColor: "{colors.pawn-p1}"
    rounded: "{rounded.full}"
  pawn-2:
    backgroundColor: "{colors.pawn-p2}"
    rounded: "{rounded.full}"
---

## Visual Theme and Atmosphere

Rustic Tactility. A clean, digital board game experience using solid colors to mimic physical materials. It focuses on clarity, removing unnecessary distractions like gradients to provide a clear view of the complex grid mechanics.

## Color Palette and Roles

The palette relies on wood tones for the environment, contrasting with vivid markers for the pieces.

- **Board Surface (#DEB887):** Burlywood. Represents the light wood base of the board.
- **Board Grid (#8B4513):** SaddleBrown. The darker wood squares where pawns move.
- **Pawn Player 1 (#2563EB):** Vivid Blue. Highly distinct from the wood tones.
- **Pawn Player 2 (#DC2626):** Vivid Red. Highly distinct from the wood tones and P1.
- **Wall Solid (#1F2937):** Dark Slate. Represents the solid blocking walls.
- **Background (#F7F5F2):** Off-white canvas for the page behind the game board.

## Typography Rules

Utilitarian and system-native. The game relies on visuals, so text is reserved for scores, rules, and UI buttons.

## Component Stylings

The grid consists of large cells separated by gaps where walls can be placed.

- **Cells:** 48px squares, slightly rounded.
- **Walls:** Spanning two cells plus the gap, solid dark color.
- **Pawns:** Perfectly circular, positioned centrally within a cell.

## Layout Principles and Spacing

The board is a 9x9 grid of cells. Between every row and column of cells is a 12px gap reserved for walls.

## Depth and Elevation

Completely flat. The design uses stark color contrast instead of shadows or gradients to distinguish interactive elements from the background.

## Do and Do Not Rules

- **DO** use exact solid colors for the pieces.
- **DO** keep the wall gaps consistently sized.
- **DO NOT** use gradients, drop shadows, or 3D effects.

## Responsive Behavior

The board scales proportionally down on smaller screens, preserving the grid aspect ratio.

## Agent Prompt Guide

When building this game, use CSS Grid or absolutely positioned elements within a relative container. Ensure the walls perfectly overlap the 12px gaps.

## Accessibility Contract

The blue and red colors chosen for pawns provide sufficient contrast against the wood-toned board.

## Motion and Animation System

Instant snap. Pawns and walls should snap to their grid positions immediately upon drop to emphasize the abstract strategy feel.

## Icon System

No icons are needed; the UI relies purely on colored geometric shapes.

## Code Snippets

```css
.cell {
  width: 48px;
  height: 48px;
  background-color: #8B4513;
  border-radius: 4px;
}
```

## Pre-flight Checklist

- Ensure no gradients are present.
- Check that pawn colors contrast heavily with the board surface.
- Verify wall gaps are exactly 12px relative to 48px cells.
