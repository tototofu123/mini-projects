import React from 'react'
import { motion } from 'framer-motion'
import { titleAnimation } from './MainTitle.animation'
import { setupMainTitleEffects } from './MainTitle.effects'

export const MainTitle: React.FC = () => {
  return (
    <motion.h1
      className="absolute right-16 top-1/2 -translate-y-1/2 max-w-xs font-syne text-5xl font-bold text-slate-100 z-10"
      variants={titleAnimation}
      initial="initial"
      animate="animate"
      onAnimationComplete={() => setupMainTitleEffects()}
    >
      Hi, I am Toto
    </motion.h1>
  )
}
