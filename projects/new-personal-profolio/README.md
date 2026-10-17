# Toto's Interactive Portfolio

A production-grade React portfolio website with elaborate interactive choreography, 223-file architecture, 54 components, 7 transition systems, and 4 physics engines.

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **3D/Graphics**: Three.js, Canvas API, WebGL
- **Physics**: Custom Spring, Buoyancy, Boids Flocking, Gravity Wells
- **Styling**: Tailwind CSS

## Project Structure

```
src/
├── components/
│   ├── Global/        # LoadingScreen, Header, CursorManager
│   ├── Hero/          # AvatarContainer, MainTitle, GitHubBox, etc.
│   ├── About/         # BioText, TechStackBox, PlasmaOrb, etc.
│   ├── Projects/      # Gallery3D, ProjectCard, SpringPhysicsManager
│   ├── Skills/        # SkillParticle, CategoryReef, BoidsFlockingManager
│   ├── Contact/       # FlashlightCursor, CaveEnvironment, etc.
│   └── Footer/        # FooterSection, SignOff, etc.
├── transitions/       # ThermalBleed, PortalInversion, etc. (7 total)
├── physics/          # SpringPhysics.ts, BoidsFlocking.ts
├── cursors/          # CursorManager.tsx
├── utils/            # MouseTracker.ts, ScrollProgress.ts
├── shaders/          # GLSL shaders for effects
└── styles/           # Global CSS

```

## Getting Started

```bash
npm install
npm run dev
```

## Key Features

- **Boot Sequence**: CRT scanline → cryptographic decode → border draw → title comet stream
- **Avatar Interactions**: X-ray flashlight mask reveal, liquid ripple shader on click
- **Physics Systems**: Spring tethers, wind forces, gravity wells, buoyancy
- **Boids Flocking**: Skill particles with separation, alignment, cohesion, reef orbit
- **7 Major Transitions**: ThermalBleed, PortalInversion, VRGallerySetup, MissionImpossibleDrop, ShatterFlood, TectonicDrain, SystemOverride
- **Cursor Morphing**: 5 different cursor states synced with sections

## Component Pattern

Each component follows a 3-file structure:

1. **Component.tsx** - React UI component
2. **Component.animation.ts** - Framer Motion variants and animations
3. **Component.effects.ts** - DOM effects, event handlers, physics

## Next Steps

1. Implement Hero section components
2. Build transition orchestrators
3. Create physics managers and cursor system
4. Integrate 3D Gallery and project cards
5. Build boids flocking for skills
6. Add cave environment for contact section
7. Polish and optimize performance

## License

© 2026 Toto Lai Man To. All systems operational.
