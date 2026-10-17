# External Assets & Web Sources Registry

This document records all third-party code, assets, fonts, icons, shader references, and external components adapted or copied from the web for Toto Lai's portfolio website.

---

## 1. Pre-Existing Repository References (Imported Prior to Redesign)

| Asset / Source | Origin / Creator | License / URL | Usage in Project |
|---|---|---|---|
| **HolographicMaterial** (`ref-hologram/`) | Anderson Mancini | MIT License<br>https://github.com/andersonmancini/threejs-vanilla-holographic-material | Custom GLSL shader material adapted into `src/three/materials/HolographicMaterial.js` for procedural scanlines, Fresnel rim lighting, and holographic distortion. |
| **3D Art Gallery Reference** (`ref-gallery/`) | Emilian Kasemi (The Rings of Saturn) | Open Educational / MIT<br>https://github.com/theringsofsaturn/3D-art-gallery | Three.js gallery architecture referenced for spatial coordinates, lighting, and movement mechanics. |
| **GitHub Readme Streak Stats** | DenverCoder1 | MIT License<br>https://github-readme-streak-stats.herokuapp.com | Live SVG streak metrics widget embedded in Hero telemetry bar. |

---

## 2. Typography & Web Fonts

| Font Family | Provider | Usage |
|---|---|---|
| **Syne** | Google Fonts (SIL Open Font License) | Primary architectural headings, section titles, and high-impact identity display. |
| **Space Grotesk** | Google Fonts (SIL Open Font License) | Structural sub-headings, navigation labels, and UI metric tags. |
| **DM Sans** | Google Fonts (SIL Open Font License) | Body narrative, project descriptions, and case study breakdowns. |
| **JetBrains Mono** | Google Fonts (SIL Open Font License) | Hardware telemetry, coordinate logs, code snippets, baud rates, and terminal drawers. |

---

## 3. Libraries & Runtimes

| Package | Version | Origin | Usage |
|---|---|---|---|
| **React & React DOM** | `^18.3.1` | Meta Open Source (MIT) | Declarative UI component architecture. |
| **Framer Motion** | `^10.16.16` | Framer (MIT) | Hardware-accelerated GPU spring motion and layout animations. |
| **Three.js** | `^0.158.0` | Mr.doob / Three.js Authors (MIT) | WebGL 3D math, raycasting, and canvas rendering. |
| **GSAP** | `^3.12.2` | GreenSock (Standard License) | Precise timeline interpolation. |
| **Tailwind CSS** | `^3.3.5` | Tailwind Labs (MIT) | Zero-runtime atomic CSS utility system. |
| **Lucide Icons** | SVG inline (MIT) | Minimalist industrial iconography (terminal, cpu, pulse, crosshair, external link). |

---

## 4. Media & Project Assets

| Asset Path | Source | Attribution |
|---|---|---|
| `/public/images/projects/robot-car.mp4` & `.jpeg` | Original engineering footage | Toto Lai (1st Place Combat Bot competition at HKUST). |
| `/public/images/projects/climbing-app-route.png` & `home.png` | `hkust-climbing-society` repo showcase | Toto Lai (Lead Developer, HKUST Climbing Society full-stack app). |
| `/public/images/projects/boulderwall-vector.webp` | `hkust-climbing-society` vector assets | Toto Lai & HKUST Climbing Society hold mapping assets. |
| `/public/images/projects/climbing-*` | Original climbing media | HKUST Sport Climbing Society & Toto Lai athlete archives. |
| `/public/images/projects/rag-chatbot.png` & `ai-newsletter.png` | Original project screenshots | Toto Lai (RAG agent & international student support workflows). |
| `/public/images/projects/connect4-*.png` | Original game interface screenshots | Toto Lai (Minimax AI Connect4 with alpha-beta pruning). |
| `src/sections/ProductionAI/ProductionAISection.tsx` SVG Flowchart | Original procedural SVG design | Toto Lai's HKT 200-node workflow architecture visualization. |
| `src/sections/ClimbingTech/ClimbingTechSection.tsx` Kinematics SVG | Original procedural SVG design | Inverse kinematics stickman & coordinate beta search visualization. |
| `src/sections/PhysicalSystems/PhysicalSystemsSection.tsx` Circuit SVG | Original procedural SVG design | Optoisolated H-Bridge & Arduino BLE hardware block diagram. |
| `src/components/Transitions/SectionBridge.tsx` | Original telemetry bridge design | Animated gradient signals and pulse beacons linking all sections. |

## 5. Web-Sourced Code Snippets & Shaders

*Any additional code, shaders, or vector assets discovered and adapted during the build phase will be appended below with full attribution.*

| Date Added | Component | Source / Reference | Modifications Applied |
|---|---|---|---|
| 2026-09-26 | GlitchPass (`src/three/shaders/GlitchPass.js`) | Three.js Postprocessing examples | Stripped heavy post-render chain; replaced FullScreenQuad import for Three.js r158 compatibility. |
| 2026-09-26 | Boids Flocking (`src/physics/BoidsFlocking.ts`) | Craig Reynolds 1986 Boids Algorithm | Adapted into pure TypeScript vector class with separation, alignment, and cohesion thresholds. |
| 2026-09-26 | Interactive Circuit / Telemetry grid | SVG micro-grid pattern (Tailwind-compatible) | Procedural 24px dashed grid pattern with radial gradient alpha mask. |
