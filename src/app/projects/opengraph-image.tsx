// The Work share card: the six product covers' bright panels, side by
// side, each with its mark — the family at a glance.

import { ImageResponse } from "next/og";
import { OG_SIZE, serifFont, fontsFor, Glyph } from "@/lib/og";
import { PRODUCT_GLYPHS } from "@/lib/glyphs";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Work — six products by Sribatsha Dash, all live";

export default async function Image() {
  const font = await serifFont();
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#18181b", padding: "56px 60px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ fontSize: 76, color: "white", fontFamily: font ? "Instrument Serif" : undefined }}>Work</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)" }}>six products, all live · srivtx.xyz</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 36 }}>
          {PRODUCT_GLYPHS.map((p) => (
            <div key={p.name} style={{ width: 340, height: 180, display: "flex", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ width: 143, background: p.bright, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Glyph rows={p.rows} cell={9} />
              </div>
              <div style={{ flex: 1, background: "#26262b", display: "flex", alignItems: "center", padding: "0 18px", fontSize: 30, color: "white", fontFamily: font ? "Instrument Serif" : undefined }}>
                {p.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: fontsFor(font) },
  );
}
