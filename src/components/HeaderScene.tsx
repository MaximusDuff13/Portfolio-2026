'use client'
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode, type Ref } from 'react'
import { useInView } from 'framer-motion'
import { usePageVisible } from '@/lib/usePageVisible'
import { useReducedMotionSafe } from '@/lib/useReducedMotionSafe'
import {
  dogSprites,
  fallbackSrc,
  scene,
  sceneAssets,
  srcSet,
  type Box,
  type DogSprite,
  type Shadow,
  type SpriteName,
} from '@/data/headerScene'

/* NEW — the full-bleed header illustration, a flip-book played from the kit's spec
   (src/data/headerScene.ts ← public/header-kit/header-sequence.json).

   Layout: a grid with the overlay and the art stacked in row 1 and the bar in row 2, so the
   bar never covers the figures. The art cell is a size container; inside it, a wrapper with
   the painting's aspect ratio covers it like object-fit: cover, anchored bottom-centre
   (width = max(100%, height × aspect)). Every figure, shadow and the replay button is placed
   in % of that wrapper, so they stay locked to the painting at every size. The overlay
   reserves the wrapper's height below `skyLine` as bottom padding, so on wide screens the
   header grows rather than letting text reach the skyline; on phones (where the wrapper is
   sized by height) the art's min-height keeps enough sky.

   Playback: hard cuts only. Each step swaps the visible sprite and sets its box instantly;
   no figure's opacity is ever animated. The only tweens are the head tilt (240ms, on the
   head layer around its pivot) and the CSS breathing loop on the person (globals.css).
   First paint (SSR) is step 0: the scene and the seated man. After hydration the other
   sprites mount, every sprite is decode()d, and the sequence plays once when the header
   is in view, pausing while the tab is hidden. It ends on the final step and holds; the
   dog then becomes a replay button. Reduced motion shows the final step and never plays.
   Without JS, a <noscript> final still covers the scene. */

const RATIO = scene.width / scene.height
const LAST = scene.steps.length - 1
const FINAL_DOG = scene.steps[LAST].dog!
// Each dog pose is always drawn at the same size (only its position changes per step)
const DOG_SIZE = Object.fromEntries(
  dogSprites.map((name) => {
    const d = scene.steps.find((s) => s.dog?.sprite === name)!.dog!
    return [name, { width: d.width, height: d.height, shadow: { w: d.shadow.w, h: d.shadow.h } }]
  }),
) as Record<DogSprite, { width: number; height: number; shadow: { w: number; h: number } }>
// Translate to (left, top) in % of the wrapper. The wrapper is an inline-size container,
// so x is cqw and y is cqw scaled by the aspect ratio (1% of its height = 1/RATIO cqw).
const moveTo = (left: number, top: number) =>
  `translate(${left}cqw, calc(${top / RATIO} * 1cqw))`

// ms from the start of a play to the end of each step
const STEP_END = scene.steps.reduce<number[]>((ends, s, i) => [...ends, (ends[i - 1] ?? 0) + (s.ms ?? 0)], [])

const pct = (b: Box): CSSProperties => ({
  left: `${b.left}%`,
  top: `${b.top}%`,
  width: `${b.width}%`,
  height: `${b.height}%`,
})

// The wrapper is 100vw wide in landscape, and about 1.2 × the viewport height in portrait
// (art height × aspect), so ask for each sprite's share of that
const sizesFor = (widthPct: number) =>
  `(max-aspect-ratio: 1/1) ${Math.ceil(widthPct * 1.2)}vh, ${Math.ceil(widthPct)}vw`

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body'

export function HeaderScene({
  overlay,
  bar,
  className = '',
}: {
  /** text over the sky, top-left */
  overlay: ReactNode
  /** the bar under the art */
  bar: ReactNode
  className?: string
}) {
  const reduced = useReducedMotionSafe()
  const pageVisible = usePageVisible()
  const artRef = useRef<HTMLDivElement>(null)
  const inView = useInView(artRef, { amount: 0.4 })

  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState(0)
  // number of plays started; 0 = waiting to start
  const [run, setRun] = useState(0)
  const [played, setPlayed] = useState(false)

  const imgs = useRef(new Map<string, HTMLImageElement>())
  const imgRef = (key: string) => (el: HTMLImageElement | null) => {
    if (el) imgs.current.set(key, el)
    else imgs.current.delete(key)
  }
  // When the current play started, and when the tab was hidden (0 = visible). Steps are
  // timed from `start`, so render time doesn't add up across steps; hiding the tab
  // pushes `start` back by the hidden time, so play resumes where it paused.
  const clock = useRef({ start: 0, hiddenAt: 0 })

  // The man appears with the painting, not before it on the blurred placeholder (his file
  // is a fraction of the scene's size, so on a slow line it lands seconds earlier)
  const [sceneIn, setSceneIn] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const img = imgs.current.get('scene')
    if (!img) return
    if (img.complete) return setSceneIn(true)
    const show = () => setSceneIn(true)
    img.addEventListener('load', show)
    img.addEventListener('error', show)
    return () => {
      img.removeEventListener('load', show)
      img.removeEventListener('error', show)
    }
  }, [])

  // Preload: once the late sprites have mounted, wait for every sprite to load and decode
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

  // Start once, when decoded and in view
  useEffect(() => {
    if (ready && inView && run === 0 && !reduced) {
      clock.current = { start: performance.now(), hiddenAt: 0 }
      setRun(1)
    }
  }, [ready, inView, run, reduced])

  // The player: one timer per step, paused while the tab is hidden
  useEffect(() => {
    if (run === 0 || reduced) return
    const c = clock.current
    if (!pageVisible) {
      c.hiddenAt = performance.now()
      return
    }
    if (c.hiddenAt) {
      c.start += performance.now() - c.hiddenAt
      c.hiddenAt = 0
    }
    if (scene.steps[step].ms == null) {
      setPlayed(true)
      return
    }
    const id = window.setTimeout(
      () => setStep((s) => Math.min(s + 1, LAST)),
      Math.max(0, c.start + STEP_END[step] - performance.now()),
    )
    return () => window.clearTimeout(id)
  }, [run, step, reduced, pageVisible])

  const replay = () => {
    if (step !== LAST) return
    clock.current = { start: performance.now(), hiddenAt: 0 }
    setStep(0)
    setRun((r) => r + 1)
  }

  const shown = scene.steps[reduced ? LAST : step]
  const seated = shown.person === 'seated'
  const dog = shown.dog
  const playing = run > 0 && step !== LAST && !reduced

  const { seated: seatedBox, reach: reachBox } = scene
  const tilt = shown.headTilt

  return (
    <div
      // The art's minimum height lives on the row, not on the art: cqh ignores a size
      // container's own min-height, so the wrapper would stop covering on phones
      className={`relative grid grid-cols-[minmax(0,1fr)] grid-rows-[minmax(480px,1fr)_auto] sm:grid-rows-[minmax(520px,1fr)_auto] [container-type:inline-size] ${className}`}
    >
      {/* 1. Overlay on the sky. Bottom padding = the wrapper's height below the sky line at
          its width-driven size, plus 24px of air. */}
      <div
        className="relative z-10 row-start-1 col-start-1 self-start"
        style={{ paddingBottom: `calc(${1 - scene.skyLine} * 100cqw / ${RATIO} + 24px)` }}
      >
        {overlay}
      </div>

      {/* 2. Bar, under the art */}
      <div className="relative z-10 row-start-2 col-start-1">{bar}</div>

      {/* 3. Art. Last in DOM order, so the replay button is last in tab order. */}
      <div
        ref={artRef}
        className="relative row-start-1 col-start-1 overflow-hidden bg-body [container-type:size]"
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 [container-type:inline-size]"
          style={{
            width: `max(100cqw, 100cqh * ${RATIO})`,
            aspectRatio: `${scene.width} / ${scene.height}`,
            backgroundImage: `url(${sceneAssets.lqip})`,
            backgroundSize: 'cover',
          }}
        >
          <div role="img" aria-label={scene.alt} className="absolute inset-0">
            <Sprite
              name="scene"
              sizes={sizesFor(100)}
              imgRef={imgRef('scene')}
              priority="high"
              className="absolute inset-0 w-full h-full"
            />

            {/* Ground shadow, under the man (the dog's moves with each pose, below) */}
            <ShadowEllipse s={scene.personShadow} color={scene.shadowColor.person} />

            {/* Person, seated: the body sits ABOVE the head so the neck seam stays hidden */}
            <div
              aria-hidden="true"
              className="absolute scene-breathe"
              style={{
                ...pct(seatedBox),
                zIndex: 1,
                visibility: seated && sceneIn ? 'visible' : 'hidden',
                animationPlayState: pageVisible ? 'running' : 'paused',
              }}
            >
              <Sprite
                name="person-seated-head"
                sizes={sizesFor(seatedBox.width)}
                imgRef={imgRef('head')}
                className="absolute inset-0 w-full h-full"
                style={{
                  transformOrigin: `${seatedBox.headPivot.x}% ${seatedBox.headPivot.y}%`,
                  transform: `translateX(${scene.headShiftPerDeg * tilt}%) rotate(${tilt}deg)`,
                  transition: `transform ${scene.headTiltMs}ms ease-out`,
                }}
              />
              <Sprite
                name="person-seated-body"
                sizes={sizesFor(seatedBox.width)}
                imgRef={imgRef('body')}
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Late sprites: mounted after hydration, so first paint only fetches step 0 */}
            {mounted && (
              <>
                {/* Person, reaching: drawn above the dog, so the hand rests on its head */}
                <div
                  aria-hidden="true"
                  className="absolute scene-breathe"
                  style={{
                    ...pct(reachBox),
                    zIndex: 3,
                    visibility: seated ? 'hidden' : 'visible',
                    animationPlayState: pageVisible ? 'running' : 'paused',
                  }}
                >
                  <Sprite
                    name="person-reach"
                    sizes={sizesFor(reachBox.width)}
                    imgRef={imgRef('reach')}
                    priority="low"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Dog: every pose (and its shadow) stays mounted at its fixed size; a step
                    shows one and moves it with a transform, so the run isn't layout shift */}
                {dogSprites.map((name) => {
                  const size = DOG_SIZE[name]
                  const at = dog?.sprite === name ? dog : null
                  return (
                    <Fragment key={name}>
                      <div
                        aria-hidden="true"
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
                        aria-hidden="true"
                        className="absolute left-0 top-0"
                        style={{
                          width: `${size.width}%`,
                          height: `${size.height}%`,
                          zIndex: 2,
                          visibility: at ? 'visible' : 'hidden',
                          transform: at ? moveTo(at.left, at.top) : undefined,
                        }}
                      >
                        <Sprite
                          name={name}
                          sizes={sizesFor(size.width)}
                          imgRef={imgRef(name)}
                          priority="low"
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </Fragment>
                  )
                })}
              </>
            )}
          </div>

          <noscript
            dangerouslySetInnerHTML={{
              __html: `<picture><source type="image/avif" srcset="${srcSet('final-still', 'avif')}" sizes="${sizesFor(100)}"><img src="${fallbackSrc('final-still')}" srcset="${srcSet('final-still', 'webp')}" sizes="${sizesFor(100)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;z-index:5"></picture>`,
            }}
          />

          {/* Replay: the sitting dog, once the first play has ended. It stays mounted while a
              replay runs (disabled) so keyboard focus isn't lost. Hit area at least 44px. */}
          {played && !reduced && (
            <button
              type="button"
              onClick={replay}
              aria-label="Replay the scene"
              aria-disabled={playing || undefined}
              className={`absolute z-10 rounded-sm bg-transparent cursor-pointer aria-disabled:cursor-default ${focusRing}`}
              style={{
                left: `${FINAL_DOG.left + FINAL_DOG.width / 2}%`,
                top: `${FINAL_DOG.top + FINAL_DOG.height / 2}%`,
                width: `max(${FINAL_DOG.width}%, 44px)`,
                height: `max(${FINAL_DOG.height}%, 44px)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function Sprite({
  name,
  sizes,
  imgRef,
  priority,
  className,
  style,
}: {
  name: SpriteName
  sizes: string
  imgRef?: Ref<HTMLImageElement>
  priority?: 'high' | 'low'
  className?: string
  style?: CSSProperties
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, 'avif')} sizes={sizes} />
      {/* Plain <img>: the files are already exported at their display sizes, so
          next/image would only re-encode them */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={fallbackSrc(name)}
        srcSet={srcSet(name, 'webp')}
        sizes={sizes}
        alt=""
        draggable={false}
        decoding="async"
        // React 18 doesn't know fetchPriority yet; the lowercase attribute passes through
        {...(priority ? { fetchpriority: priority } : {})}
        className={`select-none ${className ?? ''}`}
        style={style}
      />
    </picture>
  )
}

function ShadowEllipse({ s, color }: { s: Shadow; color: string }) {
  return (
    <div
      aria-hidden="true"
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
