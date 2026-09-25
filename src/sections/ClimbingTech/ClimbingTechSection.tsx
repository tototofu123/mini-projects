import React from 'react';

export const ClimbingTechSection: React.FC = () => {

  return (
    <section id="climbing" className="relative w-full py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 bg-[#0B0F19] text-slate-100 overflow-hidden">
      {/* Background Decorative Grid and Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-orange-500/30 bg-orange-500/10 mb-4 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-orange-400">
            [ 03 // THE KINETIC INTERSECTION: CLIMBING TECH ]
          </span>
        </div>
        
        <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
          High-Angle Athletics Meets Machine Intelligence
        </h2>
        
        <p className="font-space text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
          Translating physical route-finding, hold kinematics, and team leadership into software.
        </p>

        {/* Telemetry / Quick Stats Banner */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-lg bg-surface-card/60 border border-slate-border">
          <div>
            <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">Discipline</div>
            <div className="font-space text-sm font-semibold text-slate-200 mt-0.5">Speed & Ice Climbing</div>
          </div>
          <div>
            <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">HK National Team</div>
            <div className="font-space text-sm font-semibold text-orange-400 mt-0.5">2025 – 2026</div>
          </div>
          <div>
            <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">Asian Champs</div>
            <div className="font-space text-sm font-semibold text-cyan-signal mt-0.5">14th Place</div>
          </div>
          <div>
            <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">World Ranking</div>
            <div className="font-space text-sm font-semibold text-green-signal mt-0.5">55th Ranked</div>
          </div>
        </div>
      </div>

      {/* Main Grid Content (3 Cards) */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CARD 1: National Athlete Profile Card */}
        <div className="flex flex-col rounded-xl bg-surface-card border border-slate-border hover:border-orange-500/40 transition-colors duration-200 p-6 sm:p-7 relative overflow-hidden group">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-transparent" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-orange-400/90 font-semibold tracking-wider uppercase">
              ATHLETE PROFILE // HKG-NAT
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-950/40 border border-orange-500/20 text-orange-300 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              ACTIVE SQUAD
            </div>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mb-3">
            National Team Athlete
          </h3>

          <div className="space-y-3 mb-6">
            <div className="p-3 rounded-lg bg-deep-slate/80 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mb-1">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>HK National Speed Climbing Team</span>
              </div>
              <div className="font-mono text-xs text-slate-400 pl-6">Season: 2025–2026</div>
            </div>

            <div className="p-3 rounded-lg bg-deep-slate/80 border border-slate-800/80">
              <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mb-1">
                <svg className="w-4 h-4 text-cyan-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>HK National Ice Climbing Team</span>
              </div>
              <div className="font-mono text-xs text-slate-400 pl-6">Season: 2025</div>
            </div>
          </div>

          {/* Athletic Philosophy Quote */}
          <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20 mb-6">
            <div className="font-mono text-[11px] text-orange-400 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              Athletic Philosophy
            </div>
            <p className="font-space text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              &ldquo;Climbing walls are constrained search spaces. Each hold is a state; every movement is an optimization problem under fatigue.&rdquo;
            </p>
          </div>

          {/* SEN & Adaptive Coaching */}
          <div className="mt-auto pt-4 border-t border-slate-800/80">
            <div className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-green-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              SEN & Adaptive Coaching
            </div>
            <p className="font-space text-xs text-slate-400 leading-normal">
              YMCA of Hong Kong coach for neurodivergent youth and elderly climbers, designing therapeutic sensory-motor route progressions.
            </p>
          </div>
        </div>

        {/* CARD 2: climbing-ai Project Card */}
        <div className="flex flex-col rounded-xl bg-surface-card border border-slate-border hover:border-orange-500/40 transition-colors duration-200 p-6 sm:p-7 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-signal via-orange-400 to-transparent" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-cyan-signal font-semibold tracking-wider uppercase">
              R&amp;D PROJECT // ML &amp; KINEMATICS
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]">
              V1.2 EXPERIMENTAL
            </div>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mb-2">
            climbing-ai Engine
          </h3>
          <p className="font-space text-xs text-slate-400 mb-4">
            Autonomous bouldering route synthesis and robotic biomechanical beta verification.
          </p>

          {/* Project Visual / Image Preview */}
          <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-800 mb-5 bg-deep-slate">
            <img 
              src="/images/projects/climbing-route.jpg" 
              alt="Climbing AI Route Optimization and Beta Generation"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback if climbing-route.jpg has any issue
                (e.currentTarget as HTMLImageElement).src = '/images/projects/climbing-boulder.webp';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80" />
            
            {/* Visual HUD Overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 text-orange-400 border border-orange-500/30">
                IK BETA: V7 [SIMULATED]
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 text-slate-300 border border-slate-700">
                CV ACCURACY 94.2%
              </span>
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-mono text-[10px] text-orange-400 font-bold">RL</span>
              </div>
              <div>
                <h4 className="font-space text-xs font-semibold text-slate-200">Reinforcement Learning Route Generator</h4>
                <p className="font-space text-xs text-slate-400 leading-relaxed">
                  Synthesizes novel bouldering boulder problems adhering to spatial grip tension constraints and movement flow.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-mono text-[10px] text-cyan-signal font-bold">IK</span>
              </div>
              <div>
                <h4 className="font-space text-xs font-semibold text-slate-200">Inverse Kinematics Stickman Beta</h4>
                <p className="font-space text-xs text-slate-400 leading-relaxed">
                  Simulates skeletal reach, center of gravity balance, and dynamic momentum requirements for target moves.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-mono text-[10px] text-amber font-bold">CV</span>
              </div>
              <div>
                <h4 className="font-space text-xs font-semibold text-slate-200">Computer Vision Hold & Grade Estimator</h4>
                <p className="font-space text-xs text-slate-400 leading-relaxed">
                  Edge-annotates hold geometry, surface friction vectors, and predicts Fontainebleau / V-grade difficulty metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-auto pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
            {['PyTorch', 'OpenCV', 'Three.js IK', 'FastAPI', 'NumPy'].map((tech) => (
              <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-deep-slate border border-slate-700/60 text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CARD 3: HKUST Sport Climbing Society Platform Card */}
        <div className="flex flex-col rounded-xl bg-surface-card border border-slate-border hover:border-orange-500/40 transition-colors duration-200 p-6 sm:p-7 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-signal via-orange-400 to-transparent" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-green-signal font-semibold tracking-wider uppercase">
              LEADERSHIP &amp; FULL-STACK
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-950/40 border border-green-500/20 text-green-300 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              LIVE DEPLOYMENT
            </div>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mb-1">
            HKUST Sport Climbing Society
          </h3>
          <div className="font-space text-xs text-orange-400 font-medium mb-4">
            Team Captain &amp; Vice President (2024–2025)
          </div>

          {/* Club Impact Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3 rounded-lg bg-deep-slate/90 border border-slate-800">
              <div className="font-syne text-2xl font-bold text-slate-100">200+</div>
              <div className="font-space text-xs text-slate-400 mt-0.5">Active Members</div>
              <div className="font-mono text-[10px] text-green-signal mt-1">↑ +25% under leadership</div>
            </div>
            <div className="p-3 rounded-lg bg-deep-slate/90 border border-slate-800">
              <div className="font-syne text-2xl font-bold text-slate-100">5</div>
              <div className="font-space text-xs text-slate-400 mt-0.5">Corporate Sponsors</div>
              <div className="font-mono text-[10px] text-orange-400 mt-1">Black Diamond, Scarpa, etc.</div>
            </div>
          </div>

          {/* Platform Architecture Details */}
          <div className="space-y-3 mb-6">
            <div className="p-3 rounded-lg bg-deep-slate/60 border border-slate-800">
              <div className="font-mono text-[11px] text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-cyan-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Full-Stack Digital Architecture
              </div>
              <p className="font-space text-xs text-slate-400 leading-relaxed">
                Engineered society hub with Next.js 15, Tailwind v4, and an event reservation system backed by FastAPI.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-deep-slate/60 border border-slate-800">
              <div className="font-mono text-[11px] text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Edge AI Assistant (Qwen 0.5B)
              </div>
              <p className="font-space text-xs text-slate-400 leading-relaxed">
                Self-hosted local LLM running on AWS EC2 via Ollama, answering member gear questions and route beta 24/7.
              </p>
            </div>
          </div>

          {/* Live Link Button */}
          <div className="mt-auto pt-4 border-t border-slate-800/80">
            <a 
              href="https://hkustclimbingsociety.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/50 text-orange-300 hover:text-orange-200 transition-all duration-200 font-mono text-xs group/btn"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                hkustclimbingsociety.vercel.app
              </span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Technical Footnote / Watermark */}
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
        <div>
          LATERAL DISPLACEMENT OPTIMIZATION // ALGORITHMIC BETA VERIFICATION
        </div>
        <div className="flex items-center gap-4">
          <span>COORDINATES: 22.3375° N, 114.2630° E (HKUST WALL)</span>
          <span className="text-slate-700">|</span>
          <span className="text-orange-400/80">DISCIPLINE: SPEED / ICE / BOULDER</span>
        </div>
      </div>
    </section>
  );
};

export default ClimbingTechSection;
