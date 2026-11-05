'use client'

import { useEffect } from 'react'

const BOTTOM_NAV = 72   // fixed mobile BottomNav (64px) + breathing room
const ANCHOR_ZONE = 110 // never scroll an in-quiz ad up under the top anchor ad

/**
 * After an answer is revealed, smoothly scroll so `targetRef` (usually the Next
 * button) sits just above the bottom nav. Same behaviour as QuestionCard in the
 * Life in the UK quizzes. If `adRef` is given, the scroll is capped so that ad
 * stays clear of the top-anchor zone (an ad must not sit under another ad).
 */
export function useRevealScroll(active, targetRef, adRef, delay = 150) {
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => {
      const el = targetRef.current
      if (!el) return
      let by = el.getBoundingClientRect().bottom - window.innerHeight + BOTTOM_NAV
      const ad = adRef?.current?.getBoundingClientRect()
      if (ad && ad.height > 0) by = Math.min(by, ad.top - ANCHOR_ZONE)
      if (by > 0) window.scrollBy({ top: by, behavior: 'smooth' })
    }, delay)
    return () => clearTimeout(t)
  }, [active, targetRef, adRef, delay])
}
