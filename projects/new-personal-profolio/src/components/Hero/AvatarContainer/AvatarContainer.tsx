import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { avatarAnimation } from './AvatarContainer.animation'
import { setupAvatarEffects } from './AvatarContainer.effects'

export const AvatarContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [baseImage, setBaseImage] = useState(0)
  const [maskImage, setMaskImage] = useState(0)

  useEffect(() => {
    const cleanup = setupAvatarEffects({
      containerRef,
      onBaseImageChange: setBaseImage,
      onMaskImageChange: setMaskImage,
    })

    return cleanup
  }, [])

  // Aesthetic mocks for the 4 Styles
  const renderStyleContent = (index: number) => {
    switch (index) {
      case 0: // Photo (Sleek professional card)
        return (
          <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 select-none">
            <div className="w-36 h-36 rounded-full border-4 border-slate-600 bg-slate-700 flex items-center justify-center overflow-hidden mb-6">
              <span className="font-syne text-4xl text-orange-500 font-bold">TL</span>
            </div>
            <span className="font-space text-lg font-bold text-slate-100 uppercase tracking-widest">Toto Lai</span>
            <span className="font-dm text-xs text-slate-400 mt-1 uppercase tracking-wide">Computer Engineering + AI</span>
          </div>
        )
      case 1: // ASCII Code (Matrix stream)
        return (
          <div className="w-full h-full bg-[#030712] font-mono text-[9px] text-green-500/80 p-6 overflow-hidden leading-tight break-all select-none">
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="opacity-70 font-semibold">
                {`01010101 TOTO_LAI_ENGINEERING_CORE_INIT_${i}...`}
                {`const ai_agent = new RAGModel({ layers: 128, type: "transformer" });`}
              </div>
            ))}
          </div>
        )
      case 2: // Pixel Picasso (Cubist block grid)
        return (
          <div className="w-full h-full bg-slate-950 p-4 grid grid-cols-8 grid-rows-8 gap-1 select-none">
            {Array.from({ length: 64 }).map((_, i) => {
              const colors = ['bg-orange-600', 'bg-cyan-600', 'bg-indigo-600', 'bg-slate-800']
              const colorClass = colors[(i + Math.floor(i / 8)) % colors.length]
              return <div key={i} className={`${colorClass} rounded-sm opacity-90`} />
            })}
          </div>
        )
      case 3: // Depth Dots (LiDAR map)
        return (
          <div className="w-full h-full bg-slate-950 flex flex-wrap items-center justify-center p-8 gap-4 select-none">
            {Array.from({ length: 120 }).map((_, i) => {
              const opacity = (i % 5 === 0) ? 'opacity-90 scale-125' : 'opacity-40'
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-cyan-400 ${opacity} transition-all duration-500`}
                />
              )
            })}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[87.5vh] h-[85vh] border-2 border-slate-700 rounded-t-2xl bg-slate-950 overflow-hidden cursor-crosshair z-0"
      variants={avatarAnimation}
      initial="initial"
      animate="animate"
      style={{
        clipPath: 'circle(120px at 50% 50%)', // Default clip-path
      }}
    >
      {/* Base Layer (Reality) */}
      <div className="absolute inset-0 z-0">
        {renderStyleContent(baseImage)}
      </div>

      {/* Hover Mask Layer (Flashlight X-Ray) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {renderStyleContent(maskImage)}
      </div>
    </motion.div>
  )
}
