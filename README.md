# 🧱 Quoridor Rustic

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A clean, minimalist web implementation of the classic abstract strategy game **Quoridor**. This version is built with **Vanilla JavaScript** (zero dependencies) and focuses on a "Rustic Tactility" aesthetic inspired by traditional wooden board games.

## 🧱 The Game

Quoridor is a game of pathfinding and strategic detours. Your goal is to reach the opposite side of the 9x9 grid before your opponent. 

### Core Rules
- **Movement:** Move one square horizontally or vertically.
- **Walls:** Each player starts with 10 walls. Walls block movement but **cannot** completely trap a player; there must always be at least one viable path to the goal.
- **Jumping:** When face-to-face with your opponent, you can jump over them to gain an advantage.

## ✨ Features

- **🧠 Real-time Path Validation**: Implements a **Breadth-First Search (BFS)** algorithm to ensure that no wall placement completely traps a player.
- **🖱️ Tactile Interaction**: "Ghost" previews for wall placement and smooth drag-and-drop-like interaction.
- **🎨 Rustic Aesthetics**: A curated high-contrast palette of wood tones and vibrant primary markers for maximum readability.
- **📱 Responsive Design**: The 9x9 board scales dynamically to fit different screen sizes.
- **⌨️ Quality of Life**: Keyboard shortcuts (like **'R'** to rotate walls) for a faster gameplay experience.

## 🛠️ Technical Highlights

- **Zero Dependencies**: Pure Vanilla JS implementation for maximum performance and portability.
- **BFS Logic**: The game calculates connectivity on every potential wall placement to maintain game integrity.
- **CSS Grid Layout**: Utilizes modern CSS Grid for precise alignment of squares and wall gaps.

## 🚀 Getting Started

No installation required! Just open `index.html` in any modern web browser or visit the live demo:

**Live Demo:** [https://tototofu123.github.io/quorridor-game/](https://tototofu123.github.io/quorridor-game/)

## 📜 License

This project is licensed under the MIT License - feel free to fork and build upon it!

---
*Developed with a focus on clean code and tactile UI. Updated 17-05-2026.*
