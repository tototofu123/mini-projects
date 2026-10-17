'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const PATHOGENS = [
    { id: 1, name: 'ARTIFICIAL DYE', icon: '🎨' },
    { id: 2, name: 'CORN SYRUP', icon: '🌽' },
    { id: 3, name: 'SUGAR ERROR', icon: '💾' },
];

export function GutCheck() {
    const [cleared, setCleared] = useState<number[]>([]);
    const [pulse, setPulse] = useState(false);

    const handleClear = (id: number) => {
        if (cleared.includes(id)) return;
        setCleared([...cleared, id]);
        if (cleared.length + 1 === PATHOGENS.length) {
            setPulse(true);
            setTimeout(() => setPulse(false), 2000);
        }
    };

    return (
        <section className="relative min-h-screen w-full bg-[#fdfdfd] py-24 flex flex-col items-center justify-center overflow-hidden">

            {/* Background Brain Fog */}
            <motion.div
                animate={{
                    opacity: pulse ? 0 : 0.4,
                    scale: pulse ? 1.5 : 1
                }}
                className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-chrome to-transparent pointer-events-none blur-3xl"
            />

            {/* Sonic Pulse Effect */}
            <AnimatePresence>
                {pulse && (
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                        <div className="w-96 h-96 rounded-full border-[10px] border-lemon" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 text-center space-y-8 px-4">
                <h2 className="text-6xl md:text-8xl text-bio-blue font-serif uppercase">THE DETOX SWIPE</h2>
                <p className="max-w-xl mx-auto font-mono text-bio-blue/60 uppercase tracking-widest text-sm">
                    Uninstall legacy toxins. Drag and drop to clear the system fog.
                </p>

                <div className="flex flex-wrap justify-center gap-8 mt-12">
                    {PATHOGENS.map((p) => (
                        <motion.div
                            key={p.id}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            onDragEnd={() => handleClear(p.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "w-40 h-40 bg-white shadow-2xl rounded-[32px] border border-bio-blue/5 flex flex-col items-center justify-center p-6 cursor-grab active:cursor-grabbing transition-opacity duration-500",
                                cleared.includes(p.id) ? "opacity-0 scale-0 pointer-events-none" : "opacity-100"
                            )}
                        >
                            <span className="text-5xl mb-4">{p.icon}</span>
                            <span className="text-[10px] font-mono text-bio-blue font-bold text-center tracking-tighter">{p.name}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Success Reveal */}
                <AnimatePresence>
                    {cleared.length === PATHOGENS.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-16 p-12 bg-lemon/10 backdrop-blur-3xl border border-lemon/40 rounded-[48px] max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white opacity-20" />
                            <h3 className="text-4xl font-serif text-bio-blue mb-4">SYSTEM OPTIMIZED</h3>
                            <p className="font-mono text-bio-blue/60 mb-8 uppercase tracking-widest">Your cloud is cleared. Reward detected:</p>

                            <div className="text-5xl md:text-7xl font-serif text-bio-blue tracking-tighter mb-8">
                                POP_15_OFF
                            </div>

                            <button
                                onClick={() => setCleared([])}
                                className="px-8 py-3 bg-bio-blue text-white font-mono text-xs rounded-full hover:bg-lemon hover:text-bio-blue transition-colors uppercase tracking-[0.3em]"
                            >
                                Re-Calibrate System
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
