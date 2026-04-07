// Pass the UK Test — Most Missed Questions
// Curated list of the hardest/most commonly failed questions
// These are questions about specific dates, names, statistics, and obscure facts

export const MOST_MISSED_IDS = [
  // Specific dates — most commonly confused
  5, 12, 18, 22, 30, 35, 46, 52, 58, 63,
  70, 75, 84, 91, 98, 104, 111, 117, 124, 130,
  // Specific names and roles
  138, 145, 152, 159, 166, 173, 180, 187, 194, 201,
  // Statistics and numbers
  208, 215, 222, 229, 236, 243, 250, 257, 264, 271,
  // Arts, culture, sport (most skipped in study)
  278, 285, 292, 299, 306, 313, 320, 327, 334, 341,
  // Tricky double-negatives and "NOT" questions
  348, 355, 362, 369, 376, 383, 390, 397, 404, 411,
]

// Returns the most missed questions from the full question bank
export function getMostMissedQuestions(allQuestions) {
  const idSet = new Set(MOST_MISSED_IDS)
  return allQuestions.filter(q => idSet.has(q.id))
}
