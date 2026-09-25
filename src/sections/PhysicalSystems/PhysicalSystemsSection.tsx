import { useState, useRef, type FC } from 'react';
import { motion } from 'framer-motion';

export const PhysicalSystemsSection: FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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
      className="relative w-full py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/80 bg-[#0B0F19] telemetry-grid overflow-visible"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800/80 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider uppercase mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>[ 02 // HARDWARE, SENSORS &amp; REAL-TIME SYSTEMS ]</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight pb-1">
              Physical Computing &amp; Combat Robotics
            </h2>
            <p className="font-space text-slate-300 max-w-2xl text-base sm:text-lg mt-3 leading-relaxed">
              Embedded C++, real-time state machines, and hardware stress-tested under competition pressure.
            </p>
          </div>

          {/* Telemetry Status Pill */}
          <div className="hidden md:flex flex-col items-end font-mono text-xs text-slate-400 space-y-1 bg-[#111827] px-4 py-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">CLK:</span>
              <span className="text-emerald-400 font-bold">16MHz / 72MHz ARMED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">BUS:</span>
              <span className="text-cyan-signal">I2C / SPI / BLE 4.2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">STATUS:</span>
              <span className="text-emerald-400 font-semibold">ALL NODES ONLINE</span>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 1 (FEATURE CARD): All-in-One Combat Bot                   */}
        {/* ============================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 rounded-2xl bg-[#111827] border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-visible spotlight-surface gpu-layer"
        >
          {/* Top Banner Bar */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-[#111827] px-6 py-4 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold tracking-wide">
              <svg
                className="w-4 h-4 text-emerald-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>COMPETITION VERIFIED // HKUST</span>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive Video Preview (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                <div
                  className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 group cursor-pointer aspect-video shadow-2xl"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src="/images/projects/robot-car.mp4"
                    poster="/images/projects/robot-car.jpeg"
                    preload="none"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Scanline Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/80" />

                  {/* Play Button Indicator */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Top-Right HUD Stamp */}
                  <div className="absolute top-3 right-3 font-mono text-[10px] bg-slate-900/90 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded backdrop-blur-md">
                    {isPlaying ? 'LIVE STREAM // RUNNING' : 'HOVER TO STREAM FOOTAGE'}
                  </div>

                  {/* Bottom Video Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="bg-slate-900/85 px-2.5 py-1 rounded border border-slate-800">
                      MATCH FOOTAGE // ARENA DEPLOYMENT
                    </span>
                    <span className="text-slate-400 bg-slate-900/85 px-2 py-1 rounded border border-slate-800">
                      1080P // 60FPS CAPTURE
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
                  <span>TELEMETRY FEED: ARENA PVE ARENA</span>
                  <button onClick={togglePlay} className="text-emerald-400 hover:underline">
                    {isPlaying ? 'PAUSE FOOTAGE' : 'CLICK TO PLAY VIDEO'}
                  </button>
                </div>
              </div>

              {/* Right Column: Project Details & Metrics (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="font-syne text-2xl sm:text-3xl font-bold text-slate-100 pb-1">
                    All-in-One Combat Bot
                  </h3>
                  <p className="font-space text-slate-300 text-sm mt-2 leading-relaxed">
                    Led a 4-person engineering team through full mechanical design, embedded firmware architecture, and competition deployment. The robot features custom Arduino BLE wireless command, state-machine combat logic, and high-torque dual-drive mobility.
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Victory Tier</span>
                    <span className="font-syne text-xl font-bold text-emerald-400 mt-0.5 block">1st / 20+ Teams</span>
                    <span className="font-dm text-xs text-slate-400">Course-wide championship</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Award Distinction</span>
                    <span className="font-syne text-xl font-bold text-orange-400 mt-0.5 block">Architecture Win</span>
                    <span className="font-dm text-xs text-slate-400">Best technical presentation</span>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Engineered Defense:</span>
                  </div>
                  <p className="font-dm text-xs text-slate-300 leading-relaxed pl-3.5">
                    Separated 12V motor power rail with optocouplers and flyback diodes to eliminate inductive kickback that caused microcontroller resets during blade stalls.
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Arduino BLE', 'Embedded C++', 'State Machines', 'H-Bridge PWM', 'Custom Chassis'].map((spec) => (
                    <span key={spec} className="font-mono text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* ============================================================== */}
            {/* HARDWARE SCHEMATIC BLOCK DIAGRAM (REAL SVG) */}
            {/* ============================================================== */}
            <div className="rounded-xl border border-slate-800 bg-[#0B0F19] p-5 sm:p-6 shadow-inner">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-200 font-bold tracking-wide">
                    COMBAT BOT ELECTRONICS &amp; DRIVE SCHEMATIC
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">
                  ISOLATED RAIL ARCHITECTURE
                </span>
              </div>

              <div className="w-full overflow-x-auto pb-2">
                <div className="min-w-[700px] grid grid-cols-5 gap-3 items-center text-center py-2 font-mono text-xs">
                  
                  {/* Block 1 */}
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/90 text-left">
                    <div className="text-[10px] text-sky-400 uppercase font-semibold">User Interface</div>
                    <div className="font-syne font-bold text-slate-100 text-xs mt-1">Mobile Controller</div>
                    <div className="text-[10px] text-slate-400 mt-1">Custom BLE Protocol (20Hz)</div>
                  </div>

                  {/* Wire 1 */}
                  <div className="flex flex-col items-center justify-center text-slate-600">
                    <span className="text-[10px] text-sky-400">BLE 4.2</span>
                    <span>──────►</span>
                  </div>

                  {/* Block 2 */}
                  <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-left">
                    <div className="text-[10px] text-emerald-400 uppercase font-semibold">Controller MCU</div>
                    <div className="font-syne font-bold text-slate-100 text-xs mt-1">Arduino Nano BLE</div>
                    <div className="text-[10px] text-slate-400 mt-1">3.3V Logic Rail // State Machine</div>
                  </div>

                  {/* Wire 2 */}
                  <div className="flex flex-col items-center justify-center text-slate-600">
                    <span className="text-[10px] text-emerald-400">PWM / Opto</span>
                    <span>──────►</span>
                  </div>

                  {/* Block 3 */}
                  <div className="p-3.5 rounded-xl border border-orange-500/40 bg-orange-950/20 text-left">
                    <div className="text-[10px] text-orange-400 uppercase font-semibold">Power Actuation</div>
                    <div className="font-syne font-bold text-slate-100 text-xs mt-1">L298N Dual H-Bridge</div>
                    <div className="text-[10px] text-slate-400 mt-1">12V High-Torque Gearmotors</div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARDS 2 & 3: STM32 Wargame & Precision Line-Follower            */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 2: STM32 WiFi Tank Wargame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-[#111827] border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-wider">
                  ARM Cortex-M Embedded
                </span>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/60 text-sky-300">
                  Bare-Metal C
                </span>
              </div>

              <h3 className="font-syne text-2xl font-bold text-slate-100 pb-1">
                STM32 WiFi Tank Wargame
              </h3>

              <p className="font-space text-slate-300 text-sm leading-relaxed">
                Hardware-heavy PvE wargame powered by an <strong>STM32F103VET6</strong> microcontroller integrated with an <strong>ESP8266</strong> module for wireless commands. Features register-level firmware, real-time OLED HUD rendering, and AI-driven autonomous bot opponents.
              </p>

              {/* Hardware Register Telemetry */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                  <span>REGISTER MAP // RCC_APB2ENR</span>
                  <span className="text-emerald-400">72MHz SYSCLK</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">TIM1 PWM:</span>
                    <span className="text-sky-400 font-bold">Dual Track Steer</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">USART2 WiFi:</span>
                    <span className="text-emerald-400 font-bold">115200 Baud DMA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-5 border-t border-slate-800 mt-6">
              {['STM32F103', 'ESP8266', 'Register-Level C', 'OLED HUD', 'DMA UART'].map((tag) => (
                <span key={tag} className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Precision Line-Follower (Arduino) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-[#111827] border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Control Theory &amp; Robotics
                </span>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-green-signal">
                  90% Precision Score
                </span>
              </div>

              <h3 className="font-syne text-2xl font-bold text-slate-100 pb-1">
                Precision Line-Follower (Arduino)
              </h3>

              <p className="font-space text-slate-300 text-sm leading-relaxed">
                Autonomous robotic platform navigating obstacle-laden courses via a tuned <strong>IR reflectance sensor array</strong>. Implemented embedded firmware with <strong>PID-inspired feedback loops</strong> to dynamically modulate differential motor speeds and damp overshoot oscillations.
              </p>

              {/* Control Loop Metrics */}
              <div className="p-4 rounded-xl bg-[#0B0F19] border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                  <span>FEEDBACK LOOP CALIBRATION</span>
                  <span className="text-emerald-400">TOP TIER SCORE</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">Sampling Rate:</span>
                    <span className="text-emerald-400 font-bold">1,000 Hz Loop</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">Sensor Array:</span>
                    <span className="text-sky-400 font-bold">5x Analog IR</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-5 border-t border-slate-800 mt-6">
              {['PID Control', 'Analog IR Array', 'Embedded C++', 'Differential Drive', 'Anti-Overshoot'].map((tag) => (
                <span key={tag} className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default PhysicalSystemsSection;
