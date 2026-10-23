'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { links, navLinks } from '@/data/links'

const focusRing =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-body border-b border-border">
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-section h-14">
        {/* Wordmark */}
        <Link
          href={links.home}
          className={`text-nav-tab font-grotesk text-foundation-900 hover:text-foundation-600 transition-colors no-underline ${focusRing}`}
        >
          Michael Jerome
        </Link>

        {/* Nav */}
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 sm:gap-8 list-none m-0 p-0">
            {navLinks.map(({ label, href }) => {
              // Work stays active across the case study pages
              const isActive = href === links.work && (pathname === '/' || pathname.startsWith('/work'))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'text-nav-tab font-grotesk transition-colors no-underline',
                      focusRing,
                      isActive
                        ? 'text-foundation-900'
                        : 'text-foundation-500 hover:text-foundation-900',
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
