/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A2E",       // primary text
        paper: "#FFFFFF",      // page background
        cloud: "#F6F6FC",      // soft surface / section background
        line: "#EAEAF4",       // hairline borders
        indigo: "#5B4FE9",     // primary brand color
        coral: "#FF6F61",      // secondary accent
        teal: "#00C2A8",       // tertiary accent
        sun: "#FFC145",        // warm accent (ratings, highlights)
        sky: "#2D9CDB",        // info / rivers accent
        violet: "#7C5CFC",     // accent variant
        muted: "#8A8AA3",      // secondary text
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(26, 26, 46, 0.15)",
        card: "0 4px 20px -6px rgba(26, 26, 46, 0.08)",
      },
      borderRadius: {
        blob: "2rem 1rem 2rem 1rem",
      },
    },
  },
  plugins: [],
};
