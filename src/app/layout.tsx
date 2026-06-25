import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif, Caveat, Saira } from "next/font/google";
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

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "500", "600"],
  display: "swap",
});

// The name — bold sans-serif, Mitchell-style authority.
// Saira at 800 weight = the closest free match to Nimbus Sans Extended.
const display = Saira({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sribatsha Dash — lab journal",
  description: "engineer, polymath, builds on the bench. ex-goquant.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${hand.variable} ${display.variable}`}
    >
      <body className="font-serif text-ink">{children}</body>
    </html>
  );
}
