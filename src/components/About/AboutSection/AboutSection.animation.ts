import { Variants } from 'framer-motion'

export const aboutSectionAnimation: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: 'easeOut',
    },
  },
}
