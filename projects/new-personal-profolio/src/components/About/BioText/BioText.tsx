import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { bioTextAnimation } from './BioText.animation'
import { setupBioTextEffects } from './BioText.effects'

export const BioText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const bioText = 
    "I look at the complete engineering picture—architecting highly optimized embedded firmware, training machine learning models, and bringing the results to life through high-fidelity, interactive user interfaces. Balancing extreme system constraints with raw artistic freedom is my playground."

  const words = bioText.split(' ')

  useEffect(() => {
    return setupBioTextEffects(containerRef)
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="absolute top-[35vh] left-[45vw] right-[12vw] max-w-2xl font-dm text-2xl leading-relaxed text-slate-100 select-none z-10"
      variants={bioTextAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {words.map((word, i) => (
          <span key={i} className="hazeword inline-block">
            {word}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
