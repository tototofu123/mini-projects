/**
 * Mouse tracking utilities
 */

export interface MousePosition {
  x: number
  y: number
  vx: number
  vy: number
}

export class MouseTracker {
  position: MousePosition = { x: 0, y: 0, vx: 0, vy: 0 }
  previousX: number = 0
  previousY: number = 0

  constructor() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  private onMouseMove(e: MouseEvent) {
    this.previousX = this.position.x
    this.previousY = this.position.y

    this.position.x = e.clientX
    this.position.y = e.clientY
    this.position.vx = this.position.x - this.previousX
    this.position.vy = this.position.y - this.previousY
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this))
  }
}
