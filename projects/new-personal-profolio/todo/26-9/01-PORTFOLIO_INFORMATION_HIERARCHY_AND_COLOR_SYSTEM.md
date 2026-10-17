# 01 // Portfolio Information Hierarchy & Standout Color System

## 1. Problem Statement & User Diagnosis
- **"Too much info to swallow"**: The current cards contain dense blocks of technical explanations, multi-paragraph engineering summaries, and nested lists. To an executive, recruiter, or engineering manager, this feels like an academic paper rather than a high-impact engineering portfolio.
- **"Key things don't have standout color to distinguish"**: Vital achievements (1st Place Champion out of 20+ teams, National Team Athlete, 200-Node Enterprise Workflow) blend into the background palette of generic slate borders and subtle text.

---

## 2. The 5-Second Scan Rule (Executive Hierarchy)
A visitor must understand the core narrative in **5 seconds**, deep-dive in **30 seconds**, and inspect technical artifacts in **2 minutes**.

```
[ LEVEL 1: HERO PUNCH ] (5 Seconds)
  ├── 1 Big Bold Metric (e.g. "1st / 20+ Teams", "14th in Asia", "~200 Nodes")
  ├── High-Contrast Standout Tag
  └── Visual Graphic / 3D Canvas / Video preview
       │
[ LEVEL 2: SCANNABLE ARCHITECTURE ] (30 Seconds)
  ├── Interactive Visual Diagram (Flowchart, Schematic, Topo Map)
  ├── 3-Bullet Telemetry Summary (What was broken, How it was solved, Measured impact)
  └── Standout Tech Pills
       │
[ LEVEL 3: DEEP ARTIFACT DRAWER ] (2 Minutes — Collapsed by Default)
  ├── Interactive Playground / Static Code Sandbox
  ├── Detailed Failure Mode & Root-Cause Analysis
  └── Raw Code Payload / JSON Contract Artifact
```

---

## 3. The Standout Signature Color System

To give key things unmistakable visual hierarchy, assign strict color semantics across the entire website:

| Color Token | Hex Code | Semantic Role | Specific Highlights |
|---|---|---|---|
| **Championship Emerald** | `#4ADE80` / `rgba(74, 222, 128, 0.2)` | **Championships, Victory Tiers & Verified Deployments** | • 1st Place Overall Champion (20+ Teams)<br>• Best Technical Architecture Award<br>• 90% Precision Score (Line-Follower)<br>• 99.98% Parse Rate (HKT Pipeline) |
| **High-Voltage Kinetic Orange** | `#F97316` / `rgba(249, 115, 22, 0.25)` | **National Athletics, Physical Engineering & Leadership** | • Hong Kong National Speed & Ice Climbing Team<br>• 14th in Asian Championships (World Ranked 55th)<br>• HKUST Team Captain (200+ Members, +25%)<br>• Hardware Actuators & 12V Motor Drives |
| **Cyber Signal Cyan** | `#38BDF8` / `rgba(56, 189, 248, 0.2)` | **Applied AI, Multi-Agent Swarms & Machine Learning** | • 200-Node HKT Power Automate Workflow<br>• Google ADK Multi-Agent Swarm (482 Locations)<br>• llama.cpp 1B GGUF Offline Resilience<br>• Reinforcement Learning Route Generator |
| **Deep Telemetry Purple** | `#A855F7` / `rgba(168, 85, 247, 0.2)` | **Low-Level Systems, Microcontrollers & Game Theory** | • Perihel Transcribe (<120MB Rust Engine)<br>• STM32F103 Register-Level Bare Metal C<br>• Connect4 Minimax Alpha-Beta (10,000 states/s)<br>• Inverse Kinematics Stickman Beta |

---

## 4. Layout Simplification Specs

### A. Card Restructuring (Anti-Overwhelm)
1. **Limit Body Text**: Restrict primary card descriptions to a maximum of **2 sentences** (under 40 words).
2. **Promote Visuals First**:
   - Every card must lead with a visual: Video loop, interactive SVG diagram, 3D model, or high-res photo.
   - Text sits beside or below the visual as telemetry labels.
3. **Hero Metrics as Giant Typography**:
   - Numbers should be rendered in `font-syne text-3xl font-extrabold` with standout colors rather than buried in paragraphs.

### B. Progressive Disclosure Drawers
- Heavy technical incident reports (e.g. Failure Mode, Ingestion Specs, Raw JSON payloads) should be placed inside a clean expandable `<details>` drawer:
  - Default: **Collapsed** — shows only summary chips and visual diagram.
  - On Click: **Expands** with smooth CSS height transition for technical recruiters who want full proof.

---

## 5. Implementation Checklist
- [ ] Audit every card across Hero, AI, Robotics, Climbing, and Lab.
- [ ] Replace multi-paragraph text blocks with 2-line punches + metric badges.
- [ ] Apply the 4 standout color tokens (`#4ADE80`, `#F97316`, `#38BDF8`, `#A855F7`) to key badges and borders.
- [ ] Convert dense code blocks into collapsible "View Raw Artifact" drawers.
- [ ] Ensure all card containers have `overflow: visible` and generous padding to eliminate any clipping.
