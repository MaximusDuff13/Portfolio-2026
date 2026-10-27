'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/* Holds a story card open (data-open) while it is hovered with a mouse or has keyboard focus, so
   motion.css can write each preset's open state once. A pointer has to rest 70ms before the card
   opens, so a quick pass across it starts nothing; leaving mid-way reverses from wherever the
   motion is (CSS transitions, not keyframes). Never opens on touch (hover: none), below 640px or
   in the 390 frame (`still`): the cover only, and the tap follows the link. With reduced motion a
   preset shows either its cover only or its end state, still (`reduced`). */
const INTENT = 70

export function MotionCard({
  reduced,
  still,
  className,
  style,
  children,
  ...data
}: {
  reduced: 'cover' | 'end'
  still?: boolean
  className: string
  style?: CSSProperties
  children: ReactNode
} & Record<`data-${string}`, string | undefined>) {
  const [open, setOpen] = useState(false)
  const [static_, setStatic] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStatic(rm.matches && reduced === 'end' && !still)
    sync()
    rm.addEventListener('change', sync)
    return () => rm.removeEventListener('change', sync)
  }, [reduced, still])

  const can = () =>
    !still && matchMedia('(min-width: 640px)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !matchMedia('(hover: hover)').matches || !can()) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(true), INTENT)
  }
  const leave = () => {
    window.clearTimeout(timer.current)
    setOpen(false)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <article
      {...data}
      className={className}
      style={style}
      data-open={open || static_ || undefined}
      data-static={static_ || undefined}
      onPointerEnter={enter}
      onPointerLeave={(e) => {
        // keyboard focus keeps it open after the mouse leaves
        if (!e.currentTarget.querySelector(':focus-visible')) leave()
      }}
      onFocus={(e) => {
        if (can() && e.target.matches(':focus-visible')) setOpen(true)
      }}
      onBlur={leave}
    >
      {children}
    </article>
  )
}
