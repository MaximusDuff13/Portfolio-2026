'use client'
import { useRef } from 'react'
import { Check } from 'lucide-react'
import { headline, person, ctas, type NoiseItem } from '../_data/content'
import { HeroLoop } from '../_kit/HeroLoop'
import { NoiseField, scatter, type ItemOut, type StateCtx } from '../_kit/NoiseField'
import { Panels, useHome } from '../_kit/home'
import { Shell } from '../_kit/Shell'
import { TabList } from '../_kit/Tabs'
import './d.css'

/* TEMPORARY — /explore/d · Grid System. Swiss modular grid, made visible: twelve columns with
   a numbered ruler, measurements in mono. The noise is everything off the grid; each card
   carries a redline of how far off it is.
   Cleanup: a heuristics checklist (Nielsen's numbering) ticks through while the cards snap to
   columns, sort into four lists, lose what isn't essential, and the work drops into place
   where the tabs will be. The loop starts once the page has resolved. */

const STEPS = [760, 760, 620, 700]
const HEURISTICS = [
  { id: 'H4', label: 'Consistency and standards', doing: 'Aligning to the grid' },
  { id: 'H6', label: 'Recognition rather than recall', doing: 'Grouping like with like' },
  { id: 'H8', label: 'Aesthetic and minimalist design', doing: 'Removing what isn’t essential' },
  { id: 'H1', label: 'Visibility of system status', doing: 'Showing where everything lives' },
]
const LISTS: NoiseItem['kind'][][] = [
  ['case', 'about'],
  ['side', 'accolade'],
  ['note', 'feedback', 'stat'],
  ['article', 'event', 'tags'],
]
const listOf = (i: NoiseItem) => LISTS.findIndex((l) => l.includes(i.kind))

/** the grid the page is set on, in field pixels (matches d.css) */
function grid(fieldW: number) {
  const cols = fieldW < 720 ? 4 : 12
  const margin = fieldW < 640 ? 16 : fieldW < 1024 ? 40 : 64
  const gutter = fieldW < 640 ? 16 : 24
  const col = (fieldW - margin * 2 - gutter * (cols - 1)) / cols
  return { cols, margin, gutter, col, step: col + gutter }
}

export default function GridSystem() {
  const { items, intro, tab, setTab, go, tabsRef } = useHome({ capSmall: 9, capLarge: 24, cleanupSteps: STEPS })
  const heroRef = useRef<HTMLDivElement>(null)
  const { phase, step } = intro
  const final = phase === 'final'

  const order = new Map<string, number>()
  const seen = [0, 0, 0, 0]
  items.forEach((it) => order.set(it.id + it.kind, seen[listOf(it)]++))

  const snapped = ({ pos, field }: StateCtx) => {
    const g = grid(field.w)
    const c = Math.max(0, Math.min(g.cols - 1, Math.round((pos.x - g.margin) / g.step)))
    return { x: g.margin + c * g.step, y: Math.round(pos.y / 8) * 8, c }
  }

  const stateOf = (ctx: StateCtx): ItemOut => {
    const { item, verdict, field, exclude, size } = ctx
    const g = grid(field.w)
    const s = snapped(ctx)
    const hero = exclude[0]
    const below = hero ? hero.y + hero.h + 8 : field.h * 0.5
    const narrow = g.cols === 4
    // four lists, three columns each, right of the loop on wide screens
    const l = listOf(item)
    const k = order.get(item.id + item.kind) ?? 0
    const listX = narrow ? g.margin + (l % 2) * 2 * g.step : g.margin + l * 3 * g.step
    const listY = (narrow ? below + Math.floor(l / 2) * 140 : below) + k * 28
    if (phase === 'final') return { state: 'out', x: listX, y: listY, r: 0 }
    if (step === 0) return { state: 'marked', x: s.x, y: s.y, r: 0, delay: ctx.sweep * 14 }
    if (step === 1) return { state: 'marked', x: listX, y: listY, r: 0, delay: ctx.index * 12 }
    if (verdict !== 'keep') return { state: 'out', x: listX, y: listY + 24, r: 0, delay: k * 30 }
    // the work drops to where the Work panel's cards will sit
    const w = item.kind === 'about' ? 2 : item.id === 'acentra' ? 0 : 1
    const x = narrow ? g.margin : g.margin + w * 6 * g.step
    return { state: 'kept', x: narrow ? x : Math.min(x, field.w - size.w - g.margin), y: below + (narrow ? w * 32 : 0) + 64, r: 0 }
  }

  return (
    <Shell dir="d">
      <div className="d-columns" aria-hidden="true" data-phase={phase} data-step={step}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>
            <i>{i + 1}</i>
          </span>
        ))}
      </div>

      <header className="d-nav">
        <a href="#" className="d-wordmark" onClick={(e) => (e.preventDefault(), go('work'))}>
          {person.name}
        </a>
        <nav aria-label="Main">
          <button type="button" onClick={() => go('work')}>Work</button>
          <button type="button" onClick={() => go('about')}>About</button>
          <button type="button" onClick={() => go('about')}>Contact</button>
        </nav>
        <button type="button" className="d-skip" onClick={intro.onControl}>
          {intro.controlLabel}
        </button>
      </header>

      <main className="d-stage">
        <NoiseField
          items={items}
          run={intro.run}
          phase={phase}
          shown={intro.shown}
          step={step}
          exclude={[heroRef]}
          place={scatter({ rotate: 0, bleed: 0.12 })}
          stateOf={stateOf}
          extra={(ctx) => {
            const g = grid(ctx.field.w)
            const s = snapped(ctx)
            const dx = Math.round(ctx.pos.x - s.x)
            const dy = Math.round(ctx.pos.y - s.y)
            return (
              <span className="d-redline">
                <span className="d-off">
                  {dx >= 0 ? '+' : '−'}
                  {Math.abs(dx)} x {dy >= 0 ? '+' : '−'}
                  {Math.abs(dy)} y
                </span>
                <span className="d-on">col {Math.min(g.cols, s.c + 1)}</span>
              </span>
            )
          }}
          className="d-field"
        />

        <div className="d-page">
          <section ref={heroRef} className="d-hero" aria-labelledby="d-title">
            <div className="d-loop-cell">
              <HeroLoop playing={final} className="d-loop" controlClassName="d-loop-control" sizes="(min-width: 1024px) 400px, 92vw" />
              <p className="d-caption">Fig. 1 — Hillside, Hong Kong. Painted loop</p>
            </div>
            <div className="d-text-cell">
              <div className="d-stack">
                <h1 id="d-title" className="d-headline" data-on={final || undefined}>
                  <span className="d-lead">{headline.lead}</span> <span className="d-trail">{headline.trail}</span>
                </h1>
                <div className="d-intro" data-on={!final || undefined} aria-hidden={final || undefined}>
                  <p className="d-name">
                    {person.name},<br />
                    <span className="d-trail">{person.role}</span>
                  </p>
                  <table className="d-checks" data-on={phase === 'cleanup' || undefined}>
                    <caption>Heuristic review</caption>
                    <tbody>
                      {HEURISTICS.map((h, i) => {
                        const state = phase !== 'cleanup' ? 'todo' : i < step ? 'done' : i === step ? 'now' : 'todo'
                        return (
                          <tr key={h.id} data-state={state}>
                            <th scope="row">{h.id}</th>
                            <td>{h.label}</td>
                            <td className="d-check-doing">{state === 'now' ? h.doing : ''}</td>
                            <td className="d-check-box" aria-label={state === 'done' ? 'passed' : undefined}>
                              {state === 'done' && <Check aria-hidden="true" />}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="d-ctas">
                <button type="button" className="d-btn d-btn-primary" onClick={() => go('work')}>
                  {ctas.primary}
                </button>
                <button type="button" className="d-btn" onClick={() => go('about')}>
                  {ctas.secondary}
                </button>
              </div>
            </div>
          </section>

          <section ref={tabsRef} className="d-tabs" aria-label="Portfolio" data-on={final || undefined}>
            <TabList
              active={tab}
              onChange={setTab}
              idPrefix="d"
              className="d-tablist"
              tabClassName="d-tab"
              countClassName="d-tab-count"
              indicatorClassName="d-tab-indicator"
            />
            <Panels active={tab} phase={phase} idPrefix="d" />
          </section>
        </div>
      </main>
    </Shell>
  )
}
