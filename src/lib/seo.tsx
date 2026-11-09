// Search and sharing: each page gets its own canonical address, title,
// description and share url (pages used to inherit the home page's), and
// pages say who and what they are in structured data (JSON-LD).

import type { Metadata } from "next";
import { profile, socials, products } from "@/lib/data";

export const SITE = "https://www.srivtx.xyz";
const RSS = { "application/rss+xml": "/writing/rss.xml" };

// the line search results show under the name; the tagline stays as written
export const SITE_DESCRIPTION = `${profile.name} (srivtx) — ${profile.tagline.join(
  " · ",
)}. Understands systems in detail, builds things with them, and writes about the frontier and the state of thinking.`;

export function pageMeta(path: string, title: string | null, description: string, type: "website" | "article" = "website"): Metadata {
  const full = title ? `${title} — ${profile.name}` : `${profile.name} — srivtx`;
  return {
    title: full,
    description,
    alternates: { canonical: path, types: RSS },
    openGraph: { title: full, description, url: path, siteName: "srivtx", type },
    twitter: { card: "summary_large_image", title: full, description },
  };
}

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: profile.name,
  alternateName: profile.handle,
  url: `${SITE}/`,
  image: `${SITE}/pfp.jpg`,
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Bhubaneswar", addressCountry: "IN" },
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export const homeLd = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    { "@type": "WebSite", "@id": `${SITE}/#site`, url: `${SITE}/`, name: "srivtx", author: { "@id": `${SITE}/#person` } },
  ],
};

export function essayLd(e: { slug: string; title: string; dek: string; date: string; topic: string }) {
  const url = `${SITE}/writing/${e.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: e.title,
    description: e.dek,
    datePublished: e.date,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    keywords: e.topic,
    author: person,
  };
}

export const workLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Work by ${profile.name}`,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "WebApplication",
      name: p.name,
      url: p.href,
      description: `${p.line}. ${p.one}`,
      applicationCategory: p.chips[0],
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${SITE}/#person` },
    },
  })),
};

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // structured data is built from our own constants, never user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
