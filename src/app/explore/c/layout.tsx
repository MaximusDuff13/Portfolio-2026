// TEMPORARY — /explore/c fonts. Loaded here only, so the live site's font budget is untouched.
import { Bricolage_Grotesque, Kalam } from 'next/font/google'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-c-display',
  display: 'swap',
})
const marker = Kalam({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-c-marker', display: 'swap' })

export default function WallLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${marker.variable}`}>{children}</div>
}
