'use client'
// TEMPORARY — /preview/home "The Classifieds", the chosen home page direction. The whole page is the small-ads section: the
// work, the numbers and the way to get in touch, each set as a boxed notice. Motion: the ads are
// pasted up one by one, each landing a touch askew; ad headlines type out like copy off the
// wire; a red pen circles the lead ad once it is in view; hovering an ad lifts it off the page.
// Reduced motion: everything is simply in place.
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ahds, dca, media, person } from './content'
import { MovingPicture, Today } from './parts'
import { CountUp, Typed } from './motion'

const LABEL = 'font-grotesk text-label uppercase tracking-widest'

/* One boxed notice, pasted up with a small random-looking tilt (fixed per ad, so it is stable). */
function Ad({
  children,
  i,
  tilt = 0,
  href,
  className = '',
}: {
  children: React.ReactNode
  i: number
  tilt?: number
  href?: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const box = `relative mb-4 block break-inside-avoid border border-foundation-900 bg-[#fbf8f1] p-4 text-foundation-900 no-underline ${className}`
  const body = href ? (
    <Link href={href} className={`${box} group`}>
      {children}
    </Link>
  ) : (
    <div className={box}>{children}</div>
  )
  return (
    <motion.div
      className="break-inside-avoid"
      initial={reduced ? false : { opacity: 0, y: -30, rotate: tilt * 4, scale: 1.04 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: (i % 6) * 0.07 }}
      whileHover={reduced ? undefined : { y: -4, rotate: 0, boxShadow: '0 16px 30px -12px rgba(28,25,23,0.35)' }}
      style={reduced ? { rotate: tilt } : undefined}
    >
      {body}
    </motion.div>
  )
}

/* A loose red-pen ring drawn around the lead ad. */
function PenCircle() {
  const reduced = useReducedMotion()
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-4 z-10 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-visible"
    >
      <motion.path
        d="M 60 30 C 160 -6, 330 0, 380 50 C 418 100, 410 220, 350 270 C 270 310, 110 305, 40 255 C -10 210, -8 90, 50 40 C 80 20, 130 12, 170 14"
        fill="none"
        stroke="#c2600a"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.9 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.3, delay: 0.6, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export default function Classifieds() {
  const reduced = useReducedMotion()
  let n = 0
  return (
    <main className="newsprint min-h-screen px-4 pb-28 pt-8 sm:px-10 lg:px-section">
      <div className="mx-auto max-w-6xl text-foundation-900">
        <header className="border-b-[3px] border-double border-foundation-900 pb-4 text-center">
          <div className={`flex justify-between text-foundation-600 ${LABEL}`}>
            <span>Section D</span>
            <Today />
            <span>Rates on request</span>
          </div>
          <motion.h1
            initial={reduced ? false : { letterSpacing: '0.4em', opacity: 0 }}
            animate={{ letterSpacing: '0.06em', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.25, 1] }}
            className="font-grotesk mt-4 text-[44px] font-bold uppercase leading-none sm:text-[88px]"
          >
            Classifieds
          </motion.h1>
          <p className="font-paper accent-italic mt-3 text-heading-m text-foundation-700">
            {person.name}, {person.role}. Notices of work, results and references.
          </p>
        </header>

        <div className={`mt-6 flex flex-wrap gap-x-8 gap-y-2 border-b border-foundation-900 pb-3 ${LABEL}`}>
          <span>01 · Work completed</span>
          <span>02 · Results</span>
          <span>03 · References</span>
          <span>04 · Enquiries</span>
        </div>

        <section className="mt-8 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {/* 01 · Work completed */}
          <p className={`mb-3 ${LABEL} text-accent-warm`}>01 · Work completed</p>

          <div className="relative mb-6">
            <PenCircle />
            <Ad i={n++} tilt={-0.6} href={dca.href} className="border-2">
              <p className={LABEL}>Completed · {dca.when}</p>
              <p className="font-grotesk mt-2 text-[26px] font-bold uppercase leading-[0.95]">
                <Typed text="Data conversion, now in a week" />
              </p>
              <MovingPicture src={media.mapping} alt="The Data Conversion App mapping screen." className="mt-3 aspect-[4/3] border border-foundation-900" />
              <p className="font-paper mt-3 text-[15px] leading-[1.5]">{dca.deck}</p>
              <p className="font-paper mt-2 text-[15px] leading-[1.5]">{dca.body[1]}</p>
              <p className={`mt-3 ${LABEL} group-hover:text-accent-warm`}>{dca.role} · Full details →</p>
            </Ad>
          </div>

          <Ad i={n++} tilt={0.8} href={ahds.href}>
            <p className={LABEL}>Completed · {ahds.kicker}</p>
            <p className="font-grotesk mt-2 text-[22px] font-bold uppercase leading-[0.95]">
              <Typed text="One design language, five teams" delay={0.2} />
            </p>
            <MovingPicture video src={media.dsVideo} alt="Acentra Health Design System in use." className="mt-3 aspect-video border border-foundation-900" />
            <p className="font-paper mt-3 text-[15px] leading-[1.5]">{ahds.body[0]}</p>
            <p className={`mt-3 ${LABEL} group-hover:text-accent-warm`}>Full details →</p>
          </Ad>

          {/* 02 · Results */}
          <p className={`mb-3 mt-6 ${LABEL} text-accent-warm`}>02 · Results</p>
          {[...dca.stats, ...ahds.stats].map((s, i) => (
            <Ad key={s.label} i={n++} tilt={i % 2 ? 0.5 : -0.4}>
              <p className="font-grotesk text-[34px] font-bold leading-none">
                <CountUp value={s.figure} />
              </p>
              <p className="font-paper mt-1 text-[15px]">{s.label}</p>
            </Ad>
          ))}

          {/* 03 · References */}
          <p className={`mb-3 mt-6 ${LABEL} text-accent-warm`}>03 · References</p>
          <Ad i={n++} tilt={-0.3}>
            <p className="font-paper accent-italic text-[18px] leading-[1.45]">“{dca.quote}”</p>
            <p className={`mt-3 ${LABEL} text-foundation-600`}>{dca.quoteBy}</p>
          </Ad>

          {/* 04 · Enquiries */}
          <p className={`mb-3 mt-6 ${LABEL} text-accent-warm`}>04 · Enquiries</p>
          <Ad i={n++} tilt={0.4} href="/about" className="bg-foundation-900 text-body">
            <p className="font-grotesk text-[24px] font-bold uppercase leading-[0.95] text-body">
              Write to the designer
            </p>
            <p className="font-paper mt-2 text-[15px] text-foundation-200">
              {person.focus}. About the designer, and how to get in touch.
            </p>
            <p className={`mt-3 ${LABEL} text-body group-hover:text-accent-warm`}>About and contact →</p>
          </Ad>
        </section>
      </div>
    </main>
  )
}
