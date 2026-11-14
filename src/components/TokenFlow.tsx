/* The token flow, redrawn from Michael's export (Discpline.png, which is too degraded to use):
   one primitive, Green 60, feeds a component token and three semantic tokens, and each token
   lands on a piece of real interface. Drawn in HTML so it's sharp at any size and readable on
   phones, where the connectors drop away and each token reads as one row: token → interface.
   The green is content (Acentra's colour), not this site's accent. */

const GREEN = '#028202' // Green 60, confirmed from "White and Dark.png"

type Row = { token: string; kind: 'Component' | 'Semantic'; ui: React.ReactNode; uiLabel: string }

const Button = () => (
  <span className="inline-flex items-center gap-6 px-3 py-2 font-sans text-[13px] font-medium text-white" style={{ background: GREEN, borderRadius: 2 }}>
    Button
    <span aria-hidden="true">+</span>
  </span>
)
const DateField = () => (
  <span className="flex w-full max-w-[220px] items-center justify-between bg-white px-3 py-2 font-sans text-[13px] text-[#6f6f6f]" style={{ outline: `2px solid ${GREEN}`, outlineOffset: -2, borderRadius: 2 }}>
    mm/dd/yyyy
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="#161616" strokeWidth="1.2">
      <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" />
    </svg>
  </span>
)
const Icon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={GREEN} strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </svg>
)
const Tabs = () => (
  <span className="flex font-sans text-[13px]">
    {['Tab label', 'Tab label', 'Tab label'].map((t, i) => (
      <span key={i} className={`px-3 pb-2 ${i === 0 ? 'font-medium text-[#161616]' : 'text-[#525252]'}`} style={{ borderBottom: `2px solid ${i === 0 ? GREEN : '#e0e0e0'}` }}>
        {t}
      </span>
    ))}
  </span>
)

const ROWS: Row[] = [
  { token: 'button-primary', kind: 'Component', ui: <Button />, uiLabel: 'a primary button' },
  { token: 'focus-primary', kind: 'Semantic', ui: <DateField />, uiLabel: 'the focus ring on a date field' },
  { token: 'icon-interactive', kind: 'Semantic', ui: <Icon />, uiLabel: 'an interactive icon' },
  { token: 'border-interactive', kind: 'Semantic', ui: <Tabs />, uiLabel: 'the selected tab’s underline' },
]

const Swatch = ({ size = 'h-4 w-4' }: { size?: string }) => (
  <span aria-hidden="true" className={`block flex-none rounded-[3px] ${size}`} style={{ background: GREEN }} />
)
const Head = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`m-0 text-label font-sans uppercase tracking-widest text-foundation-600 ${className}`}>{children}</p>
)

export type FlowMark = 'primitive' | 'tokens' | 'interface'

/** mark: optional extra beside each column heading (a pin, or a handwritten note) */
export function TokenFlow({ className = '', mark }: { className?: string; mark?: (k: FlowMark) => React.ReactNode }) {
  return (
    <figure className={`m-0 ${className}`} aria-label="Green 60 feeds one component token and three semantic tokens, each used in the interface">
      {/* desktop: four columns joined by dashed connectors */}
      <div className="hidden md:grid md:grid-cols-[auto_minmax(48px,1fr)_auto_minmax(32px,0.7fr)_minmax(220px,1.3fr)] md:grid-rows-[auto_repeat(4,64px)]">
        <Head className="flex items-center gap-2 pb-4">Primitive{mark?.('primitive')}</Head>
        <span />
        <Head className="flex items-center gap-2 pb-4">Tokens{mark?.('tokens')}</Head>
        <span />
        <Head className="flex items-center gap-2 pb-4">Interface{mark?.('interface')}</Head>

        {/* the primitive, centred on the four rows */}
        <div className="row-span-4 row-start-2 flex items-center">
          <span className="flex items-center gap-3 rounded-md border border-border bg-body px-3 py-2.5 font-sans text-body-sm font-medium text-foundation-900">
            <Swatch size="h-6 w-6" />
            Green 60
          </span>
        </div>

        {/* one curve from the primitive to each row's centre (rows at 12.5, 37.5, 62.5, 87.5%) */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="col-start-2 row-span-4 row-start-2 h-full w-full overflow-visible">
          {[12.5, 37.5, 62.5, 87.5].map((y) => (
            <path key={y} d={`M0 50 C 55 50, 45 ${y}, 100 ${y}`} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" className="text-foundation-400" />
          ))}
        </svg>

        {ROWS.map((r, i) => (
          <div key={r.token} className="contents">
            <div className="col-start-3 flex items-center" style={{ gridRowStart: i + 2 }}>
              <span aria-hidden="true" className="-ml-px mr-2 text-[10px] text-foundation-400">▶</span>
              <span className="flex items-center gap-2.5 rounded-md border border-border bg-body px-3 py-2">
                <Swatch />
                <span className="font-sans text-body-sm text-foundation-900">{r.token}</span>
                <span className="text-caption font-sans text-foundation-600">{r.kind}</span>
              </span>
            </div>
            <div className="col-start-4 flex items-center px-2" style={{ gridRowStart: i + 2 }}>
              <span aria-hidden="true" className="h-0 flex-1 border-t border-dashed border-foundation-400" />
              <span aria-hidden="true" className="text-[10px] text-foundation-400">▶</span>
            </div>
            <div className="col-start-5 flex items-center" style={{ gridRowStart: i + 2 }}>
              <span className="sr-only">Used for {r.uiLabel}:</span>
              {r.ui}
            </div>
          </div>
        ))}
      </div>

      {/* phones: the primitive, then one row per token */}
      <div className="md:hidden">
        {/* phones have no column headings, so the marks sit above, each with its column's name */}
        {mark && (
          <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
            {(['primitive', 'tokens', 'interface'] as FlowMark[]).map((k) => (
              <Head key={k} className="flex items-center gap-2">{k}{mark(k)}</Head>
            ))}
          </div>
        )}
        <span className="inline-flex items-center gap-3 rounded-md border border-border bg-body px-3 py-2.5 font-sans text-body-sm font-medium text-foundation-900">
          <Swatch size="h-6 w-6" />
          Green 60
        </span>
        <ul className="m-0 mt-2 list-none border-l border-dashed border-foundation-400 p-0 pl-4">
          {ROWS.map((r) => (
            <li key={r.token} className="border-b border-border py-4 last:border-b-0">
              <span className="flex items-center gap-2.5">
                <Swatch />
                <span className="font-sans text-body-sm text-foundation-900">{r.token}</span>
                <span className="text-caption font-sans text-foundation-600">{r.kind}</span>
              </span>
              <div className="mt-3">
                <span className="sr-only">Used for {r.uiLabel}:</span>
                {r.ui}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
