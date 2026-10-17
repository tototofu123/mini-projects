import { Variants } from 'framer-motion'

export const orbContainerAnimation: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 15,
      delay: 0.5,
    },
  },
}
