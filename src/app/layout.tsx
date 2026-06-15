import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Caveat } from "next/font/google";
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

// (signature is drawn as an SVG path in the same hand-drawn language
// as the rest of the page — doodles, project art, diagrams. No font
// needed for the signature.)

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
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${hand.variable}`}
    >
      <body className="font-serif text-ink">{children}</body>
    </html>
  );
}
