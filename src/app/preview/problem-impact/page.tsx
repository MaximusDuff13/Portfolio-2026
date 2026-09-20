// TEMPORARY preview route — not linked from nav, not part of the case study.
//
// Renders Problem (the approved layout G, now living beside the case study as ProblemSection)
// and Impact one after the other inside the real Data Conversion App page shell, so the two can
// be judged as a pair before either is applied to the live page.
//
// ?frames renders the same pair in a 390px and a 1280px iframe — see ./frames.
//
// Delete this route once Impact lands on the live page; the two components it renders live
// beside the case study and stay.
import { ProblemSection } from '@/app/work/data-conversion-app/ProblemSection'
import { Impact } from '@/app/work/data-conversion-app/Impact'

// searchParams is read on the server, so ?still=1 costs no client JS and cannot cause a
// hydration mismatch. It applies .preview-still (globals.css), which the frames harness needs
// because whileInView does not settle inside an iframe.
export default function ProblemImpactPreviewPage({
  searchParams,
}: {
  searchParams?: { still?: string }
}) {
  const still = searchParams?.still ? ' preview-still' : ''
  return (
    <main className={`min-h-screen bg-body${still}`}>
      {/* pb-section stands in for the page shell: on the live page the product shot above
          Problem supplies this 80px, and Problem no longer pads its own top. */}
      <div className="px-section pt-section pb-section">
        <div className="max-w-6xl mx-auto">
          <p className="text-label font-grotesk text-foundation-400 uppercase tracking-widest">
            Preview · Problem + Impact · not linked from nav
          </p>
        </div>
      </div>

      <ProblemSection />
      <Impact />
    </main>
  )
}
