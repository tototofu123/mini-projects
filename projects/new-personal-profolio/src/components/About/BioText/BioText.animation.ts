import { Variants } from 'framer-motion'

export const bioTextAnimation: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
}
