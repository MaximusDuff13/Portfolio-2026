import { AnimatedSection } from '@/components/AnimatedSection'
import { AnnotatedImage, SketchIntro } from './Sketch'
import { frame } from './sketchStyles'

/* 01 · Requirements gathering, the first design feature, in the sketchbook layout (Sketch.tsx):
   the question, the problem and what I did as sticky notes, then the journey map with two pen
   callouts, on the low point and on where AI starts.

   COPY. Cut from ~110 words to two lines; the stakeholder and AI Center of Excellence detail is
   in Process, so it is not repeated here.

   Opens without a hairline: the Part two chapter break sits directly above it. */

const MAP_ALT =
  'Customer journey map for data conversion across five stages — agreement, initial mapping, state review, transformation, and conversion and sync — showing steps, touchpoints, actors, where AI can help, and an emotion curve. Initial mapping is the low point; at transformation, experienced staff stay neutral while new staff are overwhelmed. The Data Conversion App spans the first four stages.'

export function RequirementsFeature() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto pt-6">
        <AnimatedSection>
          <SketchIntro
            n="01"
            area="Requirements gathering"
            question="Where does the user go next?"
            problem="The first screens were built with AI to win leadership’s support. Nothing connected them."
            did="I mapped how the work really flows, then marked where AI would save the most time."
          />
        </AnimatedSection>
        <AnimatedSection>
          <div className={`mt-14 ${frame}`}>
            {/* overlay units: the map at 2380 x 1546 */}
            <AnnotatedImage
              src="/images/data-conversion-app/requirement-gathering/journey-map-horizontal.png"
              width={3600}
              height={2338}
              alt={MAP_ALT}
              box={[2380, 1546]}
              marks={[
                { d: 'M 892 1120 C 1010 1118, 1060 1200, 1040 1290 C 1010 1370, 800 1380, 740 1300 C 690 1230, 740 1130, 900 1118' },
                { d: 'M 700 760 C 820 740, 1050 744, 1090 790 C 1110 850, 1090 920, 900 920 C 760 922, 690 890, 696 820 C 698 790, 720 770, 760 762' },
                { d: 'M 1060 1250 C 1110 1240, 1140 1250, 1170 1262', note: { x: 1185, y: 1278, text: 'the low point' } },
                { d: 'M 1100 860 C 1140 862, 1170 870, 1196 884', note: { x: 1210, y: 900, text: 'so AI starts here' } },
              ]}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
