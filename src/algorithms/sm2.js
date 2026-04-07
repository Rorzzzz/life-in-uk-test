// Pass the UK Test — SM-2+ Spaced Repetition Algorithm
// Based on SM-2 by Piotr Wozniak, extended with response time and mastery states
// Pure functions — no side effects, no imports

// Mastery states
export const MASTERY = {
  UNSEEN:    0,
  ATTEMPTED: 1,
  FAMILIAR:  2,
  LEARNED:   3,
  MASTERED:  4,
}

export const MASTERY_LABELS = ['Unseen', 'Attempted', 'Familiar', 'Learned', 'Mastered']
export const MASTERY_COLOURS = ['#4b5563', '#f59e0b', '#3381ff', '#a855f7', '#22d07a']

// Default per-question state
export function defaultQuestionState() {
  return {
    easeFactor:   2.5,   // SM-2 ease factor (min 1.3)
    interval:     1,     // days until next review
    repetitions:  0,     // consecutive correct answers
    dueDate:      null,  // ISO date string or null (null = due now)
    mastery:      MASTERY.UNSEEN,
    totalAnswered: 0,
    totalCorrect:  0,
    lastResponseMs: null, // last answer time in ms
  }
}

// SM-2+ update
// quality: 0 = wrong, 1 = correct slow, 2 = correct fast
// responseMs: time taken to answer in ms (optional)
export function sm2Update(current, isCorrect, responseMs = null) {
  const q = current ?? defaultQuestionState()
  const totalAnswered = (q.totalAnswered ?? 0) + 1
  const totalCorrect  = (q.totalCorrect ?? 0) + (isCorrect ? 1 : 0)

  // Map isCorrect + response time to SM-2 quality (0–5)
  let quality
  if (!isCorrect) {
    quality = 1
  } else if (responseMs && responseMs < 5000) {
    quality = 5 // very fast correct
  } else if (responseMs && responseMs < 12000) {
    quality = 4
  } else {
    quality = 3
  }

  let { easeFactor, interval, repetitions } = q
  easeFactor = easeFactor ?? 2.5

  if (quality >= 3) {
    // Correct
    if (repetitions === 0)      interval = 1
    else if (repetitions === 1) interval = 6
    else                        interval = Math.round(interval * easeFactor)
    repetitions++
  } else {
    // Incorrect — reset
    repetitions = 0
    interval    = 1
  }

  // Update ease factor
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

  // Calculate next due date
  const due = new Date()
  due.setDate(due.getDate() + interval)
  const dueDate = due.toISOString().split('T')[0]

  // Update mastery level
  const mastery = calcMastery(repetitions, totalAnswered, totalCorrect)

  return {
    easeFactor,
    interval,
    repetitions,
    dueDate,
    mastery,
    totalAnswered,
    totalCorrect,
    lastResponseMs: responseMs,
  }
}

// Derive mastery level from repetitions and accuracy
// Uses Laplace (Bayesian) smoothing: (correct + 1) / (total + 2)
// Prevents 1/1 = 100% inflating mastery — a new learner needs more evidence
export function calcMastery(repetitions, totalAnswered, totalCorrect) {
  if (totalAnswered === 0) return MASTERY.UNSEEN
  const accuracy = (totalCorrect + 1) / (totalAnswered + 2) // Bayesian smoothing
  if (repetitions >= 4 && accuracy >= 0.9) return MASTERY.MASTERED
  if (repetitions >= 2 && accuracy >= 0.7) return MASTERY.LEARNED
  if (repetitions >= 1 && accuracy >= 0.5) return MASTERY.FAMILIAR
  return MASTERY.ATTEMPTED
}

// Returns true if a question is due for review today
export function isDueToday(questionState) {
  if (!questionState || questionState.mastery === MASTERY.UNSEEN) return true
  if (!questionState.dueDate) return true
  const today = new Date().toISOString().split('T')[0]
  return questionState.dueDate <= today
}
