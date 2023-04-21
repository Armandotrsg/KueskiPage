/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        decrease: "decrease 3.5s normal ease-out 1"
      },
      keyframes: {
        decrease: {
          '0%': { width: '100%' },
          '100%': { width: '0%' }
        }
      }
    },
  },
  plugins: [],
}