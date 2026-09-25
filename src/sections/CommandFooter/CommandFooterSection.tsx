import React, { useState } from 'react';

interface TelemetryItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  status: 'ONLINE' | 'ACTIVE' | 'STANDBY';
}

export const CommandFooterSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'tototofu0601@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for non-https or unsupported environments
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const telemetryData: TelemetryItem[] = [
    {
      id: '01',
      label: 'IDENTITY',
      value: 'Lai Man To (Toto) // t.tofu',
      detail: "HKUST CPEG & AI '27",
      status: 'ONLINE',
    },
    {
      id: '02',
      label: 'LOCATION',
      value: 'Hong Kong SAR',
      detail: 'Open to Relocation & Remote',
      status: 'ONLINE',
    },
    {
      id: '03',
      label: 'CURRENT ROLE',
      value: 'Engineer Intern @ HKT',
      detail: 'PCCW Group // Systems & Automation',
      status: 'ACTIVE',
    },
    {
      id: '04',
      label: 'ATHLETICS',
      value: 'HK National Climbing Team',
      detail: 'Speed & Ice Climbing // Elite Division',
      status: 'ACTIVE',
    },
  ];

  const quickLinks = [
    {
      name: 'Email Direct',
      url: `mailto:${email}`,
      primary: true,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'GitHub Profile',
      url: 'https://github.com/tototofu123',
      primary: false,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lai-man-to',
      primary: false,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Central Repos',
      url: 'https://repo.lai.codes',
      primary: false,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: 'Blog',
      url: 'https://blog.lai.codes',
      primary: false,
      icon: (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full py-20 px-6 sm:px-10 lg:px-16 border-t border-slate-800 bg-[#080C14] text-slate-300 overflow-hidden font-space"
    >
      {/* Background Decorative Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Section Header / Transmission Box */}
        <div className="border border-slate-800 bg-[#111827]/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl relative overflow-hidden shadow-2xl">
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500 opacity-80" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-orange-400 font-semibold">
                [ 05 // SYSTEM TRANSMISSION &amp; DISPATCH ]
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TRANSCEIVER READY</span>
              <span className="text-slate-700">|</span>
              <span>PORT: 443_SSL</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Ready for High-Pressure Systems Engineering
            </h2>
            <p className="font-space text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
              Open to 2026/2027 Software Engineering, AI Systems, and Robotics roles.
            </p>
          </div>
        </div>

        {/* Direct Transmission Panel */}
        <div className="border border-slate-800 bg-[#111827] rounded-xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left: Email display and Copy Button */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Direct Dispatch Endpoint</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-xl sm:text-2xl md:text-3xl text-slate-100 font-bold tracking-tight bg-[#0B0F19] px-4 py-2.5 rounded-lg border border-slate-800 select-all shadow-inner">
                  {email}
                </span>

                <button
                  onClick={handleCopy}
                  type="button"
                  aria-label="Copy email address"
                  className="relative group inline-flex items-center px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 hover:border-slate-600 text-slate-200 text-sm font-mono transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-emerald-400 font-semibold">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-200 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={`inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                    link.primary
                      ? 'bg-orange-500 hover:bg-orange-600 text-slate-950 font-semibold shadow-orange-500/20'
                      : 'bg-[#1E293B]/70 hover:bg-[#1E293B] border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* System Status Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full inline-block" />
              SYSTEM TELEMETRY &amp; OPERATIONAL STATUS
            </h3>
            <span className="font-mono text-xs text-slate-600">SYS_V2.6 // HK_STATION</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {telemetryData.map((item) => (
              <div
                key={item.id}
                className="border border-slate-800 bg-[#111827]/60 hover:bg-[#111827] hover:border-slate-700 rounded-xl p-5 transition-all duration-200 space-y-2 group"
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-500 font-semibold">
                    {item.id} // {item.label}
                  </span>
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'ONLINE'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                        : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/50'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                  {item.value}
                </div>
                <div className="text-xs text-slate-400 leading-normal">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>&copy; 2026 Lai Man To. All systems operational. Zero-lag architecture.</span>
          </div>
          <div>
            <span>Built with React, TypeScript, and Tailwind CSS.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CommandFooterSection;
