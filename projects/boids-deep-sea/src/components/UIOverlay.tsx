import { useRef, useEffect, useState, useCallback } from 'react'
import { exportPNG, exportWebM } from '../utils/exportCanvas'
import { useBoidStore } from '../store/useBoidStore'

interface UIOverlayProps {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

type ExportState = 'idle' | 'recording' | 'done'

export default function UIOverlay({ canvasRef }: UIOverlayProps) {
    const fpsRef = useRef<HTMLSpanElement>(null)
    const frameCount = useRef(0)
    const lastTime = useRef(performance.now())
    const rafRef = useRef<number>(0)
    const [exportState, setExportState] = useState<ExportState>('idle')
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const tick = () => {
            frameCount.current++
            const now = performance.now()
            const elapsed = now - lastTime.current
            if (elapsed >= 1000) {
                const fps = Math.round((frameCount.current * 1000) / elapsed)
                if (fpsRef.current) fpsRef.current.textContent = `${fps}`
                frameCount.current = 0
                lastTime.current = now
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    const handleExportPNG = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        exportPNG(canvas)
    }, [canvasRef])

    const handleExportWebM = useCallback(async () => {
        const canvas = canvasRef.current
        if (!canvas || exportState === 'recording') return

        setExportState('recording')
        setCountdown(5)

        const intv = setInterval(() => {
            setCountdown((c) => {
                if (c <= 1) { clearInterval(intv); return 0 }
                return c - 1
            })
        }, 1000)

        try {
            await exportWebM(canvas, 5000)
            setExportState('done')
            setTimeout(() => setExportState('idle'), 2000)
        } catch (err) {
            console.error('Export failed:', err)
            setExportState('idle')
        }
        clearInterval(intv)
    }, [canvasRef, exportState])

    const boidCount = useBoidStore(state => state.count)

    return (
        <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-8">

            {/* ── Top-left: title ─────────────────────────────────────── */}
            <div className="pointer-events-none">
                <div
                    className="inline-flex flex-col gap-0.5 rounded-xl px-6 py-4"
                    style={{
                        background: 'rgba(0,10,20,0.4)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0,255,242,0.1)',
                    }}
                >
                    <span
                        style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '28px',
                            fontWeight: 300,
                            letterSpacing: '0.3em',
                            color: '#00fff2',
                            lineHeight: 1,
                            textShadow: '0 0 20px rgba(0,255,242,0.5)'
                        }}
                    >
                        SWARM
                    </span>
                    <span
                        style={{
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            color: 'rgba(0,255,242,0.4)',
                            textTransform: 'uppercase',
                        }}
                    >
                        Deep Sea / Bioluminescent
                    </span>
                </div>
            </div>

            {/* ── Bottom row ──────────────────────────────────────────── */}
            <div className="flex items-end justify-between gap-4">

                {/* FPS + Boid Count + hint */}
                <div
                    className="rounded-xl px-6 py-4 flex flex-col gap-3"
                    style={{
                        background: 'rgba(0,10,20,0.4)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0,255,242,0.1)',
                    }}
                >
                    <div className="flex gap-8">
                        <div className="flex items-baseline gap-2">
                            <span
                                ref={fpsRef}
                                style={{
                                    fontFamily: 'Space Mono, monospace',
                                    fontSize: '24px',
                                    fontWeight: 400,
                                    color: '#00fff2',
                                    lineHeight: 1,
                                }}
                            >
                                --
                            </span>
                            <span
                                style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: '10px',
                                    color: 'rgba(0,255,242,0.5)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                FPS
                            </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span
                                style={{
                                    fontFamily: 'Space Mono, monospace',
                                    fontSize: '24px',
                                    fontWeight: 400,
                                    color: '#00fff2',
                                    lineHeight: 1,
                                }}
                            >
                                {boidCount}
                            </span>
                            <span
                                style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: '10px',
                                    color: 'rgba(0,255,242,0.5)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                                SWARM SIZE
                            </span>
                        </div>
                    </div>
                    
                    <span
                        style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.4)',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Move cursor to attract swarm
                    </span>
                </div>

                {/* Export buttons */}
                <div className="pointer-events-auto flex gap-3">
                    <button
                        onClick={handleExportPNG}
                        className="cursor-pointer rounded-xl px-6 py-3 text-xs font-medium tracking-widest uppercase transition-all"
                        style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            background: 'rgba(0,255,242,0.05)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0,255,242,0.2)',
                            color: '#00fff2',
                            letterSpacing: '0.15em',
                        }}
                        onMouseEnter={(e) => {
                            ; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,255,242,0.15)'
                                ; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,242,0.5)'
                        }}
                        onMouseLeave={(e) => {
                            ; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,255,242,0.05)'
                                ; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,242,0.2)'
                        }}
                    >
                        Snapshot
                    </button>
                </div>
            </div>
        </div>
    )
}
