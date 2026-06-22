import { RefObject } from 'react'

export const setupBioTextEffects = (containerRef: RefObject<HTMLDivElement | null>) => {
  const container = containerRef.current
  if (!container) return () => {}

  let animationFrameId: number
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  const spans = container.querySelectorAll('.hazeword')

  const updateWordFocus = () => {
    // Smooth mouse coordinates interpolation
    currentX += (targetX - currentX) * 0.15
    currentY += (targetY - currentY) * 0.15

    spans.forEach((span) => {
      const rect = span.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = currentX - centerX
      const dy = currentY - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        span.classList.add('cooled')
      } else {
        span.classList.remove('cooled')
      }
    })

    animationFrameId = requestAnimationFrame(updateWordFocus)
  }

  const handleMouseMove = (e: MouseEvent) => {
    targetX = e.clientX
    targetY = e.clientY
  }

  window.addEventListener('mousemove', handleMouseMove)
  animationFrameId = requestAnimationFrame(updateWordFocus)

  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    cancelAnimationFrame(animationFrameId)
  }
}
