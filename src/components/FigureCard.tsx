// FigureCard — the shared frame for the case study's explanatory figures.
//
// NEW COMPONENT. One frame, two figures: the MVP priority chart and the process overview.
// Putting both in the same card is what makes them read as a matched pair of diagrams rather
// than two unrelated blocks, and it means the padding, radius and caption treatment cannot
// drift apart between them.
//
// The radius is rounded-lg, which is the only radius the case study uses — the product shot and
// the More Case Studies cards are both rounded-lg.
//
// CONTRAST. The caption is foundation-600, not the foundation-500 the spec named. On this
// card's foundation-100 ground foundation-500 measures 4.40:1, under AA's 4.5:1 for text at
// this size; foundation-600 measures 6.99:1. This is the same trade SectionHeader already
// makes through its accessibleEyebrow prop, and the brief's own measured check requires 4.5:1,
// so the two instructions can only be satisfied one way.
export function FigureCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <figure className="m-0 rounded-lg border border-border bg-foundation-100 p-8 md:p-12">
      <figcaption className="mb-10">
        {/* The 24px tick. A graphic, which is where accent-warm is allowed: it measures
            3.87:1 on this ground, over the 3:1 WCAG asks of non-text. */}
        <span aria-hidden="true" className="block h-px w-6 bg-accent-warm" />
        <span className="mt-3 block text-label font-grotesk uppercase tracking-widest text-foundation-600">
          {title}
        </span>
      </figcaption>
      {children}
    </figure>
  )
}
