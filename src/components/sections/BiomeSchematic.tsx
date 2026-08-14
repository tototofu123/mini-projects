'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const DATA_POINTS = [
    { id: 1, label: "FIBER_INPUT", value: "5g", top: "20%", left: "60%" },
    { id: 2, label: "GLYCEMIC_INDEX", value: "0", top: "45%", left: "35%" },
    { id: 3, label: "MOOD_CALIBRATION", value: "OPTIMAL", top: "70%", left: "65%" },
];

export function BiomeSchematic() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    return (
        <section ref={containerRef} className="relative min-h-[150vh] w-full bg-white py-24 px-12 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                <div className="space-y-8 z-10">
                    <h2 className="text-6xl md:text-8xl text-bio-blue font-serif">THE BIOME<br />DASHBOARD</h2>
                    <p className="text-xl text-bio-blue opacity-60 max-w-md font-mono uppercase tracking-widest leading-relaxed">
                        Your body as a sophisticated machine. Pop Culture is the solar-powered upgrade for your internal operating system.
                    </p>

                    <div className="grid grid-cols-1 gap-4 pt-8">
                        {["PRECISE REFRESHMENT", "DIGITAL BOTANY", "SYSTEM CALIBRATION"].map((item) => (
                            <div key={item} className="flex items-center gap-4 text-bio-blue/40 font-mono text-sm tracking-[0.3em]">
                                <div className="w-2 h-2 rounded-full bg-lemon animate-pulse" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-[800px] w-full flex items-center justify-center">
                    {/* Softer Torso Illustration Placeholder using SVG */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 400 600" className="w-full h-full text-chrome opacity-20">
                            <path d="M200,50 Q280,50 320,150 Q350,250 320,450 Q280,550 200,550 Q120,550 80,450 Q50,250 80,150 Q120,50 200,50" fill="currentColor" />
                            <path d="M150,50 L250,50 L230,120 L170,120 Z" fill="currentColor" opacity="0.5" />
                        </svg>

                        {/* Animated Liquid Path */}
                        <svg viewBox="0 0 400 600" className="absolute inset-0 w-full h-full pointer-events-none">
                            <motion.path
                                d="M200,80 C200,150 200,200 200,300 C200,400 150,450 200,500"
                                fill="transparent"
                                stroke="#FFF700"
                                strokeWidth="8"
                                strokeLinecap="round"
                                style={{ pathLength }}
                            />
                            {/* Glowing particles following the path */}
                            <motion.circle
                                r="6"
                                fill="#FFF700"
                                style={{
                                    offsetPath: "path('M200,80 C200,150 200,200 200,300 C200,400 150,450 200,500')",
                                    offsetDistance: useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])
                                }}
                                className="blur-sm"
                            />
                        </svg>

                        {/* Data Points / UI Tags */}
                        {DATA_POINTS.map((point) => (
                            <motion.div
                                key={point.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="absolute bg-white/80 backdrop-blur-xl border border-bio-blue/10 p-4 rounded-2xl shadow-xl flex flex-col gap-1 min-w-[150px]"
                                style={{ top: point.top, left: point.left }}
                            >
                                <span className="text-[10px] font-mono text-bio-blue/40 uppercase tracking-widest">[{point.label}]</span>
                                <span className="text-xl font-serif text-bio-blue">{point.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
