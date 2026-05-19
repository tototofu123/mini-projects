import { Variants } from 'framer-motion'

export const headerAnimation: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.5,
      staggerChildren: 0.1,
    },
  },
}

export const logoAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
}

export const navLinksAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// Cryptographic decode effect for text
export const cryptoDecodeAnimation = (text: string) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
  const length = text.length
  const frames = 24

  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  }
}
