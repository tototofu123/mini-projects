export const setupCardEffects = (
  cardElement: HTMLDivElement,
  onDragProgress: (progress: number) => void
) => {
  if (!cardElement) return () => {}

  // 3D tilt effect on card hover
  const handleMouseMove = (e: MouseEvent) => {
    const rect = cardElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateY = (x / rect.width - 0.5) * 15
    const rotateX = (0.5 - y / rect.height) * 15

    cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    cardElement.style.transform = ''
    onDragProgress(0)
  }

  cardElement.addEventListener('mousemove', handleMouseMove)
  cardElement.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    cardElement.removeEventListener('mousemove', handleMouseMove)
    cardElement.removeEventListener('mouseleave', handleMouseLeave)
  }
}
