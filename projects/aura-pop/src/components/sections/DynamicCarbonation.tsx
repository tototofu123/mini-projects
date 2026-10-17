'use client';

import { useEffect, useRef } from 'react';

export function DynamicCarbonation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        const particleCount = 100;

        class Particle {
            x: number;
            y: number;
            size: number;
            speed: number;
            opacity: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || 0);
                this.y = (canvas?.height || 0) + Math.random() * 100;
                this.size = Math.random() * 2 + 1;
                this.speed = Math.random() * 1 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.y -= this.speed;
                if (this.y < -10) {
                    this.y = (canvas?.height || 0) + 10;
                    this.x = Math.random() * (canvas?.width || 0);
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(223, 255, 0, ${this.opacity})`;
                ctx.fill();

                // Subtle glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(223, 255, 0, 0.5)';
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        init();
        animate();

        return () => window.removeEventListener('resize', init);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
        />
    );
}
