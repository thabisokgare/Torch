import { neutral } from 'tailwindcss/colors';

export const content = ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"];
export const darkMode = "class";
export const theme = {
  extend: {
    colors: {
      primary: "#FFC72C", // Warm yellow
      background: "#111111", // Dark background
      foreground: "#EDEDED", // Light text
      accent: {
        DEFAULT: "#FFAA00", // Bright orange accent
        dark: "#D98E00", // Darker orange for hover effects
      },
      gray: neutral, // Tailwind's neutral grays
    },
    fontFamily: {
      sans: ["Inter", "Arial", "sans-serif"], // Clean, modern font
    },
    boxShadow: {
      "soft-glow": "0px 4px 20px rgba(255, 199, 44, 0.3)", // Soft yellow glow
    },
    borderRadius: {
      "2xl": "1rem", // Rounded corners for cards/buttons
    },
  },
};
export const plugins = [];
