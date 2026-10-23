/* TEMPORARY — /explore harness. Exports the HeroLoop's two paintings (the empty scene and the
   final still) cropped to the loop's window, at 1x and 2x, as AVIF + WebP. The sprites are not
   re-exported: HeroLoop reads the existing ones in public/header-kit/web. Sources are the 2x
   masters in assets/header-kit when present, else the 1672px PNGs; neither is modified.

   The crop window lives in src/app/explore/_kit/loopCrop.json, shared with HeroLoop, so the
   figures stay registered to the painting.

   Run: node scripts/export-hero-loop.mjs */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const crop = JSON.parse(fs.readFileSync(path.join(root, 'src/app/explore/_kit/loopCrop.json'), 'utf8'))
const out = path.join(root, 'public', 'explore', 'loop')
fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out, { recursive: true })

const q = { avif: { quality: 50, effort: 6 }, webp: { quality: 78, effort: 6 } }
let total2x = 0

for (const name of ['scene', 'final-still']) {
  const master = path.join(root, 'assets', 'header-kit', `${name}@2x.png`)
  const source = fs.existsSync(master) ? master : path.join(root, 'public', 'header-kit', `${name}.png`)
  const { width: W, height: H } = await sharp(source).metadata()
  const region = {
    left: Math.round((crop.left / 100) * W),
    top: Math.round((crop.top / 100) * H),
    width: Math.round((crop.width / 100) * W),
    height: Math.round((crop.height / 100) * H),
  }
  region.width = Math.min(region.width, W - region.left)
  region.height = Math.min(region.height, H - region.top)
  for (const w of crop.widths) {
    const base = sharp(source).extract(region).resize({ width: w, kernel: 'lanczos3' })
    for (const fmt of ['avif', 'webp']) {
      const dest = path.join(out, `${name}-${w}.${fmt}`)
      await base.clone()[fmt](q[fmt]).toFile(dest)
      const kb = fs.statSync(dest).size / 1024
      if (fmt === 'avif' && w === Math.max(...crop.widths)) total2x += kb
      console.log(`${path.basename(dest).padEnd(26)} ${kb.toFixed(1).padStart(7)} KB`)
    }
  }
}
console.log(`\n2x paintings (AVIF): ${total2x.toFixed(1)} KB`)
