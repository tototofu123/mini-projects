import { Variants } from 'framer-motion'

export const avatarAnimation: Variants = {
  initial: {
    opacity: 0,
    borderColor: 'rgba(30, 41, 59, 0)',
  },
  animate: {
    opacity: 1,
    borderColor: 'rgba(30, 41, 59, 1)',
    transition: {
      duration: 0.8,
      delay: 0.5,
    },
  },
}

// Wireframe border draw animation
export const borderDraw = {
  animate: {
    pathLength: [0, 1],
    transition: { duration: 1, delay: 0.3 },
  },
}

// Glitch flash on photo entry
export const glitchFlash = {
  animate: {
    opacity: [1, 0.8, 1],
    filter: [
      'hue-rotate(0deg)',
      'hue-rotate(90deg)',
      'hue-rotate(0deg)',
    ],
    transition: {
      duration: 0.2,
      delay: 0.8,
    },
  },
}
