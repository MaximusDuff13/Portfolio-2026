import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { STAGES, type CaseStudy, type MappingRow, type Part, type Preset, type Slot, type Story } from '@/app/_home/content'
import { Frame, Phone, Placeholder, SlotImage, type PlaceholderKind } from './frame'

/* Variant E's motion library. A card's `story.preset` picks one; each brings its own content,
   drawn in code from the home tokens until its slots get real images. Everything is placed in the
   stage's 16:10 box: x in % of its width (cqw), y in % of its height (cqh). The motion is in
   story.css, keyed on the card's data-preset, and runs while MotionCard holds the card open
   (hover or keyboard focus). Enter 400-600ms on ease.enter, staggers 70-80ms (scroll 2s); exit at
   about 70% of the enter on ease.exit, all together. Transform, opacity and clip-path only, plus
   stroke-dashoffset for the redlines.

   Picking one for a new case study: the motion should show what the project is about, and no
   two cards on a page share a preset. Roughly:
   - deconstruct: a system or a set of parts (design systems, component libraries, tokens)
   - drawer: a person checking or acting on something beside the main screen (review, approval)
   - scroll: one long page that is the work (landing pages, reports, long forms)
   - wipe: a redesign with a clear before and after
   - spread: a multi-step flow, mostly on mobile (onboarding, checkout, setup)
   - inset: one detail that matters most (an interaction, a data point, a microcopy fix)
   None fits? Add a preset here rather than forcing one.

   Real assets per preset (WebP, at 2x the largest they show, in the 810 column):
   - deconstruct: the cover, 1280x800 (shown from its top-left); each part optional, a transparent
     cut-out at 2x its width: right-hand parts 340px wide, the button 245px
   - drawer: the cover, 1280x800; the panel is drawn in code from the rows (no image)
   - scroll: one tall screenshot, 1280 wide by any height (e.g. 1280x2400), with its `ratio`
   - wipe: before and after, 1280x800 each, the same screen and crop
   - spread: three phone screens, 390x845 each (9:19.5), in flow order
   - inset: the cover, 1280x800; the crop is taken from the cover itself (no image) */

export type CardItem = Omit<CaseStudy, 'kind' | 'image'> & {
  image?: CaseStudy['image']
  /** the stand-in drawn when there is no image */
  coverKind?: PlaceholderKind
}

export const PRESETS: Record<Preset, { name: string; blurb: string; reduced: 'cover' | 'end' }> = {
  deconstruct: {
    name: 'Deconstruct',
    blurb: 'Components lift out of the screen to the margins, each redlined back to where it came from.',
    reduced: 'cover',
  },
  drawer: {
    name: 'Drawer',
    blurb: 'The screen slides aside for a review panel that checks its rows off one by one.',
    reduced: 'end',
  },
  scroll: { name: 'Scroll', blurb: 'A long page scrolls slowly inside the frame, top to bottom.', reduced: 'cover' },
  wipe: { name: 'Wipe', blurb: 'A divider sweeps across the screen, from before to after.', reduced: 'end' },
  spread: { name: 'Spread', blurb: 'Three stacked phones fan out side by side, the steps of a flow.', reduced: 'end' },
  inset: { name: 'Inset', blurb: 'An enlarged crop of one detail slides in, a line back to its spot.', reduced: 'end' },
}

/** presets used by more than one card on the same page */
export function duplicatePresets(items: CardItem[]) {
  const seen = new Map<Preset, string[]>()
  for (const i of items) if (i.story) seen.set(i.story.preset, [...(seen.get(i.story.preset) ?? []), i.name])
  return Array.from(seen.entries()).filter(([, names]) => names.length > 1)
}

/* the cover at rest: 70% of the stage wide, centred, its top 13% down; the screen under a chrome
   bar 2.4% of the stage wide. A point on the screen, in % of it, to the stage, given where the
   cover's top-left is and its scale */
const COVER = { width: 70, chrome: 2.4 }
const onScreen = (p: { x: number; y: number }, left: number, top: number, s: number) => ({
  x: left + (COVER.width * s * p.x) / 100,
  // the stage is 16:10, so 1% of its width is 1.6% of its height
  y: top + COVER.chrome * 1.6 * s + (COVER.width * s * p.y) / 100,
})
/** the redlines' drawing space: 160 x 100, the stage's own proportions, so 1 unit is 1/160 of it */
const svgX = (x: number) => x * 1.6

/** the cover: the card's image or its stand-in, in a browser frame */
function Cover({ item }: { item: CardItem }) {
  return (
    <div className="uf-cover mo-cover">
      <Frame label={!item.image ? 'Placeholder · cover' : item.mediaPlaceholder ? 'Placeholder media' : undefined}>
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
        ) : (
          <Placeholder kind={item.coverKind ?? 'dashboard'} />
        )}
      </Frame>
    </div>
  )
}

/* ── deconstruct ─────────────────────────────────────────────────────────────
   The cover moves left and up to 0.94 to free the right-hand side. Each part starts on its
   origin on the cover, invisible, and travels out to its place (500ms, 70ms apart); once it
   lands, a 1px accent redline draws from it back to its origin (300ms), a dot on the origin. */
const DECON = { left: 6, top: 8, scale: 0.94 }

function PartBody({ p }: { p: Part }) {
  switch (p.kind) {
    case 'button':
      return <span className="mo-p-button">{p.text}</span>
    case 'input':
      return <span className="mo-p-input">{p.text}</span>
    case 'checkbox':
      return (
        <span className="mo-p-check">
          <span className="mo-p-box">
            <Check strokeWidth={3} />
          </span>
          {p.text}
        </span>
      )
    case 'swatches':
      return (
        <span className="mo-p-row">
          {p.colors?.map((c) => (
            <i key={c} className="mo-p-swatch" style={{ background: c }} />
          ))}
        </span>
      )
    case 'spacing':
      return (
        <span className="mo-p-row mo-p-spacing">
          {[4, 8, 12, 16, 24].map((n) => (
            <span key={n}>
              <i style={{ width: n, height: n }} />
              {n}
            </span>
          ))}
        </span>
      )
  }
}

function Deconstruct({ item, parts }: { item: CardItem; parts: Part[] }) {
  const placed = parts.map((p, i) => {
    const o = onScreen(p.origin, DECON.left, DECON.top, DECON.scale)
    // the redline leaves the part's left edge, near its top, or the middle of its top edge
    const a = p.side === 'right' ? { x: p.at.x, y: p.at.y + 3.5 } : { x: p.at.x + p.width / 2, y: p.at.y }
    return { p, o, a, d: i * 70 }
  })
  return (
    <>
      <Cover item={item} />
      <svg className="mo-lines" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
        {placed.map(({ o, a, d }, i) => (
          <g key={i} style={{ '--d': `${d}ms` } as CSSProperties}>
            <path className="mo-line" d={`M${svgX(a.x)} ${a.y}L${svgX(o.x)} ${o.y}`} pathLength={1} />
            <circle className="mo-dot" cx={svgX(o.x)} cy={o.y} r={0.9} />
          </g>
        ))}
      </svg>
      {placed.map(({ p, o, d }, i) => (
        <div
          key={i}
          className="mo-part"
          data-side={p.side}
          aria-hidden="true"
          style={
            {
              '--x': p.at.x,
              '--y': p.at.y,
              '--w': `${p.width}%`,
              // from its origin on the cover, centred on it
              '--sx': o.x - p.width / 2 - p.at.x,
              '--sy': o.y - 2 - p.at.y,
              '--d': `${d}ms`,
            } as CSSProperties
          }
        >
          <span className="mo-tag">{p.label}</span>
          {p.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.src} alt={p.alt ?? ''} />
          ) : (
            <span className="mo-part-body">
              <PartBody p={p} />
            </span>
          )}
        </div>
      ))}
    </>
  )
}

/* ── drawer ──────────────────────────────────────────────────────────────────
   The cover slides left by 17% of the stage and settles at 0.86, so all of it stays in view;
   a review panel, 35% of the stage wide and its full height, slides in from the right edge
   (500ms). Its rows come in one at a time (80ms apart), then each chip turns from "AI drafted"
   to "Reviewed", 220ms apart, the counter at the top going 0/3 to 3/3 with them. */
function Drawer({ item, title, rows }: { item: CardItem; title: string; rows: MappingRow[] }) {
  return (
    <>
      <Cover item={item} />
      <div className="mo-drawer" aria-hidden="true">
        <div className="mo-drawer-head">
          <span>{title}</span>
          {/* each count is laid over the one before it and fades in when its row is reviewed */}
          <span className="mo-count">
            <span className="mo-count-n">
              {[0, ...rows.map((_, i) => i + 1)].map((n) => (
                <b key={n} style={{ '--r': n - 1 } as CSSProperties}>
                  {n}
                </b>
              ))}
            </span>
            /{rows.length}
          </span>
        </div>
        {rows.map((r, i) => (
          <div key={r.source} className="mo-row" style={{ '--r': i } as CSSProperties}>
            <span className="mo-fields">
              <code>{r.source}</code>
              <span aria-hidden="true">→</span>
              <code>{r.target}</code>
            </span>
            <span className="mo-chip">
              <span className="mo-chip-drafted">AI drafted</span>
              <span className="mo-chip-reviewed">
                <Check strokeWidth={3} />
                Reviewed
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

/* ── scroll ──────────────────────────────────────────────────────────────────
   The cover's frame holds a tall screenshot, its top in view; open, it scrolls to the bottom
   over 2s, ease-in-out, and comes back up in 1.4s on leave. */
function Scroll({ tall }: { tall: Slot & { ratio: number } }) {
  // how far to move, in % of the page's own height: all of it but the last screenful
  const move = (1 - 0.625 / tall.ratio) * 100
  return (
    <div className="uf-cover mo-cover">
      <Frame label={tall.src ? undefined : tall.label}>
        <div className="mo-page" style={{ '--move': `-${move}%`, aspectRatio: `1 / ${tall.ratio}` } as CSSProperties}>
          <SlotImage slot={tall} kind="page" />
        </div>
      </Frame>
    </div>
  )
}

/* ── wipe ────────────────────────────────────────────────────────────────────
   "Before" lies over "after"; open, a divider sweeps left to right (600ms) and the before is
   clipped away behind it. */
function Wipe({ before, after }: { before: Slot; after: Slot }) {
  return (
    <div className="uf-cover mo-cover">
      <Frame>
        <div className="mo-wipe-after">
          <SlotImage slot={after} kind="dashboard" />
          <span className="mo-wipe-tag">After</span>
          {!after.src && <span className="uf-label mo-wipe-label">{after.label}</span>}
        </div>
        <div className="mo-wipe-before">
          <SlotImage slot={before} kind="dense" />
          <span className="mo-wipe-tag mo-wipe-tag-before">Before</span>
          {!before.src && <span className="uf-label mo-wipe-label">{before.label}</span>}
        </div>
        <div className="mo-wipe-divider" aria-hidden="true">
          <i />
        </div>
      </Frame>
    </div>
  )
}

/* ── spread ──────────────────────────────────────────────────────────────────
   Three phones, step 1 in front, steps 2 and 3 tucked behind it; open, they fan out side by
   side in flow order, overlapping a little (500ms, 70ms apart), step 1 moving left. */
function Spread({ phones }: { phones: [Slot, Slot, Slot] }) {
  return (
    <>
      {phones.map((slot, i) => (
        <div key={i} className="mo-spread" style={{ '--i': i, zIndex: 3 - i } as CSSProperties}>
          <Phone slot={slot} />
        </div>
      ))}
    </>
  )
}

/* ── inset ───────────────────────────────────────────────────────────────────
   The cover stays; a framed crop of one detail, enlarged, rises in at the bottom right (500ms),
   over at most a tenth of the cover. The spot it was taken from is outlined on the cover and a
   1px line draws from it to the crop (300ms, once the crop has landed). */
const INSET = { x: 67, y: 58, w: 30 }

function Inset({ item, crop }: { item: CardItem; crop: { x: number; y: number; w: number; label: string } }) {
  // the spot on the cover at rest (left 15%, top 13%, scale 1); the crop panel is 4:3
  const s = onScreen(crop, 15, 13, 1)
  const sw = (COVER.width * crop.w) / 100
  // the crop's height in % of the screen: its width × 3/4, the screen being 16:10
  const sh = (COVER.width * crop.w * 1.2) / 100
  return (
    <>
      <Cover item={item} />
      <svg className="mo-lines" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
        <g style={{ '--d': '0ms' } as CSSProperties}>
          <rect className="mo-spot" x={svgX(s.x)} y={s.y} width={svgX(sw)} height={sh} />
          <path className="mo-line" d={`M${svgX(s.x + sw)} ${s.y + sh}L${svgX(INSET.x)} ${INSET.y}`} pathLength={1} />
        </g>
      </svg>
      <div className="mo-inset" aria-hidden="true" style={{ '--x': INSET.x, '--y': INSET.y, '--w': `${INSET.w}%` } as CSSProperties}>
        <div
          className="mo-inset-view"
          style={{ '--zoom': 100 / crop.w, '--cx': `-${crop.x}%`, '--cy': `-${crop.y}%` } as CSSProperties}
        >
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image.src} alt="" loading="lazy" decoding="async" />
          ) : (
            <Placeholder kind={item.coverKind ?? 'dashboard'} />
          )}
        </div>
        <span className="uf-label">{crop.label}</span>
      </div>
    </>
  )
}

/** the stage's contents for a card's story; without one, the cover alone */
export function StoryStage({ item, story }: { item: CardItem; story?: Story }) {
  switch (story?.preset) {
    case 'deconstruct':
      return <Deconstruct item={item} parts={story.parts} />
    case 'drawer':
      return <Drawer item={item} title={story.title} rows={story.rows} />
    case 'scroll':
      return <Scroll tall={story.tall} />
    case 'wipe':
      return <Wipe before={story.before} after={story.after} />
    case 'spread':
      return <Spread phones={story.phones} />
    case 'inset':
      return <Inset item={item} crop={story.crop} />
    default:
      return <Cover item={item} />
  }
}

/* ── the motion gallery: every preset on a placeholder card ───────────────── */
const sample = (preset: Preset, story: Story, coverKind: PlaceholderKind = 'dashboard'): CardItem => ({
  id: `gallery-${preset}`,
  href: '#',
  name: PRESETS[preset].name,
  company: 'Motion gallery',
  question: PRESETS[preset].name,
  description: PRESETS[preset].blurb,
  duration: preset === 'scroll' ? '2s in, 1.4s out' : 'about 0.6s in',
  role: `reduced motion: ${PRESETS[preset].reduced === 'cover' ? 'cover only' : 'end state'}`,
  status: preset,
  coverKind,
  stage: STAGES.sage.pale,
  stageStrong: (preset === 'drawer' || preset === 'scroll' || preset === 'inset' ? STAGES.sky : STAGES.sage).strong,
  story,
})

export const galleryItems: CardItem[] = [
  sample(
    'deconstruct',
    {
      preset: 'deconstruct',
      parts: [
        { kind: 'swatches', label: 'Color / tokens', colors: ['#1c1917', '#57534e', '#a8a29e', '#e7e5e4', '#f5f5f4'], origin: { x: 10, y: 6 }, at: { x: 76, y: 6 }, width: 21, side: 'right' },
        { kind: 'checkbox', label: 'Checkbox / checked', text: 'Remember me', origin: { x: 30, y: 30 }, at: { x: 76, y: 22 }, width: 21, side: 'right' },
        { kind: 'input', label: 'Input / text', text: 'Jordan', origin: { x: 50, y: 40 }, at: { x: 76, y: 36 }, width: 21, side: 'right' },
        { kind: 'spacing', label: 'Spacing / scale', origin: { x: 60, y: 62 }, at: { x: 76, y: 56 }, width: 21, side: 'right' },
        { kind: 'button', label: 'Button / primary', text: 'Continue', origin: { x: 34, y: 86 }, at: { x: 38, y: 84 }, width: 15, side: 'below' },
      ],
    },
    'form',
  ),
  sample('drawer', {
    preset: 'drawer',
    title: 'Review mappings',
    rows: [
      { source: 'CUST_ID', target: 'customerId' },
      { source: 'CUST_NM', target: 'name' },
      { source: 'OPEN_DT', target: 'openedOn' },
    ],
  }),
  sample('scroll', { preset: 'scroll', tall: { label: 'Placeholder · tall page', ratio: 1.75 } }),
  sample('wipe', {
    preset: 'wipe',
    before: { label: 'Placeholder · before' },
    after: { label: 'Placeholder · after' },
  }),
  sample('spread', {
    preset: 'spread',
    phones: [{ label: 'Placeholder · step 1' }, { label: 'Placeholder · step 2' }, { label: 'Placeholder · step 3' }],
  }),
  sample('inset', { preset: 'inset', crop: { x: 8, y: 20, w: 30, label: 'Placeholder · detail' } }),
]
