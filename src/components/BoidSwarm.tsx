import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useBoidStore } from '../store/useBoidStore'

const MAX_COUNT = 5000 // Increased for CLI Demo

// Module-level temp objects for performance
const _obj = new THREE.Object3D()
const _v1 = new THREE.Vector3()
const _v2 = new THREE.Vector3()
const _v3 = new THREE.Vector3()
const _c = new THREE.Color()
const _cA = new THREE.Color()
const _cB = new THREE.Color()

// ?€?€?€ Organic Manta Geometry ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€

function makeMantaGeo(): THREE.BufferGeometry {
    const geo = new THREE.BufferGeometry()
    const s = 1.5
    const w = 3.0 // wingspan
    
    // Simple manta shape: flat wide triangle with a tail
    const vertices = new Float32Array([
        0, s, 0,      // nose
        -w, -s, 0,    // left wing
        w, -s, 0,     // right wing
        0, -s*0.5, 0, // body back
        0, -s*2.5, 0  // tail tip
    ])

    const indices = [
        0, 1, 3, // left wing main
        0, 3, 2, // right wing main
        3, 1, 4, // left tail
        3, 4, 2  // right tail
    ]

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
}

// ?€?€?€ Helper: Vector Math ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€

const normalize = (v: THREE.Vector3) => {
    const l = v.length()
    if (l > 0) v.divideScalar(l)
    return v
}

const clampMagnitude = (v: THREE.Vector3, min: number, max: number) => {
    const l = v.length()
    if (l > max) v.multiplyScalar(max / l)
    else if (l < min && l > 0) v.multiplyScalar(min / l)
    return v
}

const wrapEdge = (v: THREE.Vector3, size: number) => {
    if (v.x > size) v.x = -size
    else if (v.x < -size) v.x = size
    if (v.y > size) v.y = -size
    else if (v.y < -size) v.y = size
    if (v.z > size) v.z = -size
    else if (v.z < -size) v.z = size
}

// ?€?€?€ Component ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€

interface BoidSwarmProps {
    mouseWorldRef: React.MutableRefObject<THREE.Vector3>
    mouseActiveRef: React.MutableRefObject<boolean>
}

export default function BoidSwarm({ mouseWorldRef, mouseActiveRef }: BoidSwarmProps) {
    const { scene } = useThree()
    const { count, worldSize, colorPrimary, colorSecondary, glowIntensity } = useBoidStore()

    const positions = useRef(new Float32Array(MAX_COUNT * 3))
    const velocities = useRef(new Float32Array(MAX_COUNT * 3))
    const meshRef = useRef<THREE.InstancedMesh | null>(null)

    // ?€?€?€ Setup Mesh ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
    const mesh = useMemo(() => {
        const geo = makeMantaGeo()
        // Use Basic material so it stays bright in dark fog
        const mat = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        })
        const m = new THREE.InstancedMesh(geo, mat, MAX_COUNT)
        m.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        
        // Hide initially
        _obj.position.set(0, 0, 9999)
        _obj.updateMatrix()
        for (let i = 0; i < MAX_COUNT; i++) m.setMatrixAt(i, _obj.matrix)
        
        meshRef.current = m
        return m
    }, [])

    useEffect(() => {
        scene.add(mesh)
        return () => { scene.remove(mesh) }
    }, [scene, mesh])

    // ?€?€?€ Init ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
    useEffect(() => {
        const { count, speedMin, speedMax, worldSize } = useBoidStore.getState()
        const pos = positions.current
        const vel = velocities.current
        for (let i = 0; i < count; i++) {
            const ix = i * 3
            pos[ix] = (Math.random() - 0.5) * worldSize * 2
            pos[ix + 1] = (Math.random() - 0.5) * worldSize * 2
            pos[ix + 2] = (Math.random() - 0.5) * worldSize * 2
            
            _v1.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
            normalize(_v1).multiplyScalar(THREE.MathUtils.lerp(speedMin, speedMax, Math.random()))
            vel[ix] = _v1.x; vel[ix + 1] = _v1.y; vel[ix + 2] = _v1.z
        }
    }, [worldSize])

    // ?€?€?€ Simulation ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
    useFrame((state) => {
        const m = meshRef.current
        if (!m) return

        const {
            count, speedMin, speedMax, visionRadius,
            separationForce, alignmentForce, cohesionForce, steeringForce,
            velocityDrag, noiseAngle, scaleVariance,
            colorMode, colorPrimary, colorSecondary,
            mouseMode, mouseRadius, mouseStrength, worldSize
        } = useBoidStore.getState()

        const posArr = positions.current
        const velArr = velocities.current
        const vr2 = visionRadius * visionRadius
        const sepR2 = vr2 * 0.2
        const mr2 = mouseRadius * mouseRadius

        // FIX: Map pointer to world space at z=0 plane
        // state.pointer is -1 to 1. We scale it by worldSize to reach the edges.
        const mousePos = _v3.set(state.pointer.x * (worldSize * 0.8), state.pointer.y * (worldSize * 0.8), 0)

        _cA.set(colorPrimary)
        _cB.set(colorSecondary)

        for (let i = 0; i < count; i++) {
            const ix = i * 3
            const px = posArr[ix], py = posArr[ix+1], pz = posArr[ix+2]
            const vx = velArr[ix], vy = velArr[ix+1], vz = velArr[ix+2]
            
            _v1.set(px, py, pz) // current pos
            _v2.set(vx, vy, vz) // current vel

            let sep = new THREE.Vector3(0, 0, 0)
            let ali = new THREE.Vector3(0, 0, 0)
            let coh = new THREE.Vector3(0, 0, 0)
            let nCnt = 0, sCnt = 0

            // Optimized loop: only check some neighbors if count is very high
            const step = count > 1000 ? 2 : 1 
            for (let j = 0; j < count; j += step) {
                if (i === j) continue
                const jx = j * 3
                const dx = posArr[jx] - px
                const dy = posArr[jx+1] - py
                const dz = posArr[jx+2] - pz
                const d2 = dx*dx + dy*dy + dz*dz
                
                if (d2 === 0 || d2 >= vr2) continue
                
                nCnt++
                ali.x += velArr[jx]; ali.y += velArr[jx+1]; ali.z += velArr[jx+2]
                coh.x += posArr[jx]; coh.y += posArr[jx+1]; coh.z += posArr[jx+2]
                
                if (d2 < sepR2) {
                    const d = Math.sqrt(d2)
                    sep.x -= dx / d; sep.y -= dy / d; sep.z -= dz / d
                    sCnt++
                }
            }

            if (nCnt > 0) {
                ali.divideScalar(nCnt).normalize()
                _v2.addScaledVector(ali, alignmentForce * steeringForce)
                
                coh.divideScalar(nCnt).sub(_v1).normalize()
                _v2.addScaledVector(coh, cohesionForce * steeringForce)
            }
            if (sCnt > 0) {
                sep.normalize()
                _v2.addScaledVector(sep, separationForce * steeringForce * 3 * nearCursorSep)
            }

            // Noise
            _v2.x += (Math.random() - 0.5) * noiseAngle
            _v2.y += (Math.random() - 0.5) * noiseAngle
            _v2.z += (Math.random() - 0.5) * noiseAngle

            // Pointer interaction
            if (mouseMode !== 'none') {
                const dist2 = _v1.distanceToSquared(mousePos)
                if (dist2 < mr2) {
                    const dist = Math.sqrt(dist2)
                    const dir = _v3.copy(mousePos).sub(_v1).normalize()
                    
                    // ORGANIC FIX: 
                    // 1. If too close (safe zone), actually push away slightly to prevent clumping
                    // 2. Otherwise, attract with a force that fades as they arrive
                    const safeZone = 5.0
                    if (dist < safeZone && mouseMode === 'attract') {
                        _v2.addScaledVector(dir, -steeringForce * 2) 
                    } else {
                        const f = mouseStrength * (1 - dist / mouseRadius) * steeringForce * 5
                        if (mouseMode === 'attract') {
                            _v2.addScaledVector(dir, f)
                            // Add a "swirl" component to make them orbit instead of crash
                            const swirl = _v3.set(-dir.y, dir.x, 0).multiplyScalar(f * 0.5)
                            _v2.add(swirl)
                        }
                        else _v2.addScaledVector(dir, -f)
                    }
                }
            }

            // General Separation Boost near cursor
            const nearCursorSep = _v1.distanceToSquared(mousePos) < (mr2 * 0.2) ? 2.5 : 1.0;

            // Physics integrate
            _v2.multiplyScalar(velocityDrag)
            clampMagnitude(_v2, speedMin, speedMax)
            _v1.add(_v2)
            wrapEdge(_v1, worldSize)

            // Save back
            posArr[ix] = _v1.x; posArr[ix+1] = _v1.y; posArr[ix+2] = _v1.z
            velArr[ix] = _v2.x; velArr[ix+1] = _v2.y; velArr[ix+2] = _v2.z

            // Matrix + LookAt velocity
            _obj.position.copy(_v1)
            _obj.scale.setScalar(1 + (Math.random() - 0.5) * scaleVariance)
            
            // Orient manta: nose points to velocity direction
            _obj.lookAt(_v1.clone().add(_v2))
            _obj.updateMatrix()
            m.setMatrixAt(i, _obj.matrix)

            // Bioluminescent glow
            if (colorMode === 'velocity') {
                const spd = _v2.length()
                const t = THREE.MathUtils.clamp((spd - speedMin) / (speedMax - speedMin), 0, 1)
                _c.lerpColors(_cA, _cB, t)
            } else {
                _c.copy(_cA)
            }
            m.setColorAt(i, _c)
        }

        m.instanceMatrix.needsUpdate = true
        if (m.instanceColor) m.instanceColor.needsUpdate = true
    })

    return null
}
