# Quality Log — Dual Portfolio

## Live-browser verification

The normal route (`/`) renders all six Constraint Ledger records and exposes the normal-to-showcase link. The reading order contains each intended case element: constraint, response, working route, evidence, and limit.

The showcase route (`/showcase`) renders as a distinct system viewer rather than a second case-study page. Its keyboard selection works: pressing `ArrowDown` changed the active project from HKUST Climbing App (`1 / 6`) to OCR MCP (`2 / 6`), including the selected project button, constraint, route, evidence, and limitation.

After the artifact-viewer and accessibility refinements, the System Viewer shows a project-specific interaction map for the active system and remains readable at a mobile viewport. The keyboard-first skip link is the first focusable item on the showcase route and visibly receives focus after `Tab`.

The showcase now uses the distinct browser title **“Toto Lai — System Viewer”**. Its live semantic audit found no unlabeled buttons, no images without `alt` attributes, eleven keyboard-focusable controls, and labelled selector, exhibit, and artifact sections.

## Remaining checks

The next pass must verify every selector button, normal/showcase return links, mobile layout, reduced-motion behavior, semantic keyboard reachability, production build, and browser-console output.
