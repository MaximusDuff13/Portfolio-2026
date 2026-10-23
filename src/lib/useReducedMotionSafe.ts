'use client'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** prefers-reduced-motion, but false until mounted. The server can't know the preference,
    so anything that renders differently for reduced motion must wait for mount, or the
    first client render won't match the server HTML. */
export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && prefersReduced === true
}
