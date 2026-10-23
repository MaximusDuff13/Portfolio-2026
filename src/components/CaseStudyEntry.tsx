'use client'
import { useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BrowserMockup } from '@/components/BrowserMockup'
import { CoverSheet } from '@/components/CoverSheet'
import { PullQuote } from '@/components/PullQuote'
import type { CaseStudyEntry as Entry } from '@/data/caseStudies'
import { duration, enterT, exitT, reducedT } from '@/lib/motion'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'

/* NEW — one case study in the listing, in one of five layouts (lab prototypes):
     index    a contents-page row: number, headline, company, the cover sheet as a strip, image
     lead     a front-page lead story: framed screen, headline with the hook highlighted, the
              case study's own pull quote, the cover sheet strip, a stamp as the call to action
     card     a small 3D cover with its strip, for the grid under a lead
     wall     a large portrait 3D magazine cover; the full sheet slides out on hover
     strip    a card in a sideways row; on hover the screens break out of the frame
     dossier  a paper case file whose main content is the cover sheet, image clipped on

   Every entry is one Link: a static, never-transformed hit area, keyboard focusable with a
   visible ring, named "title, company". Title, company, role and outcome are visible without
   hover in every layout; hover and focus only add a moment. Each layout has one moment,
   motion.base on the enter curve, closing at 70% on the exit curve; touch keeps the rest
   pose. Reduced motion: no rotation, lift or travel, only a quick cross-fade (the title
   underline, and opacity where a layout reveals something). Nothing truncates: text wraps,
   and covers give their art the space the text leaves. */

export type EntryLayout = 'index' | 'lead' | 'card' | 'wall' | 'strip' | 'dossier'

const T = { open: enterT(duration.base), rest: exitT(duration.base) }
const FADE = reducedT(duration.base)

/** a part's rest and open poses; under reduced motion both are the rest pose */
const pose = (rest: Record<string, number | string>, open: Record<string, number | string>, reduced: boolean): Variants => ({
  rest: { ...rest, transition: T.rest },
  open: { ...(reduced ? rest : open), transition: T.open },
})

/** opacity-only reveal: the one thing reduced motion keeps */
const reveal = (reduced: boolean): Variants => ({
  rest: { opacity: 0, transition: reduced ? FADE : T.rest },
  open: { opacity: 1, transition: reduced ? FADE : T.open },
})

// Cover tints, all existing tokens. Text on each is checked: 900/700 on the light ones,
// 100/300 on ink (12:1 and up).
const TINT = {
  subtle: { bg: 'bg-accent-subtle', text: 'text-foundation-900', sub: 'text-foundation-700', rule: 'border-foundation-900', pill: 'border-foundation-400 text-foundation-800' },
  stone: { bg: 'bg-foundation-200', text: 'text-foundation-900', sub: 'text-foundation-700', rule: 'border-foundation-900', pill: 'border-foundation-400 text-foundation-800' },
  ink: { bg: 'bg-foundation-900', text: 'text-foundation-100', sub: 'text-foundation-300', rule: 'border-foundation-300', pill: 'border-foundation-600 text-foundation-200' },
} as const

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-4 focus-visible:ring-offset-body'

type Props = {
  entry: Entry
  layout: EntryLayout
  /** position in the list, for numbers and alternating details */
  index: number
  /** strip only: a sibling is in focus, so step back */
  dimmed?: boolean
  /** strip only: report hover/focus so the list can dim the siblings */
  onActiveChange?: (active: boolean) => void
}

export function CaseStudyEntry({ entry, layout, index, dimmed = false, onActiveChange }: Props) {
  const reduced = useReducedMotionSafe()
  const [open, setOpen] = useState(false)
  const [moving, setMoving] = useState(false)

  const set = (v: boolean) => {
    setOpen(v)
    if (v && !reduced) setMoving(true)
    onActiveChange?.(v)
  }
  const uid = `${layout}-${entry.id}`
  const ctx: Ctx = {
    entry,
    no: String(index + 1).padStart(2, '0'),
    index,
    reduced,
    titleId: `${uid}-title`,
  }
  const Body = { index: IndexRow, lead: LeadStory, card: CoverCard, wall: WallCover, strip: StripCard, dossier: Dossier }[layout]

  return (
    <Link
      href={entry.href}
      id={entry.placeholder ? entry.id : undefined}
      aria-labelledby={`${ctx.titleId} ${uid}-company`}
      className={`group block no-underline rounded-sm ${focusRing} ${SHELL[layout]}`}
      onPointerEnter={(e: PointerEvent) => e.pointerType === 'mouse' && set(true)}
      onPointerLeave={(e: PointerEvent) => e.pointerType === 'mouse' && set(false)}
      onFocus={(e) => e.currentTarget.matches(':focus-visible') && set(true)}
      onBlur={() => set(false)}
    >
      <span id={`${uid}-company`} className="sr-only">
        , {entry.sheet.company}
      </span>
      <motion.div
        className={`h-full ${moving ? '[&_[data-anim]]:will-change-transform' : ''}`}
        initial={false}
        animate={open ? 'open' : 'rest'}
        onAnimationComplete={(def) => def === 'rest' && setMoving(false)}
      >
        {/* The strip's sibling fade sits on its own wrapper, so it doesn't fight the variants */}
        <motion.div
          className="h-full"
          initial={false}
          animate={{ opacity: dimmed ? 0.45 : 1 }}
          transition={dimmed ? enterT(duration.fast) : exitT(duration.fast)}
        >
          <Body {...ctx} />
        </motion.div>
      </motion.div>
    </Link>
  )
}

// The Link's own classes per layout (it never transforms)
const SHELL: Record<EntryLayout, string> = {
  index: '',
  lead: '',
  card: '[container-type:inline-size]',
  wall: '[container-type:inline-size]',
  strip: 'shrink-0 snap-start w-full sm:w-[min(420px,72vw)] [container-type:inline-size]',
  dossier: '',
}

type Ctx = { entry: Entry; no: string; index: number; reduced: boolean; titleId: string }

/* ── Shared parts ─────────────────────────────────────────────────────────── */

/** The title, with the hook phrase marked in accent.warm when asked. Underline cross-fades
    in on hover/focus in every layout (also the reduced-motion signal). */
function Title({ ctx, className, hook = false, as: Tag = 'h3' }: { ctx: Ctx; className: string; hook?: boolean; as?: 'h3' | 'h4' }) {
  const { title, hook: phrase } = ctx.entry
  const at = hook && phrase ? title.indexOf(phrase) : -1
  return (
    <Tag id={ctx.titleId} className={`m-0 font-grotesk text-balance ${className}`}>
      <span className="underline decoration-transparent decoration-2 underline-offset-[0.18em] transition-[text-decoration-color] duration-150 group-hover:decoration-accent-warm group-focus-visible:decoration-accent-warm">
        {at < 0 ? (
          title
        ) : (
          <>
            {title.slice(0, at)}
            {/* A marker stroke under the hook: the text stays foundation-900 over it */}
            <span className="[box-decoration-break:clone] bg-[linear-gradient(to_bottom,transparent_76%,theme(colors.accent.warm)_76%,theme(colors.accent.warm)_92%,transparent_92%)]">
              {phrase}
            </span>
            {title.slice(at + phrase!.length)}
          </>
        )}
      </span>
    </Tag>
  )
}

function CompanyPill({ company, tone = 'light' }: { company: string; tone?: 'light' | 'ink' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-label font-grotesk uppercase ${
        tone === 'ink' ? 'border-foundation-600 text-foundation-200' : 'border-foundation-400 text-foundation-800'
      }`}
    >
      {company}
    </span>
  )
}

/** Company pill, then the role: who and as what, right under the title */
function Byline({ entry, tone = 'light' }: { entry: Entry; tone?: 'light' | 'ink' }) {
  return (
    <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
      <CompanyPill company={entry.sheet.company} tone={tone} />
      <span className={`text-body-sm font-sans ${tone === 'ink' ? 'text-foundation-300' : 'text-foundation-700'}`}>{entry.sheet.role}</span>
    </p>
  )
}

/** "Read the case study" with a drawn arrow: the stated action, underlined on hover */
function ReadLink({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-body-sm font-grotesk font-medium text-foundation-900 ${className}`}>
      <span className="underline decoration-foundation-300 underline-offset-4 group-hover:decoration-accent-warm group-focus-visible:decoration-accent-warm transition-[text-decoration-color] duration-150">
        Read the case study
      </span>
      <ArrowUpRight className="w-4 h-4 text-accent-warm" strokeWidth={2} aria-hidden="true" />
    </span>
  )
}

// `relative` unless the caller positions it: in Tailwind's order `relative` beats `absolute`
const positioned = (className: string) => (/\babsolute\b/.test(className) ? '' : 'relative')

/** A project screen. Placeholder entries get typographic art instead; stand-in media is labelled. */
function Art({ ctx, i = 0, sizes, className = '', imgClassName = '', label = true }: { ctx: Ctx; i?: number; sizes: string; className?: string; imgClassName?: string; label?: boolean }) {
  const { entry } = ctx
  const m = entry.media[i] ?? entry.media[0]
  if (!m) return <PlaceholderArt ctx={ctx} className={className} />
  return (
    <div className={`${positioned(className)} overflow-hidden ${className}`}>
      <Image src={m.src} alt="" fill sizes={sizes} className={`object-cover object-left-top ${imgClassName}`} />
      {label && entry.mediaPlaceholder && (
        <span className="absolute left-2 bottom-2 max-w-[calc(100%-16px)] px-1.5 py-1 rounded-sm bg-body text-label font-grotesk uppercase text-foundation-700">
          Placeholder media
        </span>
      )}
    </div>
  )
}

/** Typographic stand-in for a placeholder entry: its number set large on its own tint */
function PlaceholderArt({ ctx, className = '' }: { ctx: Ctx; className?: string }) {
  const t = TINT[ctx.entry.tint]
  return (
    // A size container: when a cover leaves the art little height, the number steps aside
    // so the label always fits whole
    <div className={`${positioned(className)} overflow-hidden [container-type:size] ${t.bg} ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0 10px, rgb(120 113 108 / 0.14) 10px 11px)' }}
      />
      <div className="relative h-full flex flex-col justify-between gap-2 p-3">
        <span className={`hidden [@container(min-height:110px)]:block font-grotesk text-heading-xl leading-none ${t.text}`}>{ctx.no}</span>
        <span className={`self-start px-1.5 py-1 rounded-sm bg-body text-label font-grotesk uppercase text-foundation-700`}>Placeholder case study</span>
      </div>
    </div>
  )
}

/** Inked stamp. Words are large and bold (24px), so accent.warm passes as large text (4.1:1). */
function Stamp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 border-[3px] border-accent-warm rounded-[3px] font-grotesk font-bold uppercase text-heading-m !leading-none tracking-[0.06em] text-accent-warm mix-blend-multiply ${className}`}
    >
      {children}
    </span>
  )
}

/* The 3D stage: perspective on a decoration layer (pointer-events off, so a moving cover
   can't flicker the hover), its height reserved from the object's size so nothing around
   it shifts, and a contact shadow that grows and softens as the object lifts. */
function Stage({ ctx, w, ratio, className = '', children }: { ctx: Ctx; w: string; ratio: number; className?: string; children: ReactNode }) {
  return (
    <div
      className={`relative flex items-end [perspective:1200px] pointer-events-none ${w} ${className}`}
      style={{ height: `calc(var(--w) * ${ratio} * 1cqw + 14cqw)`, paddingBottom: '6cqw' } as CSSProperties}
    >
      <motion.div
        aria-hidden="true"
        data-anim
        className="absolute rounded-[50%]"
        style={{
          left: 'var(--x, 50%)',
          translateX: '-50%',
          bottom: '3.5cqw',
          width: 'calc(var(--w) * 1.04cqw)',
          height: '5cqw',
          background: 'radial-gradient(closest-side, rgb(28 25 23 / 0.3), rgb(28 25 23 / 0))',
        }}
        variants={
          ctx.reduced
            ? { rest: { opacity: 1, transition: FADE }, open: { opacity: 0.6, transition: FADE } }
            : pose({ scaleX: 1, scaleY: 1, opacity: 1 }, { scaleX: 1.14, scaleY: 1.5, opacity: 0.6 }, false)
        }
      />
      {children}
    </div>
  )
}

/** Sheets stacked behind a cover, each further back and offset right/down: the page edges */
function PageEdges({ depth, count = 4 }: { depth: number; count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const k = count - i
        return (
          <div
            key={k}
            className="absolute inset-0 bg-body border border-foundation-300"
            style={{ transform: `translate3d(${k * 0.35}cqw, ${k * 0.25}cqw, ${-(depth * k) / count}cqw)` }}
          />
        )
      })}
    </>
  )
}

/* A cover on a block of pages, idle at -8deg so the fore-edge shows; the front pivots
   from the spine (left edge) on open. `inside` is printed on the first page. */
function Book({ ctx, ratio, pivot = -30, front, inside, frontClass }: { ctx: Ctx; ratio: number; pivot?: number; front: ReactNode; inside?: ReactNode; frontClass: string }) {
  const idle = { rotateY: -8, rotateX: 3 }
  return (
    <motion.div
      data-anim
      className="relative"
      style={{ width: 'calc(var(--w) * 1cqw)', height: `calc(var(--w) * ${ratio} * 1cqw)`, transformStyle: 'preserve-3d', marginLeft: 'var(--ml, auto)', marginRight: 'auto' }}
      variants={pose({ y: 0, ...idle }, { y: -6, ...idle }, ctx.reduced)}
    >
      <PageEdges depth={1.6} />
      <div className="absolute inset-0 bg-body border border-foundation-300 overflow-hidden" style={{ transform: 'translateZ(-0.2cqw)' }}>
        {inside}
      </div>
      <motion.div
        data-anim
        className={`absolute inset-0 overflow-hidden shadow-[inset_4px_0_0_rgb(28_25_23/0.14)] ${frontClass}`}
        style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
        variants={pose({ rotateY: 0 }, { rotateY: pivot }, ctx.reduced)}
      >
        {front}
      </motion.div>
    </motion.div>
  )
}

/* ── 1. Index rows ────────────────────────────────────────────────────────── */

function IndexRow(ctx: Ctx) {
  const { entry } = ctx
  const t = TINT[entry.tint]
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6 py-10 border-t border-border">
      {/* the one moment: an accent tick draws in beside the number */}
      <motion.span
        aria-hidden="true"
        data-anim
        className="absolute left-0 top-0 h-0.5 w-12 bg-accent-warm origin-left"
        variants={ctx.reduced ? reveal(true) : pose({ scaleX: 0 }, { scaleX: 1 }, false)}
      />
      <div className="lg:col-span-7 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 sm:gap-x-8 gap-y-5">
        <span aria-hidden="true" className="font-grotesk text-heading-l sm:text-display-xl !leading-none text-foundation-500 tabular-nums">
          {ctx.no}
        </span>
        <div className="flex flex-col gap-4">
          <Title ctx={ctx} className="text-heading-m sm:text-heading-l text-foundation-900" />
          <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
            <CompanyPill company={entry.sheet.company} />
          </p>
          <p className="m-0 text-body-sm sm:text-body sm:text-foundation-700 text-foundation-700 max-w-xl">{entry.summary}</p>
        </div>
        <div className="col-span-2 sm:col-start-2 sm:col-span-1 flex flex-col gap-5">
          <CoverSheet data={entry.sheet} layout="strip" />
          <ReadLink />
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className={`relative aspect-[16/10] rounded-lg overflow-hidden ${t.bg}`}>
          <motion.div
            data-anim
            className="absolute inset-x-[7%] top-[9%] bottom-0 rounded-t-md overflow-hidden shadow-lift bg-body"
            variants={pose({ y: 0 }, { y: -8 }, ctx.reduced)}
          >
            <Art ctx={ctx} sizes="(min-width: 1024px) 440px, 90vw" className="absolute inset-0" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ── 2. Front-page lead (+ cards) ─────────────────────────────────────────── */

function LeadStory(ctx: Ctx) {
  const { entry } = ctx
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <motion.div data-anim className="lg:col-span-7" variants={pose({ y: 0 }, { y: -6 }, ctx.reduced)}>
          {entry.media[0] ? (
            <BrowserMockup image={{ src: entry.media[0].src, alt: entry.media[0].alt }} url={`${entry.sheet.company} · ${entry.sheet.scope}`} />
          ) : (
            <PlaceholderArt ctx={ctx} className="aspect-[16/10] rounded-lg" />
          )}
        </motion.div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Title ctx={ctx} hook className="text-heading-xl lg:text-display-xl text-foundation-900" />
          <Byline entry={entry} />
          <p className="m-0 text-body font-sans text-foundation-700">{entry.summary}</p>
          {/* The call to action as an inked stamp; it straightens as you arrive */}
          <motion.span data-anim className="self-start" variants={pose({ rotate: -3 }, { rotate: 0 }, ctx.reduced)}>
            <Stamp>
              Read the case study
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
            </Stamp>
          </motion.span>
        </div>
      </div>
      {entry.quote && <PullQuote>{entry.quote}</PullQuote>}
      <CoverSheet data={entry.sheet} layout="strip" />
    </div>
  )
}

function CoverCard(ctx: Ctx) {
  const { entry } = ctx
  const t = TINT[entry.tint]
  return (
    <div className="flex flex-col gap-5">
      <Stage ctx={ctx} w="[--w:86]" ratio={0.62}>
        <Book
          ctx={ctx}
          ratio={0.62}
          pivot={-28}
          frontClass={t.bg}
          front={
            <div className="absolute inset-[6%] bottom-0 rounded-t-sm overflow-hidden shadow-lift bg-body">
              <Art ctx={ctx} sizes="(min-width: 1024px) 420px, 80vw" className="absolute inset-0" />
            </div>
          }
        />
      </Stage>
      <Title ctx={ctx} className="text-heading-m text-foundation-900" />
      <p className="m-0 text-body-sm font-sans text-foundation-700">{entry.summary}</p>
      <CoverSheet data={entry.sheet} layout="strip" />
    </div>
  )
}

/* ── 3. Issue wall ────────────────────────────────────────────────────────── */

function WallCover(ctx: Ctx) {
  const { entry } = ctx
  const t = TINT[entry.tint]
  return (
    <div className="flex flex-col gap-5">
      {/* Left-aligned on desktop to leave room for the sheet to slide out; centred below lg */}
      <Stage ctx={ctx} w="[--w:62] lg:[--ml:4cqw] lg:[--x:35cqw]" ratio={1.3}>
        {/* The full sheet, tucked behind the cover; it slides out to the right on open.
            Desktop only: narrower covers are shorter than the sheet, and touch shows the
            full sheet below the caption instead. */}
        <motion.div
          data-anim
          aria-hidden="true"
          className="hidden lg:block absolute bottom-[10cqw] left-[22cqw] w-[46cqw] bg-body border border-foundation-300 shadow-lift p-[1.5cqw]"
          variants={
            ctx.reduced
              ? { rest: { opacity: 0, x: '70%', transition: FADE }, open: { opacity: 1, x: '70%', transition: FADE } }
              : pose({ x: '0%', rotate: 0 }, { x: '70%', rotate: 2 }, false)
          }
        >
          <div className="overflow-hidden">
            <div className="origin-top-left scale-[0.62] w-[161%] -mb-[38%]">
              <CoverSheet data={entry.sheet} fileNo={ctx.no} dense />
            </div>
          </div>
        </motion.div>
        <Book
          ctx={ctx}
          ratio={1.3}
          pivot={-30}
          frontClass={`${t.bg} flex flex-col`}
          front={
            <>
              {/* Masthead */}
              <div className={`mx-[5cqw] mt-[4cqw] pb-[2cqw] border-b-2 ${t.rule} flex items-end justify-between gap-3`} aria-hidden="true">
                <span className={`font-grotesk font-semibold text-heading-m !leading-none ${t.text}`}>{entry.sheet.company}</span>
                <span className={`text-label font-grotesk uppercase ${t.sub}`}>No. {ctx.no}</span>
              </div>
              <div className="px-[5cqw] pt-[3cqw]">
                <Title ctx={ctx} className={`text-body lg:text-heading-m font-medium ${t.text} ${t.text}`} />
              </div>
              {/* The art takes whatever height the title leaves */}
              <div className="relative flex-1 min-h-[18%] mx-[5cqw] mt-[3cqw] mb-[5cqw] rounded-sm overflow-hidden shadow-lift bg-body">
                <Art ctx={ctx} sizes="(min-width: 1024px) 300px, 60vw" className="absolute inset-0" />
              </div>
            </>
          }
        />
      </Stage>
      <CoverSheet data={entry.sheet} layout="caption" />
      {/* No hover on touch: the full sheet sits here instead (screen readers always get it) */}
      <div className="[@media(hover:hover)]:sr-only">
        <CoverSheet data={entry.sheet} fileNo={ctx.no} tone="fill" />
      </div>
    </div>
  )
}

/* ── 4. Spotlight strip ───────────────────────────────────────────────────── */

function StripCard(ctx: Ctx) {
  const { entry } = ctx
  const t = TINT[entry.tint]
  const extra = entry.media.slice(1, 3)
  return (
    <div className="flex flex-col gap-5">
      <div className="relative [perspective:1200px] pointer-events-none">
        <motion.div
          data-anim
          className={`relative aspect-[4/3] rounded-xl ${t.bg}`}
          style={{ transformStyle: 'preserve-3d' }}
          variants={pose({ rotateY: -8, rotateX: 4, y: 0 }, { rotateY: 0, rotateX: 10, y: -6 }, ctx.reduced)}
        >
          {/* The main screen, inside the frame */}
          <div className="absolute inset-x-[8%] top-[10%] bottom-0 rounded-t-md overflow-hidden shadow-lift bg-body">
            <Art ctx={ctx} sizes="(min-width: 640px) 380px, 90vw" className="absolute inset-0" label={extra.length === 0} />
          </div>
          {/* The other screens: tucked in at rest, they break out of the frame on open */}
          {extra.map((m, i) => (
            <motion.div
              key={m.src}
              data-anim
              className={`absolute w-[46%] aspect-[4/3] rounded-md overflow-hidden shadow-lift bg-body border border-foundation-300 ${
                i === 0 ? 'right-[4%] bottom-[6%]' : 'left-[4%] bottom-[14%]'
              }`}
              variants={pose(
                { x: '0%', y: '0%', z: 0, rotate: i === 0 ? 3 : -3 },
                { x: i === 0 ? '14%' : '-12%', y: i === 0 ? '-118%' : '-92%', z: 60, rotate: i === 0 ? 5 : -5 },
                ctx.reduced,
              )}
            >
              <Image src={m.src} alt="" fill sizes="200px" className="object-cover object-left-top" />
            </motion.div>
          ))}
          {entry.mediaPlaceholder && (
            <span className="absolute left-3 top-3 px-1.5 py-1 rounded-sm bg-body text-label font-grotesk uppercase text-foundation-700">
              Placeholder media
            </span>
          )}
        </motion.div>
      </div>
      <div className="flex flex-col gap-3">
        <Title ctx={ctx} className="text-heading-m text-foundation-900" />
        <CoverSheet data={entry.sheet} layout="caption" />
      </div>
      <div className="[@media(hover:hover)]:sr-only">
        <CoverSheet data={entry.sheet} fileNo={ctx.no} tone="fill" />
      </div>
    </div>
  )
}

/* ── 5. Dossier ───────────────────────────────────────────────────────────── */

function Dossier(ctx: Ctx) {
  const { entry } = ctx
  const tilt = ctx.index % 2 ? 0.6 : -0.5
  const shipped = entry.sheet.status.toLowerCase() !== 'draft'
  const fields: [string, string][] = [
    ['Company', entry.sheet.company],
    ['Role', entry.sheet.role],
    ['Dates', entry.sheet.dates],
    ['Scope', entry.sheet.scope],
  ]
  if (entry.sheet.outcome) fields.push(['Outcome', entry.sheet.outcome])
  return (
    <motion.div
      data-anim
      className="relative bg-body border border-foundation-300 rounded-[2px] shadow-lift px-6 py-8 sm:px-10 sm:py-10"
      // the one moment: the sheet straightens and lifts off the stack
      variants={pose({ rotate: tilt, y: 0 }, { rotate: 0, y: -4 }, ctx.reduced)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Title ctx={ctx} className="text-heading-m sm:text-heading-l text-foundation-900" />
          {/* The cover sheet IS the page: a ruled form, set large */}
          <dl className="m-0 border-t-2 border-foundation-900 divide-y divide-border">
            {fields.map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 sm:grid-cols-[120px_minmax(0,1fr)] gap-x-6 gap-y-1 py-3">
                <dt className="text-label font-grotesk uppercase text-foundation-600 sm:pt-1.5">{label}</dt>
                <dd className="m-0 text-body sm:text-heading-m sm:text-foundation-900 font-grotesk text-foundation-900">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 text-body-sm font-sans text-foundation-700 max-w-xl">{entry.summary}</p>
          <ReadLink />
        </div>
        <div className="lg:col-span-5 flex flex-col items-center gap-8 lg:pt-6">
          {/* The image, clipped on */}
          <div className="relative w-full max-w-sm rotate-[1.5deg] bg-body border border-foundation-300 p-2 pb-8 shadow-lift">
            <Art ctx={ctx} sizes="(min-width: 1024px) 380px, 90vw" className="aspect-[4/3]" />
            <Paperclip className="absolute -top-5 right-10 w-6 h-14 text-foundation-500" />
          </div>
          <Stamp className="-rotate-6">{shipped ? 'Shipped' : 'Draft'}</Stamp>
        </div>
      </div>
      <span aria-hidden="true" className="absolute right-4 top-3 text-label font-grotesk uppercase text-foundation-600">
        File {ctx.no}
      </span>
    </motion.div>
  )
}

function Paperclip({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M8 44V12a6 6 0 0 1 12 0v34a9 9 0 0 1-18 0V18" />
    </svg>
  )
}

/* ── Lists ────────────────────────────────────────────────────────────────── */

/** How each layout arranges its entries */
export function CaseStudyList({ layout, entries }: { layout: Exclude<EntryLayout, 'card'>; entries: Entry[] }) {
  const [active, setActive] = useState<string | null>(null)

  if (layout === 'lead') {
    const [lead, ...rest] = entries
    return (
      <div className="flex flex-col gap-16">
        <CaseStudyEntry entry={lead} layout="lead" index={0} />
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-16 border-t border-border pt-12">
            {rest.map((e, i) => (
              <CaseStudyEntry key={e.id} entry={e} layout="card" index={i + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }
  if (layout === 'wall') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-16">
        {entries.map((e, i) => (
          <CaseStudyEntry key={e.id} entry={e} layout="wall" index={i} />
        ))}
      </div>
    )
  }
  if (layout === 'strip') {
    return (
      // Sideways on tablet and up (native scroll and snap, no scroll-jacking); a column on
      // phones. Top padding leaves room for screens breaking out of the frames. It runs to
      // the viewport's right edge, so a cut-off card reads as "more this way" (the page
      // clips x overflow). Paint containment: without it Chrome counts the 3D cards toward
      // the page's scroll width.
      <div
        className="flex flex-col sm:flex-row gap-14 sm:gap-8 sm:overflow-x-auto sm:[contain:paint] sm:snap-x sm:snap-mandatory pt-4 sm:pt-28 pb-6 sm:-ml-10 sm:pl-10 sm:mr-[calc(50%-50vw)] sm:pr-10 sm:scroll-px-10 lg:-ml-section lg:pl-section lg:scroll-px-section [scrollbar-width:thin] [scrollbar-color:theme(colors.foundation.400)_transparent]"
        onPointerLeave={() => setActive(null)}
      >
        {entries.map((e, i) => (
          <CaseStudyEntry
            key={e.id}
            entry={e}
            layout="strip"
            index={i}
            dimmed={active !== null && active !== e.id}
            onActiveChange={(on) => setActive((cur) => (on ? e.id : cur === e.id ? null : cur))}
          />
        ))}
      </div>
    )
  }
  if (layout === 'dossier') {
    return (
      <div className="flex flex-col gap-12 lg:gap-16">
        {entries.map((e, i) => (
          // Files offset left and right, like a stack spread on a desk
          <div key={e.id} className={`w-full lg:w-[88%] ${i % 2 ? 'lg:ml-auto' : ''}`}>
            <CaseStudyEntry entry={e} layout="dossier" index={i} />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="border-b border-border">
      {entries.map((e, i) => (
        <CaseStudyEntry key={e.id} entry={e} layout="index" index={i} />
      ))}
    </div>
  )
}
