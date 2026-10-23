import type { ThumbName } from '../content'

/* Abstract thumbnails for the sample side projects and the noise articles. Every fill reads
   a --th-* custom property from the page's tokens. They stand in for real imagery and are only ever shown
   on sample or noise cards. */

const S = {
  bg: { fill: 'var(--th-bg)' },
  surface: { fill: 'var(--th-surface)' },
  line: { fill: 'var(--th-line)' },
  ink: { fill: 'var(--th-ink)' },
  ink3: { fill: 'var(--th-ink3)' },
  accent: { fill: 'var(--th-accent)' },
  stroke: { fill: 'none', stroke: 'var(--th-line)', strokeWidth: 2 },
  strokeAccent: { fill: 'none', stroke: 'var(--th-accent)', strokeWidth: 3.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
}

const drawings: Record<ThumbName, JSX.Element> = {
  palette: (
    <>
      <rect width="320" height="200" style={S.bg} />
      <circle cx="122" cy="100" r="50" style={S.ink} />
      <circle cx="170" cy="100" r="50" style={S.accent} opacity=".92" />
      <circle cx="218" cy="100" r="50" style={S.ink3} opacity=".85" />
    </>
  ),
  habit: (
    <>
      <rect width="320" height="200" style={S.bg} />
      <rect x="110" y="14" width="100" height="186" rx="18" style={S.surface} />
      <circle cx="160" cy="76" r="26" style={S.stroke} />
      <path d="M160 50A26 26 0 1 1 141.6 94.4" style={S.strokeAccent} />
      <circle cx="128" cy="126" r="5" style={S.accent} />
      <rect x="140" y="122" width="56" height="8" rx="4" style={S.line} />
      <circle cx="128" cy="148" r="5" style={S.accent} />
      <rect x="140" y="144" width="42" height="8" rx="4" style={S.line} />
      <circle cx="128" cy="170" r="5" style={S.line} />
      <rect x="140" y="166" width="50" height="8" rx="4" style={S.line} />
    </>
  ),
  route: (
    <>
      <rect width="320" height="200" style={S.bg} />
      <path d="M0 50H320M0 100H320M0 150H320" style={S.stroke} />
      <path d="M32 152C92 152 84 66 152 74S244 150 290 52" style={S.strokeAccent} />
      <circle cx="32" cy="152" r="9" style={S.ink} />
      <circle cx="152" cy="74" r="8" style={S.surface} />
      <circle cx="290" cy="52" r="10" style={S.accent} />
    </>
  ),
  chart: (
    <>
      <rect width="320" height="200" style={S.bg} />
      <rect x="46" y="120" width="38" height="50" rx="6" style={S.ink3} opacity=".55" />
      <rect x="96" y="90" width="38" height="80" rx="6" style={S.ink3} opacity=".55" />
      <rect x="146" y="106" width="38" height="64" rx="6" style={S.ink3} opacity=".55" />
      <rect x="196" y="64" width="38" height="106" rx="6" style={S.ink3} opacity=".55" />
      <rect x="246" y="34" width="38" height="136" rx="6" style={S.accent} />
    </>
  ),
  flow: (
    <>
      <rect width="320" height="200" style={S.bg} />
      <path d="M94 100H112V54H128M94 100H112V146H128M192 54H210V100H226M192 146H210V100H226" style={S.stroke} />
      <rect x="30" y="76" width="64" height="48" rx="10" style={S.surface} />
      <rect x="128" y="30" width="64" height="48" rx="10" style={S.surface} />
      <rect x="128" y="122" width="64" height="48" rx="10" style={S.surface} />
      <rect x="226" y="76" width="64" height="48" rx="10" style={S.accent} />
    </>
  ),
  type: (
    <>
      <rect width="320" height="200" style={S.ink} />
      <rect x="96" y="70" width="44" height="58" rx="4" style={S.bg} />
      <rect x="150" y="88" width="74" height="40" rx="4" style={S.bg} opacity=".6" />
      <rect x="128" y="142" width="64" height="4" rx="2" style={S.accent} />
    </>
  ),
  ds: (
    <>
      <rect width="320" height="200" style={S.bg} />
      <rect x="28" y="26" width="120" height="68" rx="10" style={S.surface} />
      <rect x="42" y="40" width="56" height="20" rx="6" style={S.ink} />
      <rect x="42" y="72" width="80" height="8" rx="4" style={S.line} />
      <rect x="172" y="26" width="120" height="68" rx="10" style={S.surface} />
      <rect x="186" y="42" width="40" height="22" rx="11" style={S.accent} />
      <rect x="186" y="76" width="90" height="8" rx="4" style={S.line} />
      <rect x="28" y="108" width="120" height="68" rx="10" style={S.surface} />
      <rect x="42" y="154" width="60" height="8" rx="4" style={S.line} />
      <rect x="172" y="108" width="120" height="68" rx="10" style={S.surface} />
      <circle cx="198" cy="134" r="12" style={S.ink} />
      <circle cx="226" cy="134" r="12" style={S.accent} />
      <circle cx="254" cy="134" r="12" style={S.ink3} />
    </>
  ),
}

export function Thumb({ name, className = '' }: { name: ThumbName; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      {drawings[name]}
    </svg>
  )
}
