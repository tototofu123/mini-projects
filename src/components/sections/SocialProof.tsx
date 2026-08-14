'use client';

import { motion } from 'framer-motion';

const LOGOS = [
    "Equinox", "Whole Foods", "Hypebeast", "Vogue", "GQ", "WebMD", "Goop", "Erewhon"
];

const REVIEWS = [
    { text: "My gut feels like it got a software update.", author: "@bio_hacker" },
    { text: "Legacy soda is officially uninstalled.", author: "@lemon_drops" },
    { text: "The first soda that actually works for me.", author: "@wellness_warrior" },
    { text: "Finally, a soda with a brain.", author: "@tech_enthusiast" }
];

export function SocialProof() {
    const playPopHiss = () => {
        // Sound implementation placeholder
        console.log("Pop-Hiss sound play");
    };

    return (
        <section className="relative py-24 bg-white overflow-hidden select-none">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-peach)_0%,_transparent_70%)]" />
            </div>

            <div className="space-y-12">
                {/* Top Marquee: Brand Logos */}
                <div className="flex overflow-hidden group">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex gap-24 whitespace-nowrap px-12 items-center"
                    >
                        {[...LOGOS, ...LOGOS].map((logo, i) => (
                            <span key={i} className="text-4xl md:text-6xl font-serif text-chrome uppercase tracking-tighter hover:text-bio-blue transition-colors cursor-default">
                                {logo}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Marquee: Reviews in Pill Shapes */}
                <div className="flex overflow-hidden">
                    <motion.div
                        animate={{ x: [-1000, 0] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex gap-8 whitespace-nowrap px-12"
                    >
                        {[...REVIEWS, ...REVIEWS].map((review, i) => (
                            <div
                                key={i}
                                onMouseEnter={playPopHiss}
                                className="bg-chrome/10 backdrop-blur-xl border border-bio-blue/5 p-8 px-12 rounded-full flex flex-col items-center justify-center gap-2 hover:bg-peach/20 transition-all cursor-crosshair"
                            >
                                <p className="text-xl md:text-2xl text-bio-blue font-serif italic">"{review.text}"</p>
                                <span className="text-xs font-mono text-bio-blue/40 uppercase tracking-widest">{review.author}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
