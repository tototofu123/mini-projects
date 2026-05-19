export const heroBootSequence = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  },
}

export const heroItem = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
}
