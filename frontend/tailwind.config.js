/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'translateX(100%)', background: 'transparent', opacity: 0 },
          '10%': { opacity: 0 },
          '100%': { transform: 'translateX(0%)', background: 'rgb(204, 251, 241)', opacity: 1} }
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards'
      }
    },
  },
  plugins: [],
}