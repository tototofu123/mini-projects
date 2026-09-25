/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chassis-bg': '#0B0F19',
        'surface-card': '#111827',
        'surface-card-hover': '#1F2937',
        'deep-slate': '#0F172A',
        'slate-border': '#1E293B',
        'slate-border-light': '#334155',
        'slate-500': '#64748B',
        'slate-400': '#94A3B8',
        'slate-100': '#F8FAFC',
        'slate-50': '#F1F5F9',
        'orange-accent': '#F97316',
        'orange-glow': 'rgba(249, 115, 22, 0.25)',
        'cyan-signal': '#38BDF8',
        'green-signal': '#4ADE80',
        'amber': '#FCD34D',
        'indigo-deep': '#0A1128',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
