// A sigil mark: order (the ring) holding chaos (the tangled S-curve inside).
// Reads as an abstract S / D monogram without being literal.
// Built from a single stroke so it stays clean at any size.

export function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sribatsha Dash — sigil mark"
    >
      {/* Outer ring — not quite closed, like a thought that hasn't finished. */}
      <path
        d="M32 4C48.5 4 60 17 60 32C60 49 47.5 58 32 58C17.5 58 6 48 6 32C6 17 17 4 32 4"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner stroke: an S becoming a D, one continuous gesture. */}
      <path
        d="M22 22C26 18 34 18 36 24C38 30 28 30 26 36C24 42 32 46 38 42C44 38 44 30 40 26"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* A single dot — the period at the end of the sentence. */}
      <circle cx="42" cy="44" r="3" fill="currentColor" />
    </svg>
  );
}
