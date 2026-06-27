/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#fde2e8',
        rose: '#f9a8b8',
        lavender: '#e8d5f5',
        softpurple: '#d4a5e5',
        softred: '#f87171',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-4deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-4deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'scale(1.02)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(236,72,153,0.4), 0 0 20px rgba(168,85,247,0.2)' },
          '50%': { boxShadow: '0 0 16px rgba(236,72,153,0.6), 0 0 36px rgba(168,85,247,0.4)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        fadeOut: 'fadeOut 0.6s ease-in forwards',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      },
      fontFamily: {
        handwritten: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
