/**
 * Constraint Ledger — Compact Navigator.
 * This route treats the six projects as an evidence-bound rotating record set,
 * while skills run separately as a signal tape. It avoids a long card-grid scroll.
 */
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Mail,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  visual: string;
  visualAlt: string;
};

const notes: Record<string, LedgerNote> = {
  "hkust-climbing-app": {
    code: "C-01", domain: "Community operations", constraint: "One community does not have one interface.",
    response: "A joined-up climbing management system spanning member-facing mobile flows, web administration, and backend services.",
    proofLines: ["Member, organiser, and administration flows are separate concerns.", "The product has to carry information between them without losing context."],
    route: ["Member", "Mobile flow", "Admin console", "Backend"], evidenceState: "current",
    evidenceRequest: "Sanitised member and organiser flow captures, paired with a simple system-boundary diagram.",
    visual: "/manus-storage/hkust-climbing-app-handoff_ae53b31a.jpg",
    visualAlt: "Editorial systems composition showing a mobile device, organiser board, and backend module linked by blue routes.",
  },
  "ocr-mcp": {
    code: "C-02", domain: "Local AI tooling", constraint: "OCR is not one model, one document, or one correct answer.",
    response: "A local model-comparison and routing workflow that makes OCR choices inspectable instead of treating them as a black box.",
    proofLines: ["Inputs can be evaluated across multiple local OCR and vision-language approaches.", "Routing and benchmarking are part of the tool—not an afterthought after a chat response."],
    route: ["Document", "Candidate models", "Benchmark", "Task route", "OCR result"], evidenceState: "current",
    evidenceRequest: "A reproducible comparison run, a named input set, and the routing decision for one real document.",
    visual: "/manus-storage/ocr-mcp-decision-surface_8c56e67c.jpg",
    visualAlt: "Editorial visual of documents and translucent routing overlays arranged as an OCR comparison workbench.",
  },
  stm32: {
    code: "C-03", domain: "Embedded systems", constraint: "A physical device still needs software that behaves predictably.",
    response: "STM32 firmware in C that joins physical input, device logic, and output behavior at the hardware boundary.",
    proofLines: ["The work involves C modules and the handoff between physical hardware and firmware behavior.", "Debugging is constrained by the device, not only by what appears in a browser console."],
    route: ["Physical input", "STM32", "C firmware", "Device output"], evidenceState: "requested",
    evidenceRequest: "A labelled board image, a signal-path sketch, and one C-module excerpt tied to observed device behavior.",
    visual: "/manus-storage/stm32-hardware-boundary_b265ee36.jpg",
    visualAlt: "Editorial macro visual of an unbranded microcontroller board, sensor hardware, jumper wires, and blue signal trace.",
  },
  "is-it-ai-image": {
    code: "C-04", domain: "Computer vision", constraint: "A classifier can look certain and still be wrong.",
    response: "A CNN-based experiment that turns an image into a real-versus-AI classification while keeping the evaluation question visible.",
    proofLines: ["The project includes a trained classifier experiment and model artifacts.", "The public case study will treat provenance, false positives, and evaluation limits as part of the work."],
    route: ["Image", "Preprocess", "CNN", "Classification", "Evaluate"], evidenceState: "requested",
    evidenceRequest: "The existing local CNN project visual, dataset provenance, and a small false-positive / failure-case table.",
    visual: "/manus-storage/is-it-ai-image-classification_1415e23f.jpg",
    visualAlt: "Editorial classification-study composition with natural and synthetic texture samples separated by a blue decision boundary.",
  },
  "hkust-climb-soc-web": {
    code: "C-05", domain: "Public frontend", constraint: "A community needs a public face that people can actually navigate.",
    response: "A responsive Next.js website that turns organisation information into an understandable public interface.",
    proofLines: ["The project is a real organisation-facing frontend rather than an isolated visual exercise.", "Responsive information design and ownership boundaries are both part of the final case study."],
    route: ["Community need", "Content structure", "Responsive UI", "Public page"], evidenceState: "requested",
    evidenceRequest: "A public desktop/mobile capture, a content map, and a one-sentence ownership note.",
    visual: "/manus-storage/hkust-climb-soc-public-route_2db75c4e.jpg",
    visualAlt: "Editorial community visual showing an indoor climbing wall and structured public-information cards with blue guide lines.",
  },
  perihel: {
    code: "C-06", domain: "Local-first product", constraint: "A useful thought should not disappear because it arrived at the wrong moment.",
    response: "A local-first desktop companion for capturing fleeting intentions and returning them when they become actionable.",
    proofLines: ["The product comes from a real personal workflow rather than a portfolio prompt.", "Its public evidence will be sanitised so the system can be shown without exposing private records."],
    route: ["Fleeting thought", "Capture", "Local record", "Reminder", "Return"], evidenceState: "requested",
    evidenceRequest: "A sanitised capture-to-return sequence that demonstrates the local-first reminder loop without exposing a private record.",
    visual: "/manus-storage/perihel-capture-return_91a0763a.jpg",
    visualAlt: "Editorial local-first product visual of a note card, desktop device, and time dial connected by blue capture-to-return routes.",
  },
};

const skills = [
  "Product systems", "Full-stack architecture", "Mobile workflows", "Next.js", "React",
  "Python", "MCP tool calling", "OCR / VLM", "Model evaluation", "STM32", "C firmware",
  "TensorFlow", "CNNs", "Information architecture", "Local-first design", "Technical communication",
];

function ProjectEvidence({ project, note }: { project: Project; note: LedgerNote }) {
  return (
    <details className="compact-evidence">
      <summary><Plus size={15} /> Inspect this record</summary>
      <div className="compact-evidence-grid">
        <div><span>Response</span><p>{note.response}</p></div>
        <div><span>Working route</span><ol>{note.route.map((step, index) => <li key={step}>{String(index + 1).padStart(2, "0")} / {step}</li>)}</ol></div>
        <div><span>{note.evidenceState === "current" ? "Current evidence" : "Evidence request"}</span><p>{project.evidence}</p><ul>{note.proofLines.map((line) => <li key={line}>{line}</li>)}</ul></div>
        <div><span>Limit</span><p>{project.limitation}</p><p className="next-proof"><b>Next proof:</b> {note.evidenceRequest}</p></div>
      </div>
    </details>
  );
}

export default function Home() {
  const records = projects.filter((project) => project.id in notes);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeProject = records[activeIndex];
  const activeNote = notes[activeProject.id];

  const goTo = (index: number) => setActiveIndex((index + records.length) % records.length);

  useEffect(() => {
    document.title = "Toto Lai — Constraint Ledger";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(activeIndex + 1);
      if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => goTo(activeIndex + 1), 5200);
    return () => window.clearInterval(timer);
  }, [activeIndex, paused]);

  return (
    <div className="compact-shell">
      <a className="skip-link" href="#about">Skip to introduction</a>
      <header className="compact-header">
        <a className="identity" href="#top" aria-label="Toto Lai personal portfolio"><img src={markImage} alt="" /><span>Toto Lai / Personal File</span></a>
        <nav className="portfolio-nav" aria-label="Portfolio sections"><a href="#about">Operating note</a><a href="#selected-work">Evidence</a><a href="#contact">Contact</a></nav>
        <a className="header-contact" href="mailto:tototofu0601@gmail.com">Write to me <ArrowUpRight size={15} /></a>
      </header>

      <main>
        <section className="compact-opening personal-opening" aria-labelledby="opening-title">
          <div className="compact-opening-marker">Ledger / 00<br />Hong Kong<br />2026</div>
          <div>
            <p className="opening-prefix">Lai Man To / Toto / Software builder</p>
            <h1 id="opening-title">When a system<br />can lose a person,<br /><em>I build the handoff.</em></h1>
            <p className="compact-opening-copy">I am a software builder based in Hong Kong. I work across AI workflows, full-stack systems, hardware, and interactive web experiences—usually where an idea, decision, or person could otherwise lose context.</p>
            <div className="personal-opening-actions"><a href="#selected-work">View selected work <ArrowRight size={16} /></a><a href="mailto:tototofu0601@gmail.com">Get in touch <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="compact-opening-count"><span>Currently</span><strong>Building</strong><p>Useful products, AI-assisted workflows, and a small number of ideas worth finishing.</p><span className="education-chip">BEng Computer Engineering & AI / HKUST</span></div>
        </section>

        <section className="personal-intro" id="about" aria-labelledby="about-title">
          <div className="personal-intro-label"><span className="section-label">Operating note / 01</span><p>Software builder<br />Hong Kong</p></div>
          <div className="personal-intro-copy"><h2 id="about-title">The point is not<br />a demo. It is a<br /><em>return path.</em></h2><p>I am interested in useful systems: products that solve an actual problem, workflows that reduce friction, and interfaces that make technology easier to use. I like working across the full path—thinking through the product, building the software, shaping the interface, and improving it from feedback.</p><blockquote>“I want to make technology that someone can use again—not just a demo that exists once.”</blockquote></div>
          <div className="personal-intro-side"><span>Current boundaries</span><p>People → systems<br />Inputs → decisions<br />Ideas → useful action</p></div>
        </section>

        <section className="practice-section" aria-labelledby="practice-title">
          <div className="practice-heading"><span className="section-label">Boundaries I work across / 02</span><h2 id="practice-title">Three places<br />a handoff can<br /><em>break.</em></h2></div>
          <div className="practice-list">
            <article><span>01 / People → system</span><h3>Someone has to understand the tool.</h3><p>Applications and systems for real groups and real workflows, shaped around whether people can understand and return to them.</p></article>
            <article><span>02 / Input → decision</span><h3>A model answer needs a visible route.</h3><p>Local AI, model workflows, reusable skills, and tooling that makes research, planning, and development more reliable.</p></article>
            <article><span>03 / Interface → action</span><h3>A screen should lead somewhere.</h3><p>Websites, interfaces, and creative technology where visual detail and motion serve a stronger product structure.</p></article>
          </div>
        </section>

        <section className="project-carousel-section" id="selected-work" aria-labelledby="carousel-title">
          <div className="carousel-heading">
            <div><span className="section-label">Evidence ledger / 03</span><h2 id="carousel-title">Six constraints.<br /><em>Named responses.</em></h2></div>
            <p>These records support the personal story above. Use the controls, arrow keys, or numbered entries to inspect the response, proof, and limit of one system at a time.</p>
          </div>

          <div className="project-carousel" aria-roledescription="carousel" aria-label="Six project records" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
            <aside className="carousel-index" aria-label="Choose a project record">
              {records.map((project, index) => (
                <button key={project.id} className={index === activeIndex ? "is-active" : ""} onClick={() => goTo(index)} aria-current={index === activeIndex ? "true" : undefined}>
                  <span>{notes[project.id].code}</span><strong>{project.shortTitle}</strong>
                </button>
              ))}
            </aside>

            <article className="carousel-record" key={activeProject.id} aria-live="polite">
              <div className="record-chrome"><span>{activeNote.code} / {activeNote.domain}</span><span>{String(activeIndex + 1).padStart(2, "0")} / {String(records.length).padStart(2, "0")}</span></div>
              <div className="record-content">
                <div className="record-copy"><p className="record-title">{activeProject.title}</p><h3>{activeNote.constraint}</h3><p className="record-summary">{activeProject.summary}</p><ul className="record-stack">{activeProject.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <figure className="record-visual"><img src={activeNote.visual} alt={activeNote.visualAlt} /><figcaption>Inspectable context / project visual companion, not a product screenshot</figcaption></figure>
              </div>
              <div className="visible-ledger-states" aria-label={`${activeProject.title} response, proof, and limit`}><div><span>Response</span><p>{activeNote.response}</p></div><div><span>Proof</span><p>{activeProject.evidence}</p></div><div><span>Limit</span><p>{activeProject.limitation}</p></div></div>
              <ProjectEvidence project={activeProject} note={activeNote} />
              <div className="carousel-controls">
                <button onClick={() => goTo(activeIndex - 1)} aria-label="Previous project"><ArrowLeft size={18} /> Previous</button>
                <button className="pause-control" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? "Resume loop" : "Pause loop"}</button>
                <button onClick={() => goTo(activeIndex + 1)} aria-label="Next project">Next <ArrowRight size={18} /></button>
              </div>
            </article>
          </div>
        </section>

        <section className="skills-carousel-section" aria-labelledby="skills-title">
          <div className="skills-heading"><span className="section-label">Capabilities / continuous signal</span><h2 id="skills-title">Skills move<br />on a <em>different rhythm.</em></h2><p>The project loop is deliberate and inspectable. This tape is a fast, continuous index of the tools and systems behind it.</p></div>
          <div className="skills-window" aria-label="Skills carousel">
            <div className="skills-track">
              {[...skills, ...skills].map((skill, index) => <span key={`${skill}-${index}`} aria-hidden={index >= skills.length}>{skill}<i>✦</i></span>)}
            </div>
          </div>
          <p className="sr-only">Skills include {skills.join(", ")}.</p>
        </section>

        <section className="personal-now" aria-labelledby="now-title">
          <div><span className="section-label">Current file / 04</span><h2 id="now-title">Fewer ideas.<br />More reasons to<br /><em>come back.</em></h2></div>
          <div className="now-detail"><p>I am focused on practical software, AI-assisted workflows, and making my work easier to understand. I am studying Computer Engineering and AI at HKUST.</p><dl><div><dt>Based in</dt><dd>Hong Kong</dd></div><div><dt>Learning through</dt><dd>Building, testing, and iteration</dd></div><div><dt>Looking for</dt><dd>Useful product and software problems</dd></div></dl></div>
        </section>

        <section className="compact-close" id="contact" aria-labelledby="close-title">
          <div><span className="section-label">Close the ledger</span><h2 id="close-title">The work changes.<br />The pattern<br /><em>does not.</em></h2></div>
          <p>If you are working on useful software, AI tools, automation, community products, or interactive web experiences, I would be glad to connect.</p>
          <div className="close-links"><a href="mailto:tototofu0601@gmail.com"><Mail size={16} /> Start a conversation</a><a href="https://github.com/tototofu123" target="_blank" rel="noreferrer"><Github size={16} /> Inspect repositories</a><a href="/showcase">Open System Viewer <ArrowUpRight size={16} /></a></div>
        </section>
      </main>

      <footer className="ledger-footer"><span>© 2026 Toto Lai Man To</span><span>Six records / one loop</span><a href="mailto:tototofu0601@gmail.com">tototofu0601@gmail.com</a></footer>
    </div>
  );
}
