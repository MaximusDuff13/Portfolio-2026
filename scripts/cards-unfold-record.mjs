/* Screen recordings of /dev/cards-unfold, one pair per variant: at 1440 a mouse hovers in and
   out of each card (a drawn cursor dot stands in for the pointer, which headless Chrome doesn't
   paint), then the keyboard tabs onto each card; at 390 with touch emulated, the static unfolded
   layout. Also a still of each state. Drives the Chromium and the ffmpeg that Playwright caches,
   over the DevTools protocol; installs nothing.

   Needs the dev server on :3000. Run: node scripts/cards-unfold-record.mjs
   Writes dev/cards-unfold-recordings/{a,b,c}-desktop.webm, {a,b,c}-390.webm and stills. */
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const out = path.join(root, 'dev', 'cards-unfold-recordings')
fs.mkdirSync(out, { recursive: true })
const BASE = 'http://localhost:3000/dev/cards-unfold'
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

const report = {}
for (const v of ['a', 'b', 'c']) {
  // desktop: hover in, wander, out; across to the other card; then the keyboard
  await open(`${BASE}?v=${v}`, { width: 1440, height: 900 })
  await evaluate(`window.scrollTo(0, 0)`)
  await evaluate(CURSOR)
  const [c1, c2] = await cards()
  mouse = { x: c1.x - 120, y: c1.y + 80 }
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: mouse.x, y: mouse.y })
  await still(`${v}-1440-rest`)
  const n = await record(path.join(out, `${v}-desktop.webm`), async () => {
    await sleep(500)
    await glide(c1.x + c1.w * 0.5, c1.y + c1.h * 0.3, 500)
    await sleep(900)
    await still(`${v}-1440-hover`)
    await glide(c1.x + c1.w * 0.75, c1.y + c1.h * 0.6, 600)
    await glide(c1.x + c1.w * 0.3, c1.y + c1.h * 0.75, 600)
    await sleep(400)
    await glide(c1.x - 140, c1.y + c1.h * 0.5, 400)
    await sleep(900)
    await glide(c2.x + c2.w * 0.5, c2.y + c2.h * 0.35, 600)
    await sleep(1000)
    await glide(c2.x + c2.w + 120, c2.y + c2.h * 0.5, 400)
    await sleep(900)
    // keyboard: start from the variant switcher's frame toggle, Tab onto each card
    await evaluate(`document.querySelector('.uf-frame-toggle').focus()`)
    await tab()
    await sleep(1300)
    await still(`${v}-1440-focus`)
    await tab()
    await sleep(1300)
    await tab(true)
    await tab(true)
    await sleep(900)
  })
  // 390, touch: the unfolded layout, still, scrolled through
  await open(`${BASE}?v=${v}`, { width: 390, height: 844, touch: true })
  const hoverNone = await evaluate(`matchMedia('(hover: none)').matches`)
  await still(`${v}-390`)
  const m = await record(path.join(out, `${v}-390.webm`), async () => {
    await sleep(800)
    for (let y = 0; y <= 900; y += 30) {
      await evaluate(`window.scrollTo(0, ${y})`)
      await sleep(33)
    }
    await sleep(800)
  })
  report[v] = { desktopFrames: n, phoneFrames: m, hoverNone }
  console.log(v, report[v])
}

fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(report, null, 2))
ws.close()
proc.kill()
