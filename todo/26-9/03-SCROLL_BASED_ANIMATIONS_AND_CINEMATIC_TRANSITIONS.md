# 03 // Scroll-Based Animations & Cinematic Section Transitions

## 1. Problem Statement & User Diagnosis
- **"Where is the section-into-section animation transition also"**: The portfolio currently stacks sections with simple divider lines and basic in-view reveals.
- The user originally envisioned an epic **Master Flow** (Future $\rightarrow$ Modern $\rightarrow$ Ancient $\rightarrow$ Reboot) with cinematic transitions like thermal bleeds, VR perspective zoom, flood handoffs, and flashlight cave reveals.
- These transitions must be scroll-driven so scrolling feels cinematic and cohesive, but implemented using **native sticky containers** rather than wheel hijacking so it never stutters or lags.

---

## 2. The 5 Master Transitions Roadmap

```
[ HERO: FUTURE / FIRE ]
       │
       ▼ Transition 1: Thermal Bleed & Signal Morph
[ APPLIED AI: CLOUD SWARM ]
       │
       ▼ Transition 2: VR Portal Zoom & Mechanical Airlock
[ ROBOTICS: PHYSICAL GROUND ]
       │
       ▼ Transition 3: Kinetic Elevation & Topo Handoff
[ CLIMBING TECH: HIGH-ANGLE TERRAIN ]
       │
       ▼ Transition 4: Tectonic Plunge & Flashlight Chamber
[ THE LAB: POST-MORTEM CAVE ]
       │
       ▼ Transition 5: Hard Snap & System Override
[ COMMAND FOOTER: REALITY REBOOT ]
```

---

## 3. Detailed Transition Mechanics

### Transition 1: Hero $\rightarrow$ Production AI (Thermal Bleed)
- **Concept**: The heat from the kinetic athlete and systems engines begins to melt the bottom boundary.
- **Visuals**:
  - A deep orange/amber plasma gradient bleeds upward from the bottom of the viewport.
  - The Hero's bottom telemetry bar dissolves into connecting SVG signal lines that feed directly into the HKT Ingestion Webhook node.
- **Scroll Mapping**:
  - `0% - 40%`: Hero elements scale down slightly ($1.0 \rightarrow 0.95$) and fade to $0.6$ opacity.
  - `40% - 80%`: Orange plasma gradient sweeps across the screen; signal lines animate.
  - `80% - 100%`: Stage 01 of the 200-node workflow snaps into full focus.

### Transition 2: Production AI $\rightarrow$ Robotics (VR Portal Zoom)
- **Concept**: Moving from cloud multi-agent abstract space into tactile physical robotics.
- **Visuals**:
  - The AI node network contracts into a central aperture (the "VR Headset / Aperture Lens").
  - The viewport performs a perspective push-in ($scale: 1 \rightarrow 15$).
  - A hard flash with horizontal speed-line particles transitions the dark slate background into the telemetry grid of the combat robotics arena.
- **Scroll Mapping**:
  - Pinned for $200\text{vh}$ scroll track. Progress drives camera $Z$-depth.

### Transition 3: Robotics $\rightarrow$ Climbing Tech (Kinetic Topo Elevation)
- **Concept**: Moving from flat arena ground to vertical high-angle rock & ice faces.
- **Visuals**:
  - Ground-plane circuit schematics transition into vector topographic contour elevation lines.
  - An animated altimeter HUD counter rolls from $+0\text{m}$ to $+15\text{m}$ vertical elevation.
  - The combat bot chassis moves offscreen as the 3D climbing hold mesh enters from above.

### Transition 4: Climbing Tech $\rightarrow$ The Lab (Tectonic Plunge & Flashlight Cave)
- **Concept**: Descending from the open outdoor heights into an underground post-mortem bunker.
- **Visuals**:
  - Ambient light extinguishes down to pure pitch black (`#000000`).
  - The cursor morphs into a **250px Radial Flashlight** with subtle edge noise.
  - As the user scrubs their mouse across the pitch-black viewport, the amber-carved incident reports and telemetry logs are discovered in the dark.
  - Finding and clicking the hidden "Ignition Switch" permanently ignites the room with amber floodlight.

### Transition 5: The Lab $\rightarrow$ Command Footer (The System Override)
- **Concept**: The iconic line from Toto's master design document:
  ```text
  > system.override(tototofu); // take off headset
  ```
- **Visuals**:
  - The user crosses a crisp 1px glowing cyan laser boundary.
  - All heavy visual shaders and cave textures despawn in a single scanline wipe.
  - The page snaps back to reality: a hyper-clean, rigid, minimalist engineering command footer with instant-copy contact info.

---

## 4. Zero-Lag Sticky Scroll Architecture

To prevent lag or trackpad hitching, **never intercept native `wheel` events**. Instead, use the **Native Sticky Track Pattern**:

```tsx
// Pattern: Native Sticky Viewport Transition Track
export const ThermalBleedTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
  const plasmaY = useTransform(scrollYProgress, [0.3, 1], ['100%', '0%']);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden gpu-layer">
        <motion.div style={{ scale, opacity }}>
          {/* Transition Visuals */}
        </motion.div>
      </div>
    </div>
  );
};
```

---

## 5. Implementation Tasks
- [ ] Implement `src/transitions/ThermalBleedTrack.tsx` (Hero $\rightarrow$ AI).
- [ ] Implement `src/transitions/VRPortalZoomTrack.tsx` (AI $\rightarrow$ Robotics).
- [ ] Implement `src/transitions/TopoElevationTrack.tsx` (Robotics $\rightarrow$ Climbing).
- [ ] Implement `src/transitions/FlashlightCaveTrack.tsx` (Climbing $\rightarrow$ Lab).
- [ ] Implement `src/transitions/SystemOverrideSnap.tsx` (Lab $\rightarrow$ Footer).
- [ ] Wire transition tracks into `src/App.tsx`.
