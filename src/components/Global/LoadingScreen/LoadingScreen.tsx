import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { loadingAnimation } from './LoadingScreen.animation'
import { setupLoadingScreenEffects } from './LoadingScreen.effects'

interface LoadingScreenProps {
  onComplete?: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setupLoadingScreenEffects({ onComplete: () => {
      setIsVisible(false)
      onComplete?.()
    }})
  }, [onComplete])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
      variants={loadingAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* t.tofu icon motion loop */}
      <div className="w-24 h-24 flex items-center justify-center">
        {/* Icon placeholder - will be replaced with actual SVG */}
        <span className="text-white text-2xl font-bold">t.tofu</span>
      </div>
    </motion.div>
  )
}
