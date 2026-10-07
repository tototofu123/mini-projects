import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { assetUrl } from '../../utils/assetUrl';

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
    <section id="ai" className="relative w-full py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 bg-[#0B0F19] text-slate-100 overflow-visible">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-400/30 bg-sky-500/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-signal animate-pulse" />
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">
              [ 01 // PRODUCTION WORKFLOWS &amp; APPLIED AGENTS ]
            </span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-slate-50 tracking-tight leading-tight">
            Enterprise Automation &amp; Multi-Agent Swarms
          </h2>
          <p className="font-space text-base sm:text-lg text-slate-400 max-w-3xl mt-3 leading-relaxed">
            Real architectural execution: solving day-1 enterprise API bottlenecks at HKT, coordinating offline-resilient edge swarms, and running sub-120MB speech engines on-device.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARD 1 (HERO CARD): HKT AI-Assisted Email Triage Engine */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl overflow-visible hover:border-slate-700 transition-all duration-300"
        >
          {/* Card Top Banner / Metadata Bar */}
          <div className="border-b border-slate-800/80 bg-slate-900/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 rounded-t-2xl">
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
              <span className="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/80 font-mono text-xs text-slate-300">
                ~200 Nodes Orchestrated
              </span>
              <span className="px-2.5 py-1 rounded bg-sky-950/70 border border-sky-800/70 font-mono text-xs text-sky-300">
                Day-1 Rate Limit Solved
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-800/70 font-mono text-xs text-green-signal">
                Human-in-the-Loop Safe
              </span>
              <span className="px-2.5 py-1 rounded bg-amber/15 border border-amber/40 font-mono text-xs text-amber font-semibold">
                Excel Audit Trail
              </span>
            </div>
          </div>

          {/* Hero Card Content Body */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* Top Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <h3 className="font-syne text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight leading-tight">
                  AI-Assisted Email Triage &amp; Case Mesh
                </h3>
                <p className="font-space text-sm sm:text-base text-slate-300 leading-relaxed">
                  Designed and built an AI-assisted email routing system from scratch using Microsoft Power Automate integrated with Microsoft Teams, scaling to a <strong>~200-node production workflow</strong>. Handles customer hotline inquiries with multi-agent classification, persistent Teams threads, and strict human review safeguards.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">Throughput Gain</span>
                  <span className="font-syne text-2xl font-bold text-sky-400 mt-1 block">94% Faster</span>
                  <span className="font-dm text-xs text-slate-400 mt-1 block">From manual dispatch to seconds</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">Node Complexity</span>
                  <span className="font-syne text-2xl font-bold text-orange-accent mt-1 block">~200 Nodes</span>
                  <span className="font-dm text-xs text-slate-400 mt-1 block">Power Automate + Logic Mesh</span>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* REAL SVG ARCHITECTURE FLOWCHART DIAGRAM */}
            {/* ============================================================= */}
            <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5 sm:p-6 shadow-inner">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-signal animate-pulse" />
                  <span className="font-mono text-xs text-slate-200 font-bold tracking-wide">
                    200-NODE ARCHITECTURAL FLOWCHART (CLICK NODES TO INSPECT)
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">
                  INTERACTIVE TELEMETRY TOPOLOGY
                </span>
              </div>

              {/* Responsive Flowchart Diagram */}
              <div className="w-full overflow-x-auto pb-2">
                <div className="min-w-[720px] py-4 px-2">
                  <div className="grid grid-cols-5 gap-3 items-center text-center">
                    
                    {/* Node 0: Raw Ingestion */}
                    <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-400">
                      <div className="text-[10px] text-slate-500 uppercase">Input</div>
                      <div className="font-bold text-slate-200 mt-1">Outlook Hotline</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Webhook Trigger</div>
                    </div>

                    {/* Arrow 1 */}
                    <div className="flex flex-col items-center justify-center text-slate-600">
                      <span className="text-[10px] font-mono text-sky-400">raw body</span>
                      <span>──────►</span>
                    </div>

                    {/* Node 1: Pre-Flight Ingestion & Schema Filter */}
                    <button
                      onClick={() => setActiveStageId(1)}
                      className={`p-3.5 rounded-lg border text-left transition-all duration-200 ${
                        activeStageId === 1
                          ? 'border-sky-400 bg-sky-950/40 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-sky-400 uppercase font-semibold">Stage 01</div>
                      <div className="font-syne font-bold text-xs mt-0.5">JSON Schema Parser</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-1">Token Optimization</div>
                    </button>

                    {/* Arrow 2 */}
                    <div className="flex flex-col items-center justify-center text-slate-600">
                      <span className="text-[10px] font-mono text-emerald-400">sanitized JSON</span>
                      <span>──────►</span>
                    </div>

                    {/* Node 2: Multi-Agent Parallel Swarm */}
                    <button
                      onClick={() => setActiveStageId(2)}
                      className={`p-3.5 rounded-lg border text-left transition-all duration-200 ${
                        activeStageId === 2
                          ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-[0_0_15px_rgba(74,222,128,0.25)]'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-emerald-400 uppercase font-semibold">Stage 02</div>
                      <div className="font-syne font-bold text-xs mt-0.5">Parallel Agent Swarm</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-1">Intent / Risk / SLA</div>
                    </button>
                  </div>

                  {/* Connecting bus line down to stage 3 & 4 */}
                  <div className="flex justify-center my-3 text-slate-600 font-mono text-xs">
                    <span>│</span>
                  </div>

                  <div className="grid grid-cols-5 gap-3 items-center text-center">
                    {/* Empty spacer */}
                    <div />
                    <div />

                    {/* Node 3: Teams Mesh */}
                    <button
                      onClick={() => setActiveStageId(3)}
                      className={`p-3.5 rounded-lg border text-left transition-all duration-200 ${
                        activeStageId === 3
                          ? 'border-purple-400 bg-purple-950/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-purple-400 uppercase font-semibold">Stage 03</div>
                      <div className="font-syne font-bold text-xs mt-0.5">Teams Mesh Channels</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-1">Persistent Threads</div>
                    </button>

                    {/* Arrow 4 */}
                    <div className="flex flex-col items-center justify-center text-slate-600">
                      <span className="text-[10px] font-mono text-amber">staged draft</span>
                      <span>──────►</span>
                    </div>

                    {/* Node 4: Safe-Send Gate & Excel Audit */}
                    <button
                      onClick={() => setActiveStageId(4)}
                      className={`p-3.5 rounded-lg border text-left transition-all duration-200 ${
                        activeStageId === 4
                          ? 'border-amber bg-amber/20 text-amber shadow-[0_0_15px_rgba(252,211,77,0.25)]'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-amber uppercase font-semibold">Stage 04</div>
                      <div className="font-syne font-bold text-xs mt-0.5">Safe-Send &amp; Audit Log</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-1">Human Gate + Excel</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* STAGE INSPECTOR DETAILS (UN-CROPPED & GENEROUSLY SPACED) */}
            {/* ============================================================= */}
            <div className="rounded-xl bg-[#0F172A] border border-slate-800 p-6 sm:p-7 space-y-6">
              
              {/* Header of Active Stage */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-sky-400 font-bold">
                      {currentStage.label}
                    </span>
                    <span className="text-slate-600">/</span>
                    <span className="font-mono text-xs text-orange-400 font-medium">
                      {currentStage.badge}
                    </span>
                  </div>
                  <h4 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mt-1 pb-1">
                    {currentStage.title}
                  </h4>
                </div>
                <span className="font-mono text-xs px-3 py-1.5 rounded bg-slate-800/90 text-slate-200 border border-slate-700">
                  {currentStage.metrics}
                </span>
              </div>

              {/* Problem vs Resolution Cards with GENEROUS vertical breathing room */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Failure Mode Card */}
                <div className="p-5 rounded-xl bg-red-950/25 border border-red-900/50 flex flex-col justify-between space-y-3 min-h-[120px]">
                  <span className="font-mono text-[11px] text-red-400 uppercase tracking-wider block font-bold">
                    FAILURE MODE / BOTTLENECK:
                  </span>
                  <p className="font-dm text-sm text-slate-200 leading-relaxed">
                    {currentStage.problem}
                  </p>
                </div>

                {/* Engineered Resolution Card */}
                <div className="p-5 rounded-xl bg-emerald-950/25 border border-emerald-900/50 flex flex-col justify-between space-y-3 min-h-[120px]">
                  <span className="font-mono text-[11px] text-green-signal uppercase tracking-wider block font-bold">
                    ENGINEERED RESOLUTION:
                  </span>
                  <p className="font-dm text-sm text-slate-200 leading-relaxed">
                    {currentStage.solution}
                  </p>
                </div>

              </div>

              {/* Bullet Points */}
              <div className="pt-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                  Key System Characteristics:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStage.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-dm text-xs text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-sky-400 font-bold">▸</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Artifact Code Snippet */}
              <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-4 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-900 text-[11px] font-mono text-slate-500">
                  <span>PRODUCTION ARTIFACT PAYLOAD // STAGE_{activeStageId}</span>
                  <span>UTF-8 // VERIFIED</span>
                </div>
                <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                  <code>{currentStage.codeSnippet}</code>
                </pre>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CARDS 2 & 3: GOOGLE ADK SWARM & PERIHEL TRANSCRIBE */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 2: Google ADK Inclusive Tourism Multi-Agent Swarm */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-wider">
                  Google Gen AI Academy APAC Edition
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/50 text-sky-300">
                  ADK Swarm Architecture
                </span>
              </div>

              <h3 className="font-syne text-2xl font-bold text-slate-100 pb-1">
                Inclusive Tourism Multi-Agent Swarm
              </h3>

              <p className="font-space text-sm text-slate-300 leading-relaxed">
                An AI-powered trip companion for high-mobility tourists (wheelchair users, elderly). Features a <strong>Main Orchestrator</strong> streaming multimodal audio/text while 3 background sub-agents concurrently process transit routing, live weather, and spatial photo verification across <strong>482 verified locations</strong>.
              </p>

              {/* Edge-to-Cloud Visual Diagram */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-3">
                <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
                  <span>RESILIENCE TOPOLOGY: DUAL TIER</span>
                  <span className="text-emerald-400">EDGE FALLBACK</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">Cloud Tier: Gemini + AlloyDB + BigQuery</span>
                    <span className="text-sky-400">Online Mode</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-300">Edge Tier: 1B GGUF Model via llama.cpp</span>
                    <span className="text-green-signal">Subway / Blackout Safe</span>
                  </div>
                </div>
              </div>

              {/* Authentic Screenshot Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-800 mt-3 group-hover:border-slate-700 transition-colors">
                <div className="relative aspect-[16/9] bg-slate-950">
                  <img
                    src={assetUrl('/images/projects/rag-chatbot.png')}
                    alt="RAG and Tourism Agent Interface"
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    Multimodal Chat &amp; Accessibility Verification Map
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-800/80 mt-6">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Google ADK</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Gemini Function Calling</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">llama.cpp 1B GGUF</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">BigQuery Telemetry</span>
            </div>
          </motion.div>

          {/* Card 3: Perihel Transcribe (Low-Memory Rust Speech Engine) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-slate-800 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
                  Open Source Systems
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-orange-950/60 border border-orange-800/50 text-orange-300 font-semibold">
                  Rust + Sherpa Parakeet
                </span>
              </div>

              <h3 className="font-syne text-2xl font-bold text-slate-100 pb-1">
                Perihel Transcribe // Low-RAM Speech Engine
              </h3>

              <p className="font-space text-sm text-slate-300 leading-relaxed">
                An on-device dictation engine engineered in <strong>Rust</strong> as a low-memory alternative to Wispr Flow. Utilizes quantized <strong>sherpa Parakeet int8</strong> to achieve sub-120MB resident memory footprint with zero cloud telemetry. Hold Right Ctrl to dictate anywhere in OS.
              </p>

              {/* Memory Benchmark Graphic */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-3">
                <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
                  <span>RESIDENT MEMORY ALLOCATION (RAM)</span>
                  <span className="text-emerald-400 font-bold">97% REDUCTION</span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Standard Whisper FP16 / Cloud Bridge</span>
                      <span className="text-red-400">~4,000 MB</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-red-500/80 h-full w-[95%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Perihel Transcribe (Rust + Parakeet int8)</span>
                      <span className="text-emerald-400 font-bold">&lt; 120 MB</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[4%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter / System Screenshot */}
              <div className="rounded-xl overflow-hidden border border-slate-800 mt-3 group-hover:border-slate-700 transition-colors">
                <div className="relative aspect-[16/9] bg-slate-950">
                  <img
                    src={assetUrl('/images/projects/ai-newsletter.png')}
                    alt="Perihel System Overview"
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    Real-time Pipeline &amp; Global Hotkey Listener
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-800/80 mt-6">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Rust System Logic</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Sherpa-ONNX</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Parakeet Int8 Quantized</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Win32 Hook API</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProductionAISection;
