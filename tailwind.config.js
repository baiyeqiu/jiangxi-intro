/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
    },
    extend: {
      colors: {
        // 江西特色配色体系
        jiangxi: {
          green: "#1a5f4a",
          "green-light": "#2d8a6a",
          "green-dark": "#0f3d2e",
          red: "#c23a3a",
          "red-light": "#e05555",
          cream: "#f5f0e8",
          ink: "#4a4a4a",
          "ink-light": "#6b6b6b",
          gold: "#c9a962",
        },
      },
      fontFamily: {
        display: ['"LXGW WenKai"', '"Noto Serif SC"', "serif"],
        body: ['"Noto Sans SC"', '"Source Han Sans CN"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "brush-stroke": "brushStroke 1.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        brushStroke: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      backgroundImage: {
        "ink-gradient":
          "linear-gradient(135deg, #f5f0e8 0%, #ebe4d4 50%, #f0e8d8 100%)",
        "hero-overlay":
          "linear-gradient(to bottom, rgba(15,61,46,0.7) 0%, rgba(26,95,74,0.5) 50%, rgba(245,240,232,0.95) 100%)",
      },
    },
  },
  plugins: [],
};
