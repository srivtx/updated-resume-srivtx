// A fixed chaos field inspired by Jung's unconscious diagrams. Tangled curves,
// partial mandalas, and orbital dots — visible enough to feel, quiet enough to
// stay behind the content.

export function ChaosBackground() {
  return (
    <div
      className="fixed inset-0 z-[2] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-ink/[0.12]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: a broken mandala on the right — order almost forming. */}
        <g transform="translate(820, 180)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <path
              key={a}
              d="M0 0 C 30 -50, 90 -60, 130 -20 C 160 10, 140 70, 90 90 C 50 105, 10 80, 0 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              transform={`rotate(${a}) scale(${0.9 + i * 0.04})`}
              opacity={0.6 + i * 0.05}
            />
          ))}
          <circle cx="0" cy="0" r="10" fill="currentColor" opacity="0.35" />
        </g>

        {/* Layer 2: thick tangled threads drifting across the field. */}
        <g>
          <path
            d="M-40 120 C 120 80, 220 220, 360 180 S 560 60, 720 140 S 920 320, 1100 260"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M-20 240 C 100 280, 260 160, 400 220 S 620 380, 800 300 S 1050 180, 1240 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M80 0 C 140 140, 80 320, 220 420 S 520 460, 680 360 S 900 160, 1080 200 L 1200 140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M0 600 C 180 560, 320 720, 520 680 S 820 520, 1000 580 S 1180 720, 1280 660"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>

        {/* Layer 3: orbital dots, the seeds of future order. */}
        <g fill="currentColor" opacity="0.5">
          <circle cx="240" cy="220" r="4" />
          <circle cx="520" cy="140" r="3.5" />
          <circle cx="760" cy="360" r="4.5" />
          <circle cx="980" cy="180" r="3" />
          <circle cx="360" cy="520" r="4" />
          <circle cx="640" cy="620" r="3.5" />
          <circle cx="1080" cy="540" r="4" />
        </g>
      </svg>
    </div>
  );
}
