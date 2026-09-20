'use client'
// Layout C — Index and stage.
//
// STRUCTURE: the four names run as a single horizontal index across the full width, directly
// under the label, each on its own hairline; below them one stage image spans the whole content
// column. Selection moves the underline along the index and crossfades the stage.
//
// The difference from A is where the names sit and how big the image gets. A spends five of
// twelve columns on a vertical list, so the image can never exceed seven. Here the names cost
// no horizontal room at all — they are a rule across the top — and the stage takes the full
// width, which makes it the largest deliverable of any layout in this set.
//
// THE GROUP LABEL sits above the index, aligned over the three names it covers, rather than
// interrupting the row. Interrupting a horizontal row with a group heading breaks the line the
// index depends on.
//
// The active name's description sits under the index, in one fixed place, so the stage never
// shifts vertically when the selection changes.
//
// ORDER WITHOUT NUMBERS: left-to-right position only.
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/AnimatedSection'
import { DeliverableFrame } from './Deliverable'
import { deliverables, process, closingQuote } from './processData'

const LABEL = 'text-label font-grotesk uppercase tracking-widest'

export default function ProcessC() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = deliverables.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const current = deliverables[active]

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
                {/* The group label, above the three columns it covers. On a phone the index
                    stacks and the label simply sits over the group as a plain heading. */}
                <div className="hidden md:grid md:grid-cols-4 gap-x-8 mb-3">
                  <div />
                  <p className={`${LABEL} text-foundation-400 col-span-3`}>{process.groupLabel}</p>
                </div>

                <div
                  role="tablist"
                  aria-label={process.label}
                  onKeyDown={onKeyDown}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8"
                >
                  {deliverables.map((d, i) => {
                    const on = i === active
                    return (
                      <button
                        key={d.name}
                        ref={(el) => {
                          tabRefs.current[i] = el
                        }}
                        role="tab"
                        id={`process-c-tab-${i}`}
                        aria-selected={on}
                        aria-controls="process-c-panel"
                        tabIndex={on ? 0 : -1}
                        onClick={() => setActive(i)}
                        className="group relative block w-full text-left pt-4 pb-4 border-t border-border"
                      >
                        {/* Active underline sits on the rule itself. CSS, not an icon. */}
                        <span
                          className={`absolute left-0 right-0 -top-px h-0.5 ${
                            on ? 'bg-accent-warm' : 'bg-transparent'
                          }`}
                        />
                        <span
                          className={`block text-body font-grotesk transition-colors ${
                            on
                              ? 'text-foundation-900'
                              : 'text-foundation-500 group-hover:text-foundation-700'
                          }`}
                        >
                          {d.name}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* One fixed slot for the active description, so the stage never moves. */}
                <p className="mt-5 max-w-xl text-body-sm font-sans text-foundation-600">
                  {current.description}
                </p>

                <motion.div
                  key={prefersReduced ? 'static' : active}
                  initial={prefersReduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  id="process-c-panel"
                  role="tabpanel"
                  aria-labelledby={`process-c-tab-${active}`}
                  className="mt-8"
                >
                  <DeliverableFrame item={current} />
                </motion.div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="mt-14 border-t border-border pt-6">
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
