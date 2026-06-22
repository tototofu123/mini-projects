import { RefObject } from 'react'

interface AvatarEffectsProps {
  containerRef: RefObject<HTMLDivElement | null>
  onBaseImageChange: (update: number | ((prev: number) => number)) => void
  onMaskImageChange: (index: number) => void
}

export const setupAvatarEffects = ({
  containerRef,
  onBaseImageChange,
  onMaskImageChange,
}: AvatarEffectsProps) => {
  let idleTimeout: NodeJS.Timeout

  const handleMouseMove = (e: MouseEvent) => {
    const container = containerRef.current
    if (!container || !container.contains(e.target as Node)) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // X-ray flashlight clip-path update
    container.style.clipPath = `circle(120px at ${x}px ${y}px)`

    // Clear idle timeout on mouse move
    clearTimeout(idleTimeout)

    // Set idle timeout for 600ms re-roll
    idleTimeout = setTimeout(() => {
      const randomImage = Math.floor(Math.random() * 4)
      onMaskImageChange(randomImage)
    }, 600)
  }

  const handleClick = (e: MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    if (!container.contains(e.target as Node)) {
      // Background click - cycle base image
      onBaseImageChange(prev => (prev + 1) % 4)
    } else {
      // Avatar click - liquid ripple effect (lock-in)
      const rect = container.getBoundingClientRect()
      if (rect) {
        // Can be hooked to expand liquid circle in shader
      }
    }
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('click', handleClick)

  return () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('click', handleClick)
    clearTimeout(idleTimeout)
  }
}
