'use client'
// Layout A — Split selector.
//
// STRUCTURE: the deliverable holds 7 of the 12 content columns on the left; a vertical list of
// all four names holds the other 5 on the right. The first is active on load, so a reader who
// never clicks still sees every name and one full-size deliverable.
//
// WHY A VERTICAL LIST RATHER THAN TabBar: TabBar is horizontal, underline-only, and has no room
// for a per-item description or the "Design" group label. Four names of this length would also
// wrap awkwardly across a 5-column measure. The roles and keyboard behaviour below are the same
// contract TabBar provides, implemented vertically.
//
// ACTIVE STATE: accent-warm is spent on a 2px tick to the left of the active name and nothing
// else; the active label itself is foundation-900 and inactive ones foundation-500, so no body
// text is ever accent-coloured. The one-line description appears only under the active name.
//
// ORDER WITHOUT NUMBERS: position in the list is the only ordering signal. No numerals appear
// anywhere — the conversion process elsewhere on this page already has numbered steps, and a
// second numbering would collide with it.
//
// MOTION: the image crossfades on selection, and is instant under prefers-reduced-motion. The
// section entrance is AnimatedSection, as elsewhere. Nothing auto-advances.
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DeliverableFrame } from './Deliverable'
import { deliverables, process, closingQuote } from './processData'

const LABEL = 'text-label font-grotesk uppercase tracking-widest'

export default function ProcessA() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Arrow keys move between tabs and move focus with the selection, which is the expected
  // behaviour for an automatic-activation tablist. Home and End jump to the ends.
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

  // The group label is rendered once, immediately before the first grouped selector, so the
  // list reads: the ungrouped name, then "Design", then the three that sit under it.
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

            {/* The deliverable row spans all twelve columns rather than sitting in the nine
                beside the label. Nested in col-span-9 the image measured 457px at 1280 — a
                thumbnail, not a legible interface. Full width it is ~640px. The label still
                hangs in the left gutter on its own row, so the section still reads as a
                sibling of Problem, Impact and Before; only the work itself breaks out. */}
            <div className="md:col-span-12">
              <AnimatedSection>
                {/* Image left, selectors right. On a phone the image comes first, then the
                    list, which is also the DOM order — so the reading order never diverges
                    from the visual one. */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8">

                  <div className="md:col-span-7">
                    <motion.div
                      key={prefersReduced ? 'static' : active}
                      initial={prefersReduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      id={`process-a-panel-${active}`}
                      role="tabpanel"
                      aria-labelledby={`process-a-tab-${active}`}
                    >
                      <DeliverableFrame item={current} />
                    </motion.div>
                  </div>

                  <div
                    role="tablist"
                    aria-orientation="vertical"
                    aria-label={process.label}
                    onKeyDown={onKeyDown}
                    className="md:col-span-5 flex flex-col"
                  >
                    {deliverables.map((d, i) => {
                      const on = i === active
                      return (
                        <div key={d.name}>
                          {i === firstGrouped && (
                            <p className={`${LABEL} text-foundation-400 mt-6 mb-3`}>
                              {process.groupLabel}
                            </p>
                          )}

                          <button
                            ref={(el) => {
                              tabRefs.current[i] = el
                            }}
                            role="tab"
                            id={`process-a-tab-${i}`}
                            aria-selected={on}
                            aria-controls={`process-a-panel-${i}`}
                            tabIndex={on ? 0 : -1}
                            onClick={() => setActive(i)}
                            className="group relative block w-full text-left py-3 border-t border-border"
                          >
                            {/* The active tick. A CSS rule, not an icon. */}
                            <span
                              className={`absolute left-0 top-3 bottom-3 w-0.5 ${
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

                            {on && (
                              <span className="block pl-4 mt-1.5 text-body-sm font-sans text-foundation-600">
                                {d.description}
                              </span>
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </AnimatedSection>

              {/* Closing quote. Role on top in the label token, quote beneath. */}
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
