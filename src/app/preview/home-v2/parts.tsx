'use client'
// TEMPORARY — /preview/home-v2 harness. Shared pieces for the seven approaches.
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { approaches } from './content'

/* A looping, muted product video. Paused on its first frame with reduced motion. */
export function Video({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => (query.matches ? v.pause() : v.play().catch(() => {}))
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      aria-label={label}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

/* The switcher pinned to the bottom of every approach, so the seven compare quickly. */
export function Switcher({ current }: { current: number }) {
  return (
    <nav
      aria-label="Home page approaches"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-foundation-700 bg-foundation-900/95 p-1 font-grotesk text-nav-tab shadow-lg backdrop-blur"
    >
      <Link href="/preview/home-v2" className="rounded-full px-3 py-2 text-foundation-300 no-underline hover:text-body">
        All
      </Link>
      {approaches.map(({ n, name }) => (
        <Link
          key={n}
          href={`/preview/home-v2/${n}`}
          title={name}
          aria-current={n === current ? 'page' : undefined}
          className={`grid h-9 w-9 place-items-center rounded-full no-underline ${
            n === current ? 'bg-body text-foundation-900' : 'text-foundation-300 hover:text-body'
          }`}
        >
          {n}
        </Link>
      ))}
    </nav>
  )
}
