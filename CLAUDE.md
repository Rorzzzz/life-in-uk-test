# PassTheUKTest — CLAUDE.md
# Read this at the start of EVERY session before touching any code.
# Then read PROGRESS.md to see current state.

---

## 1. MISSION

Build **PassTheUKTest** — the best Life in the UK citizenship test prep app on the internet.
Free. Gamified. Adaptive. Mobile-first. **SEO-first.** No paywall until traffic grows.

Beat lifeintheuktestweb.co.uk (400K+ monthly visitors, no gamification, ugly, bad SEO).
SEO goal: 500+ indexed pages on day one. Rank for long-tail question keywords immediately.

---

## 2. STACK — LOCKED. DO NOT CHANGE OR SUGGEST ALTERNATIVES.

```
Next.js 14 (App Router)   — Framework. SSG for all content pages.
React 18                  — UI layer
TailwindCSS 3             — Styling only
Framer Motion 11          — All animations
next/font                 — Font loading (no CDN fonts)
canvas-confetti           — Exam pass celebration
clsx                      — Conditional class composition
lucide-react              — Icons only (no other icon library)
next-sitemap              — Auto-generate sitemap.xml
localStorage              — All game state (no backend in v1)
Vercel                    — Free deployment, zero config for Next.js
```

**Why Next.js, not React+Vite:**
Without SSR/SSG, Google indexes <25% of a React SPA in the first 6 months.
With Next.js SSG, every question page is pre-rendered HTML — 500 pages indexed day one.
Each question page is a unique Google entry point for long-tail search queries.

---

## 3. RENDERING STRATEGY — THE SEO ENGINE

```
STATIC (generateStaticParams + generateMetadata) — pre-rendered HTML at build time:
  /                           Home page
  /practice                   Chapter selector
  /practice/[chapter]         Chapter practice page
  /questions/[id]             Individual question pages (THE SEO GOLDMINE)
  /study                      Study guide index
  /study/[chapter]            Chapter study guide
  /exam/info                  "About the exam" info page (indexable)

CLIENT-SIDE ONLY (no SSG, 'use client'):
  /exam                       Timer-based mock exam
  /progress                   Personal game data
  /weak-spots                 Personal learning data
  /flashcards                 Interactive swipe UI
```

**IRON RULE: Every route under STATIC must have BOTH:**
- `export async function generateStaticParams()` — tells Next.js what paths to build
- `export async function generateMetadata({ params })` — unique title + description per page

**Never put `'use client'` on a page that can be a Server Component.**
Server Components run at build time and produce static HTML. That's the whole point.

---

## 4. FILE STRUCTURE

```
passport-next/
├── CLAUDE.md                         ← This file (read every session)
├── master_claude.md                  ← Deep specs (load with @master_claude.md)
├── ARCHITECTURE.md                   ← Algorithms, state machine, data flow
├── DESIGN_SYSTEM.md                  ← Full visual spec
├── ADAPTIVE_LEARNING.md              ← SM-2+ spaced repetition model
├── SEO_STRATEGY.md                   ← Keywords, schema, meta templates
├── PROGRESS.md                       ← Build tracker (read + update each session)
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── next-sitemap.config.js
├── package.json
├── public/
│   ├── robots.txt
│   └── passport.svg                  ← Favicon
└── src/
    ├── app/
    │   ├── layout.jsx                ← Root layout: fonts, GameProvider, Navbar
    │   ├── page.jsx                  ← Home dashboard (SSG)
    │   ├── globals.css               ← Tailwind + global styles
    │   ├── practice/
    │   │   ├── page.jsx              ← Chapter selector (SSG)
    │   │   └── [chapter]/
    │   │       └── page.jsx          ← Chapter practice (SSG shell, CSR game)
    │   ├── questions/
    │   │   └── [id]/
    │   │       └── page.jsx          ← Individual question (SSG — SEO page)
    │   ├── study/
    │   │   ├── page.jsx              ← Study guide index (SSG)
    │   │   └── [chapter]/
    │   │       └── page.jsx          ← Chapter guide (SSG)
    │   ├── exam/
    │   │   └── page.jsx              ← Mock exam (CSR only)
    │   ├── mock-test/
    │   │   └── [number]/
    │   │       └── page.jsx          ← /mock-test/1–23 (SSG — 23 indexable pages)
    │   ├── topic/
    │   │   └── [slug]/
    │   │       └── page.jsx          ← /topic/british-history etc. (SSG — 12 pages)
    │   ├── faq/
    │   │   └── page.jsx              ← /faq — 30+ Q&As (SSG — Featured Snippets gold)
    │   ├── cheat-sheet/
    │   │   └── page.jsx              ← /cheat-sheet — key dates/facts (SSG)
    │   ├── test-centres/
    │   │   └── page.jsx              ← /test-centres — 60+ centres with maps (SSG)
    │   ├── how-to-pass/
    │   │   └── page.jsx              ← /how-to-pass — study strategy guide (SSG)
    │   ├── hardest-questions/
    │   │   └── page.jsx              ← All hard questions (SSG — SEO page)
    │   ├── most-missed-questions/
    │   │   └── page.jsx              ← Commonly failed questions (ISR daily)
    │   ├── 2026-test-prep/
    │   │   └── page.jsx              ← Seasonal keyword page (SSG)
    │   ├── exam-format/
    │   │   └── page.jsx              ← How the test works (SSG — link magnet)
    │   ├── pass-rate/
    │   │   └── page.jsx              ← Pass rates and stats (SSG — link magnet)
    │   ├── daily/
    │   │   └── page.jsx              ← Daily 5 Questions (CSR only)
    │   ├── weak-spots/
    │   │   └── page.jsx              ← Weak spots (CSR only)
    │   ├── progress/
    │   │   └── page.jsx              ← Progress dashboard (CSR only)
    │   └── flashcards/
    │       └── page.jsx              ← Flashcards (CSR only)
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx            ← 'use client' — shows XP + streak
    │   │   ├── BottomNav.jsx         ← 'use client' — mobile navigation
    │   │   └── PageWrapper.jsx       ← 'use client' — Framer Motion page transition
    │   ├── ui/
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   ├── ProgressBar.jsx
    │   │   ├── ProgressRing.jsx
    │   │   ├── XPBadge.jsx           ← 'use client'
    │   │   ├── StreakBadge.jsx       ← 'use client'
    │   │   ├── LevelBadge.jsx        ← 'use client'
    │   │   ├── Toast.jsx             ← 'use client'
    │   │   ├── Modal.jsx             ← 'use client'
    │   │   ├── Skeleton.jsx
    │   │   └── ErrorBoundary.jsx     ← 'use client'
    │   └── game/
    │       ├── QuestionCard.jsx      ← 'use client'
    │       ├── AnswerButton.jsx      ← 'use client'
    │       ├── ExplanationPanel.jsx  ← 'use client'
    │       ├── TimerBar.jsx          ← 'use client'
    │       ├── ResultScreen.jsx      ← 'use client'
    │       ├── XPPopup.jsx           ← 'use client'
    │       ├── BadgeUnlock.jsx       ← 'use client'
    │       ├── ConfettiBlast.jsx     ← 'use client' + dynamic import
    │       └── FlashCard.jsx         ← 'use client'
    ├── context/
    │   └── GameContext.jsx           ← 'use client' — ALL game state lives here
    ├── hooks/
    │   ├── useProgress.js            ← localStorage abstraction
    │   ├── useStreak.js              ← Daily streak logic
    │   ├── useReadiness.js           ← Readiness score calculation
    │   ├── useWeakSpots.js           ← Weak question identification
    │   ├── useBadges.js              ← Badge unlock detection
    │   └── useAudioNarration.js      ← Web Speech API — reads questions aloud (Gap 1)
    ├── algorithms/
    │   ├── sm2.js                    ← Core SM-2+ algorithm (pure functions)
    │   ├── sessionBuilder.js         ← Adaptive session composition
    │   ├── readiness.js              ← Readiness score algorithm
    │   ├── mastery.js                ← getMasteryLevel, getChapterMastery
    │   └── getDueToday.js            ← Daily review queue count
    └── data/
        ├── questions.js              ← 570 questions (THE source of truth)
        ├── badges.js                 ← 13 badge definitions
        ├── levels.js                 ← XP level thresholds
        ├── studyGuide.js             ← Handbook content by chapter/section
        ├── mockTests.js              ← getMockTest() + MOCK_TEST_NUMBERS (45 tests)
        ├── topics.js                 ← TOPICS array + getTopicQuestions()
        ├── testCentres.js            ← All 60+ UK test centres with addresses (Gap 2)
        ├── cheatSheet.js             ← Key dates, numbers, people, saints (Gap 4)
        ├── faqs.js                   ← 35 Q&As for /faq page (Gap 3)
        └── mostMissed.js             ← Curated/analytics-driven most-failed list
```

---

## 5. COMMANDS

```bash
npm install                   # Install all dependencies (run once)
npm run dev                   # Dev server → http://localhost:3000
npm run build                 # Production build — MUST pass before task is done
npm run start                 # Run production build locally
npm run lint                  # ESLint check
npm run postbuild             # Generate sitemap (runs after build automatically)
```

---

## 6. NEXT.JS CODE PATTERNS — COPY THESE EXACTLY

### SSG page with metadata (practice chapter page)
```jsx
// src/app/practice/[chapter]/page.jsx
import { QUESTIONS, CHAPTERS } from '@/data/questions'
import PracticeClient from './PracticeClient'  // 'use client' component

export async function generateStaticParams() {
  return CHAPTERS.map(ch => ({ chapter: ch.id.toString() }))
}

export async function generateMetadata({ params }) {
  const chapter = CHAPTERS.find(c => c.id === parseInt(params.chapter))
  return {
    title: `${chapter.title} Practice — PassTheUKTest Life in the UK Test`,
    description: `Practice ${chapter.title} questions for your Life in the UK citizenship test. Free, adaptive, with detailed explanations.`,
    alternates: { canonical: `https://passtheuktest.co.uk/practice/${params.chapter}` },
  }
}

export default function PracticePage({ params }) {
  const chapter = parseInt(params.chapter)
  const questions = QUESTIONS.filter(q => q.chapter === chapter)
  return <PracticeClient chapter={chapter} questions={questions} />
}
```

### Individual question page (SEO goldmine)
```jsx
// src/app/questions/[id]/page.jsx
import { QUESTIONS } from '@/data/questions'
import QuestionPageClient from './QuestionPageClient'

export async function generateStaticParams() {
  return QUESTIONS.map(q => ({ id: q.id.toString() }))
}

export async function generateMetadata({ params }) {
  const q = QUESTIONS.find(q => q.id === parseInt(params.id))
  if (!q) return {}
  // Truncate question for title (max 60 chars)
  const shortQ = q.q.length > 55 ? q.q.slice(0, 55) + '...' : q.q
  return {
    title: `${shortQ} — Life in the UK Test`,
    description: `Answer: ${q.options[q.answer]}. ${q.explanation.slice(0, 120)}`,
    openGraph: { title: shortQ, description: q.explanation.slice(0, 150) },
  }
}

export default function QuestionPage({ params }) {
  const question = QUESTIONS.find(q => q.id === parseInt(params.id))
  if (!question) return notFound()
  return <QuestionPageClient question={question} />
}
```

### GameContext provider in root layout
```jsx
// src/app/layout.jsx
import { GameProvider } from '@/context/GameContext'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import './globals.css'

export const metadata = {
  title: { default: 'PassTheUKTest — Free Life in the UK Test Practice 2026',
           template: '%s — PassTheUKTest' },
  description: 'The smartest way to prepare...',
  metadataBase: new URL('https://passtheuktest.co.uk'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          <Navbar />
          <main>{children}</main>
          <BottomNav />
        </GameProvider>
      </body>
    </html>
  )
}
```

### localStorage guard (use everywhere)
```js
// Always guard localStorage reads — Server Components don't have window
function loadState() {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = localStorage.getItem('passtheuktest_v1')
    return raw ? JSON.parse(raw) : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}
```

### Dynamic import for heavy client components
```jsx
// Use for ConfettiBlast, heavy animations — reduces initial bundle
import dynamic from 'next/dynamic'
const ConfettiBlast = dynamic(() => import('@/components/game/ConfettiBlast'), {
  ssr: false  // Never SSR confetti
})
```

---

## 7. DESIGN SYSTEM (load DESIGN_SYSTEM.md for full spec)

Hard rules:
- **Dark only.** bg = `#0d0f1a`, cards = `#131629`, raised = `#1a1e33`
- **Colours:** brand = `#3381ff`, xp = `#f59e0b`, success = `#22d07a`, danger = `#ff4d6d`
- **Fonts:** Clash Display (headings), Satoshi (body), JetBrains Mono (numbers)
- **NO:** Inter, Roboto, Arial
- **Mobile first.** 375px is the primary design target.
- Min tap target 44×44px. Card padding 20px min.
- All animations: transform + opacity only (never width/height)

---

## 8. GAMIFICATION (load ARCHITECTURE.md for full algorithms)

- XP: +10 first-try correct, +5 after wrong, 0 for wrong, +25 chapter, +100 pass exam
- Streak: 5 questions/day threshold, resets if day skipped
- SM-2+ per question: easeFactor, interval, dueDate, repetitions, state
- 4 mastery levels: Unseen → Attempted → Familiar → Learned → Mastered
- 13 badges with defined unlock conditions
- Readiness 0–100%: mastery distribution (50%) + coverage (30%) + streak (20%)
- Response time measured per answer → feeds SM-2 confidence

---

## 9. SEO REQUIREMENTS (load SEO_STRATEGY.md for full spec)

### Every SSG page needs this metadata shape:
```js
{
  title: '[Specific title] — PassTheUKTest Life in the UK Test',
  description: '[Under 155 chars, includes keyword]',
  openGraph: { title, description, url, type: 'website' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://passtheuktest.co.uk/[path]' },
}
```

### Schema markup on question pages:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "[question text]",
    "acceptedAnswer": { "@type": "Answer", "text": "[answer + explanation]" }
  }]
}
```

### Sitemap (auto-generated via next-sitemap):
- All /questions/[id] pages — priority 0.8
- All /practice/[chapter] pages — priority 0.9
- All /study/[chapter] pages — priority 0.8
- Homepage — priority 1.0

---

## 10. STATE MANAGEMENT

GameContext.jsx (must be 'use client'):
```js
// Provides to all client components:
{ state, dispatch, addXP, recordAnswer, completeChapter, completeExam, unlockBadge }

// localStorage key: 'passtheuktest_v1'
// Persist: useEffect watching state → localStorage.setItem
// Load: useState initialiser with loadState() function
// Migration: migrateState() on every load
```

---

## 11. PERFORMANCE TARGETS

- Lighthouse mobile ≥ 90 (performance, accessibility, SEO)
- LCP < 2.5s, INP < 200ms, CLS < 0.1
- JS bundle for question page < 80KB gzipped
- Use `dynamic()` with `ssr: false` for: ConfettiBlast, heavy animations
- `next/image` for ALL images
- `next/font` for ALL fonts

---

## 12. CODE STANDARDS

- Functional components only. No class components.
- `'use client'` on any component with useState/useEffect/browser APIs
- clsx() for all conditional classes
- No inline style={{}} except dynamic numbers (width percentages)
- No bare console.log — wrap in `if (process.env.NODE_ENV === 'development')`
- Path alias: `@/` maps to `src/` (configured in next.config.js)

---

## 13. ABSOLUTE RULES

1. NO paywall, login wall, premium gate — everything free until instructed
2. BOTH light and dark themes must work — user can toggle between them
3. NO Inter/Roboto as primary fonts
4. NO external API calls without explicit instruction
5. NO 'use client' on pages that can be Server Components
6. NO SSG page without generateStaticParams AND generateMetadata
7. NO localStorage in Server Components
8. NO shipping without npm run build passing
9. NO question without an explanation
10. NO removing gamification features to simplify
11. EVERY QuestionCard must have an AudioButton (useAudioNarration hook — Gap 1)
12. EVERY mock test result must have a "Download PDF" button (window.print() — Gap 6)
13. NO question page or mock test page without internal links to /cheat-sheet and /faq
14. The /faq page must have FAQPage schema covering all 35 questions — Featured Snippets
15. The /cheat-sheet page must have a print button — users share this before their test

---

## 14. DEFINITION OF DONE

Before marking any task complete:
- [ ] `npm run build` passes with zero errors
- [ ] Feature works on 375px mobile viewport in Chrome DevTools
- [ ] All new SSG pages have generateStaticParams + generateMetadata
- [ ] No console errors in browser
- [ ] localStorage state persists on page refresh
- [ ] PROGRESS.md updated
