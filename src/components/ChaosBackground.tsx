// A fixed chaos field inspired by Jung's unconscious diagrams. Tangled curves,
// partial mandalas, and orbital dots — visible enough to feel, quiet enough to
// stay behind the content.
//
// Design rule: every thread runs edge-to-edge. It enters the frame from
// off-canvas and exits off-canvas, the way a real pen stroke crosses a page.
// No line ever terminates in mid-air — a floating dead end reads as a
// rendering bug, not as chaos.

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

        {/* Layer 2: thick tangled threads drifting across the field.
            Every thread enters off-canvas and exits off-canvas — a pen
            stroke that travels past the edge of the page, never one that
            stops in mid-air. Exit points are spread down the right edge
            (~y 110, 250, 300, 340, 470, 600) so the right side stays as
            continuous as the left. */}
        <g>
          <path
            d="M-60 120 C 120 80, 220 220, 360 180 S 560 60, 720 140 S 900 300, 1080 280 S 1220 220, 1340 250"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M-50 240 C 100 280, 260 160, 400 220 S 620 380, 800 300 S 1060 200, 1320 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M60 -40 C 140 120, 80 300, 220 400 S 520 460, 680 360 S 900 160, 1100 210 S 1230 140, 1340 110"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M-50 590 C 180 540, 320 700, 520 650 S 820 500, 1000 560 S 1180 640, 1330 600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
          />
          {/* Mid-field threads — thinner, fainter. They carry the line
              flow through the middle band of the page so the field reads
              continuous edge to edge instead of emptying out mid-right. */}
          <path
            d="M-50 470 C 180 430, 360 560, 540 500 S 780 390, 940 450 S 1130 550, 1300 470"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M-40 370 C 140 410, 320 300, 500 340 S 720 440, 900 380 S 1120 310, 1290 340"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.5"
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
          {/* seeds out on the right, where the threads now pass */}
          <circle cx="880" cy="450" r="3" />
          <circle cx="1150" cy="330" r="3.5" />
          <circle cx="1030" cy="640" r="3" />
        </g>
      </svg>
    </div>
  );
}
