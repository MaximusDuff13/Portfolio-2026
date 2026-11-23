import type { ReactNode } from 'react'
import { Develop } from './Develop'
import { BrushDoodle, ComponentDoodle, TeamsDoodle } from './Doodles'
import { JiraVideo } from './JiraVideo'

/* 04, part 3: screens built with the system, and the results (Nov 23 2026).
   PICKED P, "Bento with numbers" (Michael, Nov 23 2026), out of 16 layouts: whole screens on
   coloured tiles, mixed with number tiles. At his request the old 05 Results section is folded in
   here: its two results ("1 quarter" for 5 teams, "2 weeks" for the rebrand) are the number tiles,
   and its Figma analytics strip is the last, full-width tile.
   Screens: Michael's Product Image 1, 2, 3 and 6 (public/images/acentra-hero), as webp in
   acentra-screens/. Left out: 4 (the Beneficiary screen of 03, with [Name] and the SSN field) and
   5 (an earlier copy of 6 with "Summ / ary" broken).
   Still owed: the rebrand's before/after screens (they were a dev-only slot under "2 weeks" in the
   old Results; 2 PNGs, 1600 × 800), a line per product on who uses it, and re-exports of the
   Jira plan and Inventory screens (typos; "[Name]" in the Inventory header). */

const DIR = '/images/acentra-screens/'

type Screen = { id: string; name: string; src: string; src2x?: string; w: number; h: number; alt: string }

const DCE: Screen = {
  id: 'dce',
  name: 'Data Conversion Enterprise',
  src: `${DIR}dce-1200.webp`,
  src2x: `${DIR}dce-2400.webp`,
  w: 2400,
  h: 1740,
  alt: 'Data Conversion Enterprise: a project page with tabs, a Run ETL job panel with a green button, and completed steps below',
}
// the Jira Migration Tool plays as a video: JiraVideo.tsx
const INVENTORY: Screen = {
  id: 'inventory',
  name: 'Smart Inventory Tracker',
  src: `${DIR}inventory-1200.webp`,
  w: 1200,
  h: 732,
  alt: 'Smart Inventory Tracker: a pricing plan table with a summary panel and green Subscribe button',
}

// The summary strip of Figma's library analytics, 1089 × 81 (moved here from the old ResultsSection).
const ANALYTICS = {
  src: '/images/acentra-hero/Metrics.png',
  alt: 'Figma library analytics for the design system: used by 10 teams, 119 components, 30 styles, 307 variables, 1.2k inserts this week',
}
// the export carries a dark 6px edge on the left and a panel divider in its last 4px: clip both
const STRIP_CLIP = '[clip-path:inset(0_4px_0_6px)]'

const LIGHT = { text: 'text-foundation-900', sub: 'text-foundation-700' }
const DARK = { text: 'text-white', sub: 'text-[#c6c6c6]' }

function Shot({ s, sizes }: { s: Screen; sizes: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.src}
      srcSet={s.src2x ? `${s.src} 1200w, ${s.src2x} 2400w` : undefined}
      sizes={s.src2x ? sizes : undefined}
      alt={s.alt}
      width={s.w}
      height={s.h}
      loading="lazy"
      className="block h-auto w-full"
    />
  )
}

/* a product tile: its name, then the whole screen (never cropped), lifting a little on hover */
function ScreenTile({ s, n, bg, tone, big = false, sizes, delay = 0, className = '' }: { s: Screen; n: number; bg: string; tone: typeof LIGHT; big?: boolean; sizes: string; delay?: number; className?: string }) {
  return (
    <figure className={`group m-0 flex flex-col rounded-2xl p-5 sm:p-7 ${bg} ${className}`}>
      <figcaption className="mb-4">
        <span className={`block font-sans text-label uppercase ${tone.sub}`}>0{n}</span>
        <span className={`mt-1 block font-display ${big ? 'text-heading-l' : 'text-heading-m'} ${tone.text}`}>{s.name}</span>
      </figcaption>
      <div className="mt-auto overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none">
        <Develop delay={delay}>
          <Shot s={s} sizes={sizes} />
        </Develop>
      </div>
    </figure>
  )
}

/* a result tile: a small pen drawing (Doodles.tsx), then the figure, what it means, and what it
   was measured against */
function ResultTile({ big, line, vs, bg, tone, art, className = '' }: { big: string; line: string; vs: ReactNode; bg: string; tone: typeof LIGHT; art: ReactNode; className?: string }) {
  return (
    <div className={`flex min-h-[14rem] flex-col rounded-2xl p-5 sm:p-7 ${bg} ${className}`}>
      {art}
      <div className="mt-auto pt-6">
        <span className={`block font-display text-[clamp(40px,4.6vw,60px)] leading-none ${tone.text}`}>{big}</span>
        <span className={`mt-3 block font-sans text-body ${tone.text}`}>{line}</span>
        <span className={`mt-1 block font-sans text-body-sm ${tone.sub}`}>{vs}</span>
      </div>
    </div>
  )
}

export function ScreensShowcase() {
  return (
    <section aria-labelledby="screens-built" className="mt-16">
      <h3 id="screens-built" className="m-0 font-display text-heading-m text-foundation-900">Built with the system, and what it changed</h3>
      <p className="m-0 mt-2 max-w-xl font-sans text-body-sm text-foundation-700">
        Different products, different teams, the same parts.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6">
        <ScreenTile s={DCE} n={1} bg="bg-stage-sage" tone={LIGHT} big sizes="(min-width: 768px) 680px, 100vw" className="md:col-span-4" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-1">
          <ResultTile big="1 quarter" line="to get 5 teams onto the system." vs="Today: 2 product modules, 5+ internal tools" bg="bg-[#161616]" tone={DARK} art={<TeamsDoodle ink="#e39849" />} />
          <ResultTile big="2 weeks" line="to roll out new brand colours, in design and in code." vs="Old estimate: 6 months" bg="bg-stage-ginger" tone={LIGHT} art={<BrushDoodle ink="#b15900" />} />
        </div>

        {/* the Jira Migration Tool as Michael's own screen recording, playing in the tile (Nov 23 2026;
            it replaced the two still Jira screens and a coded stand-in; no "prototype" wording, at his request) */}
        <figure className="m-0 grid grid-cols-1 gap-6 rounded-2xl bg-[#161616] p-5 sm:p-7 md:col-span-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:items-center md:gap-10">
          <figcaption>
            <span className={`block font-sans text-label uppercase ${DARK.sub}`}>02</span>
            <span className={`mt-1 block font-display text-heading-l ${DARK.text}`}>Jira Migration Tool</span>
            <span className={`mt-4 block font-sans text-body ${DARK.sub}`}>The tool prepares a migration plan in four steps, then opens it for review.</span>
          </figcaption>
          <JiraVideo />
        </figure>

        <ResultTile big="1.2k" line="component inserts in one week." vs="Figma’s library analytics, below" bg="bg-stage-sage-strong" tone={LIGHT} art={<ComponentDoodle ink="#b15900" />} className="md:col-span-2" />
        <ScreenTile s={INVENTORY} n={3} bg="bg-stage-straw" tone={LIGHT} big sizes="(min-width: 768px) 680px, 100vw" delay={280} className="md:col-span-4" />

        {/* the proof: Figma's own numbers, on its own panel grey. Phones scroll it sideways so it stays readable. */}
        <figure className="m-0 rounded-2xl bg-[#2c2c2c] p-5 sm:p-7 md:col-span-6">
          <span className="block font-sans text-label uppercase text-[#c6c6c6]">From Figma</span>
          <div className="mt-4 overflow-x-auto">
            <Develop className="rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ANALYTICS.src} alt={ANALYTICS.alt} width={1089} height={81} loading="lazy" className={`block h-auto w-[1089px] max-w-none md:w-full md:max-w-[1089px] ${STRIP_CLIP}`} />
            </Develop>
          </div>
          <figcaption className="mt-4 font-sans text-body-sm text-[#c6c6c6]">
            Its 10 teams are Figma team projects, which belong to 5 key teams. Its 119 components include variants and other parts of 39 components.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
