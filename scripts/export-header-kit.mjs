/* Exports the header scene's web assets: AVIF + WebP for every PNG in public/header-kit,
   at 1x and 2x of its display width at a 1440px-wide viewport. The PNGs stay as sources.

   Display widths come from header-sequence.json (box width % x 1440), so the sizes always
   follow the spec. Scene and final-still are 1440 / 2880; they read from the Real-ESRGAN
   masters in assets/header-kit (2x, 3344px) when present, else the 1672px originals.

   Also writes src/data/headerKitAssets.json (widths per sprite + a tiny blurred scene
   placeholder) for HeaderScene to read.

   Run: node scripts/export-header-kit.mjs            (upscaled masters when present)
        node scripts/export-header-kit.mjs --original (ignore the masters) */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const kit = path.join(root, 'public', 'header-kit')
const out = path.join(kit, 'web')
const masters = path.join(root, 'assets', 'header-kit')
const useOriginal = process.argv.includes('--original')

const VIEWPORT = 1440
const spec = JSON.parse(fs.readFileSync(path.join(kit, 'header-sequence.json'), 'utf8'))

// Display width at 1440, per sprite: the widest box it's ever drawn in
const boxWidth = {
  'person-seated-head': spec.person.seated.width,
  'person-seated-body': spec.person.seated.width,
  'person-seated': spec.person.seated.width,
  'person-reach': spec.person.reach.width,
}
for (const step of spec.steps) {
  if (!step.dog) continue
  boxWidth[step.dog.sprite] = Math.max(boxWidth[step.dog.sprite] ?? 0, step.dog.width)
}

const fullWidth = new Set(['scene', 'final-still'])
const displayWidth = (name) =>
  fullWidth.has(name) ? VIEWPORT : Math.round((boxWidth[name] / 100) * VIEWPORT)

// Opaque paintings compress hard; sprites keep their soft alpha edges a little better
const settings = (opaque) =>
  opaque
    ? { avif: { quality: 50, effort: 6 }, webp: { quality: 78, effort: 6 } }
    : { avif: { quality: 58, effort: 6 }, webp: { quality: 82, alphaQuality: 90, effort: 6 } }

fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out, { recursive: true })

const manifest = { viewport: VIEWPORT, sprites: {}, lqip: '' }
const rows = []

for (const file of fs.readdirSync(kit).filter((f) => f.endsWith('.png')).sort()) {
  const name = file.replace(/\.png$/, '')
  if (!fullWidth.has(name) && boxWidth[name] == null) {
    console.warn(`skip ${file}: not in header-sequence.json`)
    continue
  }
  const master = path.join(masters, `${name}@2x.png`)
  const source = !useOriginal && fs.existsSync(master) ? master : path.join(kit, file)
  const { width: srcW } = await sharp(source).metadata()
  const w1 = displayWidth(name)
  // never enlarge: cap 2x at the source width
  const widths = [...new Set([w1, Math.min(w1 * 2, srcW)])]
  const opaque = fullWidth.has(name)
  const q = settings(opaque)

  for (const w of widths) {
    const base = sharp(source).resize({ width: w, kernel: 'lanczos3' })
    for (const fmt of ['avif', 'webp']) {
      const dest = path.join(out, `${name}-${w}.${fmt}`)
      await base.clone()[fmt](q[fmt]).toFile(dest)
      rows.push({ file: path.basename(dest), kb: fs.statSync(dest).size / 1024 })
    }
  }
  manifest.sprites[name] = { widths, source: path.relative(root, source).replaceAll('\\', '/') }
}

// 32px blurred placeholder, painted behind the scene while it loads
const lqip = await sharp(path.join(kit, 'scene.png')).resize({ width: 32 }).blur(1).webp({ quality: 50 }).toBuffer()
manifest.lqip = `data:image/webp;base64,${lqip.toString('base64')}`

fs.writeFileSync(path.join(root, 'src', 'data', 'headerKitAssets.json'), JSON.stringify(manifest, null, 2) + '\n')

for (const r of rows) console.log(`${r.file.padEnd(34)} ${r.kb.toFixed(1).padStart(8)} KB`)

// What a 2x desktop screen downloads (AVIF): scene + every sprite the sequence shows
const shown = ['scene', 'person-seated-head', 'person-seated-body', 'person-reach', ...new Set(spec.steps.filter((s) => s.dog).map((s) => s.dog.sprite))]
const total2x = shown.reduce((sum, name) => {
  const w = Math.max(...manifest.sprites[name].widths)
  return sum + fs.statSync(path.join(out, `${name}-${w}.avif`)).size / 1024
}, 0)
console.log(`\nlqip ${lqip.length} B · scene from ${manifest.sprites.scene.source}`)
console.log(`2x header total (AVIF): ${total2x.toFixed(1)} KB`)
