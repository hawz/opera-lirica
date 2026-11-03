/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        'bg-2': 'rgb(var(--color-bg-2) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-dim': 'rgb(var(--color-text-dim) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-light': 'rgb(var(--color-accent-light) / <alpha-value>)',
        'accent-2': 'rgb(var(--color-accent-2) / <alpha-value>)',
        'accent-2-light': 'rgb(var(--color-accent-2-light) / <alpha-value>)',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
}
