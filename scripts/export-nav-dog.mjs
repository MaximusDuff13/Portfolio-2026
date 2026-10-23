/* The nav dog's ball-carrying run frames, for the fetch in the site header (NavDog.tsx).

   Source: public/header-kit/Dog-run-ball.png, the run-1 pose with the ball in his mouth (an
   edit of dog-run-1.png, drawn larger and on a bigger canvas, with a stray second dog at the
   bottom). Neither it nor the kit's sprites are modified. This script:
   1. crops that dog, scales him to dog-run-1's exact size and sets him on its canvas, feet on
      the same line: dog-run-ball-1;
   2. cuts the painted ball out of it (by its colour, inside a circle round it) and sets it in
      dog-run-2's open mouth, at the same place relative to his nose: dog-run-ball-2;
   3. exports both, at the run sprites' widths, to public/home/nav/ as AVIF + WebP, plus the
      two PNGs there for reference.

   Run: node scripts/export-nav-dog.mjs */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const kit = path.join(root, 'public', 'header-kit')
const out = path.join(root, 'public', 'home', 'nav')
fs.mkdirSync(out, { recursive: true })

const rgba = async (input) => {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  return { data, w: info.width, h: info.height }
}
// the painted ball is a saturated orange with almost no blue; his fur, however orange, keeps some
const isBall = (r, g, b) => r > 150 && r - g > 100 && b < 30
// the tip of his nose: the leftmost opaque pixel in the head's rows (he faces left), ball excluded
const nose = ({ data, w, h }, rows) => {
  let best = { x: w, y: 0 }
  for (let y = 0; y < Math.min(h, rows); y++)
    for (let x = 0; x < best.x; x++) {
      const i = (y * w + x) * 4
      if (data[i + 3] > 128 && !isBall(data[i], data[i + 1], data[i + 2])) {
        best = { x, y }
        break
      }
    }
  return best
}

// 1 · the ball dog, cropped (the stray dog starts below row 690), trimmed and fitted to run-1
const run1 = path.join(kit, 'dog-run-1.png')
const run2 = path.join(kit, 'dog-run-2.png')
const r1 = await sharp(run1).metadata()
const r1Trim = await sharp(run1).trim().toBuffer({ resolveWithObject: true })
const band = await sharp(path.join(kit, 'Dog-run-ball.png')).extract({ left: 0, top: 0, width: 1774, height: 690 }).png().toBuffer()
const dog = await sharp(band).trim().png().toBuffer()
const fitted = await sharp(dog).resize({ width: r1Trim.info.width, kernel: 'lanczos3' }).png().toBuffer()
const fm = await sharp(fitted).metadata()
// on run-1's canvas, bottom-aligned like run-1's own content
const ball1 = await sharp({ create: { width: r1.width, height: r1.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: fitted, left: 0, top: r1.height - fm.height }])
  .png()
  .toBuffer()

// 2 · find the nose and the ball in frame 1, then the nose in run-2. The ball is looked for only
// in a window round his mouth, and measured by its pixels' centre and count, so a few orange
// specks of fur elsewhere can't skew it.
const f1 = await rgba(ball1)
const n1 = nose(f1, f1.h * 0.5)
let sx = 0, sy = 0, count = 0
for (let y = Math.max(0, n1.y - 30); y < Math.min(f1.h, n1.y + 130); y++)
  for (let x = n1.x; x < Math.min(f1.w, n1.x + 160); x++) {
    const i = (y * f1.w + x) * 4
    if (f1.data[i + 3] > 128 && isBall(f1.data[i], f1.data[i + 1], f1.data[i + 2])) {
      sx += x
      sy += y
      count++
    }
  }
// The colour test finds the ball's middle but misses its light highlight, so the radius is
// measured from the middle outwards (left, up-left, down-left) to the first transparent pixel.
// Up-left runs into his face, so the disc comes out larger than the ball and takes in the lips
// round it, which is what makes it sit in run-2's open mouth rather than look pasted on.
const cx = sx / count
const cy = sy / count
const reach = (dx, dy) => {
  let d = 0
  for (;;) {
    const x = Math.round(cx + dx * (d + 1))
    const y = Math.round(cy + dy * (d + 1))
    if (x < 0 || y < 0 || f1.data[(y * f1.w + x) * 4 + 3] < 128) return d
    d++
  }
}
const ball = { cx, cy, r: Math.max(reach(-1, 0), reach(-0.71, -0.71), reach(-0.71, 0.71)) }
const f2 = await rgba(run2)
const n2 = nose(f2, f2.h * 0.5)

// the ball's own pixels: ball-coloured, inside a circle a little larger than it
const pad = Math.ceil(ball.r) + 3
const size = pad * 2
const cut = Buffer.alloc(size * size * 4)
for (let y = 0; y < size; y++)
  for (let x = 0; x < size; x++) {
    const sx = Math.round(ball.cx - pad + x)
    const sy = Math.round(ball.cy - pad + y)
    if (sx < 0 || sy < 0 || sx >= f1.w || sy >= f1.h) continue
    const i = (sy * f1.w + sx) * 4
    const d = Math.hypot(x - pad, y - pad)
    const [r, g, b, a] = [f1.data[i], f1.data[i + 1], f1.data[i + 2], f1.data[i + 3]]
    if (d <= ball.r + 1.5 && a > 0 && (isBall(r, g, b) || d < ball.r * 0.8)) {
      const o = (y * size + x) * 4
      cut[o] = r
      cut[o + 1] = g
      cut[o + 2] = b
      cut[o + 3] = a
    }
  }
const ballPng = await sharp(cut, { raw: { width: size, height: size, channels: 4 } }).png().toBuffer()
const left = Math.round(n2.x + (ball.cx - n1.x) - pad)
const top = Math.round(n2.y + (ball.cy - n1.y) - pad)
const r2 = await sharp(run2).metadata()
const ball2 = await sharp(run2)
  // kept on the canvas: at the left edge this nudges it a little further into his mouth
  .composite([{ input: ballPng, left: Math.max(0, left), top: Math.max(0, top) }])
  .png()
  .toBuffer()
console.log(`ball r=${ball.r.toFixed(1)} at (${ball.cx}, ${ball.cy}); nose 1 (${n1.x}, ${n1.y}), nose 2 (${n2.x}, ${n2.y}); placed at (${left}, ${top}) on ${r2.width}x${r2.height}`)

// 4 · the turn round, with the ball: three-quarter (facing left as drawn; mirrored for right)
// and head-on. Drawn on other canvases and
// at another size, so they are trimmed and scaled by the ball, the one thing the same size in
// every frame: its painted core is found by colour and matched to carry1's on screen.
const ballCore = async (input) => {
  const { data, w, h } = await rgba(input)
  let n = 0
  for (let i = 0; i < w * h * 4; i += 4) if (data[i + 3] > 128 && isBall(data[i], data[i + 1], data[i + 2])) n++
  return 2 * Math.sqrt(n / Math.PI)
}
const CARRY1_PX = (198 * 34) / 96 / r1.width // on-screen px per source px of carry1 (NavDog's RUN_K)
const ballOnScreen = (await ballCore(ball1)) * CARRY1_PX
const turns = []
for (const [name, file] of [
  ['dog-turn-34-ball', 'dog-turn-34-ball.png'],
  ['dog-turn-front-ball', 'dog-turn-front-ball.png'],
]) {
  const buf = await sharp(path.join(kit, file)).trim().png().toBuffer()
  const m = await sharp(buf).metadata()
  const k = ballOnScreen / (await ballCore(buf))
  const w = Math.round(m.width * k)
  const h = Math.round(m.height * k)
  // exported at about 2.8x the on-screen width, like the run sprites
  const file1 = Math.round(w * 2.8)
  turns.push([name, buf, [file1, file1 * 2]])
  console.log(`${name}: on screen ${w}x${h}px (file ${file1}px wide)`)
}

// 3 · export at the run sprites' widths (dog-run-1 is shown from its 198/396 files, run-2 from
// 185/370), and the turn frames at theirs
for (const [name, buf, widths] of [
  ['dog-run-ball-1', ball1, [198, 396]],
  ['dog-run-ball-2', ball2, [185, 370]],
  ...turns,
]) {
  await sharp(buf).toFile(path.join(out, `${name}.png`))
  for (const w of widths) {
    const base = sharp(buf).resize({ width: w, kernel: 'lanczos3' })
    for (const [fmt, q] of [
      ['avif', { quality: 58, effort: 6 }],
      ['webp', { quality: 82, alphaQuality: 90, effort: 6 }],
    ]) {
      const dest = path.join(out, `${name}-${w}.${fmt}`)
      await base.clone()[fmt](q).toFile(dest)
      console.log(`${path.basename(dest).padEnd(26)} ${(fs.statSync(dest).size / 1024).toFixed(1).padStart(7)} KB`)
    }
  }
}
