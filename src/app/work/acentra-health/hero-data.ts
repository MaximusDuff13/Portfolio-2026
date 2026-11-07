// The case study's opening content, shared by the page and its hero previews.
import type { CollagePiece } from '@/components/HeroCollage'

// The outcomes under the title; `was` is what each one replaced, shown struck through. Sources:
// 2 weeks vs 6 months (Small Wins); WCAG 2.2 AA cross-checked with JAWS and WAVE, the old green at
// 4.37:1 (the audit); 119 components and 307 tokens (Figma library analytics,
// public/images/acentra-hero/Metrics.png, Oct 2026); 19K+ insertions by 5 project teams (Results).
export const heroMetrics: { n: string; label: string; was?: string }[] = [
  { n: '2 weeks', was: '6 months', label: 'to roll a new brand palette across the system' },
  { n: '100%', was: '4.37:1, fails AA', label: 'of components pass WCAG 2.2 AA, checked with JAWS and WAVE' },
  { n: '119', label: 'components, built on 307 design tokens' },
  { n: '19K+', label: 'insertions in 30 days, by 5 project teams' },
]

// The two brands the system served. Logos cropped from public/images/logos/Kepro.png and CNSI.jpg,
// white made transparent; `width` is at the 36px display height.
export const brands = [
  { name: 'Kepro', logo: '/images/logos/marks/kepro.webp', width: 127 },
  { name: 'CNSI', logo: '/images/logos/marks/cnsi.webp', width: 149 },
]

// The project facts, under the brief
export const facts = [
  { k: 'Role', v: 'Lead designer' },
  { k: 'Team', v: 'Me and a lead developer' },
  { k: 'Focus', v: 'Tokens · Accessibility · Design ops' },
  { k: 'Timeline', v: '8 months · 2024' },
]

export const description =
  "Without a shared system, two product teams were shipping inconsistent, inaccessible UIs with zero shared vocabulary. I partnered with a lead developer to audit the existing ecosystem, identify the risks, and build Acentra Health Design System from the ground up — a scalable system that unified tokens, components, and accessibility standards across Acentra Health's product suite."

// The hero collage (replaced the 60s screen recording, Oct 29 2026): the rebuilt screen, the
// green ramp, the audit that started it, and the token flow, cut from the images used further down
// (public/images/acentra-hero, from beforeafter/After.png, Carbon/Rythmm.png, audit/Accessibility.png
// and Carbon/Discpline.png)
export const heroPieces: CollagePiece[] = [
  {
    src: '/images/acentra-hero/after',
    widths: [800, 1600],
    alt: 'A provider enrollment screen rebuilt on the Acentra Health design system, annotated with the tokens it uses: Link Primary, Border Interactive, Text Primary, Primary button',
    label: 'Rebuilt on the system',
    className: 'col-span-2 aspect-[1674/800] md:col-span-8 md:aspect-auto',
    imgClassName: 'object-left-top',
    labelAt: 'bottom-right',
  },
  {
    src: '/images/acentra-hero/ramp',
    widths: [600, 1200],
    alt: 'The Acentra green ramp: Leaf, the primary brand colour, with Green 10, 60 and 100 and the contrast each step guarantees',
    label: 'Green ramp',
    labelAt: 'top-right',
    className: 'aspect-square md:col-span-4 md:aspect-auto',
  },
  {
    src: '/images/acentra-hero/contrast',
    widths: [640, 1280],
    alt: 'The audit: the old green button on white measured 4.37 to 1, failing WCAG AA for normal text',
    label: '4.37:1 · fails AA',
    className: 'aspect-square md:col-span-4 md:aspect-auto',
    imgClassName: 'object-left',
    labelAt: 'bottom-right',
  },
  {
    src: '/images/acentra-hero/tokens',
    widths: [800, 1600],
    alt: 'Token flow: Green 60 feeds the semantic tokens Focus primary, Icon interactive and Border interactive, and the component token Button primary, each shown in the interface',
    label: 'Green 60 → semantic → component',
    className: 'col-span-2 aspect-[2880/1152] md:col-span-8 md:aspect-auto',
    labelAt: 'top-left',
  },
]

