'use client'
import { useRouter } from 'next/navigation'
import { BackLink } from '@/components/BackLink'
import { FROM_HOME_KEY } from '@/components/Interstitial'
import { links } from '@/data/links'

/* Wraps the shared BackLink. If the visitor came here from a home page "Read more", going
   back through history returns them to the interstitial they left, with the browser's
   scroll position restored. Arriving any other way (a shared link, a reload), it is a
   normal link home. */
export function BackToWork() {
  const router = useRouter()
  return (
    <div
      onClickCapture={(e) => {
        let fromHome = false
        try {
          fromHome = sessionStorage.getItem(FROM_HOME_KEY) === '1'
          sessionStorage.removeItem(FROM_HOME_KEY)
        } catch {}
        if (fromHome && window.history.length > 1) {
          e.preventDefault()
          router.back()
        }
      }}
    >
      <BackLink href={links.work} label="Back to work" />
    </div>
  )
}
