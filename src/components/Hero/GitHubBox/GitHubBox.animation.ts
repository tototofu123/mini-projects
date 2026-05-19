import { Variants } from 'framer-motion'

export const githubBoxAnimation: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 2,
    },
  },
}

export const countUpAnimation = {
  from: 0,
  to: 1204,
  transition: { duration: 1.5, delay: 2 },
}

export const heartbeatAnimation = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 0.6,
    repeat: Infinity,
  },
}
