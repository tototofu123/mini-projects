'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanScene } from '../canvas/CanScene';
import { cn } from '@/lib/utils';

const FLAVORS = [
    {
        id: 'citrus',
        name: 'Sun-Kissed Citrus',
        color: 'bg-lemon',
        gradient: 'from-[#FFF700] to-[#FFDAB9]',
        profile: { fizz: 90, sweetness: 20, zest: 85 },
        strain: 'Micro-encapsulated Probiotics',
        source: 'Sicily (Blood Orange)'
    },
    {
        id: 'banana',
        name: 'Nano Banana',
        color: 'bg-[#FFE135]',
        gradient: 'from-[#FFE135] to-[#E0E0E0]',
        profile: { fizz: 75, sweetness: 40, zest: 30 },
        strain: 'B. Lactis Nano-Strain',
        source: 'Equatorial Highland'
    },
    {
        id: 'berry',
        name: 'Digital Berry',
        color: 'bg-raspberry',
        gradient: 'from-[#FF007F] to-[#002FA7]',
        profile: { fizz: 85, sweetness: 35, zest: 60 },
        strain: 'L. Rhamnosus Digitalis',
        source: 'Himalayan Ridge'
    }
];

export function FlavorLab() {
    const [activeFlavor, setActiveFlavor] = useState(FLAVORS[0]);

    return (
        <section className={cn(
            "relative min-h-screen w-full transition-colors duration-1000 ease-in-out p-12 flex flex-col items-center justify-center overflow-hidden",
            activeFlavor.id === 'citrus' ? "bg-[#FFF9EA]" :
                activeFlavor.id === 'banana' ? "bg-[#FEFCE8]" : "bg-[#FDF2F8]"
        )}>
            <motion.div
                key={activeFlavor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                className={cn("absolute inset-0 bg-gradient-to-tr", activeFlavor.gradient)}
            />

            <div className="relative z-10 w-full max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Flavor Selection */}
                    <div className="flex flex-col gap-6 order-2 md:order-1">
                        <h2 className="text-6xl md:text-8xl text-bio-blue font-serif mb-8">BOTANICAL<br />ENGINEERING</h2>
                        {FLAVORS.map((flavor) => (
                            <button
                                key={flavor.id}
                                onMouseEnter={() => setActiveFlavor(flavor)}
                                onClick={() => setActiveFlavor(flavor)}
                                className={cn(
                                    "text-4xl md:text-6xl text-left transition-all duration-300 font-serif uppercase",
                                    activeFlavor.id === flavor.id ? "text-bio-blue translate-x-4 scale-105" : "text-bio-blue/20 hover:text-bio-blue/40"
                                )}
                            >
                                {flavor.name}
                            </button>
                        ))}
                    </div>

                    {/* 3D Can View */}
                    <div className="w-full h-[500px] md:h-[700px] order-1 md:order-2 cursor-grab active:cursor-grabbing">
                        <CanScene flavor={activeFlavor.id} />
                    </div>

                    {/* Flavor Info Card */}
                    <div className="w-full max-w-sm order-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFlavor.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="bg-white/40 backdrop-blur-3xl p-8 border border-white/60 rounded-[32px] shadow-2xl text-bio-blue"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">[SOURCE]</p>
                                        <p className="font-mono text-sm font-bold">{activeFlavor.source}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">[TECH]</p>
                                        <p className="font-mono text-sm font-bold">{activeFlavor.strain}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest mb-2">[RADAR_PROFILE]</p>
                                    {Object.entries(activeFlavor.profile).map(([key, value]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="flex justify-between text-[10px] uppercase font-mono font-bold">
                                                <span>{key}</span>
                                                <span>{value}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-bio-blue/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${value}%` }}
                                                    className="h-full bg-bio-blue"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
