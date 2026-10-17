// ─── PNG Export ──────────────────────────────────────────────────────────────

export function exportPNG(canvas: HTMLCanvasElement): void {
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `boids-${Date.now()}.png`
    link.click()
}

// ─── WebM Video Export ───────────────────────────────────────────────────────

export function exportWebM(
    canvas: HTMLCanvasElement,
    durationMs: number = 5000,
): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!canvas.captureStream) {
            reject(new Error('captureStream not supported in this browser'))
            return
        }

        const stream = canvas.captureStream(60)
        const chunks: BlobPart[] = []

        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm'

        let recorder: MediaRecorder
        try {
            recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 })
        } catch {
            reject(new Error('MediaRecorder not supported'))
            return
        }

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data)
        }

        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `boids-${Date.now()}.webm`
            link.click()
            setTimeout(() => URL.revokeObjectURL(url), 1000)
            resolve()
        }

        recorder.onerror = (e) => reject(e)
        recorder.start()

        setTimeout(() => {
            if (recorder.state === 'recording') recorder.stop()
        }, durationMs)
    })
}
