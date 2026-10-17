# DESIGN.md Visual Extension - Update Report

This report documents the implementation of the `show` command within the `design.md` toolset, enabling high-fidelity visual dashboard generation directly from design tokens.

## 1. Code Changes Overview

The tool was transformed from a terminal-only validator into a **Living Styleguide Generator**.

### Core Files Added/Modified:

1.  **`packages/cli/src/commands/show.ts` (New)**
    - **Logic:** Orchestrates the generation workflow. It reads the `.md` file, runs the repository's native `lint()` function for data integrity, and triggers the HTML generation.
    - **Key Feature:** Automatically saves the output as `design.html` in the same directory as the source file.

2.  **`packages/cli/src/reporters/html.ts` (New)**
    - **Logic:** A purely data-driven engine that bridges TypeScript token objects to CSS.
    - **Key Feature:** Implements `toCssValue()`, a surgical resolver that handles hex codes, dimensions (px/rem), and complex typography objects.
    - **Theme:** Uses a warm "Limestone/Midnight" palette to reduce eye strain.

3.  **`packages/cli/src/index.ts` (Modified)**
    - **Logic:** Registered the `show` subcommand in the global CLI entry point.

## 2. Usage Instructions

### Terminal Usage
You can generate a visual dashboard for any `DESIGN.md` file using the following command from the project root:

```bash
bun run packages/cli/src/index.ts show <path-to-design.md>
```

**Example:**
```bash
bun run packages/cli/src/index.ts show examples/terra-and-moss/DESIGN.md
```

### Agent Usage
When instructing an agent to visualize a design system, use the following prompt pattern:
> "Run the `show` command on `examples/terra-and-moss/DESIGN.md` to generate the visual guide."

## 3. High-Fidelity Example: Terra & Moss
The `examples/terra-and-moss` system was expanded to demonstrate the full capabilities of the new engine:
- **Depth:** 15 examples for every section (Colors, Typography, Spacing, Rounded, Components).
- **Complexity:** Components that reference multiple chained tokens.
- **Spec Compliance:** Strictly follows the **Canonical Section Order** defined in `spec-config.yaml`.

## 4. Delivery Contents
- **`index.html`**: A portal linking to all generated dashboards.
- **`/terra-and-moss/`**: The benchmark exhaustive design system.
- **`/atmospheric-glass/`**, **`/paws-and-paths/`**, **`/totality-festival/`**: Standard examples with visual guides.
