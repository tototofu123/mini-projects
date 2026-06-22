import { Variants } from 'framer-motion'

export const cardDropVariants = (depth: 'back' | 'middle' | 'front'): Variants => {
  const delays = {
    back: 0,
    middle: 0.5,
    front: 1.0,
  }

  return {
    initial: {
      y: -800,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
        delay: delays[depth],
      },
    },
  }
}
