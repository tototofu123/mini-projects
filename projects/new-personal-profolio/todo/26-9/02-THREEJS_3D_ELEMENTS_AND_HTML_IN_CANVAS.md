# 02 // Three.js 3D Elements & HTML-in-Canvas System

## 1. Problem Statement & User Diagnosis
- **"Still don't see much 3D elements or HTML in canvas"**: The initial 3D prototypes (Space Station & Plasma Gun) were removed to resolve severe frame-rate lag, but their removal left the portfolio looking mostly flat and 2D.
- The portfolio needs **interactive, tactile 3D elements** that reflect Toto's actual engineering (climbing holds, robot mechanics, telemetry) and **HTML-in-Canvas overlays** (interactive DOM buttons and pills floating in 3D coordinate space) without dropping below 60 FPS.

---

## 2. Planned 3D Interactive Features

### Feature A: 3D Climbing Hold & Wall Mesh Inspector (`climbing-ai`)
- **Visual**: A 3D textured bouldering hold floating in a subtle wireframe coordinate grid.
- **Interactions**:
  - Click & drag to rotate the hold 360 degrees.
  - Interactive normal vector arrows indicating grip friction and incident force vectors.
  - Color grade transition based on tilt angle.
- **HTML-in-Canvas Overlay**:
  - An interactive React HUD pill floating in 3D space anchored to the hold's apex using `vector.project(camera)`:
    - `[ HOLD TYPE: DUAL-TEX SLOPER ]`
    - `[ INCIDENT FORCE: 420N // CRIMP TENSION ]`
    - `[ V-GRADE PREDICTION: V6 ]`

### Feature B: 3D Combat Bot Exploded Chassis Viewer (`robotics`)
- **Visual**: A 3D low-poly wireframe/solid model of Toto's 1st-Place Combat Robot chassis.
- **Interactions**:
  - "EXPLODE VIEW" slider / toggle: expands the chassis plates to reveal the internal subsystems (Arduino Nano BLE, L298N H-Bridge, dual 12V DC motors, battery bay, kinetic wedge).
  - Hovering any component highlights it with an emerald glow (`#4ADE80`).
- **HTML-in-Canvas Overlay**:
  - Interactive floating telemetry cards pointing directly to the 3D components:
    - Tether line from Arduino: *"3.3V Logic Rail // State Machine Controller"*
    - Tether line from Motors: *"350 RPM High-Torque Gearmotors"*
    - Tether line from Chassis: *"6061 Aluminum Impact Wedge"*

### Feature C: 3D Multi-Agent Particle Swarm (`ai`)
- **Visual**: A 3D network topology where nodes represent the HKT agents and Google ADK swarm.
- **Interactions**:
  - Nodes pulse and emit data packets along cubic bezier spline curves.
  - Hovering a node pauses that branch and presents an HTML card showing latency, token payload, and role.

---

## 3. The HTML-in-Canvas Architecture

To combine the visual power of WebGL with the rich accessibility and interaction of React DOM, implement the **Projected Screen Space Anchor Pattern**:

```typescript
// Pattern: Project 3D vector to 2D screen coordinates
function updateHTMLAnchor(mesh: THREE.Mesh, camera: THREE.Camera, containerEl: HTMLElement, domElement: HTMLElement) {
  const vector = new THREE.Vector3();
  mesh.getWorldPosition(vector);
  vector.project(camera);

  // Convert normalized device coordinates (-1 to +1) to CSS pixels
  const x = (vector.x * 0.5 + 0.5) * containerEl.clientWidth;
  const y = (-(vector.y * 0.5) + 0.5) * containerEl.clientHeight;

  domElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  domElement.style.display = vector.z < 1 ? 'block' : 'none'; // Occlusion culling
}
```

---

## 4. Strict Zero-Lag Performance Rules for 3D

1. **`IntersectionObserver` Auto-Freezing (Mandatory)**:
   - When a 3D canvas is not in the viewport, the `requestAnimationFrame` loop **must halt immediately**.
   - Canvas resumes rendering only when at least 15% of the element is visible.
2. **Device Pixel Ratio Clamping**:
   - `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))` — never render at native 4K or 3x mobile Retina resolutions.
3. **Low Polygon Budgets**:
   - Keep individual meshes under **2,500 vertices**.
   - Use procedural geometries (`BoxGeometry`, `CylinderGeometry`, `BufferGeometry`) rather than massive 50MB GLTF assets.
4. **Clean WebGL Lifecycle**:
   - All geometries, materials, and textures must be disposed in `useEffect` cleanup return functions.

---

## 5. Implementation Tasks
- [ ] Scaffold `src/three/components/ClimbingHoldViewer.tsx`.
- [ ] Scaffold `src/three/components/CombatBotChassisViewer.tsx`.
- [ ] Implement `useIntersectionFreeze` custom hook for auto-pausing Three.js render loops.
- [ ] Implement HTML-in-Canvas projection layer with zero DOM thrashing (throttled updates).
- [ ] Embed 3D Hold Inspector inside `ClimbingTechSection.tsx`.
- [ ] Embed 3D Chassis Viewer inside `PhysicalSystemsSection.tsx`.
