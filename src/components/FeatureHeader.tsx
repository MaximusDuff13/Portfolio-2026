// FeatureHeader — the title block for one problem-and-solution feature: its eyebrow, then its
// title. There is no section label above it; each feature names itself here.
//
// CONTRAST. The eyebrow colour depends on the ground it sits on, so the caller passes it.
// foundation-500 measures 4.61:1 on the page ground, over AA's 4.5:1, which is why it is the
// default. On foundation-100 it falls under 4.5:1, so a tinted band passes foundation-600 —
// see ProblemSolutionFeature's featureSurface().
export function FeatureHeader({
  eyebrow,
  title,
  eyebrowClassName = 'text-foundation-500',
}: {
  eyebrow: string
  title: string
  eyebrowClassName?: string
}) {
  return (
    <header>
      <p className={`text-label font-grotesk uppercase tracking-widest ${eyebrowClassName}`}>
        {eyebrow}
      </p>
      <h3 className="mt-3 font-grotesk text-heading-l text-foundation-900">{title}</h3>
    </header>
  )
}
