'use client'
import { useRef } from 'react'
import { headline, person, ctas } from '../_data/content'
import { HeroLoop } from '../_kit/HeroLoop'
import { NoiseField, type ItemOut, type Placement, type Rect, type StateCtx } from '../_kit/NoiseField'
import { Panels, useHome } from '../_kit/home'
import { Shell } from '../_kit/Shell'
import { TabList } from '../_kit/Tabs'
import './e.css'

/* TEMPORARY — /explore/e · Contact Sheet. The home page as a roll of film: the loop is frame
   01 and plays from the start (the projector is running), the title card is frame 02, and
   the noise is the rest of the roll, exposed frame by frame onto a contact sheet.
   Cleanup: an editor's chinagraph pencil. It crosses out the frames that don't serve the
   story, rings the selects, holds them while the rest go to hatch, then prints the selects
   where the tabs will be. The slate counts frames down to selects. */

const STEPS = [900, 700, 620, 700]
const STATUS = [
  { mark: 'Cut', says: 'Removing what doesn’t serve the user' },
  { mark: 'Ring', says: 'Highlighting the primary path' },
  { mark: 'Hold', says: 'Reducing to the essentials' },
  { mark: 'Print', says: 'Prioritising what matters' },
]

/** A contact sheet: equal cells in rows, skipping any cell over the hero */
const sheet = (sizes: { w: number; h: number }[], field: { w: number; h: number }, exclude: Rect[]): Placement[] => {
  const w = sizes[0]?.w ?? 160
  const h = sizes[0]?.h ?? 120
  const gap = Math.round(w * 0.06)
  const margin = field.w < 640 ? 16 : field.w < 1024 ? 40 : 56
  const cols = Math.max(1, Math.floor((field.w - margin * 2 + gap) / (w + gap)))
  const cells: Placement[] = []
  for (let row = 0; cells.length < sizes.length && row < 40; row++) {
    for (let c = 0; c < cols && cells.length < sizes.length; c++) {
      const x = margin + c * (w + gap)
      const y = 12 + row * (h + gap + 18)
      const hit = exclude.some((e) => x < e.x + e.w && x + w > e.x && y < e.y + e.h && y + h > e.y)
      if (!hit) cells.push({ x, y, r: 0 })
    }
  }
  return cells
}

export default function ContactSheet() {
  const { items, intro, tab, setTab, go, tabsRef } = useHome({ capSmall: 10, capLarge: 26, cleanupSteps: STEPS, popFrom: 220, popTo: 40 })
  const heroRef = useRef<HTMLDivElement>(null)
  const { phase, step } = intro
  const final = phase === 'final'
  const selects = items.filter((i) => i.kind === 'case' || i.kind === 'about').length
  const frames = phase === 'noise' ? intro.shown : items.length

  const stateOf = ({ verdict, pos, sweep, step, item, exclude, field, size }: StateCtx): ItemOut => {
    if (phase === 'final') return { state: 'out' }
    const hero = exclude[0]
    if (verdict === 'keep') {
      if (step < 3) return { state: 'kept', delay: sweep * 30 }
      // printed where the Work panel will be
      const k = item.kind === 'about' ? 2 : item.id === 'acentra' ? 0 : 1
      const top = hero ? hero.y + hero.h + 40 : field.h * 0.6
      const left = hero ? hero.x + 20 : 16
      return { state: 'kept', x: Math.min(left + k * (size.w + 20), field.w - size.w - 16), y: Math.min(top, field.h - size.h - 24) }
    }
    if (step === 0) return { state: 'marked', delay: sweep * 26 }
    if (step < 3) return { state: 'marked' }
    return { state: 'out', x: pos.x - 40, delay: sweep * 16 }
  }

  return (
    <Shell dir="e">
      <header className="e-bar">
        <a href="#" className="e-wordmark" onClick={(e) => (e.preventDefault(), go('work'))}>
          {person.name}
        </a>
        <nav aria-label="Main">
          <button type="button" onClick={() => go('work')}>Work</button>
          <button type="button" onClick={() => go('about')}>About</button>
          <button type="button" onClick={() => go('about')}>Contact</button>
        </nav>
      </header>

      <main className="e-sheet">
        <NoiseField
          items={items}
          run={intro.run}
          phase={phase}
          shown={intro.shown}
          step={step}
          exclude={[heroRef]}
          place={sheet}
          stateOf={stateOf}
          extra={(ctx) => (
            <>
              <span className="e-edge">
                <span>{String(ctx.index + 3).padStart(2, '0')}</span>
                <span>{String(ctx.index + 3).padStart(2, '0')}A</span>
              </span>
              <svg className="e-mark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {ctx.verdict === 'keep' ? (
                  <path pathLength={1} d="M50 4C80 3 97 22 96 50S78 97 48 96 3 78 4 49 22 6 54 5" />
                ) : (
                  <path pathLength={1} d="M8 10L92 90M90 8L10 92" />
                )}
              </svg>
            </>
          )}
          className="e-field"
        />

        <div className="e-layout">
          <section ref={heroRef} className="e-strip" aria-labelledby="e-title">
            <figure className="e-frame e-frame-loop">
              <HeroLoop playing className="e-loop" controlClassName="e-loop-control" sizes="(min-width: 1024px) 600px, 92vw" />
              <figcaption className="e-edge-print">
                <span>01</span>
                <span>MJ · Hillside, Hong Kong</span>
              </figcaption>
            </figure>

            <div className="e-frame e-title">
              <div className="e-stack">
                <h1 id="e-title" className="e-headline" data-on={final || undefined}>
                  <span className="e-lead">{headline.lead}</span> <span className="e-trail">{headline.trail}</span>
                </h1>
                <div className="e-intro" data-on={!final || undefined} aria-hidden={final || undefined}>
                  <p className="e-name">
                    {person.name},<br />
                    <span className="e-trail">{person.role}</span>
                  </p>
                </div>
              </div>

              <div className="e-slate" aria-live="polite">
                <span className="e-count">
                  <b>{String(frames).padStart(2, '0')}</b> frames
                </span>
                {phase === 'cleanup' ? (
                  <span className="e-step" key={step}>
                    <b>{STATUS[step].mark}</b> {STATUS[step].says}
                  </span>
                ) : (
                  <span className="e-count">
                    <b>{String(final ? selects : 0).padStart(2, '0')}</b> selects
                  </span>
                )}
              </div>

              <div className="e-ctas">
                <button type="button" className="e-btn e-btn-primary" onClick={() => go('work')}>
                  {ctas.primary}
                </button>
                <button type="button" className="e-btn" onClick={() => go('about')}>
                  {ctas.secondary}
                </button>
                <button type="button" className="e-skip" onClick={intro.onControl}>
                  {intro.controlLabel}
                </button>
              </div>
              <span className="e-edge-print e-edge-print-dark" aria-hidden="true">
                <span>02</span>
                <span>Title</span>
              </span>
            </div>
          </section>

          <section ref={tabsRef} className="e-tabs" aria-label="Portfolio" data-on={final || undefined}>
            <TabList
              active={tab}
              onChange={setTab}
              idPrefix="e"
              className="e-tablist"
              tabClassName="e-tab"
              countClassName="e-tab-count"
              indicatorClassName="e-tab-indicator"
            />
            <Panels active={tab} phase={phase} idPrefix="e" />
          </section>
        </div>
      </main>
    </Shell>
  )
}
