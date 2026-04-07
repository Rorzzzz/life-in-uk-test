# PassPort — Adaptive Learning Model
# ADAPTIVE_LEARNING.md
# Load when working on: useAdaptive.js, question selection, spaced repetition, session building

---

## WHY THIS EXISTS

The v1 spec used a naive weak-spots system: "show wrong questions 30% more often."
This is better than nothing, but it has serious flaws:
- Questions answered correctly once get shown less, even if the user will forget within days
- No forgetting curve — we ignore the passage of time entirely
- No difficulty progression — users never get appropriately challenged
- Questions learned together always resurface together (anti-pattern)
- No "mastery" definition — the system never tells users a question is truly learned
- No session optimisation — sessions are random length with random topic mix

This document specifies a production adaptive learning system based on:
- SM-2+ spaced repetition (Anki/SuperMemo algorithm + BlueRaja improvements)
- Ebbinghaus forgetting curve (decay over time)
- Item Response Theory (difficulty calibration)
- Duolingo's key insight: track learning AND engagement, not just accuracy

The full system runs entirely in localStorage — zero backend needed.

---

## 1. CORE CONCEPTS

### 1.1 The Forgetting Curve
Hermann Ebbinghaus (1885) proved memory decays exponentially without reinforcement:

```
recall_probability = e^(-time / half_life)

Where:
  time      = days since last review
  half_life = how long before there's 50% chance of forgetting
              (varies per person AND per question)
```

Our system approximates this without full ML: we track each question's stability
(how long until forgetting) and update it based on performance.

### 1.2 Card States (like Anki)
Every question in a user's session exists in one of 4 states:

```
NEW         → Never seen before
LEARNING    → Seen but not yet mastered (interval < 1 day)
REVIEW      → Mastered, scheduled for future review
RELEARNING  → Was mastered, then forgotten — back to learning phase
```

### 1.3 Ease Factor
Each question has a personal ease factor (1.3–3.0) that represents how easy
THIS question is for THIS user. Starts at 2.5 (neutral). Goes down when answered
wrong, up when answered confidently correct.

Lower ease = shown more often. Higher ease = shown less often.
Minimum 1.3 — below this, the question is too hard for effective SRS and should
be flagged for the user to re-read the study guide.

### 1.4 Interval
How many days until the question should next appear.

```
First correct:    interval = 1 day
Second correct:   interval = 6 days
Subsequent:       interval = prevInterval * easeFactor (rounded to nearest day)
Wrong answer:     interval = 1 (reset to learning phase)
```

With randomisation: `finalInterval = interval * (0.95 + Math.random() * 0.1)`
This prevents questions learned together from always appearing together.

---

## 2. PER-QUESTION STATE (stored in localStorage)

```js
// Shape stored in questionStats[questionId]
{
  // Core SM-2 fields
  easeFactor: 2.5,           // 1.3–3.0. Lower = harder for this user
  interval: 0,               // Days until next review (0 = due now)
  repetitions: 0,            // Consecutive correct answers
  dueDate: null,             // ISO date string or null (null = NEW, show immediately)
  state: 'new',              // 'new' | 'learning' | 'review' | 'relearning'

  // History tracking
  correct: 0,                // Total correct answers
  attempts: 0,               // Total attempts
  lastSeen: null,            // Timestamp of last answer
  history: [],               // Last 10 results: [{ts, correct, responseMs}]
                             // responseMs = how long they took to answer

  // Derived (recalculated, not stored — computed on read)
  // accuracy: correct / attempts
  // isOverdue: dueDate < today
  // daysSinceDue: today - dueDate
}
```

---

## 3. SM-2+ ALGORITHM (src/algorithms/sm2.js)

```js
/**
 * SM-2+ Spaced Repetition Algorithm
 * Based on SuperMemo SM-2 with BlueRaja improvements:
 * - percentOverdue bonus for items reviewed late
 * - Randomised intervals to prevent clustering
 * - Minimum ease floor at 1.3
 *
 * @param {Object} card - Current card state
 * @param {boolean} wasCorrect - Did user answer correctly?
 * @param {number} responseMs - Time taken to answer in milliseconds
 * @returns {Object} Updated card state
 */
export function reviewCard(card, wasCorrect, responseMs) {
  const today = getDaysSinceEpoch()
  const lastReview = card.dueDate
    ? Math.floor(new Date(card.dueDate).getTime() / DAY_MS) - card.interval
    : today

  // Calculate how overdue this card is (0.0 = on time, 1.0 = one full interval overdue)
  const daysSinceLastReview = today - lastReview
  const percentOverdue = card.interval > 0
    ? Math.min(daysSinceLastReview / card.interval, 2) // Cap at 2x overdue
    : 0

  // Performance rating: 1.0 = instant correct, 0.0 = wrong
  // Fast correct answers (< 3s) get slight bonus
  const performanceRating = wasCorrect
    ? Math.min(1.0, 0.7 + (3000 - Math.min(responseMs, 3000)) / 10000)
    : 0.0

  if (!wasCorrect) {
    // Wrong answer: reset to learning phase
    return {
      ...card,
      easeFactor: Math.max(1.3, card.easeFactor - 0.2),
      interval: 1,
      repetitions: 0,
      state: card.repetitions > 0 ? 'relearning' : 'learning',
      dueDate: getDateFromEpoch(today + 1),
      correct: card.correct,
      attempts: card.attempts + 1,
      lastSeen: new Date().toISOString(),
      history: [...card.history.slice(-9), { ts: Date.now(), correct: false, responseMs }],
    }
  }

  // Correct answer
  const newRepetitions = card.repetitions + 1
  let newInterval, newEaseFactor

  if (newRepetitions === 1) {
    newInterval = 1
  } else if (newRepetitions === 2) {
    newInterval = 6
  } else {
    // SM-2 formula with percentOverdue bonus
    const baseInterval = Math.round(card.interval * card.easeFactor)
    const overdueBonus = Math.round(card.interval * percentOverdue * 0.1)
    newInterval = baseInterval + overdueBonus
  }

  // Ease factor update: reward fast/confident correct, penalise slow
  const easeDelta = 0.1 - (1.0 - performanceRating) * 0.4
  newEaseFactor = Math.min(3.0, Math.max(1.3, card.easeFactor + easeDelta))

  // Add ±5% randomness to interval (prevents clustering)
  const jitter = 0.95 + Math.random() * 0.1
  const finalInterval = Math.max(1, Math.round(newInterval * jitter))

  return {
    ...card,
    easeFactor: newEaseFactor,
    interval: finalInterval,
    repetitions: newRepetitions,
    state: finalInterval >= 21 ? 'review' : 'learning', // 'review' once interval ≥ 3 weeks
    dueDate: getDateFromEpoch(today + finalInterval),
    correct: card.correct + 1,
    attempts: card.attempts + 1,
    lastSeen: new Date().toISOString(),
    history: [...card.history.slice(-9), { ts: Date.now(), correct: true, responseMs }],
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000

function getDaysSinceEpoch() {
  return Math.floor(Date.now() / DAY_MS)
}

function getDateFromEpoch(daysSinceEpoch) {
  return new Date(daysSinceEpoch * DAY_MS).toISOString().split('T')[0]
}

/**
 * Check if a card is due for review today
 */
export function isCardDue(card) {
  if (card.state === 'new' || !card.dueDate) return true
  return card.dueDate <= new Date().toISOString().split('T')[0]
}

/**
 * Days overdue (negative = not due yet)
 */
export function daysOverdue(card) {
  if (!card.dueDate) return 0
  const today = getDaysSinceEpoch()
  const due = Math.floor(new Date(card.dueDate).getTime() / DAY_MS)
  return today - due
}

/**
 * Mastery check: a question is "mastered" when:
 * - interval ≥ 21 days (shown less than once every 3 weeks)
 * - repetitions ≥ 4 (correct at least 4 times in a row)
 * - easeFactor ≥ 2.0 (not struggling with it)
 */
export function isMastered(card) {
  return (
    card.interval >= 21 &&
    card.repetitions >= 4 &&
    card.easeFactor >= 2.0
  )
}

/**
 * Initialise a new card state (call when user first encounters a question)
 */
export function newCardState() {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: null,
    state: 'new',
    correct: 0,
    attempts: 0,
    lastSeen: null,
    history: [],
  }
}
```

---

## 4. SESSION BUILDER (src/algorithms/sessionBuilder.js)

Builds an optimal practice session for a user, given their current question stats.
This is the brain of adaptive learning — it decides WHAT to show and WHEN.

```js
import { isCardDue, daysOverdue, isMastered, newCardState } from './sm2.js'
import { QUESTIONS } from '../data/questions.js'

/**
 * Build an adaptive practice session
 *
 * Priority order (hard rule — not random):
 * 1. OVERDUE reviews (questions past their due date) — max 5 per session
 * 2. RELEARNING cards (just got wrong, need immediate reinforcement) — all of them
 * 3. NEW questions (never seen) — up to fill remaining slots
 * 4. DUE TODAY reviews (on schedule) — fill any remaining slots
 *
 * @param {Object} questionStats - Full questionStats from game state
 * @param {Object} options
 * @param {number} options.chapterId - If set, restrict to this chapter
 * @param {number} options.sessionSize - Target session size (default 10)
 * @param {string} options.mode - 'practice' | 'review' | 'weak' | 'new-only'
 * @returns {Question[]} Ordered list of questions for this session
 */
export function buildSession(questionStats, options = {}) {
  const {
    chapterId = null,
    sessionSize = 10,
    mode = 'practice',
  } = options

  const pool = chapterId
    ? QUESTIONS.filter(q => q.chapter === chapterId)
    : QUESTIONS

  // Enrich questions with their current card state
  const enriched = pool.map(q => ({
    ...q,
    card: questionStats[q.id] || newCardState(),
  }))

  if (mode === 'new-only') {
    return shuffle(enriched.filter(q => q.card.state === 'new')).slice(0, sessionSize)
  }

  if (mode === 'weak') {
    // Weak spots: wrong more than right, OR overdue by > 7 days
    const weak = enriched
      .filter(q => {
        const acc = q.card.attempts > 0 ? q.card.correct / q.card.attempts : null
        return (acc !== null && acc < 0.5 && q.card.attempts >= 2) ||
               daysOverdue(q.card) > 7
      })
      .sort((a, b) => {
        // Sort: most overdue + worst accuracy first
        const overdueA = Math.max(0, daysOverdue(a.card))
        const overdueB = Math.max(0, daysOverdue(b.card))
        const accA = a.card.attempts > 0 ? a.card.correct / a.card.attempts : 0.5
        const accB = b.card.attempts > 0 ? b.card.correct / b.card.attempts : 0.5
        return (overdueB + (1 - accB) * 10) - (overdueA + (1 - accA) * 10)
      })
    return weak.slice(0, sessionSize)
  }

  // 'practice' mode — the main adaptive session
  const buckets = {
    overdue:    [],  // Past due date by > 0 days
    relearning: [],  // Currently in relearning phase
    dueToday:   [],  // Due today exactly
    new:        [],  // Never seen
    upcoming:   [],  // Not due yet (used to fill very short queues)
  }

  for (const q of enriched) {
    if (isMastered(q.card)) continue // Skip mastered questions unless in review mode

    if (q.card.state === 'relearning') {
      buckets.relearning.push(q)
    } else if (q.card.state === 'new') {
      buckets.new.push(q)
    } else if (daysOverdue(q.card) > 0) {
      buckets.overdue.push(q)
    } else if (isCardDue(q.card)) {
      buckets.dueToday.push(q)
    } else {
      buckets.upcoming.push(q)
    }
  }

  // Sort overdue by most overdue first
  buckets.overdue.sort((a, b) => daysOverdue(b.card) - daysOverdue(a.card))

  // Sort upcoming by soonest due date (for fill-in)
  buckets.upcoming.sort((a, b) =>
    new Date(a.card.dueDate) - new Date(b.card.dueDate)
  )

  // Build session with priority ordering
  const session = []

  const addFromBucket = (bucket, max) => {
    const shuffled = shuffle([...bucket])
    const toAdd = shuffled.slice(0, max)
    session.push(...toAdd)
  }

  // 1. All relearning (must do these — they're just answered wrong)
  session.push(...buckets.relearning)

  // 2. Up to 5 most overdue
  addFromBucket(buckets.overdue, Math.min(5, sessionSize - session.length))

  // 3. New questions (up to 40% of session)
  const newSlots = Math.floor(sessionSize * 0.4)
  addFromBucket(buckets.new, Math.min(newSlots, sessionSize - session.length))

  // 4. Due today (fill remaining slots)
  addFromBucket(buckets.dueToday, sessionSize - session.length)

  // 5. If still short, pull from upcoming
  if (session.length < sessionSize) {
    addFromBucket(buckets.upcoming, sessionSize - session.length)
  }

  // Final shuffle (keeps a bit of unpredictability within priority tiers)
  return shuffle(session).slice(0, sessionSize)
}

/**
 * Build exam session — 24 random questions weighted by chapter distribution
 * Based on official test: roughly equal mix from all chapters
 */
export function buildExamSession() {
  // Stratified sampling: ensure all 5 chapters represented
  const byChapter = {}
  for (const q of QUESTIONS) {
    if (!byChapter[q.chapter]) byChapter[q.chapter] = []
    byChapter[q.chapter].push(q)
  }

  const session = []
  const targets = { 1: 4, 2: 8, 3: 5, 4: 5, 5: 2 } // = 24, weighted by chapter size
  for (const [chapter, count] of Object.entries(targets)) {
    const pool = shuffle(byChapter[chapter] || [])
    session.push(...pool.slice(0, count))
  }

  return shuffle(session) // Final shuffle so chapter order is random
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
```

---

## 5. DIFFICULTY CALIBRATION (IRT-lite)

Each question in the question bank has a `difficulty` field ('easy'|'medium'|'hard').
We use this + the user's performance to set the initial ease factor:

```js
// Called when a user first encounters a question (state = 'new')
function getInitialEaseFactor(questionDifficulty) {
  return {
    easy:   2.8,  // Start generous — less frequent review
    medium: 2.5,  // Standard neutral start
    hard:   2.1,  // Start conservative — more frequent review
  }[questionDifficulty] || 2.5
}
```

After 5+ reviews, the system's measured ease factor for that user overrides
the initial difficulty setting entirely. The algorithm self-calibrates.

**Dynamic difficulty detection:**
If a question's measured ease drops below 1.6 after 4+ attempts, flag it:
```js
function isTooHard(card) {
  return card.easeFactor < 1.6 && card.attempts >= 4
}
// If isTooHard: show "This topic might need more reading" link to study guide
```

---

## 6. MASTERY SYSTEM

### Mastery levels per question
```
0 — Unseen         (grey)  → never attempted
1 — Attempted      (red)   → attempts > 0 but accuracy < 50%
2 — Familiar       (amber) → accuracy >= 50%, interval < 7 days
3 — Learned        (blue)  → accuracy >= 70%, interval >= 7 days
4 — Mastered       (green) → isMastered() = true (interval ≥ 21d, reps ≥ 4, ease ≥ 2.0)
```

```js
export function getMasteryLevel(card) {
  if (!card || card.attempts === 0) return 0
  const acc = card.correct / card.attempts
  if (isMastered(card)) return 4
  if (acc >= 0.7 && card.interval >= 7) return 3
  if (acc >= 0.5) return 2
  return 1
}
```

### Chapter mastery
A chapter is "mastered" when ≥85% of its questions are at mastery level 3 or 4.

```js
export function getChapterMastery(chapterId, questionStats) {
  const chapterQs = QUESTIONS.filter(q => q.chapter === chapterId)
  const mastered = chapterQs.filter(q => {
    const card = questionStats[q.id]
    return card && getMasteryLevel(card) >= 3
  })
  return Math.round((mastered.length / chapterQs.length) * 100)
}
```

---

## 7. READINESS SCORE (UPDATED)

The readiness score now incorporates the spaced repetition data for a much more
accurate picture of actual exam readiness:

```js
// src/algorithms/readiness.js

export function calculateReadiness(questionStats) {
  const allQs = QUESTIONS
  const TOTAL = allQs.length

  // Component 1: Coverage (30% weight)
  // What % of questions have been attempted at least once?
  const attempted = Object.keys(questionStats).length
  const coverage = attempted / TOTAL

  // Component 2: Mastery distribution (50% weight)
  // Weighted average across mastery levels
  const masteryWeights = { 0: 0, 1: 0.1, 2: 0.4, 3: 0.75, 4: 1.0 }
  const masteryScore = allQs.reduce((sum, q) => {
    const card = questionStats[q.id]
    const level = getMasteryLevel(card)
    return sum + masteryWeights[level]
  }, 0) / TOTAL

  // Component 3: Due card health (20% weight)
  // Are scheduled reviews up to date, or is the user ignoring the system?
  const dueCards = allQs.filter(q => {
    const card = questionStats[q.id]
    return card && isCardDue(card) && !isMastered(card)
  })
  const dueHealth = attempted > 0
    ? Math.max(0, 1 - (dueCards.length / Math.max(attempted, 1)) * 0.5)
    : 1

  // Final score
  const raw = (coverage * 0.3) + (masteryScore * 0.5) + (dueHealth * 0.2)
  return Math.min(Math.round(raw * 100), 100)
}
```

---

## 8. DAILY REVIEW QUEUE (Home Page Feature)

The home page shows a "Reviews due today" count — this is a key engagement driver.

```js
// src/algorithms/getDueToday.js

export function getDueTodayCount(questionStats) {
  return QUESTIONS.filter(q => {
    const card = questionStats[q.id]
    return card && isCardDue(card) && !isMastered(card)
  }).length
}

export function getNewCardsAvailable(questionStats) {
  return QUESTIONS.filter(q => !questionStats[q.id]).length
}

// Used for home page dashboard cards:
// "7 reviews due" (overdue + due today)
// "12 new questions available" (never seen)
// "34 cards mastered" (isMastered = true)
```

---

## 9. INTEGRATION WITH GAMEREDUCER

The `RECORD_ANSWER` action in `gameReducer` must now call `reviewCard()`:

```js
case 'RECORD_ANSWER': {
  const { questionId, wasCorrect, responseMs, isPractice } = action.payload

  // Get current card state (or initialise new)
  const prevCard = state.questionStats[questionId] || {
    ...newCardState(),
    easeFactor: getInitialEaseFactor(
      QUESTIONS.find(q => q.id === questionId)?.difficulty || 'medium'
    ),
  }

  // Apply SM-2+ algorithm
  const updatedCard = reviewCard(prevCard, wasCorrect, responseMs)

  const newStats = {
    ...state.questionStats,
    [questionId]: updatedCard,
  }

  // XP calculation (unchanged from CLAUDE.md)
  const xpGain = wasCorrect
    ? (prevCard.attempts === 0 ? 10 : 5)
    : 0

  // Readiness recalculation (now uses improved algorithm)
  const newReadiness = calculateReadiness(newStats)

  // Streak (only practice mode)
  const newStreak = isPractice ? calculateStreak(state.streak) : state.streak

  return {
    ...state,
    xp: state.xp + xpGain,
    level: getLevelFromXP(state.xp + xpGain),
    questionStats: newStats,
    readiness: newReadiness,
    streak: newStreak,
    _lastXPGain: xpGain,
    _lastAnswerCorrect: wasCorrect,
    _responseMs: responseMs,
  }
}
```

---

## 10. UI CHANGES REQUIRED BY ADAPTIVE MODEL

### Home page additions
```
┌─────────────────────────┐
│  Readiness: 67%  ring   │
│                         │
│  📋 7 reviews due       │  ← getDueTodayCount()
│  ✨ 12 new questions    │  ← getNewCardsAvailable()
│  ✅ 34 mastered         │  ← count where isMastered()
│                         │
│  [Start daily review]   │  ← builds session: mode='practice'
│  [Practice new]         │  ← builds session: mode='new-only'
└─────────────────────────┘
```

### Practice page changes
- Chapter cards now show **mastery %** (not just "completed/not completed")
- Chapter card colour fills in as mastery increases (0% grey → 100% full colour)
- "Next review in X days" shown on completed chapter cards
- Warning indicator if overdue reviews exist for a chapter

### Question card changes
- Response time is measured from render to answer click: `const startTime = Date.now()`
- Pass `responseMs: Date.now() - startTime` to `recordAnswer()`
- After answering, ExplanationPanel shows current mastery level for this question:
  ```
  ✓ Correct! This question is now scheduled for review in 6 days.
  ```
  or:
  ```
  ✗ Not quite. You'll see this again soon to help it stick.
  ```

### Progress page additions
```
Mastery Distribution section:
  ████████░░░░  Mastered (34)  17%
  ████████████  Learned  (67)  33%
  ██████░░░░░░  Familiar (41)  20%
  ████░░░░░░░░  Attempted(28)  14%
  ██░░░░░░░░░░  Unseen   (30)  15%

Chapter mastery heatmap: (colour = mastery %, 5 boxes)
  [■■■■□] Chapter 1 — 78% mastered
  [■■□□□] Chapter 2 — 41% mastered
  [■■■□□] Chapter 3 — 62% mastered
  [■□□□□] Chapter 4 — 22% mastered
  [■■■■■] Chapter 5 — 91% mastered
```

---

## 11. PERSISTENCE SCHEMA CHANGES

Add to questionStats shape:
```js
// Old:
questionStats: { [id]: { correct: 0, attempts: 0 } }

// New:
questionStats: {
  [id]: {
    // SM-2 fields
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: null,
    state: 'new',
    // History
    correct: 0,
    attempts: 0,
    lastSeen: null,
    history: [],     // Last 10 [{ts, correct, responseMs}]
  }
}
```

**Migration:** On load, if a `questionStats` entry only has `{ correct, attempts }`,
convert to new shape with `newCardState()` values, preserving correct/attempts.

```js
function migrateQuestionStats(oldStats) {
  const migrated = {}
  for (const [id, stat] of Object.entries(oldStats)) {
    if ('easeFactor' in stat) {
      migrated[id] = stat // Already new format
    } else {
      // Old format — upgrade
      migrated[id] = {
        ...newCardState(),
        correct: stat.correct || 0,
        attempts: stat.attempts || 0,
        // Estimate ease from historical accuracy
        easeFactor: stat.attempts > 0
          ? Math.max(1.3, Math.min(3.0, 2.5 - (1 - stat.correct / stat.attempts)))
          : 2.5,
      }
    }
  }
  return migrated
}
```

---

## 12. ALGORITHM FILES TO CREATE

```
src/
└── algorithms/
    ├── sm2.js              ← Core SM-2+ algorithm (reviewCard, isMastered, etc.)
    ├── sessionBuilder.js   ← buildSession(), buildExamSession()
    ├── readiness.js        ← calculateReadiness() (improved version)
    ├── mastery.js          ← getMasteryLevel(), getChapterMastery()
    └── getDueToday.js      ← getDueTodayCount(), getNewCardsAvailable()
```

All pure functions — no side effects, no context dependencies.
Testable in isolation: `import { reviewCard } from '../algorithms/sm2.js'`

---

## 13. WHAT THIS ACHIEVES VS V1 SPEC

| Feature | V1 (naive) | V2 (SM-2+ adaptive) |
|---|---|---|
| Wrong answer handling | Show 30% more often | Reset interval, relearning phase |
| Correct answer handling | Show less often (vague) | Exponentially increasing intervals |
| Forgetting curve | Ignored | Tracked via interval + due dates |
| Time-based review | None | Daily queue of due cards |
| Mastery definition | None | Mathematically defined (4 levels) |
| Question clustering | Random | ±5% jitter prevents clustering |
| Difficulty adaptation | Static | easeFactor self-calibrates per user |
| Session composition | Random (weak bias) | Prioritised: relearning > overdue > new > due |
| Readiness score | Crude accuracy/coverage | Mastery distribution + due health |
| Home page engagement | Static CTA | "7 reviews due today" drives daily return |

This is the same category of algorithm that powers Anki, which has been used
by millions of medical students to pass board exams. For a citizenship test with
200 discrete facts, it's the gold standard approach.
