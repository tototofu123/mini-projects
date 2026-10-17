import React from 'react'
import { motion } from 'framer-motion'

interface VRHeadsetProps {
  children: React.ReactNode
}

export const VRHeadset: React.FC<VRHeadsetProps> = ({ children }) => {
  return (
    <motion.div
      className="relative w-screen h-screen overflow-hidden border-[16px] border-slate-900 bg-slate-950 flex items-center justify-center shadow-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1.0, opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for snappy mechanical expand
      }}
    >
      {/* VR Bezel details / HUD lines */}
      <div className="absolute top-4 left-4 z-20 flex gap-2 items-center pointer-events-none select-none">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="font-space text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
          SYS.VR_HUD // ACTIVE
        </span>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none select-none">
        <span className="font-space text-[10px] tracking-widest text-slate-400 font-semibold uppercase">
          FOV: 110° | RES: 4K_NATIVE
        </span>
      </div>

      {/* Futuristic lens corner indicators */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 pointer-events-none z-20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 pointer-events-none z-20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 pointer-events-none z-20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 pointer-events-none z-20" />

      {/* Screen flash white overlay simulation */}
      <motion.div 
        className="absolute inset-0 bg-white pointer-events-none z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Viewport viewport content */}
      <div className="w-full h-full relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
