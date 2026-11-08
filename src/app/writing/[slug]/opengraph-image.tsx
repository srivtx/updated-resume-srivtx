// The share card for an essay: its cover, drawn the same way as on the
// site — the rose panel with the reduction mark, the title in serif on
// the deep panel.

import { ImageResponse } from "next/og";
import { essays, formatDate, getEssay } from "@/lib/writing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "essay by sribatsha dash";

export function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

async function serif(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Instrument+Serif")).text();
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const e = getEssay(params.slug);
  const font = await serif();
  const cells = Array.from({ length: 16 }, (_, i) => i);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#36101b" }}>
        <div style={{ width: 504, height: "100%", background: "#d63e5f", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 4 * 52 + 3 * 22, gap: 22 }}>
            {cells.map((i) => (
              <div key={i} style={{ width: 52, height: 52, background: "white", opacity: i % 4 === 1 ? 1 : 0.22 }} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px" }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)", letterSpacing: 1 }}>srivtx · essay</div>
          <div style={{ fontSize: 84, lineHeight: 1.02, color: "white", fontFamily: font ? "Instrument Serif" : undefined }}>
            {e?.title ?? "writing"}
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)" }}>{e ? formatDate(e.date) : ""}</div>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Instrument Serif", data: font, style: "normal", weight: 400 }] : [] },
  );
}
