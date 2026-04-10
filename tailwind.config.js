/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#00C2A8',
        dark: {
          DEFAULT: '#1A1A1A',
          card: '#111111',
          border: '#2a2a2a',
        },
        versat: {
          black: '#1A1A1A',
          gray: '#4A4A4A',
          accent: '#00C2A8',
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}