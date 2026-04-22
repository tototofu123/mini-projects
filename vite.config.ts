import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    base: '/boids-deep-sea/',
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            'three': path.resolve(__dirname, './node_modules/three')
        }
    },
    optimizeDeps: {
        include: ['three']
    }
})
