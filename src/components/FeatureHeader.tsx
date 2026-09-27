// FeatureHeader — the title block for one problem-and-solution feature: its eyebrow, then its
// title. There is no section label above it; each feature names itself here.
//
// CONTRAST. Both colours depend on the ground they sit on, so the caller can pass them. The
// defaults are for the page ground: foundation-500 eyebrow (4.61:1, over AA's 4.5:1) and
// foundation-900 title. A dark band passes the hero's dark-zone tones instead — see
// ProblemSolutionFeature's featureSurface().
export function FeatureHeader({
  eyebrow,
  title,
  eyebrowClassName = 'text-foundation-500',
  titleClassName = 'text-foundation-900',
}: {
  eyebrow: string
  title: string
  eyebrowClassName?: string
  titleClassName?: string
}) {
  return (
    <header>
      <p className={`text-label font-grotesk uppercase tracking-widest ${eyebrowClassName}`}>
        {eyebrow}
      </p>
      <h3 className={`mt-3 font-grotesk text-heading-l ${titleClassName}`}>{title}</h3>
    </header>
  )
}
