interface SectionHeaderProps {
  /** optional section counter, e.g. '01' — omit for the intro/overview */
  index?: string
  /** small-caps eyebrow category, e.g. 'Audit' */
  eyebrow: string
  /** editorial headline — convey the finding, not the category */
  title: string
  /** optional italic narrative quote beneath the headline */
  quote?: string
  /**
   * Opt in to the WCAG AA eyebrow colour. The default foundation-400 on the cream page
   * ground measures 2.44:1 at 11px — AA needs 4.5:1. foundation-500 measures 4.6:1.
   *
   * TODO(a11y): the Acentra Health case study still uses the failing default. Once it
   * passes `accessibleEyebrow` too (or is otherwise updated), make foundation-500 the
   * default here and delete this prop.
   */
  accessibleEyebrow?: boolean
}

export function SectionHeader({ index, eyebrow, title, quote, accessibleEyebrow = false }: SectionHeaderProps) {
  const eyebrowColor = accessibleEyebrow ? 'text-foundation-500' : 'text-foundation-400'
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className={`text-label font-grotesk ${eyebrowColor} uppercase tracking-widest`}>
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
