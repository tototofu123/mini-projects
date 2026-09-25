import { useState, useRef, type FC } from 'react';

export const PhysicalSystemsSection: FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <section
      id="robotics"
      className="relative w-full py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 bg-[#0B0F19] telemetry-grid"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider uppercase mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>[ 02 // HARDWARE, SENSORS & REAL-TIME SYSTEMS ]</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight">
              Physical Computing & Combat Robotics
            </h2>
            <p className="font-space text-slate-400 max-w-2xl text-base sm:text-lg mt-3 leading-relaxed">
              Embedded C++, real-time state machines, and hardware stress-tested under competition pressure.
            </p>
          </div>

          {/* Telemetry Status Pill */}
          <div className="hidden md:flex flex-col items-end font-mono text-xs text-slate-500 space-y-1 bg-surface-card/60 px-4 py-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">CLK:</span>
              <span className="text-emerald-400">16MHz / 72MHz ARMED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">BUS:</span>
              <span className="text-cyan-signal">I2C / SPI / BLE 4.2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">STATUS:</span>
              <span className="text-emerald-400 font-semibold">ALL NODES ONLINE</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 1 (FEATURE CARD): All-in-One Combat Bot                   */}
        {/* ============================================================== */}
        <div className="mt-12 rounded-2xl bg-surface-card border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden spotlight-surface gpu-layer">
          {/* Top Banner Bar */}
          <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-surface-card px-6 py-3 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold tracking-wide">
              {/* Trophy Icon */}
              <svg
                className="w-4 h-4 text-emerald-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              <span>1ST PLACE CHAMPION (20+ TEAMS) // BEST TECHNICAL PRESENTATION AWARD</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>COMPETITION VERIFIED</span>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Video Preview (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <div
                className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 group cursor-pointer aspect-video shadow-2xl"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={togglePlay}
              >
                {/* Real Video Element */}
                <video
                  ref={videoRef}
                  src="/images/projects/robot-car.mp4"
                  poster="/images/projects/robot-car.jpeg"
                  preload="none"
                  muted
                  loop
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Cyber HUD Corner Elements */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur border border-slate-700/80 px-2.5 py-1 rounded font-mono text-[11px] text-slate-300">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  <span>{isPlaying ? 'REC ● LIVE' : 'FEED READY'}</span>
                </div>

                <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur border border-slate-700/80 px-2.5 py-1 rounded font-mono text-[11px] text-emerald-400">
                  <span>DEV: ATMEGA328P</span>
                </div>

                {/* Center Play/Pause Trigger HUD */}
                <div
                  className={`absolute inset-0 z-10 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 p-4 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 shadow-2xl transform transition-transform group-hover:scale-110">
                    {isPlaying ? (
                      // Pause Icon
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      // Play Icon
                      <svg
                        className="w-8 h-8 translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Bottom Overlay Info Bar */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/85 backdrop-blur px-3 py-1.5 rounded border border-slate-800">
                  <span>TELEMETRY: DUAL MOTOR H-BRIDGE</span>
                  <span className="text-emerald-400">
                    {isPlaying ? 'PLAYING [CLICK TO PAUSE]' : 'HOVER OR CLICK TO PLAY'}
                  </span>
                </div>

                {/* Video Error Fallback Warning */}
                {videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 p-4 text-center">
                    <p className="font-mono text-xs text-amber">
                      [POSTER FALLBACK ACTIVE // VIDEO CODEC NOT SUPPORTED ON THIS BROWSER]
                    </p>
                  </div>
                )}
              </div>

              {/* Hardware caption */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-500 px-1">
                <span>ACTUAL ROBOT CHASSIS DEMO</span>
                <span>LATENCY: &lt;15ms VIA BLE</span>
              </div>
            </div>

            {/* Right Column: Project Context & Specs (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-orange-accent uppercase tracking-wider mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>Featured Flagship Machine</span>
                </div>

                <h3 className="font-syne text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                  All-in-One Combat Bot
                </h3>

                <p className="font-space text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                  Led a 4-person engineering team through full design-to-deployment of a combat robot. Custom BLE mobile controller app, embedded C++ state-machine combat logic, high-torque chassis.
                </p>

                {/* Highlighted Engineering Details */}
                <div className="mt-5 space-y-2.5 text-xs font-dm text-slate-400 border-l-2 border-slate-800 pl-4">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold mt-0.5">▸</span>
                    <span>
                      <strong className="text-slate-200">Real-Time State Machine:</strong> Non-blocking cycle managing combat stances, defensive spinning, and collision recovery.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold mt-0.5">▸</span>
                    <span>
                      <strong className="text-slate-200">Custom BLE Remote App:</strong> Zero-delay directional control packet stream with integrated telemetry feedback.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold mt-0.5">▸</span>
                    <span>
                      <strong className="text-slate-200">Power Delivery:</strong> High-discharge battery rail driving geared DC motors with instant braking via dual H-bridges.
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Specs Pills */}
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-3">
                  Technical Architecture & Components
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Arduino BLE Protocol',
                    'Embedded C++',
                    'State-Machine PvE/PvP',
                    'H-Bridge Motor Drivers',
                    'Custom Chassis',
                  ].map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded bg-slate-900 border border-slate-700/80 text-slate-300 font-mono text-xs hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARDS 2 & 3: STM32 WiFi Tank & Precision Line-Follower         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Card 2: STM32 WiFi Tank Wargame */}
          <div className="rounded-2xl bg-surface-card border border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between spotlight-surface gpu-layer">
            <div>
              {/* Card Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-signal">
                  {/* Microchip Icon */}
                  <svg
                    className="w-4 h-4 text-cyan-signal"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                  <span>[ ARM CORTEX-M // 72MHz ]</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">SYS_ID: TANK_WAR_01</span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-syne text-2xl font-bold text-slate-100 mt-5">
                STM32 WiFi Tank Wargame
              </h3>
              <p className="font-mono text-xs text-emerald-400 mt-1">
                ARM Cortex-M (STM32F103VET6) microcontroller + ESP8266 WiFi integration.
              </p>

              {/* Body Description */}
              <p className="font-space text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                Register-level firmware, real-time OLED HUD, AI-driven bot opponents, wireless PvE combat flow. Engineered bare-metal peripheral drivers avoiding heavy HAL bottlenecks to maximize execution speed during high-velocity tank engagements.
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 font-mono text-xs">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Core Engine</div>
                  <div className="text-slate-200 font-semibold mt-0.5">STM32F103VET6</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Telemetry Link</div>
                  <div className="text-cyan-signal font-semibold mt-0.5">ESP8266 WiFi (UART)</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Visual HUD</div>
                  <div className="text-slate-200 font-semibold mt-0.5">0.96&quot; I2C/SPI OLED</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Combat AI</div>
                  <div className="text-emerald-400 font-semibold mt-0.5">Finite State Machine</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
              {['STM32F103', 'ESP8266', 'Register-Level C', 'Real-Time HUD'].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-slate-900 border border-slate-700/80 text-slate-300 font-mono text-xs hover:border-cyan-signal/50 hover:text-cyan-signal transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Precision Line-Follower (Arduino) */}
          <div className="rounded-2xl bg-surface-card border border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between spotlight-surface gpu-layer">
            <div>
              {/* Card Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-amber">
                  {/* Gauge / Precision Target Icon */}
                  <svg
                    className="w-4 h-4 text-amber"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="12" x2="2" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="2" />
                    <line x1="12" y1="22" x2="12" y2="18" />
                  </svg>
                  <span>[ OPTICAL FEEDBACK // PID CONTROL ]</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                  TOP TIER PROJECT
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-syne text-2xl font-bold text-slate-100 mt-5">
                Precision Line-Follower (Arduino)
              </h3>
              <p className="font-mono text-xs text-emerald-400 mt-1">
                90% precision score, placing in the top tier of the project group.
              </p>

              {/* Body Description */}
              <p className="font-space text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                IR sensor array calibration, tuned PID-inspired control loops for obstacle negotiation. Built continuous error-correction equations balancing derivative damping with proportional response, eliminating wobble across high-speed track transitions.
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 font-mono text-xs">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Precision Rating</div>
                  <div className="text-emerald-400 font-bold mt-0.5">90% Verified Score</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Sensor Matrix</div>
                  <div className="text-slate-200 font-semibold mt-0.5">Analog IR Array</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Control Law</div>
                  <div className="text-amber font-semibold mt-0.5">Tuned PID Loop</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase">Dynamics</div>
                  <div className="text-slate-200 font-semibold mt-0.5">Obstacle Negotiation</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
              {['PID Control', 'IR Array', 'Embedded Firmware', '90% Precision'].map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-slate-900 border border-slate-700/80 text-slate-300 font-mono text-xs hover:border-amber/50 hover:text-amber transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
