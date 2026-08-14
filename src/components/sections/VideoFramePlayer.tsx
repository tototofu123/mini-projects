'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoFramePlayerProps {
    frameCount: number;
    framePath: string;
    className?: string;
}

export function VideoFramePlayer({ frameCount, framePath, className }: VideoFramePlayerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [revealProgress, setRevealProgress] = useState(0); // 0 = blurry, 1 = clear
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `${framePath}/ezgif-frame-${frameNum}.webp`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [frameCount, framePath]);

    // Handle animation loop
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        let animationFrameId: number;
        const animate = () => {
            setCurrentFrame((prev) => (prev + 1) % frameCount);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isLoaded, images.length, frameCount]);

    // Handle canvas drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || images.length === 0) return;

        const img = images[currentFrame];
        if (!img) return;

        // Cover object-fit style drawing
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const x = (canvasWidth / 2) - (imgWidth / 2) * ratio;
        const y = (canvasHeight / 2) - (imgHeight / 2) * ratio;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, imgWidth * ratio, imgHeight * ratio);
    }, [currentFrame, images, isLoaded]);

    // Setup Resize Observer
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Handle mouse movement for reveal
    useEffect(() => {
        const handleMouseMove = () => {
            setRevealProgress(1);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setRevealProgress(0);
            }, 2000); // Re-blur after 2 seconds of inactivity
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={cn("fixed inset-0 z-0", className)}>
            <canvas
                ref={canvasRef}
                className={cn(
                    "w-full h-full transition-all duration-300 ease-out",
                )}
                style={{
                    filter: `blur(${(1 - revealProgress) * 8}px)`,
                    scale: 1 + (1 - revealProgress) * 0.02,
                }}
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-midnight text-yuzu font-mono lowercase tracking-widest">
                    [loading_biome_visuals...]
                </div>
            )}
        </div>
    );
}
