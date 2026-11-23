// Closing thoughts: the case study's last section, after 05 Testimonials and before Keep exploring.
// Michael's own text (Nov 21 2026; the three lessons rewritten by him Nov 23 2026), word for word: three lessons, each with what happened and what
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
      what: 'Design leadership was split across departments, and our UX team didn’t report to one manager. We built the system and drove adoption, but each leader wanted their own visual direction, so we could never get every team on the same page.',
      next: 'I’d get one design owner, or a shared design council, in place early. I’d also give teams one clear way to bring their ideas into a single system.',
    },
    {
      title: 'Leave room for flexibility',
      what: 'As a healthcare company, we put accessibility and consistency first, so the system tightly limited colours, fonts and styles. That left teams little room to adapt it to their needs. We saw this too late, and by the time we opened it up, the system had lost momentum.',
      next: 'I’d build in flexibility from the start, through theming and variants, and keep accessibility as the one thing that never changes.',
    },
    {
      title: 'Plan for changing technology',
      what: 'As part of a company-wide transformation, Acentra Health moved from Angular to React. React is the more widely used framework, and AI-assisted development tools support it better. It was the right call, but it meant rebuilding all our components.',
      next: 'I’d keep the core of the system (tokens, guidelines and specs) independent of any one framework, for example by using web components. That way it works with whatever stack the company picks.',
    },
  ] as Lesson[],
  inShort: 'A design system grows best when teams shape it together, it gives designers room to work, and it’s ready for change.',
  inShortMark: 'teams shape it together',
}
