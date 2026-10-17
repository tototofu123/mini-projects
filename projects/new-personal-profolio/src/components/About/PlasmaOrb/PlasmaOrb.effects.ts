interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  color: string
  speed: number
  angle: number
  orbitRadius: number
}

export const initPlasmaOrbPhysics = (
  canvas: HTMLCanvasElement,
  onSparkTrigger?: (x: number, y: number) => void
) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  let animationFrameId: number
  const particles: Particle[] = []
  const maxParticles = 65

  // Sizing Canvas
  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Initialize Core Particles
  const createParticle = (isExplosion = false, exX = 0, exY = 0): Particle => {
    const w = canvas.width / window.devicePixelRatio
    const h = canvas.height / window.devicePixelRatio
    const centerX = w / 2
    const centerY = h / 2

    const angle = Math.random() * Math.PI * 2
    const orbitRadius = isExplosion ? 5 : Math.random() * 60 + 10

    return {
      x: isExplosion ? exX : centerX + Math.cos(angle) * orbitRadius,
      y: isExplosion ? exY : centerY + Math.sin(angle) * orbitRadius,
      vx: isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.5,
      vy: isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.5,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.4 ? '#F97316' : '#FCD34D', // Orange and Warm Gold
      speed: Math.random() * 0.02 + 0.005,
      angle,
      orbitRadius,
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle())
  }

  let mouseX = 0
  let mouseY = 0
  let isHovered = false

  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  }

  const handleMouseEnter = () => {
    isHovered = true
  }

  const handleMouseLeave = () => {
    isHovered = false
  }

  const handleClick = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    // Trigger visual sparks/explosion particles
    for (let i = 0; i < 40; i++) {
      particles.push(createParticle(true, clickX, clickY))
    }

    if (onSparkTrigger) {
      onSparkTrigger(e.clientX, e.clientY)
    }
  }

  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseenter', handleMouseEnter)
  canvas.addEventListener('mouseleave', handleMouseLeave)
  canvas.addEventListener('click', handleClick)

  const drawLoop = () => {
    const w = canvas.width / window.devicePixelRatio
    const h = canvas.height / window.devicePixelRatio
    const centerX = w / 2
    const centerY = h / 2

    ctx.clearRect(0, 0, w, h)

    // Render Ambient Plasma Core Glow
    const glowGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      90
    )
    glowGradient.addColorStop(0, 'rgba(249, 115, 22, 0.25)')
    glowGradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.08)')
    glowGradient.addColorStop(1, 'rgba(249, 115, 22, 0)')
    ctx.fillStyle = glowGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, 90, 0, Math.PI * 2)
    ctx.fill()

    // Update and Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]

      if (p.vx !== 0 || p.vy !== 0) {
        // Explosion particles
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.95
        p.vy *= 0.95
        p.alpha -= 0.015

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }
      } else {
        // Core orbiting particles
        p.angle += p.speed
        
        let targetOrbitRadius = p.orbitRadius
        if (isHovered) {
          // Draw towards mouse coordinates
          const dx = mouseX - centerX
          const dy = mouseY - centerY
          const targetAngle = Math.atan2(dy, dx)
          p.angle += (targetAngle - p.angle) * 0.03
          targetOrbitRadius = Math.max(10, p.orbitRadius - 15)
        }

        p.x = centerX + Math.cos(p.angle) * targetOrbitRadius
        p.y = centerY + Math.sin(p.angle) * targetOrbitRadius

        // Subtle alpha breathing
        p.alpha += (Math.random() - 0.5) * 0.05
        p.alpha = Math.max(0.3, Math.min(1, p.alpha))
      }

      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.shadowBlur = 10
      ctx.shadowColor = p.color
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // Refill standard particles if below core capacity
    while (particles.filter(p => p.vx === 0 && p.vy === 0).length < maxParticles) {
      particles.push(createParticle())
    }

    animationFrameId = requestAnimationFrame(drawLoop)
  }

  animationFrameId = requestAnimationFrame(drawLoop)

  return () => {
    window.removeEventListener('resize', resizeCanvas)
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mouseenter', handleMouseEnter)
    canvas.removeEventListener('mouseleave', handleMouseLeave)
    canvas.removeEventListener('click', handleClick)
    cancelAnimationFrame(animationFrameId)
  }
}
