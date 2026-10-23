'use client'
import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { about, accolades, caseStudies, person, sideProjects, type TabId } from '../_data/content'
import { AccoladeRow, CaseCard, SampleTag, SideCard } from './cards'
import { LOOP_ASPECT } from './HeroLoop'
import { TabPanel } from './Tabs'
import { useIntro, type Phase } from './useIntro'
import { useNoiseDeck } from './NoiseField'

/* TEMPORARY — /explore harness. What every direction's page shares: the deck, the intro clock,
   the active tab, and `go`, which the nav and the calls to action use (it ends the intro if it
   is still running, selects the tab and scrolls to it). */

export function useHome({
  capSmall,
  capLarge,
  cleanupSteps,
  popFrom,
  popTo,
  hold,
}: {
  capSmall: number
  capLarge: number
  cleanupSteps: number[]
  popFrom?: number
  popTo?: number
  hold?: number
}) {
  const [seed, setSeed] = useState(1)
  const items = useNoiseDeck(capSmall, capLarge, seed)
  const intro = useIntro({ count: items.length, cleanupSteps, popFrom, popTo, hold })
  const [tab, setTab] = useState<TabId>('work')
  const tabsRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (id: TabId) => {
      if (intro.phase !== 'final') intro.skip()
      setTab(id)
      requestAnimationFrame(() =>
        tabsRef.current?.scrollIntoView({ behavior: intro.reduced ? 'auto' : 'smooth', block: 'start' }),
      )
    },
    [intro],
  )

  const onControl = useCallback(() => {
    if (intro.phase === 'final') setSeed((s) => s + 1)
    intro.onControl()
  }, [intro])

  return { items, intro: { ...intro, onControl }, tab, setTab, go, tabsRef }
}

/** The four panels, same cards as the noise, full variant. Each child carries --i for the
    direction's settle stagger; `data-settle` turns on once the intro resolves. */
export function Panels({
  active,
  phase,
  idPrefix,
  aboutArt,
  className = '',
}: {
  active: TabId
  phase: Phase
  idPrefix: string
  /** the About panel's illustration (directions pass a HeroLoop or still) */
  aboutArt?: ReactNode
  className?: string
}) {
  const settle = phase === 'final' || undefined
  const cell = (i: number) => ({ '--i': i }) as CSSProperties
  return (
    <div className={`pn ${className}`} data-settle={settle}>
      <TabPanel id="work" active={active} idPrefix={idPrefix} className="pn-panel pn-work">
        {caseStudies.map((c, i) => (
          <div key={c.id} className="pn-cell" style={cell(i)}>
            <CaseCard item={c} />
          </div>
        ))}
      </TabPanel>
      <TabPanel id="side" active={active} idPrefix={idPrefix} className="pn-panel pn-side">
        {sideProjects.map((s, i) => (
          <div key={s.id} className="pn-cell" style={cell(i)}>
            <SideCard item={s} />
          </div>
        ))}
      </TabPanel>
      <TabPanel id="accolades" active={active} idPrefix={idPrefix} className="pn-panel pn-accolades">
        {accolades.map((a, i) => (
          <div key={a.id} className="pn-cell" style={cell(i)}>
            <AccoladeRow item={a} />
          </div>
        ))}
      </TabPanel>
      <TabPanel id="about" active={active} idPrefix={idPrefix} className="pn-panel pn-about">
        <figure className="pn-cell pn-about-art" style={cell(0)}>
          {aboutArt ?? <AboutStill />}
          <figcaption>{about.credit}</figcaption>
        </figure>
        <div className="pn-cell pn-about-copy" style={cell(1)}>
          <SampleTag label="Sample copy" />
          <h3 className="pn-about-title">{about.greeting}</h3>
          <p>{about.body}</p>
          <dl className="pn-facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div>
              <dt>Contact</dt>
              <dd>
                <span className="pn-placeholder">{about.contact}</span> <SampleTag label="Placeholder" />
              </dd>
            </div>
          </dl>
        </div>
      </TabPanel>
    </div>
  )
}

export function AboutStill() {
  return (
    <picture>
      <source type="image/avif" srcSet="/explore/loop/final-still-640.avif 640w, /explore/loop/final-still-1280.avif 1280w" sizes="(min-width: 1024px) 480px, 92vw" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/explore/loop/final-still-640.webp"
        srcSet="/explore/loop/final-still-640.webp 640w, /explore/loop/final-still-1280.webp 1280w"
        sizes="(min-width: 1024px) 480px, 92vw"
        alt={`Watercolour of ${person.name} on a hillside above the Hong Kong skyline, his hand resting on his dog's head.`}
        loading="lazy"
        style={{ aspectRatio: `${LOOP_ASPECT}`, width: '100%', height: 'auto', display: 'block' }}
      />
    </picture>
  )
}
