import React, { useState } from 'react';

type Mode = 'systems' | 'kinetic';

export const KineticHero: React.FC = () => {
  const [mode, setMode] = useState<Mode>('systems');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tototofu0601@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 lg:px-16 telemetry-grid overflow-hidden">
      {/* Background radial gradient accent */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 transition-colors duration-700"
        style={{
          background: mode === 'systems' ? '#38BDF8' : '#F97316'
        }}
      />

      {/* Top telemetry bar */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-200 font-semibold tracking-wider">TOTO LAI / t.tofu</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">HKUST BEng CPEG + AI &apos;27</span>
        </div>

        {/* Telemetry quick status */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block px-2.5 py-1 rounded border border-slate-800 bg-slate-900/60 text-slate-300">
            LOC: HONG KONG SAR
          </span>
          <span className="px-2.5 py-1 rounded border border-orange-500/30 bg-orange-500/10 text-orange-400 font-medium">
            STATUS: INTERN @ HKT // #OpenToWork
          </span>
        </div>
      </div>

      {/* Main Hero Split View */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8">
        
        {/* Left Column: Identity, Dynamic Role & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          {/* Dual-Mode Selector Switch */}
          <div className="inline-flex p-1 rounded-lg border border-slate-800 bg-slate-900/80 w-fit backdrop-blur-sm">
            <button
              onClick={() => setMode('systems')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
                mode === 'systems'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              [ MODE: SYSTEMS_ENGINEER ]
            </button>

            <button
              onClick={() => setMode('kinetic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
                mode === 'kinetic'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              [ MODE: KINETIC_ATHLETE ]
            </button>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
              {mode === 'systems' ? (
                <>
                  Applied AI &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Low-Latency Systems</span>
                </>
              ) : (
                <>
                  National Athlete &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Kinetic Engineering</span>
                </>
              )}
            </h1>
            <p className="font-space text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
              {mode === 'systems' ? (
                <span>
                  Engineering enterprise multi-agent workflows at <strong>HKT</strong>, sub-120MB local speech engines in <strong>Rust</strong>, and hardware-coupled automation connecting physical reality to scalable intelligence.
                </span>
              ) : (
                <span>
                  Representing Hong Kong on the <strong>National Speed &amp; Ice Climbing Teams</strong> (14th in Asia, World Ranked 55th). Translating climbing route-finding and high-pressure execution into algorithmic software.
                </span>
              )}
            </p>
          </div>

          {/* Active Mode Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {mode === 'systems' ? (
              <>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Production AI</div>
                  <div className="text-sm font-semibold text-sky-400 mt-1 font-space">200-Node Pipeline</div>
                  <div className="text-xs text-slate-400 mt-0.5">HKT Email Triage</div>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Robotics Champion</div>
                  <div className="text-sm font-semibold text-emerald-400 mt-1 font-space">1st Place Overall</div>
                  <div className="text-xs text-slate-400 mt-0.5">Combat Bot 20+ Teams</div>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Systems &amp; Rust</div>
                  <div className="text-sm font-semibold text-slate-200 mt-1 font-space">&lt;120MB On-Device</div>
                  <div className="text-xs text-slate-400 mt-0.5">Parakeet Int8 Dictation</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">National Team</div>
                  <div className="text-sm font-semibold text-orange-400 mt-1 font-space">Hong Kong Team</div>
                  <div className="text-xs text-slate-400 mt-0.5">Speed &amp; Ice Climbing</div>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Asian Champs</div>
                  <div className="text-sm font-semibold text-amber-400 mt-1 font-space">14th in Asia</div>
                  <div className="text-xs text-slate-400 mt-0.5">World Ranked 55th</div>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Team Captain</div>
                  <div className="text-sm font-semibold text-slate-200 mt-1 font-space">200+ Members</div>
                  <div className="text-xs text-slate-400 mt-0.5">+25% Growth &amp; 5 Sponsors</div>
                </div>
              </>
            )}
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#ai"
              className="px-5 py-2.5 rounded-md bg-orange-500 hover:bg-orange-600 text-slate-950 font-space font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] flex items-center gap-2"
            >
              <span>Explore Production AI</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <a
              href="#robotics"
              className="px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-space text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span>Combat Robotics</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-2.5 rounded-md border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors duration-200 flex items-center gap-2"
              title="Copy email to clipboard"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Portrait Frame & Hardware Frame */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-2xl border border-slate-800 bg-slate-900/70 p-3 shadow-2xl overflow-hidden group">
            
            {/* Top Frame Status Label */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>TELEMETRY_PORTRAIT</span>
              </span>
              <span className="text-slate-500 uppercase">{mode}_STATE</span>
            </div>

            {/* Portrait Image Container */}
            <div className="relative w-full h-[calc(100%-2.25rem)] mt-2 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={mode === 'systems' ? '/images/hero-formal.png' : '/images/hero-sporty.png'}
                alt={mode === 'systems' ? 'Toto Lai - Systems Engineer' : 'Toto Lai - Kinetic Athlete'}
                className="w-full h-full object-cover object-top transition-opacity duration-300 filter contrast-105"
                loading="eager"
              />

              {/* Minimal scanline overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/80" />

              {/* Bottom Badge Over Photo */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-800/90 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-slate-400 text-[10px]">VERIFIED_ID</span>
                  <span className={`text-[10px] font-bold ${mode === 'systems' ? 'text-sky-400' : 'text-orange-400'}`}>
                    {mode === 'systems' ? 'CPEG // AI_DEV' : 'HK_NATIONAL_ATHLETE'}
                  </span>
                </div>
                <div className="font-space font-semibold text-slate-200 mt-0.5 truncate">
                  {mode === 'systems' ? 'Lai Man To (Toto) — Systems Builder' : 'Toto Lai — Ice & Speed Climbing'}
                </div>
              </div>
            </div>

            {/* Corner Bracket Accents */}
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-slate-600 pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-slate-600 pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-slate-600 pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-slate-600 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 w-full pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex items-center gap-4">
          <span>GITHUB: <a href="https://github.com/tototofu123" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-orange-400 underline decoration-slate-700 underline-offset-4">@tototofu123</a></span>
          <span>REPOS: 44+</span>
          <span className="hidden sm:inline">COMMITS: 1,200+</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-600">[LATENCY: 0ms // NO-LAG COMPILED]</span>
          <a href="#ai" className="text-orange-400 hover:text-orange-300 flex items-center gap-1">
            <span>SCROLL DOWN</span>
            <svg className="w-3.5 h-3.5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
