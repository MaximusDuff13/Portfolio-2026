/* The site's icons, from Michael's coloured-pencil portrait (public/images/Fav-icon/Myself.jpg,
   not modified). The drawing is taller than it is wide, so its sides are extended with the
   paper's own colour, then cut square round the head and set in a circle:
   - src/app/icon.png (browser tab, 64px): a tight crop, the face filling the circle, because at
     16px only the hair, glasses and beard survive;
   - src/app/apple-icon.png (home screen and bookmarks, 180px): the whole head, with room round
     it. iOS draws this one on its own rounded square, so it is not cut to a circle.
   Next.js picks both files up by name (app router file conventions).

   Run: node scripts/export-favicon.mjs */
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const src = path.join(root, 'public', 'images', 'Fav-icon', 'Myself.jpg')
const paper = { r: 243, g: 235, b: 214 } // sampled from the drawing's four corners
const wide = await sharp(src).extend({ left: 100, right: 100, background: paper }).toBuffer()

// squares in the widened drawing: [left, top, size]
const TIGHT = [105, 95, 520] // hairline to chin, glasses near the middle
const HEAD = [35, 50, 660] // the whole head, hair to beard

const disc = (s) => Buffer.from(`<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}"/></svg>`)
const cut = ([left, top, size], px) => sharp(wide).extract({ left, top, width: size, height: size }).resize(px, px, { kernel: 'lanczos3' })

await cut(TIGHT, 64)
  .composite([{ input: disc(64), blend: 'dest-in' }])
  .png()
  .toFile(path.join(root, 'src', 'app', 'icon.png'))
await cut(HEAD, 180).png().toFile(path.join(root, 'src', 'app', 'apple-icon.png'))
console.log('src/app/icon.png (64px, tight, round) · src/app/apple-icon.png (180px, whole head)')
