import { AnimatedSection } from '@/components/AnimatedSection'
import { AnnotatedImage, CropBox, SketchIntro } from './Sketch'

/* 03 · Schema & Wiki creation, in the sketchbook layout (Sketch.tsx), Nov 24 2026.

   THE STORY, in two whole screens (Michael's re-exports, Nov 24): the rule typed into the guidance
   field, then the Source Wiki that follows it, each with a handwritten pen arrow and note on the
   part that matters. No circles and no magnified crops: Michael ruled out both.

   LAYOUT (Michael picked E2 from /dev/schema-layouts): a straw card with the two captions as
   handwritten steps 1 and 2 across the top, and the two screens rising into the card from its
   bottom edge, side by side, so the section stays short. The upload screen is trimmed to its
   designed part (its right 40% and the bottom are empty) and the Documents screen loses the empty
   grey at its foot; CropBox does the trimming, so the pen marks stay on target.

   Marks are in each image's own proportions (upload 2324 x 1585, documents 2268 x 1644). */

const dir = '/images/data-conversion-app/schema-mapping/'

const screens = [
  {
    n: '1',
    src: dir + 'Schema%20Mapping%20with%20Wiki%20Guidance.png',
    width: 5248,
    height: 3580,
    alt: 'The Schema and Wiki setup screen: source schema tab, input method, data dictionary upload, and the optional Additional Wiki guidance field with the rule "Remove _TB tables if _TR is present in same table" typed in, above the helper text: Use plain language; you do not need to write a technical prompt.',
    box: [2324, 1585] as [number, number],
    // the note sits under the field, by the button; the arrow points up at the typed rule
    marks: [
      { d: 'M 590 1395 C 560 1250, 480 1170, 420 1120' },
      { d: 'M 435 1157 L 420 1120 L 459 1128', note: { x: 610, y: 1430, text: 'the rule,\nin plain words' } },
    ],
    fontSize: 100,
    crop: { x0: 0, x1: 0.6, y0: 0, y1: 0.985 },
    cols: 'md:col-span-5',
    title: 'Schema & Wiki setup',
    line: 'Upload the state’s data dictionary, and add rules in plain words. The guidance field is optional.',
  },
  {
    n: '2',
    src: dir + 'Documents%20with%20Tr.png',
    width: 5248,
    height: 3804,
    alt: 'The project’s Documents tab: the Source Wiki for 147 tables, listing only _TR tables, such as Provider_location.tr, Bed_Count.tr and Members.tr, each with a plain description.',
    box: [2268, 1644] as [number, number],
    // from the note beside the Source Wiki title, curving down to the first .tr table name
    marks: [
      { d: 'M 1230 545 C 1050 560, 950 680, 895 820' },
      { d: 'M 926 794 L 895 820 L 890 780', note: { x: 1250, y: 480, text: 'only the TR\ntables, as asked' } },
    ],
    fontSize: 110,
    crop: { x0: 0, x1: 1, y0: 0, y1: 0.9 },
    cols: 'md:col-span-7',
    title: 'The Wiki follows it',
    line: 'The AI turns the data dictionary into a Wiki: a Markdown file with more detail, so our internal AI can understand each table. Only the _TR tables are documented. The old _TB versions are left out.',
  },
]

export function SchemaFeature() {
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto border-t border-border pt-section">
        <AnimatedSection>
          <SketchIntro
            n="03"
            area="Schema & Wiki creation"
            question="What does the AI need to know about each state?"
            problem="Every state’s data has its own quirks, and we couldn’t know them all before the MVP. Without that context, the AI couldn’t map every detail on its own."
            did="After implementation teams raised it, I added an optional guidance field. People can now write rules in plain words, like “Remove _TB tables if _TR is present”, to drop old tables that have a newer version."
            ai="ChatGPT Enterprise drafted the screen copy from marketing’s writing guidelines, and I edited it. Figma AI filled the tables with realistic sample data."
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-14 overflow-hidden rounded-2xl bg-stage-straw px-5 pt-8 sm:px-8 lg:px-10 lg:pt-10">
            {/* Each figure fills the row's height: its caption at the top, its screen pushed down to the
                card's bottom edge, so captions line up across the top and both screens rise from the
                bottom. On a phone they stack, caption above screen. */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
              {screens.map((s) => (
                <figure key={s.src} className={`m-0 flex flex-col ${s.cols}`}>
                  <figcaption className="mb-6 md:mb-8">
                    <span className="mb-1 block font-hand text-[30px] leading-none text-accent-warm">{s.n}</span>
                    <span className="block font-display text-body font-medium text-foundation-900">{s.title}</span>
                    <span className="mt-1 block font-sans text-body-sm text-foundation-700">{s.line}</span>
                  </figcaption>
                  <div className="mt-auto overflow-hidden rounded-xl bg-white shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.3)] ring-1 ring-foundation-900/10 md:rounded-b-none">
                    <CropBox ratio={s.width / s.height} {...s.crop}>
                      <AnnotatedImage src={s.src} width={s.width} height={s.height} alt={s.alt} box={s.box} marks={s.marks} fontSize={s.fontSize} />
                    </CropBox>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
