import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'

// TEMPORARY PREVIEW — five layouts for a new "The problem" section of the Data Conversion App
// case study, to sit between At a glance and Process timeline. Not linked, noindex'd. Delete this
// route once one is chosen; /work/data-conversion-app is untouched.
//
// THE JOB
// Three seconds: four steps, the first is the longest, it is done by hand, and it is what this
// project targets. Step 1 is the subject; steps 2 to 4 are context and must read as lesser without
// becoming decoration. Budget is about 60 words for the whole section.
//
// WHO OWNS WHICH STEP, WITHOUT SPENDING WORDS ON IT
// Filled block = Acentra Health does it (steps 1 and 3). Outlined block on the page ground = the
// state does it (steps 2 and 4). One visual rule, no legend, no labels. The horizontal layouts
// reinforce it a second way, by sitting the state's steps lower than Acentra Health's.
//
// WHY accent-subtle RATHER THAN accent-warm FOR STEP 1's FILL
// accent-warm (#c2600a) measures 4.15:1 on the cream page ground and 4.03:1 against foundation-900,
// so it fails AA at label sizes either as text or as a fill behind text. Step 1 is therefore filled
// with accent-subtle and edged with accent-warm: the accent does the emphasis as a graphic, where
// 3:1 applies, and every word in the section stays on a compliant ground.
//
// STAYING DIFFERENT FROM ITS NEIGHBOURS
// At a glance is a row of big stat numbers, so none of these is one. Process timeline is a rail
// with pills and dot markers on a drawn line, so nothing here uses those.

export const metadata: Metadata = {
  title: 'The problem — step 1 layouts',
  robots: { index: false, follow: false },
}

const eyebrow = 'The Problem'
const heading = 'About a month, mapped by hand'
const question = 'Could AI map 20 to 25 of those 40 fields?'

const stepOne = { name: 'Mapping & transformation', marker: 'This project' }

// Steps 2 to 4. `mine` is Acentra Health's; the rest are the state's.
const supporting = [
  { name: 'State review', mine: false },
  { name: 'Fixes by Acentra Health', mine: true },
  { name: 'State approval', mine: false },
]

// Attached to step 1 only. "Longest step" leads because it is the one comparative claim the
// section is allowed to make about the four.
const stepOneLabels = [
  'Longest step',
  'About a month',
  '4 to 5 people, in spreadsheets',
  '~40 fields per provider table',
  'Every rule written by hand',
]

const label = 'text-label font-grotesk uppercase tracking-widest'
const graphicLabel =
  'The four-step conversion process. Step one, mapping and transformation, is the longest, is done by hand and is what this project targets. Filled blocks are done by Acentra Health, outlined blocks by the state.'

function Header() {
  return <SectionHeader accessibleEyebrow eyebrow={eyebrow} title={heading} />
}

function DarkBand({ tall }: { tall?: boolean }) {
  return (
    <div className={`bg-foundation-900 p-8 ${tall ? 'flex h-full items-end' : ''}`}>
      <p className="text-heading-m font-grotesk text-body">{question}</p>
    </div>
  )
}

/** A supporting step. Filled = Acentra Health, outlined = the state. */
function SupportStep({ name, mine }: { name: string; mine: boolean }) {
  return (
    <div className={`border border-border px-4 py-3 ${mine ? 'bg-foundation-100' : ''}`}>
      <p className="text-body-sm font-sans text-foundation-500">{name}</p>
    </div>
  )
}

/** Step 1's labels. `inline` runs them across; otherwise they stack. */
function StepOneLabels({ inline, skip }: { inline?: boolean; skip?: string }) {
  const items = stepOneLabels.filter((l) => l !== skip)
  return (
    <div className={inline ? 'flex flex-wrap gap-x-6 gap-y-2' : 'flex flex-col gap-2'}>
      {items.map((l, i) => (
        <p
          key={l}
          className={
            i === 0
              ? `${label} text-foundation-900`
              : 'text-body-sm font-sans text-foundation-600'
          }
        >
          {l}
        </p>
      ))}
    </div>
  )
}

/** The step 1 block itself — accent-subtle fill, accent-warm edge, marker under the name. */
function StepOneHead() {
  return (
    <>
      <p className="text-heading-m font-grotesk text-foundation-900">{stepOne.name}</p>
      <p className={`${label} text-foundation-900 mt-2`}>{stepOne.marker}</p>
    </>
  )
}

// ── 1: Lead panel, supporting rail ──
// Horizontal. Step 1 takes the full width as a filled panel with its labels running across inside
// it; steps 2 to 4 sit beneath as a rail of three, the state's two dropped lower than Acentra
// Health's one. Step 1 leads by area — it is simply the biggest object on the page.
function Layout1() {
  return (
    <>
      <Header />

      <div
        role="img"
        aria-label={graphicLabel}
        className="mt-10 border-t border-border pt-6"
      >
        <div className="border-l-2 border-accent-warm bg-accent-subtle p-6">
          <StepOneHead />
          <div className="mt-4">
            <StepOneLabels inline />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:items-start">
          {supporting.map((s) => (
            <div key={s.name} className={s.mine ? '' : 'sm:mt-6'}>
              <SupportStep {...s} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <DarkBand />
      </div>
    </>
  )
}

// ── 2: The ladder ──
// Vertical. Four rungs down the page, step 1 a tall filled block carrying its labels stacked and
// the other three thin rows beneath it. Acentra Health's steps sit flush left, the state's are
// indented, so the work visibly leaves and comes back without a word spent saying so.
function Layout2() {
  return (
    <>
      <Header />

      <div
        role="img"
        aria-label={graphicLabel}
        className="mt-10 flex flex-col gap-3 border-t border-border pt-6"
      >
        <div className="border-l-2 border-accent-warm bg-accent-subtle p-6">
          <StepOneHead />
          <div className="mt-4">
            <StepOneLabels />
          </div>
        </div>

        {supporting.map((s) => (
          <div key={s.name} className={s.mine ? '' : 'sm:ml-16'}>
            <SupportStep {...s} />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <DarkBand />
      </div>
    </>
  )
}

// ── 3: Subject and context ──
// Split. Step 1 holds the left seven columns with its labels stacked under the name; steps 2 to 4
// are a short list in the right five, set small. The hierarchy is positional rather than scalar —
// the subject is where the eye lands, the context is filed beside it.
function Layout3() {
  return (
    <>
      <Header />

      <div
        role="img"
        aria-label={graphicLabel}
        className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-border pt-6"
      >
        <div className="md:col-span-7 border-l-2 border-accent-warm bg-accent-subtle p-6">
          <StepOneHead />
          <div className="mt-4">
            <StepOneLabels />
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-3 md:pt-10">
          {supporting.map((s) => (
            <SupportStep key={s.name} {...s} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <DarkBand />
      </div>
    </>
  )
}

// ── 4: Context above, band alongside ──
// The band moves out of the closing slot. The four steps run across the top with step 1 taking half
// the strip, then step 1's labels sit below on the left with the dark band as a full-height column
// on the right. The question is still the last thing read across, but the section no longer ends on
// a black slab immediately above the Process timeline.
// "About a month" is dropped here: the heading already says it and the strip is tight.
function Layout4() {
  return (
    <>
      <Header />

      <div
        role="img"
        aria-label={graphicLabel}
        className="mt-10 border-t border-border pt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:items-start">
          <div className="md:col-span-6 border-l-2 border-accent-warm bg-accent-subtle px-4 py-3">
            <p className="text-body-sm font-sans text-foundation-900">{stepOne.name}</p>
            <p className={`${label} text-foundation-900 mt-1`}>{stepOne.marker}</p>
          </div>
          {supporting.map((s) => (
            <div key={s.name} className={`md:col-span-2 ${s.mine ? '' : 'md:mt-4'}`}>
              <SupportStep {...s} />
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <StepOneLabels skip="About a month" />
          </div>
          <div className="md:col-span-5">
            <DarkBand tall />
          </div>
        </div>
      </div>
    </>
  )
}

// ── 5: Unequal four ──
// Horizontal, and the most compressed. All four steps sit on one line, but step 1 takes half the
// width and carries its labels inside its own block while the other three stay single lines. The
// whole process is one object, and the imbalance inside it is the argument.
function Layout5() {
  return (
    <>
      <Header />

      <div
        role="img"
        aria-label={graphicLabel}
        className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-3 border-t border-border pt-6 md:items-start"
      >
        <div className="md:col-span-6 border-l-2 border-accent-warm bg-accent-subtle p-6">
          <StepOneHead />
          <div className="mt-4">
            <StepOneLabels />
          </div>
        </div>

        {supporting.map((s) => (
          <div key={s.name} className={`md:col-span-2 ${s.mine ? '' : 'md:mt-6'}`}>
            <SupportStep {...s} />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <DarkBand />
      </div>
    </>
  )
}

const layouts = [
  {
    title: '1 — Lead panel, supporting rail',
    node: <Layout1 />,
    words: 51,
    shows:
      'Step 1 leads by area — a full-width filled panel with its labels running across inside it — while steps 2 to 4 sit beneath as a rail, the state’s two dropped lower than Acentra Health’s one.',
    trades:
      'Running the five labels across one line makes them read as a strip of fragments rather than a list, and at narrow widths they wrap into an uneven block.',
  },
  {
    title: '2 — The ladder',
    node: <Layout2 />,
    words: 51,
    shows:
      'The process going down the page: step 1 a tall filled block, the other three thin rungs beneath, with the state’s steps indented so the work visibly leaves and comes back.',
    trades:
      'It is the tallest of the five, and reading top to bottom is what the Process timeline does next — the indent and the absence of markers keep them apart, but only just.',
  },
  {
    title: '3 — Subject and context',
    node: <Layout3 />,
    words: 51,
    shows:
      'Hierarchy by position rather than size: step 1 holds the left seven columns as the subject, steps 2 to 4 are filed beside it in the right five, set small and offset down.',
    trades:
      'Side by side makes the four steps read less as a sequence than in the other four, and the right column is short enough that its space runs out before step 1’s does.',
  },
  {
    title: '4 — Context above, band alongside',
    node: <Layout4 />,
    words: 48,
    shows:
      'The four steps as a strip with step 1 taking half of it, then its labels below on the left and the dark band as a full-height column on the right, so the section does not close on black.',
    trades:
      'The band has to fill a column it did not ask for, and splitting step 1 between the strip and the labels below means its detail is no longer inside the block it belongs to.',
  },
  {
    title: '5 — Unequal four',
    node: <Layout5 />,
    words: 51,
    shows:
      'The whole process as one object on a single line, with step 1 taking half the width and carrying its labels inside its own block — the imbalance within the row is the argument.',
    trades:
      'The three supporting steps get two columns each, so their labels are tight, and on a phone the row stacks into something close to layout 2.',
  },
]

export default function ProblemStepLayoutsPage() {
  return (
    <main className="pt-32">
      {layouts.map(({ title, node, words, shows, trades }) => (
        <section key={title} className="px-section pb-section">
          <div className="max-w-6xl mx-auto">
            <p className="mb-8 text-heading-m font-grotesk text-foundation-900">{title}</p>

            <AnimatedSection>{node}</AnimatedSection>

            {/* Preview chrome — the note under each layout, not part of the design. */}
            <div className="mt-10 max-w-3xl border-t border-border pt-6">
              <p className="text-body-sm font-sans text-foundation-500">
                <span className="text-foundation-800">Shows. </span>
                {shows}
              </p>
              <p className="mt-2 text-body-sm font-sans text-foundation-500">
                <span className="text-foundation-800">Trades. </span>
                {trades}
              </p>
              <p className="mt-2 text-caption font-sans text-foundation-800">
                Word count: {words}
              </p>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
