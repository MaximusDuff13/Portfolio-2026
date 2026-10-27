/* Facts the explorations show that the live home page doesn't. Every one is taken from the site
   (the case study pages or src/data/home.ts), never invented; anything not yet known is a TODO. */

import { person as profile } from '@/data/home'
import { todo, type Todo } from '@/app/_home/content'

/** "Open to full-time", from src/data/home.ts */
export const availability = profile.status

/** the hero's own figures (its supporting paragraph), plus one still to be supplied */
export const stats: { value: string | Todo; label: string }[] = [
  { value: '7 yrs', label: 'analysis and design' },
  { value: '5 yrs', label: 'in UX' },
  { value: todo('N'), label: 'products shipped' },
]

/** one result per case study, worded as on its case study page */
export const outcomes: Record<string, { figure: string; label: string; short: string }> = {
  // /work/acentra-health, Results: "5 · Product teams adopting" (that page is still a draft)
  acentra: { figure: '5', label: 'product teams adopted it in month one', short: '5 teams adopted it' },
  // /work/data-conversion-app, Impact: "1 week · Mapping & transformation, down from 4 to 6 weeks"
  dca: { figure: '1 week', label: 'for data mapping, down from 4 to 6 weeks', short: '4–6 weeks → 1' },
}

/** each card's pale body tint, from existing tokens: accent.subtle and success.fill */
export const tints: Record<string, string> = {
  acentra: '#fef3e2',
  dca: '#f0f4ee',
}

/** the headline phrase the explorations mark; must appear in hero.trail */
export const keyPhrase = 'complex products simple to use'
