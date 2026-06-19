interface SectionHeaderProps {
  /** optional section counter, e.g. '01' — omit for the intro/overview */
  index?: string
  /** small-caps eyebrow category, e.g. 'Audit' */
  eyebrow: string
  /** editorial headline — convey the finding, not the category */
  title: string
  /** optional italic narrative quote beneath the headline */
  quote?: string
}

export function SectionHeader({ index, eyebrow, title, quote }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
          {index ? `${index} — ${eyebrow}` : eyebrow}
        </p>
        <div className="w-8 h-px bg-accent-warm" />
      </div>
      <h2 className="text-heading-xl font-grotesk text-foundation-900">{title}</h2>
      {quote && (
        <p className="text-body-sm font-sans text-foundation-600 italic">{quote}</p>
      )}
    </div>
  )
}
