'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { links } from '@/data/links'
import { BALL_GAP, DogLogo, NavDog, RUN_HALF, useDogEnabled, useNavDog } from './NavDog'

/* The site header on every page but home (the home page hides it: its docked tab row is the
   nav there). Just the logo, Michael and his dog cut from the home painting, and the dog
   himself: arriving on a page, Michael throws a ball out of the logo and the dog hops out
   after it (the logo now shows Michael alone): he catches it in a skid along the empty bar,
   turns, runs back and sits beside the logo with the ball at his feet; pointing at the logo
   turns his head; clicking it sends him running back in, the logo cuts to the two of them, and
   the page goes home. On phones he stays in the logo. */

const LOGO = 44
const THROW_PX = 640 // how far the ball goes along the bar, at most

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const dog = useNavDog()
  const dogOn = useDogEnabled()
  const [inLogo, setInLogo] = useState(true)
  const rowRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const { fetch, runIn, hide, look, reduced } = dog

  // his marks, in px from the row's left edge
  const marks = () => {
    const row = rowRef.current
    const logo = logoRef.current
    if (!row || !logo) return null
    const left = logo.offsetLeft
    // he sits a ball's width out from the logo: the ball drops in the gap, beside the logo
    const sit = left + LOGO + 6 + BALL_GAP
    const room = row.clientWidth - parseFloat(getComputedStyle(row).paddingRight) - 48
    return { in: left + LOGO / 2 - RUN_HALF, sit, far: Math.max(sit + 120, Math.min(room, sit + THROW_PX)) }
  }

  // on every page (the header outlives navigation): the throw, and out of the logo after it
  useEffect(() => {
    if (pathname === links.home) return
    if (!dogOn) {
      hide()
      setInLogo(true)
      return
    }
    const m = marks()
    if (!m) return
    setInLogo(false)
    // a frame later, once the logo shows Michael alone, so the dog is never in two places
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => fetch(m.in, m.sit, m.far)))
    return () => cancelAnimationFrame(raf)
    // marks() reads the DOM; it only needs re-running when the page or the breakpoint changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, dogOn, fetch, hide])

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    // new tab, new window and the like keep the browser's own behaviour
    if (!dogOn || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    const m = marks()
    const home = () => {
      hide()
      setInLogo(true)
      window.setTimeout(() => router.push(links.home), reduced ? 0 : 220)
    }
    if (!m || reduced) return home()
    runIn(m.in).then(home)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-body border-b border-border">
      <div ref={rowRef} className="relative flex items-center px-6 sm:px-10 lg:px-section h-16">
        <Link
          ref={logoRef}
          href={links.home}
          aria-label="Michael Jerome, home"
          onClick={goHome}
          onMouseEnter={() => look(true)}
          onMouseLeave={() => look(false)}
          onFocus={() => look(true)}
          onBlur={() => look(false)}
          className="group relative z-[2] block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body"
        >
          <span className="block w-11 h-11 overflow-hidden rounded-full border border-border bg-foundation-100 group-hover:border-accent-warm transition-colors">
            <DogLogo withDog={inLogo} />
          </span>
        </Link>
        <NavDog dogRef={dog.ref} ballRef={dog.ballRef} />
      </div>
    </header>
  )
}
