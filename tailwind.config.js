/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0908",
          900: "#100e0c",
          800: "#1a1714",
          700: "#252019",
          600: "#332c22",
        },
        parchment: {
          50: "#faf6ee",
          100: "#f5efe2",
          200: "#ebe3d0",
          300: "#d9cfb8",
          400: "#c4b89a",
          500: "#a89c7d",
          600: "#8a7e62",
        },
        bronze: {
          400: "#c9a96a",
          500: "#b8945a",
          600: "#a07d44",
          700: "#836533",
          800: "#5c4522",
          900: "#3a2b13",
          950: "#1e1609",
        },
        gold: {
          300: "#f0d080",
          400: "#e8c060",
          500: "#d4a843",
          600: "#b8902e",
          700: "#9a7620",
        },
        marble: {
          900: "#141210",
          800: "#1c1916",
          700: "#252119",
        },
        walnut: {
          900: "#0e0b07",
          800: "#1a140d",
          700: "#251d12",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"EB Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.25em",
        museum: "0.4em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-delayed": "fadeInUp 0.8s ease-out forwards",
        spotlight: "spotlight 3s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        "progress-fill": "progressFill 4.5s ease-out forwards",
        "scan-line": "scanLine 2s ease-in-out infinite",
        "float-dust": "floatDust 8s ease-in-out infinite",
        "float-dust-slow": "floatDust 14s ease-in-out infinite",
        "ambient-flicker": "ambientFlicker 4s ease-in-out infinite alternate",
        "ticker-scroll": "tickerScroll 28s linear infinite",
        "dial-sweep": "dialSweep 1.2s ease-out forwards",
        "plaque-reveal": "plaqueReveal 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spotlight: {
          "0%": { opacity: "0.3", transform: "translateY(-10px) scale(1)" },
          "100%": { opacity: "0.6", transform: "translateY(10px) scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        scanLine: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(20px)", opacity: "0.8" },
        },
        floatDust: {
          "0%": { transform: "translateY(0px) translateX(0px)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "0.6" },
          "100%": { transform: "translateY(-120px) translateX(30px)", opacity: "0" },
        },
        ambientFlicker: {
          "0%": { opacity: "0.4" },
          "40%": { opacity: "0.7" },
          "70%": { opacity: "0.5" },
          "100%": { opacity: "0.8" },
        },
        tickerScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        dialSweep: {
          "0%": { transform: "rotate(-90deg)" },
          "100%": { transform: "rotate(var(--dial-deg))" },
        },
        plaqueReveal: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 8px rgba(201,169,106,0.2)" },
          "100%": { boxShadow: "0 0 24px rgba(201,169,106,0.5), 0 0 48px rgba(201,169,106,0.15)" },
        },
      },
    },
  },
  plugins: [],
};
