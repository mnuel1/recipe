/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["DM Serif Display", "serif"],
    },
    colors: {
      black: "#252525",
      gray: "#717171",
      gray200: "#d9dcdc",
      white200: "#f3f3f5",
      green: "#607917",
      green200: "#00f700",
      yellow: "#f6b933",
      red: "#e3242b",
    },
    extend: {},
  },
  plugins: [],
};
