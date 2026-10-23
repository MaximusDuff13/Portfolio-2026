import { AnimatedSection } from '@/components/AnimatedSection'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { ContentsWall } from '@/components/ContentsWall'
import { HeaderScene } from '@/components/HeaderScene'
import { Interstitial } from '@/components/Interstitial'
import { PullQuote } from '@/components/PullQuote'
import { ResumeStamp } from '@/components/ResumeStamp'
import { SectionHeader } from '@/components/SectionHeader'
import { about, companies, contact, interests, intro, person, positioning, type Company, type InterestId } from '@/data/home'
import { links } from '@/data/links'
import { CompanyChips } from './_home/CompanyChips'

// DEVIATION — px-section (80px) is too wide on phones, so the side gutter steps up with the
// viewport: 24px, then 40px from sm, then the 80px token from lg. Same pattern as the Header.
const column = 'max-w-6xl mx-auto px-6 sm:px-10 lg:px-section'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2'

const withWork = companies.filter((c) => c.caseStudies.length > 0)
const earlier = companies.filter((c) => c.caseStudies.length === 0)

function InterstitialFor({ id }: { id: InterestId }) {
  const i = interests.find((x) => x.id === id)
  if (!i) return null
  return (
    <div className="mt-section">
      <Interstitial topic={id} label={i.label} caption={i.caption} href={links.aboutTopic[id]} />
    </div>
  )
}

function CompanyBlock({ c }: { c: Company }) {
  return (
    <article id={c.id} aria-labelledby={`${c.id}-name`} className="scroll-mt-20 mt-section border-t border-border pt-section">
      <AnimatedSection className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h3 id={`${c.id}-name`} className="flex items-center gap-3 text-heading-m font-grotesk text-foundation-900">
            {c.current && <span className="w-4 h-0.5 bg-accent-warm shrink-0" aria-hidden="true" />}
            {c.name}
            {c.current && <span className="sr-only"> (current role)</span>}
          </h3>
          <p className="text-label font-grotesk uppercase text-foundation-500 leading-[1.6]">
            {c.role} · {c.city} · {c.years}
          </p>
          <p className="text-body-sm font-sans text-foundation-600">{c.line}</p>
        </div>
        <div className="flex flex-col gap-16">
          {c.caseStudies.map((cs) => (
            <CaseStudyCard key={cs.href} {...cs} />
          ))}
        </div>
      </AnimatedSection>
    </article>
  )
}

export default function Home() {
  return (
    // overflow-x-clip: the interstitial illustrations bleed to the viewport edge, and 100vw
    // includes the scrollbar; clip (not hidden) so sticky and scroll-margin still work
    <main className="min-h-screen bg-body overflow-x-clip">
      {/* ── ZONE 1: HEADER ─────────────────────────────────────────────
          The illustration is the first screen, edge to edge. The identity line, status chip
          and headline sit on the sky (contrast-checked: foundation-600+ for text, 500 only
          for the large grey half of the headline); the intro, CTAs and company chips sit in
          a bar under the art, clear of the figures. 90svh including the 56px nav. */}
      <section aria-labelledby="intro-title">
        <HeaderScene
          className="min-h-[calc(90svh-56px)]"
          overlay={
            <div className={`${column} pt-8 sm:pt-12 lg:pt-16 flex flex-col gap-5 sm:gap-6`}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <p className="text-label font-grotesk uppercase text-foundation-600">
                  {person.role} · {person.company} · {person.city}
                </p>
                <p className="inline-flex items-center gap-2 px-2 py-1 rounded-sm border border-success-border bg-success-fill text-label font-grotesk uppercase text-success-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-text" aria-hidden="true" />
                  {person.status} · Updated {person.updated}
                </p>
              </div>
              {/* display-xl on desktop. DEVIATION: heading-l on phones and heading-xl on
                  tablets, so the line fits the sky without reaching the skyline. */}
              <h1 id="intro-title" className="text-heading-l sm:text-heading-xl lg:text-display-xl font-grotesk max-w-3xl">
                <span className="text-foundation-900">{positioning.lead}</span>{' '}
                <span className="text-foundation-500">{positioning.trail}</span>
              </h1>
            </div>
          }
          bar={
            <div className="border-t border-border bg-body">
              {/* `text-body` is also a colour token (the page white), so a responsive sm:text-body
                  must restate the colour at the same breakpoint or the text turns white */}
              <p className={`${column} pt-5 text-body-sm sm:text-body font-sans text-foundation-700 sm:text-foundation-700`}>
                <span className="block max-w-xl">{intro}</span>
              </p>
              <div className={`${column} py-4 flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-10`}>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={links.work}
                    className={`inline-flex items-center h-11 px-5 rounded-sm bg-foundation-900 text-body-sm font-grotesk font-medium text-foundation-100 no-underline hover:bg-foundation-700 transition-colors focus-visible:ring-offset-body ${focusRing}`}
                  >
                    View selected work
                  </a>
                  <a
                    href={links.about}
                    className={`inline-flex items-center h-11 px-5 rounded-sm border border-btn-border text-body-sm font-grotesk font-medium text-foundation-900 no-underline hover:border-foundation-500 transition-colors focus-visible:ring-offset-body ${focusRing}`}
                  >
                    About me
                  </a>
                </div>
                <div className="min-w-0 flex-1">
                  <CompanyChips companies={companies} />
                </div>
              </div>
            </div>
          }
        />
      </section>

      {/* ── ZONE 2: WORK ───────────────────────────────────────────── */}
      <section id="work" aria-labelledby="work-title" className={`${column} scroll-mt-20 pt-6`}>
        <AnimatedSection>
          <div className="flex flex-col gap-3 mb-6">
            <h2 id="work-title" className="text-label font-grotesk uppercase text-foundation-600">
              Contents · Selected work
            </h2>
            <div className="w-8 h-px bg-accent-warm" aria-hidden="true" />
          </div>
          <ContentsWall
            tiles={withWork.map((c) => ({
              id: c.id,
              href: c.caseStudies[0].href,
              company: c.name,
              role: c.role,
              years: c.years,
              title: c.tile?.title ?? c.caseStudies[0].title,
              current: c.current,
              plate: c.tile?.plate ?? 'neutral',
              screens: c.tile?.screens ?? [c.caseStudies[0].image],
              video: c.tile?.video,
              sheet: c.caseStudies[0].sheet,
            }))}
            resume={{ href: links.resume, kicker: 'Resume · PDF', title: '[RESUME TILE TITLE]', cta: 'Open resume' }}
          />
        </AnimatedSection>
      </section>

      <section id="experience" className={`${column} scroll-mt-20 pt-section`}>
        <div className="border-t border-border pt-section">
          <AnimatedSection>
            <SectionHeader eyebrow="Where I've worked" title="[WHERE I'VE WORKED HEADLINE]" accessibleEyebrow />
          </AnimatedSection>
        </div>

        {/* Interstitials sit between blocks, never inside them */}
        {withWork[0] && <CompanyBlock c={withWork[0]} />}
        <InterstitialFor id="travel" />
        {withWork.slice(1).map((c) => (
          <CompanyBlock key={c.id} c={c} />
        ))}
        <InterstitialFor id="games" />

        {earlier.length > 0 && (
          <div className="mt-section border-t border-border pt-section">
            <AnimatedSection>
              <h3 className="text-label font-grotesk uppercase text-foundation-600 mb-6">Earlier</h3>
              <ul className="m-0 p-0 divide-y divide-border border-y border-border">
                {earlier.map((c) => (
                  <li key={c.id} id={c.id} className="list-none scroll-mt-20 py-4 text-body-sm font-sans text-foundation-700">
                    <span className="font-grotesk font-medium text-foundation-900">{c.name}</span> · {c.role} · {c.years} · {c.city}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        )}
        <InterstitialFor id="volunteering" />
      </section>

      {/* ── ZONE 3: CLOSE ──────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-14 pt-section">
        <div className={`${column} border-t border-border pt-section`}>
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
            <div className="lg:col-span-4 max-w-xs lg:max-w-none">
              {/* [PORTRAIT] — placeholder until a photo is supplied */}
              <div
                role="img"
                aria-label={`Portrait of ${person.name} (placeholder)`}
                className="w-full aspect-[4/5] rounded-sm border border-border bg-foundation-200 flex items-center justify-center"
              >
                <span className="text-label font-grotesk uppercase text-foundation-600">[Portrait]</span>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-6">
              <SectionHeader eyebrow="About" title={about.title} accessibleEyebrow />
              <p className="text-body font-sans text-foundation-700 max-w-2xl">{about.story}</p>
            </div>
          </AnimatedSection>
          <PullQuote>{about.quote}</PullQuote>

          <AnimatedSection className="mt-12">
            <p className="text-label font-grotesk uppercase text-foundation-600 mb-8">How I work</p>
            {/* SectionHeader's title is heading-xl, too large for four across, so two by two */}
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 m-0 p-0">
              {about.principles.map((p, i) => (
                <li key={i} className="list-none">
                  <SectionHeader index={String(i + 1).padStart(2, '0')} eyebrow={p.principle} title={p.sentence} accessibleEyebrow />
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-14 mt-section bg-foundation-900">
        <div className={`${column} py-section`}>
          <AnimatedSection className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="w-8 h-px bg-accent-warm" aria-hidden="true" />
              <h2 id="contact-title" className="text-heading-l font-grotesk text-foundation-100 max-w-3xl">
                {contact.line}
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-label font-grotesk uppercase text-foundation-400">Email</p>
              {/* Plain, selectable text — easy to copy into a hiring system */}
              <p className="text-body sm:text-heading-m font-grotesk text-foundation-100 select-all break-words">{links.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              <a
                href={links.mailto}
                className={`inline-flex items-center h-11 px-5 rounded-sm bg-body text-body-sm font-grotesk font-medium text-foundation-900 no-underline hover:bg-foundation-200 transition-colors focus-visible:ring-offset-foundation-900 ${focusRing}`}
              >
                Email me
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-sm text-body-sm font-grotesk text-foundation-200 underline decoration-accent-warm underline-offset-4 hover:text-foundation-100 focus-visible:ring-offset-foundation-900 ${focusRing}`}
              >
                LinkedIn <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {links.personal && (
                <a
                  href={links.personal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-sm text-body-sm font-grotesk text-foundation-200 underline decoration-accent-warm underline-offset-4 hover:text-foundation-100 focus-visible:ring-offset-foundation-900 ${focusRing}`}
                >
                  {links.personal.label} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <ResumeStamp href={links.resume} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
