import { redirect } from 'next/navigation'

/* moved: the card preview lives on /dev/cards now */
export default function CardsUnfoldMoved() {
  redirect('/dev/cards')
}
