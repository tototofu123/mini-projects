# Portfolio Duo — Information Architecture

## Shared content model

Each project has one canonical record in `shared/content/projects/`. The normal and showcase versions consume that record differently; neither owns separate factual copy.

```text
shared/content/projects/
├── hkust-climbing-app.md
├── ocr-mcp.md
├── stm32.md
├── is-it-ai-image.md
├── hkust-climb-soc-web.md
└── perihel.md
```

Every record must contain the following fields.

| Field | Purpose |
|---|---|
| Project name and one-line purpose | Lets visitors orient quickly |
| Problem and user | Defines why the work exists |
| Toto’s role and contribution | Avoids ambiguous ownership |
| Stack and architecture | Shows the technical shape of the system |
| Key decision or trade-off | Shows judgement rather than a feature list |
| Evidence links | Repository, demo, screenshots, diagrams, or video |
| Result and current status | Separates shipped work from experiments |
| Limitations and next step | Builds credibility through honest scope |
| Normal-card copy | Short copy for recruiters |
| Showcase interaction concept | One visual explanation tied to a real system detail |

## Normal portfolio route structure

```text
/
├── Work index
├── About / working style
├── Selected capabilities
├── Contact
└── /work/:slug
    ├── Project summary
    ├── Problem and role
    ├── Architecture / stack
    ├── Decisions and constraints
    ├── Evidence gallery
    └── What changed / next step
```

The landing page should not become a long résumé. It has a decisive headline, a six-project work index, a compact capability statement, and a direct contact route. Detailed technical material belongs in individual case studies.

## Showcase portfolio route structure

```text
/
├── Project launchpad
├── /exhibit/hkust-climbing-app
├── /exhibit/ocr-mcp
├── /exhibit/stm32
├── /exhibit/is-it-ai-image
├── /exhibit/hkust-climb-soc-web
└── /exhibit/perihel
```

Each exhibit has one large interactive metaphor and one persistent evidence drawer. The interaction is optional; the drawer always contains a static explanation, keyboard-accessible controls, repository/demo links, and reduced-motion fallback.

| Project | Showcase exhibit concept | Evidence drawer focus |
|---|---|---|
| HKUST Climbing App | A layered product-flow map that opens user, data, and system layers | User journeys, full-stack architecture, role |
| OCR MCP | A routed pipeline that visualises request → tool choice → OCR result | Python orchestration, model comparison, limits |
| STM32 | A physical signal path from input to firmware to output | C modules, hardware interface, debugging constraints |
| Is It AI Image | A confidence field that reveals image-to-model-to-classification flow | Dataset, CNN architecture, metrics, false positives |
| HKUST Climb Society Web | A content system that expands from member task to public webpage | Frontend patterns, responsiveness, organisation context |
| Perihel | An orbiting idea map that captures a thought, reminder, and revisit cycle | Local-first model, retrieval/reminder rules, product rationale |

## Shared navigation

Both versions have an obvious reciprocal link. The normal portfolio uses **“Open the project exhibits”**. The showcase uses **“Read the normal case studies”**. This keeps the user in control and makes the two experiences complementary.

