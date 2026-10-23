'use client'
// TEMPORARY — /preview/home-v2/6 "Canvas". The home page is a design file: a dotted canvas, the
// work laid out as named frames, a couple of FigJam-style sticky notes, and a cursor labelled
// "Michael" moving calmly between the frames. Hovering a frame selects it, with handles and its
// size, the way a design tool does. The canvas drifts a few pixels with the pointer for depth.
// Small screens: frames stack, no cursor. Reduced motion: no cursor, no drift.
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ahds, dca, media, person } from '../content'
import { CountUp, EASE } from '../motion'
import { Switcher, Video } from '../parts'

const SELECT = '#0d99ff' // a design tool's selection blue, only for this exploration

function Frame({
  name,
  i,
  href,
  className = '',
  style,
  children,
}: {
  name: string
  i: number
  href?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const [size, setSize] = useState('')
  const body = (
    <>
      <span className="absolute -top-6 left-0 font-sans text-[12px] text-foundation-500 group-hover:text-[#0d99ff]">{name}</span>
      <div className="h-full overflow-hidden rounded-[2px] border border-border bg-white shadow-[0_1px_3px_rgba(28,25,23,0.08)]">
        {children}
      </div>
      {/* Selection: outline, four handles and the frame's size */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-px hidden border group-hover:block" style={{ borderColor: SELECT }}>
        {['-left-1 -top-1', '-right-1 -top-1', '-left-1 -bottom-1', '-right-1 -bottom-1'].map((pos) => (
          <span key={pos} className={`absolute h-2 w-2 border bg-white ${pos}`} style={{ borderColor: SELECT }} />
        ))}
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 font-sans text-[11px] text-white" style={{ background: SELECT }}>
          {size}
        </span>
      </span>
    </>
  )
  return (
    <motion.div
      className={`group relative ${className}`}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
      onPointerEnter={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setSize(`${Math.round(r.width)} × ${Math.round(r.height)}`)
      }}
    >
      {href ? (
        <Link href={href} className="block h-full no-underline">
          {body}
        </Link>
      ) : (
        body
      )}
    </motion.div>
  )
}

function Sticky({ children, className = '', style, tint }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; tint: string }) {
  return (
    <div className={`p-5 shadow-[0_6px_14px_-6px_rgba(28,25,23,0.25)] ${className}`} style={{ background: tint, ...style }}>
      {children}
    </div>
  )
}

/* The other person in the file. Glides between frames, pausing at each. */
function Collaborator() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-30 hidden lg:block"
      initial={{ left: '72%', top: 180 }}
      animate={{
        left: ['72%', '72%', '22%', '22%', '64%', '64%', '30%', '30%', '72%'],
        top: [180, 180, 560, 560, 520, 520, 150, 150, 180],
      }}
      transition={{ duration: 20, times: [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1], ease: 'easeInOut', repeat: Infinity }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path d="M2 1 L16 8 L9 10 L6 17 Z" fill={'#c2600a'} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="ml-3 inline-block rounded-full rounded-tl-none bg-accent-warm px-2 py-0.5 font-sans text-[11px] font-medium text-white">
        Michael
      </span>
    </motion.div>
  )
}

export default function Canvas() {
  const reduced = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 40, damping: 20 })
  const sy = useSpring(py, { stiffness: 40, damping: 20 })
  const dx = useTransform(sx, (v) => v * -10)
  const dy = useTransform(sy, (v) => v * -8)
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    if (reduced) return
    const move = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, px, py])

  useEffect(() => {
    const fit = () => setZoom(Math.round(Math.min(100, (window.innerWidth / 1280) * 100)))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f4f2ee] pb-32 text-foundation-900"
      style={{ backgroundImage: 'radial-gradient(#d6d3d1 1px, transparent 1px)', backgroundSize: '22px 22px' }}
    >
      {/* Tool chrome, top left and right */}
      <div className="flex items-center justify-between px-4 py-3 font-sans text-[12px] text-foundation-500 sm:px-6">
        <span>
          Drafts / <span className="text-foundation-900">{person.name} — Portfolio</span>
        </span>
        <span className="hidden sm:inline">{zoom}%</span>
      </div>

      <motion.div style={reduced ? undefined : { x: dx, y: dy }} className="relative mx-auto max-w-6xl px-6 pt-10 sm:px-10 lg:h-[820px] lg:px-0">
        {!reduced && <Collaborator />}

        <div className="flex flex-col gap-14 lg:block">
          <Frame name="Intro" i={0} className="lg:absolute lg:left-0 lg:top-6 lg:w-[44%]">
            <div className="p-8">
              <p className="m-0 font-grotesk text-label uppercase tracking-widest text-foundation-500">{person.role}</p>
              <h1 className="m-0 mt-4 font-grotesk text-display-xl">{person.name}</h1>
              <p className="m-0 mt-4 font-sans text-body text-foundation-600">
                I design products and the systems behind them. This page is laid out like the files I
                work in. Pick a frame to open it.
              </p>
            </div>
          </Frame>

          <Frame name="Data Conversion App / Mapping" i={1} href={dca.href} className="lg:absolute lg:left-[50%] lg:top-0 lg:w-[50%]">
            <div className="aspect-[16/10] border-b border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.mapping} alt="The Data Conversion App mapping screen." className="h-full w-full object-cover object-left-top" />
            </div>
            <div className="p-5">
              <p className="m-0 font-grotesk text-heading-m">{dca.headline}</p>
              <p className="m-0 mt-1 font-sans text-body-sm text-foundation-600">{dca.kicker}</p>
            </div>
          </Frame>

          <Frame name="Acentra Health Design System / Components" i={2} href={ahds.href} className="lg:absolute lg:left-[3%] lg:top-[350px] lg:w-[42%]">
            <div className="aspect-[16/10] border-b border-border">
              <Video src={media.dsVideo} label="Acentra Health Design System in use." />
            </div>
            <div className="p-5">
              <p className="m-0 font-grotesk text-heading-m">{ahds.headline}</p>
              <p className="m-0 mt-1 font-sans text-body-sm text-foundation-600">{ahds.kicker}</p>
            </div>
          </Frame>

          <Frame name="Numbers" i={3} className="lg:absolute lg:left-[50%] lg:top-[470px] lg:w-[28%]">
            <dl className="m-0 grid grid-cols-2 gap-5 p-6">
              {[dca.stats[0], dca.stats[1], ahds.stats[0], ahds.stats[3]].map((s) => (
                <div key={s.label}>
                  <dt className="font-grotesk text-heading-m">
                    <CountUp value={s.figure} />
                  </dt>
                  <dd className="m-0 mt-1 font-sans text-caption text-foundation-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Frame>

          <div className="flex flex-col gap-6 sm:flex-row lg:absolute lg:left-[81%] lg:top-[440px] lg:w-[19%] lg:flex-col">
            <Sticky tint="#fde7b0" className="-rotate-2 transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none">
              <p className="m-0 font-hand text-[22px] leading-tight text-foundation-900">“{dca.quote.split('. ')[0]}.”</p>
              <p className="m-0 mt-2 font-sans text-[11px] text-foundation-700">{dca.quoteBy}</p>
            </Sticky>
            <Link href="/about" className="no-underline">
              <Sticky tint="#d9ecd4" className="rotate-[1.5deg] transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none">
                <p className="m-0 font-hand text-[24px] leading-tight text-foundation-900">Say hello → about &amp; contact</p>
              </Sticky>
            </Link>
          </div>
        </div>
      </motion.div>
      <Switcher current={6} />
    </main>
  )
}
