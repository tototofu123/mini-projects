'use client';

import { useFrame } from '@react-three/fiber';
import { useTexture, Cylinder, MeshTransmissionMaterial, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

export function SodaCan({ scale = 1, flavor = 'yuzu' }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(`/aura-pop/products/Whisk_ceb13d88ab4638a9439432fefc8b1ccfdr.webp`);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={scale}>
                <cylinderGeometry args={[1, 1, 3.2, 64]} />
                <meshStandardMaterial map={texture} roughness={0.1} metalness={0.8} />

                {/* Metal Rims */}
                <mesh position={[0, 1.6, 0]}>
                    <cylinderGeometry args={[1.02, 1.02, 0.1, 64]} />
                    <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
                </mesh>
                <mesh position={[0, -1.6, 0]}>
                    <cylinderGeometry args={[1.02, 1.02, 0.1, 64]} />
                    <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
                </mesh>
            </mesh>
        </Float>
    );
}
