// TEMPORARY — /explore/b fonts. Loaded here only, so the live site's font budget is untouched.
import { Red_Hat_Mono, Rethink_Sans } from 'next/font/google'

const ui = Rethink_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-b-ui', display: 'swap' })
const mono = Red_Hat_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-b-mono', display: 'swap' })

export default function CanvasLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${ui.variable} ${mono.variable}`}>{children}</div>
}
