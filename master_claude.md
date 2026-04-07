# PassPort — Master Reference
# Load on demand: @master_claude.md
# Sections: questions spec, badge defs, SEO, analytics, deploy, slash commands, roadmap

---

## SECTION 1: FULL QUESTION BANK (src/data/questions.js)

200 questions across 5 chapters. Schema:
```js
{ id, chapter, q, options: [A,B,C,D], answer: 0-3, explanation, difficulty, tags }
```

### Chapter 1 — What is the UK? (20 questions)
Key facts: UK = England + Scotland + Wales + N.Ireland. Capitals: London, Edinburgh, Cardiff, Belfast.
Patron saints: George(Eng), Andrew(Scot), David(Wales), Patrick(NI).
National flowers: Rose(Eng), Thistle(Scot), Daffodil(Wales), Shamrock(NI).
Currency: Pound sterling. Languages: English official; Welsh, Scottish Gaelic, Irish recognised.
Geography: ~1,000 islands, Ben Nevis highest peak, Thames longest river in England.
Longest mainland distance: ~870 miles John O'Groats to Land's End.

### Chapter 2 — History (70 questions)
Key eras: Stone/Bronze/Iron Age → Romans (43 AD) → Anglo-Saxons → Vikings → 1066 Norman Conquest →
Magna Carta 1215 → Black Death 1348 → Wars of Roses → Tudors (Henry VIII, Elizabeth I) →
Union of Crowns 1603 → Civil War 1642 → Restoration 1660 → Bill of Rights 1689 →
Act of Union 1707 (Scotland), 1801 (Ireland) → Industrial Revolution 18th-19thC →
British Empire (largest ever, ~1920) → WW1 1914-18 → Women's suffrage 1918/1928 →
WW2 1939-45 → Welfare State/NHS 1948 → Post-war immigration (Empire Windrush 1948) →
Devolution 1999 (Scottish Parliament, Welsh Senedd, N.Ireland Assembly).

Critical dates to include as questions:
1066, 1215, 1348, 1532, 1588, 1603, 1642, 1649, 1660, 1689, 1707, 1801, 1832, 1914, 1918, 1928, 1939, 1945, 1948, 1999

### Chapter 3 — Modern Society (40 questions)
Topics: Population (~67M), religions (59% Christian per 2011 census), NHS, education system,
sport (football, cricket, rugby, tennis, golf), arts (Turner Prize, Booker Prize, BAFTA),
music (The Beatles, Rolling Stones), literature (Shakespeare, Dickens, Austen, Rowling),
architecture (Big Ben, Stonehenge, Eden Project), inventions (WWW - Berners-Lee 1989,
telephone - Bell 1876, penicillin - Fleming 1928, steam engine - Watt, TV - Baird),
public holidays, customs (Guy Fawkes, Bonfire Night, Boxing Day, Burns Night).

### Chapter 4 — Government & Law (45 questions)
Topics: Constitutional monarchy, Prime Minister (lives at No.10 Downing Street),
Cabinet, House of Commons (650 MPs), House of Lords (unelected),
General elections every 5 years max, voting age 18, first past the post,
devolved parliaments, local government (councillors), judiciary independence,
Magna Carta 1215, Bill of Rights 1689, European Convention on Human Rights,
police (non-political, unarmed generally), criminal vs civil law, jury system,
magistrates courts, Crown Courts, tax (self-assessment, PAYE, NI), driving laws,
TV licence, NHS eligibility.

### Chapter 5 — Values & Principles (25 questions)
Topics: Democracy, rule of law, individual liberty, tolerance of different faiths,
participation in community, volunteering, British passport benefits, EU membership history,
Commonwealth (54 member states, head = King Charles III), NATO, UN,
fundamental British values, equality legislation, Human Rights Act 1998,
responsibilities of citizenship (jury duty, paying taxes, voting).

---

## SECTION 2: BADGE DEFINITIONS (src/data/badges.js)

```js
export const BADGES = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Answer your very first question',
    icon: '👣',
    colour: '#3381ff',
    category: 'milestone',
    unlockCondition: 'Answer 1 question',
  },
  {
    id: 'half_century',
    name: 'Half Century',
    description: 'Answer 50 questions',
    icon: '5️⃣0️⃣',
    colour: '#a855f7',
    category: 'milestone',
    unlockCondition: 'Answer 50 questions',
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Attempt all 200 questions at least once',
    icon: '💯',
    colour: '#f59e0b',
    category: 'milestone',
    unlockCondition: 'Attempt all 200 questions',
  },
  {
    id: 'hat_trick',
    name: 'Hat Trick',
    description: '3-day practice streak',
    icon: '🎩',
    colour: '#22d07a',
    category: 'streak',
    unlockCondition: '3-day streak',
  },
  {
    id: 'on_fire',
    name: 'On Fire',
    description: '7-day practice streak',
    icon: '🔥',
    colour: '#ff4d6d',
    category: 'streak',
    unlockCondition: '7-day streak',
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: '30-day practice streak',
    icon: '💪',
    colour: '#f59e0b',
    category: 'streak',
    unlockCondition: '30-day streak',
  },
  {
    id: 'historian',
    name: 'Historian',
    description: 'Score 80%+ on the History chapter',
    icon: '⚔️',
    colour: '#a855f7',
    category: 'chapter',
    unlockCondition: '80%+ on Chapter 2',
  },
  {
    id: 'lawmaker',
    name: 'Lawmaker',
    description: 'Score 80%+ on the Government & Law chapter',
    icon: '⚖️',
    colour: '#f59e0b',
    category: 'chapter',
    unlockCondition: '80%+ on Chapter 4',
  },
  {
    id: 'master',
    name: 'Master',
    description: 'Score 80%+ on all 5 chapters',
    icon: '🏆',
    colour: '#f59e0b',
    category: 'chapter',
    unlockCondition: '80%+ on all chapters',
  },
  {
    id: 'mock_master',
    name: 'Mock Master',
    description: 'Pass your first mock exam (18/24 or higher)',
    icon: '🎓',
    colour: '#22d07a',
    category: 'exam',
    unlockCondition: 'Pass a mock exam',
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Score 24/24 on a mock exam',
    icon: '⭐',
    colour: '#f59e0b',
    category: 'exam',
    unlockCondition: 'Score 24/24 on a mock',
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Pass a mock exam with 20+ minutes remaining',
    icon: '⚡',
    colour: '#3381ff',
    category: 'exam',
    unlockCondition: 'Pass mock with 20+ min left',
  },
  {
    id: 'sharp_mind',
    name: 'Sharp Mind',
    description: 'Maintain 90%+ accuracy over 20+ questions',
    icon: '🧠',
    colour: '#a855f7',
    category: 'accuracy',
    unlockCondition: '90%+ accuracy over 20 questions',
  },
]
```

---

## SECTION 3: SEO META TEMPLATES

Add to each page using a `<Head>` component or direct `document.title` + meta tags:

```js
// src/utils/seo.js
export const SEO_PAGES = {
  home: {
    title: 'PassPort — Free Life in the UK Test Practice 2026',
    description: 'Practice for your Life in the UK citizenship test with 200+ free questions, gamified learning, and adaptive revision. Pass first time.',
    canonical: 'https://passport-lituk.com/',
  },
  practice: {
    title: 'Practice Tests — PassPort Life in the UK',
    description: 'Practice Life in the UK test questions by chapter. Instant feedback, detailed explanations, and XP rewards for every correct answer.',
    canonical: 'https://passport-lituk.com/practice',
  },
  exam: {
    title: 'Mock Exam — PassPort Life in the UK',
    description: 'Simulate the real Life in the UK test: 24 questions, 45-minute timer. Find out if you\'re ready to book your test.',
    canonical: 'https://passport-lituk.com/exam',
  },
  progress: {
    title: 'Your Progress — PassPort Life in the UK',
    description: 'Track your readiness score, XP, streaks, and badges. See exactly how close you are to passing your citizenship test.',
    canonical: 'https://passport-lituk.com/progress',
  },
  study: {
    title: 'Study Guide — PassPort Life in the UK',
    description: 'Free study guide covering all 5 chapters of the official Life in the UK handbook. Everything you need to know for your test.',
    canonical: 'https://passport-lituk.com/study',
  },
}

// Open Graph tags (add to index.html)
// og:title, og:description, og:image (1200×630 branded card), og:url, og:type
// Twitter card: summary_large_image
```

**Structured data (add to index.html `<head>`):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PassPort",
  "description": "Life in the UK Test Preparation App",
  "url": "https://passport-lituk.com",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
}
```

---

## SECTION 4: ANALYTICS EVENT SPEC

When analytics is added (PostHog or GA4), track these events:

```js
// User journey events
track('question_answered',    { questionId, chapter, wasCorrect, attemptNumber })
track('chapter_completed',    { chapterId, score, total, durationSeconds })
track('exam_completed',       { score, passed, durationSeconds })
track('badge_unlocked',       { badgeId })
track('streak_extended',      { newCount })
track('readiness_milestone',  { milestone: 50|75|80|100 })

// Engagement events
track('session_started')
track('page_viewed',          { page })
track('flashcard_swiped',     { questionId, direction: 'left'|'right' })
track('study_chapter_opened', { chapterId })
track('weak_spots_drilled')

// Conversion events (for future monetisation)
track('share_result',         { score, passed })
track('return_visit',         { daysSinceLast })
```

**Properties to send with EVERY event:**
```js
{
  sessionId: string,         // Random UUID per session
  platform: 'web',
  viewport: 'mobile'|'tablet'|'desktop',
  xp: number,               // Current XP
  streak: number,           // Current streak
}
```

---

## SECTION 5: DEPLOY PIPELINE

### Cloudflare Pages (recommended — free, edge, fast)
```bash
# Connect GitHub repo to Cloudflare Pages
# Build command: npm run build
# Output directory: dist
# Environment variables: none for v1

# Auto-deploy on push to main
# Preview deploys on PRs (every branch gets a URL)
```

### Netlify (alternative)
```bash
# Build command: npm run build
# Publish directory: dist
# Add _redirects file to /public:
/* /index.html 200
# This enables client-side routing
```

### Vercel (alternative)
```bash
# Zero config for Vite — just connect repo
# vercel.json not needed for basic setup
```

### Domain setup
- Buy: passport-lituk.com (or passporttest.co.uk for UK-specific)
- Point to Cloudflare Pages
- Enable HTTPS (automatic)
- Add www → apex redirect

### Performance checklist before first deploy
```bash
npm run build
# Check dist/ size: bundle should be < 300KB gzipped
# Run: npx vite-bundle-analyzer  (add to devDeps if needed)
# Images: ensure all are WebP/AVIF, under 100KB
# Fonts: Fontshare CDN handles caching — no self-hosting needed
```

---

## SECTION 6: SLASH COMMANDS (.claude/commands/)

### /new-question
"Add a new question. Ask me: chapter (1-5), question text, 4 options (A/B/C/D), correct answer, explanation, difficulty (easy/medium/hard). Then add to src/data/questions.js following the exact schema. Confirm total count after adding."

### /mobile-check
"Review $ARGUMENTS (or last component built). Check every item: 44px min tap targets, no horizontal overflow at 375px, min 15px font size, bottom nav doesn't cover content, 16px horizontal padding, focus rings on all interactive elements. Report PASS/FAIL per item with file:line for failures."

### /gamification-audit
"Audit all gamification features. Check: XP increments correctly per the table in CLAUDE.md, streak logic handles timezone edge cases, readiness score uses Bayesian algorithm from ARCHITECTURE.md, all 13 badges can be triggered, weak spots shows questions with <50% accuracy after ≥2 attempts. Report any missing implementations."

### /a11y-check
"Check $ARGUMENTS for WCAG 2.1 AA compliance. Verify: focus rings visible on all interactive elements, colour is not the only indicator of state (check/X icons on answers), aria-labels on icon buttons, role+aria-valuenow on progress bars, aria-live on dynamic score updates, focus trap in modals, Escape closes modals. Report findings."

### /perf-check
"Check src/ for performance issues: useMemo missing on readiness calculation, useCallback missing on prop functions, question bank imported inside component render, missing React.lazy on pages, any console.logs not wrapped in DEV check. List with file:line."

### /ship-check
"Pre-deploy checklist. Run: npm run build (must pass). Then check: question flow works end-to-end, XP persists on refresh, exam timer counts down, confetti fires on pass, mobile layout at 375px, no console errors, all page <title> tags set, SEO meta descriptions present. Report any failures."

### /add-chapter
"I'm going to provide chapter content from the Life in the UK handbook. Extract all testable facts and generate questions following the schema in master_claude.md Section 1. Aim for the target question count for this chapter. Group by difficulty: 30% easy, 50% medium, 20% hard."

### /competitor-compare
"List every feature we have built so far. Compare against the competitor weaknesses in CLAUDE.md Section 16. What are the top 5 remaining items that would most differentiate us? Prioritise by user impact."

---

## SECTION 7: BUILD ROADMAP

### Phase 1 — Core (current)
- [ ] package.json + vite/tailwind config
- [ ] index.html + fonts
- [ ] src/index.css global styles
- [ ] src/data/questions.js (200 questions)
- [ ] src/data/badges.js
- [ ] src/data/levels.js
- [ ] src/context/GameContext.jsx
- [ ] src/hooks/useProgress.js
- [ ] src/hooks/useStreak.js
- [ ] src/hooks/useReadiness.js
- [ ] src/hooks/useWeakSpots.js
- [ ] src/hooks/useBadges.js
- [ ] src/components/ui/ErrorBoundary.jsx
- [ ] src/components/ui/Button.jsx
- [ ] src/components/ui/Card.jsx
- [ ] src/components/ui/ProgressBar.jsx
- [ ] src/components/ui/ProgressRing.jsx
- [ ] src/components/ui/Toast.jsx
- [ ] src/components/ui/XPBadge.jsx
- [ ] src/components/ui/StreakBadge.jsx
- [ ] src/components/layout/Navbar.jsx
- [ ] src/components/layout/BottomNav.jsx
- [ ] src/components/layout/PageWrapper.jsx
- [ ] src/components/game/QuestionCard.jsx
- [ ] src/components/game/AnswerButton.jsx
- [ ] src/components/game/ExplanationPanel.jsx
- [ ] src/components/game/XPPopup.jsx
- [ ] src/components/game/ConfettiBlast.jsx
- [ ] src/pages/Home.jsx
- [ ] src/pages/Practice.jsx
- [ ] src/pages/Exam.jsx
- [ ] src/pages/Progress.jsx
- [ ] src/pages/NotFound.jsx
- [ ] src/App.jsx + main.jsx

### Phase 2 — Full Feature Set
- [ ] src/pages/WeakSpots.jsx
- [ ] src/pages/StudyGuide.jsx
- [ ] src/pages/Flashcards.jsx
- [ ] src/components/game/FlashCard.jsx (swipe gestures)
- [ ] src/components/game/BadgeUnlock.jsx
- [ ] src/components/game/ResultScreen.jsx
- [ ] src/components/game/TimerBar.jsx
- [ ] src/components/ui/Modal.jsx
- [ ] src/components/ui/Skeleton.jsx
- [ ] src/data/studyGuide.js (handbook content)
- [ ] src/hooks/useSound.js
- [ ] SEO meta tags in index.html + per-page titles

### Phase 3 — Polish & Growth
- [ ] Onboarding flow (first visit walkthrough)
- [ ] Share result card (canvas-generated image)
- [ ] Offline support (service worker)
- [ ] Performance audit (Lighthouse ≥ 90)
- [ ] Analytics integration (PostHog)
- [ ] Blog section
- [ ] Multilingual UI (Urdu, Polish, Hindi)

### Phase 4 — Monetisation (post traffic)
- [ ] User accounts (Supabase)
- [ ] Cloud sync across devices
- [ ] Premium: AI-powered explanations
- [ ] Premium: personalised study plan
- [ ] Ad integration (Google AdSense)
- [ ] Affiliate links (handbook on Amazon)

---

## SECTION 8: KNOWN EDGE CASES TO HANDLE

```
1. localStorage full (5MB limit)
   → Catch QuotaExceededError, trim examHistory to last 10

2. User clears browser data
   → Welcome them back, start fresh gracefully (onboarded = false)

3. Exam timer expires while user is away (tab backgrounded)
   → Use visibilitychange event + stored startTime to calculate remaining time on return

4. Same question appearing twice in exam
   → Shuffle ensures no duplicates: use Set to track selected IDs

5. Chapter with 0 attempted questions (WeakSpots page)
   → Show encouragement state, not empty / broken UI

6. XP overflow (very dedicated users)
   → Level cap at Champion, XP still accumulates but shows "Max Level"

7. Streak crossing midnight while mid-session
   → Calculate streak only when the session starts and after each 5th question,
      not in real-time during practice

8. Badge already earned re-triggering
   → useBadges hook checks state.badges before dispatching UNLOCK_BADGE

9. Multiple rapid answers (double-click)
   → Disable answer buttons after first selection until ExplanationPanel shows

10. Back button during exam
    → Intercept with useBlocker (React Router) and show confirmation dialog
```

---

## SECTION 9: STUDY GUIDE CONTENT STRUCTURE (src/data/studyGuide.js)

```js
export const STUDY_GUIDE = [
  {
    chapterId: 1,
    title: 'What is the UK?',
    sections: [
      {
        title: 'The countries of the UK',
        content: `The United Kingdom is made up of four countries: England, Scotland, Wales, and Northern Ireland...`,
        keyFacts: [
          'Capital of England: London',
          'Capital of Scotland: Edinburgh',
          // ...
        ],
      },
      // ... more sections
    ],
  },
  // ... chapters 2-5
]
```

Content must be:
- Written in plain English (not copied from handbook — fair use)
- Broken into short paragraphs (max 4 sentences each)
- Each section ends with 2-5 key facts in bullet points
- Linked to related practice questions via questionIds
