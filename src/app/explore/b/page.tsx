'use client'
import { useRef } from 'react'
import { MousePointer2, Hand, Frame, Type, Play } from 'lucide-react'
import { headline, person, ctas } from '../_data/content'
import { HeroLoop } from '../_kit/HeroLoop'
import { LoopWindow } from '../_kit/windows'
import { NoiseField, scatter, type ItemOut, type StateCtx } from '../_kit/NoiseField'
import { Panels, useHome } from '../_kit/home'
import { Shell } from '../_kit/Shell'
import { TabList } from '../_kit/Tabs'
import type { NoiseItem } from '../_data/content'
import './b.css'

/* TEMPORARY — /explore/b · Canvas. Product-native: the home page as a design file. Frames
   sit on a dotted canvas with their layer names above them; the loop is the one live
   prototype on it, so it plays from the start.
   Cleanup: a marquee selection drags across the canvas, tags every layer Keep / Merge /
   Remove, deletes, stacks the repeats, then auto-layouts what's left. The status bar at the
   bottom narrates it in the tool's own words. */

// marquee · verdicts · delete · merge · auto layout
const STEPS = [950, 800, 520, 620, 760]
const STATUS = [
  (n: number) => `Selecting ${n} layers`,
  () => 'Reviewing each layer',
  (n: number, r: number) => `Removed ${r} layers that add noise`,
  () => 'Merged repeats into one source',
  (_: number, __: number, k: number) => `Auto layout · ${k} frames, 24 gap`,
]

const layerName = (i: NoiseItem) => {
  switch (i.kind) {
    case 'case':
      return `Case study / ${i.name}`
    case 'side':
      return `Side project / ${i.title}`
    case 'accolade':
      return `Accolade / ${i.title}`
    case 'article':
      return `Article / ${i.title.split(' ').slice(0, 3).join(' ')}…`
    case 'event':
      return `Event / ${i.month} ${i.day}`
    case 'note':
      return 'Notification'
    case 'feedback':
      return 'Comment / Stakeholder'
    case 'stat':
      return `Stat / ${i.value}`
    case 'tags':
      return 'Tags'
    case 'about':
      return 'About / Snippet'
  }
}

export default function Canvas() {
  const { items, intro, tab, setTab, go, tabsRef } = useHome({ capSmall: 9, capLarge: 24, cleanupSteps: STEPS })
  const heroRef = useRef<HTMLDivElement>(null)
  const { phase, step } = intro
  const final = phase === 'final'

  const keepers: NoiseItem[] = items.filter((i) => i.kind === 'case' || i.kind === 'about')
  const removed = items.filter((i) => i.kind !== 'case' && i.kind !== 'about' && i.kind !== 'side' && i.kind !== 'accolade').length

  const stateOf = ({ verdict, pos, field, size, step, item, exclude }: StateCtx): ItemOut => {
    // the marquee reaches a card when it covers the card's far corner
    const reach = Math.max((pos.x + size.w) / field.w, (pos.y + size.h) / field.h)
    const selectDelay = Math.min(1, Math.max(0, reach)) * 820
    if (phase === 'final') return { state: 'out' }
    if (step === 0) return { state: 'marked', delay: selectDelay }
    if (step === 1) return { state: 'marked' }
    if (verdict === 'remove') return { state: 'out' }
    if (verdict === 'merge') {
      if (step === 2) return { state: 'marked' }
      // repeats slide onto one stack, then go
      const anchorX = field.w * 0.62
      const anchorY = field.h * 0.18
      const k = item.kind === 'side' ? 0 : 1
      return { state: step === 3 ? 'marked' : 'out', x: anchorX + k * 26, y: anchorY + k * 26, delay: 0 }
    }
    // keep: auto layout in a row where the tabs will be
    if (step >= 4) {
      // a row under the hero, 24px apart (cards are near enough one width)
      const k = keepers.indexOf(item)
      const hero = exclude[0]
      const left = hero ? hero.x + 20 : 16
      const top = hero ? Math.min(hero.y + hero.h + 24, field.h - size.h * 0.6) : field.h * 0.6
      const x = field.w < 720 ? left + k * 18 : left + k * (size.w + 24)
      return { state: 'kept', x, y: field.w < 720 ? top + k * 18 : top }
    }
    return { state: 'marked' }
  }

  const status = phase === 'cleanup' ? STATUS[step](items.length, removed, keepers.length) : final ? 'Ready' : `${intro.shown} layers on canvas`

  return (
    <Shell dir="b">
      <header className="b-bar">
        <div className="b-file">
          <span className="b-logo" aria-hidden="true">
            {person.initials}
          </span>
          <a href="#" onClick={(e) => (e.preventDefault(), go('work'))} className="b-filename">
            {person.name}
            <span> / Portfolio</span>
          </a>
        </div>
        <div className="b-tools" aria-hidden="true">
          <MousePointer2 data-on={phase === 'cleanup' && step < 2 ? '' : undefined} />
          <Frame data-on={phase === 'cleanup' && step >= 4 ? '' : undefined} />
          <Type />
          <Hand />
        </div>
        <nav aria-label="Main" className="b-nav">
          <button type="button" onClick={() => go('work')}>Work</button>
          <button type="button" onClick={() => go('about')}>About</button>
          <button type="button" onClick={() => go('about')}>Contact</button>
        </nav>
      </header>

      <main className="b-canvas">
        <NoiseField
          items={items}
          run={intro.run}
          phase={phase}
          shown={intro.shown}
          step={step}
          exclude={[heroRef]}
          place={scatter({ rotate: 0, bleed: 0.15, snap: 8 })}
          stateOf={stateOf}
          extra={(ctx) => (
            <>
              <span className="b-layer">{layerName(ctx.item)}</span>
              <span className="b-handles" />
              <span className="b-verdict" data-v={ctx.verdict}>
                {ctx.verdict === 'keep' ? 'Keep' : ctx.verdict === 'merge' ? 'Merge' : 'Remove'}
              </span>
            </>
          )}
          className="b-field"
        />
        <div className="b-marquee" data-phase={phase} data-step={step} aria-hidden="true" />

        <div className="b-layout">
          <section ref={heroRef} className="b-hero" aria-labelledby="b-title">
            <figure className="b-frame b-loop-frame">
              <figcaption className="b-frame-name">
                <Play aria-hidden="true" /> Prototype / Hillside loop
              </figcaption>
              <LoopWindow direction="b"><HeroLoop playing className="b-loop" controlClassName="b-loop-control" sizes="(min-width: 1024px) 440px, 92vw" /></LoopWindow>
            </figure>

            <div className="b-frame b-text-frame">
              <span className="b-frame-name">Intro</span>
              <div className="b-stack">
                <h1 id="b-title" className="b-headline" data-on={final || undefined}>
                  <span className="b-lead">{headline.lead}</span> <span className="b-trail">{headline.trail}</span>
                </h1>
                <p className="b-name" aria-hidden={final || undefined} data-on={!final || undefined}>
                  {person.name}
                  <br />
                  <span className="b-trail">{person.role}</span>
                </p>
              </div>
              <div className="b-ctas">
                <button type="button" className="b-btn b-btn-primary" onClick={() => go('work')}>
                  {ctas.primary}
                </button>
                <button type="button" className="b-btn" onClick={() => go('about')}>
                  {ctas.secondary}
                </button>
              </div>
            </div>
          </section>

          <section ref={tabsRef} className="b-tabs" aria-label="Portfolio" data-on={final || undefined}>
            <span className="b-frame-name">Home / Sections</span>
            <TabList
              active={tab}
              onChange={setTab}
              idPrefix="b"
              className="b-tablist"
              tabClassName="b-tab"
              countClassName="b-tab-count"
              indicatorClassName="b-tab-indicator"
            />
            <Panels active={tab} phase={phase} idPrefix="b" />
          </section>
        </div>
      </main>

      <footer className="b-status" data-phase={phase}>
        <span className="b-status-dot" aria-hidden="true" />
        <span className="b-status-text" aria-live="polite" key={`${phase}-${step}`}>
          {status}
        </span>
        <button type="button" className="b-skip" onClick={intro.onControl}>
          {intro.controlLabel}
        </button>
      </footer>
    </Shell>
  )
}
