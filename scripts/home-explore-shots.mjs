/* Screenshots and checks for /dev/home-explore: each direction and the baseline at 1440 and
   390px (plus a 768px check), the lowest text contrast in the hero and the Work tab in light
   and dark, sideways overflow, and the first card with keyboard focus. Drives the Chromium
   that Playwright caches, over the DevTools protocol; installs nothing.

   Needs the dev server on :3000. Run: node scripts/home-explore-shots.mjs
   Writes dev/home-explore-screenshots/*.png and results.json. */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const out = path.join(root, 'dev', 'home-explore-screenshots')
fs.mkdirSync(out, { recursive: true })
const BASE = 'http://localhost:3000/dev/home-explore'
const PORT = 9341

const cache = path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright')
const chromeDir = fs.readdirSync(cache).filter((d) => /^chromium-\d+$/.test(d)).sort().pop()
const chrome = path.join(cache, chromeDir, 'chrome-win64', 'chrome.exe')
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hx-chrome-'))
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

async function open(url, width, scheme = 'light') {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] })
  const loaded = once('Page.loadEventFired')
  await send('Page.navigate', { url })
  await loaded
  // the resolved page, as a returning visitor sees it: the intro has played this session
  await evaluate(`Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.decode().catch(() => {}) }))`)
  await evaluate('document.fonts.ready.then(() => new Promise(r => setTimeout(r, 1800)))')
}

// text contrast from computed colours: each text element against the first opaque background
// behind it (the highlight band counts as the background of the phrase it marks)
const CONTRAST = `(() => {
  const rgb = (s) => (s.match(/[\\d.]+/g) || []).map(Number)
  const lum = ([r, g, b]) => { const c = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }; return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b) }
  const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  const bgOf = (el) => {
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n)
      if (n.classList.contains('hx-key-highlight')) {
        // the band's colour, resolved for the current theme
        const t = document.createElement('span')
        t.style.backgroundColor = 'var(--x-accent-subtle)'
        n.appendChild(t)
        const band = getComputedStyle(t).backgroundColor
        t.remove()
        return band
      }
      const c = rgb(cs.backgroundColor)
      if (c.length >= 3 && (c[3] === undefined || c[3] > 0.95)) return cs.backgroundColor
    }
    return getComputedStyle(document.body).backgroundColor
  }
  const hex = (h) => { h = h.trim().replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) }
  const rows = []
  for (const el of document.querySelectorAll('.a-hero *, .pn-work *')) {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    if (!own) continue
    const r = el.getBoundingClientRect()
    if (!r.width || getComputedStyle(el).visibility === 'hidden' || el.closest('[aria-hidden="true"]')) continue
    let bg = bgOf(el)
    bg = bg.trim().startsWith('#') ? hex(bg) : rgb(bg)
    const fg = rgb(getComputedStyle(el).color)
    rows.push({ text: el.textContent.trim().slice(0, 40), cls: el.className && String(el.className).slice(0, 40), ratio: Math.round(ratio(lum(fg), lum(bg)) * 100) / 100 })
  }
  rows.sort((a, b) => a.ratio - b.ratio)
  return rows.slice(0, 3)
})()`

const CASES = ['base', 'a', 'b', 'c']
const url = (v) => (v === 'base' ? BASE : `${BASE}?v=${v}`)
const results = {}
await open(url('base'), 1440)
await evaluate(`sessionStorage.setItem('home-intro-seen', '1')`)

for (const v of CASES) {
  const r = (results[v] = {})
  for (const width of [1440, 768, 390]) {
    await open(url(v), width)
    // the preview switcher is fixed to the viewport, so a full-page shot would strand it mid-page
    await evaluate(`document.querySelector('.hx-switch').style.display = 'none'`)
    const height = await evaluate('document.documentElement.scrollHeight')
    r[width] = {
      overflow: await evaluate('document.documentElement.scrollWidth - innerWidth'),
      light: await evaluate(CONTRAST),
    }
    if (width !== 768) {
      const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 } })
      fs.writeFileSync(path.join(out, `${v}-${width}.png`), Buffer.from(shot.data, 'base64'))
    }
    await open(url(v), width, 'dark')
    r[width].dark = await evaluate(CONTRAST)
  }
  // the first card under keyboard focus, 1440
  if (v !== 'base') {
    await open(url(v), 1440)
    // reach the card the way a keyboard user does: focus what comes before it, then press Tab
    // (a scripted focus() alone doesn't count as keyboard focus, so :focus-visible wouldn't match)
    await evaluate(`(() => {
      const link = document.querySelector('.pn-work .hx-link')
      const all = [...document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')].filter((e) => e.offsetParent || e === link)
      const prev = all[all.indexOf(link) - 1]
      prev.focus()
    })()`)
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await sleep(500)
    const rect = await evaluate(`(() => { const l = document.activeElement; const c = l.closest('.hx-card'); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.left - 16, y: r.top + scrollY - 16, w: r.width + 32, h: r.height + 32 } })()`)
    if (!rect) throw new Error('Tab did not land on a card')
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: rect.x, y: rect.y, width: rect.w, height: rect.h, scale: 1 } })
    fs.writeFileSync(path.join(out, `${v}-1440-card-focus.png`), Buffer.from(shot.data, 'base64'))
  }
  console.log('done', v)
}

fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2))
ws.close()
proc.kill()
