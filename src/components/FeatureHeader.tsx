// FeatureHeader — the title block for one feature inside the Features section.
//
// NEW COMPONENT. Features is a section that will hold several features; this is the unit that
// separates them. It is deliberately not the section eyebrow: the section says "Features" once,
// at the rail, and each feature names itself here.
//
// CONTRAST. Both lines sit on the page ground, not on a card. foundation-500 measures 4.61:1
// there, over AA's 4.5:1, which is why the eyebrow can use the same colour the section rails
// use elsewhere on this page. Inside a foundation-100 card it would not — see PrincipleGrid.
export function FeatureHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header>
      <p className="text-label font-grotesk uppercase tracking-widest text-foundation-500">
        {eyebrow}
      </p>
      <h3 className="mt-3 font-grotesk text-heading-l text-foundation-900">{title}</h3>
    </header>
  )
}
