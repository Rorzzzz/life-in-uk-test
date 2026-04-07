# Gamification Audit
# Usage: /gamification-audit

Audit the full codebase for correct gamification implementation.

XP SYSTEM — check gameReducer in GameContext.jsx
- RECORD_ANSWER (correct, first try): +10 XP
- RECORD_ANSWER (correct, after wrong): +5 XP
- RECORD_ANSWER (wrong): 0 XP (never negative)
- COMPLETE_CHAPTER dispatch: +25 XP bonus
- COMPLETE_EXAM dispatch (passed ≥18): +100 XP
- COMPLETE_EXAM dispatch (perfect 24): +200 XP
- XPPopup animation fires when xpGain > 0

STREAK — check useStreak.js and gameReducer
- todayCount increments on practice answers only (not exam review)
- Streak.count increments when todayCount reaches 5 for first time today
- Streak resets to 1 (not 0) on first practice after broken
- checkStreakIntegrity() called on app load
- Fire emoji shown when streak > 3

READINESS SCORE — check useReadiness.js
- Bayesian accuracy used (not raw accuracy)
- Coverage component: questionsAttempted / 200
- Streak bonus: capped at 10 points
- Updates after every recordAnswer dispatch
- "Ready to book!" message shown at ≥ 80%

WEAK SPOTS — check useWeakSpots.js
- Weak = attempts ≥ 2 AND accuracy < 0.5
- Sorted worst-first on WeakSpots page
- 30% boost in Practice question selection

BADGES — check useBadges.js
- All 13 badge IDs can be triggered
- No badge triggers twice (state.badges check)
- Toast fires on unlock
- Locked badges shown as silhouettes on Progress page

Report: any missing implementations with exact file/function/line where fix is needed.
