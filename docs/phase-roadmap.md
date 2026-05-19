# Phase Roadmap

## Goal
Build the portfolio in this order:
1. Structure the HTML first.
2. Add hover effects and UX interactions next.
3. Add appear / entrance effects after that.
4. Add section transition effects last.
5. Prepare all assets before implementing motion.

## Phase 1: Asset Preparation
Before animation work, collect and confirm every visual asset.

### Assets needed
- Loading tofu icon
- Hero avatar images / alternate styles
- About section plasma asset
- Projects section central 3D identity asset
- Project thumbnails or section visuals
- Skills section visual pieces or particles
- Contact / cave / flashlight visuals if needed

### Asset rules
- Use local assets first whenever possible.
- Keep asset styles consistent across all sections.
- Prefer clean, simple source images that can be reused in multiple states.
- If a picture is not available yet, use a placeholder that matches the final layout size.

### Picture source placeholder
- TODO: define the exact picture source rule here.
- If you want, this can be set to one of these options later:
- local `sources/images`
- exported Figma assets
- external image links
- custom generated visuals

## Phase 2: HTML Structure
Build the page structure inside the HTML first.

### Order
- Hero
- About
- Projects
- Skills
- Contact
- Footer

### What to define
- Section containers
- Component wrappers
- Layout slots for left/right or center content
- IDs for scrolling and transitions

## Phase 3: Hover Effects and UX Interaction
After structure is stable, add interaction states.

### Focus
- Custom cursor states
- Hover feedback
- Click feedback
- Drag feedback
- Card / box / link reactions

### Goal
Make every section feel interactive before adding the larger motion sequences.

## Phase 4: Appear Effects
Once hover states work, add the entry animations.

### Focus
- Loading sequence
- Hero avatar reveal
- Title and text entrance
- GitHub box and header entrance
- Section element reveals

### Goal
Each section should appear with a clear staged reveal.

## Phase 5: Transition Effects
Add the big scroll-driven transformations last.

### Focus
- Hero to About morph
- About to Projects VR expansion
- Projects to Skills flood / rupture
- Skills to Contact drain
- Contact to Footer override

### Goal
Make section changes feel cinematic without breaking the layout.

## Implementation Rule
Do not start transition effects until:
- the HTML structure is finished
- the required assets are ready
- hover interactions work reliably
- appear animations are stable
