/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                compact: "#081004",
                primary: "#6ec841",
                secondary_: "8cde96",
                accent_: "71d68a",
                dark_compact: "#f3fbef",
                dark_primary: "#64be37",
                dark_secondary: "21732b",
                dark_accent: "298e43",
            },
            fontFamily: {
                source_serif: ['"Source Serif 4"', "serif"],
                inter: ["Inter", "sans-serif"],
                manrope: ["Manrope", "sans-serif"],
            },
        },
    },
    plugins: [],
};
