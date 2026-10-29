import type { Metadata } from 'next'
import { Fraunces, Instrument_Sans, Caveat } from 'next/font/google'
import { Header } from '@/components/Header'
import { PageTransitions } from '@/components/PageTransitions'
import './globals.css'

// Display face: headings, titles, stats and the italic accent line of a case study hero.
// Picked Oct 29 2026 from four pairings on the real pages (Fraunces + Instrument Sans,
// Newsreader + Schibsted, Bricolage + Hanken, Instrument Serif + Onest).
//
// `axes` matters here. next/font ships only the wght axis for a variable font by default,
// which would pin Fraunces to opsz 14 — a text optical size — at every rendered size, and
// that reads loose and soft at headline sizes. Requesting opsz lets the browser's default
// `font-optical-sizing: auto` track the actual size. WONK is requested so .accent-italic
// can pin it off. SOFT is not requested: its default (0) is the firm setting we want.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'WONK'],
  variable: '--font-display',
  display: 'swap',
})

// Body face: running text, and every label, tab, button and link. The italic is loaded
// for SectionHeader's narrative quote, which would otherwise be a synthesized slant.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

// Handwriting: the Data Conversion App info notes and the home hero's margin note.
// Caveat stays legible at small sizes, unlike thinner script faces.
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-hand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Michael Jerome — Senior UX Designer',
  description: 'Portfolio of Michael Jerome, Senior UX Designer specialising in UX Design and Design Systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${caveat.variable}`}
    >
      <body>
        <Header />
        <PageTransitions />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  )
}
