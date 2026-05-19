import { RefObject } from 'react'

interface AvatarEffectsProps {
  containerRef: RefObject<HTMLDivElement>
  onBaseImageChange: (index: number) => void
  onMaskImageChange: (index: number) => void
}

export const setupAvatarEffects = ({
  containerRef,
  onBaseImageChange,
  onMaskImageChange,
}: AvatarEffectsProps) => {
  let idleTimeout: NodeJS.Timeout
  let lastMouseMove = Date.now()

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) return

    lastMouseMove = Date.now()

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // X-ray flashlight clip-path update
    if (containerRef.current) {
      containerRef.current.style.clipPath = `circle(120px at ${x}px ${y}px)`
    }

    // Clear idle timeout on mouse move
    clearTimeout(idleTimeout)

    // Set idle timeout for 600ms re-roll
    idleTimeout = setTimeout(() => {
      const randomImage = Math.floor(Math.random() * 3)
      onMaskImageChange(randomImage)
    }, 600)
  }

  const handleClick = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      // Background click - cycle base image
      onBaseImageChange(prev => (prev + 1) % 4)
    } else {
      // Avatar click - liquid ripple effect (lock-in)
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        // Trigger ripple shader here
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
