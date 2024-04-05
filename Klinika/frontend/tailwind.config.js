/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        compact: "#081004",
        primary: "#6ec841",
        secondary: "8cde96",
        accent: "71d68a",
        dark_compact: "#f3fbef",
        dark_primary: "#64be37",
        dark_secondary: "21732b",
        dark_accent: "298e43",
      },
    },
  },
  plugins: [],
};
