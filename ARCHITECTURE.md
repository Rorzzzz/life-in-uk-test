# PassPort — Architecture Document
# Updated: Uses Next.js App Router. All algorithms are pure functions (no framework deps).
# Load this when working on: GameContext, hooks, state, data flow

---

## 1. DATA FLOW DIAGRAM

```
User Action (answer question)
        │
        ▼
  Component calls
  context.recordAnswer(questionId, wasCorrect, isPractice)
        │
        ▼
  GameContext dispatch({ type: 'RECORD_ANSWER', ... })
        │
        ▼
  gameReducer runs:
  ├── update questionStats[id]
  ├── if isPractice: update streak.todayCount
  ├── calculate new streak (useStreak logic)
  ├── calculate new readiness score
  └── check badge unlocks
        │
        ▼
  New state returned from reducer
        │
        ▼
  useEffect in GameContext detects state change
  → persist to localStorage('passport_v1')
        │
        ├──▶ if XP gained: dispatch XP popup animation
        ├──▶ if badge earned: dispatch badge toast
        └──▶ if level up: dispatch level up animation
```

---

## 2. GAMEREDUCER — COMPLETE SPEC

```js
// src/context/GameContext.jsx

const ACTION_TYPES = {
  RECORD_ANSWER:      'RECORD_ANSWER',
  COMPLETE_CHAPTER:   'COMPLETE_CHAPTER',
  COMPLETE_EXAM:      'COMPLETE_EXAM',
  UNLOCK_BADGE:       'UNLOCK_BADGE',
  SET_SETTING:        'SET_SETTING',
  MARK_ONBOARDED:     'MARK_ONBOARDED',
  RESET_ALL:          'RESET_ALL',        // dev only
  HYDRATE:            'HYDRATE',          // load from localStorage
}

function gameReducer(state, action) {
  switch (action.type) {

    case 'RECORD_ANSWER': {
      const { questionId, wasCorrect, isPractice } = action.payload
      const prev = state.questionStats[questionId] || { correct: 0, attempts: 0 }

      // Update question stats
      const newStats = {
        ...state.questionStats,
        [questionId]: {
          correct: prev.correct + (wasCorrect ? 1 : 0),
          attempts: prev.attempts + 1,
        },
      }

      // XP
      const xpGain = wasCorrect
        ? (prev.attempts === 0 ? 10 : 5)  // 10 first try, 5 after wrong
        : 0
      const newXP = state.xp + xpGain

      // Level check
      const newLevel = getLevelFromXP(newXP)

      // Streak (only practice mode counts)
      const newStreak = isPractice
        ? calculateStreak(state.streak)
        : state.streak

      // Readiness
      const newReadiness = calculateReadiness(newStats, newStreak)

      return {
        ...state,
        xp: newXP,
        level: newLevel,
        questionStats: newStats,
        streak: newStreak,
        readiness: newReadiness,
        // Transient — consumed by UI, then cleared
        _lastXPGain: xpGain,
        _lastAnswerCorrect: wasCorrect,
      }
    }

    case 'COMPLETE_CHAPTER': {
      const { chapterId, score, total } = action.payload
      const prev = state.chapterProgress[chapterId] || { attempts: 0, bestScore: 0 }
      const pct = Math.round((score / total) * 100)
      return {
        ...state,
        xp: state.xp + 25,  // Chapter completion bonus
        level: getLevelFromXP(state.xp + 25),
        chapterProgress: {
          ...state.chapterProgress,
          [chapterId]: {
            attempts: prev.attempts + 1,
            bestScore: Math.max(prev.bestScore, pct),
            lastScore: pct,
          },
        },
      }
    }

    case 'COMPLETE_EXAM': {
      const { score, total, durationSeconds } = action.payload
      const passed = score >= 18
      const perfect = score === 24
      const xpBonus = perfect ? 200 : passed ? 100 : 0
      return {
        ...state,
        xp: state.xp + xpBonus,
        level: getLevelFromXP(state.xp + xpBonus),
        examHistory: [
          { date: new Date().toISOString(), score, total, passed, durationSeconds },
          ...state.examHistory.slice(0, 49),  // Keep last 50
        ],
      }
    }

    case 'UNLOCK_BADGE': {
      if (state.badges.includes(action.payload)) return state  // Already have it
      return { ...state, badges: [...state.badges, action.payload] }
    }

    case 'HYDRATE':
      return { ...DEFAULT_STATE, ...action.payload, version: 1 }

    case 'RESET_ALL':
      return { ...DEFAULT_STATE }

    default:
      return state
  }
}
```

---

## 3. STREAK ALGORITHM

```js
// src/hooks/useStreak.js

function calculateStreak(currentStreak) {
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86_400_000).toDateString()

  const newTodayCount = currentStreak.todayCount + 1

  // Already counted today's streak increment
  if (currentStreak.lastDate === today) {
    return { ...currentStreak, todayCount: newTodayCount }
  }

  // Reached threshold today for first time
  if (newTodayCount >= 5) {
    if (currentStreak.lastDate === yesterday) {
      // Continuing streak
      return { count: currentStreak.count + 1, lastDate: today, todayCount: newTodayCount }
    } else {
      // Starting new streak (or broken)
      return { count: 1, lastDate: today, todayCount: newTodayCount }
    }
  }

  // Haven't hit threshold yet today
  return { ...currentStreak, todayCount: newTodayCount }
}

// Call on app load to check if streak was broken overnight
function checkStreakIntegrity(streak) {
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86_400_000).toDateString()

  if (!streak.lastDate) return streak
  if (streak.lastDate === today || streak.lastDate === yesterday) return streak

  // Streak broken
  return { ...streak, count: 0, todayCount: 0 }
}
```

---

## 4. READINESS SCORE ALGORITHM

```js
// src/hooks/useReadiness.js

function calculateReadiness(questionStats, streak) {
  const entries = Object.values(questionStats)
  const TOTAL_QUESTIONS = 200

  if (entries.length === 0) return 0

  // 1. Accuracy (60% weight)
  // Uses Bayesian average to avoid overconfidence on few attempts
  const PRIOR_ATTEMPTS = 3
  const PRIOR_ACCURACY = 0.5
  const bayesianAccuracy = entries.reduce((sum, q) => {
    const adj = (q.correct + PRIOR_ACCURACY * PRIOR_ATTEMPTS) /
                (q.attempts + PRIOR_ATTEMPTS)
    return sum + adj
  }, 0) / entries.length

  // 2. Coverage (30% weight)
  // How many of the 200 questions have been attempted at least once
  const coverage = Math.min(entries.length / TOTAL_QUESTIONS, 1)

  // 3. Streak bonus (10% weight, max +10 points)
  const streakBonus = Math.min(streak.count * 0.01, 0.1)

  // Final score
  const raw = (bayesianAccuracy * 0.6) + (coverage * 0.3) + (streakBonus * 0.1)
  return Math.min(Math.round(raw * 100), 100)
}
```

---

## 5. WEAK SPOTS ALGORITHM

```js
// src/hooks/useWeakSpots.js

function getWeakSpots(questionStats, allQuestions) {
  return allQuestions
    .map(q => ({
      ...q,
      stats: questionStats[q.id] || { correct: 0, attempts: 0 },
    }))
    .filter(q =>
      q.stats.attempts >= 2 &&                             // Seen at least twice
      q.stats.correct / q.stats.attempts < 0.5            // Getting wrong more than right
    )
    .sort((a, b) => {
      const accA = a.stats.correct / a.stats.attempts
      const accB = b.stats.correct / b.stats.attempts
      return accA - accB  // Worst first
    })
}

// Adaptive question selection for Practice mode
function selectNextQuestion(chapterQuestions, questionStats) {
  // 30% chance to pull from weak spots if any exist
  const weakInChapter = chapterQuestions.filter(q => {
    const s = questionStats[q.id]
    return s && s.attempts >= 2 && s.correct / s.attempts < 0.5
  })

  if (weakInChapter.length > 0 && Math.random() < 0.3) {
    return weakInChapter[Math.floor(Math.random() * weakInChapter.length)]
  }

  // Otherwise random from chapter (prefer unseen questions)
  const unseen = chapterQuestions.filter(q => !questionStats[q.id])
  const pool = unseen.length > 0 ? unseen : chapterQuestions
  return pool[Math.floor(Math.random() * pool.length)]
}
```

---

## 6. LOCALSTORAGE PERSISTENCE

```js
// src/context/GameContext.jsx

const STORAGE_KEY = 'passport_v1'

// Read on mount
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    return migrateState(parsed)
  } catch (err) {
    console.error('[PassPort] Failed to load state:', err)
    return DEFAULT_STATE
  }
}

// Write after every state change
function saveState(state) {
  try {
    // Don't persist transient fields
    const { _lastXPGain, _lastAnswerCorrect, ...persistable } = state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable))
  } catch (err) {
    console.error('[PassPort] Failed to save state:', err)
    // Fail silently — don't crash the app if storage is full
  }
}

// Schema migration
function migrateState(stored) {
  if (!stored?.version) return DEFAULT_STATE           // Corrupted
  if (stored.version === 1) return { ...DEFAULT_STATE, ...stored }
  // Add future migrations here:
  // if (stored.version === 2) return migrateV2toV3(stored)
  return DEFAULT_STATE
}
```

---

## 7. BADGE UNLOCK SYSTEM

```js
// src/hooks/useBadges.js

// Called after every RECORD_ANSWER and COMPLETE_EXAM dispatch
function checkBadgeUnlocks(state, prevBadges) {
  const newBadges = []
  const { questionStats, streak, examHistory, chapterProgress, badges } = state

  const totalAttempted = Object.keys(questionStats).length
  const totalCorrect = Object.values(questionStats).reduce((s, q) => s + q.correct, 0)

  const earn = (id) => {
    if (!badges.includes(id) && !newBadges.includes(id)) newBadges.push(id)
  }

  // Milestone badges
  if (totalAttempted >= 1)   earn('first_steps')
  if (totalAttempted >= 50)  earn('half_century')
  if (totalAttempted >= 200) earn('completionist')

  // Streak badges
  if (streak.count >= 3)  earn('hat_trick')
  if (streak.count >= 7)  earn('on_fire')
  if (streak.count >= 30) earn('dedicated')

  // Exam badges
  const passedExams = examHistory.filter(e => e.passed)
  if (passedExams.length >= 1) earn('mock_master')
  const perfectExams = examHistory.filter(e => e.score === 24)
  if (perfectExams.length >= 1) earn('perfectionist')
  const speedExams = examHistory.filter(e => e.passed && e.durationSeconds < 25 * 60)
  if (speedExams.length >= 1) earn('speed_demon')

  // Chapter mastery badges (80%+ best score)
  const ch = chapterProgress
  if (ch[2]?.bestScore >= 80) earn('historian')   // History chapter
  if (ch[4]?.bestScore >= 80) earn('lawmaker')    // Government chapter
  if (Object.values(ch).filter(c => c.bestScore >= 80).length >= 5) earn('master')

  // Accuracy badges
  if (totalAttempted >= 20 && totalCorrect / totalAttempted >= 0.9) earn('sharp_mind')

  return newBadges
}
```

---

## 8. EXAM MODE STATE MACHINE

```
IDLE ──────────────────────────────────────────────────────────────────▶ REVIEW
  │                                                                        ▲
  │ Start exam                                                             │ Submit
  ▼                                                                        │
ACTIVE                                                                     │
  │                                                                        │
  ├── User selects answer → record locally (no feedback shown)             │
  ├── User flags question → add to flagged set                             │
  ├── User navigates (next/prev) → update currentIndex                     │
  ├── Timer reaches 0 → auto-submit all answered questions                 │
  └── User clicks Submit & confirms → ─────────────────────────────────────┘
                                                                           │
                                                                     RESULT
                                                                     (show score, pass/fail,
                                                                      question review,
                                                                      confetti if passed)
```

**Exam state (local to Exam.jsx, NOT in GameContext until submitted):**
```js
{
  questions: Question[],        // 24 randomly selected questions
  answers: { [index]: Number }, // User's answers (index → option index)
  flagged: Set<Number>,         // Flagged question indices
  currentIndex: Number,
  startTime: Number,            // Date.now() at start
  submitted: Boolean,
  phase: 'idle' | 'active' | 'review' | 'result',
}
```

---

## 9. PRACTICE MODE FLOW

```
Practice (/practice)
  └── ChapterSelect
        └── User picks chapter
              └── Fetch questions for chapter (filtered from questions.js)
                    └── Sort: unseen first, then weak, then random
                          └── QuestionFlow
                                ├── Show QuestionCard
                                ├── User answers
                                ├── Dispatch recordAnswer to GameContext
                                ├── Show ExplanationPanel (slide up)
                                ├── XP popup animation
                                ├── Check badge unlocks
                                └── "Continue" → next question
                                      └── When chapter complete:
                                            └── Dispatch completeChapter
                                                  └── Show chapter result screen
                                                        └── Return to chapter select
```

---

## 10. COMPONENT COMMUNICATION PATTERNS

```
Pages → Components: via props
Components → GameContext: via useContext(GameContext) → dispatch or action helpers
GameContext → Components: via useContext(GameContext) → state
LocalStorage → GameContext: on mount only (HYDRATE action)
GameContext → LocalStorage: via useEffect on state changes

NEVER:
- Lift state above GameContext
- Pass dispatch as prop (use the action helper functions instead)
- Read localStorage in components
- Write localStorage in components
```

---

## 11. QUESTION BANK SELECTION LOGIC

For Practice mode (chapter-based):
```js
function buildPracticeSession(chapterId, questionStats, count = 10) {
  const pool = QUESTIONS.filter(q => q.chapter === chapterId)

  // Bucket 1: Never seen (highest priority)
  const unseen = pool.filter(q => !questionStats[q.id])

  // Bucket 2: Weak (seen ≥2x, accuracy < 50%)
  const weak = pool.filter(q => {
    const s = questionStats[q.id]
    return s && s.attempts >= 2 && s.correct / s.attempts < 0.5
  })

  // Bucket 3: Rest
  const rest = pool.filter(q => {
    const s = questionStats[q.id]
    return s && !(s.attempts >= 2 && s.correct / s.attempts < 0.5)
  })

  // Fill session: 50% unseen, 30% weak, 20% rest (adjust if buckets are small)
  const selected = []
  const addFrom = (bucket, target) => {
    const shuffled = [...bucket].sort(() => Math.random() - 0.5)
    selected.push(...shuffled.slice(0, Math.min(target, bucket.length)))
  }

  addFrom(unseen, Math.ceil(count * 0.5))
  addFrom(weak, Math.ceil(count * 0.3))
  addFrom(rest, count - selected.length)

  // If still short, fill from full pool
  if (selected.length < count) {
    addFrom(pool.filter(q => !selected.includes(q)), count - selected.length)
  }

  return selected.slice(0, count).sort(() => Math.random() - 0.5) // Final shuffle
}
```

For Exam mode (random 24 from all chapters):
```js
function buildExamSession() {
  // Weight by chapter size to match real exam distribution
  return QUESTIONS
    .sort(() => Math.random() - 0.5)
    .slice(0, 24)
}
```
