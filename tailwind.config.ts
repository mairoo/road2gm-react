/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      // 여기서부터 추가
      fontFamily: {
        sans: ["Nanum Gothic", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      width: {
        "1/8": "12.5%",
      },
      height: {
        "1/8": "12.5%",
      },
      backgroundSize: {
        "100%": "100%",
      },
      colors: {
        "natural-1": "#ebf2ea",
        "natural-2": "#45a34a",
        "natural-3": "#f0fdee",
        "natural-4": "#c4dac2",
        'natural-5': '#00928e',
        "shade-1": "#b6bdb5",
        "shade-2": "#848a83",
        "shade-3": "#555b54",
        "shade-4": "#2a302a",
        "shade-gradient-1": "#e1ebc6",
        "shade-gradient-2": "#eadf9c",
        "shade-gradient-3": "#ffcc77",
        "generic-gradient-1": "#c0cec7",
        "generic-gradient-2": "#96aca8",
        "generic-gradient-3": "#6f8a8c",
        "generic-gradient-4": "#4c6872",
        "generic-gradient-5": "#2f4858",
        "primary-1": "#98dbf3",
        "primary-2": "#00b3ff",
        "primary-3": "#0066d2",
        "primary-4": "#004fb6",
        "danger-1": "#fd5368",
        "danger-2": "#ff7aaa",
        "danger-3": "#b10031",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
