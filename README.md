# Quoridor Rustic

A clean, minimalist web implementation of the classic abstract strategy game **Quoridor**, built with a focus on "Rustic Tactility" and high-contrast digital board game aesthetics.

![Quoridor Gameplay Concept](https://raw.githubusercontent.com/tototofu123/quorridor-game/master/board_preview_placeholder.png)

## 🎮 Live Demo
**Play it here:** [https://tototofu123.github.io/quorridor-game/](https://tototofu123.github.io/quorridor-game/)

## 🧱 The Game
Quoridor is a game of pathfinding and detours. Your goal is to reach the opposite side of the 9x9 grid before your opponent. On your turn, you can either move your pawn or place a wall to block your opponent's progress.

### Core Rules
- **Movement:** Move one square horizontally or vertically.
- **Walls:** Each player starts with 10 walls. Walls block movement but **cannot** completely trap a player; there must always be at least one viable path to the goal.
- **Jumping:** If you are face-to-face with your opponent, you can jump over them.

## 🎨 Design Philosophy
This version follows the **Rustic Tactility** design specification:
- **No Gradients:** Pure solid colors for clarity and a modern-retro feel.
- **Natural Tones:** A palette of Burlywood and SaddleBrown representing the physical wooden board.
- **High Contrast:** Vivid Blue and Red markers for players to ensure accessibility and focus.

## 🛠️ Features
- **Real-time Path Validation:** Uses a BFS (Breadth-First Search) algorithm to prevent illegal wall placements that would block all paths.
- **Ghost Preview:** Drag your mouse over the gaps to see where your wall will land.
- **Responsive Layout:** The board scales to fit your screen.
- **Keyboard Shortcuts:** Press **'R'** to rotate the wall orientation.

## 🚀 Technical Stack
- Vanilla HTML5 / CSS3
- Pure JavaScript (No dependencies)
- GitHub Pages for deployment

## 📜 License
MIT License. Feel free to fork and enhance!
