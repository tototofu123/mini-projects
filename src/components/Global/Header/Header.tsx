import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { headerAnimation } from './Header.animation'
import { setupHeaderEffects } from './Header.effects'

export const Header: React.FC = () => {
  const [materialState, setMaterialState] = useState<'chrome' | 'glass' | 'metal' | 'stone'>('chrome')
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleanup = setupHeaderEffects({
      headerRef,
      onMaterialChange: setMaterialState,
      onLogoClick: () => {
        // Warp to contact section
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      },
    })

    return cleanup
  }, [])

  return (
    <motion.header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center px-16 py-8"
      variants={headerAnimation}
      initial="initial"
      animate="animate"
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="text-slate-400 font-space text-xl font-bold cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        t.tofu
      </motion.a>

      {/* Navigation */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-12">
        <a href="#projects" className="text-slate-400 font-space text-sm uppercase tracking-wide hover:text-slate-100 transition">
          Projects
        </a>
        <a href="#skills" className="text-slate-400 font-space text-sm uppercase tracking-wide hover:text-slate-100 transition">
          Skills
        </a>
        <a href="#contact" className="text-slate-400 font-space text-sm uppercase tracking-wide hover:text-slate-100 transition">
          Contact
        </a>
      </nav>
    </motion.header>
  )
}
