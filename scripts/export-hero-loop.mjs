/* Exports the HeroLoop's two paintings (the empty scene and the
   final still) cropped to the loop's window, at 1x and 2x, as AVIF + WebP. The sprites are not
   re-exported: HeroLoop reads the existing ones in public/header-kit/web. Sources are the 2x
   masters in assets/header-kit when present, else the 1672px PNGs; neither is modified.

   The crop window lives in src/app/_home/kit/loopCrop.json, shared with HeroLoop, so the
   figures stay registered to the painting.

   Run: node scripts/export-hero-loop.mjs */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const crop = JSON.parse(fs.readFileSync(path.join(root, 'src/app/_home/kit/loopCrop.json'), 'utf8'))
const out = path.join(root, 'public', 'home', 'loop')
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
  // the logo, at one registration in both versions: Michael and the dog (cut from the final
  // still), and Michael alone (the empty scene with his seated pose and its shadow laid in, for
  // while the dog is out in the nav)
  const s = Math.round((crop.icon.size / 100) * region.width)
  const icon = {
    left: region.left + Math.round((crop.icon.left / 100) * region.width),
    top: region.top + Math.round((crop.icon.top / 100) * region.height),
    width: s,
    height: s,
  }
  let iconSource = null
  let iconName = null
  if (name === 'final-still') {
    iconSource = source
    iconName = `icon-${crop.icon.px}`
  } else {
    const seq = JSON.parse(fs.readFileSync(path.join(root, 'public', 'header-kit', 'header-sequence.json'), 'utf8'))
    const b = seq.person.seated
    const sh = seq.person.shadow
    const box = {
      left: Math.round((b.left / 100) * W),
      top: Math.round((b.top / 100) * H),
      width: Math.round((b.width / 100) * W),
      height: Math.round((b.height / 100) * H),
    }
    const person = await sharp(path.join(root, 'public', 'header-kit', 'person-seated.png'))
      .resize(box.width, box.height, { fit: 'fill', kernel: 'lanczos3' })
      .png()
      .toBuffer()
    // the kit's shadow spec: an ellipse, rgba(45,60,25,0.43), blur ~6px at 1672px wide
    const blur = (3 * W) / 1672
    const shadow = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><filter id="b"><feGaussianBlur stdDeviation="${blur}"/></filter>` +
        `<ellipse cx="${(sh.cx / 100) * W}" cy="${(sh.cy / 100) * H}" rx="${(sh.w / 200) * W}" ry="${(sh.h / 200) * H}" fill="rgba(45,60,25,0.43)" filter="url(#b)"/></svg>`,
    )
    iconSource = await sharp(source)
      .composite([{ input: shadow }, { input: person, left: box.left, top: box.top }])
      .png()
      .toBuffer()
    iconName = `icon-solo-${crop.icon.px}`
  }
  const iconBase = sharp(iconSource).extract(icon).resize({ width: crop.icon.px, kernel: 'lanczos3' })
  for (const fmt of ['avif', 'webp']) {
    const dest = path.join(out, `${iconName}.${fmt}`)
    await iconBase.clone()[fmt](q[fmt]).toFile(dest)
    console.log(`${path.basename(dest).padEnd(26)} ${(fs.statSync(dest).size / 1024).toFixed(1).padStart(7)} KB`)
  }
}
console.log(`\n2x paintings (AVIF): ${total2x.toFixed(1)} KB`)
