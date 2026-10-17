import { useRef, forwardRef, useImperativeHandle, Suspense, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import BoidSwarm from './BoidSwarm'

// ─── Debug Error Boundary ────────────────────────────────────────────────────

class SceneErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false, error: null }
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error }
    }
    componentDidCatch(error: any, errorInfo: any) {
        console.error("CANVAS CRASHED:", error, errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-full w-full items-center justify-center bg-red-900/20 p-10 text-white font-mono text-xs">
                    <div>
                        <h1 className="text-xl font-bold mb-4">Canvas Error</h1>
                        <pre className="whitespace-pre-wrap">{String(this.state.error)}</pre>
                        <button 
                            className="mt-4 px-4 py-2 bg-white/10 rounded"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface Props {
    mouseWorldRef: React.MutableRefObject<THREE.Vector3>
    mouseActiveRef: React.MutableRefObject<boolean>
}

export interface BoidCanvasHandle {
    getCanvas: () => HTMLCanvasElement | null
}

const BoidCanvas = forwardRef<BoidCanvasHandle, Props>(
    ({ mouseWorldRef, mouseActiveRef }, ref) => {
        const canvasRef = useRef<HTMLCanvasElement>(null)

        useImperativeHandle(ref, () => ({
            getCanvas: () => canvasRef.current,
        }))

        console.log("Rendering BoidCanvas (Checking for Three.js instances...)")

        return (
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#00050a' }}>
                <SceneErrorBoundary>
                    <Canvas
                        ref={canvasRef}
                        gl={{
                            antialias: true,
                            powerPreference: 'high-performance',
                        }}
                        camera={{ position: [0, 0, 80], fov: 45 }}
                        onCreated={({ gl }) => {
                            console.log("WebGL Context Created Successfully")
                        }}
                        onError={(err) => console.error("R3F Canvas Error:", err)}
                    >
                        <color attach="background" args={['#00050a']} />
                        <fogExp2 attach="fog" args={['#00050a', 0.01]} />
                        
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.4} />
                            <pointLight position={[50, 50, 50]} intensity={1} color="#00fff2" />
                            
                            <BoidSwarm mouseWorldRef={mouseWorldRef} mouseActiveRef={mouseActiveRef} />
                            
                            <OrbitControls makeDefault />
                        </Suspense>
                    </Canvas>
                </SceneErrorBoundary>
            </div>
        )
    }
)

BoidCanvas.displayName = 'BoidCanvas'
export default BoidCanvas
