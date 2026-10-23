'use client'
import { Fragment, useEffect, useRef, useState, type CSSProperties, type Ref } from 'react'
import { useInView } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { usePageVisible } from '@/lib/usePageVisible'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import { dogSprites, scene, srcSet, fallbackSrc, type Box, type DogSprite, type SpriteName } from '@/data/headerScene'
import crop from './loopCrop.json'

/* The painted skyline and dog as a small looping window, for the
   top-left of the home page. The header-sequence.json flip-book, cropped.

   Poster: final-still, cropped to the window. It is what loads first and what shows while the
   loop is idle, offscreen, paused or under reduced motion. When `playing` turns on, the poster
   hard-cuts to the empty scene plus sprites and the sequence runs; after the last pose it
   holds for `holdMs`, then cuts back to step 0 and runs again. Hard cuts only: a step swaps the
   visible sprite and sets its box instantly. No figure's opacity is ever animated. The only
   tweens are the head tilt (240ms) and the breathing loop from globals.css.

   Weight (2x screen, AVIF): ~180 KB for the two cropped paintings plus ~95 KB of sprites.
   WebP fallback ~455 KB. Both under the 600 KB budget.

   A pause control (WCAG 2.2.2: anything that moves for more than five seconds) sits in the
   bottom-right corner; the page styles it through `controlClassName`. */

const RATIO = scene.width / scene.height
const LAST = scene.steps.length - 1
const STEP_END = scene.steps.reduce<number[]>((ends, s, i) => [...ends, (ends[i - 1] ?? 0) + (s.ms ?? 0)], [])
const DOG_SIZE = Object.fromEntries(
  dogSprites.map((name) => {
    const d = scene.steps.find((s) => s.dog?.sprite === name)!.dog!
    return [name, { width: d.width, height: d.height, shadow: { w: d.shadow.w, h: d.shadow.h } }]
  }),
) as Record<DogSprite, { width: number; height: number; shadow: { w: number; h: number } }>

/** the window's aspect, in pixels of the painting */
export const LOOP_ASPECT = (crop.width * scene.width) / (crop.height * scene.height)

// The full scene, positioned so the window shows only the crop. % of the window.
const sceneBox: CSSProperties = {
  left: `${(-crop.left / crop.width) * 100}%`,
  top: `${(-crop.top / crop.height) * 100}%`,
  width: `${(100 / crop.width) * 100}%`,
  aspectRatio: `${scene.width} / ${scene.height}`,
}

const pct = (b: Box): CSSProperties => ({ left: `${b.left}%`, top: `${b.top}%`, width: `${b.width}%`, height: `${b.height}%` })
// translate in % of the scene wrapper, which is an inline-size container
const moveTo = (left: number, top: number) => `translate(${left}cqw, calc(${top / RATIO} * 1cqw))`

const cropSet = (name: 'scene' | 'final-still', fmt: 'avif' | 'webp') =>
  crop.widths.map((w) => `/home/loop/${name}-${w}.${fmt} ${w}w`).join(', ')

export function HeroLoop({
  playing,
  holdMs = 5200,
  sizes = '(min-width: 1024px) 520px, 92vw',
  className = '',
  controlClassName = '',
}: {
  /** run the loop; false shows the poster */
  playing: boolean
  /** how long the final pose holds before the loop restarts */
  holdMs?: number
  /** the rendered width of the window, for the paintings' srcset */
  sizes?: string
  className?: string
  controlClassName?: string
}) {
  const reduced = useReducedMotionSafe()
  const pageVisible = usePageVisible()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })

  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const [step, setStep] = useState(LAST)
  const imgs = useRef(new Map<string, HTMLImageElement>())
  const imgRef = (key: string) => (el: HTMLImageElement | null) => {
    if (el) imgs.current.set(key, el)
    else imgs.current.delete(key)
  }

  useEffect(() => setMounted(true), [])

  // Sprites mount after hydration; play only once every one is decoded
  useEffect(() => {
    if (!mounted) return
    let cancelled = false
    Promise.all(Array.from(imgs.current.values()).map((img) => img.decode().catch(() => undefined))).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [mounted])

  const active = playing && ready && inView && pageVisible && !paused && !reduced

  // The player: from the current step to the next; the last step holds, then cuts to 0
  useEffect(() => {
    if (!active) return
    const ms = step === LAST ? holdMs : (scene.steps[step].ms ?? 0)
    const id = window.setTimeout(() => setStep((s) => (s === LAST ? 0 : s + 1)), ms)
    return () => window.clearTimeout(id)
  }, [active, step, holdMs])

  // Leaving play: return to the poster pose, so the poster and the sprites agree
  useEffect(() => {
    if (!playing || reduced) setStep(LAST)
  }, [playing, reduced])

  // Show the poster until the loop has actually started once
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (active) setStarted(true)
    if (!playing) setStarted(false)
  }, [active, playing])

  const shown = scene.steps[step]
  const seated = shown.person === 'seated'
  const dog = shown.dog
  const tilt = shown.headTilt
  const showPoster = !started || reduced

  // sprites are drawn at a fraction of the scene; the scene is (100 / crop.width) x the window
  const spriteSizes = (widthPct: number) => {
    const k = (widthPct / crop.width) * 1.0
    return sizes
      .split(',')
      .map((part) => part.trim().replace(/(\d+(?:\.\d+)?)(px|vw)$/, (_, n, u) => `${Math.ceil(Number(n) * k)}${u}`))
      .join(', ')
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${LOOP_ASPECT}` }}
    >
      <div
        role="img"
        aria-label="Watercolour of Michael on a hillside above the Hong Kong skyline with a coffee; his dog runs up, sits beside him, and he rests a hand on its head."
        className="absolute inset-0"
      >
        {/* Poster: the final still, cropped */}
        <picture>
          <source type="image/avif" srcSet={cropSet('final-still', 'avif')} sizes={sizes} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/home/loop/final-still-${crop.widths[0]}.webp`}
            srcSet={cropSet('final-still', 'webp')}
            sizes={sizes}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full select-none"
            style={{ visibility: showPoster ? 'visible' : 'hidden' }}
          />
        </picture>

        {mounted && !reduced && (
          <div className="absolute inset-0" style={{ visibility: showPoster ? 'hidden' : 'visible' }} aria-hidden="true">
            <picture>
              <source type="image/avif" srcSet={cropSet('scene', 'avif')} sizes={sizes} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef('scene')}
                src={`/home/loop/scene-${crop.widths[0]}.webp`}
                srcSet={cropSet('scene', 'webp')}
                sizes={sizes}
                alt=""
                draggable={false}
                className="absolute inset-0 w-full h-full select-none"
              />
            </picture>

            <div className="absolute [container-type:inline-size]" style={sceneBox}>
              <ShadowEllipse s={scene.personShadow} color={scene.shadowColor.person} />

              {/* Seated: body above head so the neck seam stays hidden */}
              <div
                className="absolute scene-breathe"
                style={{ ...pct(scene.seated), zIndex: 1, visibility: seated ? 'visible' : 'hidden', animationPlayState: active ? 'running' : 'paused' }}
              >
                <Sprite
                  name="person-seated-head"
                  sizes={spriteSizes(scene.seated.width)}
                  imgRef={imgRef('head')}
                  style={{
                    transformOrigin: `${scene.seated.headPivot.x}% ${scene.seated.headPivot.y}%`,
                    transform: `translateX(${scene.headShiftPerDeg * tilt}%) rotate(${tilt}deg)`,
                    transition: `transform ${scene.headTiltMs}ms ease-out`,
                  }}
                />
                <Sprite name="person-seated-body" sizes={spriteSizes(scene.seated.width)} imgRef={imgRef('body')} />
              </div>

              {/* Reaching: above the dog, so the hand rests on its head */}
              <div
                className="absolute scene-breathe"
                style={{ ...pct(scene.reach), zIndex: 3, visibility: seated ? 'hidden' : 'visible', animationPlayState: active ? 'running' : 'paused' }}
              >
                <Sprite name="person-reach" sizes={spriteSizes(scene.reach.width)} imgRef={imgRef('reach')} />
              </div>

              {dogSprites.map((name) => {
                const size = DOG_SIZE[name]
                const at = dog?.sprite === name ? dog : null
                return (
                  <Fragment key={name}>
                    <div
                      className="absolute left-0 top-0 rounded-[50%]"
                      style={{
                        width: `${size.shadow.w}%`,
                        height: `${size.shadow.h}%`,
                        background: scene.shadowColor.dog,
                        filter: `blur(${scene.shadowBlur}cqw)`,
                        visibility: at ? 'visible' : 'hidden',
                        transform: at ? moveTo(at.shadow.cx - size.shadow.w / 2, at.shadow.cy - size.shadow.h / 2) : undefined,
                      }}
                    />
                    <div
                      className="absolute left-0 top-0"
                      style={{
                        width: `${size.width}%`,
                        height: `${size.height}%`,
                        zIndex: 2,
                        visibility: at ? 'visible' : 'hidden',
                        transform: at ? moveTo(at.left, at.top) : undefined,
                      }}
                    >
                      <Sprite name={name} sizes={spriteSizes(size.width)} imgRef={imgRef(name)} />
                    </div>
                  </Fragment>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {playing && !reduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Play the illustration' : 'Pause the illustration'}
          className={`absolute bottom-2 right-2 z-10 grid place-items-center ${controlClassName}`}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}

function Sprite({ name, sizes, imgRef, style }: { name: SpriteName; sizes: string; imgRef?: Ref<HTMLImageElement>; style?: CSSProperties }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, 'avif')} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={fallbackSrc(name)}
        srcSet={srcSet(name, 'webp')}
        sizes={sizes}
        alt=""
        draggable={false}
        decoding="async"
        className="absolute inset-0 w-full h-full select-none"
        style={style}
      />
    </picture>
  )
}

function ShadowEllipse({ s, color }: { s: { cx: number; cy: number; w: number; h: number }; color: string }) {
  return (
    <div
      className="absolute rounded-[50%]"
      style={{
        left: `${s.cx - s.w / 2}%`,
        top: `${s.cy - s.h / 2}%`,
        width: `${s.w}%`,
        height: `${s.h}%`,
        background: color,
        filter: `blur(${scene.shadowBlur}cqw)`,
      }}
    />
  )
}
