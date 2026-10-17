// ─── Vector helpers operating on Float32Array entries ────────────────────────

export function clampMagnitude(vx: number, vy: number, min: number, max: number): [number, number] {
    const magSq = vx * vx + vy * vy
    if (magSq === 0) return [min, 0]
    const mag = Math.sqrt(magSq)
    if (mag < min) {
        const s = min / mag
        return [vx * s, vy * s]
    }
    if (mag > max) {
        const s = max / mag
        return [vx * s, vy * s]
    }
    return [vx, vy]
}

export function normalize(vx: number, vy: number): [number, number] {
    const mag = Math.sqrt(vx * vx + vy * vy)
    if (mag === 0) return [0, 0]
    return [vx / mag, vy / mag]
}

export function wrapEdge(
    x: number,
    y: number,
    halfW: number,
    halfH: number,
): [number, number] {
    let nx = x
    let ny = y
    if (nx > halfW) nx = -halfW
    else if (nx < -halfW) nx = halfW
    if (ny > halfH) ny = -halfH
    else if (ny < -halfH) ny = halfH
    return [nx, ny]
}

export function randomRange(min: number, max: number): number {
    return min + Math.random() * (max - min)
}

// ─── Color utilities ──────────────────────────────────────────────────────────

export function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b]
}

export function lerpColor(
    c1: [number, number, number],
    c2: [number, number, number],
    t: number,
): [number, number, number] {
    const tc = Math.max(0, Math.min(1, t))
    return [
        c1[0] + (c2[0] - c1[0]) * tc,
        c1[1] + (c2[1] - c1[1]) * tc,
        c1[2] + (c2[2] - c1[2]) * tc,
    ]
}

// Hue-shift color by velocity magnitude (0..1)
export function velocityColor(
    speed: number,
    minSpeed: number,
    maxSpeed: number,
    primary: [number, number, number],
    secondary: [number, number, number],
): [number, number, number] {
    const t = (speed - minSpeed) / Math.max(maxSpeed - minSpeed, 0.001)
    return lerpColor(primary, secondary, t)
}

// Color by heading angle (0..2π mapped to palette)
export function angleColor(
    vx: number,
    vy: number,
    primary: [number, number, number],
    secondary: [number, number, number],
): [number, number, number] {
    const angle = Math.atan2(vy, vx) // -π to π
    const t = (angle + Math.PI) / (2 * Math.PI) // 0 to 1
    return lerpColor(primary, secondary, t)
}
