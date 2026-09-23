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
        // RGB triplet vars (see globals.css) so dark mode can retint them
        // and opacity modifiers like bg-paper/40 keep working.
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)",
          soft:    "rgb(var(--paper-soft) / <alpha-value>)",
          deep:    "rgb(var(--paper-deep) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft:    "rgb(var(--ink-soft) / <alpha-value>)",
          mute:    "rgb(var(--ink-mute) / <alpha-value>)",
          faint:   "rgb(var(--ink-faint) / <alpha-value>)",
        },
        rule: {
          DEFAULT: "rgb(var(--rule) / <alpha-value>)",
          soft:    "rgb(var(--rule-soft) / <alpha-value>)",
        },
        grid: {
          DEFAULT: "rgb(var(--grid) / <alpha-value>)",
          faint:   "rgb(var(--grid-faint) / <alpha-value>)",
        },
        graphite: { DEFAULT: "rgb(var(--graphite) / <alpha-value>)", soft: "rgb(var(--graphite-soft) / <alpha-value>)" },
        sepia:    { DEFAULT: "rgb(var(--sepia) / <alpha-value>)", soft: "rgb(var(--sepia-soft) / <alpha-value>)" },
        moss:     "rgb(var(--moss) / <alpha-value>)",
        rust:     "rgb(var(--rust) / <alpha-value>)",
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
