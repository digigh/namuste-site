import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        green: {
          deep: "#0F4C3A",
          fresh: "#4CAF50",
          leaf: "#8BC34A",
        },
        yellow: {
          sun: "#FFC107",
        },
        soil: "#8D6E63",
        natural: "#F5F7F4",
        "text-dark": "#1F2D2A",
        "text-light": "#6B7C78",
      },
      animation: {
        "float": "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite 1s",
        "scan": "scan-line 2.5s ease-in-out infinite alternate",
        "spin-slow": "spin-slow 20s linear infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "scan-line": {
          "0%": { top: "8%" },
          "100%": { top: "88%" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
