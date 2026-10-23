'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { links, navLinks } from '@/data/links'

const focusRing =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body'

/* The site header on every page but home (the home page hides it: its docked tab row is the
   nav there). Same language as that docked bar: the round icon of Michael and the dog, cut from
   the home painting, leads home; the links open the matching home tabs, and the current
   section carries the same 2px accent underline as the active tab. */
export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-body border-b border-border">
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-section h-14">
        {/* Home: icon + name */}
        <Link
          href={links.home}
          className={`group flex items-center gap-3 text-nav-tab font-grotesk text-foundation-900 no-underline ${focusRing}`}
        >
          <picture className="block w-9 h-9 shrink-0 overflow-hidden rounded-full border border-border bg-foundation-100 group-hover:border-accent-warm transition-colors">
            <source type="image/avif" srcSet="/home/loop/icon-96.avif" />
            <img src="/home/loop/icon-96.webp" alt="" width={36} height={36} className="block w-full h-full" />
          </picture>
          Michael Jerome
        </Link>

        {/* Nav */}
        <nav aria-label="Main" className="self-stretch">
          <ul className="flex h-full items-stretch gap-6 sm:gap-8 list-none m-0 p-0">
            {navLinks.map(({ label, href }) => {
              // Work stays active across the case study pages
              const isActive = href === links.work && pathname.startsWith('/work')
              return (
                <li key={href} className="flex">
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'relative flex items-center text-nav-tab font-grotesk transition-colors no-underline',
                      focusRing,
                      isActive
                        ? 'text-foundation-900 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-accent-warm'
                        : 'text-foundation-600 hover:text-foundation-900',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
