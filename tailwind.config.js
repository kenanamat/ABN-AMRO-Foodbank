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
        "dark-green": "#234343",
        "black-green": "#152828",
        "abn-gray": "#939393",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
