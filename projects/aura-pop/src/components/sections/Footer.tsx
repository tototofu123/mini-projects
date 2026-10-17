'use client';

import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="relative w-full bg-sunset overflow-hidden pt-24 pb-8">
            {/* Liquid Simulation Effect Placeholder */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-peach)_0%,_transparent_70%)]"
                />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center gap-24">

                {/* Massive Ticker CTA */}
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full relative py-12 bg-white flex items-center overflow-hidden border-y border-bio-blue/10 group overflow-hidden"
                    whileHover={{ height: "200px" }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                >
                    <motion.div
                        animate={{ x: [0, -2000] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex gap-24 whitespace-nowrap px-12"
                    >
                        {[1, 2, 3, 4, 5].map((i) => (
                            <span key={i} className="text-7xl md:text-9xl font-serif text-bio-blue uppercase tracking-tighter group-hover:scale-110 transition-transform">
                                INITIATE SUBSCRIPTION
                            </span>
                        ))}
                    </motion.div>

                    {/* Ticker Tape Overlay on Hover */}
                    <div className="absolute inset-0 bg-lemon opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                        <motion.div
                            animate={{ x: [-2000, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="flex gap-12 whitespace-nowrap px-12"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <span key={i} className="text-4xl md:text-5xl font-mono text-bio-blue uppercase font-bold tracking-[0.5em]">
                                    [ SYSTEM OPTIMIZED ] • [ 15% OFF ] • [ FIBER LOADED ] • [ NANOBOTANICALS ]
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </motion.button>

                {/* Links & Status */}
                <div className="w-full max-w-7xl px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white">
                    <div className="space-y-4">
                        <h4 className="text-2xl font-serif">PHASES</h4>
                        <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
                            <a href="#hero" className="hover:text-lemon transition-colors">THE_HERO</a>
                            <a href="#os-update" className="hover:text-lemon transition-colors">OS_UPDATE</a>
                            <a href="#flavor-lab" className="hover:text-lemon transition-colors">FLAVOR_LAB</a>
                            <a href="#biome-dash" className="hover:text-lemon transition-colors">BIOME_DASH</a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-2xl font-serif">CONNECT</h4>
                        <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest opacity-60">
                            <a href="#network" className="hover:text-lemon transition-colors">INTEL_FEED</a>
                            <a href="#detox-swipe" className="hover:text-lemon transition-colors">SYSTEM_UPDATES</a>
                            <a href="#network" className="hover:text-lemon transition-colors">NETWORK</a>
                        </div>
                    </div>

                    <div className="lg:col-start-4 space-y-4 text-right flex flex-col items-end">
                        <div className="p-4 border border-white/20 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-lemon animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-tighter">BATCH_STATUS: BREWING</span>
                        </div>
                        <p className="font-mono text-[10px] opacity-40 uppercase">© 2026 POP CULTURE. ALL SYSTEMS GO.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
