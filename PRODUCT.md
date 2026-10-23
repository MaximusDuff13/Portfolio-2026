# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Hiring managers and recruiters looking at a UX / product design portfolio. They skim for one to two minutes, so nothing may stand between them and the work.

## Product Purpose
The personal portfolio of Michael Jerome, Senior UX Designer. It shows his case studies and how he thinks, so a hiring manager can judge him quickly and move him to interview. Success: the reader reaches a case study, or the About page, within the first screen.

## Positioning
Michael Jerome takes complex, chaotic ideas and makes them simple. The home page acts this out: design-world noise, then signal.

## Operating Context
Readers arrive from job applications, LinkedIn and recruiter shortlists. They read on desktop and phone, in light and dark themes, often between other candidates.

## Capabilities and Constraints
- Next.js 14 (app router), Tailwind 3, Framer Motion 11. No Three.js.
- Header art kit: a painted Hong Kong skyline with Michael seated with a coffee and his dog (public/header-kit/, spec in header-sequence.json, web exports in public/header-kit/web/). Figures change pose by hard cuts only; never fade a figure's opacity. Source images are not regenerated or altered.
- The brief docs referenced in early requests (claude/home-page-brief.md, Tokens and value, claude/motion-measurements.md, claude/header-kit-qa.md) are not in the repo. Until they turn up, the code is the source of truth: tailwind.config.js (tokens), src/lib/motion.ts (motion), header-sequence.json and src/data/headerScene.ts (kit).
- prefers-reduced-motion must be honoured.

## Brand Commitments
- Name: Michael Jerome. Wordmark is plain text.
- About page credit: "Illustrated with AI, directed by me."
- Existing tokens: warm off-white body #fdfbf7, stone foundation scale, accent.warm #c2600a as the only accent, Space Grotesk + Inter, 80px section spacing.

## Evidence on Hand
Real:
- Acentra Health Design System case study: 8 months, 9 sections, Draft. Images in public/images/beforeafter, audit, Carbon.
- Data Conversion App case study: 2 weeks, 5 sections, Draft. Its media are placeholders.

Everything else (side projects, accolades, about copy, contact email, other company names, years) is sample content. It must be labelled "Sample" wherever it shows. Never invent awards, metrics, press or a contact email as if real.

## Product Principles
1. No friction before the work: nav and calls to action are visible from the first frame, and any intro is skippable.
2. Show, then say: the page demonstrates simplification rather than claiming it.
3. Honesty over polish: drafts are labelled drafts, samples are labelled samples.
4. One idea per card.

## Accessibility & Inclusion
WCAG AA contrast (foundation-500 only for large text), keyboard-operable controls with visible focus, reduced-motion support, no layout shift.
