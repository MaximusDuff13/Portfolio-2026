'use client'
/* TRIAL (Nov 22 2026): the brief and its four facts, made to stand out. ?f=a|b|c; the switcher shows
   in development only, production shows C.
   A  Big type: the facts as a ruled row in the display serif, under the brief
   B  Sage card: one tinted card beside the brief
   C  Colour tiles: four stage-tint tiles under the brief, each with its own small picture
   Once picked, keep one, make it a server component and drop the switcher. */
import { useEffect, useState } from 'react'
import { Code2, PenTool } from 'lucide-react'

export type Facts = { role: string; team: string; teamNote: string; focus: string[]; time: string; year: string }
type Props = { description: string; facts: Facts }

const LABEL = 'text-label font-sans uppercase tracking-widest text-foundation-600'

function Brief({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <p className={`m-0 ${LABEL}`}>The brief</p>
      <p className="mt-4 mb-0 text-[20px] leading-[1.6] font-sans text-foundation-800">{text}</p>
    </div>
  )
}

/* A */
function BigType({ description, facts: f }: Props) {
  const rows = [
    { k: 'Role', v: f.role, n: '' },
    { k: 'Team', v: f.team, n: f.teamNote },
    { k: 'Focus', v: f.focus[0], n: f.focus.slice(1).join(', ') },
    { k: 'Timeline', v: f.time, n: f.year },
  ]
  return (
    <div className="mt-10">
      <Brief text={description} className="max-w-4xl" />
      <dl className="mt-12 mb-0 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
        {rows.map((r) => (
          <div key={r.k} className="border-t border-foundation-900 py-4">
            <dt className={LABEL}>{r.k}</dt>
            <dd className="m-0 mt-3 font-display text-heading-m text-foundation-900">{r.v}</dd>
            {r.n && <dd className="m-0 mt-1 text-body-sm font-sans text-foundation-700">{r.n}</dd>}
          </div>
        ))}
      </dl>
    </div>
  )
}

/* B */
function SageCard({ description, facts: f }: Props) {
  const rows = [
    { k: 'Role', v: f.role, n: '' },
    { k: 'Team', v: f.team, n: f.teamNote },
    { k: 'Focus', v: f.focus[0], n: f.focus.slice(1).join(', ') },
    { k: 'Timeline', v: f.time, n: f.year },
  ]
  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-16">
      <Brief text={description} />
      <dl className="m-0 rounded-2xl bg-stage-sage px-6 py-2">
        {rows.map((r, i) => (
          <div key={r.k} className={`grid grid-cols-[5.5rem_minmax(0,1fr)] items-baseline gap-4 py-4 ${i ? 'border-0 border-t border-solid border-foundation-900/10' : ''}`}>
            <dt className="text-body-sm font-sans text-foundation-700">{r.k}</dt>
            <dd className="m-0">
              <span className="block font-display text-[20px] leading-tight text-foundation-900">{r.v}</span>
              {r.n && <span className="mt-1 block text-caption font-sans text-foundation-700">{r.n}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* C */
function Tiles({ description, facts: f }: Props) {
  const tile = 'flex min-h-[12.5rem] flex-col rounded-2xl p-4 sm:p-5'
  const value = 'm-0 font-display text-[20px] leading-tight text-foundation-900 sm:text-heading-m'
  const note = 'm-0 mt-1 text-body-sm font-sans text-foundation-700'
  const disc = 'flex h-12 w-12 items-center justify-center rounded-full'
  return (
    <div className="mt-10">
      <Brief text={description} className="max-w-4xl" />
      <dl className="mt-10 mb-0 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className={`${tile} bg-stage-sage`}>
          <dt className={LABEL}>Role</dt>
          <dd className="m-0 mt-5" aria-hidden="true">
            <span className={`${disc} bg-stage-sage-strong text-foundation-900`}><PenTool size={22} strokeWidth={1.75} /></span>
          </dd>
          <dd className={`${value} mt-auto pt-5`}>{f.role}</dd>
        </div>
        <div className={`${tile} bg-stage-straw`}>
          <dt className={LABEL}>Team</dt>
          <dd className="m-0 mt-5 flex" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home/loop/icon-solo-96.webp" alt="" width={48} height={48} className="h-12 w-12 rounded-full border-2 border-stage-straw" />
            <span className={`${disc} -ml-3 border-2 border-stage-straw bg-foundation-900 text-body`}><Code2 size={20} strokeWidth={1.75} /></span>
          </dd>
          <dd className={`${value} mt-auto pt-5`}>{f.team}</dd>
          <dd className={note}>{f.teamNote}</dd>
        </div>
        <div className={`${tile} bg-stage-ginger`}>
          <dt className={LABEL}>Focus</dt>
          <dd className="m-0 mt-auto pt-5">
            <ul className="m-0 list-none p-0">
              {f.focus.map((x, i) => (
                <li key={x} className={`py-2 font-display text-[17px] leading-tight sm:text-[20px] text-foundation-900 last:pb-0 ${i ? 'border-0 border-t border-solid border-foundation-900/10' : ''}`}>{x}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={`${tile} bg-stage-sky`}>
          <dt className={LABEL}>Timeline</dt>
          <dd className="m-0 mt-5 flex h-12 items-center gap-1 sm:gap-1.5" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="h-3 flex-1 rounded-full bg-accent-warm" />
            ))}
          </dd>
          <dd className={`${value} mt-auto pt-5`}>{f.time}</dd>
          <dd className={note}>{f.year}</dd>
        </div>
      </dl>
    </div>
  )
}

const OPTIONS = { a: ['Big type', BigType], b: ['Sage card', SageCard], c: ['Colour tiles', Tiles] } as const
type Key = keyof typeof OPTIONS

export function BriefFacts(p: Props) {
  const [v, setV] = useState<Key>('c')
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const q = new URLSearchParams(window.location.search).get('f')
    if (q && q in OPTIONS) setV(q as Key)
  }, [])
  const View = OPTIONS[v][1]
  const pick = (k: Key) => {
    setV(k)
    const u = new URL(window.location.href)
    u.searchParams.set('f', k)
    window.history.replaceState(window.history.state, '', u)
  }
  return (
    <>
      <View {...p} />
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-foundation-900 p-1 shadow-lg" role="group" aria-label="Brief facts options">
          {(Object.keys(OPTIONS) as Key[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={k === v}
              onClick={() => pick(k)}
              className={`cursor-pointer whitespace-nowrap rounded-full border-0 px-3 py-1.5 text-caption font-sans ${k === v ? 'bg-body text-foundation-900' : 'bg-transparent text-foundation-200'}`}
            >
              {k.toUpperCase()} · {OPTIONS[k][0]}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
