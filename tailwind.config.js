/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sp': {'max': '523px'},
        'pc': {'min': '524px'},
      },
      borderColor: {
        "app-blue": "#00008b",
      },
      backgroundColor: {
        "app-light-blue": "#60687a",
        "app-blue": "#00008b",
        "app-dark-blue": "#2f3542",
        "app-white": "#f2f2f2",
      },
      colors: {
        "app-blue": "#00008b",
      },
    },
  },
  plugins: [],
}

