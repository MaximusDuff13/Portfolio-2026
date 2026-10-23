'use client'
import type { ReactNode } from 'react'
import type { Direction } from './types'
import HongKongWindow from './w3'

/* TEMPORARY — /explore harness. The hero loop seen through a window. The user picked W3, the
   Hong Kong flat window (aluminium sliding sash, ledge, lucky bamboo), out of four variants;
   it now frames the loop on A, B and C. The unpicked variants (w1 arched, w2 casement,
   w4 shutters) are kept on disk but not used; screenshots of all four are in
   .impeccable/windows/. */

export function LoopWindow({ direction, children }: { direction: Direction; children: ReactNode }) {
  return <HongKongWindow direction={direction}>{children}</HongKongWindow>
}
