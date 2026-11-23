'use client'
import { useEffect, useRef, useState } from 'react'

/* The Jira Migration Tool in motion (Nov 23 2026): Michael's screen recording (Video Project 19.mp4,
   copied to public/videos/jira-migration.mp4; 1920 × 1080, 19.7s). It runs from "Preparing your
   migration plan" through steps 1–4 to "Your migration plan is ready", then into the plan itself.
   The recording sits in a black frame: the app screen is x 147–1773, y 45–1037. The box below has
   the screen's own shape and the video is scaled and shifted so only the screen shows.
   It plays muted on a loop while on screen and pauses off screen; with reduced motion it waits
   for a press of play. */

const SRC = '/videos/jira-migration.mp4'
const VW = 1920
const VH = 1080
const CROP = { x: 147, y: 45, w: 1773 - 147, h: 1037 - 45 }

export function JiraVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(rm)
    const v = ref.current
    if (!v || rm) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.3 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)]" style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}>
      <video
        ref={ref}
        src={SRC}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label="Jira Migration Tool: preparing a migration plan in four steps, then opening the plan for review"
        className="absolute block max-w-none"
        style={{
          width: `${(VW / CROP.w) * 100}%`,
          height: `${(VH / CROP.h) * 100}%`,
          left: `${(-CROP.x / CROP.w) * 100}%`,
          top: `${(-CROP.y / CROP.h) * 100}%`,
        }}
      />
    </div>
  )
}
