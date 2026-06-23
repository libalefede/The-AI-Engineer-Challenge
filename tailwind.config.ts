import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent used across buttons, the user bubble, and focus rings.
        brand: {
          400: "#8b8bff",
          500: "#6366f1",
          600: "#4f46e5",
        },
      },
      keyframes: {
        // Subtle bounce for the "assistant is typing" dots.
        blink: {
          "0%, 80%, 100%": { opacity: "0.2" },
          "40%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 1.4s infinite both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
