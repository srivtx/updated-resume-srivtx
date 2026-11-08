// The reading face for essays. Newsreader is drawn for long text on
// screens (it has optical sizes), and sits well beside Instrument Serif,
// which stays for titles. Loaded only by the /writing routes.

import { Newsreader } from "next/font/google";

export const reading = Newsreader({
  subsets: ["latin"],
  variable: "--font-reading",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  // next/font has no fallback metrics for Newsreader; Georgia is close
  // enough, and this keeps the build quiet
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});
