import Link from 'next/link'
import { links } from '@/data/links'

/* The site header on every page but home (the home page hides it: its docked tab row is the
   nav there). Just the logo: the round icon of Michael and the dog, cut from the home
   painting, the same one the home page's docked bar uses. It leads home. */
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-body border-b border-border">
      <div className="flex items-center px-6 sm:px-10 lg:px-section h-16">
        <Link
          href={links.home}
          aria-label="Michael Jerome, home"
          className="group block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-body"
        >
          <picture className="block w-11 h-11 shrink-0 overflow-hidden rounded-full border border-border bg-foundation-100 group-hover:border-accent-warm transition-colors">
            <source type="image/avif" srcSet="/home/loop/icon-96.avif" />
            <img src="/home/loop/icon-96.webp" alt="" width={44} height={44} className="block w-full h-full" />
          </picture>
        </Link>
      </div>
    </header>
  )
}
