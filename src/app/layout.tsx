import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Caveat } from 'next/font/google'
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable}`}>
      <body>
        <Header />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  )
}
