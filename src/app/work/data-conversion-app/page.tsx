import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BeforeAfter } from '@/components/BeforeAfter'
import { BrowserMockup } from '@/components/BrowserMockup'
import { FindingCard } from '@/components/FindingCard'
import { SectionHeader } from '@/components/SectionHeader'
import { PullQuote } from '@/components/PullQuote'
import { InfoNote } from './InfoNote'
import { ParallaxShots } from './ParallaxShots'
import { WorkspaceShot } from './ScreenMocks'

export const metadata: Metadata = {
  title: 'Data Conversion App — Michael Jerome',
  description:
    'How a two-week MVP tool let Acentra Health map, preview, and safely convert legacy case data ahead of a system cutover.',
}

const description =
  "DDI — Design, Develop, Implement — is how Acentra moves a state program's data from a legacy system onto [Product]. This MVP reimagines the process with AI, cutting a 2–3 month conversion to 1–2 weeks."

// Result section stats. Both numbers are stated, not drawn — the discarded timeline-bar option
// was the only thing that derived proportions, so no month→week conversion is needed here.
const resultStat = {
  conversionAfter: '1–2 weeks',
  conversionCaption: 'Down from a typical 2–3 month conversion timeline',
  designTime: '2 weeks',
  designCaption: 'Design accelerated from months to weeks with AI',
}

// Info-note copy. The design note is still Michael's draft wording — adjust freely.
const conversionNote =
  "The process of moving a state program's claims and provider data from a legacy system onto [Product]."
const designNote =
  'AI generated rapid design variants, letting each iteration take days instead of weeks.'

const meta = [
  { label: 'My Role',  items: ['Product Design', 'Rapid Prototyping'] },
  { label: 'Team',     items: ['1 Developer', '1 Implementation Lead'] },
  { label: 'Timeline', items: ['2 Weeks', '2025'] },
]

const problemFindings = [
  {
    title: 'Inconsistent Field Mapping',
    description: "Legacy fields didn't map 1:1 to the new schema — some required manual reconciliation before conversion.",
    src: '/images/dca-problem/Field Mapping.png',
  },
  {
    title: 'No Preview Before Commit',
    description: 'The existing export tool wrote directly to the new system with no way to catch errors before they landed.',
    src: '/images/dca-problem/No Preview.png',
  },
]

const approachSteps = [
  'Field-mapping screen surfaces legacy → new-system correspondences, with mismatches flagged inline',
  'Preview step renders a side-by-side of source and converted record before anything writes',
  'Commit step runs in batches with a rollback log, so a bad batch doesn’t take down the whole migration',
]

// Committed vs. shipped — same ledger pattern as the Acentra Health page, trimmed to 2 rows for a 2-week scope.
const results = [
  {
    metric: 'Accuracy',
    committed: '99%',
    committedNote: 'Target match rate, legacy → new',
    delivered: '99.6%',
    deliveredNote: 'Verified match rate across 3 batches',
  },
  {
    metric: 'Timeline',
    committed: '2 weeks',
    committedNote: 'Delivery target before cutover',
    delivered: '2 weeks',
    deliveredNote: 'Shipped on schedule, zero slip',
  },
]

const smallStats = [
  { stat: '3', label: 'Legacy record batches converted', desc: 'Processed across three sequential migration batches.' },
  { stat: '0', label: 'Records lost in migration', desc: 'Every flagged mismatch was caught in preview, not production.' },
]

const moreWork = [
  { num: '02', title: 'Acentra Health Design System', category: 'Design System', desc: 'Built a scalable design system that unified tokens, components, and accessibility standards across two product teams.', href: '/work/acentra-health', img: undefined as string | undefined },
  { num: '03', title: 'Project Three', category: 'Product Design', desc: 'One line on the problem and the outcome you drove.', href: '#', img: undefined as string | undefined },
]

function NextImage({ label, src, className = '' }: { label: string; src?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border bg-foundation-900 ${className}`}>
      {src ? (
        <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <span className="text-caption font-grotesk uppercase tracking-widest text-foundation-500">{label}</span>
        </div>
      )}
    </div>
  )
}

/* Screenshot placeholder for the product-shot section. Light ground (foundation-100) rather than
   NextImage's dark one, so an empty slot doesn't read as a solid black block on a light section.
   Drop a real screenshot in via `src` and the aspect box crops it consistently. */
function Shot({
  label,
  src,
  aspect = 'aspect-[16/10]',
  className = '',
  children,
}: {
  label: string
  src?: string
  aspect?: string
  className?: string
  /** Skeleton UI to render inside the frame. Wins over src/label — used by the mocked option. */
  children?: React.ReactNode
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border bg-foundation-100 ${aspect} ${className}`}>
      {children ? (
        children
      ) : src ? (
        <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-4 text-center">
          <span className="text-caption font-grotesk uppercase tracking-widest text-foundation-400">{label}</span>
        </div>
      )}
    </div>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M5 11h11M12 6l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
      <circle cx="8" cy="8" r="7.25" stroke="#c2600a" strokeWidth="1" />
      <path d="M5 8.2l2 2 4-4.2" stroke="#c2600a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MetricIcon({ name, className = '' }: { name: 'clock' | 'layers'; className?: string }) {
  if (name === 'clock') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
        <circle cx="8" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M8 6v3l2 1.4M6 1.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 1.8l6 3-6 3-6-3 6-3z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M2 8l6 3 6-3M2 11l6 3 6-3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  )
}

export default function DataConversionAppPage() {
  return (
    <main className="min-h-screen bg-body">

      {/* Dark hero. px-section matches every other section's gutter; py-section (not the old
          pb-0) gives the copy room above the band's bottom edge — pb-0 was a leftover from when
          a BrowserMockup bled out of the hero directly underneath it. */}
      <section className="bg-foundation-900 px-section pt-section pb-44">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">

          <div className="flex-1 md:pr-20 flex items-center">
            <AnimatedSection>
              <h1 className="text-heading-xl font-grotesk text-body">
                Reimagining data conversion at Acentra Health
              </h1>
            </AnimatedSection>
          </div>

          <div className="hidden md:block w-px bg-foundation-600" />

          <div className="flex-1 md:pl-20 flex items-center">
            <AnimatedSection>
              <p className="text-body font-sans text-foundation-300">
                {description}
              </p>
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* ══ PRODUCT SHOTS — five options to compare. Keep one, delete the rest. ══

          POSITION: each option is pulled up with -mt-28 (112px) so its top straddles the dark/light
          seam. In production only the winning option sits against the real hero, whose pb-44 (176px)
          leaves 176 − 112 = 64px of clear dark between the hero copy and the top of the screens.
          For the four options that aren't adjacent to the hero, a dark stand-in band of the same
          height recreates that seam so all five can be judged in identical conditions — those
          stand-ins go away along with the losing options.

          CONTENT: generic placeholder labels only. The Dictionary / Mapping / Transformation story
          belongs to its own section later on the page and is deliberately not previewed here.

          No browser chrome in any option, so this reads as a product shot rather than a re-run of
          the Acentra Health page's BrowserMockup.

          -mt-28 / pb-44 / w-[42%] etc. are stock Tailwind scale values — no tailwind.config.js
          change. Anything genuinely new is flagged per option. */}

      {/* ─────────── 1. Minimal ─────────── */}
      <div className="bg-body px-section py-3 border-b border-t border-border">
        <p className="max-w-6xl mx-auto text-caption font-grotesk text-foundation-500 uppercase tracking-widest">
          1 · Minimal — one screen, straddling the seam · 16:9
        </p>
      </div>
      <div className="bg-foundation-900 h-44" />
      <section className="px-section pb-section -mt-28">
        {/* Lowest risk on the page: a single screen, flat, centred. The overlap alone does the work. */}
        <div className="max-w-5xl mx-auto">
          <Shot label="Workspace" aspect="aspect-video" className="shadow-2xl" />
        </div>
      </section>

      {/* ─────────── 2. Depth stack ─────────── */}
      <div className="bg-body px-section py-3 border-b border-t border-border">
        <p className="max-w-6xl mx-auto text-caption font-grotesk text-foundation-500 uppercase tracking-widest">
          2 · Depth stack — screens offset like a deck · 16:9 each
        </p>
      </div>
      <div className="bg-foundation-900 h-44" />
      <section className="px-section pb-section -mt-28">
        {/* Two screens sit behind the front one, offset up-left, so only their edges show. Implies
            depth and "there is more here" without needing a second screen to be legible. */}
        {/* Positioning goes on wrappers, never in Shot's className: Shot sets `relative` itself and
            Tailwind emits `relative` after `absolute`, so an `absolute` passed in is silently
            overridden and the panels stack in flow instead of overlapping. */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-full -translate-x-10 -translate-y-10">
            <Shot label="" aspect="aspect-video" className="shadow-lg" />
          </div>
          <div className="absolute top-0 left-0 w-full -translate-x-5 -translate-y-5">
            <Shot label="" aspect="aspect-video" className="shadow-lg" />
          </div>
          <div className="relative">
            <Shot label="Workspace" aspect="aspect-video" className="shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ─────────── 3. Hero screen with supports peeking ─────────── */}
      <div className="bg-body px-section py-3 border-b border-t border-border">
        <p className="max-w-6xl mx-auto text-caption font-grotesk text-foundation-500 uppercase tracking-widest">
          3 · Layered stack — horizontal spread, one shared source · 16:9 each · MOCKED UI
        </p>
      </div>
      <div className="bg-foundation-900 h-44" />
      <section className="px-section pb-section -mt-28 overflow-hidden">
        {/*  HORIZONTAL spread rather than a diagonal cascade. Front screen is the centred anchor;
             2 sits out to the left and 1 out to the right, each with only a small vertical nudge
             in opposite directions so the group reads wide rather than tall.

             Widened to max-w-7xl — a horizontal spread needs the room, and the centred max-w-5xl
             column couldn't give each back layer a usable strip.

             Exposed strips are sized so nothing truncates mid-character: the left layer shows
             ~256px, comfortably clearing the 176px sidebar, so PROGRAMS and every state name read
             in full. The right layer exposes ~243px of main content, which is bars and pills only
             — no text to cut. Hence shift={0} on all three: the earlier deep shifts existed only
             to hide a half-cut sidebar, and are unnecessary once the strips are wide enough.

             Depth: size steps 44% → 47% → 50% and opacity 80 → 90 → 100. Radius and shadow are
             identical on all three. Below lg only the front screen shows.  */}
        <div className="relative max-w-7xl mx-auto h-[240px] sm:h-[340px] lg:h-[440px]">
          {/* screen 1 — furthest back, out to the right, nudged down */}
          <div className="hidden lg:block absolute z-10 left-[50%] top-[16%] w-[44%] opacity-80">
            <Shot label="" aspect="aspect-video" className="shadow-2xl">
              <WorkspaceShot />
            </Shot>
          </div>
          {/* screen 2 — out to the left, nudged up */}
          <div className="hidden lg:block absolute z-20 left-[5%] top-0 w-[47%] opacity-90">
            <Shot label="" aspect="aspect-video" className="shadow-2xl">
              <WorkspaceShot />
            </Shot>
          </div>
          {/* screen 3 — front, centred anchor */}
          <div className="absolute z-30 left-0 top-[6%] w-full lg:left-[25%] lg:top-[8%] lg:w-[50%]">
            <Shot label="" aspect="aspect-video" className="shadow-2xl">
              <WorkspaceShot />
            </Shot>
          </div>
        </div>
      </section>

      {/* ─────────── 4. Angled spread ─────────── */}
      <div className="bg-body px-section py-3 border-b border-t border-border">
        <p className="max-w-6xl mx-auto text-caption font-grotesk text-foundation-500 uppercase tracking-widest">
          4 · Angled spread — two screens turned toward each other · 16:10 each
        </p>
      </div>
      <div className="bg-foundation-900 h-44" />
      <section className="px-section pb-section -mt-28">
        {/* NEW pattern: CSS 3D perspective. Nothing else on the site uses rotateY — the angle is
            kept to 7° so the screens still read as flat rectangles, not a novelty. */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-4" style={{ perspective: '1800px' }}>
          <div className="flex-1" style={{ transform: 'rotateY(7deg)' }}>
            <Shot label="Workspace" className="shadow-2xl" />
          </div>
          <div className="flex-1" style={{ transform: 'rotateY(-7deg)' }}>
            <Shot label="Live view" className="shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ─────────── 5. Parallax depth ─────────── */}
      <div className="bg-body px-section py-3 border-b border-t border-border">
        <p className="max-w-6xl mx-auto text-caption font-grotesk text-foundation-500 uppercase tracking-widest">
          5 · Parallax depth — layers drift on scroll · 16:9 primary, 16:10 supports
        </p>
      </div>
      <div className="bg-foundation-900 h-44" />
      <section className="px-section pb-section -mt-28 overflow-hidden">
        {/* NEW pattern: the only scroll-driven motion on the page. Three layers move at different
            rates so depth is felt rather than drawn. Pinned flat under prefers-reduced-motion.
            Lives in its own client component — this page is a server component. */}
        <ParallaxShots />
      </section>


      {/* ── Result — FINAL. Ledger rows, no boxes. ──
          Explicit column widths (not a 12-col span split): the label column is a fixed 210px so
          both stat numbers start on the same x regardless of label length, and the stat column is
          sized to the widest number rather than a percentage — otherwise the caption drifts far
          from its stat as the viewport grows. Caption is capped at max-w-md to hold its measure.

          Note placement is split on purpose: the top row opens upward and the bottom row downward,
          so each note lands in the section's outer padding instead of covering the other row's
          stat. Both use the restrained treatment (variant A) — no rotation, no torn edge. */}
      <section className="px-section py-section">
        <div className="max-w-6xl mx-auto border-t border-border">

          <div className="relative grid grid-cols-1 md:grid-cols-[210px_260px_minmax(0,1fr)] gap-x-6 gap-y-2 py-7 border-b border-border md:items-baseline">
            <p className="text-label font-grotesk uppercase tracking-widest text-foundation-400 flex items-center gap-2">
              Data conversion time
              <InfoNote note={conversionNote} label="Data conversion time" variant="A" placement="above" />
            </p>
            <p className="text-stat font-grotesk text-accent-warm">{resultStat.conversionAfter}</p>
            <p className="text-body-sm font-sans text-foundation-600 max-w-md">{resultStat.conversionCaption}</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-[210px_260px_minmax(0,1fr)] gap-x-6 gap-y-2 py-7 border-b border-border md:items-baseline">
            <p className="text-label font-grotesk uppercase tracking-widest text-foundation-400 flex items-center gap-2">
              Design time
              <InfoNote note={designNote} label="Design time" variant="A" placement="below" />
            </p>
            <p className="text-stat font-grotesk text-accent-warm">{resultStat.designTime}</p>
            <p className="text-body-sm font-sans text-foundation-600 max-w-md">{resultStat.designCaption}</p>
          </div>

        </div>
      </section>


      {/* Browser mockup — split dark/light background */}
      <div className="relative">
        <div className="absolute inset-0 top-0 h-1/2 bg-foundation-900" />
        <section className="relative z-10 px-section pt-section pb-0">
          <div className="max-w-6xl mx-auto">
            <BrowserMockup src="/videos/dca-demo.mp4" url="acentrahealth.com/data-conversion" />
          </div>
        </section>
      </div>

      {/* Case study grid */}
      <div className="px-section pb-section">
        <div className="max-w-6xl mx-auto">

          {/* Meta */}
          <AnimatedSection>
            <div className="mt-section mb-4 flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                About this Project
              </p>
              <div className="w-8 h-px bg-accent-warm" />
            </div>
            <section className="border-t border-border">
              {meta.map(({ label, items }) => (
                <div key={label} className="grid grid-cols-12 gap-8 py-5 border-b border-border items-baseline">
                  <p className="col-span-2 text-label font-grotesk text-foundation-500 uppercase tracking-widest">{label}</p>
                  <p className="col-span-10 text-body font-sans text-foundation-800">
                    {items.map((item, idx) => (
                      <span key={item}>
                        {idx > 0 && <span className="text-foundation-300">{'  ·  '}</span>}
                        {item}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </section>
          </AnimatedSection>

          {/* 01 — The Problem */}
          <AnimatedSection>
            <div className="grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 pt-section pb-section border-r border-border">
                <SectionHeader
                  index="01"
                  eyebrow="The Problem"
                  title="A Cutover With No Room for Silent Failure"
                  quote="Legacy records had inconsistent field formats, orphaned references, and manual overrides accumulated over years — a straight database migration risked corrupting exactly the records implementation teams cared about most."
                />
              </div>

              <div className="col-span-8 pt-section pb-section grid grid-cols-2 gap-4 content-start">
                {problemFindings.map(f => (
                  <FindingCard key={f.title} {...f} />
                ))}
              </div>

            </div>
          </AnimatedSection>

          {/* 02 — The Approach */}
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 border-r border-border">
                <SectionHeader
                  index="02"
                  eyebrow="The Approach"
                  title="Map, Preview, Commit"
                  quote="With one developer and two weeks, the fastest path wasn't the safest one. We scoped a three-step flow so implementation staff could catch problems before they became production data."
                />
              </div>

              <div className="col-span-8 flex flex-col gap-4 justify-center">
                <ul className="flex flex-col gap-4 list-none m-0 p-0">
                  {approachSteps.map((step) => (
                    <li key={step} className="flex gap-3 text-body-sm font-sans text-foundation-600">
                      <CheckMark />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </AnimatedSection>

          {/* Transition pull-quote */}
          <div className="border-t border-border">
            <PullQuote>
              We treated the conversion tool itself as a small product — not a script — because the people running the migration needed to trust what it showed them.
            </PullQuote>
          </div>

          {/* 03 — The Build */}
          <AnimatedSection>
            <div className="border-t border-border pt-section pb-section">
              <div className="max-w-2xl mb-10">
                <SectionHeader
                  index="03"
                  eyebrow="The Build"
                  title="A Focused Tool for a Focused Team"
                  quote="Drag to compare — the legacy spreadsheet-based export process against the conversion tool's mapping screen."
                />
              </div>
              <BeforeAfter
                before="/images/dca-beforeafter/Legacy Export.png"
                after="/images/dca-beforeafter/Conversion Tool.png"
              />
            </div>
          </AnimatedSection>

          {/* 04 — Results */}
          <AnimatedSection>
            <div className="border-t border-border pt-section grid grid-cols-12 gap-8">

              <div className="col-span-4 pr-8 border-r border-border">
                <SectionHeader
                  index="04"
                  eyebrow="Results"
                  title="Every Record Accounted For"
                  quote="We scoped two commitments before the sprint started. Both held, and the migration went live on schedule."
                />
              </div>

              <div className="col-span-8">
                <div className="grid grid-cols-12 gap-6 pb-3 border-b border-foundation-300">
                  <p className="col-span-3" />
                  <p className="col-span-4 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    Committed
                  </p>
                  <p className="col-span-5 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                    Shipped
                  </p>
                </div>

                {results.map((r) => (
                  <div
                    key={r.metric}
                    className="grid grid-cols-12 gap-6 py-6 border-b border-border items-baseline"
                  >
                    <p className="col-span-3 text-heading-m font-grotesk text-foundation-900">
                      {r.metric}
                    </p>
                    <div className="col-span-4">
                      <p className="text-stat font-grotesk text-foundation-400">{r.committed}</p>
                      <p className="text-caption font-sans text-foundation-500 mt-1">
                        {r.committedNote}
                      </p>
                    </div>
                    <div className="col-span-5">
                      <p className="text-stat font-grotesk text-accent-warm">{r.delivered}</p>
                      <p className="text-caption font-sans text-foundation-600 mt-1">
                        {r.deliveredNote}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-5 mt-8">
                  {smallStats.map((m) => (
                    <div key={m.label} className="rounded-lg border border-border p-6 flex flex-col">
                      <div className="flex items-center gap-2 text-foundation-400 mb-6">
                        <MetricIcon name={m.label.includes('batches') ? 'layers' : 'clock'} />
                        <span className="text-label font-grotesk uppercase tracking-widest">{m.label}</span>
                      </div>
                      <p className="text-stat font-grotesk text-accent-warm">{m.stat}</p>
                      <p className="text-caption font-sans text-foundation-500 italic mt-auto pt-4">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* More Work — closing case-study index */}
          <AnimatedSection>
            <div className="border-t border-border pt-section">
              <div className="mb-10">
                <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest mb-3">More Case Studies</p>
                <div className="w-8 h-px bg-accent-warm mb-6" />
                <h2 className="text-heading-l font-grotesk text-foundation-900">Keep exploring</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                {moreWork.map((p) => (
                  <a
                    key={p.num}
                    href={p.href}
                    className="group rounded-lg border border-border p-8 flex flex-col transition-colors hover:border-foundation-900"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-caption font-grotesk text-foundation-400">{p.num}</span>
                      <ArrowRight className="text-foundation-300 group-hover:text-accent-warm group-hover:translate-x-1 transition-all" />
                    </div>
                    <span className="text-label font-grotesk uppercase tracking-widest text-foundation-400 mb-3">{p.category}</span>
                    <p className="text-heading-m font-grotesk text-foundation-900 group-hover:text-accent-warm transition-colors">{p.title}</p>
                    <p className="text-body-sm font-sans text-foundation-600 mt-3">{p.desc}</p>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                      <div className="overflow-hidden">
                        <NextImage
                          label={p.title}
                          src={p.img}
                          className="mt-6 aspect-[16/9] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>

    </main>
  )
}
