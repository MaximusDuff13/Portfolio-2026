'use client'
import type { ReactNode } from 'react'
import HongKongWindow from './w3'

/* The hero loop seen through a window: W3, the Hong Kong flat window (aluminium frame, one
   sash, a ledge with Michael's keepsakes), picked out of four variants. Screenshots of all
   four are in .impeccable/windows/. */

export function LoopWindow({ children }: { children: ReactNode }) {
  return <HongKongWindow>{children}</HongKongWindow>
}
