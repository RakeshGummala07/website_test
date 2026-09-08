/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: {
          950: "#07070A",
          900: "#0B0B10",
          850: "#101016",
          800: "#15151C",
          700: "#1E1E27",
          600: "#2B2B36",
          500: "#3D3D4A",
        },
        ink: {
          100: "#F5F5F7",
          200: "#E4E4E9",
          300: "#C7C7D1",
          400: "#9C9CAA",
          500: "#75758A",
        },
        violet: {
          400: "#8B7CF6",
          500: "#7C5CFC",
          600: "#6941E8",
          700: "#5531C9",
        },
        magenta: {
          400: "#E469D6",
          500: "#D63FC4",
          600: "#B928A8",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "aurora-1": "radial-gradient(60% 60% at 20% 20%, rgba(124,92,252,0.28), transparent 70%)",
        "aurora-2": "radial-gradient(50% 50% at 80% 30%, rgba(214,63,196,0.22), transparent 70%)",
        "grid-fine": "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(115deg, #6941E8 0%, #8B5CF6 35%, #D63FC4 75%, #E469D6 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,124,246,0.15), 0 8px 40px -8px rgba(139,92,246,0.35)",
        "glow-sm": "0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px -4px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
