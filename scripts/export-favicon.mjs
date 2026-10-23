/* The site's icons, from Michael's coloured-pencil portrait (public/images/Fav-icon/Myself.jpg,
   not modified). The drawing is taller than it is wide, so its sides are extended with the
   paper's own colour, then cut square: the whole head and the top of the shoulders, the face
   filling most of it. A plain square, no rounding or circle (after vijay.link's favicon).
   - src/app/icon.png: browser tab, 64px (at 16px the hair, glasses and beard still read);
   - src/app/apple-icon.png: home screen and bookmarks, 180px.
   Next.js picks both files up by name (app router file conventions).

   Run: node scripts/export-favicon.mjs */
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const src = path.join(root, 'public', 'images', 'Fav-icon', 'Myself.jpg')
const paper = { r: 243, g: 235, b: 214 } // sampled from the drawing's four corners
const wide = await sharp(src).extend({ left: 100, right: 100, background: paper }).toBuffer()

// the square in the widened drawing: head and the top of the shoulders
const CROP = { left: 45, top: 40, width: 640, height: 640 }

for (const [file, px] of [
  ['icon.png', 64],
  ['apple-icon.png', 180],
]) {
  await sharp(wide).extract(CROP).resize(px, px, { kernel: 'lanczos3' }).png().toFile(path.join(root, 'src', 'app', file))
  console.log(`src/app/${file} (${px}px)`)
}
