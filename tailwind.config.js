/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 15s linear infinite',
        'pulse-slow': 'pulse 3s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [],
};