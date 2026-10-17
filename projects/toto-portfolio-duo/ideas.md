# Toto Portfolio Duo — Design Direction

## Three possible directions

### Theme Name: Technical Field Notes
**Very Brief Intro:** A calm, editorial portfolio that feels like a well-kept engineering notebook, paired with a companion showcase that opens selected work into interactive technical artifacts. It signals substance first and visual ambition second.

**Probability:** 0.07

### Theme Name: Civic Signal Archive
**Very Brief Intro:** A public-service-inspired information system with maps, routes, cards, and evidence panels. It is grounded, local, and useful, giving the work an applied-product character.

**Probability:** 0.04

### Theme Name: Nocturne Console
**Very Brief Intro:** A dark, cinematic control-room environment with glowing system traces and full-screen visual transitions. It would make the showcase feel theatrical, but risks overpowering the actual work.

**Probability:** 0.09

## Replaced direction: Technical Field Notes

Technical Field Notes produced a coherent but overly familiar editorial portfolio. Its decorative traces, hero collage, rail, and card grid were not grounded enough in the actual selected projects. It is retained as a record of the rejected approach and must not drive the rebuild.

## New direction: Constraint Ledger

### Design Movement
**Technical field reports and change-control ledgers, not an editorial portfolio template.** The normal portfolio presents six constraints, six system responses, and six evidence trails. It reads as work-in-progress intelligence rather than a collection of polished cards.

### Core Principles
1. **Constraint before technology.** The problem headline arrives before the project name or stack.
2. **Evidence over atmosphere.** Every visual relationship must correspond to a real data flow, hardware boundary, workflow, or limitation.
3. **Unequal by design.** Projects receive visual weight based on available evidence rather than a uniform grid.
4. **Honest blank space.** Missing visuals become explicit evidence requests, never decorative fake artifacts.

### Color Philosophy
Warm paper is kept only as a reading surface. Graphite carries all ordinary information. Signal Blue `#1E5EFF` marks an action, decision, source link, or system transition. There are no project-specific rainbow colours.

### Layout Paradigm
A vertical **constraint ledger**: large constraint statements interrupt dense case annotations. The page alternates scale and density, with a narrow annotations strip that holds stack, role, status, and source links. There is no project-card grid.

### Signature Elements
1. Constraint IDs, such as `C-01`, instead of decorative project numbers.
2. Response arrows that name a real relationship, such as `input → route → result`.
3. Explicit `LIMIT` panels that make scope honest and useful.

### Interaction Philosophy
Visitors reveal the response, proof, and limit of a case entry in sequence. A static reading order remains complete without interaction. Detail expansion should feel like opening a dossier, not like hovering a decorative card.

### Animation
Only case-entry separators and evidence drawers move. A line can extend between a constraint and its response; it must never draw a fake circuit. All motion is optional and reduced-motion safe.

### Typography System
Use a compact grotesk for constraints and metadata, a robust serif only for the occasional human question, and a mono face for the system-response label. Avoid oversized generic portfolio headlines.

### Brand Essence
**Six constraints, six systems, and a builder who makes the relationship between them legible.**

Personality: **specific, candid, tenacious**.

### Brand Voice
Headlines state a real difficulty; body copy names the response and its limits. Examples: “When a model choice changes the answer.” “A reminder system should not become another place to forget.”

### Wordmark & Logo
The TL mark becomes a small operational stamp rather than a hero logo. It may appear beside an evidence source or case ID, not as a prominent decorative brand object.

### Signature Brand Color
**Signal Blue — `#1E5EFF`** remains the only active-system colour.

## Style Decisions

- Each Constraint Ledger record must take visual weight from the evidence currently available. Evidence-rich systems can expand into route or artifact panels; proof-limited systems must display a named evidence request and visible LIMIT state.
- The System Viewer centers one large inspectable artifact per project: an interface handoff, decision surface, hardware boundary, classification boundary, information topology, or return loop. Text panels only support that object.
- The first screen leads with a working premise, not self-description. Signal Blue is reserved for decisions, evidence/source links, route transitions, and primary actions.

### Design Movement
**Contemporary editorial design meets scientific field notebooks and museum-style interactive exhibits.** The normal portfolio behaves like a precise case-study publication; the showcase behaves like an explorable lab bench for the same work.

### Core Principles
1. **Evidence before spectacle.** Every visual flourish must lead back to a build decision, an artifact, or a demonstrable capability.
2. **Two modes, one identity.** The normal site and showcase share the same projects, language, and visual DNA, but optimize for different reader intent.
3. **Deliberate asymmetry.** Use side annotations, oversized project numbers, and offset media panels instead of centered marketing blocks.
4. **Calm density.** Make dense technical information readable through generous spacing, short labels, and strong hierarchy.

### Color Philosophy
The primary surface is **warm paper** rather than sterile white, making the normal portfolio feel considered and human. Charcoal ink anchors text and technical diagrams. A single signal-blue accent communicates active systems, links, and live work. The showcase reverses the contrast into dark graphite with the same paper and signal-blue acting as illuminated instruments; it should feel like a continuation, not a separate brand.

### Layout Paradigm
The normal portfolio follows a **marginalia layout**: a narrow persistent left rail carries identity, project index, and reading progress, while the main body uses asymmetric editorial columns. The showcase follows an **artifact navigator**: a horizontal project selector opens one large interactive canvas and a concise evidence drawer, rather than a generic gallery grid.

### Signature Elements
1. **Numbered project markers** such as `01 / CIRCUITBUILDER`, carried through both sites.
2. **Margin annotations** for stack, role, commit-era, and outcome; these behave like field-note labels.
3. **Signal traces**: thin routed lines and diagram nodes that connect project facts without becoming decorative clutter.

### Interaction Philosophy
Interactions should feel like inspecting an object on a desk: focused, reversible, and informative. Hover and focus reveal one additional layer of evidence; clicks open a project dossier. Keyboard navigation remains first-class, and the normal portfolio never hides critical content behind animation.

### Animation
Use restrained motion with a responsive `cubic-bezier(0.23, 1, 0.32, 1)` exit curve. Annotation labels slide 8–12px into place; images reveal through a simple clipped mask; diagram lines draw once when a section enters. The showcase may use slower camera-like pans and object parallax for selected artifacts. All non-essential motion is disabled under `prefers-reduced-motion`.

### Typography System
**DM Sans** supplies clear body text and UI labels. **Instrument Serif** supplies a distinctive, editorial display voice for major statements and project titles. Small metadata uses DM Mono. Headlines are concise, mostly sentence case, and never use generic startup-language.

### Brand Essence
**A portfolio of software systems built with technical curiosity, from hardware and applied AI to useful web products.**

Personality: **precise, inquisitive, grounded**.

### Brand Voice
Headlines are factual and confident; CTAs invite inspection rather than selling. Microcopy names what the reader will find next.

Example lines:

> “Six systems. Different constraints. One way of working: build until the details hold.”

> “Open the project dossier — architecture, trade-offs, and what shipped.”

### Wordmark & Logo
Use a compact **TL monogram built from two offset circuit traces**, where the shared junction becomes a small signal node. The mark is text-free, works at favicon scale, and can animate as two strokes connecting.

### Signature Brand Color
**Signal Blue — `#1E5EFF`**. It represents an active connection, an inspected detail, or a live system state; it should be used sparingly enough to remain ownable.
