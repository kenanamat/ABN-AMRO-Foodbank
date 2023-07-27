/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#376d6b",
        "primary-hover": "#42807a",
        secondary: "#f5d546",
        "secondary-hover": "#dfc24c",
        bg: "#011628",
      },
    },
  },
  plugins: [],
}
