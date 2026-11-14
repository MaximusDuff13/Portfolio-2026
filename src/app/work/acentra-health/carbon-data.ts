// 04 Built on Carbon: what Carbon gave us and what we changed, in three groups (Nov 7 2026).
// Plain data so server pages can read it; BuiltOnCarbon renders it. Type facts from Michael:
// IBM Plex → Acumin Pro; Standard and Compact typography modes for external vs internal apps.
// Size tokens and the 0px → 2px radius are read off his exports in /images/acentra-hero.

// a change's evidence: a real export (ratio = width / height, so it's sized before it loads), a
// slot still to come, or the typography-mode sketch; sizes = [token, Standard px, Compact px]
export type Change = {
  was?: string
  title: string
  desc: string
  img?: { src: string; alt: string; ratio: number }
  needed?: string
  sketch?: boolean
  sizes?: [token: string, standard: number, compact: number][]
}

// The two typography modes as Michael's guidance states them (from the comparison export)
export const TYPE_MODES = [
  {
    key: 'standard',
    label: 'Standard',
    tag: 'Recommended',
    when: ['External user-facing products', 'More space available in the interface', 'A slightly larger font size is preferred'],
    img: { src: '/images/acentra-hero/type-standard.webp', alt: 'A beneficiary record in Standard mode', ratio: 785 / 1366 },
  },
  {
    key: 'compact',
    label: 'Compact',
    tag: 'Dense layouts',
    when: ['Internal-facing products', 'Restricted space in the interface', 'Smaller text is needed to fit more content'],
    img: { src: '/images/acentra-hero/type-compact.webp', alt: 'The same beneficiary record in Compact mode', ratio: 737 / 1366 },
  },
] as const

// The border radius scale (from "Border Radius System.png")
export const RADIUS_SCALE: [token: string, px: number][] = [
  ['radius-00', 0],
  ['radius-01', 2],
  ['radius-02', 4],
  ['radius-03', 8],
  ['radius-04', 12],
  ['radius-05', 16],
  ['radius-06', 24],
]

export const GROUPS: { label: string; changes: Change[] }[] = [
  {
    label: 'Colour',
    changes: [
      {
        was: 'IBM’s green',
        title: 'Acentra’s green, at Carbon’s brightness',
        desc: "We partnered with Marketing to select a green that worked for both brand and product — mapped to Carbon's Green 60 to match the luminance of the rest of their colour scale.",
        img: { src: "/images/Carbon/Anchor.png", alt: "Acentra palette contrast ratios against light and dark backgrounds", ratio: 1 },
      },
      {
        title: 'A ramp where every step has a job',
        desc: '4 steps to 3:1 for large text and UI. 5 steps to 5:1 for body and interactive. Every stop in the ramp has a contrast reason — not just a shade.',
        img: { src: "/images/Carbon/Rythmm.png", alt: "The Acentra green ramp — Leaf primary with Green 10 / 60 / 100 contrast magic numbers", ratio: 1 },
      },
      {
        was: 'Every foundation shade',
        title: 'A small set of named tokens',
        desc: 'Mapped semantic tokens to a purposeful subset — not every foundation shade was exposed. The constraint kept decisions consistent across teams.',
        img: { src: "/images/Carbon/Discpline.png", alt: "Token flow — Green 60 mapped through semantic and component tokens to UI", ratio: 3200 / 1571 },
      },
    ],
  },
  {
    label: 'Type',
    changes: [
      {
        was: 'IBM Plex',
        title: 'Acumin Pro, the Acentra brand font',
        desc: 'We swapped Carbon’s IBM Plex for Acumin Pro, so the product finally spoke in the same voice as the brand.',
        needed: 'An Acumin Pro specimen or the type styles page from the Figma library',
      },
      {
        was: 'One set of small text sizes',
        title: 'Two type modes: Standard and Compact',
        desc: 'Carbon’s text ran small. As a healthcare organisation, our products already used 14 and 16px for body text. So we added a typography mode: Standard, a little larger, for external healthcare apps, and Compact for internal tools that don’t need big type.',
        // type-modes.webp is "Typograohy comparisons.png" with its top text cropped off; the halves are its two sides
        img: { src: '/images/acentra-hero/type-modes.webp', alt: 'The same beneficiary screen in Standard, left, and Compact, right', ratio: 1522 / 1366 },
        sizes: [
          ['Body-01', 16, 14],
          ['Body-02', 18, 16],
          ['Label-01', 16, 14],
          ['Heading-01', 16, 14],
        ],
      },
    ],
  },
  {
    // from Michael (Nov 7): Carbon felt too enterprise; after looking at healthcare competitors
    // we added border radius so the interface feels friendlier: a 7-step scale, radius-00 (0px) to
    // radius-06 (24px); his before/after shows radius-00 → radius-01 (2px).
    label: 'Shape',
    changes: [
      {
        was: 'Square, 0px corners',
        title: 'A 2px corner, for a friendlier product',
        desc: 'Carbon’s square corners felt too enterprise for healthcare. We looked at how healthcare competitors present themselves and wanted our interface to feel a little more friendly, so we added a border radius scale to the design system: seven tokens, from radius-00 at 0px to radius-06 at 24px. Where Carbon had a 0px corner, radius-01 gives 2px.',
        img: { src: '/images/acentra-hero/radius-before-after.webp', alt: 'Before: border-radius token radius-00, a 0px corner. After: radius-01, a 2px corner, shown at 16× zoom', ratio: 851 / 310 },
      },
    ],
  },
]
