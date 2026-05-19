# COMPLETE COMPONENT INVENTORY FOR TOTO PORTFOLIO

---

## **GLOBAL / PERSISTENT COMPONENTS**

### 1. **Custom Cursor System**
   - Base cursor (celestial glowing dot)
   - Hover state (expanding targeting ring)
   - Plasma reticle variant (About section)
   - Aerodynamic ring variant (Projects section)
   - Bioluminescent bait variant (Skills section)
   - Flashlight variant (Contact section)
   - Color/material transitions between states

### 2. **Loading Screen**
   - Black background (#000000)
   - Animated t.tofu icon (motion loop at center)
   - Icon slide-up animation (center → top-left to become header logo)
   - Fade-out and transition trigger

### 3. **Header (Persistent across all sections)**
   - Logo/Brand mark (t.tofu)
     - Material state: Chrome/Neon → Glass → Metal → Stone (scrolls through sections)
     - Hover: 3D tilt tracking mouse X/Y
     - Click: Warp to Contact section
   - Navigation links (Projects, Skills, Contact)
     - Hover: Color shift
     - Cryptographic decode entry animation
   - HUD transformation (becomes part of VR headset in Projects section)

---

## **SECTION 1: HERO (Future / Fire)**

### 4. **Avatar Container**
   - Rigid border (#1E293B)
   - Border draw animation (center outward on load)
   - Centered frame holding layered images

### 5. **Avatar Base Layer**
   - Static anchor image (base photo)
   - Cycles through styles when background clicked
   - Receives morphing animation to Plasma Asset during scroll

### 6. **Avatar Mask Layer**
   - X-ray flashlight overlay (circle clip-path)
   - Mouse tracking (tied to requestAnimationFrame)
   - Random style cycles (ASCII, Pixel, Depth-Dots)
   - Idle re-roll logic (600ms no-mouse debounce)
   - Fade in/out opacity transitions

### 7. **Avatar Interaction Zone**
   - Cursor override (crosshair on hover)
   - Click inside: Liquid ripple shader expansion
   - Click outside (background): Cycle base image
   - Lock-in mechanism (ripple effect makes mask → base)

### 8. **Main Title ("Hi, I am Toto")**
   - Syne font, 3.5rem, bold
   - Entry animation: Word-by-word up-sweep from baseline
   - Comet stream effect: Letters shoot from right side of avatar
   - Reverse string order (rightmost char lands first)
   - Randomized Y-coordinate threshold
   - 1-2 second total animation time
   - Hover: Magnetic pull toward cursor + glowing text shadow
   - Parallax scroll effect (slower movement on Y-axis)

### 9. **Intro Lines (2 lines: role + location)**
   - "an AI engineer and UI developer"
   - "based in Hong Kong"
   - Space Grotesk font, 2.25rem, secondary color (#94A3B8)
   - Entry: Echo slide (fade in + 10px right slide)
   - Timing: Complete as Main Title finishes
   - Text selection: Orange (#F97316) highlight on select
   - Parallax sync with title

### 10. **GitHub Stats Box**
   - Position: bottom-left
   - Border: 1px solid #1E293B
   - Background: rgba(30, 41, 59, 0.3)
   - Content: "Commits: 1,204 | PRs: 42"
   - Live heartbeat dot (green #4ADE80, pulsing CSS animation)
   - Entry animation: Scale 0.9 → 1.0 + count-up numbers
   - Click: Opens GitHub profile in new tab
   - Hover: Border glow + heartbeat pulse accelerates
   - Melts during transition to About (Thermal Bleed)
   - Splinters into 4 Tech Stack boxes

### 11. **Status Row (Top-right)**
   - Text: "HKUST | Computer Engineering + AI"
   - Static (no hover interaction)
   - Cryptographic decode entry animation
   - Space Grotesk font, small size

### 12. **Scroll Prompt (Bottom-right)**
   - Text: "Computer Engineering and Artificial Intelligence student at HKUST"
   - Position: bottom-right, max-width: 25vw
   - Entry: Delayed drop with bounce
   - Idle animation: Floating up/down (4px bounce)
   - Transition: Melts via SVG heat ripple filter
   - Becomes "[ ABOUT ME ]" header in About section

---

## **SECTION 2: ABOUT (Future / Fire)**

### 13. **Section Header "[ PROFILE ENGINE ]"**
   - Position: top-left
   - Color: Orange (#F97316)
   - Hover: Glitches/flickers like faulty neon
   - Entry: Migrates from Hero's scroll prompt
   - Material: Plasma/heat glow

### 14. **Main Bio Text (Center-left)**
   - "I'm Toto, a Computer Engineering student..."
   - DM Sans font, 2rem, secondary color
   - Default state: Heat haze (blurry, glowing, illegible)
   - Hover/Sweep: Cursor acts as magnetic cooler → text snaps to crisp focus
   - Trail: Text slowly heats back up as cursor leaves
   - Parallax with scroll

### 15. **Tech Stack Box 1 (AI)**
   - Text: "Training CNN models and leveraging AI automation"
   - Border: 1px solid #1E293B, slight glow on hover
   - Click/Shoot: 1.5s plasma melt → distortion + orange flash → snap back
   - Entry animation: Slide in from left sequentially
   - Grid position: Flex column, left side

### 16. **Tech Stack Box 2 (UI)**
   - Text: "Using design tools and code for better UI"
   - Same styling as Box 1
   - Entry: Delayed after Box 1

### 17. **Tech Stack Box 3 (Embedded Systems)**
   - Text: "Integrating embedded hardware and physical computing solutions"
   - Same styling
   - Entry: Delayed further

### 18. **Tech Stack Box 4 (Blank or future)**
   - Placeholder fourth box
   - Same styling
   - Entry: Final in sequence

### 19. **Right Side Asset (Plasma Orb / 2.5D/3D)**
   - 3D rotatable asset
   - Idle state: Slow 3D rotation
   - Hover: Tracks cursor movement in 3D space
   - Click: Emits digital fire/sparks that bounce to Tech Stack boxes
   - Entry: Flashes into existence with spark
   - Morphs during scroll transition: Orb → Portal (About → Projects)
   - "Armed" state: Fires plasma bursts when boxes are clicked

### 20. **Thermal Bleed (Transition Effect)**
   - Orange/amber plasma glow bleeding upward from bottom
   - SVG displacement filter on text elements
   - Heat ripple distortion
   - Cursor morphs from celestial dot → plasma reticle

---

## **SECTION 3: PROJECTS (Modern / Air) - VR GALLERY**

### 21. **VR Headset Asset**
   - Emerges from Plasma Orb morphing
   - Expands to 100vw / 100vh
   - Contains entire 3D gallery inside
   - Lenses as viewport frame
   - HUD integration (header snaps to top edge)

### 22. **3D Gallery Environment**
   - CSS 3D perspective transform (perspective: 1000px)
   - Deep hallway with vanishing point
   - Light Mode background (#F8FAFC)
   - Invisible walls (left/right angles)

### 23. **Central 3D Architectural Asset**
   - Floating crystalline prism / wireframe globe
   - Positioned at vanishing point (center of depth)
   - Soft light emission
   - Label: "[ MODERN GALLERY ]"
   - Explodes into fragments during Shatter & Flood transition

### 24. **Project Card (x6 total)**
   - Dimensions: Vary by depth (back/middle/front)
   - Suspend on invisible spring tethers
   - Default: Subtle sway in ambient air
   - Wind physics: Cursor velocity pushes card away + tilt
   - Fold interaction: Top-right corner folds down on hover
   - Drag interaction: Pull horizontally to "tear open"
   - Modal expansion: Center screen, tags orbit like planets
   - Gravity well: Sucked toward black hole on background click
   - Buoyancy: Float upward during Shatter & Flood

#### **Project Card 1: HKUST Climbing App (Front/Closest)**
   - Tech tags: [Full Stack], [UI], [AI], [Python]
   - Description: Comprehensive web app, automated workflows, modern UI

#### **Project Card 2: RAG AI Agent (Front/Closest)**
   - Tech tags: [AI], [RAG], [LLM]
   - Description: Retrieval-Augmented Generation, document vectorization

#### **Project Card 3: Strategic Connect 4 (Middle)**
   - Tech tags: [Python], [Minimax], [AI]
   - Description: Game intelligence, alpha-beta pruning, board state evaluation

#### **Project Card 4: HK Bus Tracker (Middle)**
   - Tech tags: [JavaScript], [API], [UI]
   - Description: Real-time transit, public API integration, responsive UI

#### **Project Card 5: Combat Bot 1st Place (Back/Farthest)**
   - Tech tags: [Embedded], [C++], [Hardware]
   - Description: Robotic car, microcontroller logic, state-machine combat

#### **Project Card 6: AI Image Detector (Back/Farthest)**
   - Tech tags: [Python], [CNN], [TensorFlow]
   - Description: CNN classification, real vs AI-generated, high accuracy

### 25. **Project Tags/Pills**
   - Space Grotesk font, 12px
   - Hover: Elevate with sharper drop-shadow
   - Orbit cards during modal state
   - Color coded by tech type

### 26. **Mission Impossible Wire Drop Animation**
   - 3 staggered drops (back → middle → front)
   - Visible tension lines (#CBD5E1)
   - Rapid drop from top of viewport
   - Line snap + retract into ceiling
   - Cards leave levitating in place
   - 0.5-1s per drop sequence

### 27. **Aerodynamic Physics System**
   - Spring tether physics for each card
   - Wind draft tracking cursor velocity
   - Gravity well mechanics (black hole pulls)
   - Buoyancy engine (activated during Shatter & Flood)
   - Physics switching: Spring → Buoyancy → Static (footer)

### 28. **Gravity Well Spawner**
   - Click on empty background
   - Pulsing black dot at cursor position
   - Stretches card tethers aggressively
   - Vacuum suction toward well
   - Master reset on header click

---

## **SECTION 4: SKILLS (Ancient / Water) - BOIDS ECOSYSTEM**

### 29. **Viewport Scroll Hijacker**
   - Vertical mouse-wheel input → horizontal camera pan
   - Cinematic pan across ocean floor
   - Lock vertical scroll during section

### 30. **Water Environment**
   - Deep indigo background (#0A1128)
   - WebGL displacement shader for fluid effects
   - Bioluminescent lighting
   - Particle/fish visibility tied to distance from cursor

### 31. **Skill Particles (Boids System)**
   - Individual boid entities for each tech skill
   - Flocking algorithm implementation
   - Orbit around category "reefs" (default state)
   - Steering behaviors: separation, alignment, cohesion
   - Life-like movement patterns

### 32. **AI Skill Particles**
   - TensorFlow
   - RAG
   - Dify
   - n8n
   - MCP
   - AI PRD/TDD
   - Reef color: Cyan (#38BDF8)

### 33. **UI Skill Particles**
   - HTML
   - CSS
   - Figma
   - Framer
   - Reef color: Purple (#A78BFA)

### 34. **Software Skill Particles**
   - Python
   - JavaScript
   - C
   - C++
   - Reef color: Green (#4ADE80)

### 35. **Hardware Skill Particles**
   - Arduino
   - STM32
   - CAD
   - PID Control
   - Reef color: Red (#F87171)

### 36. **Category Reefs (4 total)**
   - Soft radial gradient glow
   - Hover: Intensity increases + orbit speed increases
   - Anchor point for skill particles
   - Visual anchor for ecosystem

### 37. **Golden Food Particle**
   - Spawned on background click
   - Slowly sinks into deep
   - Triggers feeding frenzy
   - Skills triple speed + aggressively dash toward it
   - Consumed by nearest skill

### 38. **Bioluminescent Cursor Bait**
   - Soft glow emission
   - Fluid/ink trail dissipates behind
   - Attracts boids gently (breaks reef orbit)
   - Becomes food source when clicked

### 39. **Section Header "[ DEEP ECOSYSTEM ]"**
   - Opacity: 0.2 (subtle)
   - Position: Top-center
   - Click: Triggers WebGL displacement shockwave
   - Shockwave: Blows all particles away + snaps ecosystem to calm state

### 40. **WebGL Displacement Shockwave**
   - Expands outward from center
   - Knocks all particles away violently
   - Resets boid positions to default reef orbits
   - Visual feedback: Distortion ring

---

## **SECTION 5: CONTACT (Ancient / Earth) - CAVE SYSTEM**

### 41. **Cave Environment**
   - Pitch-black background (#000000)
   - Raw, carved stone textures (revealed by flashlight)
   - Wet rock appearance
   - 3D lighting simulation via cursor angle

### 42. **Flashlight Cursor**
   - 250px radial gradient mask
   - X-ray piercing darkness
   - Reveal stone textures + carved text
   - Dynamic drop-shadow based on angle

### 43. **Resume Title (Left Column)**
   - Text: "RESUME"
   - Syne font, 4rem, orange (#FCD34D)
   - Large, semi-bold visual weight
   - Hover: Glows white, catches simulated "light"
   - Click: Opens resume in new tab/modal

### 44. **Role Subtitles (Under Resume)**
   - "AI Engineer"
   - "Frontend Developer"
   - "Software Engineer"
   - "Hardware Engineer"
   - Space Grotesk font, 1.25rem
   - Hover: React to flashlight angle, 3D drop-shadow inside carved stone
   - Stacked vertically

### 45. **Contact Links (Right Column)**
   - Email (tototofu0601@gmail.com)
   - GitHub (github.com/tototofu123)
   - LinkedIn (linkedin.com/in/lai-man-to)
   - Space Grotesk font, 2rem
   - Default color: Amber (#D6D3D1)
   - Hover: Shift to white + directional arrow (↗) slides into place
   - Click: Opens corresponding link

### 46. **Hidden Torch Bracket**
   - Unmarked location on "wall"
   - Faint, glowing [ Ignite Torch ] prompt when swept
   - Hidden until flashlight sweeps over exact spot
   - Click: Permanent state change

### 47. **Ignition Effect**
   - Flashlight expands rapidly (250px → 100vw/100vh)
   - Warm, flickering ambient firelight floods screen
   - Illuminates entire cave at once
   - Disables flashlight cursor mechanic
   - Reveals all contact info permanently

### 48. **Tectonic Drain (Transition To Contact)**
   - Rift opens on right side during Skills → Contact transition
   - Whirlpool vortex forms
   - Water drains downward violently
   - Skill particles scatter into crevices
   - Camera tilts 90° downward
   - Scroll input resets to vertical

### 49. **Abyss Plunge Camera**
   - Cinematic downward dive
   - Fluid textures evaporate as depth increases
   - Indigo → pitch-black fade
   - Hard deceleration at bottom (cave floor)

---

## **SECTION 6: FOOTER (Reboot)**

### 50. **Override Text**
   - Text: "> system.override(tototofu); // take off headset"
   - Space Grotesk font, mono-spaced style
   - Position: Top of footer
   - 1px dividing line above it (system threshold)
   - Click/Scroll trigger: Ignites System Override transition

### 51. **Footer Grid (4 Columns)**
   - DEVELOPMENT
     - GitHub Repository
     - Tech Blog
   - DESIGN
     - Figma Source
     - Framer Prototypes
   - CONNECT
     - LinkedIn
     - GitHub Profile
   - STATUS
     - More about Me → Coming Soon
   - Static, rigid layout (no physics)
   - Accessible, clean typography

### 52. **Footer Links**
   - Space Grotesk font, 14px
   - Color: #94A3B8
   - Hover: Shift to white
   - Click: Navigate to URLs

### 53. **Sign-Off**
   - Left: "© 2026 Toto Lai Man To. All systems operational."
   - Right: "t.tofu"
   - 12px font, #64748B color
   - Border-top: 1px solid #1E293B
   - Fades in with steady opacity (non-pulsing)

### 54. **System Override Transition**
   - Flashlight expands to cover entire screen
   - Carved stone textures despawn (digital glitch)
   - Complex physics/shaders unmount
   - Footer snaps into rigid grid
   - Cursor returns to default OS pointer
   - Signals end of interactive experience

---

## **ANIMATION & TRANSITION COMPONENTS (Not DOM elements, but functional systems)**

### 55. **Loading Screen Animation System**
   - t.tofu icon motion loop (center)
   - Slide-up (center → top-left)
   - Fade-out trigger

### 56. **Hero Boot Sequence**
   - CRT scanline sweep
   - Cryptographic decode (logo/nav)
   - Border wireframe draw (avatar)
   - Digital glitch flash (avatar photo)
   - Word-by-word up-sweep (title)
   - Echo slide (intro lines)
   - Scale + count-up (GitHub box)
   - Bounce drop (scroll prompt)
   - Cursor spawn (center → glowing dot)

### 57. **Text Comet Stream Animation**
   - Reverse character-by-character entry
   - Rightmost character lands first
   - Randomized Y-coordinate within threshold
   - 1-2 second total duration
   - Parallax offset from avatar center

### 58. **Thermal Bleed Transition (Hero → About)**
   - Avatar morph to Plasma Asset
   - GitHub box melt + splinter to 4 Tech boxes
   - Scroll prompt migrate to "[ PROFILE ENGINE ]"
   - Cursor morph: Celestial dot → Plasma reticle
   - Ambient plasma glow bleed upward
   - Bio text fade-in with heat haze state

### 59. **Portal Inversion Transition (About → Projects)**
   - Plasma Asset morph to VR Headset
   - Headset expansion to 100vw/100vh
   - Vacuum suction pull (boxes + text → cards)
   - Flash white palette inversion
   - Environment shift: Dark → Light Mode
   - Cursor morph: Plasma core → Aerodynamic ring

### 60. **VR Gallery Environment Setup**
   - CSS 3D perspective initialization
   - Hallway vanishing point alignment
   - Central asset positioning
   - HUD header snapping to top edge

### 61. **Mission Impossible Wire Drop Sequence**
   - Drop 1 (Back): Combat Bot + Connect 4 (0.5s)
   - Drop 2 (Middle): HK Bus + AI Image Detector (0.5s delay)
   - Drop 3 (Front): Climbing App + RAG Agent (0.5s delay)
   - Line snap/retract timing
   - Physics engine activation post-drop

### 62. **Spring Physics Engine**
   - Tether system for each card
   - Oscillation damping
   - Wind force application
   - Gravity well attraction
   - Real-time requestAnimationFrame updates

### 63. **Shatter & Flood Transition (Projects → Skills)**
   - Scene vibration/shake
   - Central asset rupture/explosion
   - Headset leak water rise
   - Project cards float upward (buoyancy)
   - Indigo water flood WebGL distortion
   - Scroll hijack: Vertical → Horizontal
   - Camera pitch downward
   - Cursor morph: Aerodynamic ring → Bioluminescent bait

### 64. **Boids Flocking System**
   - Boid entity initialization (per skill)
   - Steering behavior calculations
   - Reef orbit mechanics
   - Feeding frenzy trigger logic
   - Shockwave particle reset

### 65. **Tectonic Drain Transition (Skills → Contact)**
   - Rift opening animation
   - Whirlpool vortex formation
   - Water drainage velocity curve
   - Boid scatter logic
   - Camera tilt 90° downward
   - Scroll input reset (horizontal → vertical)
   - Abyss plunge camera movement
   - Indigo → black fade
   - Deceleration to landing

### 66. **Flashlight Lighting System**
   - 250px radial gradient
   - Stone texture reveal logic
   - Dynamic drop-shadow angle calculation
   - Click detection for hidden torch spot

### 67. **Ignition & System Override**
   - Flashlight expansion animation
   - Firelight ambient flood
   - Texture despawn (glitch effect)
   - Physics/shader unmount
   - Footer grid drop-in
   - Cursor normalization
   - Sign-off fade-in

### 68. **Scroll Progress Tracking**
   - Hero section scroll percentage (0-100%)
   - Thermal Bleed trigger at 20%
   - Section-to-section transition detection
   - Material state updates (logo aging)
   - Parallax offset calculations

### 69. **Mouse Tracking System**
   - requestAnimationFrame loop
   - X/Y coordinate capture
   - Velocity calculation (for wind physics)
   - Debounce logic (600ms idle re-roll)
   - Custom cursor positioning

### 70. **WebGL/Canvas Systems**
   - Liquid ripple shader (avatar click)
   - SVG displacement filter (text heat haze)
   - Glass shatter explosion (Projects → Skills)
   - Water distortion effect (Skills section)
   - Plasma particle effects
   - Boids particle rendering

---

## **TOTAL COMPONENT COUNT**

- **DOM Components**: 54
- **Animation/Transition Systems**: 16
- **Physics Engines**: 3 (Spring, Buoyancy, Boids)
- **Shader/Canvas Systems**: 5

**GRAND TOTAL: 78 discrete, trackable components**

---

## **FILE STRUCTURE: COMPONENT + ANIMATION + EFFECTS**

Each component has **3 associated files**:
1. **Component.tsx** - UI structure & state
2. **Component.animation.ts** - Entry/transition animations (CSS keyframes, Framer Motion)
3. **Component.effects.ts** - Interactions (hover, click, drag, scroll triggers)

```
src/
│
├── components/
│   │
│   ├── Global/
│   │   ├── LoadingScreen/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── LoadingScreen.animation.ts
│   │   │   └── LoadingScreen.effects.ts
│   │   │
│   │   └── Header/
│   │       ├── Header.tsx
│   │       ├── Header.animation.ts (cryptographic decode)
│   │       └── Header.effects.ts (logo tilt, warp click, material aging)
│   │
│   ├── Hero/
│   │   ├── HeroSection/
│   │   │   ├── HeroSection.tsx (wrapper)
│   │   │   ├── HeroSection.animation.ts
│   │   │   └── HeroSection.effects.ts
│   │   │
│   │   ├── AvatarContainer/
│   │   │   ├── AvatarContainer.tsx
│   │   │   ├── AvatarContainer.animation.ts (wireframe draw, glitch flash, morph to Plasma Asset)
│   │   │   └── AvatarContainer.effects.ts (X-ray flashlight, hover circle mask, idle re-roll 600ms, click ripple, cycle on background click)
│   │   │
│   │   ├── MainTitle/
│   │   │   ├── MainTitle.tsx
│   │   │   ├── MainTitle.animation.ts (comet stream: reverse char entry, randomized Y, 1-2s duration)
│   │   │   └── MainTitle.effects.ts (parallax scroll, hover magnetic pull + glow)
│   │   │
│   │   ├── IntroLines/
│   │   │   ├── IntroLines.tsx (2 lines: role + location)
│   │   │   ├── IntroLines.animation.ts (echo slide: fade + 10px right)
│   │   │   └── IntroLines.effects.ts (orange selection color, parallax sync)
│   │   │
│   │   ├── GitHubBox/
│   │   │   ├── GitHubBox.tsx
│   │   │   ├── GitHubBox.animation.ts (scale 0.9→1.0, count-up numbers 0000→1204, heartbeat dot)
│   │   │   ├── GitHubBox.effects.ts (click→GitHub link, hover→glow+pulse heartbeat, melt during transition)
│   │   │   └── GitHubBox.splitAnimation.ts (splinter into 4 Tech boxes during Thermal Bleed)
│   │   │
│   │   └── StatusRow/
│   │       ├── StatusRow.tsx
│   │       ├── StatusRow.animation.ts (cryptographic decode)
│   │       └── StatusRow.effects.ts (static, no interaction)
│   │
│   ├── About/
│   │   ├── AboutSection/
│   │   │   ├── AboutSection.tsx (wrapper)
│   │   │   ├── AboutSection.animation.ts
│   │   │   └── AboutSection.effects.ts
│   │   │
│   │   ├── SectionHeader/
│   │   │   ├── SectionHeader.tsx ([ PROFILE ENGINE ])
│   │   │   ├── SectionHeader.animation.ts (migrate from scroll prompt)
│   │   │   └── SectionHeader.effects.ts (hover glitch/flicker neon)
│   │   │
│   │   ├── BioText/
│   │   │   ├── BioText.tsx
│   │   │   ├── BioText.animation.ts (heat haze blur+glow entry state)
│   │   │   └── BioText.effects.ts (cursor sweep cooling→crisp focus, trail heating back up)
│   │   │
│   │   ├── TechStackBox/
│   │   │   ├── TechStackBox.tsx (AI, UI, Embedded, blank)
│   │   │   ├── TechStackBox.animation.ts (slide in from left sequentially, border flash orange)
│   │   │   └── TechStackBox.effects.ts (hover glow+brighten, click/shoot→1.5s plasma melt+distortion+snap back)
│   │   │
│   │   └── PlasmaOrb/
│   │       ├── PlasmaOrb.tsx (2.5D/3D rotating asset)
│   │       ├── PlasmaOrb.animation.ts (slow idle rotation entry, morph to VR headset)
│   │       └── PlasmaOrb.effects.ts (hover track cursor 3D, click emit fire/sparks, armed state fires plasma to boxes)
│   │
│   ├── Projects/
│   │   ├── ProjectsSection/
│   │   │   ├── ProjectsSection.tsx (wrapper, VR environment)
│   │   │   ├── ProjectsSection.animation.ts (VR headset expansion, HUD snap, 3D perspective init)
│   │   │   └── ProjectsSection.effects.ts (scroll hijack prevention, physics system lifecycle)
│   │   │
│   │   ├── VRHeadset/
│   │   │   ├── VRHeadset.tsx (expands to 100vw/100vh)
│   │   │   ├── VRHeadset.animation.ts (morph from Plasma Asset, expansion timing, flash white)
│   │   │   └── VRHeadset.effects.ts (viewport containment, leak detection during Shatter)
│   │   │
│   │   ├── Gallery3D/
│   │   │   ├── Gallery3D.tsx (CSS 3D perspective, hallway setup)
│   │   │   ├── Gallery3D.animation.ts (perspective init, vanishing point alignment)
│   │   │   └── Gallery3D.effects.ts (none - static environment)
│   │   │
│   │   ├── CentralAsset/
│   │   │   ├── CentralAsset.tsx (floating prism/globe at vanishing point)
│   │   │   ├── CentralAsset.animation.ts (light emission, [ MODERN GALLERY ] label)
│   │   │   └── CentralAsset.effects.ts (rupture/explode fragments during Shatter & Flood)
│   │   │
│   │   ├── ProjectCard/
│   │   │   ├── ProjectCard.tsx (6 instances: Climbing, RAG, Connect4, HK Bus, Combat Bot, AI Detector)
│   │   │   ├── ProjectCard.animation.ts (Mission Impossible wire drop, scale by depth, position in hallway)
│   │   │   └── ProjectCard.effects.ts (spring physics suspend, wind draft push+tilt, fold corner on hover, drag→tear, click→modal, gravity well suction, buoyancy float)
│   │   │
│   │   ├── ProjectTag/
│   │   │   ├── ProjectTag.tsx
│   │   │   ├── ProjectTag.animation.ts (orbit around modal on expand)
│   │   │   └── ProjectTag.effects.ts (hover elevate+sharpen shadow)
│   │   │
│   │   └── SpringPhysicsManager/
│   │       ├── SpringPhysicsManager.tsx (non-visual controller)
│   │       ├── SpringPhysicsManager.animation.ts (requestAnimationFrame loop setup)
│   │       └── SpringPhysicsManager.effects.ts (tether calculations, wind force, gravity well attraction, physics switching)
│   │
│   ├── Skills/
│   │   ├── SkillsSection/
│   │   │   ├── SkillsSection.tsx (wrapper)
│   │   │   ├── SkillsSection.animation.ts (water flood entry, indigo environment)
│   │   │   └── SkillsSection.effects.ts (scroll hijack: vertical→horizontal pan)
│   │   │
│   │   ├── SkillParticle/
│   │   │   ├── SkillParticle.tsx (individual boid entity)
│   │   │   ├── SkillParticle.animation.ts (flocking algorithm, orbit default reef)
│   │   │   └── SkillParticle.effects.ts (cursor bait attraction, feeding frenzy speed-up, shockwave reset)
│   │   │
│   │   ├── CategoryReef/
│   │   │   ├── CategoryReef.tsx (4 reefs: AI, UI, Software, Hardware)
│   │   │   ├── CategoryReef.animation.ts (radial gradient glow)
│   │   │   └── CategoryReef.effects.ts (hover intensify glow+orbit speed increase)
│   │   │
│   │   ├── FoodParticle/
│   │   │   ├── FoodParticle.tsx (golden spawned food)
│   │   │   ├── FoodParticle.animation.ts (sink slowly, consumed particle fade)
│   │   │   └── FoodParticle.effects.ts (trigger feeding frenzy on spawn)
│   │   │
│   │   ├── SectionHeader/
│   │   │   ├── SectionHeader.tsx ([ DEEP ECOSYSTEM ])
│   │   │   ├── SectionHeader.animation.ts (opacity 0.2 entry)
│   │   │   └── SectionHeader.effects.ts (click→trigger WebGL shockwave displacement, particle reset)
│   │   │
│   │   └── BoidsFlockingManager/
│   │       ├── BoidsFlockingManager.tsx (non-visual controller)
│   │       ├── BoidsFlockingManager.animation.ts (boid initialization, steering behavior setup)
│   │       └── BoidsFlockingManager.effects.ts (separation, alignment, cohesion, reef orbit, feeding logic)
│   │
│   ├── Contact/
│   │   ├── ContactSection/
│   │   │   ├── ContactSection.tsx (wrapper, pitch-black cave)
│   │   │   ├── ContactSection.animation.ts (black background entry, texture reveal via flashlight)
│   │   │   └── ContactSection.effects.ts (flashlight cursor tracking, wall reveal on sweep)
│   │   │
│   │   ├── CaveEnvironment/
│   │   │   ├── CaveEnvironment.tsx (carved stone textures, wet rock appearance)
│   │   │   ├── CaveEnvironment.animation.ts (landing deceleration from Tectonic Drain)
│   │   │   └── CaveEnvironment.effects.ts (3D lighting simulation based on cursor angle, texture responsiveness)
│   │   │
│   │   ├── FlashlightCursor/
│   │   │   ├── FlashlightCursor.tsx (250px radial gradient mask)
│   │   │   ├── FlashlightCursor.animation.ts (none - real-time tracking)
│   │   │   └── FlashlightCursor.effects.ts (mouse follow, reveal textures+text on sweep, hidden torch detection)
│   │   │
│   │   ├── ResumeTitle/
│   │   │   ├── ResumeTitle.tsx
│   │   │   ├── ResumeTitle.animation.ts (none - static carved stone text)
│   │   │   └── ResumeTitle.effects.ts (hover glow white+catch light, click→open resume)
│   │   │
│   │   ├── RoleSubtitle/
│   │   │   ├── RoleSubtitle.tsx (4 roles under Resume)
│   │   │   ├── RoleSubtitle.animation.ts (none - static text)
│   │   │   └── RoleSubtitle.effects.ts (hover 3D drop-shadow based on flashlight angle)
│   │   │
│   │   ├── ContactLink/
│   │   │   ├── ContactLink.tsx (Email, GitHub, LinkedIn)
│   │   │   ├── ContactLink.animation.ts (none - static carved text)
│   │   │   └── ContactLink.effects.ts (hover→white+directional arrow slide, click→open URL)
│   │   │
│   │   ├── HiddenTorchBracket/
│   │   │   ├── HiddenTorchBracket.tsx (unmarked wall spot)
│   │   │   ├── HiddenTorchBracket.animation.ts (reveal [ Ignite Torch ] prompt on sweep)
│   │   │   └── HiddenTorchBracket.effects.ts (flashlight proximity detection, click→ignition)
│   │   │
│   │   └── IgnitionEffect/
│   │       ├── IgnitionEffect.tsx (non-visual state controller)
│   │       ├── IgnitionEffect.animation.ts (flashlight expand 250px→100vw/100vh, firelight flood)
│   │       └── IgnitionEffect.effects.ts (disable flashlight cursor, reveal all text, persist illumination)
│   │
│   └── Footer/
│       ├── FooterSection/
│       │   ├── FooterSection.tsx (wrapper)
│       │   ├── FooterSection.animation.ts (rigid grid drop-in, sign-off fade-in)
│       │   └── FooterSection.effects.ts (System Override trigger detection on scroll)
│       │
│       ├── OverrideText/
│       │   ├── OverrideText.tsx ("> system.override(tototofu);")
│       │   ├── OverrideText.animation.ts (none - static threshold line)
│       │   └── OverrideText.effects.ts (scroll detection trigger, ignite System Override)
│       │
│       ├── FooterColumn/
│       │   ├── FooterColumn.tsx (4 columns)
│       │   ├── FooterColumn.animation.ts (none)
│       │   └── FooterColumn.effects.ts (none - static, accessible)
│       │
│       ├── FooterLink/
│       │   ├── FooterLink.tsx
│       │   ├── FooterLink.animation.ts (none)
│       │   └── FooterLink.effects.ts (hover color shift white, click→navigate)
│       │
│       └── SignOff/
│           ├── SignOff.tsx
│           ├── SignOff.animation.ts (fade-in steady opacity)
│           └── SignOff.effects.ts (none - static)
│
├── transitions/
│   ├── ThermalBleed/ (Hero → About)
│   │   ├── ThermalBleed.ts (orchestrator)
│   │   ├── AvatarMorph.ts (avatar→Plasma Asset)
│   │   ├── GitHubSplinter.ts (box→4 Tech boxes)
│   │   ├── ScrollPromptMigrate.ts (prompt→section header)
│   │   ├── CursorMetamorphosis.ts (celestial→plasma reticle)
│   │   └── EnvironmentBleed.ts (cold→warm plasma glow)
│   │
│   ├── PortalInversion/ (About → Projects)
│   │   ├── PortalInversion.ts (orchestrator)
│   │   ├── PlasmaToVR.ts (orb→headset morph)
│   │   ├── VRExpansion.ts (100vw/100vh expansion)
│   │   ├── VacuumPull.ts (boxes+text→cards suction)
│   │   ├── WhiteFlash.ts (palette cleanser)
│   │   └── DarkToLightMode.ts (environment inversion)
│   │
│   ├── VRGallerySetup/ (Projects entry)
│   │   ├── VRGallerySetup.ts (orchestrator)
│   │   ├── CSS3DInit.ts (perspective setup)
│   │   ├── HallwayAlignment.ts (vanishing point)
│   │   ├── CentralAssetPos.ts (anchor positioning)
│   │   └── HUDIntegration.ts (header snap)
│   │
│   ├── MissionImpossibleDrop/ (Projects wire drop)
│   │   ├── MissionImpossibleDrop.ts (orchestrator)
│   │   ├── Drop1Back.ts (Combat Bot + Connect4, 0.5s)
│   │   ├── Drop2Middle.ts (HK Bus + AI Detector, 0.5s delay)
│   │   ├── Drop3Front.ts (Climbing + RAG, 0.5s delay)
│   │   └── WireRetractPhysics.ts (snap+retract logic)
│   │
│   ├── ShatterFlood/ (Projects → Skills)
│   │   ├── ShatterFlood.ts (orchestrator)
│   │   ├── SceneVibration.ts (shake/rumble)
│   │   ├── AssetRupture.ts (core explosion)
│   │   ├── HeadsetLeak.ts (water rise)
│   │   ├── CardBuoyancy.ts (float upward)
│   │   ├── CanvasShatter.ts (glass break animation)
│   │   ├── InkFlood.ts (indigo water rush)
│   │   ├── ScrollHijack.ts (vertical→horizontal)
│   │   └── CameraDiv.ts (pitch downward)
│   │
│   ├── TectonicDrain/ (Skills → Contact)
│   │   ├── TectonicDrain.ts (orchestrator)
│   │   ├── RiftOpening.ts (tectonic animation)
│   │   ├── WhirlpoolVortex.ts (water drain)
│   │   ├── BoidScatter.ts (skill particle escape)
│   │   ├── CameraTilt.ts (90° downward)
│   │   ├── AbyssPlunge.ts (descent to cave)
│   │   ├── Indigo2BlackFade.ts (color transition)
│   │   └── DecelToLanding.ts (hard stop at floor)
│   │
│   └── SystemOverride/ (Contact → Footer)
│       ├── SystemOverride.ts (orchestrator)
│       ├── FlashlightExpand.ts (250px→100vw/100vh)
│       ├── FirelightFlood.ts (warm ambient glow)
│       ├── TextureD espawn.ts (glitch effect)
│       ├── PhysicsUnmount.ts (free memory)
│       ├── FooterDropIn.ts (rigid grid snap)
│       └── CursorNormalize.ts (return to OS pointer)
│
├── physics/
│   ├── SpringPhysics.ts
│   │   ├── calculateTether.ts
│   │   ├── applyDamping.ts
│   │   └── windForce.ts
│   ├── BuoyancyEngine.ts
│   │   ├── floatForce.ts
│   │   ├── bobAnimation.ts
│   │   └── depthFade.ts
│   ├── BoidsFlocking.ts
│   │   ├── separation.ts
│   │   ├── alignment.ts
│   │   ├── cohesion.ts
│   │   └── reefOrbit.ts
│   └── GravityWells.ts
│       ├── wellAttraction.ts
│       ├── wellPulsing.ts
│       └── wellReset.ts
│
├── shaders/
│   ├── liquidRipple.glsl
│   ├── liquidRipple.ts (shader setup)
│   ├── heatHaze.svg
│   ├── glassShatter.ts (canvas explosion)
│   ├── waterDistortion.glsl
│   ├── waterDistortion.ts (shader setup)
│   ├── biolumescence.glsl
│   └── biolumescence.ts (shader setup)
│
├── cursors/
│   ├── CursorManager.tsx (global controller)
│   ├── CursorManager.effects.ts (state transitions)
│   ├── celestialDot.ts
│   ├── plasmaReticle.ts
│   ├── aerodynamicRing.ts
│   └── flashlight.ts
│
├── utils/
│   ├── ScrollHijacker.ts (scroll event interception)
│   ├── MouseTracker.ts (requestAnimationFrame loop)
│   ├── EasingFunctions.ts (timing curves)
│   ├── StateManager.ts (global component state)
│   ├── ScrollProgress.ts (section tracking)
│   └── VelocityCalculator.ts (for wind physics)
│
├── styles/
│   ├── global.css
│   ├── designTokens.css (colors, fonts, spacing)
│   ├── animations.css (keyframe definitions)
│   └── shaders.css (CSS shaders/filters)
│
├── App.tsx (main coordinator)
└── index.css
```

---

## **FILE COUNT BREAKDOWN**

- **Component files (.tsx)**: 54
- **Animation files (.animation.ts)**: 54
- **Effects files (.effects.ts)**: 54
- **Transition orchestrators**: 7 (+ 28 sub-systems)
- **Physics systems**: 4
- **Shader files**: 7
- **Utilities**: 6
- **Cursors**: 5
- **Styles**: 4

**TOTAL: 223 files with clear separation of concerns**

---

## **FILE NAMING CONVENTION**

```
ComponentName/
├── ComponentName.tsx                 # UI structure + state
├── ComponentName.animation.ts        # @keyframes, Framer Motion, entry animations
└── ComponentName.effects.ts          # onClick, onHover, onScroll, onDrag handlers
```

Each file averages **50-150 lines**, making debugging, testing, and iteration seamless.

This is your complete blueprint. Ready to start building now?
