'use client'
import { useId } from 'react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { HOT, Stroke, Wobble, useOnScreen } from './pen'

/* Requirements gathering, the first design feature, in the sketchbook layout Michael picked (D5,
   Nov 24 2026): the question on the left, the problem and what I did as two tilted sticky notes on
   the right, then the journey map with two hand-drawn callouts. The other features still use
   ProblemSolutionFeature until they are redone in this layout.

   COPY. Cut from ~110 words to two lines; the stakeholder and AI Center of Excellence detail is
   in Process just above, so it is not repeated here.

   Opens without a hairline: the Part two chapter break sits directly above it. */

const MAP = {
  src: '/images/data-conversion-app/requirement-gathering/journey-map-horizontal.png',
  alt: 'Customer journey map for data conversion across five stages — agreement, initial mapping, state review, transformation, and conversion and sync — showing steps, touchpoints, actors, where AI can help, and an emotion curve. Initial mapping is the low point; at transformation, experienced staff stay neutral while new staff are overwhelmed. The Data Conversion App spans the first four stages.',
}

const problem = 'The first screens were built with AI to win leadership’s support. Nothing connected them.'
const did = 'I mapped how the work really flows, then marked where AI would save the most time.'

/* The map with two callouts: the low point, and the AI box at initial mapping. The overlay uses
   the image's proportions (2380 x 1546 units), so the circles stay on their targets at any width. */
function AnnotatedMap() {
  const [ref, on] = useOnScreen<SVGSVGElement>()
  const id = useId().replace(/:/g, '')
  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MAP.src} alt={MAP.alt} width={3600} height={2338} className="block h-auto w-full" />
      <svg ref={ref} viewBox="0 0 2380 1546" className="cs-markup pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" data-on={on || undefined}>
        <defs><Wobble id={`w${id}`} /></defs>
        <g filter={`url(#w${id})`}>
          <Stroke d="M 892 1120 C 1010 1118, 1060 1200, 1040 1290 C 1010 1370, 800 1380, 740 1300 C 690 1230, 740 1130, 900 1118" ink={HOT} w={4} delay={200} />
          <Stroke d="M 700 760 C 820 740, 1050 744, 1090 790 C 1110 850, 1090 920, 900 920 C 760 922, 690 890, 696 820 C 698 790, 720 770, 760 762" ink={HOT} w={4} delay={500} />
          <Stroke d="M 1060 1250 C 1110 1240, 1140 1250, 1170 1262" ink={HOT} w={3.4} delay={800} />
          <Stroke d="M 1100 860 C 1140 862, 1170 870, 1196 884" ink={HOT} w={3.4} delay={900} />
        </g>
        <g className="cs-mark-note">
          <text x={1185} y={1278} fontSize={50} className="font-hand fill-accent-warm">the low point</text>
          <text x={1210} y={900} fontSize={50} className="font-hand fill-accent-warm">so AI starts here</text>
        </g>
      </svg>
    </div>
  )
}

const note = 'flex-1 rounded-md p-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]'

export function RequirementsFeature() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto pt-6">
        <AnimatedSection>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="m-0 font-sans text-label uppercase tracking-widest text-foundation-500">01 · Requirements gathering</p>
              <h3 className="m-0 mt-4 font-display text-heading-xl font-medium leading-[1.1] text-foundation-900">Where does the user go next?</h3>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row lg:col-span-7">
              <div className={`${note} -rotate-2 bg-stage-straw-strong`}>
                <p className="m-0 font-hand text-[22px] text-foundation-600">the problem</p>
                <p className="m-0 mt-2 font-hand text-[26px] leading-[1.15] text-foundation-900">{problem}</p>
              </div>
              <div className={`${note} rotate-1 bg-stage-sage-strong`}>
                <p className="m-0 font-hand text-[22px] text-foundation-600">what I did</p>
                <p className="m-0 mt-2 font-hand text-[26px] leading-[1.15] text-foundation-900">{did}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div className="mt-14 rounded-2xl bg-white p-4 ring-1 ring-foundation-900/5 sm:p-8">
            <AnnotatedMap />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
