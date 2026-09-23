// Content model — Bharath-style portfolio: products, builds, blogs,
// papers, experience. Copy stays short; links go to the real things.

export const profile = {
  name: "Sribatsha Dash",
  first: "Sribatsha",
  handle: "srivtx",
  bannerQuote: "ship what you wish existed.",
  tagline: ["btech '27", "fullstack developer", "ml engineer"],
  email: "crypticcc101@gmail.com",
  location: "Bhubaneswar, India",
};

export const socials = [
  { name: "GitHub", href: "https://github.com/srivtx", icon: "github" },
  { name: "X", href: "https://x.com/srivtx", icon: "x" },
  { name: "Email", href: "mailto:crypticcc101@gmail.com", icon: "mail" },
] as const;

export const experience = [
  {
    role: "Founder / Engineer",
    org: "srivtx — independent",
    period: "2024 — present",
    points: [
      "Building Deriva, DeepForge and Customs end-to-end: product, design, backend, shipping.",
      "DeepForge grew to 5,730+ verified problems with real in-browser Python execution and offline-first sync.",
      "Customs put AI agents on real payment rails at a buildathon — signed mandates on a hash-chained ledger.",
    ],
  },
  {
    role: "Backend Engineer",
    org: "GoQuant",
    period: "Oct 2025 — Jan 2026",
    points: [
      "Trading and market-data services: order execution, exchange integrations.",
      "Low-latency paths where a millisecond is a rounding error you still bill for.",
    ],
  },
];

// The three live products — apps people actually use.
export type Product = {
  name: string;
  one: string;
  href: string;
  chips: string[];
  preview: "deriva" | "deepforge" | "customs";
};

export const products: Product[] = [
  {
    name: "Deriva",
    one: "A super-app for learning algorithms — apps inside apps: derive, observe, pattern-match.",
    href: "https://deriva.srivtx.xyz",
    chips: ["Next.js", "TypeScript", "Pyodide", "PWA"],
    preview: "deriva",
  },
  {
    name: "DeepForge",
    one: "Forge ML skills from scratch. 5,730+ problems, real Python in the browser, no account, MIT.",
    href: "https://deepforge.srivtx.xyz",
    chips: ["Next.js", "Python", "Supabase", "Offline-first"],
    preview: "deepforge",
  },
  {
    name: "Customs",
    one: "Checkout for AI agents — signed mandates, hash-chained ledger, live Razorpay rails.",
    href: "https://customs.srivtx.xyz",
    chips: ["TypeScript", "Ed25519", "Razorpay", "Buildathon"],
    preview: "customs",
  },
];

// Open-source builds on the bench.
export type Build = {
  name: string;
  one: string;
  href: string;
  chips: string[];
  tone: string; // gradient classes for the mini preview
  glyph: "pulse" | "scan" | "grid" | "wave" | "type" | "lock";
};

export const builds: Build[] = [
  {
    name: "nnn",
    one: "a team of agents on one laptop. local 7b, no api keys, no cloud.",
    href: "https://github.com/srivtx/nnn",
    chips: ["Rust", "llama.cpp", "MCP"],
    tone: "from-cyan-500/80 to-blue-600/80",
    glyph: "pulse",
  },
  {
    name: "sortie",
    one: "semantic debugger — reads a failed solana tx and says 'slippage exceeded', not 0x1771.",
    href: "https://github.com/srivtx/sortie",
    chips: ["TypeScript", "Solana", "MCP"],
    tone: "from-sky-500/80 to-indigo-600/80",
    glyph: "scan",
  },
  {
    name: "mycelium",
    one: "solana programs in zig. comptime over runtime, visibility over convenience.",
    href: "https://github.com/srivtx/mycelium",
    chips: ["Zig", "Solana", "LLVM"],
    tone: "from-lime-500/80 to-emerald-600/80",
    glyph: "grid",
  },
  {
    name: "shader-labs",
    one: "modular shader library with a ⌘k palette. copy, paste, done.",
    href: "https://github.com/srivtx/shader-labs",
    chips: ["WebGL", "TypeScript"],
    tone: "from-fuchsia-500/80 to-purple-600/80",
    glyph: "wave",
  },
  {
    name: "bionic-docs",
    one: "bionic reading for pdf + epub. no upload, no account, no remote code.",
    href: "https://github.com/srivtx/bionic-docs",
    chips: ["Extension", "On-device"],
    tone: "from-rose-500/80 to-red-600/80",
    glyph: "type",
  },
  {
    name: "keepsake",
    one: "encrypted, portable ai memory. browser app, cli, and an mcp server.",
    href: "https://github.com/srivtx/keepsake",
    chips: ["Local-first", "Ed25519", "MCP"],
    tone: "from-slate-500/80 to-zinc-700/80",
    glyph: "lock",
  },
];

export const stack = [
  { icon: "typescript", label: "TypeScript" },
  { icon: "rust", label: "Rust" },
  { icon: "python", label: "Python" },
  { icon: "zig", label: "Zig" },
  { icon: "nextdotjs", label: "Next.js" },
  { icon: "react", label: "React" },
  { icon: "tailwindcss", label: "Tailwind" },
  { icon: "nodedotjs", label: "Node" },
  { icon: "bun", label: "Bun" },
  { icon: "postgresql", label: "Postgres" },
  { icon: "supabase", label: "Supabase" },
  { icon: "docker", label: "Docker" },
  { icon: "solana", label: "Solana" },
  { icon: "git", label: "Git" },
];

// Technical writing — DeepForge engineering notes + one long X article.
export const posts = [
  {
    title: "I Built an AI Edge Node on a Nothing CMF Phone 1",
    meta: "article",
    href: "https://x.com/srivtx/status/2032891308872958289",
  },
  {
    title: "Building a 150-trait avatar engine",
    meta: "9 min read",
    href: "https://deepforge.srivtx.xyz/blog/building-a-150-trait-avatar-engine",
  },
  {
    title: "From one long page to 24 routes",
    meta: "10 min read",
    href: "https://deepforge.srivtx.xyz/blog/from-one-long-page-to-24-routes",
  },
  {
    title: "Offline-first sync with Supabase",
    meta: "11 min read",
    href: "https://deepforge.srivtx.xyz/blog/offline-first-sync-with-supabase",
  },
  {
    title: "Verifying 5,050 problems with real Python",
    meta: "9 min read",
    href: "https://deepforge.srivtx.xyz/blog/verifying-5050-problems-with-real-python",
  },
];

// Research papers — DeepForge publications.
export const papers = [
  {
    title: "REPROGPU",
    sub: "Cross-adapter bit-reproducible WebGPU kernels and a conformance harness",
    href: "https://deepforge.srivtx.xyz/inventions/reprogpu",
  },
  {
    title: "Refutation-Ledger Values",
    sub: "Auditable warrant accounting for contestable derived claims",
    href: "https://deepforge.srivtx.xyz/inventions/refutation-ledgers",
  },
  {
    title: "KeyFuse",
    sub: "Falsification-first cache-key auditing with minimal collision witnesses",
    href: "https://deepforge.srivtx.xyz/inventions/keyfuse",
  },
  {
    title: "Behavioral Delta Ledger",
    sub: "Per-edit no-op detection on a hidden basis",
    href: "https://deepforge.srivtx.xyz/inventions/behavioral-delta-ledger",
  },
  {
    title: "Alibi Distance",
    sub: "Measuring and closing the silent-failure aperture of a verified corpus",
    href: "https://deepforge.srivtx.xyz/inventions/alibi-distance",
  },
  {
    title: "Ladder-Graded Spacing",
    sub: "Execution-aware scheduling for code practice",
    href: "https://deepforge.srivtx.xyz/inventions/ladder-graded-spacing",
  },
];

export const upstream = [
  {
    name: "Zed",
    what: "zettelkasten language server",
    state: "merged",
    pr: "#4337",
    url: "https://github.com/zed-industries/zed/pull/4337",
  },
  {
    name: "wevm/vocs",
    what: "tailwind hmr for mdx",
    state: "merged",
    pr: "#365",
    url: "https://github.com/wevm/vocs/pull/365",
  },
  {
    name: "wevm/vim",
    what: "user-op hash fix",
    state: "co-authored",
    pr: "—",
    url: "https://github.com/wevm/vim",
  },
];

export const moreOnGithub = "https://github.com/srivtx";
