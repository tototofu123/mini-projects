<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Barricade AI

A digital version of the classic **Malefiz / Barricade** board game, featuring AI opponents and three progressive difficulty levels.

Race all your pawns to the goal space at the top of the board before your opponents do. Roll the dice, move your pawns, and place barricades to block rival paths — but watch out, the AI will do the same to you.

## Features

- 🎲 **Dice-based movement** — roll to determine how far your pawns can move each turn
- 🚧 **Barricade placement** — strategically block opponent routes after capturing a barricade
- 🤖 **AI opponents** — up to three AI players with heuristic-based decision making
- 🗺️ **Three levels** — Tutorial Valley (2P), The Divide (3P), and Barricade Pass (4P)
- 🎓 **Built-in tutorial** — guided walkthrough on Level 1 for new players

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for development and bundling
- **Tailwind CSS v4** for styling
- **Motion** (`motion/react`) for animations
- **Google Gemini SDK** (`@google/genai`)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Type-check with TypeScript |

## How to Play

1. Select a level from the main menu
2. On your turn, click **Roll** to roll the dice
3. Select one of your pawns, then click a highlighted destination to move it
4. If you land on or capture a barricade, you must place it on an empty board space
5. First player to get all their pawns to the **Goal** space wins!
