'use client'
/* The site footer (Nov 23 2026), on every page: home and both case studies.
   One left-aligned column (Michael's brief, Nov 23 2026): a quote he tries to live by, his email
   with a Copy button, LinkedIn and Résumé, then a bottom bar with © and Back to top.
   Tailwind tokens only (tailwind.config.js), no new colours, sizes or spacing.
   The home page follows the visitor into dark mode; the case studies are light only. So the dark
   variants are applied only when `adaptive` is set (home), else the case studies would turn their
   footer light-on-light in a dark OS theme. */
import { useEffect, useRef, useState } from 'react'
import { links } from '@/data/links'
import { person } from '@/app/_home/content'

// TODO: public/resume.pdf doesn't exist yet. Add it, or this link opens a 404.
const RESUME = '/resume.pdf'

export function SiteFooter({ wait = false, adaptive = false, credit = false }: { wait?: boolean; adaptive?: boolean; credit?: boolean }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>()
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // the select-and-copy fallback, for browsers without the Clipboard API or without permission
  const copyByHand = () => {
    const t = document.createElement('textarea')
    t.value = links.email
    t.setAttribute('readonly', '')
    t.style.position = 'absolute'
    t.style.left = '-9999px'
    document.body.appendChild(t)
    t.select()
    document.execCommand('copy')
    t.remove()
  }

  const copy = async () => {
    // the Clipboard API can sit on a permission check; give it 600ms, then copy by hand
    const api = navigator.clipboard?.writeText(links.email).then(() => true, () => false) ?? Promise.resolve(false)
    const done = await Promise.race([api, new Promise<boolean>((r) => window.setTimeout(() => r(false), 600))])
    if (!done) copyByHand()
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  // colour classes, with dark variants only where the page itself goes dark (home)
  const ink = adaptive ? 'text-foundation-900 dark:text-foundation-100' : 'text-foundation-900'
  const body = adaptive ? 'text-foundation-600 dark:text-foundation-400' : 'text-foundation-600'
  const quiet = adaptive ? 'text-foundation-500 dark:text-foundation-400' : 'text-foundation-500'
  const rule = adaptive ? 'border-border dark:border-foundation-700' : 'border-border'
  const primary = adaptive
    ? 'border-foundation-900 bg-foundation-900 text-foundation-100 hover:bg-foundation-800 dark:border-foundation-100 dark:bg-foundation-100 dark:text-foundation-900 dark:hover:bg-foundation-200'
    : 'border-foundation-900 bg-foundation-900 text-foundation-100 hover:bg-foundation-800'
  const secondary = adaptive
    ? 'border-btn-border text-foundation-900 hover:bg-foundation-100 dark:border-foundation-600 dark:text-foundation-100 dark:hover:bg-foundation-700'
    : 'border-btn-border text-foundation-900 hover:bg-foundation-100'
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2'
  const pill = `inline-flex items-center gap-2 rounded-full border px-5 py-3.5 font-sans text-nav-tab no-underline transition-colors ${focus}`

  return (
    <footer
      aria-label="Site footer"
      className={`transition-opacity duration-300 ${wait ? 'invisible opacity-0' : 'opacity-100'}`}
    >
      <div className="px-6 sm:px-10 lg:px-section">
        <div className="mx-auto max-w-6xl">
          <div className={`border-0 border-t border-solid pt-14 lg:pt-16 ${rule}`}>
            {/* the quote on the left (~60%), why it matters to Michael on the right (~40%), bottoms aligned */}
            <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <div>
                <p className={`m-0 mb-4 font-sans text-label uppercase ${quiet}`}>What I try to live by</p>
                <blockquote className="m-0">
                  <p className={`m-0 font-display text-heading-xl text-balance ${ink}`}>
                    Here lived a great street sweeper who did his job well.
                  </p>
                  <footer className={`mt-3 font-sans text-caption ${quiet}`}>
                    <cite className="not-italic">Martin Luther King Jr., 1967</cite>
                  </footer>
                </blockquote>
              </div>
              <p className={`m-0 max-w-[40ch] border-0 border-t border-solid pt-4 font-sans text-body-sm ${rule} ${body}`}>
                Dr. King told a room of students that any job, even sweeping streets, deserves the care Michelangelo gave a painting. It’s how I try to show up in everything I do.
              </p>
            </div>

            {/* the email, with a Copy button */}
            <div className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={links.mailto}
                className={`font-sans text-heading-m underline decoration-accent-warm underline-offset-4 [overflow-wrap:anywhere] ${ink} ${focus} rounded-sm`}
              >
                {/* on narrow screens it breaks after the @, not mid-word */}
                {links.email.split("@")[0]}@<wbr />
                {links.email.split("@")[1]}
              </a>
              <button
                type="button"
                onClick={copy}
                aria-live="polite"
                className={`rounded-full border px-3 py-1.5 font-sans text-caption transition-colors ${secondary} ${focus}`}
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            {/* LinkedIn and Résumé */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={`${pill} ${primary}`}>
                LinkedIn <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className={`${pill} ${secondary}`}>
                Résumé <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          {/* the bottom bar */}
          <div className={`mt-16 flex flex-col gap-2 border-0 border-t border-solid py-6 font-sans text-caption sm:flex-row sm:justify-between ${rule} ${quiet}`}>
            <span>
              © {new Date().getFullYear()} {person.name}
            </span>
            <span>
              {credit && <>Hero painting made with AI, art-directed by me · </>}
              <button
                type="button"
                onClick={toTop}
                className={`inline rounded-sm border-0 bg-transparent p-0 font-sans text-caption underline-offset-4 hover:underline ${quiet} ${focus}`}
              >
                Back to top <span aria-hidden="true">↑</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
