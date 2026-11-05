// AdSense configuration — single source of truth for manual ad units.
// Slot IDs come from AdSense → Ads → By ad unit. Leave '' until created:
// an empty slot renders nothing in production (dashed placeholder in dev).

export const AD_CLIENT = 'ca-pub-9877949460965281'

export const AD_SLOTS = {
  examInline: '6119884815', // below the question card during a mock test
  results:    '9470479023', // mock-test results screen
  sidebar:    '5544722630', // desktop sticky sidebar (300×600)
  quizMobile: '6823972680', // phones only: in quiz flows, below the answers (small, 100px)
  multiplex: '5362164896', // 'Content end multiplex': grid at the END of articles, cheat sheet, mock-test review (MultiplexAd)
  quizMobileLarge: '6327762206', // phones only: replaces quizMobile once the user has answered (300x250 class, 250px)
  contentInline: '7534244111', // content + tool pages (ContentAd): in the text, away from controls
}

// Load a fresh in-exam ad every N questions (only on the user's Next click).
// 1 = every question (max revenue), 2 = agreed balance, 4 = conservative.
export const EXAM_AD_REFRESH_EVERY = 1

// In-quiz ads only render at/above this viewport width. On phones the quiz
// auto-scrolls keep the slot off-screen (non-viewable) and placing it in view
// means next to the Next button (accidental clicks) — mobile relies on the
// Auto Ads top anchor instead. Results-screen ads still show on mobile.
export const INLINE_AD_MIN_WIDTH = 768

// Phones (< INLINE_AD_MIN_WIDTH) get the "Quiz mobile" unit instead: shown from
// the start of each question, below a 150px non-clickable strip under the answers;
// the explanation (and Next, >=150px away) appears below it. Small 100px box keeps mobile ad
// density well under the Better Ads 30% limit alongside the top anchor.
// Kill switch: set to false if this unit's CTR goes above ~2–3%.
export const QUIZ_MOBILE_AD_ENABLED = true // user overrode the policy-officer veto 2026-11-04; see research/decisions.md

// On the results screen, insert an ad after every N reviewed wrong answers.
export const RESULTS_AD_EVERY = 5
