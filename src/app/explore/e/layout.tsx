// TEMPORARY — /explore/e fonts. Loaded here only, so the live site's font budget is untouched.
import { Big_Shoulders_Display, Hanken_Grotesk, Martian_Mono } from 'next/font/google'

const display = Big_Shoulders_Display({ subsets: ['latin'], weight: ['600', '800'], variable: '--font-e-display', display: 'swap' })
const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-e-body', display: 'swap' })
const mono = Martian_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-e-mono', display: 'swap' })

export default function SheetLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</div>
}
