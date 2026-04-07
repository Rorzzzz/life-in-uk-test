# PassPort — Programmatic SEO & Growth Layer
# Load this when building: mock test pages, topic pages, special pages, analytics, sharing

---

## WHAT THIS FILE COVERS

Everything from the feedback document + competitor analysis gaps:

1. Programmatic mock test pages (`/mock-test/1` → `/mock-test/45`) — expanded to 45
2. Topic hub pages (`/topic/british-history` etc.)
3. Special high-value pages (`/hardest-questions`, `/most-missed-questions`, `/2026-test-prep`)
4. Daily 5 Questions feature (no login, habit loop)
5. Shareable results pages + PDF export
6. Analytics event tracking spec (PostHog)
7. The full programmatic URL map (now 700+ indexed pages)
8. Content rules for programmatic pages (no thin pages)

### FROM COMPETITOR ANALYSIS — 7 GAPS NOW SPECCED IN SECTIONS 12–18:
Gap 1: Audio narration on every question (Web Speech API — Britizen has it)
Gap 2: Test centres page with map (lifeintheuktestweb has it — high-intent SEO)
Gap 3: FAQ page with 30+ answered questions (both top competitors have it)
Gap 4: Cheat sheet — all key dates/facts on one page (Britizen has it)
Gap 5: 45 mock tests not 23 (all competitors have more than 23)
Gap 6: PDF export of completed test (Britizen has it — window.print())
Gap 7: "How to pass" guide page (lifeintheuktest.com does this well)

---

## 1. PROGRAMMATIC MOCK TEST PAGES

### Why this is a massive SEO win
Each mock test page is a unique indexable URL containing real question content.
A user who searches "life in the uk test mock exam 3" finds `/mock-test-3` which has
24 real questions visible in the HTML. Google indexes those questions, those
explanations. 23 mock tests = 23 unique pages × 24 questions each = 552 more
pieces of content Google can index.

### The page structure: `/mock-test/[number]`

```
/mock-test/1      ← Mock Test 1 — Chapter 1 & 2 focus
/mock-test/2      ← Mock Test 2 — History focus
/mock-test/3      ← Mock Test 3 — Mixed (mimics real exam)
...
/mock-test/45     ← Mock Test 45 — Final practice
```

WHY 45 NOT 23: All three top competitors have 40–57 tests. Each test is a unique
indexed page. With 570 questions we can generate 45 tests with zero full repeats.
45 tests × 24 questions = 1,080 question slots, which fits inside our 570 bank
when questions appear in 1–2 tests each. Adjust the seeded shuffle to allow
controlled overlap only after test 24.

**How to generate mock tests deterministically:**
```js
// src/data/mockTests.js
import { QUESTIONS } from './questions'

// Each mock test is a fixed, pre-seeded selection of 24 questions
// NEVER randomly generated — must be deterministic for SSG
// Uses a seeded shuffle so each test number always produces the same 24 questions

function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getMockTest(number) {
  // number: 1–23
  // Each test: 24 questions, seeded by test number
  // Weighted: ~30% history, ~25% govt/law, ~20% society, ~15% values, ~10% what is UK
  // (mirrors the real exam distribution)
  const history    = QUESTIONS.filter(q => q.chapter === 3)
  const govt       = QUESTIONS.filter(q => q.chapter === 5)
  const society    = QUESTIONS.filter(q => q.chapter === 4)
  const values     = QUESTIONS.filter(q => q.chapter === 1)
  const whatIsUK   = QUESTIONS.filter(q => q.chapter === 2)

  const seed = number * 7919 // prime multiplier — different enough per test

  const selected = [
    ...seededShuffle(history, seed).slice(0, 7),
    ...seededShuffle(govt, seed + 1).slice(0, 6),
    ...seededShuffle(society, seed + 2).slice(0, 5),
    ...seededShuffle(values, seed + 3).slice(0, 4),
    ...seededShuffle(whatIsUK, seed + 4).slice(0, 2),
  ]

  return seededShuffle(selected, seed + 5).slice(0, 24)
}

export const MOCK_TEST_COUNT = 45 // Matches/beats all top competitors (they have 40-57)
export const MOCK_TEST_NUMBERS = Array.from({ length: MOCK_TEST_COUNT }, (_, i) => i + 1)
```

### SSG implementation: `app/mock-test/[number]/page.jsx`

```jsx
import { getMockTest, MOCK_TEST_NUMBERS } from '@/data/mockTests'

// Called at build time — generates all 23 mock test pages as static HTML
export function generateStaticParams() {
  return MOCK_TEST_NUMBERS.map(n => ({ number: String(n) }))
}

export function generateMetadata({ params }) {
  const n = Number(params.number)
  return {
    title: `Mock Test ${n} — Free Life in the UK Practice Exam | PassPort`,
    description: `Take free mock test ${n} for the Life in the UK citizenship test. 24 questions, exam format, instant results. No registration required.`,
  }
}

export default function MockTestPage({ params }) {
  const n = Number(params.number)
  const questions = getMockTest(n)

  // Schema for this page — makes the 24 questions individually indexable
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    'name': `Life in the UK Mock Test ${n}`,
    'description': `24-question practice exam for the Life in the UK citizenship test`,
    'educationalLevel': 'Adult',
    'about': { '@type': 'Thing', 'name': 'Life in the United Kingdom test' },
  }

  return (
    <>
      {/* Server-rendered — Google sees all 24 questions and explanations */}
      <MockTestShell
        testNumber={n}
        questions={questions}
        totalTests={MOCK_TEST_NUMBERS.length}
        schema={schema}
      />
    </>
  )
}
```

### What Google sees in the static HTML (CRITICAL)
The page must render question content server-side, not inject it via JS:

```jsx
// MockTestShell — server component that renders question list for Google
// The interactive exam runs client-side ON TOP of this static content

// STATIC (server-rendered, Google reads this):
<section>
  <h2>Test {n} Questions Preview</h2>
  <p>This mock test covers: British history, UK government, values and principles.</p>
  <ol>
    {questions.map(q => (
      <li key={q.id}>
        <strong>{q.q}</strong>
        {/* Show answer and explanation statically for SEO */}
        <details>
          <summary>See answer</summary>
          <p>Answer: {q.options[q.answer]}</p>
          <p>{q.explanation}</p>
        </details>
      </li>
    ))}
  </ol>
</section>

// INTERACTIVE (client component, runs on top):
<MockExamClient questions={questions} testNumber={n} />
```

---

## 2. TOPIC HUB PAGES

### URL structure
```
/topic/british-history
/topic/uk-government
/topic/values-and-principles
/topic/modern-society
/topic/patron-saints
/topic/british-inventions
/topic/world-war
/topic/royal-family
/topic/nhs-welfare-state
/topic/voting-rights
/topic/immigration
/topic/sports-culture
/topic/arts-literature
```

### Why these rank
- Exact-match topic keywords (e.g. "british history life in the uk test")
- FAQPage schema listing multiple Q&As from that topic
- Acts as a hub linking to individual question pages, chapter practice, and study guide

### SSG implementation: `app/topic/[slug]/page.jsx`

```js
// src/data/topics.js
export const TOPICS = [
  {
    slug: 'british-history',
    title: 'British History',
    description: 'Practice questions about British history from the Stone Age to the present day.',
    tags: ['early britain', 'romans', 'vikings', 'normans', 'tudors', 'stuarts',
           'civil war', 'empire', 'world war 1', 'world war 2', 'post-war'],
    chapterFocus: 3,
    seoTitle: 'British History — Life in the UK Test Questions | PassPort',
    seoDesc: 'Practice British history questions for the Life in the UK citizenship test. Covers Stone Age to present day with answers and explanations.',
  },
  {
    slug: 'uk-government',
    title: 'UK Government & Parliament',
    tags: ['parliament', 'government', 'elections', 'prime minister', 'house of commons', 'house of lords', 'democracy'],
    chapterFocus: 5,
    seoTitle: 'UK Government & Parliament — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions about UK government, Parliament and democracy for the Life in the UK citizenship test.',
  },
  {
    slug: 'values-and-principles',
    title: 'British Values & Principles',
    tags: ['values', 'principles', 'fundamentals', 'rights', 'freedoms', 'responsibilities'],
    chapterFocus: 1,
    seoTitle: 'British Values & Principles — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions on British values, fundamental principles and your rights and responsibilities as a UK resident.',
  },
  {
    slug: 'patron-saints',
    title: 'Patron Saints of the UK',
    tags: ['patron saints', 'st george', 'st andrew', 'st david', 'st patrick'],
    chapterFocus: 2,
    seoTitle: 'Patron Saints — Life in the UK Test Questions | PassPort',
    seoDesc: 'Test your knowledge of the patron saints of England, Scotland, Wales and Northern Ireland. Free practice questions.',
  },
  {
    slug: 'british-inventions',
    title: 'Great British Inventions',
    tags: ['invention', 'television', 'world wide web', 'radar', 'jet engine', 'penicillin', 'dna'],
    chapterFocus: 3,
    seoTitle: 'Great British Inventions — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions about British inventions and inventors for the Life in the UK citizenship test.',
  },
  {
    slug: 'nhs-welfare-state',
    title: 'The NHS & Welfare State',
    tags: ['nhs', 'welfare state', 'beveridge report', 'attlee', 'aneurin bevan'],
    chapterFocus: 3,
    seoTitle: 'The NHS & Welfare State — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions about the founding of the NHS and welfare state for the Life in the UK test.',
  },
  {
    slug: 'womens-rights',
    title: 'Women\'s Rights & Suffrage',
    tags: ['women', 'suffragettes', 'voting', 'pankhurst', 'equal franchise'],
    chapterFocus: 3,
    seoTitle: 'Women\'s Rights & Suffrage — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions on women\'s rights, the suffragette movement and equal voting rights for the Life in the UK test.',
  },
  {
    slug: 'sports-culture',
    title: 'UK Sport & Culture',
    tags: ['sport', 'football', 'cricket', 'rugby', 'tennis', 'wimbledon', 'olympics'],
    chapterFocus: 4,
    seoTitle: 'UK Sport & Culture — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions about British sport, famous athletes and cultural events for the Life in the UK test.',
  },
  {
    slug: 'arts-literature',
    title: 'British Arts & Literature',
    tags: ['literature', 'shakespeare', 'painting', 'art', 'music', 'theatre', 'poetry'],
    chapterFocus: 4,
    seoTitle: 'British Arts & Literature — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions on British arts, literature, famous writers and painters for the Life in the UK citizenship test.',
  },
  {
    slug: 'immigration-history',
    title: 'Immigration & Britain\'s People',
    tags: ['immigration', 'windrush', 'migration', 'commonwealth', 'post-war'],
    chapterFocus: 3,
    seoTitle: 'Immigration & Britain\'s People — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions about immigration history and how Britain\'s population has changed over time.',
  },
  {
    slug: 'uk-law',
    title: 'UK Law & Your Rights',
    tags: ['law', 'courts', 'rights', 'police', 'criminal law', 'civil law', 'jury'],
    chapterFocus: 5,
    seoTitle: 'UK Law & Your Rights — Life in the UK Test | PassPort',
    seoDesc: 'Practice questions on UK law, the court system and your legal rights for the Life in the UK test.',
  },
  {
    slug: 'world-wars',
    title: 'World Wars I & II',
    tags: ['world war 1', 'world war 2', 'wwi', 'wwii', 'winston churchill', 'dunkirk'],
    chapterFocus: 3,
    seoTitle: 'World Wars I & II — Life in the UK Test Questions | PassPort',
    seoDesc: 'Practice questions about the First and Second World Wars for the Life in the UK citizenship test.',
  },
]

// Get questions for a topic by matching tags
export function getTopicQuestions(topic, allQuestions) {
  return allQuestions.filter(q =>
    topic.tags.some(tag => q.tags.includes(tag))
  )
}
```

### Topic page content (NOT thin — must have real content)

Each topic page must include:
1. H1 with topic name
2. A 150-200 word intro explaining why this topic matters for the test
3. The list of questions (with answers and explanations visible in HTML)
4. FAQPage schema with 5 Q&As from that topic
5. Links to: related chapter practice, related study guide, related mock tests
6. "Most missed in this topic" section (if analytics data available)

---

## 3. SPECIAL HIGH-VALUE PAGES

### `/hardest-questions`
```
URL:         /hardest-questions
Title:       Hardest Life in the UK Test Questions | PassPort
Description: The 50 hardest questions in the Life in the UK test, with answers and
             explanations. Practise the questions most people get wrong.
```

Content:
- All questions with `difficulty: 'hard'` (currently 124 questions)
- Sorted hardest first (once analytics available, by actual fail rate)
- Full answers and explanations visible server-side
- Schema: FAQPage with top 10 hardest
- Internal links: "Try a full mock test" → `/mock-test/1`

```jsx
// app/hardest-questions/page.jsx
import { QUESTIONS } from '@/data/questions'

export const metadata = {
  title: 'Hardest Life in the UK Test Questions | PassPort',
  description: 'The 50 hardest questions people get wrong in the Life in the UK test. Full answers and explanations. Free practice.',
}

export default function HardestQuestionsPage() {
  const hardest = QUESTIONS.filter(q => q.difficulty === 'hard')
  // Pure SSG — all content in static HTML
  return <HardestQuestionsContent questions={hardest} />
}
```

### `/most-missed-questions`
```
URL:         /most-missed-questions
Title:       Most Missed Life in the UK Test Questions | PassPort
Description: The questions PassPort users get wrong most often. Updated regularly.
```

**Phase 1 (launch):** Populate with all `difficulty: 'hard'` questions + curated "commonly confused" pairs.

**Phase 2 (with analytics):** Replace with actual fail-rate data from PostHog. The page regenerates via ISR (Incremental Static Regeneration) when new data comes in.

```jsx
// app/most-missed-questions/page.jsx
// Phase 1: static curated list
// Phase 2: ISR with revalidate: 86400 (regenerates daily from analytics)

export const revalidate = 86400 // Revalidate daily

export default async function MostMissedPage() {
  // Phase 1: curated hard questions
  // Phase 2: fetch from analytics API: const data = await getMostMissedFromAnalytics()
  const questions = QUESTIONS
    .filter(q => q.difficulty === 'hard')
    .slice(0, 50)

  return <MostMissedContent questions={questions} />
}
```

### `/2026-test-prep` (and keyword variants)
```
/2026-test-prep
/life-in-the-uk-test-2026
```

Content:
- "Is the Life in the UK test changing in 2026?" — answer: No, the 3rd edition handbook still applies
- Full guide to what's on the test in 2026
- Link to all 23 mock tests
- Link to all topic pages
- FAQ section with schema

This page targets the massive seasonal spike in "life in the uk test 2026" searches.

### `/pass-rate` and `/exam-format`
```
/pass-rate
  Title: Life in the UK Test Pass Rate — What You Need to Know
  Content: Current pass rate (~70%), what score you need (75%), how many attempts
           people take on average, tips for passing first time.

/exam-format
  Title: Life in the UK Test Format — 24 Questions, 45 Minutes
  Content: Exactly how the test works, what to bring, where to take it, how to book.
  This page earns backlinks from immigration solicitors and advice sites.
```

---

## 4. DAILY 5 QUESTIONS FEATURE

### Concept
Every day, 5 new questions are presented to the user. No login required.
Builds a daily habit that keeps users coming back and increases session frequency.

### Implementation
```js
// src/algorithms/dailyQuestions.js

// Get today's 5 questions — deterministic based on date
// Same 5 questions for everyone on the same day (good for social sharing)
export function getDailyQuestions(allQuestions) {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  // e.g. 20260407 for 7 April 2026

  // Cycle through all questions — takes 570/5 = 114 days to repeat
  const daysSinceEpoch = Math.floor(Date.now() / 86400000)
  const startIndex = (daysSinceEpoch * 5) % allQuestions.length

  return allQuestions.slice(startIndex, startIndex + 5).length === 5
    ? allQuestions.slice(startIndex, startIndex + 5)
    : [...allQuestions.slice(startIndex), ...allQuestions.slice(0, 5 - (allQuestions.length - startIndex))]
}

// Track completion in localStorage
export function getDailyProgress() {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('passport_daily')
  if (!stored) return null
  const data = JSON.parse(stored)
  const today = new Date().toDateString()
  return data.date === today ? data : null
}

export function saveDailyProgress(score, total) {
  const today = new Date().toDateString()
  localStorage.setItem('passport_daily', JSON.stringify({
    date: today,
    score,
    total,
    completedAt: new Date().toISOString(),
  }))
}
```

### UI behaviour
```
Home page shows daily widget:
  - "Today's 5 Questions" card
  - Shows: how many completed today (0/5, 3/5, 5/5 ✓)
  - If 5/5 done: shows score, XP earned, "Come back tomorrow"
  - Streak counter: "Day 7 streak 🔥"
  - No login required — localStorage only

After completing daily 5:
  - +15 XP bonus
  - Streak increments
  - Share button appears: "I scored 5/5 on today's PassPort daily quiz!"
```

---

## 5. SHAREABLE RESULTS PAGES

### Why this is an SEO asset
Every shared result is a backlink opportunity and a new user acquisition channel.
Unlike competitor results pages that are just a score, ours must be real HTML pages
that can be indexed AND shared.

### Two types of shareable results

**Type 1: Static share cards (no new page needed)**
After completing a mock test or daily quiz, a share button generates a pre-built
share image using the result data:
```
"I scored 21/24 on PassPort Mock Test 3! 🎉
Life in the UK Test Prep — free at passport-lituk.com"
```
Shared as text/URL to WhatsApp, Twitter, etc. Links back to `/mock-test/3`.

**Type 2: Shareable result URL (Phase 2)**
After completing a mock test, generate a unique result URL:
```
/result/mt3-21-24-abc123
  → "User scored 21/24 on Mock Test 3"
  → Shows which questions they got right/wrong (anonymised)
  → Fully indexable if user chooses to make it public
  → Schema: EducationalOccupationalCredential
```

**Phase 1 implementation (launch):**
```jsx
// src/components/game/ShareResult.jsx
'use client'

export function ShareResult({ score, total, testName, testUrl }) {
  const text = `I scored ${score}/${total} on ${testName}! 🎓\nPractise free at passport-lituk.com`

  const handleShare = async () => {
    if (navigator.share) {
      // Native mobile share sheet
      await navigator.share({ title: 'PassPort Result', text, url: testUrl })
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${text}\n${testUrl}`)
      // Show toast: "Copied to clipboard!"
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + testUrl)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(testUrl)}`

  return (
    <div className="share-result">
      <button onClick={handleShare}>Share result</button>
      <a href={whatsappUrl} target="_blank">Share on WhatsApp</a>
      <a href={twitterUrl} target="_blank">Share on Twitter</a>
    </div>
  )
}
```

---

## 6. ANALYTICS TRACKING SPEC (PostHog)

PostHog is the recommended analytics tool — open source, GDPR-friendly, free tier.

### Install
```bash
npm install posthog-js
```

### Setup in layout.jsx
```jsx
// src/components/PostHogProvider.jsx
'use client'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export function PostHogProvider({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
      capture_pageview: true,
    })
  }, [])
  return children
}
```

### Events to track (these power the "most missed" page)

```js
// src/lib/analytics.js
import posthog from 'posthog-js'

// Called every time user answers a question
export function trackAnswer(question, wasCorrect, responseMs) {
  posthog.capture('question_answered', {
    question_id: question.id,
    chapter: question.chapter,
    difficulty: question.difficulty,
    was_correct: wasCorrect,
    response_ms: responseMs,
    tags: question.tags,
  })
}

// Called when a mock test is completed
export function trackTestComplete(testNumber, score, total, timeTaken) {
  posthog.capture('mock_test_complete', {
    test_number: testNumber,
    score,
    total,
    percentage: Math.round(score / total * 100),
    passed: score >= 18,
    time_taken_seconds: timeTaken,
  })
}

// Called when daily 5 is completed
export function trackDailyComplete(score) {
  posthog.capture('daily_five_complete', { score, total: 5 })
}

// Called when user shares a result
export function trackShare(method, testName, score) {
  posthog.capture('result_shared', { method, test_name: testName, score })
}

// Called on page view (for identifying high-traffic SEO pages)
export function trackPageView(pagePath, pageType) {
  posthog.capture('$pageview', { path: pagePath, page_type: pageType })
}
```

### Using analytics data to update most-missed page

PostHog dashboard query (run weekly, update curated list):
```
Event: question_answered
Filter: was_correct = false
Group by: question_id
Order by: count DESC
```

This gives you the exact questions most users get wrong.
Update `src/data/mostMissed.js` weekly with the top 50 question IDs.

---

## 7. COMPLETE PROGRAMMATIC URL MAP

### All pages that must exist at launch

```
INFORMATIONAL (SSG — fully indexable)
/                              Home dashboard
/exam-format                   How the test works (link magnet)
/pass-rate                     Pass rates and stats (link magnet)
/2026-test-prep                2026 study guide (seasonal traffic)
/hardest-questions             Hard questions SEO page
/most-missed-questions         Commonly failed questions

PRACTICE (SSG shells + CSR game)
/practice                      Chapter selector
/practice/1                    Values practice
/practice/2                    What is the UK practice
/practice/3                    History practice
/practice/4                    Modern Society practice
/practice/5                    Government practice

MOCK TESTS (SSG — all 23 fully indexable)
/mock-test/1                   Mock Test 1
/mock-test/2                   Mock Test 2
...
/mock-test/23                  Mock Test 23

QUESTIONS (SSG — 570 individual pages)
/questions/1                   Individual question 1
/questions/2                   Individual question 2
...
/questions/570                 Individual question 570

TOPICS (SSG — topic hub pages)
/topic/british-history
/topic/uk-government
/topic/values-and-principles
/topic/patron-saints
/topic/british-inventions
/topic/nhs-welfare-state
/topic/womens-rights
/topic/sports-culture
/topic/arts-literature
/topic/immigration-history
/topic/uk-law
/topic/world-wars

STUDY GUIDES (SSG)
/study                         Study guide hub
/study/1                       Chapter 1 study guide
/study/2                       Chapter 2 study guide
/study/3                       Chapter 3 study guide
/study/4                       Chapter 4 study guide
/study/5                       Chapter 5 study guide

CLIENT-SIDE ONLY (not indexed)
/exam                          Live exam mode
/progress                      User progress dashboard
/weak-spots                    Weak area review
/flashcards                    Flashcard mode
/daily                         Daily 5 questions
```

### Total indexable pages at launch
```
Informational:   6 pages
Practice:        6 pages
Mock tests:     23 pages
Questions:     570 pages
Topics:         12 pages
Study guides:    6 pages
─────────────────────────
TOTAL:         623 indexed pages on day 1
```

623 pages vs competitor's 408 (lifeintheuktestweb.co.uk).
We index more pages on day 1 than their entire site.

---

## 8. CONTENT RULES — NO THIN PAGES

The feedback document says "Contain real content (not thin templates)".
Every programmatic page must meet this checklist:

| Page type | Minimum content |
|---|---|
| Mock test | 24 questions with answers and explanations (visible in HTML) |
| Topic page | 150-word intro + all tagged questions with answers + FAQ schema |
| Question page | Full Q + 4 options + correct answer + full explanation + 4 related links |
| Informational | 500+ words of original content + internal links |
| Study guide | Handbook content for that chapter + practice questions |

**Never ship:** A page that just says "Practice test loading..." with no server-rendered content.
Google will see an empty page, not index it, and you lose the SEO value entirely.

---

## 9. INTERNAL LINKING DENSITY TARGETS

The feedback says "internally link aggressively". Here are the targets:

```
Every question page links to:
  ✓ 4 related questions (same chapter)
  ✓ Its chapter practice page
  ✓ Its topic page(s)
  ✓ The study guide for its chapter
  ✓ "Take a mock test" → /mock-test/1

Every mock test page links to:
  ✓ The next and previous mock test
  ✓ 5 topic pages (matching its question distribution)
  ✓ The study guide chapters it covers
  ✓ /hardest-questions

Every topic page links to:
  ✓ All individual question pages for that topic
  ✓ The chapter practice page
  ✓ 3 related mock tests
  ✓ The study guide chapter

Home page links to:
  ✓ All 5 chapter practice pages
  ✓ /mock-test/1 (primary CTA)
  ✓ All 12 topic pages
  ✓ /hardest-questions
  ✓ /most-missed-questions
```

---

## 10. SITEMAP ADDITIONS

Add these to the sitemap generator (`scripts/generate-sitemap.js`):

```js
const mockTestPages = Array.from({ length: 23 }, (_, i) => ({
  url: `/mock-test/${i + 1}`,
  priority: '0.9',
  changefreq: 'monthly',
}))

const topicPages = TOPICS.map(t => ({
  url: `/topic/${t.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}))

const specialPages = [
  { url: '/hardest-questions',    priority: '0.9', changefreq: 'weekly'  },
  { url: '/most-missed-questions',priority: '0.9', changefreq: 'weekly'  },
  { url: '/2026-test-prep',       priority: '0.8', changefreq: 'monthly' },
  { url: '/exam-format',          priority: '0.7', changefreq: 'yearly'  },
  { url: '/pass-rate',            priority: '0.7', changefreq: 'monthly' },
]

// Add all to the allPages array before generating XML
```

---

## 11. ROBOTS.TXT ADDITIONS

```
# Block client-side-only pages (no indexable content)
Disallow: /progress
Disallow: /weak-spots
Disallow: /flashcards
Disallow: /exam           ← Block live exam (content is in mock-test pages)
Disallow: /daily          ← Block daily mode (CSR only)

# Explicitly allow all SEO pages
Allow: /questions/
Allow: /mock-test/
Allow: /topic/
Allow: /study/
Allow: /practice/
Allow: /hardest-questions
Allow: /most-missed-questions
Allow: /2026-test-prep
Allow: /exam-format
Allow: /pass-rate
```

---

## 12. UPDATED PROGRESS.MD BUILD ORDER

New pages to add to the build order (insert after existing pages):

```
PROGRAMMATIC PAGES (build after core pages)
- [ ] src/data/mockTests.js          ← getMockTest() + MOCK_TEST_NUMBERS
- [ ] src/data/topics.js             ← TOPICS array + getTopicQuestions()
- [ ] src/data/mostMissed.js         ← Curated list of 50 hardest (phase 1)
- [ ] src/algorithms/dailyQuestions.js

- [ ] app/mock-test/[number]/page.jsx      ← 45 mock test pages (up from 23)
- [ ] app/topic/[slug]/page.jsx            ← 12 topic pages
- [ ] app/hardest-questions/page.jsx       ← Static hard questions
- [ ] app/most-missed-questions/page.jsx   ← ISR from analytics
- [ ] app/2026-test-prep/page.jsx          ← Seasonal SEO page
- [ ] app/exam-format/page.jsx             ← Evergreen informational
- [ ] app/pass-rate/page.jsx               ← Evergreen informational
- [ ] app/daily/page.jsx                   ← Daily 5 (CSR only)

COMPETITOR GAP PAGES (all 7 gaps — build these)
- [ ] app/faq/page.jsx                     ← 30+ Q&A page (Gap 3)
- [ ] app/cheat-sheet/page.jsx             ← Key dates/facts (Gap 4)
- [ ] app/test-centres/page.jsx            ← 60+ centres with maps (Gap 2)
- [ ] app/how-to-pass/page.jsx             ← Study strategy guide (Gap 7)

ANALYTICS
- [ ] src/lib/analytics.js           ← PostHog event tracking
- [ ] src/components/PostHogProvider.jsx

SHARING + EXPORT
- [ ] src/components/game/ShareResult.jsx
- [ ] src/components/game/PrintTest.jsx    ← PDF export via window.print() (Gap 6)

AUDIO
- [ ] src/hooks/useAudioNarration.js       ← Web Speech API wrapper (Gap 1)
- [ ] src/components/game/AudioButton.jsx  ← Play/stop button per question

SITEMAP UPDATE
- [ ] Add all new pages to generate-sitemap.js
- [ ] Verify sitemap has 700+ URLs before launch
```

---

## 12. GAP 1 — AUDIO NARRATION (Web Speech API)

Britizen reads every question and all 4 answer options aloud using headphones,
exactly like the real test allows. This is both an accessibility feature and a
genuine study differentiator. Implementation is free — no backend, no API key.

### Implementation

```js
// src/hooks/useAudioNarration.js
'use client'
import { useCallback, useRef } from 'react'

export function useAudioNarration() {
  const utteranceRef = useRef(null)

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel() // stop any current speech
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'     // British English accent
    utterance.rate = 0.9         // slightly slower — easier to follow
    utterance.pitch = 1
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
  }, [])

  const readQuestion = useCallback((question) => {
    // Reads: question text + pause + all 4 options labelled A B C D
    const text = [
      question.q,
      'Option A:', question.options[0],
      'Option B:', question.options[1],
      'Option C:', question.options[2],
      'Option D:', question.options[3],
    ].join('. ')
    speak(text)
  }, [speak])

  const readAnswer = useCallback((question) => {
    const text = `The correct answer is: ${question.options[question.answer]}. ${question.explanation}`
    speak(text)
  }, [speak])

  return { speak, stop, readQuestion, readAnswer }
}
```

```jsx
// src/components/game/AudioButton.jsx
'use client'
import { useAudioNarration } from '@/hooks/useAudioNarration'

export function AudioButton({ question, showAnswer = false }) {
  const { readQuestion, readAnswer, stop } = useAudioNarration()
  const [playing, setPlaying] = useState(false)

  const handleClick = () => {
    if (playing) { stop(); setPlaying(false); return }
    setPlaying(true)
    if (showAnswer) readAnswer(question)
    else readQuestion(question)
    // Reset icon after speech ends (approximate)
    setTimeout(() => setPlaying(false), question.q.length * 60)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={playing ? 'Stop audio' : 'Listen to question'}
      className="audio-btn"
    >
      {playing ? '⏹' : '🔊'}
    </button>
  )
}
```

### Where to add AudioButton
- QuestionCard.jsx — top right corner, reads question + all options
- ExplanationPanel.jsx — reads the correct answer + explanation
- FlashCard.jsx — reads the front/back of each card
- Minimum tap target: 44×44px per mobile-first rules

### CLAUDE.md rule to add:
Every QuestionCard must render an AudioButton. Audio is on by default, can be
muted via a toggle in settings stored in localStorage.

---

## 13. GAP 2 — TEST CENTRES PAGE

URL: `/test-centres`
Title: `Life in the UK Test Centres — Find Your Nearest | PassPort`
Description: `Find your nearest Life in the UK test centre. 60+ approved centres
across England, Scotland, Wales and Northern Ireland with addresses and maps.`

### Why this ranks
People searching "life in the uk test centre near me" or "life in the uk test
centre london" have very high intent — they're about to book. This page
intercepts them and sends them to PassPort first. It also earns backlinks from
immigration solicitors' websites ("where to take the test").

### Content structure

```jsx
// app/test-centres/page.jsx
// FULLY STATIC — no backend needed, embed Google Maps links

export const metadata = {
  title: 'Life in the UK Test Centres — Find Your Nearest | PassPort',
  description: 'Find your nearest Life in the UK test centre. Over 60 approved centres across the UK.',
}

// src/data/testCentres.js
export const TEST_CENTRES = [
  // England
  { city: 'London (Central)', name: 'PSI London', address: 'Hamilton House, Mabledon Place, London, WC1H 9BB', region: 'England', mapUrl: 'https://maps.google.com/?q=Hamilton+House+Mabledon+Place+London' },
  { city: 'Birmingham', name: 'PSI Birmingham', address: 'Gateway House, 3rd Floor, 50-53 High Street, Birmingham, B4 7SY', region: 'England', mapUrl: 'https://maps.google.com/?q=50+High+Street+Birmingham+B4+7SY' },
  { city: 'Manchester', name: 'PSI Manchester', address: 'St James Buildings, 79 Oxford Street, Manchester, M1 6FQ', region: 'England', mapUrl: 'https://maps.google.com/?q=79+Oxford+Street+Manchester' },
  { city: 'Leeds', name: 'PSI Leeds', address: '6 Queen Street, Leeds, LS1 2TW', region: 'England', mapUrl: 'https://maps.google.com/?q=6+Queen+Street+Leeds' },
  { city: 'Leicester', name: 'PSI Leicester', address: 'Epic House, Charles Street, Leicester, LE1 3SH', region: 'England', mapUrl: 'https://maps.google.com/?q=Epic+House+Charles+Street+Leicester' },
  { city: 'Bristol', name: 'Pitman Training Bristol', address: 'Ground Floor, 9 Hide Market, Bristol, BS2 0BH', region: 'England', mapUrl: 'https://maps.google.com/?q=9+Hide+Market+Bristol' },
  { city: 'Sheffield', name: 'PSI Sheffield', address: 'City Gate, Blonk Street, Sheffield, S1 2AU', region: 'England', mapUrl: 'https://maps.google.com/?q=Blonk+Street+Sheffield' },
  { city: 'Nottingham', name: 'PSI Nottingham', address: 'Unit B, Ground Floor, 10 York Place, Nottingham, NG1 5GD', region: 'England', mapUrl: 'https://maps.google.com/?q=10+York+Place+Nottingham' },
  { city: 'Liverpool', name: 'PSI Liverpool', address: '1 Old Hall Street, Liverpool, L3 9HG', region: 'England', mapUrl: 'https://maps.google.com/?q=1+Old+Hall+Street+Liverpool' },
  { city: 'Newcastle', name: 'PSI Newcastle', address: 'Clavering House, Clavering Place, Newcastle upon Tyne, NE1 3NG', region: 'England', mapUrl: 'https://maps.google.com/?q=Clavering+Place+Newcastle' },
  { city: 'Brighton', name: 'MTS Brighton', address: '7th Floor, Vantage Point, New England Road, Brighton, BN1 4GW', region: 'England', mapUrl: 'https://maps.google.com/?q=Vantage+Point+Brighton' },
  { city: 'Blackburn', name: 'Community Training Portal', address: 'Kings Court, 33 King Street, Blackburn, BB2 2DH', region: 'England', mapUrl: 'https://maps.google.com/?q=33+King+Street+Blackburn' },
  // Scotland
  { city: 'Glasgow', name: 'PSI Glasgow', address: '160 West George Street, Glasgow, G2 2HG', region: 'Scotland', mapUrl: 'https://maps.google.com/?q=160+West+George+Street+Glasgow' },
  { city: 'Edinburgh', name: 'PSI Edinburgh', address: '16 St Andrew Square, Edinburgh, EH2 2YB', region: 'Scotland', mapUrl: 'https://maps.google.com/?q=16+St+Andrew+Square+Edinburgh' },
  // Wales
  { city: 'Cardiff', name: 'PSI Cardiff', address: 'Bute Terrace, Cardiff, CF10 2BP', region: 'Wales', mapUrl: 'https://maps.google.com/?q=Bute+Terrace+Cardiff' },
  // Northern Ireland
  { city: 'Belfast', name: 'PSI Belfast', address: 'Cromac House, 7 Cromac Place, Belfast, BT7 2JB', region: 'Northern Ireland', mapUrl: 'https://maps.google.com/?q=Cromac+House+Belfast' },
  // Add all remaining centres — full list at gov.uk/life-in-the-uk-test/find-centre
]
```

### Page content rules
- Group by region: England (by city), Scotland, Wales, Northern Ireland
- Each centre: name, full address, Google Maps link, accessibility icons
- Add prominent note: "You must book online at lifeintheuktest.gov.uk — walk-ins not accepted"
- Add link to official booking site
- FAQPage schema: "How many test centres are there?" "Can I choose any test centre?" etc.
- This page links to /faq, /how-to-pass and /exam-format

---

## 14. GAP 3 — FAQ PAGE (30+ QUESTIONS)

URL: `/faq`
Title: `Life in the UK Test FAQ — Everything You Need to Know | PassPort`

This is one of the highest-value SEO pages we can build. Every question is a
potential Google Featured Snippet or People Also Ask box. lifeintheuktest.com's
FAQ page probably drives 15-20% of their total traffic.

### The 30 questions to answer (all from real user searches):

```
ABOUT THE TEST
1. What is the Life in the UK test?
2. Who needs to take it?
3. Do I need to take it if I'm from an English-speaking country?
4. How many questions are in the test? (24)
5. How long is the test? (45 minutes)
6. What score do I need to pass? (18/24 — 75%)
7. What is the current pass rate? (~70%)
8. What happens if I fail?
9. How soon can I retake it if I fail? (10 days)
10. How long is the certificate valid for? (No expiry)
11. Is the test the same every time? (No — different questions each time)
12. Can I take it in Welsh or Scottish Gaelic?
13. What language level is needed for the handbook? (ESOL Entry Level 3 / B1)

BOOKING
14. How much does the test cost? (£50)
15. Where do I book? (lifeintheuktest.gov.uk)
16. How far in advance must I book? (At least 3 days)
17. Can I cancel or change my booking?
18. What if I have a disability or special requirement?
19. How do I find my nearest test centre?
20. Can I choose any test centre in the UK?

ON THE DAY
21. What ID do I need to bring?
22. What proof of address do I need?
23. Can I bring notes or books into the test? (No)
24. Can I bring someone with me?
25. Can I use headphones? (Yes — the test has audio)
26. Will I take the test alone or with others?
27. What types of questions are in the test? (Multiple choice, choose 1 or 2 answers)
28. How do I know how much time I have left?

AFTER THE TEST
29. When do I find out if I passed? (Immediately, on screen)
30. What happens after I pass?
31. Does the certificate expire?
32. Are the questions the same if I retake?

STUDYING
33. What book should I study from? (Life in the UK: A Guide for New Residents, 3rd edition)
34. How long should I study?
35. Is PassPort free? (Yes — completely)
```

### Implementation

```jsx
// app/faq/page.jsx
// Full SSG — all answers in static HTML

const FAQS = [
  {
    q: 'How many questions are in the Life in the UK test?',
    a: 'The test has 24 multiple-choice questions. You have 45 minutes to complete them and need to answer at least 18 correctly (75%) to pass.',
    category: 'About the test',
  },
  {
    q: 'How much does the Life in the UK test cost?',
    a: 'The test costs £50. This must be paid when booking online. If you fail and need to retake it, you pay the £50 fee again.',
    category: 'Booking',
  },
  // ... all 35 Q&As
]

// Schema: FAQPage with all 35 Q&As — massive Featured Snippet opportunity
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQS.map(faq => ({
    '@type': 'Question',
    'name': faq.q,
    'acceptedAnswer': { '@type': 'Answer', 'text': faq.a },
  })),
}
```

---

## 15. GAP 4 — CHEAT SHEET PAGE

URL: `/cheat-sheet`
Title: `Life in the UK Test Cheat Sheet — Key Dates & Facts | PassPort`
Description: `Every key date, number and fact you need for the Life in the UK
test on one page. Print it, share it, review it the night before.`

### Why this is powerful
Users share this page in WhatsApp groups the night before their test. It drives
massive return traffic and word-of-mouth. Britizen's cheat sheet is one of their
most linked-to pages. It's also indexable and earns Featured Snippets for
searches like "life in the uk test key dates".

### Content structure

```js
// src/data/cheatSheet.js
export const CHEAT_SHEET = {
  keyDates: [
    { fact: 'Magna Carta signed', date: '1215', context: 'King John — limited powers of the monarch' },
    { fact: 'Black Death reached Britain', date: '1348', context: 'Killed approx 1/3 of England\'s population' },
    { fact: 'Battle of Hastings', date: '1066', context: 'William the Conqueror defeated King Harold' },
    { fact: 'Wars of the Roses began', date: '1455', context: 'Lancaster vs York for the English throne' },
    { fact: 'Henry VIII breaks with Rome', date: '1534', context: 'Church of England established' },
    { fact: 'Spanish Armada defeated', date: '1588', context: 'During reign of Elizabeth I' },
    { fact: 'Gunpowder Plot', date: '1605', context: 'Guy Fawkes tried to blow up Parliament' },
    { fact: 'English Civil War began', date: '1642', context: 'Parliament vs King Charles I' },
    { fact: 'Charles I executed', date: '1649', context: 'Only British monarch to be executed' },
    { fact: 'Bill of Rights', date: '1689', context: 'After Glorious Revolution — limits on monarchy' },
    { fact: 'Act of Union (England + Scotland)', date: '1707', context: 'Created Kingdom of Great Britain' },
    { fact: 'Robert Walpole — 1st Prime Minister', date: '1721', context: 'PM from 1721 to 1742' },
    { fact: 'Act of Union (Great Britain + Ireland)', date: '1800', context: 'Created United Kingdom' },
    { fact: 'Battle of Waterloo', date: '1815', context: 'Wellington defeated Napoleon' },
    { fact: 'Slave Trade abolished', date: '1807', context: 'Slavery abolished throughout Empire 1833' },
    { fact: 'Great Reform Act', date: '1832', context: 'Abolished rotten boroughs, more voters' },
    { fact: 'Queen Victoria\'s reign began', date: '1837', context: 'Reigned until 1901' },
    { fact: 'Women over 30 got the vote', date: '1918', context: 'Representation of the People Act' },
    { fact: 'Equal voting rights for women', date: '1928', context: 'Same age as men (21)' },
    { fact: 'World War I', date: '1914–1918', context: 'Britain entered 4 August 1914' },
    { fact: 'World War II', date: '1939–1945', context: 'VE Day 8 May 1945' },
    { fact: 'NHS established', date: '1948', context: 'By Aneurin Bevan under PM Attlee' },
    { fact: 'UK joined EEC', date: '1973', context: 'European Economic Community' },
    { fact: 'Margaret Thatcher became PM', date: '1979', context: 'First female Prime Minister' },
    { fact: 'Good Friday Agreement', date: '1998', context: 'Northern Ireland peace process' },
    { fact: 'Scottish Parliament established', date: '1999', context: 'Also Welsh Assembly' },
    { fact: 'World Wide Web first transfer', date: '1990', context: 'Invented by Sir Tim Berners-Lee' },
  ],
  keyNumbers: [
    { fact: 'Test questions', value: '24' },
    { fact: 'Time allowed', value: '45 minutes' },
    { fact: 'Pass mark', value: '18/24 (75%)' },
    { fact: 'Test cost', value: '£50' },
    { fact: 'Test centres in UK', value: 'About 60' },
    { fact: 'UK countries', value: '4 (England, Scotland, Wales, N. Ireland)' },
    { fact: 'MPs in House of Commons', value: '650' },
    { fact: 'Scottish Parliament members', value: '129 MSPs' },
    { fact: 'Welsh Parliament members', value: '60 MSs' },
    { fact: 'Commonwealth member countries', value: '54' },
    { fact: 'UK population (approx)', value: '67 million' },
    { fact: 'England share of UK population', value: '84%' },
    { fact: 'Parliament election frequency', value: 'At least every 5 years' },
    { fact: 'Minimum voting age', value: '18' },
    { fact: 'Minimum age to be an MP', value: '18' },
    { fact: 'Age exempt from test', value: 'Under 18 or over 65' },
  ],
  keyPeople: [
    { name: 'Aneurin (Nye) Bevan', role: 'Founded the NHS (1948)' },
    { name: 'Clement Attlee', role: 'PM 1945–51, established welfare state' },
    { name: 'William Beveridge', role: '1942 report — basis for welfare state, 5 Giant Evils' },
    { name: 'Margaret Thatcher', role: 'First female PM (1979–1990)' },
    { name: 'Sir Tim Berners-Lee', role: 'Invented the World Wide Web (1990)' },
    { name: 'John Logie Baird', role: 'Invented television (Scottish)' },
    { name: 'Sir Robert Watson-Watt', role: 'Invented radar (Scottish, 1935)' },
    { name: 'Alan Turing', role: 'Theoretical computer science / Turing machine' },
    { name: 'Alexander Fleming', role: 'Discovered penicillin (1928, Scottish)' },
    { name: 'Sir Frank Whittle', role: 'Invented jet engine (1930s)' },
    { name: 'Florence Nightingale', role: 'Founded modern nursing (Crimean War)' },
    { name: 'Emmeline Pankhurst', role: 'Led suffragette movement for women\'s vote' },
    { name: 'William Wilberforce', role: 'Led campaign to abolish slave trade' },
    { name: 'Robert the Bruce', role: 'Won Battle of Bannockburn 1314 (Scotland)' },
    { name: 'Winston Churchill', role: 'PM during most of World War II' },
    { name: 'Sir Robert Walpole', role: 'First Prime Minister (1721–1742)' },
    { name: 'Sir Francis Drake', role: 'First Englishman to circumnavigate the globe' },
  ],
  patronSaints: [
    { country: 'England', saint: 'St George', day: '23 April', flower: 'Rose' },
    { country: 'Scotland', saint: 'St Andrew', day: '30 November', flower: 'Thistle' },
    { country: 'Wales', saint: 'St David', day: '1 March', flower: 'Daffodil' },
    { country: 'Northern Ireland', saint: 'St Patrick', day: '17 March', flower: 'Shamrock' },
  ],
}
```

### Page must include
- Print button (window.print()) — for studying offline
- Sections: Key Dates, Key Numbers, Key People, Patron Saints, Key Laws
- FAQPage schema referencing the most-searched facts
- Internal links: "Practice questions about British history" → /topic/british-history

---

## 16. GAP 5 — 45 MOCK TESTS (ALREADY UPDATED ABOVE)

See Section 1 — MOCK_TEST_COUNT updated from 23 to 45.
The `/mock-test/[number]` URL structure handles this automatically.
45 tests = 45 indexed pages vs competitors' 40–57.

Key: tests 1–24 use each question once. Tests 25–45 allow controlled re-use
of questions that appeared in tests 1–12 (earliest tests, least recently seen).

---

## 17. GAP 6 — PDF EXPORT OF COMPLETED TEST

Britizen lets users download any test as a PDF showing questions, their answers,
correct answers and explanations. We implement this with window.print() and a
print stylesheet — zero backend, zero cost, available in 2 hours.

### Implementation

```jsx
// src/components/game/PrintTest.jsx
'use client'

export function PrintTest({ testNumber, questions, userAnswers, score }) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* Print button — only visible on screen */}
      <button onClick={handlePrint} className="print-btn no-print">
        Download as PDF
      </button>

      {/* Print-only content — hidden on screen, visible when printing */}
      <div className="print-only">
        <h1>PassPort — Mock Test {testNumber} Results</h1>
        <p>Score: {score}/24 — {score >= 18 ? 'PASS' : 'FAIL'}</p>
        <p>Date: {new Date().toLocaleDateString('en-GB')}</p>
        <hr />
        {questions.map((q, i) => {
          const userAnswer = userAnswers[i]
          const correct = userAnswer === q.answer
          return (
            <div key={q.id} style={{ marginBottom: '1.5rem' }}>
              <p><strong>Q{i + 1}:</strong> {q.q}</p>
              {q.options.map((opt, j) => (
                <p key={j} style={{
                  color: j === q.answer ? 'green' : j === userAnswer && !correct ? 'red' : 'black'
                }}>
                  {j === q.answer ? '✓' : j === userAnswer ? '✗' : ' '} {opt}
                </p>
              ))}
              {!correct && <p><em>Explanation: {q.explanation}</em></p>}
            </div>
          )
        })}
      </div>
    </>
  )
}
```

```css
/* In globals.css — print stylesheet */
@media print {
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  body { background: white; color: black; font-family: serif; }
  /* Hide nav, gamification elements, etc. */
  nav, .bottom-nav, .xp-badge, .streak { display: none !important; }
}
@media screen {
  .print-only { display: none; }
}
```

### Where to add
- ResultScreen.jsx — "Download PDF" button appears after completing any mock test
- Also available on /mock-test/[number] page after test completes

---

## 18. GAP 7 — HOW TO PASS GUIDE

URL: `/how-to-pass`
Title: `How to Pass the Life in the UK Test First Time | PassPort`
Description: `Step-by-step study plan, tips from people who've passed, and
the most common mistakes to avoid. Free guide for the 2026 test.`

### Why this ranks
"How to pass life in the uk test" gets significant search volume. It earns
backlinks from immigration advice forums, Facebook groups and solicitor sites.
lifeintheuktest.com's equivalent page is one of their most linked-to pieces.

### Content to include (1000+ words minimum)

```
SECTION 1 — What to expect
- 24 questions, 45 minutes, 75% to pass
- Multiple choice — some questions ask for 2 answers
- Questions drawn randomly — not the same as practice tests
- Taken on a computer at an approved centre

SECTION 2 — Recommended study plan
Week 1: Read the study guide chapter by chapter
Week 2: Practice chapter tests — identify weak areas
Week 3: Take full mock exams, focus on weak spots
Week 4: Review cheat sheet daily, take 3–5 mock tests

SECTION 3 — The most common mistakes
- Not reading the actual handbook (just doing tests is not enough)
- Memorising answers without understanding them (questions are rephrased)
- Not practising "choose TWO answers" question type
- Ignoring Chapter 4 (Modern Society) — often underestimated
- Forgetting specific numbers (129 MSPs, 650 MPs, £50 fee, 75% pass mark)

SECTION 4 — Tips for test day
- Bring your ID + proof of address (must be original, not a copy)
- Arrive 15 minutes early
- Use the headphones — listening can help comprehension
- Flag questions you're unsure about and return to them
- You know more than you think — don't rush

SECTION 5 — PassPort study tools
- Link to mock tests, weak spots, flashcards, cheat sheet, daily 5
```

### Schema for this page
```json
{
  "@type": "HowTo",
  "name": "How to Pass the Life in the UK Test",
  "step": [
    { "@type": "HowToStep", "name": "Read the handbook", "text": "..." },
    { "@type": "HowToStep", "name": "Practice chapter tests", "text": "..." },
    { "@type": "HowToStep", "name": "Take full mock exams", "text": "..." },
    { "@type": "HowToStep", "name": "Review your weak spots", "text": "..." }
  ]
}
```

---

## 19. UPDATED TOTAL URL MAP (ALL GAPS INCLUDED)

```
INFORMATIONAL (SSG — fully indexable)
/                              Home
/exam-format                   How the test works
/pass-rate                     Pass rates and stats
/2026-test-prep                2026 guide (seasonal)
/hardest-questions             Hard questions
/most-missed-questions         Commonly failed questions
/faq                           ← NEW GAP 3: 30+ Q&As
/cheat-sheet                   ← NEW GAP 4: Key dates/facts
/test-centres                  ← NEW GAP 2: 60+ centres with maps
/how-to-pass                   ← NEW GAP 7: Study strategy guide

PRACTICE (SSG + CSR game)
/practice                      Chapter selector
/practice/1–5                  Chapter practice pages

MOCK TESTS (SSG — all 45 fully indexable)
/mock-test/1–45                ← GAP 5: 45 tests (up from 23)

QUESTIONS (SSG — 570 individual pages)
/questions/1–570

TOPICS (SSG)
/topic/[12 topic slugs]

STUDY GUIDES (SSG)
/study
/study/1–5

CLIENT-SIDE ONLY
/exam, /progress, /weak-spots, /flashcards, /daily
```

### Final page count
```
Informational:    10 pages  (was 6, +4 new gap pages)
Practice:          6 pages
Mock tests:       45 pages  (was 23, +22 from Gap 5)
Questions:       570 pages
Topics:           12 pages
Study guides:      6 pages
─────────────────────────────
TOTAL:           649 indexed pages on day 1
```

649 vs lifeintheuktestweb's ~60 total pages.
Nearly 11× more indexed content on launch day.
