'use client'
// TEMPORARY — /preview/home harness. Shared pieces for the home page.
import { useEffect, useRef, useState } from 'react'

/* A picture that moves: a looping product video, or a still screenshot drifting slowly. Shown
   as an old sepia press photo with a vignette and grain (see .moving-picture in paper.css); it
   develops into full colour on hover. Videos are muted, loop and play inline; with reduced
   motion they are paused on their first frame and the drift is off. */
export function MovingPicture({
  src,
  video = false,
  alt,
  className = '',
  position = 'top left',
}: {
  src: string
  video?: boolean
  alt: string
  className?: string
  position?: string
}) {
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
    <div className={`moving-picture relative overflow-hidden bg-foundation-800 ${className}`}>
      {video ? (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="drift absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      )}
    </div>
  )
}

/* Today's date, the way a paper prints it. Rendered on the client so it is always the reader's
   today, not the build's. */
export function Today({ className = '' }: { className?: string }) {
  const [text, setText] = useState('')
  useEffect(() => {
    setText(
      new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    )
  }, [])
  return <span className={className} suppressHydrationWarning>{text || ' '}</span>
}

