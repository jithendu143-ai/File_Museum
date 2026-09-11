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
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"EB Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-delayed": "fadeInUp 0.8s ease-out forwards",
        "spotlight": "spotlight 3s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
        "progress-fill": "progressFill 4.5s ease-out forwards",
        "scan-line": "scanLine 2s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};
