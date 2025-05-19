/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TTNormsPro", "sans-serif"],
      },
      screens: {
        xs: { max: "400px" },
      },
      keyframes: {
        marqueeFull: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "marquee-full": "marqueeFull 1s linear infinite",
      },
    },
    fontSize: {
      base: "1rem",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
