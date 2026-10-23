'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { person, caseStudies, type NoiseItem } from './content'
import { HeroLoop } from './kit/HeroLoop'
import { LoopWindow } from './kit/windows'
import { NoiseField, scatter, type ItemOut, type StateCtx } from './kit/NoiseField'
import { Panels, useHome } from './kit/home'
import { TabList } from './kit/Tabs'
import './home.css'

/* The home page (direction A, House Style): only the site's existing tokens. No top nav;
   the tab row docks to the top and carries the way back.
   Loop above the text, both anchored top-left; noise fills the right and below.
   Cleanup: the affinity-mapping checklist borrowed from C, set in A's own type. Each line is a
   step the visitor can see: the cards group into four piles, the piles get plain names, the
   two case studies get the vote and lift forward, then the requests and chatter drop away
   while side projects, awards and the about card rise toward the tabs that hold them. */

// About 4s in all, under the 5s at which moving content needs a stop control (WCAG 2.2.2),
// so there is no Skip: 18 cards land in ~0.9s, a short beat, then four ~0.6s steps.
const STEPS = [650, 600, 600, 550]
const CHECKLIST = ['Group similar ideas', 'Name the themes', 'Dot-vote what matters', 'Clear the rest']

// the four piles, in plain words; `keep` piles are filed into the tabs rather than dropped
const THEMES: { label: string; kinds: NoiseItem['kind'][]; keep: boolean }[] = [
  { label: 'The work', kinds: ['case', 'about'], keep: true },
  { label: 'Side projects & awards', kinds: ['side', 'accolade'], keep: true },
  { label: 'Requests', kinds: ['note', 'feedback'], keep: false },
  { label: 'Everything else', kinds: ['article', 'event', 'stat', 'tags'], keep: false },
]
const themeOf = (i: NoiseItem) => THEMES.findIndex((t) => t.kinds.includes(i.kind))
// the scale cards shrink to in the piles (matches --s in a.css)
const PILE_SCALE = 0.82
// the flagship, for the one call to action
const lead = caseStudies[0]

// A's own intro copy (B and C keep the shared headline in content.ts). Personal, first person:
// the coffee matches the painting above it; the role line is a searchable title and, with no
// nav, the only place the full name stays once the intro resolves.
const hello = `Hi, I'm ${person.name.split(' ')[0]}.`
const pitch = "Give me a coffee and a complicated product, and I'll find the simple one hiding inside."
const role = `${person.name} · Product designer, design systems and AI tools`

export function HomePage() {
  const { items, intro, tab, setTab, tabsRef } = useHome({ capSmall: 9, capLarge: 18, cleanupSteps: STEPS, popFrom: 90, popTo: 25, hold: 250 })
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // the tab row docks to the top once scrolled to; a zero-height marker just above it says when
  const dockRef = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  useEffect(() => {
    const el = dockRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDocked(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const smooth = intro.reduced ? 'auto' : 'smooth'
  // switching tabs while docked starts the new panel at its top, under the bar
  // for the tab transition: the side the new tab lies on, and that a tab has been picked
  const [tabMove, setTabMove] = useState<'left' | 'right' | null>(null)
  const pickTab = (id: typeof tab) => {
    const order = ['work', 'side', 'accolades', 'about']
    if (id !== tab) setTabMove(order.indexOf(id) > order.indexOf(tab) ? 'right' : 'left')
    setTab(id)
    const marker = dockRef.current
    // 1px past the marker: exactly at 0 it would count as undocked
    if (docked && marker) window.scrollTo({ top: marker.getBoundingClientRect().top + window.scrollY + 1, behavior: smooth })
  }

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: smooth })
    // the home button hides once the bar undocks, so keyboard focus moves to the page's title
    titleRef.current?.focus({ preventScroll: true })
  }
  const { phase, step } = intro
  const final = phase === 'final'

  // each card's place in its pile and the pile sizes; the case studies sit on top of theirs
  const { pile, sizes } = useMemo(() => {
    const order = items.map((it, i) => ({ it, i })).sort((a, b) => Number(b.it.kind === 'case') - Number(a.it.kind === 'case'))
    const seen = THEMES.map(() => 0)
    const pile: number[] = []
    order.forEach(({ it, i }) => (pile[i] = seen[themeOf(it)]++))
    return { pile, sizes: seen }
  }, [items])

  const stateOf = ({ index, item, pos, size, field, exclude, step }: StateCtx): ItemOut => {
    const t = themeOf(item)
    const j = pile[index]
    const hero = exclude[0]
    const narrow = field.w < 720
    // piles sit in the free area: right of the hero on wide screens, under it on phones
    const x0 = narrow ? 12 : hero ? hero.x + hero.w + 8 : 24
    const y0 = narrow && hero ? hero.y + hero.h + 40 : 88
    const colW = narrow ? (field.w - 24) / 4 : (field.w - x0 - 24) / 4
    const x = x0 + t * colW + (colW - size.w * PILE_SCALE) / 2
    const y = y0 + j * (narrow ? 22 : 38)
    const voted = item.kind === 'case'
    // once voted, the two case studies fan out of their pile so both read in full
    const lifted = y0 + j * (size.h * PILE_SCALE + 14)
    // the work drops toward the tabs as the page resolves
    if (phase === 'final') return { state: 'out', x, y: voted ? lifted + 64 : y, r: 0 }
    if (voted && step >= 2) return { state: 'kept', x, y: lifted, r: 0 }
    if (step < 3) return { state: 'marked', x, y, r: 0, delay: step === 0 ? (index % 8) * 30 : 0 }
    // clear: kept themes rise toward the tabs that hold them; the rest drop away
    return THEMES[t].keep
      ? { state: 'out', x, y: y - 72, r: 0, delay: j * 40 }
      : { state: 'out', x, y: y + 72, r: 0, delay: (j % 6) * 40 }
  }

  return (
    <div className="home-root">
      {/* No top nav on the home page: the tabs beside the hero are the navigation */}
      <main className="a-stage">
        <NoiseField
          items={items}
          run={intro.run}
          phase={phase}
          shown={intro.shown}
          step={step}
          exclude={[heroRef]}
          place={scatter({ rotate: 3, bleed: 0.25 })}
          stateOf={stateOf}
          extra={(ctx) => (
            <>
              {pile[ctx.index] === 0 && (
                <span className="a-theme">
                  {THEMES[themeOf(ctx.item)].label}
                  <span className="a-theme-count">{sizes[themeOf(ctx.item)]}</span>
                </span>
              )}
              {ctx.item.kind === 'case' && (
                <span className="a-vote">
                  <Check strokeWidth={3} />
                </span>
              )}
            </>
          )}
          className="a-field"
        />

        <div className="a-layout">
        <section className="a-hero" aria-labelledby="a-title">
          <div ref={heroRef} className="a-hero-block">
            <LoopWindow direction="a"><HeroLoop playing={phase !== 'noise'} poster="start" className="a-loop" controlClassName="a-loop-control" sizes="(min-width: 1024px) 460px, 92vw" /></LoopWindow>

            <div className="a-stack">
              <div className="a-headline" data-on={final || undefined}>
                <h1 id="a-title" ref={titleRef} tabIndex={-1} className="a-hello">{hello}</h1>
                <p className="a-pitch">{pitch}</p>
                <p className="a-role">{role}</p>
              </div>
              <div className="a-intro" aria-hidden={final || undefined} data-on={!final || undefined}>
                <p className="a-name">
                  {person.name},<br />
                  <span className="a-trail">product designer</span>
                </p>
                <ol className="a-checklist" aria-live="polite">
                  {CHECKLIST.map((line, i) => {
                    const shown = phase === 'cleanup' && i <= step
                    const done = phase === 'cleanup' && i < step
                    return (
                      <li key={line} data-shown={shown || undefined} data-done={done || undefined}>
                        <span className="a-box" aria-hidden="true">
                          <Check strokeWidth={3} />
                        </span>
                        <span className="a-line">{shown ? line : ''}</span>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>

            <div className="a-ctas">
              {/* One action the page doesn't already show: straight into the flagship case study.
                  The nav and the tabs cover Work and About, so no second button. */}
              <Link href={lead.href} className="a-btn a-btn-primary">
                Read the {lead.company} case study
                <ArrowRight aria-hidden="true" />
              </Link>
              {/* Replay only once resolved; hidden (not removed) during the intro so the row never shifts */}
              <button type="button" className="a-skip" onClick={intro.replay} style={{ visibility: final ? 'visible' : 'hidden' }}>
                Replay intro
              </button>
            </div>
          </div>
        </section>

        <section
          ref={tabsRef}
          className="a-tabs"
          aria-label="Portfolio"
          data-on={final || undefined}
          data-tab-move={tabMove ?? undefined}
        >
          <div ref={dockRef} aria-hidden="true" />
          <div className="a-tabbar" data-docked={docked || undefined}>
            {/* back to the top: the painting's two figures, shown only while the bar is docked */}
            <button
              type="button"
              className="a-home"
              onClick={toTop}
              aria-label="Back to top"
              tabIndex={docked ? 0 : -1}
              aria-hidden={!docked || undefined}
            >
              <picture>
                <source type="image/avif" srcSet="/home/loop/icon-96.avif" />
                <img src="/home/loop/icon-96.webp" alt="" width={44} height={44} />
              </picture>
            </button>
            <TabList
              active={tab}
              onChange={pickTab}
              idPrefix="a"
              className="a-tablist"
              tabClassName="a-tab"
              countClassName="a-tab-count"
              indicatorClassName="a-tab-indicator"
            />
          </div>
          <Panels active={tab} phase={phase} idPrefix="a" />
        </section>
        </div>
      </main>
    </div>
  )
}
