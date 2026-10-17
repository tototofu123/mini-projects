# 05 // HyperFrames & Motion Graphics Showcase Integration

## 1. Problem Statement & User Suggestion
- **User Directive**: *"Or maybe use hyperframe if you want for demo ifk"*
- **The Challenge**: Running complex 3D simulations (e.g. detailed particle flocking, full 3D physics, real-time video compositing) live in the browser can cause frame drops and battery drain on mobile devices and laptops.
- **The HyperFrames Solution**: HyperFrames is a framework for authoring deterministic, code-driven HTML/CSS/WebGL animations and rendering them into pixel-perfect, silky-smooth **60 FPS video loops** (MP4 / WebM).
- By pre-rendering high-end motion graphic compositions into lightweight video clips (<2MB), we deliver **Pixar-grade visual fidelity with ZERO live CPU/GPU computational cost**!

---

## 2. Planned HyperFrames Compositions

### Composition A: `CombatBotArenaShowcase`
- **Duration**: 8 seconds (Seamless Loop)
- **Visual Story**:
  - Starts with an exploded 3D CAD schematic of the Combat Bot chassis with animated callout lines.
  - Smooth camera orbit into the arena competition footage (`robot-car.mp4`).
  - Overlay HUD: Displays real-time RPM, BLE packet frequency, and the glowing banner:
    ```text
    1ST PLACE CHAMPION // 20+ TEAMS
    BEST TECHNICAL ARCHITECTURE AWARD
    ```
  - End transition: Smooth glitch-wipe looping back to the chassis blueprint.

---

### Composition B: `ClimbingAppMobileWalkthrough`
- **Duration**: 10 seconds (Seamless Loop)
- **Visual Story**:
  - High-end mobile device frame floating in subtle 3D perspective.
  - Animated cursor demonstrating the real app UI (`climbing-app-route.png` and `climbing-app-home.png`):
    - Tapping through route lists.
    - Selecting hold grades ($V4 \rightarrow V7$).
    - Viewing competition live leaderboard.
  - Subtle glowing depth-shadows and ambient reflection.

---

### Composition C: `HktWorkflowTelemetryMesh`
- **Duration**: 6 seconds (Seamless Loop)
- **Visual Story**:
  - Isometric motion graphic of the ~200-node enterprise email triage pipeline.
  - Glowing data packets shoot along circuit traces from the Outlook Webhook node into the 3 parallel agent clusters.
  - Adaptive Card expands with an animated checkmark, followed by telemetry logging into an Excel audit stream.

---

## 3. Implementation Workflow with HyperFrames

1. **Scaffold HyperFrames Compositions**:
   - Create a dedicated folder: `src/hyperframes/` or use the HyperFrames CLI:
     ```bash
     npx hyperframes init showcase-video
     ```
2. **Animation Choreography**:
   - Use GSAP / Framer Motion rules (clamped timelines, seek-safe deterministic rendering).
   - Use HTML+Tailwind for typography and vector graphics.
3. **Local CLI Render**:
   - Render the composition to highly compressed WebM & MP4:
     ```bash
     npx hyperframes render --composition CombatBotShowcase --output public/videos/combat-bot-loop.mp4 --fps 60
     ```
4. **Zero-Lag Embed Component**:
   - Embed into React using a reusable `<ProjectVideoCard />` with `IntersectionObserver` auto-play/pause so videos only play when visible on screen:
     ```tsx
     <video
       src="/videos/combat-bot-loop.mp4"
       poster="/images/projects/robot-car.jpeg"
       preload="none"
       muted
       loop
       playsInline
     />
     ```

---

## 4. Implementation Tasks
- [ ] Scaffold HyperFrames composition templates in `src/hyperframes/`.
- [ ] Build `CombatBotArenaShowcase` timeline with schematic callouts and arena footage.
- [ ] Build `ClimbingAppMobileWalkthrough` timeline with phone mockup and route navigation.
- [ ] Render 60fps MP4/WebM video artifacts into `public/videos/`.
- [ ] Embed video loops into `PhysicalSystemsSection.tsx` and `ClimbingTechSection.tsx`.
