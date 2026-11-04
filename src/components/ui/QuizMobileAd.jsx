'use client'

import AdSlot from '@/components/ui/AdSlot'
import { AD_SLOTS, INLINE_AD_MIN_WIDTH, QUIZ_MOBILE_AD_ENABLED } from '@/data/ads'

// Phones only: the "Quiz mobile" unit placed directly under a quiz's answer
// options (same as the Life in the UK mock tests). One ad per question.
// User's decision 2026-11-04 (see research/decisions.md). Kill switch:
// QUIZ_MOBILE_AD_ENABLED in src/data/ads.js.
export default function QuizMobileAd({ refreshKey, className }) {
  if (!QUIZ_MOBILE_AD_ENABLED) return null
  return (
    <AdSlot
      slot={AD_SLOTS.quizMobile}
      refreshKey={refreshKey}
      maxWidth={INLINE_AD_MIN_WIDTH - 1}
      heightClass="h-[100px]"
      showLabel={false}
      className={className}
    />
  )
}
