/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      black: "#1E1E1E",
      darker: "#2E2E2E",
      dark: "#3E3E3E",
      gray: "#626262",
      white: "#EAEAEA",
      violet: "#967CC0",
      green: "#00C9A6",
      lightblue: "#58D1DC",
      peach: "#FDCAA6",
      darkred: "#843B3B",
    },

    fontFamily: {
      sans: ["e-Ukraine", "sans-serif"],
      head: ["e-Ukraine Head", "sans-serif"],
    },
  },
  plugins: [],
};
