// Layout D — Track.
//
// STRUCTURE: the only layout where the four steps sit side by side, left to right, on one
// connecting line. Sequence is the visual's first statement — you see a process before you read
// a word — and dominance comes from Step 1 taking most of the track's length as a solid card
// while steps 2 to 4 are markers on the bare line beyond it.
//
// NOT A TIME BAR. A continuous bar divided into four proportional segments would claim durations
// for steps 2 to 4, and no such durations exist. Two things keep this from reading that way: the
// track is a HAIRLINE with objects sitting on it, not a filled bar; and there are open gaps
// between the card and each marker, so nothing tiles edge to edge. The card's width is a
// statement of importance, not of length.
//
// MOBILE: the track rotates. The same hairline becomes a vertical border-l with the card and the
// markers hung off it in order — a track is still a track on its side, and nothing is dropped.
//
// WHY NOT SectionHeader: its h2 is fixed at text-heading-xl (36px) and cannot carry the statement
// at the scale the squint test needs. The eyebrow below is its markup copied exactly.
import { RailPill } from '@/components/Rail'
import { AnimatedSection } from '@/components/AnimatedSection'

const setup = 'Programs used to accept 12 to 24 month implementations. Now they want 5 to 8.'

const heading = '4 to 6 weeks, mapped by hand'

const stepOneLabels = [
  'Longest step',
  '4 to 5 people, in spreadsheets',
  '~40 fields per provider table',
  'Every rule written by hand',
]

// Each marker carries its owner under its name, so step 3 keeps the full "Fixes by Acentra
// Health" only where no owner line follows it. Here an owner line does follow, so it is "Fixes".
const restSteps = [
  { name: 'State review', owner: 'State' },
  { name: 'Fixes', owner: 'Acentra Health' },
  { name: 'State approval', owner: 'State' },
]

export default function ProblemD() {
  return (
    <section className="px-section pb-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="border-t border-border pt-section">

            <div className="flex flex-col gap-3">
              <p className="text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                The Problem
              </p>
              <div className="w-8 h-px bg-accent-warm" />
            </div>

            <p className="mt-8 max-w-xl text-body-sm font-sans text-foundation-500">{setup}</p>

            <h2 className="mt-5 max-w-4xl text-display-xl lg:text-display-2xl font-grotesk text-foundation-900">
              {heading}
            </h2>

            {/* ── The track ──
                Below lg: a vertical hairline on the left with everything hung off it.
                From lg:  a horizontal hairline with the card and three markers sitting on it.
                One element draws the line in each direction, so the alignment cannot drift. */}
            <div className="mt-14">
              <div className="relative border-l border-border pl-8 lg:border-l-0 lg:pl-0">

                {/* The horizontal rule, lg and up. Vertically centred behind the row. */}
                <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-border" />

                <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-8">

                  {/* Step 1 — the card on the track. basis-7/12 gives it most of the length
                      without tiling into the markers; the gap-8 beside it keeps the break
                      visible, which is what stops the row reading as a divided bar. */}
                  <div className="lg:basis-7/12 lg:shrink-0">
                    <div className="rounded-lg border border-border bg-foundation-100 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                        <p className="text-heading-m font-grotesk text-foundation-900">
                          Mapping &amp; transformation
                        </p>
                        <RailPill accent>This project</RailPill>
                      </div>

                      <p className="mt-2 text-label font-grotesk text-foundation-500 uppercase tracking-widest">
                        Acentra Health
                      </p>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5">
                        {stepOneLabels.map((l) => (
                          <p
                            key={l}
                            className="text-label font-grotesk text-foundation-600 uppercase tracking-widest"
                          >
                            {l}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Steps 2 to 4 — markers on the bare line. Each sits on the page ground, so the
                      rule appears to pass behind them. */}
                  <div className="flex flex-col gap-8 sm:flex-row sm:gap-6 lg:flex-1 lg:justify-between">
                    {restSteps.map((s) => (
                      <div key={s.name} className="bg-body sm:flex-1 lg:pr-4">
                        <span className="block w-1.5 h-1.5 rounded-full bg-foundation-400" />
                        <p className="mt-3 text-body font-grotesk text-foundation-600">{s.name}</p>
                        <p className="mt-1 text-label font-grotesk text-foundation-400 uppercase tracking-widest">
                          {s.owner}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 border-t border-border pt-14">
              <div className="rounded-lg bg-foundation-900 px-6 py-12 sm:px-12 sm:py-16">
                <p className="max-w-3xl text-heading-m sm:text-heading-l lg:text-heading-xl font-grotesk text-body">
                  Could AI draft <span className="text-accent-warm">20 to 25</span> of those 40
                  fields, rules included?
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
