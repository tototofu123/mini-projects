# Toto Portfolio Duo

This repository holds two intentionally different personal-portfolio experiences built from one shared six-project story. The **normal portfolio** is the hiring-facing site: clear, quick to scan, and designed for recruiters, engineers, and collaborators. The **showcase portfolio** is the memorable companion: an interactive technical exhibit that lets visitors inspect the same work more deeply.

Both versions use the same project facts, screenshots, links, outcomes, and evidence. They must never disagree on what was built, which technologies were used, or what remains incomplete.

| Experience | Job | Primary visitor question | Design priority |
|---|---|---|---|
| `normal` | Convert an interested visitor into a conversation | “Can Toto build software I can trust?” | Clarity, proof, accessibility |
| `showcase` | Make the work memorable and technically legible | “How does Toto think and build?” | Narrative, interaction, craft |

## Selected projects

| Project | Primary evidence of capability | Core story |
|---|---|---|
| HKUST Climb Society Web | Frontend product and community website | A real organisation-facing web experience |
| HKUST Climbing App | Full-stack product | A complete application with user flows and data concerns |
| STM32 | Embedded systems and C | Software that meets physical constraints |
| OCR MCP | Python, tool calling, and AI tooling | A practical model-comparison and routing workflow |
| Perihel | Local idea and reminder system | Personal product thinking and intentional knowledge capture |
| Is It AI Image | CNN and computer vision | An end-to-end ML experiment with explicit limitations |

## Planning documents

| Document | Purpose |
|---|---|
| [`docs/00-PORTFOLIO-PLAN.md`](docs/00-PORTFOLIO-PLAN.md) | Product plan, audience, and success rules |
| [`docs/01-INFORMATION-ARCHITECTURE.md`](docs/01-INFORMATION-ARCHITECTURE.md) | Shared content architecture and routes |
| [`docs/02-ASSET-INVENTORY.md`](docs/02-ASSET-INVENTORY.md) | Asset source, requirements, and handling rules |
| [`docs/03-PROJECT-EVIDENCE-MATRIX.md`](docs/03-PROJECT-EVIDENCE-MATRIX.md) | What must be shown for every case study |
| [`normal/README.md`](normal/README.md) | Hiring-focused portfolio build brief |
| [`showcase/README.md`](showcase/README.md) | Interactive portfolio build brief |

## Repository structure

```text
toto-portfolio-duo/
├── normal/                 # Hiring-focused portfolio specification and later build
├── showcase/               # Interactive showcase specification and later build
├── shared/
│   ├── content/            # One canonical project record per selected project
│   ├── assets/             # Source manifest; not large media binaries
│   └── design/             # Shared brand tokens and accessibility rules
├── docs/                   # Architecture and content decisions
└── client/                 # Current static web workspace for the first implementation
```

The current static workspace will first prototype the two experiences as separate routes. Once the content and interaction model are stable, each can be split into an independently deployed static build without rewriting the content model.

