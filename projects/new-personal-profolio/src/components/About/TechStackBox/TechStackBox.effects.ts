export const setupBoxMelt = (boxElement: HTMLDivElement) => {
  if (boxElement.classList.contains('melting')) return

  boxElement.classList.add('melting')
  boxElement.style.borderColor = '#F97316'
  boxElement.style.boxShadow = '0 0 25px rgba(249, 115, 22, 0.75)'
  
  // Randomize border-radius to mimic liquid melting
  const meltInterval = setInterval(() => {
    const r1 = Math.floor(Math.random() * 40 + 10)
    const r2 = Math.floor(Math.random() * 40 + 10)
    const r3 = Math.floor(Math.random() * 40 + 10)
    const r4 = Math.floor(Math.random() * 40 + 10)
    boxElement.style.borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r3}% ${100 - r4}%`
  }, 80)

  setTimeout(() => {
    clearInterval(meltInterval)
    boxElement.classList.remove('melting')
    // Smoothly transition back to original rounded borders
    boxElement.style.borderRadius = '16px'
    boxElement.style.borderColor = '#1E293B'
    boxElement.style.boxShadow = 'none'
  }, 1500)
}
