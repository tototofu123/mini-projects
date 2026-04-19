import { useControls, folder, button } from 'leva'
import { useBoidStore } from '../store/useBoidStore'

export default function Controls() {
    useControls({
        '⚡ Flocking': folder({
            visionRadius: {
                label: 'Vision Radius',
                value: 15,
                min: 5,
                max: 50,
                step: 1,
                onChange: (v: number) => useBoidStore.setState({ visionRadius: v }),
            },
            alignmentForce: {
                label: 'Alignment',
                value: 1.2,
                min: 0,
                max: 3,
                step: 0.01,
                onChange: (v: number) => useBoidStore.setState({ alignmentForce: v }),
            },
            cohesionForce: {
                label: 'Cohesion',
                value: 1.0,
                min: 0,
                max: 3,
                step: 0.01,
                onChange: (v: number) => useBoidStore.setState({ cohesionForce: v }),
            },
            separationForce: {
                label: 'Separation',
                value: 2.0,
                min: 0,
                max: 5,
                step: 0.01,
                onChange: (v: number) => useBoidStore.setState({ separationForce: v }),
            },
            steeringForce: {
                label: 'Steering',
                value: 0.05,
                min: 0.01,
                max: 0.3,
                step: 0.001,
                onChange: (v: number) => useBoidStore.setState({ steeringForce: v }),
            },
        }),

        '🌊 Motion': folder({
            speedMin: {
                label: 'Speed Min',
                value: 0.1,
                min: 0.01,
                max: 1,
                step: 0.01,
                onChange: (v: number) => useBoidStore.setState({ speedMin: v }),
            },
            speedMax: {
                label: 'Speed Max',
                value: 0.3,
                min: 0.1,
                max: 2,
                step: 0.01,
                onChange: (v: number) => useBoidStore.setState({ speedMax: v }),
            },
            velocityDrag: {
                label: 'Drag',
                value: 0.99,
                min: 0.9,
                max: 1.0,
                step: 0.001,
                onChange: (v: number) => useBoidStore.setState({ velocityDrag: v }),
            },
            noiseAngle: {
                label: 'Noise',
                value: 0.02,
                min: 0,
                max: 0.2,
                step: 0.005,
                onChange: (v: number) => useBoidStore.setState({ noiseAngle: v }),
            },
        }),

        '🎨 Appearance': folder({
            count: {
                label: 'Boid Count',
                value: 800,
                min: 50,
                max: 3000,
                step: 50,
                onChange: (v: number) => useBoidStore.setState({ count: v }),
            },
            glowIntensity: {
                label: 'Glow',
                value: 2.0,
                min: 0,
                max: 10,
                step: 0.1,
                onChange: (v: number) => useBoidStore.setState({ glowIntensity: v }),
            },
            colorPrimary: {
                label: 'Primary Color',
                value: '#00fff2',
                onChange: (v: string) => useBoidStore.setState({ colorPrimary: v }),
            },
            colorSecondary: {
                label: 'Secondary Color',
                value: '#0044ff',
                onChange: (v: string) => useBoidStore.setState({ colorSecondary: v }),
            },
            worldSize: {
                label: 'World Size',
                value: 100,
                min: 50,
                max: 300,
                step: 10,
                onChange: (v: number) => useBoidStore.setState({ worldSize: v }),
            },
        }),

        '🖱️ Interaction': folder({
            mouseMode: {
                label: 'Mode',
                value: 'attract',
                options: { Attract: 'attract', Repel: 'repel', None: 'none' },
                onChange: (v: string) => useBoidStore.setState({ mouseMode: v as 'attract' | 'repel' | 'none' }),
            },
            mouseRadius: {
                label: 'Radius',
                value: 40,
                min: 10,
                max: 150,
                step: 5,
                onChange: (v: number) => useBoidStore.setState({ mouseRadius: v }),
            },
            mouseStrength: {
                label: 'Strength',
                value: 2.5,
                min: 0.1,
                max: 10,
                step: 0.1,
                onChange: (v: number) => useBoidStore.setState({ mouseStrength: v }),
            },
        }),

        '↺ Reset': button(() => {
            useBoidStore.setState({
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
            })
        }),
    }, { store: undefined })

    return null
}
