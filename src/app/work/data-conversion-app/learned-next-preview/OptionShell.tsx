// One option, with a dev-only caption above it. The caption bar is the only thing here that is
// not part of the option: it never appears on the case study page, which imports nothing from
// this folder. foundation-600 on foundation-100 is 7.1:1.
//
// CONTEXT. On the live page this section would follow Testimonials and, like it, sit on the page
// ground (body). Each option is shown between two bg-body strips.
export function OptionShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div data-option={label}>
      <div className="border-y border-border bg-foundation-100 px-6 py-4 sm:px-10 lg:px-section">
        <p className="mx-auto max-w-6xl font-grotesk text-label uppercase tracking-widest text-foundation-600">
          {label}
        </p>
      </div>
      <div aria-hidden="true" className="h-section bg-body" />
      {children}
      <div aria-hidden="true" className="h-section bg-body" />
    </div>
  )
}
