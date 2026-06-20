'use client'
import { useRef, useState } from 'react'

const clamp = (n: number) => Math.min(100, Math.max(0, n))

function Tag({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'warm' }) {
  const cls = tone === 'warm' ? 'bg-accent-warm text-body' : 'bg-foundation-900/80 text-body backdrop-blur'
  return (
    <span className={`text-label font-grotesk uppercase tracking-widest px-2.5 py-1 rounded ${cls}`}>{children}</span>
  )
}

/* Classic drag-to-compare wipe slider. Both images must share the same aspect. */
export function BeforeAfter({
  before,
  after,
  aspect = '1674 / 800',
}: {
  before: string
  after: string
  aspect?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const fromX = (x: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos(clamp(((x - r.left) / r.width) * 100))
  }
  return (
    <div
      ref={ref}
      onPointerDown={(e) => fromX(e.clientX)}
      onPointerMove={(e) => e.buttons === 1 && fromX(e.clientX)}
      style={{ aspectRatio: aspect }}
      className="relative w-full rounded-lg border border-border overflow-hidden select-none cursor-ew-resize bg-foundation-900 shadow-xl"
    >
      <img src={after} alt="After" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
      <img
        src={before}
        alt="Before"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="absolute top-3 left-3"><Tag>Before</Tag></div>
      <div className="absolute top-3 right-3"><Tag tone="warm">After</Tag></div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-body" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-body border border-border shadow-lg grid place-items-center text-accent-warm text-ui-chrome">⇄</div>
      </div>
    </div>
  )
}
