/**
 * Spring Physics Engine
 * Handles tether systems, oscillation damping, wind force, and gravity well mechanics
 */

export interface SpringBody {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  anchorX: number
  anchorY: number
  mass: number
  damping: number
  stiffness: number
}

export class SpringPhysicsEngine {
  bodies: Map<string, SpringBody> = new Map()
  gravity: number = 0.5
  windForce: number = 0
  gravityWells: Array<{ x: number; y: number; strength: number }> = []

  addBody(body: SpringBody) {
    this.bodies.set(body.id, body)
  }

  update(_deltaTime: number = 0.016) {
    for (const body of this.bodies.values()) {
      // Spring force
      const dx = body.anchorX - body.x
      const dy = body.anchorY - body.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      const fx = (dx / distance) * body.stiffness * (distance - 100)
      const fy = (dy / distance) * body.stiffness * (distance - 100)

      // Gravity
      body.vy += this.gravity

      // Wind force
      body.vx += this.windForce

      // Gravity wells
      for (const well of this.gravityWells) {
        const gwx = well.x - body.x
        const gwy = well.y - body.y
        const gwDistance = Math.sqrt(gwx * gwx + gwy * gwy)
        const gwForce = well.strength / (gwDistance * gwDistance + 1)
        body.vx += (gwx / gwDistance) * gwForce
        body.vy += (gwy / gwDistance) * gwForce
      }

      // Damping
      body.vx *= body.damping
      body.vy *= body.damping

      // Apply forces
      body.vx += fx / body.mass
      body.vy += fy / body.mass

      // Update position
      body.x += body.vx
      body.y += body.vy
    }
  }

  addGravityWell(x: number, y: number, strength: number) {
    this.gravityWells.push({ x, y, strength })
  }

  clearGravityWells() {
    this.gravityWells = []
  }
}
