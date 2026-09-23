// Open-source build logos — each repo gets a small designed glyph mark
// (hand-built SVG, one idea per project) sitting on its tone gradient,
// so every row reads as a branded tool instead of a bare swatch.
// Falls back to a terminal glyph for anything not mapped here.

export function BuildLogo({ name, className = "h-[18px] w-[18px]" }: { name: string; className?: string }) {
  const glyph = GLYPHS[name] ?? TerminalGlyph;
  const Glyph = glyph;
  return <Glyph className={className} />;
}

type GlyphProps = { className?: string };

// nnn — a team of agents on one laptop: three nodes, one mission.
function NnnGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 8.5 12 12M17 8.5 12 12M12 12v4.5" />
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="20" r="2.4" />
    </svg>
  );
}

// sortie — semantic debugger: a signal decoded into plain words.
function SortieGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 20a12 12 0 0 1 12-12" />
      <path d="M4 20a7.5 7.5 0 0 1 7.5-7.5" />
      <path d="M4 20a3.5 3.5 0 0 1 3.5-3.5" />
      <circle cx="19" cy="5.5" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

// mycelium — programs grown as branching networks.
function MyceliumGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M12 3v6M12 9l-5.5 5M12 9l5.5 5" />
      <path d="M6.5 14v4M17.5 14v4" />
      <circle cx="6.5" cy="20.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="20.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// shader-labs — a fragment shader's triangle, vertices live.
function ShaderGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 5 19.5 18h-15L12 5Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="12" cy="5" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="18" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

// bionic-docs — bionic reading: the bold first half of every line.
function BionicGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="4" y="6" width="6.5" height="2.4" rx="0.7" />
      <rect x="11" y="6" width="9" height="2.4" rx="0.7" fillOpacity="0.35" />
      <rect x="4" y="10.8" width="5" height="2.4" rx="0.7" />
      <rect x="9.5" y="10.8" width="10.5" height="2.4" rx="0.7" fillOpacity="0.35" />
      <rect x="4" y="15.6" width="7.5" height="2.4" rx="0.7" />
      <rect x="12" y="15.6" width="8" height="2.4" rx="0.7" fillOpacity="0.35" />
    </svg>
  );
}

// keepsake — a key to memory that stays yours.
function KeepsakeGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="8" cy="8" r="4" />
      <path d="M8 12v8.5M8 17h3.5M8 20.5h2.5" />
      <path d="M18 5.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// fallback — a terminal prompt, for the unmapped.
function TerminalGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m5 7 4 4-4 4M11 17h8" />
    </svg>
  );
}

const GLYPHS: Record<string, (p: GlyphProps) => React.ReactElement> = {
  nnn: NnnGlyph,
  sortie: SortieGlyph,
  mycelium: MyceliumGlyph,
  "shader-labs": ShaderGlyph,
  "bionic-docs": BionicGlyph,
  keepsake: KeepsakeGlyph,
};
