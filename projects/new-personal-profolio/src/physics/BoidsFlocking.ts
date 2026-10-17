/**
 * Boids Flocking Algorithm
 * Implements separation, alignment, cohesion, and reef orbit mechanics
 */

export interface Boid {
  x: number
  y: number
  vx: number
  vy: number
  ax: number
  ay: number
}

export class BoidsFlockingSystem {
  boids: Boid[] = []
  separation: number = 25
  alignment: number = 0.05
  cohesion: number = 0.05
  maxSpeed: number = 4
  reefs: Array<{ x: number; y: number; radius: number }> = []

  addBoid(boid: Boid) {
    this.boids.push(boid)
  }

  addReef(x: number, y: number, radius: number) {
    this.reefs.push({ x, y, radius })
  }

  update() {
    for (let i = 0; i < this.boids.length; i++) {
      const boid = this.boids[i]

      // Reset acceleration
      boid.ax = 0
      boid.ay = 0

      // Separation
      this.applySeparation(boid, i)

      // Alignment
      this.applyAlignment(boid, i)

      // Cohesion
      this.applyCohesion(boid, i)

      // Reef orbit
      this.applyReefOrbit(boid)

      // Limit speed
      const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy)
      if (speed > this.maxSpeed) {
        boid.vx = (boid.vx / speed) * this.maxSpeed
        boid.vy = (boid.vy / speed) * this.maxSpeed
      }

      // Update velocity
      boid.vx += boid.ax
      boid.vy += boid.ay

      // Update position
      boid.x += boid.vx
      boid.y += boid.vy
    }
  }

  private applySeparation(boid: Boid, index: number) {
    let count = 0
    for (let i = 0; i < this.boids.length; i++) {
      if (i === index) continue
      const other = this.boids[i]
      const d = Math.sqrt((boid.x - other.x) ** 2 + (boid.y - other.y) ** 2)
      if (d < this.separation && d > 0) {
        boid.ax += (boid.x - other.x) / d
        boid.ay += (boid.y - other.y) / d
        count++
      }
    }
    if (count > 0) {
      boid.ax /= count
      boid.ay /= count
    }
  }

  private applyAlignment(boid: Boid, index: number) {
    let count = 0
    let avgVx = 0
    let avgVy = 0
    for (let i = 0; i < this.boids.length; i++) {
      if (i === index) continue
      const other = this.boids[i]
      const d = Math.sqrt((boid.x - other.x) ** 2 + (boid.y - other.y) ** 2)
      if (d < 50) {
        avgVx += other.vx
        avgVy += other.vy
        count++
      }
    }
    if (count > 0) {
      avgVx /= count
      avgVy /= count
      boid.ax += (avgVx - boid.vx) * this.alignment
      boid.ay += (avgVy - boid.vy) * this.alignment
    }
  }

  private applyCohesion(boid: Boid, index: number) {
    let count = 0
    let centerX = 0
    let centerY = 0
    for (let i = 0; i < this.boids.length; i++) {
      if (i === index) continue
      const other = this.boids[i]
      const d = Math.sqrt((boid.x - other.x) ** 2 + (boid.y - other.y) ** 2)
      if (d < 50) {
        centerX += other.x
        centerY += other.y
        count++
      }
    }
    if (count > 0) {
      centerX /= count
      centerY /= count
      boid.ax += (centerX - boid.x) * this.cohesion
      boid.ay += (centerY - boid.y) * this.cohesion
    }
  }

  private applyReefOrbit(boid: Boid) {
    // Boids orbit around reefs using steering behavior
    for (const reef of this.reefs) {
      const d = Math.sqrt((boid.x - reef.x) ** 2 + (boid.y - reef.y) ** 2)
      if (d < reef.radius + 100 && d > reef.radius) {
        // Steer toward orbit position
        const targetDist = reef.radius
        const dir = Math.atan2(boid.y - reef.y, boid.x - reef.x)
        const targetX = reef.x + Math.cos(dir) * targetDist
        const targetY = reef.y + Math.sin(dir) * targetDist
        boid.ax += (targetX - boid.x) * 0.01
        boid.ay += (targetY - boid.y) * 0.01
      }
    }
  }
}
