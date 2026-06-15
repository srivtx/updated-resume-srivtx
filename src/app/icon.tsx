// A small hand-mark favicon — italic serif "S" on a paper-warm background.
// 1px rules, no gradients, no shadow. Pencil-on-paper.
export default function Icon() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" fill="#f3eee5"/>
  <text x="16" y="24" text-anchor="middle"
    font-family="'Instrument Serif', Georgia, serif"
    font-style="italic" font-size="26" fill="#1b1814">S</text>
  <line x1="6" y1="28" x2="26" y2="28" stroke="#9a9082" stroke-width="0.6"/>
</svg>`,
    { headers: { "Content-Type": "image/svg+xml" } }
  );
}
