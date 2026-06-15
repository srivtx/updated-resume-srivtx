import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Caveat, Allura } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

// The hand — this is the voice of the page. Caveat is a clean handwriting
// font that reads at small sizes, has the right amount of slant, and doesn't
// try to be a calligraphic display face.
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "500", "600"],
  display: "swap",
});

// A real signature font. Allura is a calligraphic signature style — the
// kind you'd see on a notarized document or a CEO's signature. Used
// ONLY for the page-closing signature in the footer. No uppercase, no
// small-caps — it's letterforms designed to be read as a flowing name.
const signature = Allura({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sribatsha Dash — lab journal",
  description: "engineer, polymath, builds on the bench. ex-goquant.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${hand.variable} ${signature.variable}`}
    >
      <body className="font-serif text-ink">{children}</body>
    </html>
  );
}
