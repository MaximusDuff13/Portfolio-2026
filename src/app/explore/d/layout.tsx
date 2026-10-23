// TEMPORARY — /explore/d fonts. Loaded here only, so the live site's font budget is untouched.
import { Archivo, JetBrains_Mono } from 'next/font/google'

const sans = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-d-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-d-mono', display: 'swap' })

export default function GridLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${sans.variable} ${mono.variable}`}>{children}</div>
}
