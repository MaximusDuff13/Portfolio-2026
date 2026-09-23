'use client'
// Lightbox — click an image to see it full-size in an overlay.
//
// NEW COMPONENT. Two parts:
//   · LightboxProvider holds the one open image and renders the overlay. Wrap it around a group of
//     images; only one image is ever enlarged at a time.
//   · LightboxTrigger is a transparent <button> laid over an image (absolute inset-0), so it adds
//     the interaction without touching the image's own sizing or layout. The parent must be
//     `relative`.
//
// SIZE. The enlarged image is as large as fits in 90vw × 90vh, never cropped: once it loads, its
// width is min(90vw, 90vh × its aspect ratio) and its height follows. That also keeps the <img> box
// exactly the image, so a click beside it lands on the backdrop and closes.
//
// KEYBOARD. Each trigger is a real button, so Tab reaches it and Enter/Space open it. Opening moves
// focus to the close button (the dialog's only control, so Tab stays on it); Escape, the backdrop
// or the close button close it, and focus goes back to the trigger that opened it.
//
// SCROLL. The page behind is locked while open. The scrollbar's width is added as padding so the
// page doesn't shift sideways when the scrollbar disappears.
//
// COLOUR. Existing tokens only. Backdrop foundation-900 at 90%; the close button and the hover hint
// are foundation-100 on solid foundation-900 (16.0:1).
//
// MOTION. A short fade and scale on open; fade only under prefers-reduced-motion.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'

type Shown = { src: string; alt: string }
type Ctx = { open: (image: Shown, trigger: HTMLElement) => void }

const LightboxContext = createContext<Ctx | null>(null)

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState<Shown | null>(null)
  const [ratio, setRatio] = useState<number | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()

  const open = useCallback((image: Shown, from: HTMLElement) => {
    trigger.current = from
    setRatio(null)
    setShown(image)
  }, [])

  const close = useCallback(() => setShown(null), [])

  // While open: lock scroll, focus the close button, listen for Escape and keep Tab inside.
  useEffect(() => {
    if (!shown) return
    const { body } = document
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    closeButton.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        closeButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      body.style.overflow = prev.overflow
      body.style.paddingRight = prev.paddingRight
      trigger.current?.focus()
    }
  }, [shown, close])

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {shown && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={shown.alt}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foundation-900/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <button
              ref={closeButton}
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-foundation-600 bg-foundation-900 text-foundation-100 transition-colors hover:border-foundation-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-foundation-100 focus-visible:ring-offset-2 focus-visible:ring-offset-foundation-900"
            >
              <X aria-hidden="true" size={20} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={shown.src}
              src={shown.src}
              alt={shown.alt}
              onLoad={(e) => {
                const img = e.currentTarget
                setRatio(img.naturalWidth / img.naturalHeight)
              }}
              className="block h-auto rounded-lg bg-body object-contain"
              style={{
                width: ratio ? `min(90vw, calc(90vh * ${ratio}))` : undefined,
                maxWidth: '90vw',
                maxHeight: '90vh',
                visibility: ratio ? 'visible' : 'hidden',
              }}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}

/* Sits over an image as a transparent button. Shows a small expand hint on hover and focus. */
export function LightboxTrigger({ src, alt }: { src: string; alt: string }) {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('LightboxTrigger must be inside a LightboxProvider')
  return (
    <button
      type="button"
      aria-label={`Enlarge: ${alt}`}
      onClick={(e) => ctx.open({ src, alt }, e.currentTarget)}
      className="group absolute inset-0 z-10 block h-full w-full cursor-zoom-in rounded-[inherit] border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foundation-900"
    >
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md border border-foundation-600 bg-foundation-900 text-foundation-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        <Maximize2 size={16} />
      </span>
    </button>
  )
}
