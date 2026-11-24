import { AnimatedSection } from '@/components/AnimatedSection'
import { AnnotatedImage, CropBox, SketchIntro } from './Sketch'

/* 03 · Mapping & transformation, in the sketchbook layout (Sketch.tsx), Nov 24 2026. Michael picked
   M1 from /dev/mapping-layouts: one sage card with the three concepts across the top, each with a
   handwritten verdict, then the shipped screen rising from the card's bottom edge, like 02.

   COPY. Cut from ~330 words. The concepts were built quickly with AI to compare them (Michael), so
   the label says so. Dropped: the long problem/solution card, the concept paragraphs, the crosswalk
   detail (a large crosswalk opens on its own screen) and the filter-by-AI-score caption.

   THE SCREEN is Michael's 'Mapping Screen.png' (Nov 24): the Mapping tab open with source table and
   field, source description, AI confidence score and 'AI recommended'. Three pen notes, no circles:
   the AI confidence pills, the Indicators column (icons appear only when there is something to
   show) and the side panel. Marks are in the image's proportions (2157 x 1708); the screen is
   trimmed at 82% of its height, which keeps the panel's AI score and method in view. */

const dir = '/images/data-conversion-app/mapping-variants/'

const concepts = [
  { title: 'Detail panel', verdict: 'shipped: a lean table, details in a panel', shipped: true, src: dir + 'wireframe-1-detail-panel-labeled.svg', alt: 'Detail panel wireframe: a lean table with a side panel for mapping, transformation and AI confidence.' },
  { title: 'Inline table', verdict: 'everything inline: too much back and forth', shipped: false, src: dir + 'wireframe-2-inline-table-labeled.svg', alt: 'Inline table wireframe: every field editable in the table, with links off to other screens.' },
  { title: 'Review queue', verdict: 'one at a time: couldn’t compare fields', shipped: false, src: dir + 'wireframe-3-review-queue-labeled.svg', alt: 'Review queue wireframe: a list of queued fields and one field reviewed at a time on its own screen.' },
]

const shipped = {
  src: dir + 'Mapping%20Screen.png',
  width: 3936,
  height: 3117,
  alt: 'The shipped mapping screen: a table of target fields with source, AI confidence (high, medium or low), status and indicators, and a Mapping details panel beside it showing the target field, its review status, the chosen source table and field, the source description, a 90% high AI confidence score and AI recommended as the mapping method.',
  box: [2157, 1708] as [number, number],
  marks: [
    // the AI confidence pills
    { d: 'M 1270 472 C 1080 500, 880 560, 810 655' },
    { d: 'M 843 640 L 810 655 L 815 619', note: { x: 1280, y: 465, text: 'how sure\nthe AI is' } },
    // the Indicators column: icons appear only when there is something to show
    { d: 'M 1150 950 C 1180 900, 1215 860, 1240 820' },
    { d: 'M 1209 838 L 1240 820 L 1238 856', note: { x: 1000, y: 1005, text: 'icons only show\nwhen added' } },
    // the side panel
    { d: 'M 1330 1205 C 1400 1170, 1440 1130, 1480 1110' },
    { d: 'M 1444 1109 L 1480 1110 L 1459 1140', note: { x: 990, y: 1215, text: 'everything else\nopens here' } },
  ],
}

const indicatorsLine =
  'The Indicators column shows an icon only when there’s something to see: a note, transformation logic, or whether a mapping was AI-driven or edited by hand. Fewer marks on the table, and three simple filters.'

const label = 'm-0 font-hand text-[26px] leading-tight text-foundation-700'

export function MappingFeature() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto border-t border-border pt-section">
        <AnimatedSection>
          <SketchIntro
            n="03"
            area="Mapping & transformation"
            question="How do you fit everything into one table?"
            problem="About 1,200 target columns, each with its own decisions: the source field, how sure the AI was, any transformation, and where it was in review. Showing it all at once would bury the field in front of you."
            did="I kept the table for scanning and comparing, and moved everything else into a panel beside it."
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-14 overflow-hidden rounded-2xl bg-stage-sage px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
            <p className={label}>three concepts I built quickly with AI, to compare</p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {concepts.map((c) => (
                <figure key={c.title} className="m-0">
                  <div className={`overflow-hidden rounded-lg bg-white ${c.shipped ? 'ring-2 ring-accent-warm' : 'opacity-80 ring-1 ring-foundation-900/10'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.src} alt={c.alt} loading="lazy" className="block h-auto w-full" />
                  </div>
                  <figcaption className="mt-3">
                    <span className="block font-display text-body-sm font-medium text-foundation-900">{c.title}</span>
                    <span className={`block font-hand text-[22px] leading-[1.1] ${c.shipped ? 'text-accent-warm' : 'text-foundation-600'}`}>{c.verdict}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className={`${label} mt-10`}>what shipped</p>
            <p className="m-0 mt-1 max-w-2xl font-sans text-body-sm text-foundation-700">{indicatorsLine}</p>
            <div className="mt-4 overflow-hidden rounded-t-xl bg-white shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.3)] ring-1 ring-foundation-900/10">
              <CropBox ratio={shipped.width / shipped.height} x0={0} x1={1} y0={0} y1={0.82}>
                <AnnotatedImage src={shipped.src} width={shipped.width} height={shipped.height} alt={shipped.alt} box={shipped.box} marks={shipped.marks} fontSize={70} />
              </CropBox>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
