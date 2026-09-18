import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Caveat, Fraunces } from 'next/font/google'
import { Header } from '@/components/Header'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

// NEW — added for the Data Conversion App info-note annotations. Caveat is a natural
// handwriting face that stays legible at small sizes (unlike thinner script faces),
// which is what a short note on a ruled card needs.
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-hand',
  display: 'swap',
})

// NEW — fourth family, the italic accent face for the last line of a case study hero
// headline. Chosen from a side-by-side comparison of five candidate faces. Italic only: the upright
// text stays Space Grotesk, so no roman cut is ever needed.
//
// `axes` matters here. next/font ships only the wght axis for a variable font by default,
// which would pin Fraunces to opsz 14 — a text optical size — at every rendered size, and
// that reads loose and soft at headline sizes. Requesting opsz lets the browser's default
// `font-optical-sizing: auto` track the actual size. WONK is requested so it can be pinned
// off in .accent-italic rather than left implicit. SOFT is deliberately NOT requested: it
// would add ~30 KB and its default (0) is already the firm setting we want.
// Cost: 41.3 KB latin woff2, against 22.3 KB without the opsz axis.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  axes: ['opsz', 'WONK'],
  variable: '--font-accent',
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable} ${fraunces.variable}`}
    >
      <body>
        <Header />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  )
}
