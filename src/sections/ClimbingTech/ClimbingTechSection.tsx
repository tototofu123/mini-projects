import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ClimbingTechSection: React.FC = () => {
  const [selectedHoldIndex, setSelectedHoldIndex] = useState<number>(2);

  // Simulated climbing route holds for climbing-ai visualizer
  const ROUTE_HOLDS = [
    { id: 1, x: 28, y: 78, type: 'Start Foot', grade: 'V2', color: '#4ADE80' },
    { id: 2, x: 38, y: 62, type: 'Crimp Grip', grade: 'V4', color: '#38BDF8' },
    { id: 3, x: 55, y: 44, type: 'Sloper Pinch', grade: 'V6', color: '#F97316' },
    { id: 4, x: 70, y: 28, type: 'Dynamic Pocket', grade: 'V7', color: '#FCD34D' },
    { id: 5, x: 58, y: 14, type: 'Top Finish', grade: 'V7', color: '#EF4444' }
  ];

  return (
    <section id="climbing" className="relative w-full py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 bg-[#0B0F19] text-slate-100 overflow-visible">
      {/* Background Decorative Grid and Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-7xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-orange-500/30 bg-orange-500/10 mb-4 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-orange-400">
            [ 03 // THE KINETIC INTERSECTION: CLIMBING TECH ]
          </span>
        </div>
        
        <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight mb-4 pb-1">
          High-Angle Athletics Meets Machine Intelligence
        </h2>
        
        <p className="font-space text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Translating physical route-finding, hold kinematics, and team leadership into software.
        </p>

        {/* Telemetry / Quick Stats Banner */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111827] border border-slate-800">
          <div className="p-2">
            <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Discipline</div>
            <div className="font-space text-base font-bold text-slate-100 mt-0.5">Speed &amp; Ice Climbing</div>
          </div>
          <div className="p-2">
            <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">HK National Team</div>
            <div className="font-space text-base font-bold text-orange-400 mt-0.5">2025 – 2026</div>
          </div>
          <div className="p-2">
            <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Asian Champs</div>
            <div className="font-space text-base font-bold text-cyan-signal mt-0.5">14th in Asia</div>
          </div>
          <div className="p-2">
            <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">World Ranking</div>
            <div className="font-space text-base font-bold text-green-signal mt-0.5">55th Ranked</div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Content (3 Cards) */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CARD 1: National Athlete Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col rounded-2xl bg-[#111827] border border-slate-800 hover:border-orange-500/40 transition-all duration-200 p-6 sm:p-7 relative overflow-visible group shadow-xl"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-transparent rounded-t-2xl" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-wider uppercase">
              ATHLETE PROFILE // HKG-NAT
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-950/40 border border-orange-500/20 text-orange-300 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              ACTIVE SQUAD
            </div>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mb-3 pb-1">
            National Team Athlete
          </h3>

          {/* Real Photo Thumbnail */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-800 mb-5 bg-slate-950">
            <img 
              src="/images/projects/climbing-boulder.webp" 
              alt="Toto Lai Climbing Action"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-orange-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
              UIAA Speed &amp; Ice Discipline Competitor
            </div>
          </div>

          <div className="space-y-3 mb-5">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-100 text-sm font-semibold mb-0.5">
                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>HK National Speed Climbing Team</span>
              </div>
              <div className="font-mono text-xs text-slate-400 pl-6">Season: 2025–2026 // Senior National Squad</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-100 text-sm font-semibold mb-0.5">
                <svg className="w-4 h-4 text-cyan-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>HK National Ice Climbing Team</span>
              </div>
              <div className="font-mono text-xs text-slate-400 pl-6">Season: 2025 // 14th Asian Champs (Speed)</div>
            </div>
          </div>

          {/* Athletic Philosophy Quote */}
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 mb-5">
            <div className="font-mono text-[11px] text-orange-400 uppercase tracking-wider mb-1 font-semibold flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              Athletic Philosophy
            </div>
            <p className="font-space text-xs sm:text-sm text-slate-200 italic leading-relaxed">
              &ldquo;Climbing walls are constrained search spaces. Each hold is a state; every movement is an optimization problem under fatigue.&rdquo;
            </p>
          </div>

          {/* SEN & Adaptive Coaching */}
          <div className="mt-auto pt-4 border-t border-slate-800">
            <div className="font-mono text-xs font-semibold text-slate-200 flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-green-signal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              SEN &amp; Adaptive Coaching
            </div>
            <p className="font-space text-xs text-slate-400 leading-relaxed">
              YMCA of Hong Kong coach for neurodivergent youth and elderly climbers, designing therapeutic sensory-motor route progressions.
            </p>
          </div>
        </motion.div>

        {/* CARD 2: climbing-ai Project Card with Interactive Route Visualizer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col rounded-2xl bg-[#111827] border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 p-6 sm:p-7 relative overflow-visible group shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-signal via-orange-400 to-transparent rounded-t-2xl" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-cyan-signal font-semibold tracking-wider uppercase">
              R&amp;D PROJECT // ML &amp; KINEMATICS
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]">
              V1.2 REINFORCEMENT LEARNING
            </div>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mb-2 pb-1">
            climbing-ai Engine
          </h3>
          <p className="font-space text-xs text-slate-300 mb-4 leading-relaxed">
            Autonomous bouldering route synthesis and robotic biomechanical beta verification using inverse kinematics.
          </p>

          {/* Interactive Climbing Wall Coordinate Visualizer (SVG) */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-800 mb-5 bg-[#0B0F19] p-2">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              {/* Climbing wall grid background */}
              <defs>
                <pattern id="wallgrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1E293B" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#wallgrid)" />

              {/* Connecting Beta Trajectory Line */}
              <polyline
                points="28,78 38,62 55,44 70,28 58,14"
                stroke="#F97316"
                strokeWidth="2"
                strokeDasharray="3 2"
                strokeOpacity="0.8"
              />

              {/* Stickman Kinematics Visualization at Selected Hold */}
              {(() => {
                const h = ROUTE_HOLDS[selectedHoldIndex];
                return (
                  <g key="stickman" className="transition-all duration-300">
                    {/* Head */}
                    <circle cx={h.x - 3} cy={h.y - 8} r="2.5" fill="#F8FAFC" />
                    {/* Spine */}
                    <line x1={h.x - 3} y1={h.y - 5.5} x2={h.x - 5} y2={h.y + 6} stroke="#F8FAFC" strokeWidth="1.2" />
                    {/* Reach Arm to Hold */}
                    <line x1={h.x - 3} y1={h.y - 3} x2={h.x} y2={h.y} stroke="#38BDF8" strokeWidth="1.5" />
                    {/* Foot Leg */}
                    <line x1={h.x - 5} y1={h.y + 6} x2={h.x - 10} y2={h.y + 16} stroke="#94A3B8" strokeWidth="1.2" />
                  </g>
                );
              })()}

              {/* Hold Nodes */}
              {ROUTE_HOLDS.map((hold, idx) => {
                const isSelected = idx === selectedHoldIndex;
                return (
                  <g 
                    key={hold.id} 
                    onClick={() => setSelectedHoldIndex(idx)}
                    className="cursor-pointer"
                  >
                    <circle 
                      cx={hold.x} 
                      cy={hold.y} 
                      r={isSelected ? "5" : "3.5"} 
                      fill={hold.color}
                      stroke={isSelected ? "#FFFFFF" : "#0B0F19"}
                      strokeWidth="1.5"
                    />
                    <text 
                      x={hold.x + 6} 
                      y={hold.y + 2} 
                      fill="#94A3B8" 
                      fontSize="5" 
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {hold.grade}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hold Inspector HUD Tag */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono">
              <span className="text-slate-300">
                ACTIVE HOLD: {ROUTE_HOLDS[selectedHoldIndex].type}
              </span>
              <span className="text-orange-400 font-bold">
                GRADE: {ROUTE_HOLDS[selectedHoldIndex].grade}
              </span>
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-3 mb-5">
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
              <span className="font-mono text-xs text-orange-400 font-bold">RL</span>
              <div>
                <h4 className="font-space text-xs font-semibold text-slate-200">Reinforcement Learning Route Generator</h4>
                <p className="font-space text-xs text-slate-400 leading-relaxed mt-0.5">
                  Synthesizes bouldering problems adhering to grip tension constraints and lateral movement momentum.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
              <span className="font-mono text-xs text-cyan-signal font-bold">IK</span>
              <div>
                <h4 className="font-space text-xs font-semibold text-slate-200">Inverse Kinematics Stickman Beta</h4>
                <p className="font-space text-xs text-slate-400 leading-relaxed mt-0.5">
                  Simulates skeletal reach, center-of-gravity balance, and dynamic torque requirements across moves.
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-auto pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
            {['PyTorch', 'OpenCV', 'Three.js IK', 'FastAPI', 'NumPy'].map((tech) => (
              <span key={tech} className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CARD 3: HKUST Sport Climbing Society Platform Card with Real Screenshots */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col rounded-2xl bg-[#111827] border border-slate-800 hover:border-emerald-500/40 transition-all duration-200 p-6 sm:p-7 relative overflow-visible group shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-signal via-orange-400 to-transparent rounded-t-2xl" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-green-signal font-semibold tracking-wider uppercase">
              LEADERSHIP &amp; FULL-STACK
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-950/40 border border-green-500/20 text-green-300 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE DEPLOYMENT
            </div>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl font-bold text-slate-100 mb-1 pb-1">
            HKUST Sport Climbing Society
          </h3>
          <div className="font-space text-xs text-orange-400 font-semibold mb-4">
            Team Captain &amp; Vice President (2024–2025)
          </div>

          {/* Real App Screenshot Showcase */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-800 mb-5 bg-slate-950">
            <img 
              src="/images/projects/climbing-app-route.png" 
              alt="HKUST Climbing Society Mobile Route View"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-green-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
              Live Society App // Interactive Route Canvas
            </div>
          </div>

          {/* Club Impact Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="font-syne text-2xl font-bold text-slate-100">200+</div>
              <div className="font-space text-xs text-slate-400 mt-0.5">Active Members</div>
              <div className="font-mono text-[10px] text-green-signal mt-1">↑ +25% under leadership</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="font-syne text-2xl font-bold text-slate-100">5</div>
              <div className="font-space text-xs text-slate-400 mt-0.5">Corporate Sponsors</div>
              <div className="font-mono text-[10px] text-orange-400 mt-1">Black Diamond, Scarpa</div>
            </div>
          </div>

          {/* Edge AI Chatbot & Next.js 15 Platform */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 mb-5">
            <div className="font-mono text-[11px] text-slate-200 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Next.js 15 + AWS EC2 Local Chatbot</span>
            </div>
            <p className="font-space text-xs text-slate-400 leading-relaxed">
              Self-hosted local Qwen 0.5B model via Ollama on AWS EC2, delivering 24/7 route beta and gear answers with zero external API fees.
            </p>
          </div>

          {/* Live Link Button */}
          <div className="mt-auto pt-4 border-t border-slate-800">
            <a 
              href="https://hkustclimbingsociety.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500/50 text-orange-300 hover:text-orange-200 transition-all duration-200 font-mono text-xs group/btn"
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
        </motion.div>

      </div>

      {/* Bottom Technical Footnote / Watermark */}
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
        <div>
          LATERAL DISPLACEMENT OPTIMIZATION // ALGORITHMIC BETA VERIFICATION
        </div>
        <div className="flex items-center gap-4">
          <span>COORDINATES: 22.3375° N, 114.2630° E (HKUST WALL)</span>
          <span className="text-slate-600">|</span>
          <span className="text-orange-400 font-semibold">SPEED / ICE / BOULDER</span>
        </div>
      </div>
    </section>
  );
};

export default ClimbingTechSection;
