# 🌊 Boids: Deep Sea Simulation

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r169-black?logo=three.js&logoColor=white&style=flat-square)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwind-css&logoColor=white&style=flat-square)](https://tailwindcss.com/)

A high-performance, interactive 3D flocking simulation that brings the "Boids" algorithm to life in a stylized deep-sea environment. Built with **React Three Fiber**, this simulation features organic "Manta" agents and immersive visual effects.

## ✨ Key Features

- **🦈 Organic Swarm Intelligence**: Implements the classic Boids algorithm (Separation, Alignment, Cohesion) for realistic collective motion.
- **🎨 Deep-Sea Aesthetic**: Stylized environment with bioluminescent colors, volumetric fog, and post-processing effects.
- **📐 Custom Instanced Geometry**: Optimized rendering of up to 3,000 unique "Manta" agents using Three.js `InstancedMesh`.
- **🎛️ Interactive Controls**: Real-time adjustment of swarm parameters (speed, cohesion, separation weight) via a UI overlay.
- **🖱️ Mouse Interaction**: Boids respond to the user's cursor, allowing for interactive herding and disruption.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **3D Engine**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Component Library**: [@react-three/drei](https://github.com/pmndrs/drei)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Configuration**: [Leva](https://github.com/pmndrs/leva) for real-time parameter tweaking.

## 🚀 Getting Started

1. **Clone the Repo:**
   ```bash
   gh repo clone tototofu123/boids-deep-sea
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 📜 License

This project is licensed under the MIT License.

---
*Created as a generative art experiment. Updated 17-05-2026.*
