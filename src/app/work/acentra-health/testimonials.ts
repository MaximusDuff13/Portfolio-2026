// 07 Testimonials: what the people Michael worked with said, about the system and about him.
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
    group: 'Manager',
    quote: 'A manager or leader, in one to three sentences: what the system changed for the organisation, and what you were like to work with.',
    name: 'Their name',
    role: 'Their job title',
    team: 'Their team',
    relation: 'How you worked together',
    placeholder: true,
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
