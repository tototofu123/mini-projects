<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🚧 Barricade AI

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini-orange?logo=google-gemini&logoColor=white&style=flat-square)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)

A modern digital implementation of the classic **Malefiz / Barricade** board game, featuring heuristic-based and Gemini AI-powered opponents with progressive difficulty levels.

</div>

---

## ✨ Features

- **🎲 Dynamic Movement** — Strategic dice-based mechanics determining pawn mobility.
- **🚧 Barricade Strategy** — Capture and reposition barricades to block rival paths or protect your lead.
- **🤖 Gemini AI Opponents** — Up to three AI players utilizing heuristic logic and Google's Gemini SDK for decision-making.
- **🗺️ Three Progressive Levels** — *Tutorial Valley* (2P), *The Divide* (3P), and *Barricade Pass* (4P).
- **🎓 Interactive Tutorial** — A guided walkthrough on Level 1 to get new players up to speed instantly.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Motion](https://motion.dev/) (`motion/react`)
- **Intelligence**: [Google Gemini SDK](https://ai.google.dev/) (`@google/genai`)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

**Prerequisites:** Node.js (v18+)

1. **Clone and Install:**
   ```bash
   gh repo clone tototofu123/barricade-game
   cd barricade-game
   npm install
   ```
2. **Setup Environment:**
   Set your `GEMINI_API_KEY` in `.env.local`:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
3. **Run Development Server:**
   ```bash
   npm run dev
   ```
4. **Access the Game:** Open [http://localhost:3000](http://localhost:3000)

## 🎮 How to Play

1. **Select a level** from the main menu.
2. **Roll the dice** to determine your movement points.
3. **Move your pawns** by clicking a highlighted destination.
4. **Strategize**: If you land on a barricade, you must relocate it to any empty board space.
5. **Win**: The first player to reach the **Goal** space wins!

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production assets |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run TypeScript type-checking |

---
*Created as an exploration of AI-integrated board game logic. Updated 17-05-2026.*
