/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Jost", "sans-serif"],
      },
      boxShadow: {
        primary: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
    },
  },
  plugins: [],
};
