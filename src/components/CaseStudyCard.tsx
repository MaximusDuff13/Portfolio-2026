'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { CoverSheet, type CoverSheetData } from '@/components/CoverSheet'
import { duration, enterT, exitT } from '@/lib/motion'

/* NEW — a case study in a company block: an unframed image with type/honesty tags, an
   outcome-first title and a one-line descriptor, and beside it the cover sheet as the one
   boxed element (a foundation-100 tile). No card around the whole thing. Not a FindingCard
   fork: FindingCard is a figure-with-caption for inside a case study (plain <img>, a small
   caption title, no link or tags); this needs a link, a heading-level title, tags and
   next/image. */

const lift: Variants = {
  rest: { y: 0, transition: exitT(duration.base) },
  open: { y: -4, transition: enterT(duration.base) },
}

export function CaseStudyCard({
  href,
  title,
  descriptor,
  tags,
  image,
  sheet,
}: {
  href: string
  title: string
  descriptor: string
  tags: string[]
  image: { src: string; alt: string }
  sheet: CoverSheetData
}) {
  const prefersReduced = useReducedMotion()
  const slug = href.split('/').pop()
  const titleId = `${slug}-card-title`
  const descId = `${slug}-card-desc`
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
      <motion.div
        className="lg:col-span-7"
        initial="rest"
        animate="rest"
        whileHover={prefersReduced ? undefined : 'open'}
        variants={lift}
      >
        <Link
          href={href}
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="group block no-underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-4 focus-visible:ring-offset-body"
        >
          {/* Unframed: no border, no box */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-left-top"
            />
          </div>
          {/* Tags as plain label text, so the cover sheet stays the only boxed element */}
          <ul className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 m-0 p-0" aria-label="Tags">
            {tags.map((t, i) => (
              <li
                key={t}
                className={`list-none text-label font-grotesk uppercase ${
                  t.toLowerCase() === 'draft' ? 'text-warning-text' : 'text-foundation-600'
                }`}
              >
                {i > 0 && <span className="mr-2 text-foundation-400" aria-hidden="true">·</span>}
                {t}
              </li>
            ))}
          </ul>
          <h4 id={titleId} className="mt-3 text-heading-m font-grotesk text-foundation-900 group-hover:text-foundation-700 transition-colors">
            {title}
          </h4>
          <p id={descId} className="mt-1 text-body-sm font-sans text-foundation-600">
            {descriptor}
          </p>
        </Link>
      </motion.div>
      <div className="lg:col-span-5">
        <CoverSheet data={sheet} tone="fill" />
      </div>
    </div>
  )
}
