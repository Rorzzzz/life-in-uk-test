// AdSense configuration — single source of truth for manual ad units.
// Slot IDs come from AdSense → Ads → By ad unit. Leave '' until created:
// an empty slot renders nothing in production (dashed placeholder in dev).

export const AD_CLIENT = 'ca-pub-9877949460965281'

export const AD_SLOTS = {
  examInline: '6119884815', // below the question card during a mock test
  results:    '9470479023', // mock-test results screen
  sidebar:    '5544722630', // desktop sticky sidebar (300×600)
}

// Load a fresh in-exam ad every N questions (only on the user's Next click).
// 1 = every question (max revenue), 2 = agreed balance, 4 = conservative.
export const EXAM_AD_REFRESH_EVERY = 1

// In-quiz ads only render at/above this viewport width. On phones the quiz
// auto-scrolls keep the slot off-screen (non-viewable) and placing it in view
// means next to the Next button (accidental clicks) — mobile relies on the
// Auto Ads top anchor instead. Results-screen ads still show on mobile.
export const INLINE_AD_MIN_WIDTH = 768

// On the results screen, insert an ad after every N reviewed wrong answers.
export const RESULTS_AD_EVERY = 5
