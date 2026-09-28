// Each mock test: 1 listening clip (4 Q) + 1 reading passage (4 Q) + 6 vocab + 6 grammar = 20 questions
// Pass mark: 14/20 (70%) — equivalent to IELTS Band 5.5 (B2 threshold)

export const B2_MOCK_TEST_COUNT = 10
export const B2_MOCK_TEST_QUESTIONS = 20
export const B2_MOCK_TEST_PASS_MARK = 14
export const B2_MOCK_TEST_TIME_MINUTES = 25

export const B2_MOCK_TESTS = [
  {
    number: 1,
    title: 'B2 English Mock Test 1',
    listeningClipId: 1,
    readingPassageId: 1,
    vocabIds: [1, 2, 3, 4, 5, 6],
    grammarIds: [1, 2, 3, 4, 5, 6],
    focus: 'Everyday conversations & conditionals',
  },
  {
    number: 2,
    title: 'B2 English Mock Test 2',
    listeningClipId: 2,
    readingPassageId: 2,
    vocabIds: [7, 8, 9, 10, 11, 12],
    grammarIds: [7, 8, 9, 10, 11, 12],
    focus: 'Housing & passive voice',
  },
  {
    number: 3,
    title: 'B2 English Mock Test 3',
    listeningClipId: 3,
    readingPassageId: 3,
    vocabIds: [13, 14, 15, 16, 17, 18],
    grammarIds: [13, 14, 15, 16, 17, 18],
    focus: 'Social situations & reported speech',
  },
  {
    number: 4,
    title: 'B2 English Mock Test 4',
    listeningClipId: 4,
    readingPassageId: 4,
    vocabIds: [19, 20, 21, 22, 23, 24],
    grammarIds: [19, 20, 21, 22, 23, 24],
    focus: 'Daily life & modal verbs',
  },
  {
    number: 5,
    title: 'B2 English Mock Test 5',
    listeningClipId: 5,
    readingPassageId: 5,
    vocabIds: [25, 26, 27, 28, 29, 30],
    grammarIds: [25, 26, 27, 28, 29, 30],
    focus: 'Community & linking words',
  },
  {
    number: 6,
    title: 'B2 English Mock Test 6',
    listeningClipId: 6,
    readingPassageId: 6,
    vocabIds: [31, 32, 33, 34, 35, 36],
    grammarIds: [31, 32, 33, 34, 35, 36],
    focus: 'Environment & conditionals',
  },
  {
    number: 7,
    title: 'B2 English Mock Test 7',
    listeningClipId: 7,
    readingPassageId: 7,
    vocabIds: [37, 38, 39, 40, 41, 42],
    grammarIds: [37, 38, 39, 40, 41, 42],
    focus: 'Culture & passive constructions',
  },
  {
    number: 8,
    title: 'B2 English Mock Test 8',
    listeningClipId: 8,
    readingPassageId: 8,
    vocabIds: [43, 44, 45, 46, 47, 48],
    grammarIds: [43, 44, 45, 46, 47, 48],
    focus: 'Workplace & reported speech',
  },
  {
    number: 9,
    title: 'B2 English Mock Test 9',
    listeningClipId: 9,
    readingPassageId: 9,
    vocabIds: [49, 50, 51, 52, 53, 54],
    grammarIds: [49, 50, 51, 52, 53, 54],
    focus: 'Academic contexts & modal verbs',
  },
  {
    number: 10,
    title: 'B2 English Mock Test 10',
    listeningClipId: 10,
    readingPassageId: 10,
    vocabIds: [55, 56, 57, 58, 59, 60],
    grammarIds: [55, 56, 57, 58, 59, 60],
    focus: 'Mixed skills & grammar range',
  },
]

export function getB2MockTest(number) {
  return B2_MOCK_TESTS.find(t => t.number === number) ?? null
}
