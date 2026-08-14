'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { SodaCan } from './SodaCan';
import { Suspense } from 'react';

export function CanScene({ flavor = 'yuzu' }) {
    return (
        <div className="w-full h-full">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <SodaCan flavor={flavor} />

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
