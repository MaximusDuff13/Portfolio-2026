import type { ReactNode } from 'react'

export type Direction = 'a' | 'b' | 'c'

export type WindowProps = {
  /** which direction is rendering the window, so a variant can match that world */
  direction: Direction
  /** the HeroLoop itself */
  children: ReactNode
}
