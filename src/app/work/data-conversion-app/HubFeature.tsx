'use client'
import { useState } from 'react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { AnnotatedImage, CropBox, SketchIntro } from './Sketch'

/* 02 · Project hub (second: it is the home every later step opens from), in the sketchbook layout (Nov 25 2026). Michael picked R2 from /dev/hub-layouts,
   with one screen per stage (not every state): the point is that everything sits under one project.

   BEFORE is the real first concept (the AI CoE's), cropped to its left menu: the whole screen already
   shows in 01 Requirements. Pen arrows on the menu show one state's work hopping between tabs.
   Michael: no drawn redo of it, build on the given image.

   AFTER is one hub screen with four stage tabs above it. The tabs must read as clickable (Michael):
   bordered buttons with a hover lift, the chosen one filled dark with a notch pointing at the screen,
   and a handwritten 'click a stage' hint. */

const concept = {
  src: '/images/data-conversion-app/Intital%20Designs/AI%20designed.png',
  width: 3070,
  height: 1752,
  alt: 'The left menu of the AI Center of Excellence’s first concept, which splits one process into separate tabs: Dashboard, Data Sources, Data Dictionary, Mapping, Data Quality, Lineage and Settings. Pen arrows hop from Data Sources to Mapping, back to Data Dictionary, then to Data Quality.',
  // marks in 2552 x 1456; label rows at y 261 (Data Sources), 335 (Dictionary), 415 (Mapping), 716 (Quality)
  box: [2552, 1456] as [number, number],
  marks: [
    { d: 'M 262 258 C 335 258, 345 412, 268 414' },
    { d: 'M 284 403 L 266 414 L 284 425' },
    { d: 'M 198 400 C 212 365, 232 345, 256 340' },
    { d: 'M 238 333 L 257 340 L 242 354' },
    { d: 'M 262 330 C 392 336, 392 712, 232 714' },
    { d: 'M 250 703 L 232 714 L 250 725' },
  ],
}

const dir = '/images/data-conversion-app/project-hub/'
const stages = [
  { id: 'schema', name: 'Schema & Wiki', state: 'Set up', line: 'Set up the schema. If Wiki generation fails, the card says what failed and keeps what’s saved, so you only try again.', src: dir + 'Project%20Hub%201.png', alt: 'The hub at the start: set up the schema for this project, with mapping and ETL jobs waiting under Next steps.' },
  { id: 'mapping', name: 'Mapping', state: 'In progress', line: 'Shows how far along mapping is, then hands you on to ETL jobs when every table is done.', src: dir + 'Project%20Hub%202.png', alt: 'The hub while mapping is in progress: 93 of 100 tables mapped, with Continue mapping, and Schema & Wiki already completed.' },
  { id: 'etl', name: 'ETL jobs', state: 'Ready to run', line: 'Prepares the ETL job on its own, lets you pick where to run it, then hands back the results.', src: dir + 'Project%20Hub%208.png', alt: 'The hub ready to run the ETL job: select a destination and Run ETL Job, with schema and mapping completed.' },
  { id: 'done', name: 'Completed', state: 'Project ready', line: 'Every stage ticked, with the signed-off mapping sheet and ETL results to download.', src: dir + 'Project%20Hub%204.png', alt: 'The hub when every stage is finished, including the ETL job in AWS Glue.' },
]
const W = 5248
const H = 3804

const hand = 'm-0 font-hand text-[24px] leading-tight text-foundation-700'

export function HubFeature() {
  const [i, setI] = useState(1)
  const cur = stages[i]
  return (
    <section className="px-6 sm:px-10 lg:px-section pb-section">
      <div className="max-w-6xl mx-auto border-t border-border pt-section">
        <AnimatedSection>
          <SketchIntro
            n="02"
            area="Project hub"
            question="What do people see while the back end does the work?"
            problem="The first concept split one process across separate menu tabs: sources, dictionary, mapping, quality. Working on one state meant hopping between them, with nothing showing where it stood or what was still running."
            did="One hub with a card for each stage, from schema to mapping to ETL jobs, which move the data into the new system. Each card says what’s running, what failed and why, and moves you on to the next step."
            ai="A custom GPT I set up on marketing’s illustration style made the new mapping and ETL illustrations. Marketing approved them."
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-14 rounded-2xl bg-stage-sky p-5 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr]">
              {/* before: the real menu, cropped */}
              <figure className="m-0">
                <p className={hand}>before</p>
                <div className="mt-2 w-[200px] overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-foundation-900/10 sm:w-[230px]">
                  <CropBox ratio={concept.width / concept.height} x0={0.01} x1={0.163} y0={0.015} y1={0.625}>
                    <AnnotatedImage src={concept.src} width={concept.width} height={concept.height} alt={concept.alt} box={concept.box} marks={concept.marks} />
                  </CropBox>
                </div>
                <figcaption className="m-0 mt-3 max-w-[230px] font-hand text-[22px] leading-tight text-accent-warm">one state’s work, hopping between seven tabs</figcaption>
              </figure>

              {/* after: one hub, a tab per stage */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className={hand}>after: everything under one project</p>
                  <p className="m-0 font-hand text-[22px] text-accent-warm" aria-hidden="true">click a stage ↓</p>
                </div>
                <div role="tablist" aria-label="Project hub stages" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {stages.map((st, n) => {
                    const on = n === i
                    return (
                      <button
                        key={st.id}
                        id={`hub-tab-${st.id}`}
                        role="tab"
                        type="button"
                        aria-selected={on}
                        aria-controls="hub-panel"
                        onClick={() => setI(n)}
                        className={`group relative cursor-pointer rounded-xl border-2 px-3 py-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 ${
                          on
                            ? 'border-foundation-900 bg-foundation-900 text-white shadow-md'
                            : 'border-foundation-900/20 bg-white text-foundation-900 hover:-translate-y-0.5 hover:border-foundation-900/50 hover:shadow-md'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-sans text-[12px] font-semibold ${on ? 'bg-accent-warm text-white' : 'bg-foundation-100 text-foundation-700 group-hover:bg-accent-warm group-hover:text-white'}`}>{n + 1}</span>
                          <span className="font-display text-body-sm font-medium leading-tight">{st.name}</span>
                        </span>
                        <span className={`mt-1 block pl-8 font-sans text-[12px] ${on ? 'text-white/75' : 'text-foundation-600'}`}>{st.state}</span>
                        {/* the notch: points from the chosen tab down at its screen */}
                        {on && <span aria-hidden="true" className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-foundation-900" />}
                      </button>
                    )
                  })}
                </div>
                <div id="hub-panel" role="tabpanel" aria-labelledby={`hub-tab-${cur.id}`} className="mt-4">
                  <div className="overflow-hidden rounded-xl bg-white ring-1 ring-foundation-900/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img key={cur.src} src={cur.src} alt={cur.alt} width={W} height={H} className="block h-auto w-full" />
                  </div>
                  <p className="m-0 mt-3 max-w-2xl font-sans text-body-sm text-foundation-700">{cur.line}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
