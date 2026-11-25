'use client'
import { AnimatedSection } from '@/components/AnimatedSection'
import { LightboxProvider, LightboxTrigger } from '@/components/Lightbox'
import { AiNote, AnnotatedImage } from './Sketch'
import { issueGroups, issues, requirementsId, type Issue } from './approvedScreen'

/* 01 · Requirements gathering, the first design feature (Nov 24 2026: Michael picked option D,
   "Before / after", from /dev/requirements-layouts).

   STORY. The question, then the problem in one line, then two cards side by side that mirror each
   other:
     before  What leadership approved: the AI CoE's screen, five numbered issues
     after   What I did first: the journey map, five numbered points
   Each card runs label → title → one line → pinned image → three groups. Both cards use the same
   groups in the same order (Wasted screen space, A broken flow, Unclear or missing actions): the
   before tags each with its usability heuristics, the after with the issues it answers ("answers 2
   and 5"). Numbers are always the image's pin numbers, so a group may list them out of order.

   ALIGNMENT. On desktop both cards span the same seven subgrid rows (label, title, line, image, one
   per group), so the images and each pair of group headings start on the same line, and both cards
   end together with no dead space.

   ENLARGE. Each image opens in the Lightbox with its pins and pen circles (Lightbox `content`).

   TYPE. Handwriting only for the before/after labels and the pen circles; statements in the serif,
   details in sans.

   Opens without a hairline: the Part two chapter break sits directly above it. */

const question = 'What was missing from the approved screen?'
const problem = 'Leadership approved one screen built with AI. There was no user flow behind it.'

type Item = Issue

// ── Before: the AI CoE's screen ───────────────────────────────────────────────────────────────
// The five issues live in approvedScreen.ts. Circles in
// the screenshot's 2552 x 1456 overlay units, in the same order.
const screenCircles = [
  'M 60 150 C 220 130, 380 150, 385 300 C 395 520, 392 760, 370 900 C 300 935, 120 930, 50 905 C 22 700, 25 400, 42 190 C 45 165, 70 152, 110 148',
  'M 440 232 C 900 220, 1700 222, 2215 232 C 2245 260, 2245 370, 2215 395 C 1700 405, 900 404, 430 395 C 405 370, 405 260, 470 230',
  'M 2300 150 C 2380 140, 2480 142, 2508 160 C 2522 185, 2515 215, 2490 222 C 2400 230, 2320 228, 2295 215 C 2282 195, 2285 160, 2330 148',
  'M 1990 575 C 2060 565, 2095 600, 2092 820 C 2092 1000, 2075 1075, 2020 1078 C 1960 1080, 1950 1000, 1952 820 C 1955 640, 1960 585, 2010 572',
  'M 2160 405 C 2300 398, 2470 400, 2512 420 C 2525 700, 2522 1100, 2510 1405 C 2400 1418, 2250 1418, 2135 1405 C 2125 1100, 2125 700, 2135 430 C 2138 412, 2150 406, 2190 404',
]
const SCREEN = {
  src: '/images/data-conversion-app/initial-designs/ai-coe-first-screen.png',
  width: 3070,
  height: 1752,
  box: [2552, 1456] as [number, number],
  alt: 'The screen the AI CoE built and leadership approved: a left menu of seven sections, summary cards, a Run Mapping button, an AI mapping table with Accept on every row, and an AI assistant panel. Five areas are circled and numbered.',
}

// ── After: the journey map ────────────────────────────────────────────────────────────────────
// pin: % of the map. Circles in its 2380 x 1546 overlay units, in the same order.
const steps: Item[] = [
  { title: 'One journey, five stages', detail: 'The work runs as one flow, from agreement to conversion and sync. The screen should keep that work together on one page.', pin: [12, 10.7] },
  { title: 'The low point', detail: 'Grouping tables and comparing fields one by one was hardest for new data engineers. That’s what the screen needed to help with, not summary counts.', pin: [44.5, 74.4] },
  { title: 'Where AI starts', detail: 'AI batches the tables and drafts the first field-to-field mapping. It belongs inside the mapping step, not in a side panel.', pin: [46.2, 49.8] },
  { title: 'The state stays in the loop', detail: 'Each batch is reviewed with the state, who corrects or approves it. People need to edit the AI’s picks, not only accept them.', pin: [62.1, 26.5] },
  { title: 'AI drafts the rules too', detail: 'After mapping comes transformation, so the next action should say that plainly. Then nobody has to guess what “Run Mapping” does.', pin: [80, 49.8] },
]

// The after card in the before card's three groups, same order, so each group sits across from the
// one it answers. Numbers stay the map's pin numbers. The tag names the before issues it answers.
type Group = { heading: string; tags: string[]; issues: number[] }
const beforeGroups: Group[] = issueGroups.map((g) => ({ heading: g.heading, tags: g.heuristics, issues: g.issues }))
const afterGroups: Group[] = [
  { heading: issueGroups[0].heading, tags: [], issues: [2, 3] },
  { heading: issueGroups[1].heading, tags: [], issues: [1] },
  { heading: issueGroups[2].heading, tags: [], issues: [4, 5] },
]
const mapCircles = [
  'M 300 150 C 900 138, 1600 140, 1915 152 C 1935 175, 1935 235, 1912 252 C 1500 262, 800 262, 285 250 C 262 225, 262 172, 320 150',
  'M 892 1120 C 1010 1118, 1060 1200, 1040 1290 C 1010 1370, 800 1380, 740 1300 C 690 1230, 740 1130, 900 1118',
  'M 700 760 C 820 740, 1050 744, 1090 790 C 1110 850, 1090 920, 900 920 C 760 922, 690 890, 696 820 C 698 790, 720 770, 760 762',
  'M 1120 262 C 1250 252, 1420 255, 1478 270 C 1495 320, 1492 395, 1470 420 C 1350 432, 1200 430, 1112 420 C 1098 380, 1098 300, 1125 265',
  'M 1540 755 C 1700 745, 1870 748, 1902 765 C 1915 800, 1912 860, 1895 885 C 1750 895, 1600 893, 1525 882 C 1512 850, 1512 790, 1545 758',
]
const MAP = {
  src: '/images/data-conversion-app/requirement-gathering/journey-map-horizontal.png',
  width: 3600,
  height: 2338,
  box: [2380, 1546] as [number, number],
  alt: 'The customer journey map for data conversion, from agreement to conversion and sync. Five areas are circled and numbered: the stages, the low point at initial mapping, where AI starts, the state’s review, and AI drafting the transformation rules.',
}

// ── Pieces ────────────────────────────────────────────────────────────────────────────────────
const pinBase =
  'absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-warm font-sans text-[11px] font-semibold text-white shadow-md ring-2 ring-white sm:h-7 sm:w-7 sm:text-[13px]'

type Img = typeof SCREEN
function Pinned({ img, circles, items }: { img: Img; circles: string[]; items: Item[] }) {
  return (
    <div className="relative">
      <AnnotatedImage src={img.src} width={img.width} height={img.height} alt={img.alt} box={img.box} marks={circles.map((d) => ({ d }))} />
      {items.map((it, i) => (
        <span key={i} aria-hidden="true" style={{ left: `${it.pin[0]}%`, top: `${it.pin[1]}%` }} className={pinBase}>{i + 1}</span>
      ))}
    </div>
  )
}

function Point({ n, it }: { n: number; it: Item }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-warm font-sans text-[12px] font-semibold text-white">{n}</span>
      <div>
        <p className="m-0 font-sans text-body font-medium text-foundation-900"><span className="sr-only">{n}. </span>{it.title}</p>
        <p className="m-0 mt-0.5 font-sans text-body-sm text-foundation-600">{it.detail}</p>
      </div>
    </li>
  )
}

/* One group: a heading, small quiet tag(s), then its points by their pin numbers (so possibly out
   of order). Every group after the first opens on a hairline. Each group is its own subgrid row,
   so matching groups in the two cards start at the same height. */
function GroupBlock({ g, items, first, tagLabel }: { g: Group; items: Item[]; first: boolean; tagLabel: string }) {
  return (
    <section className={first ? 'mt-6' : 'mt-6 border-t border-foundation-900/10 pt-6'}>
      <h4 className="m-0 font-display text-[19px] font-medium leading-snug text-foundation-900">{g.heading}</h4>
      {g.tags.length === 0 ? (
        // no tags (the after card, Nov 25: "answers 2 and 5" read as a decode-me device): a spacer the
        // height of a tag row keeps its points level with the before card's on wide screens
        <div aria-hidden="true" className="mt-2 hidden h-[26px] lg:block" />
      ) : (
      <ul className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0" aria-label={tagLabel}>
        {g.tags.map((t) => (
          <li key={t} className="rounded-full border border-solid border-foundation-900/15 px-2.5 py-0.5 font-sans text-[12px] leading-5 text-foundation-600">{t}</li>
        ))}
      </ul>
      )}
      <ul className="m-0 mt-4 list-none space-y-4 p-0">
        {g.issues.map((n) => <Point key={n} n={n} it={items[n - 1]} />)}
      </ul>
    </section>
  )
}

// Desktop rows per card (lg:row-span-7 below): label, title, line, image, then one per group (3)

function Card({ tone, label, title, line, img, circles, items, groups, tagLabel }: { tone: string; label: string; title: string; line: string; img: Img; circles: string[]; items: Item[]; groups: Group[]; tagLabel: string }) {
  const pinned = <Pinned img={img} circles={circles} items={items} />
  return (
    <section className={`flex flex-col rounded-2xl p-4 sm:p-6 lg:row-span-7 lg:grid lg:grid-rows-subgrid ${tone}`}>
      <p className="m-0 font-hand text-[24px] leading-tight text-accent-warm">{label}</p>
      <p className="m-0 mt-1 font-display text-heading-m font-medium text-foundation-900">{title}</p>
      <p className="m-0 mt-2 font-sans text-body-sm text-foundation-700">{line}</p>
      <div className="relative mt-4 self-start rounded-xl bg-white p-2">
        {pinned}
        {/* click to enlarge, pins and circles included */}
        <LightboxTrigger always src={img.src} alt={img.alt} content={pinned} ratio={img.width / img.height} />
      </div>
      {groups.map((g, i) => <GroupBlock key={g.heading} g={g} items={items} first={i === 0} tagLabel={tagLabel} />)}
    </section>
  )
}

export function RequirementsFeature() {
  return (
    <section id={requirementsId} className="scroll-mt-24 px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto pt-6">
        <AnimatedSection>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="m-0 font-sans text-label uppercase tracking-widest text-foundation-500">01 · Requirements gathering</p>
              <h3 className="m-0 mt-3 font-display text-heading-xl font-medium leading-[1.1] text-foundation-900">{question}</h3>
              <p className="m-0 mt-6 max-w-3xl font-display text-heading-m font-medium leading-[1.2] text-foundation-900">{problem}</p>
            </div>
            {/* Nov 25: Michael confirmed the journey map image was polished by ChatGPT. */}
            <AiNote className="rotate-1 lg:col-span-4">
              I built the journey map and flows in Figma. ChatGPT turned the approved version into the clean visual in the ‘after’ card: about 1 hour instead of 1.5 days.
            </AiNote>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <LightboxProvider>
            <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-y-0">
              <Card tone="bg-stage-ginger" label="before" title="What leadership approved" line="Built by the AI CoE to get the process approved." img={SCREEN} circles={screenCircles} items={issues} groups={beforeGroups} tagLabel="Usability heuristics" />
              <Card tone="bg-stage-sage" label="after" title="What I did first" line="I mapped the real process with the VP of Implementation and the AI CoE." img={MAP} circles={mapCircles} items={steps} groups={afterGroups} tagLabel="Answers" />
            </div>
          </LightboxProvider>
        </AnimatedSection>
      </div>
    </section>
  )
}
