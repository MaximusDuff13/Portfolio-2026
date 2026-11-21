// Closing thoughts: the case study's last section, after 06 Testimonials and before Keep exploring.
// Michael's own text (Nov 21 2026), word for word: three lessons, each with what happened and what
// he'd do next time, then the one-line summary. It replaced the old What's next roadmap (guides,
// Acentra-driven patterns, charts and dashboards).
// `mark` (optional) is the phrase in `next` that the pen underlines in the layouts that use it, as
// `inShortMark` is for the summary; they are Claude's suggested emphasis, for Michael to change.
export type Lesson = { title: string; what: string; next: string; mark?: string }

export const closing = {
  title: 'What I learned, and what I’d do next time',
  lessons: [
    {
      title: 'A design system needs central guidance',
      what: 'Our team looked after the design system, but each product team also wanted to shape it in their own way. Without a central design team to guide those choices, it was hard to keep everyone aligned, and use of the system slowly dropped.',
      next: 'I’d look for central design leadership early on, and give teams a simple way to contribute their ideas to one shared system.',
      mark: 'central design leadership early on',
    },
    {
      title: 'Leave room for flexibility',
      what: 'We focused on accessibility and consistency first. Designers later asked for options such as more colour schemes and different corner styles. We added them, but by then the system already felt a bit rigid.',
      next: 'I’d plan for these options from the start, while keeping accessibility as a constant.',
      mark: 'from the start',
    },
    {
      title: 'Plan for changing technology',
      what: 'As part of a company-wide move to a simpler, modern tech stack, Acentra Health switched from Angular to React. It was a good step for the company’s growth, and it meant we had to rebuild our components.',
      next: 'I’d keep the core of the system (tokens, guidelines and specs) separate from any one framework, so it carries over easily when the technology changes.',
      mark: 'separate from any one framework',
    },
  ] as Lesson[],
  inShort: 'A design system grows best when teams shape it together, it gives designers room to work, and it’s ready for change.',
  inShortMark: 'teams shape it together',
}
