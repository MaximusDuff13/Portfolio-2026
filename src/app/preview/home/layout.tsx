// TEMPORARY — /preview/home harness for the Classifieds home page direction.
// Delete this whole folder (src/app/preview/) once it is promoted to src/app/page.tsx.
//
// FONTS. Fraunces in roman as well as italic (--font-paper) is loaded here only, so the live
// site's font budget is untouched. The site already uses Fraunces italic as its accent face.
// Promote it to the root layout along with the page.
import { Fraunces } from 'next/font/google'
import './paper.css'

const paper = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'WONK'],
  variable: '--font-paper',
  display: 'swap',
})

export default function PreviewHomeLayout({ children }: { children: React.ReactNode }) {
  return <div className={paper.variable}>{children}</div>
}
