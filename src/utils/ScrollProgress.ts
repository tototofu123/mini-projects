/**
 * Scroll progress tracking
 */

export class ScrollProgress {
  progress: number = 0
  percentages: Map<string, number> = new Map()

  constructor() {
    window.addEventListener('scroll', this.update.bind(this))
  }

  update() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    this.progress = window.scrollY / scrollHeight
    this.percentages.set('hero', 0) // 0-20%
    this.percentages.set('about', 0.2) // 20-40%
    this.percentages.set('projects', 0.4) // 40-70%
    this.percentages.set('skills', 0.7) // 70-90%
    this.percentages.set('contact', 0.9) // 90-98%
    this.percentages.set('footer', 0.98) // 98-100%
  }

  isInSection(section: string): boolean {
    const start = this.percentages.get(section) ?? 0
    const end = Array.from(this.percentages.values())[
      Array.from(this.percentages.keys()).indexOf(section) + 1
    ] ?? 1
    return this.progress >= start && this.progress < end
  }

  destroy() {
    window.removeEventListener('scroll', this.update.bind(this))
  }
}
