// The home share card, in the covers' language: a bright panel holding
// the site's one pixel, a deep panel with the name and what I do.

import { ImageResponse } from "next/og";
import { OG_SIZE, serifFont, fontsFor } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sribatsha Dash — srivtx";

export default async function Image() {
  const font = await serifFont();
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0b1f3d" }}>
        <div style={{ width: 504, height: "100%", background: "#006fee", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 132, height: 132, background: "white" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px" }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)", letterSpacing: 1 }}>srivtx.xyz</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 80, lineHeight: 1, color: "white", fontFamily: font ? "Instrument Serif" : undefined, fontStyle: "italic" }}>
              Sribatsha Dash
            </div>
            <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>
              I understand systems in detail, build things with them, and write about the frontier and the state of thinking.
            </div>
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.55)" }}>work · writing · notes · papers</div>
        </div>
      </div>
    ),
    { ...size, fonts: fontsFor(font) },
  );
}
