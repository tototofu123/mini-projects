import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { boxItemVariants } from './TechStackBox.animation'
import { setupBoxMelt } from './TechStackBox.effects'

interface TechBoxProps {
  category: string
  title: string
  description: string
}

export const TechStackBox: React.FC<TechBoxProps> = ({ category, title, description }) => {
  const boxRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (boxRef.current) {
      setupBoxMelt(boxRef.current)
    }
  }

  return (
    <motion.div
      ref={boxRef}
      onClick={handleClick}
      variants={boxItemVariants}
      className="w-80 p-5 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl flex flex-col justify-center cursor-crosshair select-none transition-all duration-500 ease-out hover:border-slate-700 active:scale-[0.98] z-10"
      style={{
        borderRadius: '16px',
        borderColor: '#1E293B',
      }}
    >
      <span className="font-space text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">
        {category}
      </span>
      <h3 className="font-syne text-lg font-bold text-slate-100 mb-1">{title}</h3>
      <p className="font-dm text-sm text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}
