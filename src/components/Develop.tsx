'use client'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import './develop.css'

/** "Develop": the site's standard way for an image to arrive (picked Nov 14 2026).
    Whatever is inside fades in as a soft grey proof, then the finished picture sweeps across it
    on a diagonal. It plays once, when the wrapper scrolls into view and its images have loaded;
    about 1.5 seconds. Works on anything visual: an <img>, a <video>, a whole component.

      <Develop className="rounded-lg">
        <img src="…" alt="…" className="block w-full rounded-lg" />
      </Develop>

    The wrapper is a plain block; pass layout classes (margins, widths, `absolute inset-0`) and the
    child's corner radius in `className` so the veil's corners match. `delay` (ms) staggers
    neighbours. Reduced motion or no JavaScript: the picture is simply there. */

const DURATION = 1500

export function Develop({ children, className = '', style, delay = 0 }: { children: ReactNode; className?: string; style?: CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'wait' | 'play' | 'done'>('wait')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setPhase('done')
    let timer = 0
    let gone = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        // wait for the pictures (two seconds at most), so the proof is never an empty box
        const loaded = Promise.all(
          Array.from(el.querySelectorAll('img')).map((img) =>
            img.complete
              ? null
              : new Promise((r) => {
                  img.addEventListener('load', r, { once: true })
                  img.addEventListener('error', r, { once: true })
                }),
          ),
        )
        Promise.race([loaded, new Promise((r) => window.setTimeout(r, 2000))]).then(() => {
          if (gone) return
          setPhase('play')
          timer = window.setTimeout(() => setPhase('done'), DURATION + delay + 60)
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      gone = true
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [delay])

  return (
    <div ref={ref} className={`dev ${className}`} data-dev={phase} style={{ ...style, ['--dev-delay' as string]: `${delay}ms` }}>
      {children}
      {phase !== 'done' && <span className="dev-veil" aria-hidden="true" />}
      <noscript>
        <style>{'.dev{opacity:1!important}.dev-veil{display:none}'}</style>
      </noscript>
    </div>
  )
}
