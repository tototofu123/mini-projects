import { Variants } from 'framer-motion'

export const loadingAnimation: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
}

export const iconMotionLoop = {
  animate: {
    scale: [1, 1.05, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}
