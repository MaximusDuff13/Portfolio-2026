'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, scaleUp } from '@/lib/motion'

export function BrowserMockup({ src, url = 'acentrahealth.com' }: { src: string; url?: string }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={prefersReduced ? fadeIn : scaleUp}
      className="w-full rounded-lg border border-border overflow-hidden shadow-xl"
    >
      {/* Browser chrome */}
      <div className="bg-foundation-100 border-b border-border px-4 py-3 flex items-center gap-3">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-foundation-300" />
          <span className="w-3 h-3 rounded-full bg-foundation-300" />
          <span className="w-3 h-3 rounded-full bg-foundation-300" />
        </div>

        {/* URL bar */}
        <div className="flex-1 bg-body rounded border border-border px-3 py-1">
          <span className="text-ui-chrome font-sans text-foundation-400">{url}</span>
        </div>
      </div>

      {/* Video */}
      <div className="bg-foundation-900 w-full">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full block"
        />
      </div>
    </motion.div>
  )
}
