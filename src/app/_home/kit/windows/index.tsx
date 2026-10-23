'use client'
import type { ReactNode } from 'react'
import type { Direction } from './types'
import HongKongWindow from './w3'

/* The hero loop seen through a window: W3, the Hong Kong flat window (aluminium sliding sash,
   ledge, lucky bamboo), picked out of four variants. Screenshots of all four are in
   .impeccable/windows/. */

export function LoopWindow({ direction, children }: { direction: Direction; children: ReactNode }) {
  return <HongKongWindow direction={direction}>{children}</HongKongWindow>
}
