// The cover glyphs, each on a 7×7 grid. Kept in a plain module so both the
// covers (client) and the share cards (server) can draw them.
// "." is empty; any other letter is a white pixel (letters name parts the
// animations treat differently: P pupil, S spark).

export const TULIP = [".#.#.#.", "###.###", "##...##", ".##.##.", "#..#..#", "##.#.##", ".#####."];
export const A_SANS = ["..PPP..", ".PP.PP.", "PP...PP", "PP...PP", "PPPPPPP", "PP...PP", "PP...PP"];
export const A_SERIF = ["...P...", "..P.P..", "..P.P..", ".P...P.", ".PPPPP.", ".P...P.", "PPP.PPP"];
export const EYE = [".......", "..###..", ".#...#.", "#..P..#", ".#...#.", "..###..", "......."];
export const RINGS = ["#######", "#.....#", "#.###.#", "#.#.#.#", "#.###.#", "#.....#", "#######"];
export const ANVIL = ["....S.S", ".....S.", "#######", ".#####.", "..###..", ".#####.", "#######"];
export const CHECK = ["......#", ".....##", "#...##.", "##.##..", ".###...", "..#....", "......."];

// the resting picture of each product's mark, for the share cards
export const PRODUCT_GLYPHS = [
  { name: "Tulip Labs", bright: "#ff6fb5", rows: TULIP },
  { name: "Morphotype", bright: "#5b22ff", rows: A_SANS },
  { name: "Bionic Page", bright: "#e6a21c", rows: EYE },
  { name: "Deriva", bright: "#3cad4f", rows: RINGS },
  { name: "DeepForge", bright: "#f2582a", rows: ANVIL },
  { name: "Customs", bright: "#1f8fe0", rows: CHECK },
];
