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
        cyber: {
          bg: '#08090d',
          dark: '#0e1118',
          card: 'rgba(15, 20, 31, 0.75)',
          border: 'rgba(45, 55, 75, 0.5)',
          green: '#00ff9d',
          'green-glow': '#00ff9d44',
          purple: '#a855f7',
          'purple-glow': '#a855f744',
          cyan: '#00f0ff',
          'cyan-glow': '#00f0ff44',
          amber: '#fbbf24',
          red: '#ff3366',
        }
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        chakra: ['"Chakra Petch"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 15px rgba(0, 255, 157, 0.4), 0 0 30px rgba(0, 255, 157, 0.15)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.4), 0 0 30px rgba(168, 85, 247, 0.15)',
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 240, 255, 0.15)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 2s infinite',
        'scanline': 'scanline 6s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
