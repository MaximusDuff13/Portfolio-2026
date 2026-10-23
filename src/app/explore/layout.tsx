// TEMPORARY — /explore harness: five home page header + tabs directions to compare.
// Nothing here is linked from the live site. Delete the whole folder (and public/explore/,
// scripts/export-hero-loop.mjs) once a direction is chosen and promoted.
import type { Metadata } from 'next'
import './explore.css'

export const metadata: Metadata = {
  title: 'Explore · Home page directions',
  robots: { index: false, follow: false },
}

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children
}
