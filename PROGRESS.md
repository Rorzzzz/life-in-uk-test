# PassPort — PROGRESS.md
# Read at session start. Update at session end.

---

## STATUS: Phase 2 — FULL APP BUILT. Build passes. 656 static pages.

**Stack:** Next.js 14 App Router + Tailwind + Framer Motion
**Last session:** Full app built from scratch — all data, algorithms, context, hooks, components, and pages.
**Build state:** `npm run build` passes ✓ — 656 static pages generated. Sitemap auto-generated.

---

## WHAT WAS BUILT THIS SESSION

### Data layer
- `src/data/questions.js` — 570 questions merged from 3 batches (batch1 + batch2 + batch3)
- `src/data/badges.js` — 13 badge definitions with unlock conditions
- `src/data/levels.js` — 20 XP levels with titles (Newcomer → Citizenship Champion)
- `src/data/mockTests.js` — 45 mock tests, seeded shuffle, stratified by chapter
- `src/data/topics.js` — 12 topic hub pages with tag-based question filtering
- `src/data/studyGuide.js` — Full handbook summary, 5 chapters, all sections
- `src/data/faqs.js` — 35 Q&As across 7 categories (FAQPage schema on /faq)
- `src/data/cheatSheet.js` — Key dates, numbers, people, inventions, patron saints, capitals
- `src/data/testCentres.js` — 62 UK test centres across all regions with Google Maps links
- `src/data/mostMissed.js` — Curated most-failed question IDs

### Algorithms
- `src/algorithms/sm2.js` — SM-2+ spaced repetition (pure functions)
- `src/algorithms/mastery.js` — getMasteryLevel, getChapterMastery, getWeakQuestions
- `src/algorithms/readiness.js` — Readiness score 0–100% (mastery 50% + coverage 30% + streak 20%)
- `src/algorithms/sessionBuilder.js` — Adaptive session builder (due/weak/new mix)
- `src/algorithms/getDueToday.js` — SM-2 due queue, overdue priority

### Context & State
- `src/context/GameContext.jsx` — useReducer, localStorage, XP/streak/badge/progress
- `src/context/ThemeContext.jsx` — light/dark toggle, data-theme attribute

### Hooks
- `src/hooks/useProgress.js`
- `src/hooks/useStreak.js`
- `src/hooks/useReadiness.js`
- `src/hooks/useWeakSpots.js`
- `src/hooks/useBadges.js`
- `src/hooks/useAudioNarration.js` — Web Speech API, British English

### UI Components
- `src/components/ui/` — Button, Card, ProgressBar, ProgressRing, XPBadge, StreakBadge,
  LevelBadge, Toast, Modal, Skeleton, ErrorBoundary, ThemeToggle

### Layout Components
- `src/components/layout/Navbar.jsx` — Desktop nav with XP/streak/level
- `src/components/layout/BottomNav.jsx` — Mobile nav, active state
- `src/components/layout/PageWrapper.jsx` — Framer Motion page transition

### Game Components
- `src/components/game/QuestionCard.jsx` — Full game loop + AudioButton (Gap 1)
- `src/components/game/AnswerButton.jsx` — correct/incorrect/missed states
- `src/components/game/ExplanationPanel.jsx` — XP display + internal links
- `src/components/game/TimerBar.jsx` — Animated countdown
- `src/components/game/XPPopup.jsx` — Float-up XP animation
- `src/components/game/BadgeUnlock.jsx` — Auto-dismiss badge toast
- `src/components/game/ConfettiBlast.jsx` — canvas-confetti, dynamic import
- `src/components/game/ResultScreen.jsx` — Pass/fail with confetti
- `src/components/game/FlashCard.jsx` — 3D flip card
- `src/components/game/PrintTest.jsx` — window.print() PDF export (Gap 6)

### Pages (all SSG pages have generateStaticParams + generateMetadata)
**SSG Pages (pre-rendered HTML):**
- `/` — Home dashboard
- `/practice` — Chapter selector
- `/practice/[chapter]` — Per-chapter adaptive practice (5 chapters)
- `/questions/[id]` — Individual question pages with FAQPage schema (570 pages)
- `/study` — Study guide index
- `/study/[chapter]` — Chapter study guides (5 pages)
- `/mock-test/[number]` — 45 mock test pages
- `/topic/[slug]` — 12 topic hub pages
- `/faq` — 35 Q&As with FAQPage schema (Featured Snippets)
- `/cheat-sheet` — Printable key facts (with Print button)
- `/test-centres` — 62 test centres with Maps links (Gap 2)
- `/how-to-pass` — 1000+ word guide with HowTo schema (Gap 7)
- `/hardest-questions` — Top 50 hard questions
- `/most-missed-questions` — Commonly failed questions
- `/exam-format` — How the test works
- `/pass-rate` — Statistics and improvement tips

**CSR Pages (no SSG):**
- `/exam` — Mock exam with timer
- `/progress` — Progress dashboard
- `/daily` — Daily 5 spaced repetition
- `/weak-spots` — Weak question driller
- `/flashcards` — 3D flip flashcards

### Styling
- CSS design tokens (CSS variables) defined in globals.css for dark + light themes
- Tailwind config updated with shorthand aliases (card, raised, border)
- Print styles added (@media print)
- Google Fonts (Plus Jakarta Sans + DM Sans + JetBrains Mono) replacing local fonts

---

## BUILD STATS
- **656 static pages generated** ✓
- **Sitemap generated** at /sitemap.xml ✓
- **Zero build errors** ✓
- First Load JS shared: 87.1 kB (well within targets)

---

## IMMEDIATE NEXT STEPS

```
POLISH & FIXES (Priority order):
1. Test on mobile — check 375px viewport, tap targets, bottom nav clearance
2. Add missing pages that were in spec but not built:
   - /2026-test-prep page (seasonal SEO)
   - /mock-test index page (list all 45 tests)
3. Add dark/light theme toggle to mobile (currently desktop only in Navbar)
4. Add ThemeToggle to BottomNav or home page for mobile users
5. Test localStorage persistence (answer question → refresh → XP persists)
6. Add an eslint config file (currently may be missing)
```

---

## COMPLETED

- [x] CLAUDE.md (Next.js version — complete operating manual)
- [x] SEO_STRATEGY.md
- [x] master_claude.md
- [x] ARCHITECTURE.md
- [x] DESIGN_SYSTEM.md
- [x] ADAPTIVE_LEARNING.md
- [x] package.json
- [x] next.config.js
- [x] jsconfig.json
- [x] tailwind.config.js (updated with CSS tokens + shorthand aliases)
- [x] postcss.config.js
- [x] next-sitemap.config.js
- [x] src/app/globals.css (CSS variables for dark + light themes, print styles)
- [x] src/app/layout.jsx (Google Fonts, GameProvider + ThemeProvider)
- [x] All data files (questions, badges, levels, mockTests, topics, studyGuide, faqs, cheatSheet, testCentres, mostMissed)
- [x] All algorithm files (sm2, mastery, readiness, sessionBuilder, getDueToday)
- [x] All context files (GameContext, ThemeContext)
- [x] All hooks (useProgress, useStreak, useReadiness, useWeakSpots, useBadges, useAudioNarration)
- [x] All UI components
- [x] All layout components
- [x] All game components
- [x] All pages (see list above)
- [x] npm run build — PASSES ✓ (656 pages, 0 errors)

---

## QUALITY GATES

**SEO:**
- [x] npm run build → zero errors
- [x] All 570 question pages pre-rendered
- [x] All 45 mock test pages pre-rendered
- [x] All 12 topic pages pre-rendered
- [x] /faq, /cheat-sheet, /test-centres, /how-to-pass, /hardest-questions, /most-missed-questions
- [x] Sitemap generated
- [x] Each question page has unique title + description
- [x] FAQPage schema on /faq
- [x] QAPage (FAQPage) schema on question pages
- [x] HowTo schema on /how-to-pass
- [ ] Google Search Console verified (post-launch)

**Functionality:**
- [ ] Answer question → XP increments (needs browser test)
- [ ] Refresh → XP persists (needs browser test)
- [ ] 5 questions/day → streak increments (needs browser test)
- [ ] Complete chapter → +25 XP (needs browser test)
- [ ] Pass exam → confetti + +100 XP (needs browser test)

**Performance:**
- [x] First Load JS < 100KB (87.1 kB ✓)
- [ ] Lighthouse mobile ≥ 85 (needs deployment)

**Mobile:**
- [ ] 375px viewport — needs browser test
- [ ] Bottom nav visible (needs browser test)
