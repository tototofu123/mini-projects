import * as React from 'react';
import { useState } from 'react';

interface WorkflowStage {
  id: number;
  label: string;
  shortTitle: string;
  title: string;
  badge: string;
  problem: string;
  solution: string;
  metrics: string;
  codeSnippet: string;
  keyPoints: string[];
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    label: 'STAGE 01',
    shortTitle: 'Ingestion & Schema Validation',
    title: 'Pre-flight Ingestion & Strict JSON Validation',
    badge: 'Token Cost Optimization',
    problem: 'Direct unstructured ingestion caused erratic downstream agent failures and exploded token costs through messy email bodies and disclaimers.',
    solution: 'Designed a high-throughput parser enforcing strict JSON schemas on raw Outlook webhooks, stripping redundant MIME signatures and HTML bloat before tokenizing.',
    metrics: '99.98% valid parse rate • 62% token payload reduction',
    codeSnippet: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["sender", "clean_body", "urgency_flag"],
  "properties": {
    "clean_body": { "type": "string", "maxLength": 4096 },
    "attachments": { "type": "array", "maxItems": 5 }
  }
}`,
    keyPoints: [
      'Strips corporate disclaimers, email chains, and inline images',
      'Guarantees predictable payload structure for agent consumption',
      'Throttles inbound bursts to protect downstream enterprise quotas'
    ]
  },
  {
    id: 2,
    label: 'STAGE 02',
    shortTitle: 'Parallel Multi-Agent Swarm',
    title: 'Parallelized Multi-Agent Classification & Entity Extraction',
    badge: 'Day-1 Rate Limit Solved',
    problem: 'Sequential LLM calls choked on day 1 with API rate limits (HTTP 429) and caused severe SLA lag during peak morning volume surges.',
    solution: 'Engineered an asynchronous fan-out mesh decoupling urgency detection, inquiry classification, and customer tier mapping into isolated parallel micro-prompts.',
    metrics: 'Sub-1.8s median classification • Zero 429 throttling errors',
    codeSnippet: `// Parallel Task Fan-Out Orchestration
const [intent, sentiment, urgency] = await Promise.all([
  classifyIntent(sanitizedMail, { temperature: 0.1 }),
  evaluateSentiment(sanitizedMail, { confidenceMin: 0.85 }),
  detectSlaBreachRisk(sanitizedMail, accountMetadata)
]);`,
    keyPoints: [
      'Multi-agent specialized agents with low temperature for deterministic routing',
      'Dynamic backoff and request queueing bypassing enterprise tenant limits',
      'Continuous confidence calibration for automatic fallback to tier-2 models'
    ]
  },
  {
    id: 3,
    label: 'STAGE 03',
    shortTitle: 'Teams Collaboration Mesh',
    title: 'Microsoft Teams Mesh & Dynamic Context Channels',
    badge: 'Live Operations Mesh',
    problem: 'Critical inquiries got lost in shared inboxes with zero real-time accountability across cross-functional engineering and client success teams.',
    solution: 'Automated on-demand topic channel creation and deep-thread assignment in Microsoft Teams, posting structured adaptive cards with instant AI summaries.',
    metrics: 'Auto-syncs 100% thread history • Instant SME handoff',
    codeSnippet: `<AdaptiveCard version="1.5">
  <TextBlock text="CRITICAL ESCALATION // TIER 1 ENTERPRISE" weight="Bolder" color="Attention"/>
  <FactSet facts="[{'title': 'Category', 'value': 'Fibre Trunk Outage'}, {'title': 'SLA Timer', 'value': '< 15 mins'}]"/>
  <ActionSet actions="[{'type': 'Action.Submit', 'title': 'Claim Case'}]"/>
</AdaptiveCard>`,
    keyPoints: [
      'Deterministic thread IDs tie Outlook messages to Teams conversation trees',
      'Executive summary & suggested 1-click action bullets generated instantly',
      'Bi-directional sync ensures updates in Teams reflect in CRM state'
    ]
  },
  {
    id: 4,
    label: 'STAGE 04',
    shortTitle: 'Safe-Send & Audit Trail',
    title: 'Human-in-the-Loop Safeguards & Enterprise Excel Audit',
    badge: 'Zero Hallucination Risk',
    problem: 'Full autonomy is catastrophic in regulated telco enterprise contracts where automated wrong advice incurs financial penalties.',
    solution: 'Mandated dual-state review: AI drafts suggested remediation responses, but outbound dispatch strictly requires SME digital signature, logged to Excel audit trails.',
    metrics: '100% human-verified sends • Immutable audit history',
    codeSnippet: `// Immutable Audit Transaction Record
{
  "transaction_id": "HKT-AUDIT-2026-9482X",
  "case_ref": "NET-OPT-8812",
  "ai_draft_version": "v1.2",
  "signed_off_by": "engineer.lead@hkt.com",
  "audit_status": "DISPATCH_AUTHORIZED"
}`,
    keyPoints: [
      'No autonomous email sending: drafts staged for single-click engineer review',
      'Every node transition and model thought chain recorded to Excel/SharePoint',
      'Strict compliance logging meeting telco enterprise governance criteria'
    ]
  }
];

export const ProductionAISection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const currentStage = WORKFLOW_STAGES.find((s) => s.id === activeStageId) || WORKFLOW_STAGES[0];

  return (
    <section id="ai" className="relative w-full py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 bg-[#0B0F19] text-slate-100 overflow-hidden">
      {/* Subtle background industrial accent glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-400/30 bg-sky-500/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-signal animate-pulse" />
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">
              [ 01 // PRODUCTION WORKFLOWS & APPLIED AGENTS ]
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Enterprise Automation &amp; Multi-Agent Swarms
          </h2>
          <p className="font-space text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            From solving day-1 enterprise API bottlenecks at HKT to offline-resilient edge swarms.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARD 1 (HERO CARD): HKT AI-Assisted Email Triage Engine */}
        {/* ========================================================================= */}
        <div className="mb-14 rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl overflow-hidden hover:border-slate-700 transition-all duration-300">
          {/* Card Top Banner / Metadata Bar */}
          <div className="border-b border-slate-800/80 bg-slate-900/60 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-sm bg-orange-accent shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-orange-400 font-semibold block">
                  HKT Limited // Engineering Intern (Jul 2026)
                </span>
                <span className="font-mono text-xs text-slate-500">
                  SYSTEM CODE: HKT-TRIAGE-PWR-AUTO-200N
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 font-mono text-xs text-slate-300">
                ~200 Nodes Orchestrated
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/60 font-mono text-xs text-sky-300">
                Day-1 Rate Limit Solved
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 font-mono text-xs text-green-signal">
                Human-in-the-Loop Safe
              </span>
              <span className="px-2.5 py-1 rounded bg-amber/10 border border-amber/30 font-mono text-xs text-amber">
                Excel Audit Trail
              </span>
            </div>
          </div>

          {/* Hero Card Content Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Context & Overview */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="font-syne text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight leading-tight">
                    AI-Assisted Email Triage &amp; Case Mesh
                  </h3>
                  <p className="font-space text-sm text-slate-400 mt-2 leading-relaxed">
                    Production orchestration handling high-volume corporate email queues. Replaced manual routing with a deterministic 200-node workflow combining Microsoft Power Automate, parallel LLM agent calls, and real-time Teams routing.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">Throughput Gain</span>
                    <span className="font-syne text-xl font-bold text-sky-400 mt-1 block">94% Faster</span>
                    <span className="font-dm text-xs text-slate-500">From manual dispatch to seconds</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">Node Complexity</span>
                    <span className="font-syne text-xl font-bold text-orange-accent mt-1 block">~200 Nodes</span>
                    <span className="font-dm text-xs text-slate-500">Power Automate + Logic Mesh</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-mono text-xs font-semibold text-slate-300">Enterprise Guardrails:</span>
                  </div>
                  <p className="font-dm text-xs text-slate-400 leading-relaxed pl-6">
                    Autonomous responses are strictly disabled. Outbound emails are synthesized into structured draft proposals requiring single-click sign-off by telecommunications duty engineers.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive 4-Stage Architecture Visualizer */}
              <div className="lg:col-span-7 bg-[#0F172A] rounded-xl border border-slate-800/90 p-5 sm:p-6 shadow-inner">
                {/* Visualizer Header */}
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-signal animate-ping" />
                    <span className="font-mono text-xs text-slate-300 font-semibold tracking-wide">
                      INTERACTIVE NODE ARCHITECTURE (4 STAGES)
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">
                    CLICK TO INSPECT NODE RUNTIME
                  </span>
                </div>

                {/* Interactive Stage Selectors / Pipeline Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-5">
                  {WORKFLOW_STAGES.map((stage) => {
                    const isActive = stage.id === activeStageId;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setActiveStageId(stage.id)}
                        className={`text-left p-2.5 rounded-lg border transition-all duration-200 relative ${
                          isActive
                            ? 'bg-sky-500/10 border-sky-400/80 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-mono text-[10px] ${isActive ? 'text-sky-400 font-bold' : 'text-slate-500'}`}>
                            {stage.label}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-signal" />
                          )}
                        </div>
                        <span className="font-space text-xs font-semibold block mt-1 line-clamp-1">
                          {stage.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Stage Deep-Dive Details Box */}
                <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-4 sm:p-5 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs text-sky-400 font-bold">
                        {currentStage.label} // {currentStage.badge}
                      </span>
                      <h4 className="font-syne text-lg font-bold text-slate-100 mt-0.5">
                        {currentStage.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {currentStage.metrics}
                    </span>
                  </div>

                  {/* Problem vs Solution Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded bg-red-950/20 border border-red-900/40">
                      <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider block font-bold mb-1">
                        Failure Mode / Bottleneck:
                      </span>
                      <p className="font-dm text-slate-300 leading-relaxed">
                        {currentStage.problem}
                      </p>
                    </div>
                    <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/40">
                      <span className="font-mono text-[10px] text-green-signal uppercase tracking-wider block font-bold mb-1">
                        Engineered Resolution:
                      </span>
                      <p className="font-dm text-slate-300 leading-relaxed">
                        {currentStage.solution}
                      </p>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 pt-1">
                    {currentStage.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-dm text-xs text-slate-400">
                        <span className="text-sky-400 mt-0.5">▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Code / Schema Peek */}
                  <div className="mt-2 rounded bg-slate-950 border border-slate-800/80 p-3 overflow-x-auto">
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-900 text-[10px] font-mono text-slate-500">
                      <span>NODE SPECIFICATION ARTIFACT</span>
                      <span>UTF-8 // JSON/TS</span>
                    </div>
                    <pre className="font-mono text-[11px] text-slate-300 leading-snug">
                      <code>{currentStage.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARDS 2 & 3: GRID LAYOUT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 2: Google ADK Inclusive Tourism Multi-Agent Swarm */}
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group">
            <div>
              {/* Header / Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-signal shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold">
                    Google Gen AI Academy APAC
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/60 font-mono text-xs text-slate-300">
                  Google ADK Swarm
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-syne text-2xl font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                Inclusive Tourism Multi-Agent Swarm
              </h3>
              <p className="font-space text-sm text-slate-400 mt-2 leading-relaxed">
                Autonomous itinerary generation prioritizing wheelchair travelers, elderly tourists, and low-mobility citizens across Hong Kong.
              </p>

              {/* Swarm Architecture Diagram Representation */}
              <div className="my-6 p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-[11px] text-slate-400 font-semibold">
                    SWARM TOPOLOGY: 1 ORCHESTRATOR + 3 SPECIALISTS
                  </span>
                  <span className="font-mono text-[10px] text-green-signal">AlloyDB + BigQuery</span>
                </div>

                {/* Orchestrator node */}
                <div className="p-2.5 rounded bg-sky-500/10 border border-sky-400/40 text-center">
                  <span className="font-mono text-xs font-bold text-sky-300">
                    CENTRAL ORCHESTRATOR AGENT
                  </span>
                  <span className="block font-dm text-[11px] text-slate-400">
                    User Persona Synthesis &amp; Multi-Constraint Dispatch
                  </span>
                </div>

                {/* Fan out lines */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-mono text-[10px] text-orange-400 font-bold block">AGENT A</span>
                    <span className="font-dm text-[10px] text-slate-300">Transit &amp; Step-Free</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-mono text-[10px] text-cyan-signal font-bold block">AGENT B</span>
                    <span className="font-dm text-[10px] text-slate-300">Live Weather &amp; Rain</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-mono text-[10px] text-green-signal font-bold block">AGENT C</span>
                    <span className="font-dm text-[10px] text-slate-300">Spatial Verified</span>
                  </div>
                </div>
              </div>

              {/* Offline Edge Resilience Highlight */}
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800/80 mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-orange-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-mono text-xs font-semibold text-slate-200">
                    Offline Resilience // Subway Blackouts
                  </span>
                </div>
                <p className="font-dm text-xs text-slate-400 leading-relaxed">
                  Engineered offline fallbacks using quantized local 1B GGUF models on llama.cpp, allowing underground MTR station step-free guidance even when cellular uplink drops completely.
                </p>
              </div>
            </div>

            {/* Bottom Stats Metric */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-syne text-2xl font-bold text-sky-400">482</span>
                <span className="font-dm text-xs text-slate-400 block">Verified Accessibility Waypoints</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-green-signal block">● Zero Cloud Dependency Mode</span>
                <span className="font-dm text-[11px] text-slate-500">Local llama.cpp 1B Quantized</span>
              </div>
            </div>
          </div>

          {/* Card 3: Perihel Transcribe */}
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group">
            <div>
              {/* Header / Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-orange-accent shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-orange-400 font-semibold">
                    Systems Engineering // Rust
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/60 font-mono text-xs text-slate-300">
                  Sub-120MB Memory
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-syne text-2xl font-bold text-slate-100 group-hover:text-orange-300 transition-colors">
                Perihel Transcribe // Low-RAM Speech Engine
              </h3>
              <p className="font-space text-sm text-slate-400 mt-2 leading-relaxed">
                Lightweight, private voice-to-text dictation client powered by a native Rust backend and quantized int8 Sherpa Parakeet neural models.
              </p>

              {/* Architecture & Telemetry Specs */}
              <div className="my-6 p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-[11px] text-slate-400 font-semibold">
                    PERFORMANCE BENCHMARK TELEMETRY
                  </span>
                  <span className="font-mono text-[10px] text-sky-400">Sherpa Parakeet int8</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-dm text-slate-400">RAM Allocation Under Peak Load:</span>
                    <span className="font-mono font-bold text-green-signal">&lt; 118 MB</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-green-signal h-full rounded-full" style={{ width: '22%' }} />
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="font-dm text-slate-400">Inference Latency (Streaming):</span>
                    <span className="font-mono font-bold text-sky-400">~140 ms</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-sky-400 h-full rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-2.5 mb-5 font-dm text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-orange-accent font-bold mt-0.5">✓</span>
                  <span><strong className="text-slate-200">Zero Cloud Dependency:</strong> Audio waveforms never leave device RAM; eliminates privacy exposure for sensitive conversations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-accent font-bold mt-0.5">✓</span>
                  <span><strong className="text-slate-200">Global System Hotkey:</strong> Instant toggle across macOS and Linux with zero lag background daemon hooks.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-accent font-bold mt-0.5">✓</span>
                  <span><strong className="text-slate-200">Int8 Quantization:</strong> Retains high accuracy while running comfortably on low-spec hardware or single-board computers.</span>
                </div>
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="font-syne text-2xl font-bold text-orange-accent">100%</span>
                <span className="font-dm text-xs text-slate-400 block">Offline Air-Gapped Operation</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-slate-300 block">Native Rust Engine</span>
                <span className="font-dm text-[11px] text-slate-500">Zero Garbage Collection Pauses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductionAISection;
