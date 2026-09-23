import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // his pairing: a grotesk for everything, Instrument Serif for
        // headings and quotes, mono for the tiny machine bits.
        sans:  ['var(--font-grotesk)', "Space Grotesk", "system-ui", "sans-serif"],
        serif: ['var(--font-serif)', "Instrument Serif", "Georgia", "serif"],
        mono:  ['var(--font-mono)', "JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
