import React from 'react'
import { motion } from 'framer-motion'

export const StatusRow: React.FC = () => {
  return (
    <motion.div
      className="fixed top-8 right-16 z-10 font-space text-sm text-slate-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      HKUST | Computer Engineering + AI
    </motion.div>
  )
}
