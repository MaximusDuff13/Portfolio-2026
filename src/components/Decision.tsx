// Decision — what was finalised after a set of concepts, and why.
//
// NEW COMPONENT. One paragraph, no title: it follows the concepts directly, so it needs no label
// to say what it is answering. Same callout treatment the page's earlier recommendation box used
// (border-l-2 border-accent-warm bg-foundation-100 p-5).
//
// The box and text classes are the defaults for the page ground; a caller on another ground
// passes its own (see ProblemSolutionFeature's featureSurface()).
//
// ACCENT. On the page ground accent-warm is the left border only. The text is foundation-600 on
// foundation-100, 6.99:1.
export function Decision({
  statement,
  className = 'border-l-2 border-accent-warm bg-foundation-100',
  textClassName = 'text-foundation-600',
}: {
  statement: string
  className?: string
  textClassName?: string
}) {
  return (
    <div className={`${className} p-5`}>
      <p className={`m-0 font-sans text-body ${textClassName}`}>{statement}</p>
    </div>
  )
}
