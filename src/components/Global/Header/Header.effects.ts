import { RefObject } from 'react'

interface HeaderEffectsProps {
  headerRef: RefObject<HTMLDivElement>
  onMaterialChange: (state: 'chrome' | 'glass' | 'metal' | 'stone') => void
  onLogoClick: () => void
}

export const setupHeaderEffects = ({
  headerRef,
  onMaterialChange,
  onLogoClick,
}: HeaderEffectsProps) => {
  // Track scroll position to update material state based on section
  const handleScroll = () => {
    const scrollY = window.scrollY
    const totalHeight = document.body.scrollHeight
    const scrollPercent = scrollY / totalHeight

    if (scrollPercent < 0.25) {
      onMaterialChange('chrome')
    } else if (scrollPercent < 0.5) {
      onMaterialChange('glass')
    } else if (scrollPercent < 0.75) {
      onMaterialChange('metal')
    } else {
      onMaterialChange('stone')
    }
  }

  // 3D tilt effect on logo hover
  const handleLogoHover = (e: MouseEvent) => {
    const logo = headerRef.current?.querySelector('a')
    if (!logo) return

    const rect = logo.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateY = (x / rect.width - 0.5) * 20
    const rotateX = (0.5 - y / rect.height) * 20

    logo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleLogoHoverEnd = () => {
    const logo = headerRef.current?.querySelector('a')
    if (logo) {
      logo.style.transform = ''
    }
  }

  window.addEventListener('scroll', handleScroll)

  const logo = headerRef.current?.querySelector('a')
  if (logo) {
    logo.addEventListener('mousemove', handleLogoHover as EventListener)
    logo.addEventListener('mouseleave', handleLogoHoverEnd)
  }

  // Cleanup
  return () => {
    window.removeEventListener('scroll', handleScroll)
    if (logo) {
      logo.removeEventListener('mousemove', handleLogoHover as EventListener)
      logo.removeEventListener('mouseleave', handleLogoHoverEnd)
    }
  }
}
