/* Header scene data. Everything comes straight from the kit's spec,
   public/header-kit/header-sequence.json (boxes, timings, z-order): nothing here re-derives
   a position. Web assets are exported by scripts/export-header-kit.mjs, which also writes
   headerKitAssets.json (the widths of each exported file, and a tiny placeholder). */

import spec from '../../public/header-kit/header-sequence.json'
import assets from './headerKitAssets.json'

export type Box = { left: number; top: number; width: number; height: number }
/** A ground shadow: centre, width and height, all % of the scene */
export type Shadow = { cx: number; cy: number; w: number; h: number }
export type DogSprite = 'dog-run-1' | 'dog-run-2' | 'dog-brake' | 'dog-turn' | 'dog-sit'
export type SpriteName = DogSprite | 'scene' | 'final-still' | 'person-seated-head' | 'person-seated-body' | 'person-reach'

export type SceneStep = {
  /** how long this step holds; null = the final step, held */
  ms: number | null
  person: 'seated' | 'reach'
  /** degrees, negative = toward the dog */
  headTilt: number
  dog: (Box & { sprite: DogSprite; shadow: Shadow }) | null
}

export const scene = {
  width: spec.scene.width,
  height: spec.scene.height,
  alt: 'Watercolor illustration: a man sits on a hillside overlooking the Hong Kong skyline with a cup of coffee; his dog runs up, sits beside him, and he rests a hand on its head.',
  /** fraction of the scene's height that is open sky (skyline starts ~49% down); the
      overlay text has to stay above it */
  skyLine: 0.47,
  seated: spec.person.seated as Box & { headPivot: { x: number; y: number } },
  reach: spec.person.reach as Box,
  personShadow: spec.person.shadow as Shadow,
  shadowColor: { person: 'rgba(45,60,25,0.43)', dog: 'rgba(45,60,25,0.39)' },
  /** shadow blur, % of the scene width (~6px at 1672) */
  shadowBlur: 0.36,
  /** head nudge, % of the seated box per degree of tilt */
  headShiftPerDeg: -0.05,
  headTiltMs: 240,
  steps: spec.steps as SceneStep[],
}

export const dogSprites: DogSprite[] = ['dog-run-1', 'dog-run-2', 'dog-brake', 'dog-turn', 'dog-sit']

export const sceneAssets = assets as {
  viewport: number
  sprites: Record<SpriteName, { widths: number[] }>
  lqip: string
}

/** srcSet for one sprite in one format, e.g. "/header-kit/web/dog-sit-57.avif 57w, ..." */
export const srcSet = (name: SpriteName, fmt: 'avif' | 'webp') =>
  sceneAssets.sprites[name].widths.map((w) => `/header-kit/web/${name}-${w}.${fmt} ${w}w`).join(', ')

/** The smallest exported file, for the <img> fallback src */
export const fallbackSrc = (name: SpriteName) => `/header-kit/web/${name}-${sceneAssets.sprites[name].widths[0]}.webp`
