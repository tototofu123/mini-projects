import React from 'react'
import { motion } from 'framer-motion'
import { introLinesAnimation } from './IntroLines.animation'

export const IntroLines: React.FC = () => {
  return (
    <motion.div
      className="absolute right-16 top-1/2 translate-y-12 max-w-xs z-10"
      variants={introLinesAnimation}
      initial="initial"
      animate="animate"
    >
      <p className="font-syne text-2xl text-slate-400 mb-2">an AI engineer and UI developer</p>
      <p className="font-syne text-2xl text-slate-400">based in Hong Kong</p>
    </motion.div>
  )
}
