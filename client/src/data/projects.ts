/**
 * Technical Field Notes content model: concise, evidence-led project records
 * shared by the hiring-focused portfolio and the future interactive showcase.
 */
export type Project = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  discipline: string;
  summary: string;
  stack: string[];
  evidence: string;
  limitation: string;
  accent: string;
  signal: string;
};

export const projects: Project[] = [
  {
    id: "hkust-climbing-app",
    number: "01",
    title: "HKUST Climbing App",
    shortTitle: "Climbing App",
    discipline: "Full-stack product",
    summary:
      "A climbing-management system spanning member-facing mobile flows, web administration, and backend services.",
    stack: ["Mobile", "Web admin", "Backend"],
    evidence: "Product flows across mobile, administration, and backend concerns.",
    limitation: "Public case study will state exact ownership and use sanitized product captures.",
    accent: "#1E5EFF",
    signal: "MEMBER / ADMIN",
  },
  {
    id: "ocr-mcp",
    number: "02",
    title: "OCR MCP",
    shortTitle: "OCR MCP",
    discipline: "Python AI tooling",
    summary:
      "A local OCR model-comparison suite with practical routing and tool-calling workflows.",
    stack: ["Python", "OCR models", "Tool calling"],
    evidence: "Local benchmarking, routing logic, and reproducible model workflows.",
    limitation: "Model claims will be paired with methodology and known benchmark limits.",
    accent: "#1E5EFF",
    signal: "INPUT / ROUTE",
  },
  {
    id: "stm32",
    number: "03",
    title: "STM32",
    shortTitle: "STM32",
    discipline: "Embedded systems + C",
    summary:
      "Firmware work that connects physical inputs, device behavior, and C-level implementation.",
    stack: ["STM32", "C", "Hardware"],
    evidence: "Hardware–firmware constraints, C modules, and physical-system debugging.",
    limitation: "The final case study will show evidence rather than make unverified performance claims.",
    accent: "#1E5EFF",
    signal: "GPIO / FIRMWARE",
  },
  {
    id: "is-it-ai-image",
    number: "04",
    title: "Is It AI Image?",
    shortTitle: "AI Image",
    discipline: "Computer vision + CNN",
    summary:
      "A CNN-based experiment for classifying AI-generated imagery versus real imagery.",
    stack: ["TensorFlow", "Keras", "CNN"],
    evidence: "A trained classifier experiment, model artifacts, and a visible project demonstration.",
    limitation: "The public write-up will include data provenance, false positives, and evaluation limits.",
    accent: "#1E5EFF",
    signal: "IMAGE / CNN",
  },
  {
    id: "hkust-climb-soc-web",
    number: "05",
    title: "HKUST Climb Society Web",
    shortTitle: "Society Web",
    discipline: "Frontend community product",
    summary:
      "A responsive public website for a real university community and its members.",
    stack: ["Next.js", "Responsive UI", "Content systems"],
    evidence: "Organisation-facing frontend delivery and responsive information design.",
    limitation: "The case study will distinguish individual contribution from community collaboration.",
    accent: "#1E5EFF",
    signal: "CONTENT / LAYOUT",
  },
  {
    id: "perihel",
    number: "06",
    title: "Perihel",
    shortTitle: "Perihel",
    discipline: "Local-first personal product",
    summary:
      "A desktop companion for capturing fleeting intentions and resurfacing them at the right time.",
    stack: ["Local-first", "Capture", "Reminders"],
    evidence: "A personal workflow turned into an intentional product and local data model.",
    limitation: "All public visuals will be sanitized; no private ideas or local records will appear.",
    accent: "#1E5EFF",
    signal: "CAPTURE / REVIEW",
  },
];
