/**
 * Constraint Ledger — a project-derived normal portfolio.
 * The structure presents real constraints, system responses, proof, and limits;
 * it deliberately avoids stock imagery, generic card grids, and invented diagrams.
 */
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Mail,
  MoveRight,
  Plus,
} from "lucide-react";
import { useEffect } from "react";
import { projects, type Project } from "@/data/projects";

const markImage = "/manus-storage/toto-tl-signal-mark_e32fc54e.png";

type LedgerNote = {
  code: string;
  domain: string;
  constraint: string;
  response: string;
  proofLines: string[];
  route: string[];
  evidenceState: "current" | "requested";
  evidenceRequest: string;
};

const notes: Record<string, LedgerNote> = {
  "hkust-climbing-app": {
    code: "C-01",
    domain: "Community operations",
    constraint: "One community does not have one interface.",
    response:
      "A joined-up climbing management system spanning member-facing mobile flows, web administration, and backend services.",
    proofLines: [
      "Member, organiser, and administration flows are separate concerns.",
      "The product has to carry information between them without losing context.",
    ],
    route: ["Member", "Mobile flow", "Admin console", "Backend"],
    evidenceState: "current",
    evidenceRequest: "Sanitised member and organiser flow captures, paired with a simple system-boundary diagram.",
  },
  "ocr-mcp": {
    code: "C-02",
    domain: "Local AI tooling",
    constraint: "OCR is not one model, one document, or one correct answer.",
    response:
      "A local model-comparison and routing workflow that makes OCR choices inspectable instead of treating them as a black box.",
    proofLines: [
      "Inputs can be evaluated across multiple local OCR / vision-language approaches.",
      "Routing and benchmarking are part of the tool—not an afterthought after a chat response.",
    ],
    route: ["Document", "Candidate models", "Benchmark", "Task route", "OCR result"],
    evidenceState: "current",
    evidenceRequest: "A reproducible comparison run, a named input set, and the routing decision for one real document.",
  },
  stm32: {
    code: "C-03",
    domain: "Embedded systems",
    constraint: "A physical device still needs software that behaves predictably.",
    response:
      "STM32 firmware in C that joins physical input, device logic, and output behavior at the hardware boundary.",
    proofLines: [
      "The work involves C modules and the handoff between physical hardware and firmware behavior.",
      "Debugging is constrained by the device, not only by what appears in a browser console.",
    ],
    route: ["Physical input", "STM32", "C firmware", "Device output"],
    evidenceState: "requested",
    evidenceRequest: "A labelled board image, a signal-path sketch, and one C-module excerpt tied to observed device behavior.",
  },
  "is-it-ai-image": {
    code: "C-04",
    domain: "Computer vision",
    constraint: "A classifier can look certain and still be wrong.",
    response:
      "A CNN-based experiment that turns an image into a real-versus-AI classification while keeping the evaluation question visible.",
    proofLines: [
      "The project includes a trained classifier experiment and model artifacts.",
      "The public case study will treat provenance, false positives, and evaluation limits as part of the work.",
    ],
    route: ["Image", "Preprocess", "CNN", "Classification", "Evaluate"],
    evidenceState: "requested",
    evidenceRequest: "The existing local CNN project visual, dataset provenance, and a small false-positive / failure-case table.",
  },
  "hkust-climb-soc-web": {
    code: "C-05",
    domain: "Public frontend",
    constraint: "A community needs a public face that people can actually navigate.",
    response:
      "A responsive Next.js website that turns organisation information into an understandable public interface.",
    proofLines: [
      "The project is a real organisation-facing frontend rather than an isolated visual exercise.",
      "Responsive information design and ownership boundaries are both part of the final case study.",
    ],
    route: ["Community need", "Content structure", "Responsive UI", "Public page"],
    evidenceState: "requested",
    evidenceRequest: "A public desktop/mobile capture, a content map, and a one-sentence ownership note.",
  },
  perihel: {
    code: "C-06",
    domain: "Local-first product",
    constraint: "A useful thought should not disappear because it arrived at the wrong moment.",
    response:
      "A local-first desktop companion for capturing fleeting intentions and returning them when they become actionable.",
    proofLines: [
      "The product comes from a real personal workflow rather than a portfolio prompt.",
      "Its public evidence will be sanitised so the system can be shown without exposing private records.",
    ],
    route: ["Fleeting thought", "Capture", "Local record", "Reminder", "Return"],
    evidenceState: "requested",
    evidenceRequest: "A sanitised capture-to-return sequence that demonstrates the local-first reminder loop without exposing a private record.",
  },
};

function CaseEntry({ project, note }: { project: Project; note: LedgerNote }) {
  return (
    <article className={`case-entry case-${project.id} evidence-${note.evidenceState}`} id={project.id}>
      <div className="case-stamp">
        <span>{note.code}</span>
        <span>{note.domain}</span>
      </div>

      <div className="case-intro">
        <p className="case-name">{project.title}</p>
        <h2>{note.constraint}</h2>
      </div>

      <div className="case-body">
        <div className="case-block response-block">
          <span className="block-label">Response</span>
          <p>{note.response}</p>
        </div>

        <div className="case-block route-block" aria-label={`${project.title} system route`}>
          <span className="block-label">Working route</span>
          <ol>
            {note.route.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>

        <details className="case-evidence">
          <summary>
            <span><Plus size={15} /> {note.evidenceState === "current" ? "Read the current evidence" : "Evidence request before launch"}</span>
            <span className="summary-hint">{note.evidenceState === "current" ? "Source notes" : "Named proof needed"}</span>
          </summary>
          <div>
            <p className="evidence-copy">{project.evidence}</p>
            <ul>
              {note.proofLines.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <p className="evidence-request-text"><strong>Next proof:</strong> {note.evidenceRequest}</p>
          </div>
        </details>

        <div className="case-limit">
          <span className="block-label">Limit</span>
          <p>{project.limitation}</p>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const ledgerCases = projects.filter((project) => project.id in notes);

  useEffect(() => {
    document.title = "Toto Lai — Constraint Ledger";
  }, []);

  return (
    <div className="ledger-shell">
      <a className="skip-link" href="#ledger-content">Skip to portfolio records</a>
      <header className="ledger-header">
        <a className="identity" href="#top" aria-label="Toto Lai Constraint Ledger">
          <img src={markImage} alt="" />
          <span>Toto Lai / Constraint Ledger</span>
        </a>
        <div className="header-status">
          <span>Normal portfolio</span>
          <span className="header-dot" />
          <span>06 active records</span>
        </div>
        <a className="header-contact" href="mailto:tototofu0601@gmail.com">Write to me <ArrowUpRight size={15} /></a>
      </header>

      <main id="ledger-content">
        <section className="opening" aria-labelledby="opening-title">
          <div className="opening-side">
            <span>Ledger / 00</span>
            <span>Hong Kong</span>
            <span>2026</span>
          </div>
          <div className="opening-copy">
            <p className="opening-prefix">A working premise / 01</p>
            <h1 id="opening-title">
              The useful work<br />
              starts where a<br />
              handoff can<br />
              <em>fail.</em>
            </h1>
            <div className="opening-note">
              <p>
                People, models, hardware, and ideas lose context at different
                boundaries. These six records show the systems I built to make a
                handoff survive—and the evidence still needed when it does not.
              </p>
              <a href="#hkust-climbing-app">Open record C-01 <ArrowDown size={17} /></a>
            </div>
          </div>
          <div className="opening-index" aria-label="Ledger contents">
            <span>Contents</span>
            <ol>
              <li><span>C-01</span> Community operations</li>
              <li><span>C-02</span> Local AI tooling</li>
              <li><span>C-03—06</span> Hardware, vision, web, local-first</li>
            </ol>
          </div>
        </section>

        <section className="ledger-intent" aria-label="Portfolio intent">
          <p>THE UNIT OF WORK IS NOT A SCREEN. IT IS A CONSTRAINT, A RESPONSE, AND A RESULT THAT A PERSON CAN ACTUALLY USE.</p>
        </section>

        <section className="ledger-records" aria-labelledby="records-title">
          <div className="records-heading">
            <span className="section-label">Active records</span>
            <h2 id="records-title">Six systems<br /><em>on file.</em></h2>
            <p>The visual form follows the work. No decorative technical diagrams are used here—only system relationships that the project actually contains.</p>
          </div>

          {ledgerCases.map((project) => <CaseEntry key={project.id} project={project} note={notes[project.id]} />)}
        </section>

        <section className="ledger-close" aria-labelledby="close-title">
          <span className="section-label">Close the ledger</span>
          <h2 id="close-title">The work changes.<br />The pattern<br /><em>does not.</em></h2>
          <p>
            Sometimes the constraint is a member workflow, a physical device, a model
            decision, a public interface, or a thought that needs to return. The work is
            making the relationship between them hold.
          </p>
          <div className="close-links">
            <a href="mailto:tototofu0601@gmail.com"><Mail size={16} /> Start a conversation</a>
            <a href="https://github.com/tototofu123" target="_blank" rel="noreferrer"><Github size={16} /> Inspect the repositories</a>
          </div>
        </section>
      </main>

      <footer className="ledger-footer">
        <span>© 2026 Toto Lai Man To</span>
        <a href="/showcase">Open System Viewer <ArrowUpRight size={15} /></a>
        <a href="https://github.com/tototofu123" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
        <a href="mailto:tototofu0601@gmail.com"><Mail size={15} /> tototofu0601@gmail.com</a>
        <span>All six records active <MoveRight size={15} /></span>
      </footer>
    </div>
  );
}
