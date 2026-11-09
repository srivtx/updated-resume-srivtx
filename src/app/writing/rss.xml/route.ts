// The essays as an RSS feed, so people can follow new writing in their
// reader. Full text is included; the drawn figures stay on the site.

import { essays } from "@/lib/writing";

const SITE = "https://www.srivtx.xyz";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = [...essays]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((e) => {
      const url = `${SITE}/writing/${e.slug}`;
      const body =
        e.blocks
          .map((b) =>
            b.kind === "p"
              ? `<p>${esc(b.text).replace(/==(.+?)==/g, "<mark>$1</mark>")}</p>`
              : `<p><em>(a drawn figure — <a href="${url}">see it on the site</a>)</em></p>`,
          )
          .join("") + (e.signature ? `<p>${esc(e.signature)}</p>` : "");
      return `    <item>
      <title>${esc(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(e.date + "T12:00:00Z").toUTCString()}</pubDate>
      <category>${esc(e.topic)}</category>
      <description>${esc(e.dek)}</description>
      <content:encoded><![CDATA[${body}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>srivtx — writing</title>
    <link>${SITE}/writing</link>
    <atom:link href="${SITE}/writing/rss.xml" rel="self" type="application/rss+xml" />
    <description>Essays by Sribatsha Dash on how things work, the frontier, and the state of thinking.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
