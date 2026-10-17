import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const ringPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
            }
        }

        const animate = () => {
            // Smoothly lerp the ring towards mouse
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
            
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
            }
            requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        const raf = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <>
            <style>{`
                /* Hide default cursor ONLY on the main canvas/interactive area */
                #root, canvas { cursor: none !important; }
                
                /* Keep default cursor for UI/Sidebar/Buttons */
                .leva-c-hSInS, button, input, select, .pointer-events-auto { 
                    cursor: default !important; 
                }
            `}</style>
            
            {/* The core light point - ULTRA HIGH Z-INDEX */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    background: '#00fff2',
                    boxShadow: '0 0 10px #00fff2, 0 0 20px #00fff2',
                }}
            />
            
            {/* The organic outer ring - ULTRA HIGH Z-INDEX */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(0,255,242,0.3)] transition-transform duration-75"
                style={{
                    background: 'rgba(0,255,242,0.03)',
                    backdropFilter: 'blur(2px)',
                }}
            />
        </>
    )
}
