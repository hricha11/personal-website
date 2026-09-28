/* Hand-drawn specimen plates for the project exhibits (inline SVG). */
const MONO = `font-family="JetBrains Mono, monospace"`

export const SPECIMENS: Record<string, string> = {
  // AgroLens , a weed seedling caught in a detection box
  agrolens: `
      <svg viewBox="0 0 220 170" fill="none" stroke="#353532" stroke-width="0.9" aria-hidden="true">
        <path d="M20 140 C 70 136, 150 144, 200 139" stroke-width="0.8"/>
        <path d="M30 146 q 6 -3 12 0 M150 147 q 7 -3 14 0 M92 149 q 5 -2 10 0" stroke-width="0.5" opacity="0.6"/>
        <path d="M110 140 C 110 118, 108 100, 111 80"/>
        <path d="M110 118 C 96 110, 84 112, 74 104 C 88 98, 102 104, 110 118 Z"/>
        <path d="M110 108 C 124 98, 138 100, 148 90 C 132 86, 118 94, 110 108 Z"/>
        <path d="M111 92 C 100 80, 92 70, 94 58 C 104 66, 110 78, 111 92 Z"/>
        <path d="M111 86 C 120 76, 126 64, 124 52 C 116 60, 110 72, 111 86 Z"/>
        <path d="M92 108 q 8 3 14 8 M130 97 q -8 4 -16 9 M100 70 q 5 8 9 16 M120 64 q -3 9 -7 18" stroke-width="0.45" opacity="0.7"/>
        <g stroke="#8A4B3C" stroke-width="0.9">
          <path d="M66 44 h8 M66 44 v8 M156 44 h-8 M156 44 v8 M66 144 h8 M66 144 v-8 M156 144 h-8 M156 144 v-8"/>
        </g>
        <rect x="66" y="32" width="46" height="11" fill="#8A4B3C" stroke="none" opacity="0.85"/>
        <text x="70" y="40" ${MONO} font-size="6.5" fill="#FBF9F3" stroke="none">weed</text>
        <text x="160" y="164" ${MONO} font-size="6" fill="#77736A" stroke="none">YOLOv8n</text>
      </svg>`,
  // FinScope , spending over time, and Prophet's forecast running on
  finscope: `
      <svg viewBox="0 0 220 170" fill="none" stroke="#353532" stroke-width="0.9" aria-hidden="true">
        <path d="M24 20 V 140 H 200" stroke-width="0.8"/>
        <path d="M24 60 H 200 M24 100 H 200" stroke-width="0.4" stroke-dasharray="2 3" opacity="0.6"/>
        <path d="M28 112 L 44 104 L 60 108 L 76 96 L 92 100 L 108 90 L 124 94 L 136 84" stroke-width="1"/>
        <path d="M136 84 L 152 88 L 168 78 L 184 82 L 196 72" stroke="#8A4B3C" stroke-width="1" stroke-dasharray="3 3"/>
        <path d="M136 76 L 196 60 L 196 86 L 136 92 Z" fill="#8A4B3C" stroke="none" opacity="0.08"/>
        <path d="M136 30 V 140" stroke-width="0.5" stroke-dasharray="1 3" opacity="0.7"/>
        <text x="140" y="36" ${MONO} font-size="6.5" fill="#8A4B3C" stroke="none">forecast →</text>
        <text x="24" y="160" ${MONO} font-size="6" fill="#77736A" stroke="none">spending · Prophet</text>
      </svg>`,
  // FreshPress , a folded newspaper, fresh off four feeds
  freshpress: `
      <svg viewBox="0 0 220 170" fill="none" stroke="#353532" stroke-width="0.9" aria-hidden="true">
        <path d="M50 34 H 170 V 136 H 58 Q 50 136 50 128 Z"/>
        <path d="M170 50 H 184 V 128 Q 184 136 176 136 H 170"/>
        <path d="M62 46 H 158" stroke-width="2.2"/>
        <path d="M62 56 H 158" stroke-width="0.5"/>
        <rect x="62" y="64" width="44" height="30" stroke-width="0.6"/>
        <path d="M112 66 H 158 M112 73 H 158 M112 80 H 150 M112 87 H 158 M62 102 H 158 M62 109 H 146 M62 116 H 158 M62 123 H 132" stroke-width="0.5" opacity="0.75"/>
        <g stroke="#8A4B3C" stroke-width="0.9">
          <path d="M22 34 a 10 10 0 0 1 10 10 M22 26 a 18 18 0 0 1 18 18"/>
        </g>
        <circle cx="23" cy="44" r="2" fill="#8A4B3C" stroke="none"/>
        <text x="50" y="156" ${MONO} font-size="6" fill="#77736A" stroke="none">TOI · IE · LiveMint · The Hindu</text>
      </svg>`,
}
