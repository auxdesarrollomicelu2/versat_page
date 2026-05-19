/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand teal - Versat official
        accent: '#00C2A8',
        'accent-dim': '#00A893',
        'accent-deep': '#009C87',

        // Varied dark surfaces with subtle blue/teal undertones
        surface: {
          DEFAULT: '#0b1013',        // primary dark slate (not pure black)
          raised: '#111820',         // raised slightly warmer slate
          overlay: '#182128',        // elevated overlay
          border: '#253038',         // subtle border
          tinted: '#0a1418',         // teal-tinted dark
          light: '#1a242c',          // lighter slate panel
        },

        // Legacy alias (kept for compatibility)
        dark: {
          DEFAULT: '#0b1013',
          card: '#111820',
          border: '#253038',
        },
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    }
  },
  plugins: [],
}
