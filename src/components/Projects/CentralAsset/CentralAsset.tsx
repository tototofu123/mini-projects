import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

export const CentralAsset: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Geometry - Double cone to look like a diamond/crystal prism
    const geometry = new THREE.OctahedronGeometry(1.5, 0)

    // Material - wireframe with ambient glow
    const material = new THREE.MeshBasicMaterial({
      color: 0xf97316, // Orange glow
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })

    // Inner solid core
    const coreGeometry = new THREE.OctahedronGeometry(0.8, 0)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xfdba74, // Faded peach core
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    })

    const mesh = new THREE.Mesh(geometry, material)
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    mesh.add(coreMesh)
    scene.add(mesh)

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Point Light
    const pointLight = new THREE.PointLight(0xf97316, 2, 50)
    pointLight.position.set(0, 0, 2)
    scene.add(pointLight)

    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      mesh.rotation.y += 0.008
      mesh.rotation.x += 0.005

      // Slight floating effect on Y axis
      mesh.position.y = Math.sin(Date.now() * 0.0015) * 0.12

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-96 h-96 flex flex-col items-center justify-center pointer-events-none z-0">
      <div ref={containerRef} className="w-full h-80" />
      <motion.div
        className="text-center mt-2 select-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-space text-xs font-bold uppercase tracking-[0.3em] text-orange-500 bg-orange-50 px-4 py-1.5 rounded-full border border-orange-200/50 shadow-sm shadow-orange-100">
          [ MODERN GALLERY ]
        </span>
      </motion.div>
    </div>
  )
}
