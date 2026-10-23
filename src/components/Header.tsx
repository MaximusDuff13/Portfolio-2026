'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type MouseEvent } from 'react'
import { links } from '@/data/links'
import { DogLogo, NavDog, RUN_HALF, useDogEnabled, useNavDog } from './NavDog'

/* The site header on every page but home (the home page hides it: its docked tab row is the
   nav there). Just the logo, Michael and his dog cut from the home painting, and the dog
   himself: arriving on a page he hops out of the logo and sits beside it (the logo now shows
   Michael alone); pointing at the logo turns his head; clicking it sends him running back in,
   the logo cuts to the two of them, and the page goes home. On phones he stays in the logo. */

const LOGO = 44
const SIT_X = LOGO + 8 // where he sits, just right of the logo
const IN_X = LOGO / 2 - RUN_HALF // his middle at the logo's centre, behind it

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const dog = useNavDog()
  const dogOn = useDogEnabled()
  const [inLogo, setInLogo] = useState(true)
  const { place, runTo, hide, look, reduced } = dog

  // on every page (the header outlives navigation): out of the logo and over to his spot
  useEffect(() => {
    if (pathname === links.home) return
    if (!dogOn) {
      hide()
      setInLogo(true)
      return
    }
    setInLogo(false)
    if (reduced) {
      place(SIT_X)
      return
    }
    place(IN_X, 'run1')
    const t = window.setTimeout(() => runTo(SIT_X), 120)
    return () => window.clearTimeout(t)
  }, [pathname, dogOn, reduced, place, runTo, hide])

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    // new tab, new window and the like keep the browser's own behaviour
    if (!dogOn || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    runTo(
      IN_X,
      () => {
        hide()
        setInLogo(true)
        window.setTimeout(() => router.push(links.home), reduced ? 0 : 220)
      },
      'run',
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-body border-b border-border">
      <div className="flex items-center px-6 sm:px-10 lg:px-section h-16">
        <div className="relative self-stretch flex items-center w-20">
          <Link
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
          <NavDog x={dog.x} pose={dog.pose} facing={dog.facing} ms={dog.ms} shown={dog.shown} />
        </div>
      </div>
    </header>
  )
}
