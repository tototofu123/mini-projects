import { create } from 'zustand'

export interface BoidParams {
    count: number
    speedMin: number
    speedMax: number
    visionRadius: number
    separationForce: number
    alignmentForce: number
    cohesionForce: number
    steeringForce: number
    velocityDrag: number
    noiseAngle: number
    scaleVariance: number
    colorMode: 'solid' | 'velocity' | 'angle'
    boidShape: 'manta' | 'jellyfish' | 'triangle'
    colorPrimary: string
    colorSecondary: string
    mouseMode: 'attract' | 'repel' | 'none'
    mouseRadius: number
    mouseStrength: number
    // 3D & Organic
    worldSize: number
    trailLength: number
    glowIntensity: number
}

const defaultParams: BoidParams = {
    count: 800,
    speedMin: 0.1,
    speedMax: 0.3,
    visionRadius: 15,
    separationForce: 2.0,
    alignmentForce: 1.2,
    cohesionForce: 1.0,
    steeringForce: 0.05,
    velocityDrag: 0.99,
    noiseAngle: 0.02,
    scaleVariance: 0.5,
    colorMode: 'velocity',
    boidShape: 'manta',
    colorPrimary: '#00fff2',
    colorSecondary: '#0044ff',
    mouseMode: 'attract',
    mouseRadius: 40,
    mouseStrength: 2.5,
    worldSize: 100,
    trailLength: 20,
    glowIntensity: 2.0,
}

// Using 'create' instead of 'createStore' makes it a React Hook
export const useBoidStore = create<BoidParams>()(() => ({ ...defaultParams }))
