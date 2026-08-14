'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { VideoFramePlayer } from './VideoFramePlayer';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full items-start justify-center bg-white overflow-hidden">
            <VideoFramePlayer frameCount={128} framePath="/frames" className="opacity-80" />

            {/* Product Clarity refined via VideoFramePlayer */}

            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4">
                <motion.div
                    style={{ y: titleY, opacity }}
                    className="relative z-10 flex flex-col items-center text-center"
                >
                    <h1 className="text-7xl md:text-9xl lg:text-[10rem] leading-none text-bio-blue mb-4 font-serif drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                        CULTURE<br />YOUR GUT.
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-bio-blue font-mono uppercase tracking-widest backdrop-blur-md bg-white/40 p-4 border border-white/60 rounded-xl">
                        Pop Culture: The smart soda that updates your internal operating system.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 flex flex-col items-center gap-4"
                    >
                        <span className="text-bio-blue/50 font-mono text-xs animate-bounce uppercase tracking-[0.5em]">
                            Scroll to Sip
                        </span>
                        <div className="w-px h-24 bg-gradient-to-b from-bio-blue to-transparent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* 3D Can Placeholder - will be anchored in center on scroll */}
            <div className="absolute top-[100vh] left-0 w-full h-screen pointer-events-none">
                {/* Can will follow as user scrolls */}
            </div>
        </section>
    );
}
