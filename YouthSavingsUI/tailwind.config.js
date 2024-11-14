/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },

  theme: {
    extend: {
      screens,
      fontSize,
      fontFamily: {
        "font-Arial": ["Arial"],
      },
      backgroundImage: {
        primary: "stone-900",
        "golden-gradient":
          "linear-gradient(to left, hsl(45, 100%, 40%), hsl(45, 100%, 60%))",
      },
      colors: {
        highlight: {
          dark: "#FFBA08",
          DEFAULT: "hsl(47, 95%, 47%)",
        },
        golden: {
          DEFAULT: "hsl(45, 100%, 50%)", // Adjust as needed
          light: "hsl(45, 100%, 60%)",
          dark: "hsl(45, 100%, 40%)",
        },
      },
      textShadow: {
        lg: "0 0 8px rgba(0,0,0,0.5)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },

      aspectRatio: {
        "16/1": "16 / 1",
        "18/1": "18 / 1",
        "28/1": "28 / 1",
      },
    },
  },
  plugins: [
    fluid,
    require("tailwindcss-animated"),
    require("tailwindcss-textshadow"),
  ],
};
