import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.srivtx.xyz"),
  alternates: { types: { "application/rss+xml": "/writing/rss.xml" } },
  title: "Sribatsha Dash — srivtx",
  description:
    "goquant engineer · freelance / ai engineer · builds tulip labs, morphotype, deriva & deepforge.",
  openGraph: {
    title: "Sribatsha Dash — srivtx",
    description:
      "goquant engineer · freelance / ai engineer · builds tulip labs, morphotype, deriva & deepforge.",
    url: "https://www.srivtx.xyz",
    siteName: "srivtx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sribatsha Dash — srivtx",
    description:
      "goquant engineer · freelance / ai engineer · builds tulip labs, morphotype, deriva & deepforge.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* set the theme before first paint — no flash of the wrong page */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans bg-white dark:bg-zinc-900 text-black dark:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
