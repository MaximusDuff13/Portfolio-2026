'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, slideInLeft } from '@/lib/motion'

export function BackLink({ href, label }: { href: string; label: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReduced ? fadeIn : slideInLeft}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-ui-chrome font-sans text-foundation-500 hover:text-foundation-900 transition-colors"
      >
        <span aria-hidden="true">←</span>
        {label}
      </Link>
    </motion.div>
  )
}
