import { Variants } from 'framer-motion'

export const titleAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease: 'easeOut',
    },
  },
}

// Comet stream effect - individual characters
export const titleCharAnimation = {
  initial: {
    opacity: 0,
    x: 200,
    y: Math.random() * 40 - 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
}

export const titleHoverAnimation = {
  scale: 1.02,
  textShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
  transition: { duration: 0.3 },
}
