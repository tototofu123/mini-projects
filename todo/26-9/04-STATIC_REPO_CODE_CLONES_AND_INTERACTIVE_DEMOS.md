# 04 // Static Repo Code Clones & Interactive Client-Side Demos

## 1. Problem Statement & User Insight
- **User Directive**: *"If you want interaction with my codebase, you can just make some static code clone from my repos and then show it without pointing to any endpoint, same for demonstration — you either use code..."*
- Rather than showing static screenshots or requiring a live backend server with API keys, we can create **self-contained client-side interactive sandboxes** ported directly from Toto's real repositories (`hkust-climbing-society`, `climbing-ai`, `connect4`, `perihel-transcribe`, HKT workflow).
- Visitors can interact, click buttons, test scenarios, and play algorithms live with **zero latency, zero API costs, and zero network dependencies**.

---

## 2. The 4 Interactive Sandboxes

### Demo 1: The HKT Email Triage Playground
- **Origin**: Toto's HKT Engineer Internship (~200-node Power Automate workflow).
- **Client-Side Simulation**:
  - Provides 3 pre-loaded real-world enterprise email templates:
    1. *Emergency Trunk Fiber Outage* (Severe SLA breach risk)
    2. *Enterprise Lease Billing Discrepancy* (Commercial escalation)
    3. *Routine QoS Router Configuration Request* (Standard queue)
  - **Interaction**:
    - User clicks **"Execute Ingestion Pipeline"**.
    - Watch the raw email HTML bloat and disclaimers get stripped in real-time.
    - Simulated parallel classification agents evaluate intent, priority (P0/P1/P2), and department with a realistic 350ms asynchronous pulse.
    - Generates and renders a live **Microsoft Teams Adaptive Card** preview with suggested 1-click engineer responses!
- **Zero Endpoint Dependency**: All parsing and schema validations run in pure client-side TypeScript.

---

### Demo 2: Interactive Climbing Route Builder & Beta Solver
- **Origin**: `hkust_climb_soc_web`, `holds-on-wall`, and `climbing-ai`.
- **Client-Side Simulation**:
  - An interactive canvas featuring the HKUST bouldering wall (`boulderwall-vector.webp`).
  - **Interaction**:
    - Users click holds on the wall to designate:
      - `[START]` (Green ring)
      - `[HAND INTERMEDIATE]` (Blue ring)
      - `[FOOT CRIMP]` (Orange ring)
      - `[TOP FINISH]` (Red ring)
    - As holds are placed, an SVG trajectory connects them and dynamically computes the **Route Grade (e.g. V3 $\rightarrow$ V6)** based on Euclidean distances and hold angle heuristics.
    - Features a **"Simulate Beta"** button that animates a vector stickman calculating reach and balance across the placed holds!

---

### Demo 3: Playable Connect4 Minimax AI
- **Origin**: Toto's `connect4` repository (10,000+ board states evaluated per second).
- **Client-Side Simulation**:
  - A playable 7x6 Connect4 board running directly in the browser.
  - **Interaction**:
    - Human player plays Red discs.
    - Toto's **Minimax algorithm with Alpha-Beta pruning** calculates AI moves for Yellow discs.
    - Search Depth slider: $1 \dots 6$ plies.
    - Live telemetry HUD displays:
      - `Visited States: 4,820`
      - `Alpha-Beta Pruned Branches: 72%`
      - `Move Latency: 14ms`
      - `Evaluation Score: +1.45 (AI Advantage)`
- **Zero Endpoint Dependency**: Pure bitboard logic compiled directly into the React component.

---

### Demo 4: Perihel On-Device Dictation Simulator
- **Origin**: Toto's `perihel-transcribe` repository (Rust + Sherpa Parakeet int8).
- **Client-Side Simulation**:
  - A simulated terminal prompt.
  - **Interaction**:
    - User holds down the simulated **[ RIGHT CTRL ]** hotkey button.
    - An animated audio waveform visualizer pulses with microphone frequency ripples.
    - Upon release, text streams into the terminal character-by-character with realistic streaming token latency.
    - Live telemetry shows: `Peak Heap: 114.2 MB // Zero Cloud Telemetry // Local Sherpa Runtime`.

---

## 3. Directory & Component Architecture

```
src/
└── components/
    └── Demos/
        ├── HktTriagePlayground/
        │   ├── HktTriagePlayground.tsx
        │   ├── sampleEmails.ts
        │   └── mockClassifier.ts
        ├── RouteBuilderCanvas/
        │   ├── RouteBuilderCanvas.tsx
        │   └── gradeCalculator.ts
        ├── Connect4Playable/
        │   ├── Connect4Playable.tsx
        │   └── minimaxBitboard.ts
        └── PerihelTerminal/
            └── PerihelTerminal.tsx
```

---

## 4. Implementation Tasks
- [ ] Build `HktTriagePlayground.tsx` with email selector, pre-flight sanitizer, and Teams Adaptive Card renderer.
- [ ] Build `RouteBuilderCanvas.tsx` with hold-clicking, difficulty grade heuristics, and stickman trajectory.
- [ ] Build `Connect4Playable.tsx` with playable board, client-side Minimax solver, and search telemetry.
- [ ] Build `PerihelTerminal.tsx` with hotkey listener and audio waveform visualizer.
- [ ] Embed the sandboxes directly into their respective sections (`ProductionAISection`, `ClimbingTechSection`, `EngineeringLabSection`).
