'use client'
import { useMemo, useRef } from 'react'
import { Check } from 'lucide-react'
import { headline, person, ctas, type NoiseItem } from '../_data/content'
import { HeroLoop } from '../_kit/HeroLoop'
import { LoopWindow } from '../_kit/windows'
import { NoiseField, scatter, type ItemOut, type StateCtx } from '../_kit/NoiseField'
import { Panels, useHome } from '../_kit/home'
import { Shell } from '../_kit/Shell'
import { TabList } from '../_kit/Tabs'
import './c.css'

/* TEMPORARY — /explore/c · Affinity Wall. The home page as a research synthesis session:
   paper notes, index cards and a polaroid on a painted studio wall.
   Cleanup: affinity mapping. Notes slide into clusters, the clusters get marker headings,
   the work gets dot-voted, and the unvoted notes come off the wall. The steps are written in
   marker on the index card as a checklist. The loop waits until the wall is clear. */

const STEPS = [900, 800, 760, 760]
const CHECKLIST = ['Group similar ideas', 'Name the themes', 'Dot-vote what matters', 'Clear the wall']

// the four clusters, and the heading each gets in marker
const CLUSTERS: { label: string; kinds: NoiseItem['kind'][] }[] = [
  { label: 'The work', kinds: ['case', 'about'] },
  { label: 'Side quests + wins', kinds: ['side', 'accolade'] },
  { label: 'Asks', kinds: ['note', 'feedback'] },
  { label: 'Chatter', kinds: ['article', 'event', 'stat', 'tags'] },
]
const clusterOf = (i: NoiseItem) => CLUSTERS.findIndex((c) => c.kinds.includes(i.kind))

export default function AffinityWall() {
  const { items, intro, tab, setTab, go, tabsRef } = useHome({ capSmall: 10, capLarge: 24, cleanupSteps: STEPS, popFrom: 280 })
  const heroRef = useRef<HTMLDivElement>(null)
  const { phase, step } = intro
  const final = phase === 'final'

  // each card's place in its cluster pile
  const pile = useMemo(() => {
    const seen = [0, 0, 0, 0]
    return items.map((it) => seen[clusterOf(it)]++)
  }, [items])

  const stateOf = ({ index, item, verdict, pos, size, field, exclude, step }: StateCtx): ItemOut => {
    const c = clusterOf(item)
    const j = pile[index]
    const hero = exclude[0]
    const narrow = field.w < 720
    // clusters sit in the free area: right of the hero on wide screens, under it on phones
    const x0 = narrow ? 12 : hero ? hero.x + hero.w + 8 : 24
    const y0 = narrow && hero ? hero.y + hero.h + 36 : 56
    const colW = narrow ? (field.w - 24) / 4 : (field.w - x0 - 24) / 4
    const x = x0 + c * colW + (colW - size.w) / 2 + (j % 2 ? 10 : -6)
    const y = y0 + j * (narrow ? 22 : Math.min(48, size.h * 0.32))
    const r = ((index * 37) % 7) - 3
    if (phase === 'final') return { state: 'out', x, y: y + 80, r: r + 6 }
    if (step < 3 || verdict === 'keep') return { state: step >= 2 && verdict === 'keep' ? 'kept' : 'marked', x, y, r, delay: (index % 8) * 40 }
    // unvoted notes come off the wall
    return { state: 'out', x, y: y + 60, r: r + 9, delay: (j % 6) * 50 }
  }

  return (
    <Shell dir="c">
      <header className="c-nav">
        <a href="#" className="c-wordmark" onClick={(e) => (e.preventDefault(), go('work'))}>
          {person.name}
        </a>
        <nav aria-label="Main">
          <button type="button" onClick={() => go('work')}>Work</button>
          <button type="button" onClick={() => go('about')}>About</button>
          <button type="button" onClick={() => go('about')}>Contact</button>
        </nav>
      </header>

      <main className="c-wall">
        <NoiseField
          items={items}
          run={intro.run}
          phase={phase}
          shown={intro.shown}
          step={step}
          exclude={[heroRef]}
          place={scatter({ rotate: 7, bleed: 0.2 })}
          stateOf={stateOf}
          extra={(ctx) => (
            <>
              {pile[ctx.index] === 0 && (
                <span className="c-cluster" data-c={clusterOf(ctx.item)}>
                  {CLUSTERS[clusterOf(ctx.item)].label}
                </span>
              )}
              {ctx.verdict === 'keep' && <span className="c-dot" data-k={ctx.index % 3} />}
              <span className="c-pin" />
            </>
          )}
          className="c-field"
        />

        <div className="c-layout">
          <section ref={heroRef} className="c-hero" aria-labelledby="c-title">
            <figure className="c-polaroid">
              <span className="c-tape" aria-hidden="true" />
              <LoopWindow direction="c"><HeroLoop playing={final} className="c-loop" controlClassName="c-loop-control" sizes="(min-width: 1024px) 440px, 88vw" /></LoopWindow>
              <figcaption>Hillside, Hong Kong</figcaption>
            </figure>

            <div className="c-card">
              <div className="c-stack">
                <h1 id="c-title" className="c-headline" data-on={final || undefined}>
                  <span className="c-lead">{headline.lead}</span> <span className="c-trail">{headline.trail}</span>
                </h1>
                <div className="c-intro" data-on={!final || undefined} aria-hidden={final || undefined}>
                  <p className="c-name">
                    {person.name},<br />
                    <span className="c-trail">{person.role}</span>
                  </p>
                  <ol className="c-checklist" aria-live="polite">
                    {CHECKLIST.map((line, i) => {
                      const shown = phase === 'cleanup' && i <= step
                      const done = phase === 'cleanup' && i < step
                      return (
                        <li key={line} data-shown={shown || undefined} data-done={done || undefined}>
                          <span className="c-box" aria-hidden="true">
                            {done && <Check strokeWidth={3} />}
                          </span>
                          {shown ? line : ''}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
              <div className="c-ctas">
                <button type="button" className="c-btn c-btn-primary" onClick={() => go('work')}>
                  {ctas.primary}
                </button>
                <button type="button" className="c-btn" onClick={() => go('about')}>
                  {ctas.secondary}
                </button>
              </div>
            </div>
            <button type="button" className="c-skip" onClick={intro.onControl}>
              {intro.controlLabel}
            </button>
          </section>

          <section ref={tabsRef} className="c-tabs" aria-label="Portfolio" data-on={final || undefined}>
            <TabList
              active={tab}
              onChange={setTab}
              idPrefix="c"
              className="c-tablist"
              tabClassName="c-tab"
              countClassName="c-tab-count"
              indicatorClassName="c-tab-indicator"
            />
            <Panels active={tab} phase={phase} idPrefix="c" />
          </section>
        </div>
      </main>
    </Shell>
  )
}
