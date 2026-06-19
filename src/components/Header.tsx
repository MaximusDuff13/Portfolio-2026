'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-body border-b border-border">
      <div className="flex items-center justify-between px-section h-14">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-nav-tab font-grotesk text-foundation-900 hover:text-foundation-600 transition-colors no-underline"
        >
          Michael Jerome
        </Link>

        {/* Nav */}
        <nav>
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'text-nav-tab font-grotesk transition-colors no-underline',
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
