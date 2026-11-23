// 05 Testimonials: what the people Michael worked with said, about the system and about him.
//
// HOW TO FILL IN: replace a placeholder's text with the real details, then delete its
// `placeholder: true` line. Quotes are used exactly as written, so ask each person's OK first.
// Put the manager or leader first: the first quote gets the large card.
// `relation`, `photo` and `link` are optional.
//
// Entries still marked `placeholder` show only in development, so the live site never shows one.
// The whole section (and its contents-bar chip) stays hidden there until a real quote is in.
import type { Testimonial } from '@/components/Testimonials'

export const testimonials: Testimonial[] = [
  {
    // Anil Nesamony, a Director, about AHDS (sent by Michael, Nov 23 2026). His full comment is
    // ~150 words; this is two of his sentences, word for word, with "…" where text is left out.
    // Full text, for reference: "Michael's innovative UX leadership helped transform AHDS by
    // introducing scalable design standards, practical implementation examples, and user-centered
    // enhancements that improve consistency, usability, and adoption across Acentra Health
    // products. Drove UX innovation through the introduction of Typography Themes, Border Radius
    // Standards, and the new Gallery experience. Helped evolve AHDS beyond a component library into
    // a comprehensive design enablement platform. Demonstrated creative thinking in solving
    // consistency and adoption challenges. Influenced both product experience and design-system
    // strategy. Through close collaboration with stakeholders and engineering teams, Michael helped
    // create clear design guidance, implementation examples, and visual standards that make AHDS
    // easier to adopt and apply consistently across applications. His efforts continue to
    // strengthen the design system as a strategic asset. Thank you, for your creativity, UX
    // leadership, and a world-class design system"
    // Title confirmed by Michael (Nov 23 2026): Director, Acentra Health.
    group: 'Leadership',
    quote: 'Michael’s innovative UX leadership helped transform AHDS by introducing scalable design standards, practical implementation examples, and user-centered enhancements that improve consistency, usability, and adoption across Acentra Health products. … Helped evolve AHDS beyond a component library into a comprehensive design enablement platform.',
    name: 'Anil Nesamony',
    role: 'Director',
    team: 'Acentra Health',
  },
  {
    group: 'Developer',
    quote: 'A developer: what building with the system was like. One specific thing that got faster or easier works best.',
    name: 'Their name',
    role: 'Their job title',
    team: 'Their team',
    relation: 'How you worked together',
    placeholder: true,
  },
  {
    group: 'Designer',
    quote: 'A designer or product person: what changed for their team once the system was in place.',
    name: 'Their name',
    role: 'Their job title',
    team: 'Their team',
    relation: 'How you worked together',
    placeholder: true,
  },
]
