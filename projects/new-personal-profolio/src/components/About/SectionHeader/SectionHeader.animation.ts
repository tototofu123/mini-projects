import { Variants } from 'framer-motion'

export const sectionHeaderAnimation: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    textShadow: [
      '0 0 4px rgba(249, 115, 22, 0.4)',
      '0 0 12px rgba(249, 115, 22, 0.8)',
      '0 0 4px rgba(249, 115, 22, 0.4)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
}
