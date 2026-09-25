import React from 'react';

interface SectionBridgeProps {
  variant: 'hero-to-ai' | 'ai-to-robotics' | 'robotics-to-climbing' | 'climbing-to-lab' | 'lab-to-footer';
  fromLabel: string;
  toLabel: string;
  codeSnippet?: string;
}

export const SectionBridge: React.FC<SectionBridgeProps> = ({
  variant,
  fromLabel,
  toLabel,
  codeSnippet
}) => {
  return (
    <div className="relative w-full py-12 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#0B0F19] select-none pointer-events-none">
      {/* Background ambient gradient pulse */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div 
          className="w-full h-[1px]"
          style={{
            background: variant === 'hero-to-ai'
              ? 'linear-gradient(90deg, transparent, #F97316 20%, #38BDF8 80%, transparent)'
              : variant === 'ai-to-robotics'
              ? 'linear-gradient(90deg, transparent, #38BDF8 20%, #4ADE80 80%, transparent)'
              : variant === 'robotics-to-climbing'
              ? 'linear-gradient(90deg, transparent, #4ADE80 20%, #F97316 80%, transparent)'
              : variant === 'climbing-to-lab'
              ? 'linear-gradient(90deg, transparent, #F97316 20%, #FCD34D 80%, transparent)'
              : 'linear-gradient(90deg, transparent, #FCD34D 20%, #38BDF8 80%, transparent)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 relative z-10">
        {/* Left handoff indicator */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <span className="text-slate-400 font-semibold uppercase tracking-wider">{fromLabel}</span>
          <span className="text-slate-600">─────►</span>
          <span className="text-slate-300 font-semibold uppercase tracking-wider">{toLabel}</span>
        </div>

        {/* Center telemetry graphic */}
        <div className="flex items-center gap-4">
          <svg className="w-32 h-6 text-slate-700" viewBox="0 0 128 24" fill="none">
            <path 
              d="M0 12h32l8-8 8 16 8-16 8 8h64" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeDasharray="4 2"
            />
            <circle cx="48" cy="4" r="2" fill="#38BDF8" className="animate-pulse" />
            <circle cx="56" cy="20" r="2" fill="#F97316" className="animate-pulse" />
          </svg>

          {codeSnippet && (
            <span className="hidden md:inline-block px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
              {codeSnippet}
            </span>
          )}
        </div>

        {/* Right status beacon */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] text-slate-400">TELEMETRY_LINK // ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default SectionBridge;
