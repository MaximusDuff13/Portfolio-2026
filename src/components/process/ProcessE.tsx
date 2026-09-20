'use client'
// Layout E — Margin index.
//
// STRUCTURE: the four names move into the page's own left gutter, stacked under the "Process"
// label in the three-column margin that Problem, Impact and Before use for their labels. The
// deliverable then takes the whole nine-column content area.
//
// This is the only layout that puts the selector in the page spine rather than inside the
// section. The margin already means "what this block is" everywhere else on the page, so the
// names read as the section's own index without needing a heading, a box or a rule around
// them — and unlike A, the selector costs the image nothing, because the gutter is space the
// section was not using.
//
// The description sits under the active name in the margin, where the column is narrow, so it
// is the one piece of copy here set at caption width rather than body width.
//
// ORDER WITHOUT NUMBERS: vertical position in the margin.
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DeliverableFrame } from './Deliverable'
import { deliverables, process, closingQuote } from './processData'

const LABEL = 'text-label font-grotesk uppercase tracking-widest'

export default function ProcessE() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = deliverables.length - 1
    let next: number | null = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const current = deliverables[active]
  const firstGrouped = deliverables.findIndex((d) => d.inDesignGroup)

  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <div className="pt-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8">

            {/* The margin: label, then the index, then the active description. */}
            <div className="md:col-span-3">
              <AnimatedSection>
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  {process.label}
                </p>

                <div
                  role="tablist"
                  aria-orientation="vertical"
                  aria-label={process.label}
                  onKeyDown={onKeyDown}
                  className="mt-8"
                >
                  {deliverables.map((d, i) => {
                    const on = i === active
                    return (
                      <div key={d.name}>
                        {i === firstGrouped && (
                          <p className={`${LABEL} text-foundation-400 mt-5 mb-2`}>
                            {process.groupLabel}
                          </p>
                        )}
                        <button
                          ref={(el) => {
                            tabRefs.current[i] = el
                          }}
                          role="tab"
                          id={`process-e-tab-${i}`}
                          aria-selected={on}
                          aria-controls="process-e-panel"
                          tabIndex={on ? 0 : -1}
                          onClick={() => setActive(i)}
                          className="group relative block w-full text-left py-2"
                        >
                          <span
                            className={`absolute left-0 top-2 bottom-2 w-0.5 ${
                              on ? 'bg-accent-warm' : 'bg-transparent'
                            }`}
                          />
                          <span
                            className={`block pl-4 text-body-sm font-grotesk transition-colors ${
                              on
                                ? 'text-foundation-900'
                                : 'text-foundation-500 group-hover:text-foundation-700'
                            }`}
                          >
                            {d.name}
                          </span>
                        </button>
                      </div>
                    )
                  })}
                </div>

                <p className="mt-6 pl-4 text-caption font-sans text-foundation-600">
                  {current.description}
                </p>
              </AnimatedSection>
            </div>

            {/* The content column, entirely given to the deliverable. */}
            <div className="md:col-span-9">
              <AnimatedSection>
                <motion.div
                  key={prefersReduced ? 'static' : active}
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  id="process-e-panel"
                  role="tabpanel"
                  aria-labelledby={`process-e-tab-${active}`}
                >
                  <DeliverableFrame item={current} />
                </motion.div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="mt-12 border-t border-border pt-6">
                  <figure>
                    <figcaption className={`${LABEL} text-foundation-500`}>
                      {closingQuote.role}
                    </figcaption>
                    <blockquote className="mt-3 max-w-2xl font-accent accent-italic text-body text-foundation-800">
                      {closingQuote.text}
                    </blockquote>
                  </figure>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
