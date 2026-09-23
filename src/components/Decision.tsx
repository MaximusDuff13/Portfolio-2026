// Decision — what was finalised after a set of concepts, and why.
//
// NEW COMPONENT. One paragraph, no title: it follows the concepts directly, so it needs no label
// to say what it is answering. Same callout treatment the page's earlier recommendation box used
// (border-l-2 border-accent-warm bg-foundation-100 p-5).
//
// ACCENT. accent-warm is the left border only. The text is foundation-600 on foundation-100,
// 6.99:1.
export function Decision({ statement }: { statement: string }) {
  return (
    <div className="border-l-2 border-accent-warm bg-foundation-100 p-5">
      <p className="m-0 font-sans text-body text-foundation-600">{statement}</p>
    </div>
  )
}
