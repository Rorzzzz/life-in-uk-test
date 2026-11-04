'use client'

import { usePathname } from 'next/navigation'
import AdSlot from '@/components/ui/AdSlot'
import { AD_SLOTS } from '@/data/ads'

/**
 * In-content ad for content and tool pages ("Content inline" unit).
 *
 * Placement rules (see research/decisions.md, 2026-11-04):
 * - Only inside real content (after an intro or between sections), never above
 *   the H1/intro, never inside or next to a tool's form/results, never directly
 *   against a button, input or link list (my-10 = 40px + label on each side).
 * - Max 1 per ~600 words of content; articles max 3. Never on quizzes,
 *   dashboards, legal/contact pages, 404.
 * - A new ad loads on every real page (pathname in the key), which fixes Auto
 *   ads not re-placing after client-side navigation.
 */
export default function ContentAd({ id = 'a', className = 'my-10' }) {
  const pathname = usePathname()
  return (
    <AdSlot
      slot={AD_SLOTS.contentInline}
      refreshKey={`${pathname}#${id}`}
      heightClass="h-[280px]"
      className={className}
    />
  )
}
