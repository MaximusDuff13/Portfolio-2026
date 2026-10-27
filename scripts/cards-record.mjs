/* Variant E, story motion, on /dev/cards: each case study with its own preset (Acentra
   deconstruct, Data Conversion drawer), and the motion gallery of all six. 1. Both cards at 1440:
   slow hover in and out, a quick pass straight across, an in-and-out before the motion finishes,
   then the keyboard. 2. The 390 frame with touch emulated. 3. The gallery, each preset hovered in
   and out. 4. Geometry once open: the cover inside its stage, the share of it under each part or
   panel, the redlines drawn. 5. Reduced motion: which presets show their end state, still.
   A drawn cursor dot stands in for the pointer, which headless Chrome doesn't paint. Drives the
   Chromium and the ffmpeg that Playwright caches, over the DevTools protocol; installs nothing.

   Needs the dev server on :3000. Run: node scripts/cards-record.mjs [--stills]
   Writes dev/cards-motion/: cards-desktop.webm, cards-390.webm, gallery.webm, stills,
   results.json. --stills skips the recordings. */
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const out = path.join(root, 'dev', 'cards-motion')
fs.mkdirSync(out, { recursive: true })
const BASE = 'http://localhost:3000/dev/cards'
const PORT = 9343

const cache = path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright')
const latest = (re) => fs.readdirSync(cache).filter((d) => re.test(d)).sort().pop()
const chrome = path.join(cache, latest(/^chromium-\d+$/), 'chrome-win64', 'chrome.exe')
const ffmpeg = path.join(cache, latest(/^ffmpeg-\d+$/), 'ffmpeg-win64.exe')
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'uf-chrome-'))
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200)
  target = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json()).catch(() => null)
}
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let seq = 0
const pending = new Map()
const listeners = new Set()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id)
    pending.delete(m.id)
    m.error ? reject(new Error(m.error.message)) : resolve(m.result)
  } else listeners.forEach((l) => l(m))
}
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify({ id, method, params }))
  })
const once = (method) => new Promise((r) => { const l = (m) => m.method === method && (listeners.delete(l), r(m.params)); listeners.add(l) })
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value
await send('Page.enable')
await send('Runtime.enable')

async function open(url, { width, height, touch }) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: !!touch })
  await send('Emulation.setTouchEmulationEnabled', touch ? { enabled: true, maxTouchPoints: 1 } : { enabled: false })
  await send('Emulation.setEmitTouchEventsForMouse', { enabled: !!touch, configuration: 'mobile' })
  const loaded = once('Page.loadEventFired')
  await send('Page.navigate', { url })
  await loaded
  await evaluate(`Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.decode().catch(() => {}) }))`)
  await evaluate('document.fonts.ready.then(() => new Promise(r => setTimeout(r, 900)))')
}

/** record whatever `act` does into a webm, from the screencast's own frame timestamps */
async function record(file, act) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uf-frames-'))
  const frames = []
  const onFrame = (m) => {
    if (m.method !== 'Page.screencastFrame') return
    const f = path.join(dir, `${String(frames.length).padStart(5, '0')}.jpg`)
    fs.writeFileSync(f, Buffer.from(m.params.data, 'base64'))
    frames.push({ f, t: m.params.metadata.timestamp })
    send('Page.screencastFrameAck', { sessionId: m.params.sessionId })
  }
  listeners.add(onFrame)
  await send('Page.startScreencast', { format: 'jpeg', quality: 85, everyNthFrame: 1 })
  await sleep(300)
  await act()
  await sleep(300)
  await send('Page.stopScreencast')
  listeners.delete(onFrame)
  // the screencast only sends a frame when something changes; resample to a steady 30fps (each
  // frame held until the next arrived) and pipe the JPEGs in: Playwright's ffmpeg reads only
  // image2pipe/mjpeg and writes only VP8 webm
  const FPS = 30
  const seqBufs = []
  const t0 = frames[0].t
  const end = frames.at(-1).t + 0.4
  for (let t = t0, k = 0; t <= end; t += 1 / FPS) {
    while (k + 1 < frames.length && frames[k + 1].t <= t) k++
    seqBufs.push(fs.readFileSync(frames[k].f))
  }
  const r = spawnSync(ffmpeg, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', 'pipe:0', '-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2', '-c:v', 'libvpx', '-b:v', '3M', '-auto-alt-ref', '0', file], { input: Buffer.concat(seqBufs), maxBuffer: 1 << 30, encoding: 'buffer' })
  if (r.status !== 0) throw new Error(r.stderr.toString().slice(-800))
  fs.rmSync(dir, { recursive: true, force: true })
  return frames.length
}

// a visible dot where the pointer is: recording aid only, injected here, not part of the page
const CURSOR = `(() => { const d = document.createElement('div'); d.id = 'rec-cursor'; Object.assign(d.style, { position: 'fixed', zIndex: 9999, width: '14px', height: '14px', margin: '-7px 0 0 -7px', borderRadius: '50%', background: 'rgba(28,25,23,.35)', border: '2px solid #fff', pointerEvents: 'none', left: '-50px', top: '-50px' }); document.body.appendChild(d); addEventListener('mousemove', (e) => { d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px' }) })()`

let mouse = { x: 40, y: 40 }
async function glide(x, y, ms = 450) {
  const steps = Math.max(8, Math.round(ms / 16))
  const from = { ...mouse }
  for (let s = 1; s <= steps; s++) {
    const k = s / steps
    const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2
    mouse = { x: from.x + (x - from.x) * e, y: from.y + (y - from.y) * e }
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mouse.x, y: mouse.y })
    await sleep(16)
  }
}
const tab = async (shift = false) => {
  const p = { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, modifiers: shift ? 8 : 0 }
  await send('Input.dispatchKeyEvent', { type: 'keyDown', ...p })
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...p })
}
const cards = () => evaluate(`[...document.querySelectorAll('.uf-card, .cd-case')].map(c => { const r = c.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height } })`)
const still = async (name) => {
  const s = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(out, `${name}.png`), Buffer.from(s.data, 'base64'))
}

const STILLS = process.argv.includes('--stills')
const run = (file, act) => (STILLS ? act() : record(file, act))
/** a still of an element (default the cards column) */
const shot = async (name, selector = '.uf-column') => {
  const r = await evaluate(`(() => { const r = document.querySelector('${selector}').getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height } })()`)
  const s = await send('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: 1 }, captureBeyondViewport: true })
  fs.writeFileSync(path.join(out, `${name}.png`), Buffer.from(s.data, 'base64'))
}
/** the visible viewport only, as the recording sees it */
const view = async (name) => {
  const s = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(out, `${name}.png`), Buffer.from(s.data, 'base64'))
}
const park = async () => {
  mouse = { x: 8, y: 990 }
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mouse.x, y: mouse.y })
}
/** scroll card k (0-3: C1, C2, E1, E2 side by side) near the top and return its box */
const bring = async (k) => {
  await evaluate(`(() => { const c = document.querySelectorAll('.uf-card')[${k}]; scrollTo({ top: c.getBoundingClientRect().top + scrollY - 80 }) })()`)
  await sleep(250)
  return (await cards())[k]
}
fs.mkdirSync(out, { recursive: true })
const report = {}

const NAMES = ['acentra-deconstruct', 'dca-drawer']
/** hover card k slowly in and out, then a quick pass, then in and out before it finishes */
async function hoverCard(k, name) {
  const c = await bring(k)
  const mid = { x: c.x + c.w * 0.5, y: c.y + c.h * 0.3 }
  await glide(c.x - 40, mid.y, 400)
  await sleep(300)
  await glide(mid.x, mid.y, 900) // slow in
  await sleep(name.includes('scroll') ? 2600 : 1800)
  await view(`open-${name}`)
  await glide(c.x + c.w + 30, mid.y, 900) // slow out
  await sleep(1000)
  await glide(c.x - 30, c.y + c.h * 0.2, 300) // quick pass straight across
  await glide(c.x + c.w + 30, c.y + c.h * 0.35, 250)
  await sleep(600)
  await glide(c.x + c.w * 0.3, mid.y, 200) // in and out before it finishes
  await sleep(260)
  await glide(c.x - 30, mid.y, 160)
  await sleep(900)
}

// the share of the cover's screen under each part or panel, and the cover inside its stage
const geo = `(() => [...document.querySelectorAll('.mo')].map((card) => {
  const s = card.querySelector('.uf-stage').getBoundingClientRect()
  const cv = card.querySelector('.mo-cover .uf-frame, .mo-spread:first-child .mo-phone')
  const c = cv.getBoundingClientRect()
  const over = [...card.querySelectorAll('.mo-part, .mo-drawer, .mo-inset, .mo-spread:not(:first-child)')].map((f) => {
    const a = f.getBoundingClientRect()
    const ix = Math.max(0, Math.min(a.right, c.right) - Math.max(a.left, c.left)), iy = Math.max(0, Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top))
    return { el: f.className.split(' ')[0], stageShare: +(a.width / s.width).toFixed(2), coverShare: +((ix * iy) / (c.width * c.height)).toFixed(3), inStage: a.left >= s.left - 0.5 && a.right <= s.right + 0.5 && a.top >= s.top - 0.5 && a.bottom <= s.bottom + 0.5 }
  })
  return {
    preset: card.dataset.preset,
    open: card.hasAttribute('data-open'),
    coverInside: c.left >= s.left - 0.5 && c.right <= s.right + 0.5 && c.top >= s.top - 0.5 && c.bottom <= s.bottom + 0.5,
    over,
    linesDrawn: [...card.querySelectorAll('.mo-line')].map((l) => getComputedStyle(l).strokeDashoffset),
  }
}))()`
const openAll = async (k) => {
  const c = await bring(k)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x + c.w / 2, y: c.y + c.h * 0.3 })
  await sleep(2800)
  return (await evaluate(geo))[k]
}

// 1. both cards, 1440, the 648 column: hover, quick pass, interrupted, then the keyboard
await open(`${BASE}?v=e`, { width: 1440, height: 1000 })
await evaluate(CURSOR)
await park()
await sleep(300)
await shot('rest')
await run(path.join(out, 'cards-desktop.webm'), async () => {
  for (const k of [0, 1]) await hoverCard(k, NAMES[k])
  await park()
  await evaluate('scrollTo(0, 0)')
  await sleep(500)
  await evaluate(`[...document.querySelectorAll('.uf-frame-toggle')].pop().focus()`)
  for (let k = 0; k < 2; k++) {
    await tab()
    await sleep(2000)
    await view(`focus-${NAMES[k]}`)
  }
})

// 2. 390, touch: the cover only, nothing opens
await open(`${BASE}?v=e&frame=390`, { width: 900, height: 844, touch: true })
report.hoverNone = await evaluate(`matchMedia('(hover: none)').matches`)
await shot('phone-390')
await run(path.join(out, 'cards-390.webm'), async () => {
  await sleep(800)
  for (let y = 0; y <= 900; y += 30) {
    await evaluate(`window.scrollTo(0, ${y})`)
    await sleep(33)
  }
  await sleep(800)
})
report.phoneNeverOpen = await evaluate(`![...document.querySelectorAll('.mo')].some((c) => c.hasAttribute('data-open'))`)

// 3. the gallery: every preset hovered in and out
await open(`${BASE}?v=gallery`, { width: 1440, height: 1000 })
await evaluate(CURSOR)
await park()
const presets = await evaluate(`[...document.querySelectorAll('.mo')].map((c) => c.dataset.preset)`)
await run(path.join(out, 'gallery.webm'), async () => {
  for (let k = 0; k < presets.length; k++) await hoverCard(k, `gallery-${presets[k]}`)
})

// 4. geometry, open, at 648 and 810: cards and gallery
for (const col of ['', '&col=810']) {
  for (const v of ['e', 'gallery']) {
    await open(`${BASE}?v=${v}${col}`, { width: 1440, height: 1000 })
    const n = await evaluate(`document.querySelectorAll('.mo').length`)
    const g = []
    for (let k = 0; k < n; k++) {
      await park()
      await sleep(700)
      g.push(await openAll(k))
    }
    report[`geometry ${v}${col || '&col=648'}`] = g
  }
}

// 5. reduced motion: drawer, wipe, spread, inset show their end state still; deconstruct and
//    scroll the cover only; nothing opens on hover
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
for (const v of ['e', 'gallery']) {
  await open(`${BASE}?v=${v}`, { width: 1440, height: 1000 })
  await shot(`reduced-${v}`)
  report[`reduced ${v}`] = await evaluate(`[...document.querySelectorAll('.mo')].map((c) => c.dataset.preset + ': ' + (c.hasAttribute('data-static') ? 'end state, still' : c.hasAttribute('data-open') ? 'OPEN?' : 'cover only'))`)
}
await send('Emulation.setEmulatedMedia', { features: [] })

fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 1))
ws.close()
proc.kill()
