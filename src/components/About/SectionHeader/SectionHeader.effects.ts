import { RefObject } from 'react'

export const setupSectionHeaderEffects = (headerRef: RefObject<HTMLDivElement | null>) => {
  const element = headerRef.current
  if (!element) return () => {}

  let intervalId: NodeJS.Timeout

  const handleMouseEnter = () => {
    // Faulty neon light glitch effect
    intervalId = setInterval(() => {
      if (Math.random() > 0.7) {
        element.style.opacity = '0.3'
        setTimeout(() => {
          element.style.opacity = '1'
        }, 50)
      }
    }, 150)
  }

  const handleMouseLeave = () => {
    clearInterval(intervalId)
    element.style.opacity = '1'
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    clearInterval(intervalId)
  }
}
