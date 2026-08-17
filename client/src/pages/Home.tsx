/**
 * Technical Field Notes — hiring portfolio page.
 * Editorial marginalia, warm paper, graphite ink, and sparse signal blue keep
 * the focus on project evidence rather than visual effects.
 */
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  ChevronRight,
  CircleDot,
  Code2,
  Cpu,
  Github,
  Mail,
  MapPin,
  TerminalSquare,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";

const heroImage = "/manus-storage/toto-field-notes-hero_02105a91.png";
const spectrumImage = "/manus-storage/software-builder-spectrum_ea620376.png";
const markImage = "/manus-storage/toto-tl-signal-mark_e32fc54e.png";

function ProjectDiagram({ project }: { project: Project }) {
  const labels = project.signal.split(" ");

  return (
    <div className="project-diagram" aria-hidden="true" style={{ "--signal": project.accent } as React.CSSProperties}>
      <span className="diagram-grid" />
      <span className="diagram-node diagram-node-a" />
      <span className="diagram-node diagram-node-b" />
      <span className="diagram-node diagram-node-c" />
      <span className="diagram-trace trace-one" />
      <span className="diagram-trace trace-two" />
      <span className="diagram-label label-one">{labels[0]}</span>
      <span className="diagram-label label-two">{labels.slice(1).join(" ") || "SYSTEM"}</span>
      <span className="diagram-caption">evidence route</span>
      <span className="diagram-index">{project.number}</span>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? "project-card-featured" : ""}`}>
      <div className="project-card-topline">
        <span className="project-number">{project.number}</span>
        <span className="project-discipline">{project.discipline}</span>
      </div>

      <ProjectDiagram project={project} />

      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>

        <div className="project-stack" aria-label={`${project.title} technology focus`}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <details className="evidence-details">
          <summary>
            <span>Evidence and scope</span>
            <ChevronRight size={16} strokeWidth={2.2} />
          </summary>
          <div>
            <p>
              <strong>Evidence:</strong> {project.evidence}
            </p>
            <p>
              <strong>Scope note:</strong> {project.limitation}
            </p>
          </div>
        </details>
      </div>
    </article>
  );
}

export default function Home() {
  const [firstProject, ...remainingProjects] = projects;

  return (
    <div className="portfolio-shell">
      <aside className="side-rail">
        <a className="rail-mark" href="#top" aria-label="Back to top">
          <img src={markImage} alt="" />
          <span>TL / FIELD NOTES</span>
        </a>

        <div className="rail-context">
          <span className="eyebrow">Normal portfolio</span>
          <p>Software systems, examined clearly.</p>
        </div>

        <nav className="rail-nav" aria-label="Portfolio sections">
          <a href="#work"><span>01</span> Work</a>
          <a href="#practice"><span>02</span> Practice</a>
          <a href="#contact"><span>03</span> Contact</a>
        </nav>

        <div className="rail-footnote">
          <span className="status-dot" /> Available for a considered conversation.
        </div>
      </aside>

      <main id="top" className="portfolio-main">
        <header className="mobile-header">
          <a className="rail-mark" href="#top" aria-label="Back to top">
            <img src={markImage} alt="" />
            <span>TL / FIELD NOTES</span>
          </a>
          <a href="#contact" className="mobile-contact">Contact <ArrowUpRight size={15} /></a>
        </header>

        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="eyebrow">Toto Lai Man To</span>
              <span className="hero-rule" />
              <span>Hong Kong</span>
            </div>
            <h1 id="hero-title">
              Software systems
              <em> that hold together.</em>
            </h1>
            <p className="hero-lede">
              I build across full-stack products, Python AI tooling, embedded C,
              and applied machine learning—always starting with the constraint,
              then building until the details hold.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">Read selected work <ArrowDownRight size={18} /></a>
              <a href="https://github.com/tototofu123" target="_blank" rel="noreferrer" className="button button-quiet">GitHub <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <figure className="hero-image-wrap">
            <img src={heroImage} alt="Editorial technical field notes with circuit and hardware details." />
            <figcaption>
              <CircleDot size={14} />
              <span>Engineering notes / 2026</span>
            </figcaption>
          </figure>
        </section>

        <section className="proof-strip" aria-label="Portfolio capabilities">
          <div><Cpu size={17} /><span>Embedded + C</span></div>
          <div><TerminalSquare size={17} /><span>Python + AI tooling</span></div>
          <div><Braces size={17} /><span>Full-stack products</span></div>
          <div><Code2 size={17} /><span>Computer vision</span></div>
        </section>

        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Selected work / six systems</span>
              <h2 id="work-title">Different constraints.<br /><em>One way of working.</em></h2>
            </div>
            <p>
              Each project is here for a different capability. The detail panels make
              scope and evidence explicit instead of hiding it behind polish.
            </p>
          </div>

          <div className="project-list">
            <ProjectCard project={firstProject} featured />
            <div className="project-grid">
              {remainingProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>
        </section>

        <section id="practice" className="practice-section" aria-labelledby="practice-title">
          <div className="practice-image-wrap">
            <img src={spectrumImage} alt="Editorial illustration connecting hardware, computer vision, and local transit systems." />
            <span className="image-caption">A working range, not a collection of buzzwords.</span>
          </div>
          <div className="practice-copy">
            <span className="eyebrow">Working practice</span>
            <h2 id="practice-title">Make the decision<br /><em>visible.</em></h2>
            <p>
              I care about the part between idea and implementation: what a user needs,
              what the system can realistically do, what fails, and what should be made
              clear before anything is shipped.
            </p>
            <dl className="practice-list">
              <div><dt>Start with</dt><dd>The user, physical, or data constraint.</dd></div>
              <div><dt>Build through</dt><dd>A small system with explicit trade-offs.</dd></div>
              <div><dt>Finish with</dt><dd>Evidence, limits, and a useful next step.</dd></div>
            </dl>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <span className="eyebrow">Next note</span>
          <h2 id="contact-title">Have a system worth<br /><em>thinking through?</em></h2>
          <p>I’m based in Hong Kong and open to conversations about software, product, and applied AI work.</p>
          <div className="contact-links">
            <a href="mailto:tototofu0601@gmail.com"><Mail size={18} /> tototofu0601@gmail.com</a>
            <a href="https://github.com/tototofu123" target="_blank" rel="noreferrer"><Github size={18} /> github.com/tototofu123</a>
            <span><MapPin size={18} /> Hong Kong</span>
          </div>
        </section>

        <footer className="site-footer">
          <span>© 2026 Toto Lai Man To</span>
          <span>Normal portfolio / Showcase in development</span>
        </footer>
      </main>
    </div>
  );
}
