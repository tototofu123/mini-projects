'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function ComparisonSlider() {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    return (
        <section className="relative h-screen w-full bg-white overflow-hidden select-none">
            <div
                ref={containerRef}
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                className="relative w-full h-full cursor-ew-resize"
            >
                {/* Left Side: The Past (Legacy Soda) */}
                <div className="absolute inset-0 grayscale brightness-75 bg-[#f0f0f0]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-20 z-10 text-bio-blue/40 text-center">
                        <h2 className="text-8xl md:text-9xl mb-4 font-serif">LEGACY SODA</h2>
                        <p className="font-mono text-xl uppercase tracking-[0.5em]">[High Sugar Error] • [Bloat Detected]</p>
                    </div>
                    <Image
                        src="/products/Whisk_5f39d5a0357c62fa13b4ada30f5863d8dr.webp"
                        alt="Legacy Soda"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>

                {/* Right Side: The Future (Pop Culture) */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-peach to-lemon"
                    style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-20 z-10 text-bio-blue text-center">
                        <h2 className="text-8xl md:text-9xl mb-4 font-serif">UNINSTALL SUGAR</h2>
                        <p className="font-mono text-xl uppercase tracking-[0.5em]">Download Fiber • System Optimized</p>
                        <div className="mt-12 p-8 border border-bio-blue/20 bg-white/40 backdrop-blur-2xl rounded-3xl">
                            <span className="text-4xl font-serif">OS VERSION: POP_CULTURE_1.0</span>
                        </div>
                    </div>
                    <Image
                        src="/products/Whisk_ceb13d88ab4638a9439432fefc8b1ccfdr.webp"
                        alt="Pop Culture"
                        fill
                        className="object-cover opacity-60"
                    />
                </div>

                {/* Slider Handle (Silver Ring) */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-white/50 z-20"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-chrome bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl">
                        <div className="w-8 h-8 rounded-full bg-bio-blue animate-pulse opacity-20" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full text-center z-30 pointer-events-none">
                <p className="text-bio-blue/40 font-mono text-xs uppercase tracking-[0.5em]">
                    Slide to Update your Operating System
                </p>
            </div>
        </section>
    );
}
