/**
 * System Viewer — the interactive showcase companion to Constraint Ledger.
 * Instead of case-study reading, visitors select a system and inspect its
 * real input-to-result route through a switchboard-like project viewer.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronRight, Github, MoveRight } from "lucide-react";

type Exhibit = {
  code: string;
  title: string;
  discipline: string;
  constraint: string;
  prompt: string;
  route: string[];
  proof: string;
  limit: string;
  detail: string;
};

const artifactNames: Record<string, string> = {
  "01": "Interface handoff map",
  "02": "OCR decision surface",
  "03": "Hardware / firmware boundary",
  "04": "Classification boundary",
  "05": "Public information topology",
  "06": "Capture and return loop",
};

const exhibits: Exhibit[] = [
  {
    code: "01",
    title: "HKUST Climbing App",
    discipline: "Full-stack product",
    constraint: "One community does not have one interface.",
    prompt: "Switch from a member task to an organiser task. The system should not lose the person in the handoff.",
    route: ["Member", "Mobile flow", "Admin console", "Backend"],
    proof: "Member-facing mobile flows, web administration, and backend services belong to the same product response.",
    limit: "Public screens must be sanitised and Toto’s personal contribution stated precisely.",
    detail: "The interesting part is not a screen. It is the connection between the people and the operational system behind it.",
  },
  {
    code: "02",
    title: "OCR MCP",
    discipline: "Python AI tooling",
    constraint: "OCR is not one model, one document, or one correct answer.",
    prompt: "When documents vary, model selection becomes a decision that needs to be visible instead of implicit.",
    route: ["Document", "Candidate models", "Benchmark", "Task route", "OCR result"],
    proof: "The local workflow combines model comparison, benchmarking, routing, and reproducible tool use.",
    limit: "Comparisons need a named dataset, environment, and an honest account of where they stop generalising.",
    detail: "This exhibit is about the choice before the answer: which system should handle this document, and why?",
  },
  {
    code: "03",
    title: "STM32",
    discipline: "Embedded systems + C",
    constraint: "A physical device still needs software that behaves predictably.",
    prompt: "The interface is real: inputs, timing, C firmware, and an output that either works or does not.",
    route: ["Physical input", "STM32", "C firmware", "Device output"],
    proof: "The project connects firmware modules, physical behavior, and hardware-software debugging.",
    limit: "Evidence should show the board, the signal path, and tested behavior without overstating performance.",
    detail: "A constraint cannot be scrolled away here. The system has to meet a physical boundary.",
  },
  {
    code: "04",
    title: "Is It AI Image?",
    discipline: "Computer vision + CNN",
    constraint: "A classifier can look certain and still be wrong.",
    prompt: "The result is only useful when the question behind the confidence score remains open.",
    route: ["Image", "Preprocess", "CNN", "Classification", "Evaluate"],
    proof: "A CNN experiment with model artifacts and a visible project demonstration.",
    limit: "Dataset provenance, false positives, and evaluation boundaries belong beside the prediction.",
    detail: "The visual is not a magic detector. The system is a classification experiment with limits worth showing.",
  },
  {
    code: "05",
    title: "HKUST Climb Society Web",
    discipline: "Frontend community product",
    constraint: "A community needs a public face that people can actually navigate.",
    prompt: "Public information is only useful when a visitor can find the part that applies to them.",
    route: ["Community need", "Content structure", "Responsive UI", "Public page"],
    proof: "A responsive Next.js interface for a real organisation context and its information needs.",
    limit: "The case must distinguish Toto’s work from shared community effort and use approved public media.",
    detail: "The visible page is the outcome of an information problem, not an isolated visual exercise.",
  },
  {
    code: "06",
    title: "Perihel",
    discipline: "Local-first product",
    constraint: "A useful thought should not disappear because it arrived at the wrong moment.",
    prompt: "Capture is only half the product. The harder question is when and how to return an intention.",
    route: ["Fleeting thought", "Capture", "Local record", "Reminder", "Return"],
    proof: "A personal workflow turned into a local-first product and an intentional reminder loop.",
    limit: "The public version needs sanitised examples; real personal records must stay local.",
    detail: "Perihel begins with a human failure mode: forgetting something because the timing was wrong.",
  },
];

function ArtifactCanvas({ exhibit }: { exhibit: Exhibit }) {
  return (
    <section className={`artifact-canvas artifact-${exhibit.code}`} aria-label={`${artifactNames[exhibit.code]} for ${exhibit.title}`}>
      <div className="artifact-chrome">
        <span>{artifactNames[exhibit.code]}</span>
        <span>Inspectable relation</span>
      </div>
      <div className="artifact-stage">
        <span className="artifact-axis axis-x" aria-hidden="true" />
        <span className="artifact-axis axis-y" aria-hidden="true" />
        <ol className="artifact-nodes" style={{ "--node-count": exhibit.route.length } as React.CSSProperties}>
          {exhibit.route.map((step, index) => (
            <li key={step} className={index === exhibit.route.length - 1 ? "artifact-result" : ""}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              {index !== exhibit.route.length - 1 && <i aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <p className="artifact-caption">
          {exhibit.code === "01" && "A member action crosses an operational boundary before it becomes an organiser task."}
          {exhibit.code === "02" && "The visible artifact is the decision before the OCR result, not a generic answer box."}
          {exhibit.code === "03" && "The signal leaves the physical world, enters firmware, then has to return as observable device behavior."}
          {exhibit.code === "04" && "A classification is only the midpoint; the evaluation boundary stays in the artifact."}
          {exhibit.code === "05" && "Information becomes useful only after it is structured for a visitor and carried through a responsive page."}
          {exhibit.code === "06" && "The same intention changes state: captured now, stored locally, then returned when it matters."}
        </p>
      </div>
    </section>
  );
}

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = exhibits[activeIndex];
  const progress = useMemo(() => `${activeIndex + 1} / ${exhibits.length}`, [activeIndex]);

  useEffect(() => {
    document.title = "Toto Lai — System Viewer";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((value) => (value + 1) % exhibits.length);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((value) => (value - 1 + exhibits.length) % exhibits.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="viewer-shell">
      <a className="skip-link viewer-skip" href="#viewer-content">Skip to active system</a>
      <header className="viewer-header">
        <a href="/" className="viewer-back"><ArrowLeft size={15} /> Constraint Ledger</a>
        <p>System Viewer / {progress}</p>
        <a href="mailto:tototofu0601@gmail.com" className="viewer-write">Write to Toto <ArrowUpRight size={15} /></a>
      </header>

      <main className="viewer-main" id="viewer-content">
        <aside className="viewer-selector" aria-label="Select a system to inspect">
          <p className="viewer-label">Select a system</p>
          <div className="selector-buttons">
            {exhibits.map((exhibit, index) => (
              <button
                key={exhibit.code}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? "is-active" : ""}
              >
                <span>{exhibit.code}</span>
                <strong>{exhibit.title}</strong>
                <ChevronRight size={15} />
              </button>
            ))}
          </div>
          <p className="selector-instruction"><ArrowDown size={14} /> Use ↑ ↓ or select a project.</p>
        </aside>

        <section className="viewer-stage" aria-live="polite" aria-label={`${active.title} exhibit`}>
          <div className="stage-chrome">
            <span>Project {active.code}</span>
            <span>{active.discipline}</span>
          </div>
          <div className="stage-constraint">
            <span className="viewer-label">Constraint</span>
            <h1>{active.constraint}</h1>
          </div>
          <div className="stage-prompt">
            <span className="prompt-mark">?</span>
            <p>{active.prompt}</p>
          </div>
          <ArtifactCanvas exhibit={active} />
          <p className="stage-detail">{active.detail}</p>
        </section>

        <aside className="viewer-proof">
          <div className="proof-block">
            <span className="viewer-label">Evidence currently held</span>
            <p>{active.proof}</p>
          </div>
          <div className="proof-block proof-limit">
            <span className="viewer-label">Limit to keep visible</span>
            <p>{active.limit}</p>
          </div>
          <a href="/" className="proof-ledger">Read the normal ledger <MoveRight size={15} /></a>
        </aside>
      </main>

      <footer className="viewer-footer">
        <span>One system at a time. No simulated dashboard.</span>
        <a href="https://github.com/tototofu123" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
      </footer>
    </div>
  );
}
