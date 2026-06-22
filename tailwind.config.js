/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-slate': '#0F172A',
        'slate-700': '#1E293B',
        'slate-500': '#64748B',
        'slate-400': '#94A3B8',
        'slate-100': '#F8FAFC',
        'slate-50': '#F1F5F9',
        'orange-accent': '#F97316',
        'amber': '#FCD34D',
        'indigo-deep': '#0A1128',
        'stone': '#D6D3D1',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        amarante: ['Amarante', 'cursive'],
        limelight: ['Limelight', 'cursive'],
      },
    },
  },
  plugins: [],
}
