'use client'
// Layout D — Accordion.
//
// STRUCTURE: four horizontal bands stacked down the full width. Every band shows its name on
// its own rule, so the whole set is always readable; the open band expands beneath its name to
// show the deliverable at full width. Opening one closes the others.
//
// The difference from A and C: the name and its deliverable are never in separate places. In A
// the list is on the right and the image on the left; in C the index is on top and the stage
// below. Here the image emerges directly under the name it belongs to, so there is no eye
// journey between the label and the thing it labels.
//
// WHY IT IS NOT A CAROUSEL: nothing moves without a click and nothing advances on a timer. The
// bands are buttons; the open one is the one the reader chose.
//
// The expansion is a height animation, which is the one place this set uses anything other
// than a crossfade. Under prefers-reduced-motion the panel simply appears.
//
// ORDER WITHOUT NUMBERS: vertical position only.
import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DeliverableFrame } from './Deliverable'
import { deliverables, process, closingQuote } from './processData'

const LABEL = 'text-label font-grotesk uppercase tracking-widest'

export default function ProcessD() {
  const [open, setOpen] = useState(0)
  const prefersReduced = useReducedMotion()
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = deliverables.length - 1
    let next: number | null = null
    if (e.key === 'ArrowDown') next = open === last ? 0 : open + 1
    else if (e.key === 'ArrowUp') next = open === 0 ? last : open - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setOpen(next)
    btnRefs.current[next]?.focus()
  }

  const firstGrouped = deliverables.findIndex((d) => d.inDesignGroup)

  return (
    <section className="px-6 sm:px-10 lg:px-section">
      <div className="max-w-6xl mx-auto">
        <div className="pt-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6">

            <div className="md:col-span-3">
              <AnimatedSection>
                <p className="font-accent accent-italic text-heading-m text-foundation-900">
                  {process.label}
                </p>
              </AnimatedSection>
            </div>

            <div className="md:col-span-12">
              <AnimatedSection>
                <div onKeyDown={onKeyDown}>
                  {deliverables.map((d, i) => {
                    const on = i === open
                    return (
                      <div key={d.name}>
                        {i === firstGrouped && (
                          <p
                            className={`${LABEL} text-foundation-400 border-t border-border pt-6 mt-8 mb-2`}
                          >
                            {process.groupLabel}
                          </p>
                        )}

                        <h3 className="m-0">
                          <button
                            ref={(el) => {
                              btnRefs.current[i] = el
                            }}
                            aria-expanded={on}
                            aria-controls={`process-d-panel-${i}`}
                            id={`process-d-head-${i}`}
                            onClick={() => setOpen(i)}
                            className="group relative block w-full text-left border-t border-border py-4"
                          >
                            <span
                              className={`absolute left-0 top-4 bottom-4 w-0.5 ${
                                on ? 'bg-accent-warm' : 'bg-transparent'
                              }`}
                            />
                            <span
                              className={`block pl-4 text-body font-grotesk transition-colors ${
                                on
                                  ? 'text-foundation-900'
                                  : 'text-foundation-500 group-hover:text-foundation-700'
                              }`}
                            >
                              {d.name}
                            </span>
                          </button>
                        </h3>

                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              key="panel"
                              id={`process-d-panel-${i}`}
                              role="region"
                              aria-labelledby={`process-d-head-${i}`}
                              initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-8">
                                <p className="max-w-xl text-body-sm font-sans text-foundation-600">
                                  {d.description}
                                </p>
                                <div className="mt-5">
                                  <DeliverableFrame item={d} />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
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
