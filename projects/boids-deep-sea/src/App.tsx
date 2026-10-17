import { useRef } from 'react'
import * as THREE from 'three'
import BoidCanvas, { BoidCanvasHandle } from './components/BoidCanvas'
import Controls from './components/Controls'
import UIOverlay from './components/UIOverlay'
import CustomCursor from './components/CustomCursor'

export default function App() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const boidCanvasRef = useRef<BoidCanvasHandle>(null)
    const mouseWorldRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
    const mouseActiveRef = useRef<boolean>(false)

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#00050a] cursor-none">
            <CustomCursor />
            <BoidCanvas
                ref={boidCanvasRef}
                mouseWorldRef={mouseWorldRef}
                mouseActiveRef={mouseActiveRef}
            />
            <Controls />
            <UIOverlay canvasRef={canvasRef} />
        </div>
    )
}
