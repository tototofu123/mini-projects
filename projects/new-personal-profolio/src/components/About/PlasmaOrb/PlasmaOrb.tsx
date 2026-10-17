import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { orbContainerAnimation } from './PlasmaOrb.animation'
import { initPlasmaOrbPhysics } from './PlasmaOrb.effects'

export const PlasmaOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cleanup = initPlasmaOrbPhysics(canvas, () => {
      // Audio or global dispatch triggers can hook in here
    })

    return cleanup
  }, [])

  return (
    <motion.div
      className="absolute top-[30vh] left-[70vw] w-[20vw] h-[45vh] bg-slate-900/10 border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center overflow-hidden z-10 hover:border-orange-500/50 transition-colors duration-500 ease-out"
      variants={orbContainerAnimation}
      initial="initial"
      animate="animate"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
      />
    </motion.div>
  )
}
