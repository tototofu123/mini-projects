import { Variants } from 'framer-motion'

export const introLinesAnimation: Variants = {
  initial: { opacity: 0, x: 10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 1.5,
      ease: 'easeOut',
    },
  },
}
