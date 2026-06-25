import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#f1ece1",
          soft:    "#f7f3e9",
          deep:    "#e8e1d1",
        },
        ink: {
          DEFAULT: "#2a2620",
          soft:    "#4a4238",
          mute:    "#756c5a",
          faint:   "#9b917d",
        },
        rule: {
          DEFAULT: "#c2b89f",
          soft:    "#d4cdb9",
        },
        grid: {
          DEFAULT: "#c8bfa9",
          faint:   "#d8d0bd",
        },
        graphite: { DEFAULT: "#3a4654", soft: "#5a6676" },
        sepia:    { DEFAULT: "#8a5a2a", soft: "#a07a3a" },
        moss:     "#4a5d3a",
        rust:     "#8a4a2a",
      },
      fontFamily: {
        // Lab journal stack:
        //  - hand: for scrawled labels, dates, the "name", margin notes
        //  - serif: the body of a "typed" lab entry, formal but warm
        //  - sans: UI text, very small
        //  - mono: terminal / code / IDs
        hand:  ['var(--font-hand)', "Caveat", "Patrick Hand", "Bradley Hand", "cursive"],
        serif: ['var(--font-serif)', "Charter", "Georgia", "serif"],
        sans:  ['var(--font-sans)', "Inter", "system-ui", "sans-serif"],
        mono:    ['var(--font-mono)', "JetBrains Mono", "ui-monospace", "monospace"],
        display: ['var(--font-display)', "Saira", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        wide2:    "0.08em",
      },
      maxWidth: {
        page:   "1320px",
        margin: "240px",   // the right margin column width
        body:   "62ch",
      },
    },
  },
  plugins: [],
};
export default config;
