'use client'

import AdSlot from '@/components/ui/AdSlot'
import { AD_SLOTS, INLINE_AD_MIN_WIDTH, QUIZ_MOBILE_AD_ENABLED } from '@/data/ads'

// Phones only, directly under a quiz's answer options:
// - before the user answers: "Quiz mobile" small banner (100px box)
// - after they answer: "Quiz mobile large" (250px box, the 300x250 size)
// User's decision 2026-11-05 (permanent, no split test). See research/decisions.md.
// Kill switch: QUIZ_MOBILE_AD_ENABLED in src/data/ads.js.
export default function QuizMobileAd({ refreshKey, answered = false, className }) {
  if (!QUIZ_MOBILE_AD_ENABLED) return null
  return (
    <AdSlot
      slot={answered ? AD_SLOTS.quizMobileLarge : AD_SLOTS.quizMobile}
      refreshKey={`${refreshKey}-${answered ? 'large' : 'small'}`}
      maxWidth={INLINE_AD_MIN_WIDTH - 1}
      heightClass={answered ? 'h-[250px]' : 'h-[100px]'}
      showLabel={false}
      className={className}
    />
  )
}
