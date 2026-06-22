import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { sectionHeaderAnimation } from './SectionHeader.animation'
import { setupSectionHeaderEffects } from './SectionHeader.effects'

export const SectionHeader: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return setupSectionHeaderEffects(headerRef)
  }, [])

  return (
    <motion.div
      ref={headerRef}
      className="absolute top-8 left-12 font-syne text-2xl font-bold tracking-widest text-orange-500 cursor-default select-none z-10"
      variants={sectionHeaderAnimation}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      [ PROFILE ENGINE ]
    </motion.div>
  )
}
