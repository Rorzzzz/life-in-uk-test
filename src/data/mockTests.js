// Pass the UK Test — Mock Test Generator
// 45 unique mock tests, each 24 questions drawn from all 570 questions
// Real exam: 24 questions, 45 minutes, pass mark = 18/24 (75%)

import { QUESTIONS } from './questions'

export const MOCK_TEST_COUNT = 45
export const MOCK_TEST_NUMBERS = Array.from({ length: MOCK_TEST_COUNT }, (_, i) => i + 1)
export const EXAM_QUESTION_COUNT = 24
export const EXAM_PASS_MARK = 18
export const EXAM_DURATION_SECONDS = 45 * 60 // 45 minutes

// Seeded shuffle — deterministic per test number so the same test always has the same Qs
function seededShuffle(arr, seed) {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Returns 24 questions for a given test number (1–45)
// Stratified by chapter to mirror the real exam distribution
export function getMockTest(testNumber) {
  if (testNumber < 1 || testNumber > MOCK_TEST_COUNT) return []

  const seed = testNumber * 31337

  // Chapter distribution targets (approximate real exam):
  // Ch1 (Values): 2, Ch2 (What is UK): 3, Ch3 (History): 10, Ch4 (Society): 5, Ch5 (Gov): 4
  const distribution = { 1: 2, 2: 3, 3: 10, 4: 5, 5: 4 }

  const byChapter = {}
  for (let ch = 1; ch <= 5; ch++) {
    byChapter[ch] = seededShuffle(
      QUESTIONS.filter(q => q.chapter === ch),
      seed + ch
    ).slice(0, distribution[ch])
  }

  const selected = Object.values(byChapter).flat()
  return seededShuffle(selected, seed + 99)
}

// Returns metadata for a mock test page
export function getMockTestMeta(testNumber) {
  return {
    title: `Life in the UK Mock Test ${testNumber}: 24 Questions, 45 Minutes (Free 2026)`,
    description: `Recreate real exam conditions with 24 timed questions. See your score instantly and review every answer — completely free, no account needed. Test ${testNumber} of 45.`,
    canonical: `https://passtheuktest.co.uk/mock-test/${testNumber}`,
  }
}
