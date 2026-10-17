import { SpringPhysicsEngine, SpringBody } from '../../../physics/SpringPhysics'

export const setupPhysicsManagerEffects = (
  cards: SpringBody[],
  onUpdate: (bodies: Map<string, SpringBody>) => void
) => {
  const engine = new SpringPhysicsEngine()
  
  // Custom coefficients for high performance and smooth spring oscillations
  engine.gravity = 0.15

  cards.forEach((card) => {
    engine.addBody({ ...card })
  })

  let lastMouseX = 0
  let lastTime = Date.now()
  let animationFrameId: number

  const handleMouseMove = (e: MouseEvent) => {
    const now = Date.now()
    const dt = now - lastTime
    if (dt > 0) {
      const vx = (e.clientX - lastMouseX) / dt
      // Feed wind velocity into the physics engine
      engine.windForce = Math.max(Math.min(vx * 0.4, 8), -8)
    }
    lastMouseX = e.clientX
    lastTime = now
  }

  // Physics loop inside requestAnimationFrame
  const updateLoop = () => {
    engine.update(0.016)
    onUpdate(new Map(engine.bodies))

    // Wind decay
    engine.windForce *= 0.92

    animationFrameId = requestAnimationFrame(updateLoop)
  }

  window.addEventListener('mousemove', handleMouseMove)
  animationFrameId = requestAnimationFrame(updateLoop)

  return {
    spawnGravityWell: (x: number, y: number) => {
      engine.clearGravityWells()
      // Create gravity well with customizable strength
      engine.addGravityWell(x, y, 650)
    },
    clearWells: () => {
      engine.clearGravityWells()
    },
    cleanup: () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    },
  }
}
