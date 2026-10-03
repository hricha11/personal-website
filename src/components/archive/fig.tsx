/* A small fig branch, drawn in ink. Eight figs, one in each section's
   colour, every life this archive keeps, and one on the ground. */
import { A } from "@/lib/archive"

// where each fig hangs (its stem) and a little tilt
const FIGS: [number, number, number][] = [
  [36, 45, -6], [49, 53, 4], [78, 65, -3], [98, 57, 5],
  [118, 69, -4], [134, 74, 3], [140, 27, -5], [106, 14, 4],
]
const FIG = "M0 0 v3 c-4 1 -7 5 -7 9.5 c0 4.3 3.1 6.8 7 6.8 s7 -2.5 7 -6.8 c0 -4.5 -3 -8.5 -7 -9.5"
const LEAF = "M0 0 c6 -5 15 -5 20 1 c-5 6 -14 6 -20 -1 z M1 0 h18"

export function FigBranch({ className = "" }: { className?: string }) {
  const inks = A.sections.map((s) => s.color)
  return (
    <svg className={`fig-branch ${className}`} viewBox="0 0 160 124" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" role="img">
      <title>a tree, and every fig on it</title>
      <path d="M6 116 C 40 98, 60 72, 92 59 S 140 32, 156 12" strokeWidth="1.3" />
      <path d="M60 76 C 58 62, 48 52, 36 45" />
      <path d="M104 53 C 110 64, 122 71, 134 74" />
      <path d="M128 33 C 124 23, 116 17, 106 14" />
      <path d={LEAF} transform="translate(88 60) rotate(-58)" />
      <path d={LEAF} transform="translate(62 74) rotate(-150)" />
      <path d={LEAF} transform="translate(146 22) rotate(-20)" />
      {FIGS.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path className="fig-hang" d={FIG} style={{ fill: `color-mix(in srgb, ${inks[i] ?? "var(--rust)"} 32%, transparent)`, animationDelay: `${i * 0.23}s` }} />
        </g>
      ))}
      {/* the one nobody picked in time */}
      <path d={FIG} transform="translate(64 121) rotate(-96)" className="fig-fallen" />
      <path d="M40 121.5 h56" strokeWidth="0.6" strokeDasharray="1 3" />
    </svg>
  )
}
