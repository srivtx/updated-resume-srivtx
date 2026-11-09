// Shared bits for the drawn share cards (opengraph images).

import type { ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 };

export async function serifFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Instrument+Serif")).text();
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export function fontsFor(font: ArrayBuffer | null) {
  return font ? [{ name: "Instrument Serif", data: font, style: "normal" as const, weight: 400 as const }] : [];
}

// a 7×7 glyph as white squares, `cell` px each
export function Glyph({ rows, cell }: { rows: string[]; cell: number }): ReactNode {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((row, y) => (
        <div key={y} style={{ display: "flex" }}>
          {row.split("").map((c, x) => (
            <div key={x} style={{ width: cell, height: cell, background: c === "." ? "transparent" : "white" }} />
          ))}
        </div>
      ))}
    </div>
  );
}
