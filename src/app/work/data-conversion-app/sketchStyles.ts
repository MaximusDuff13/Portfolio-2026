/* Plain class strings for the sketchbook layout. Kept out of Sketch.tsx on purpose: that file is
   'use client', and a non-component value imported from it into a server component arrives as a
   client reference, not a string (it rendered as class="[object Object]"). */

/** The white card a screenshot or diagram sits on. */
export const frame = 'rounded-2xl bg-white p-4 ring-1 ring-foundation-900/5 sm:p-8'
