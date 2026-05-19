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

  return (
    <motion.div
      ref={containerRef}
      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[87.5vh] h-[85vh] border-2 border-slate-700 rounded-t-2xl bg-slate-700 flex items-center justify-center cursor-crosshair"
      variants={avatarAnimation}
      initial="initial"
      animate="animate"
    >
      <span className="text-slate-400 font-space">[ Avatar Layer ]</span>
    </motion.div>
  )
}
