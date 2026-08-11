/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        loud: {
          green: '#00FF11',
          'green-glow': 'rgba(0, 255, 17, 0.35)',
          'green-dark': '#00CC0E',
          black: '#000000',
          dark: '#111111',
          card: '#1A1A1A',
          cardHover: '#222222',
          border: '#2A2A2A',
          borderActive: '#00FF11',
          textMuted: '#A0A0A0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        display: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'loud-glow': '0 0 20px rgba(0, 255, 17, 0.4)',
        'loud-glow-sm': '0 0 10px rgba(0, 255, 17, 0.25)',
        'loud-button': '0 0 25px rgba(0, 255, 17, 0.6)',
      },
    },
  },
  plugins: [],
}
