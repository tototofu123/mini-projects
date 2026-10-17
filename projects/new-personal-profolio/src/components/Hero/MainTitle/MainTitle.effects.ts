export const setupMainTitleEffects = () => {
  // Parallax scroll effect
  const handleScroll = () => {
    // Implement parallax
  }

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}
