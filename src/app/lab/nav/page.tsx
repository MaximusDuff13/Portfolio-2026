import type { Metadata } from 'next'
import { NavLab } from './NavLab'
import './nav-lab.css'

/* LAB — three nav directions side by side, each as the home page's docked tab bar and as the
   case study header: 1 The dog leads, 2 Window ledge, 3 Watercolour postmark. Not linked
   from the site; noindex. Delete once a direction ships. */

export const metadata: Metadata = {
  title: 'Lab · Nav directions',
  robots: { index: false, follow: false },
}

export default function NavLabPage() {
  return <NavLab />
}
