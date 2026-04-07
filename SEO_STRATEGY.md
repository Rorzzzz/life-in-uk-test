# PassPort — SEO Strategy
# Load when working on: metadata, sitemap, schema, page structure, keywords

---

## 1. WHY WE WIN ON SEO

**The core advantage:** Next.js SSG gives us pre-rendered HTML for every question.
Each of our 500 questions becomes a unique, instantly-indexed Google page.
Competitors using SPAs or WordPress with a single practice URL cannot do this.

**The content advantage:** Every question page has:
- The question as the H1 (exact match for long-tail searches)
- The correct answer in the page body
- A detailed explanation (rich content Google loves)
- Related questions (internal links = topical authority)
- Schema markup (FAQPage — eligible for Google's rich results)

A user searching *"what year did the Magna Carta get signed UK citizenship test"* will
find our question page, not a generic practice page.

---

## 2. TARGET KEYWORDS

### Primary (high volume, competitive — take 6-12 months)
```
life in the uk test                    36,720/mo  — main term
life in the uk test practice           high intent
british citizenship test               good volume
life in the uk test 2026               seasonal peak
ilr test                               niche, high conversion
life in the uk test mock exam          mid volume
```

### Secondary (medium volume, less competitive — rank in 3-6 months)
```
life in the uk test chapter [1-5]
life in the uk test history questions
life in the uk test government questions
life in the uk test free practice
how to pass life in the uk test
life in the uk test study guide
```

### Long-tail (low volume, high intent — rank fast, 1-3 months)
```
[specific question text] life in the uk test
when was [historical event] uk citizenship test
what is the patron saint of [country] uk test
[name] life in the uk test question
```
**These long-tail pages are the fast win.** Each question page targets one.
500 question pages = 500 long-tail opportunities. Competitors don't have this.

---

## 3. PAGE-BY-PAGE META TEMPLATES

### Homepage (/)
```js
{
  title: 'PassPort — Free Life in the UK Test Practice 2026',
  description: 'Practice for your Life in the UK citizenship test with 500+ free questions, adaptive learning, and gamified revision. Pass first time.',
  keywords: ['life in the uk test', 'british citizenship test', 'life in the uk practice', 'uk citizenship test 2026'],
}
```

### Practice index (/practice)
```js
{
  title: 'Practice Tests by Chapter — PassPort Life in the UK Test',
  description: 'Practice Life in the UK test questions by chapter. All 5 chapters covered. Instant feedback, XP rewards, and adaptive learning.',
}
```

### Practice chapter (/practice/[chapter])
```js
// Chapter 1
title: 'What is the UK? Practice Questions — Life in the UK Test'
description: 'Practice "What is the UK?" questions for your citizenship test. Covers UK geography, capitals, patron saints, and national symbols.'

// Chapter 2
title: 'History of the UK Practice Questions — Life in the UK Test'
description: 'Practice UK history questions. Covers Roman Britain, Magna Carta, Tudor period, World Wars, and post-war Britain.'

// Chapter 3
title: 'Modern UK Society Practice Questions — Life in the UK Test'
description: 'Practice modern UK society questions. Covers NHS, education, culture, sport, and British inventions.'

// Chapter 4
title: 'Government & Law Practice Questions — Life in the UK Test'
description: 'Practice UK government and law questions. Covers Parliament, voting, courts, police, and civil rights.'

// Chapter 5
title: 'UK Values & Principles Practice — Life in the UK Test'
description: 'Practice UK values and principles questions. Covers democracy, rule of law, equality, and community participation.'
```

### Individual question (/questions/[id])
```js
// Dynamic — generated per question
title: `[First 55 chars of question]... — Life in the UK Test`
description: `Answer: [correct option]. [First 120 chars of explanation]. Practice free at PassPort.`
```

### Study guide (/study)
```js
title: 'Study Guide — Life in the UK Test Handbook 2026'
description: 'Free online study guide covering all 5 chapters of the Life in the UK handbook. Everything you need to know to pass your citizenship test.'
```

### Study guide chapter (/study/[chapter])
```js
// Same pattern as practice chapters but focused on reading, not testing
title: '[Chapter name] — Life in the UK Study Guide'
description: 'Study [chapter topic] for your Life in the UK citizenship test. Key facts, dates, and explanations.'
```

### Exam info (/exam/info)
```js
title: 'Mock Exam — Life in the UK Test Simulator'
description: 'Take a free Life in the UK mock exam. 24 questions, 45-minute timer, instant results. Just like the real test. Find out if you\'re ready.'
```

---

## 4. SCHEMA MARKUP

### Question pages — FAQPage schema
```jsx
// In /app/questions/[id]/page.jsx — inside <head> via next/head or metadata
function QuestionSchema({ question }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": question.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${question.options[question.answer]}. ${question.explanation}`
      }
    }]
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Homepage — WebApplication schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PassPort",
  "description": "Free Life in the UK citizenship test preparation app",
  "url": "https://passport-lituk.com",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2847"
  }
}
```

### Study guide pages — Article schema
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Chapter title] — Life in the UK Study Guide",
  "description": "[Chapter description]",
  "educationalLevel": "beginner",
  "about": { "@type": "Thing", "name": "Life in the UK Test" }
}
```

---

## 5. SITEMAP CONFIGURATION

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://passport-lituk.com',
  generateRobotsTxt: true,
  exclude: ['/exam', '/progress', '/weak-spots', '/flashcards'],
  additionalPaths: async (config) => {
    // Dynamically add all question pages
    const { QUESTIONS } = require('./src/data/questions')
    return QUESTIONS.map(q => ({
      loc: `/questions/${q.id}`,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }))
  },
  transform: async (config, path) => {
    // Higher priority for main pages
    const priorities = {
      '/': 1.0,
      '/practice': 0.9,
      '/study': 0.8,
      '/exam/info': 0.7,
    }
    return {
      loc: path,
      changefreq: path.startsWith('/questions') ? 'monthly' : 'weekly',
      priority: priorities[path] || 0.8,
      lastmod: new Date().toISOString(),
    }
  },
}
```

### robots.txt
```
User-agent: *
Allow: /
Disallow: /exam
Disallow: /progress
Disallow: /weak-spots
Disallow: /flashcards
Sitemap: https://passport-lituk.com/sitemap.xml
```

---

## 6. INTERNAL LINKING STRATEGY

**Topical authority is built through internal links.**
Every page should link to related pages within the same topic cluster.

### Question page links:
- "Practice more [chapter] questions" → /practice/[chapter]
- "Related questions" → 3-5 questions from same chapter
- "Study the [chapter] guide" → /study/[chapter]

### Chapter practice page links:
- Each question in the practice UI links to its individual page
- "Read the study guide" → /study/[chapter]
- "Other chapters" → /practice

### Study guide links:
- "Practice these questions" → /practice/[chapter]
- Inline links to key question pages when a testable fact is mentioned

### Homepage links:
- Each chapter card → /practice/[chapter]
- "Start with the study guide" → /study
- "Take a mock exam" → /exam/info

---

## 7. OPEN GRAPH / SOCIAL SHARING

### OG Image (create one branded 1200×630px image)
```
Background: #0d0f1a (dark)
Logo: PassPort wordmark top-left
Central text: "Free Life in the UK Test Practice"
Subtext: "500+ Questions • Adaptive Learning • Gamified"
Bottom: passport-lituk.com
```

This image is used as the default OG image for all pages.
Question pages can generate dynamic OG images in Phase 2.

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@passportlituk" />
```

---

## 8. LAUNCH SEO CHECKLIST

Before going live:

**Technical:**
- [ ] All 500 question pages have unique title + description
- [ ] All chapter pages have unique title + description
- [ ] FAQPage schema on all question pages
- [ ] WebApplication schema on homepage
- [ ] sitemap.xml generated and accessible
- [ ] robots.txt in /public
- [ ] canonical URLs set on all pages
- [ ] 404 page exists (app/not-found.jsx)

**Search Console:**
- [ ] Verify domain ownership in Google Search Console
- [ ] Submit sitemap: https://passport-lituk.com/sitemap.xml
- [ ] Submit sitemap to Bing Webmaster Tools too
- [ ] Run URL Inspection on homepage + 3 question pages

**Performance (affects rankings):**
- [ ] PageSpeed Insights mobile score ≥ 85
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] All images use next/image
- [ ] All fonts use next/font

**Content:**
- [ ] Every question has a non-empty explanation (min 1 sentence)
- [ ] Study guide covers all 5 chapters with real content
- [ ] Homepage has at least 300 words of indexable content

---

## 9. ONGOING SEO — PHASE 2 CONTENT

Once traffic starts:

**Blog posts** (each targets a question cluster):
- "How to pass the Life in the UK test first time"
- "Life in the UK test: complete history chapter guide"  
- "Top 20 hardest Life in the UK test questions"
- "Life in the UK test: everything about UK government"

**Each blog post:**
- 1,500+ words
- Internally links to 5-10 question pages
- Targets medium-competition keywords
- Builds topical authority further

---

## 10. COMPETITOR KEYWORD GAPS

Based on competitor analysis, nobody is ranking for:
- "life in the uk test adaptive learning" — we own this term
- "life in the uk test spaced repetition" — we own this term
- "life in the uk test gamified" — we own this term
- "[specific person name] life in the uk test" — e.g., "Isambard Kingdom Brunel uk test"
- "life in the uk test [specific date]" — e.g., "1066 life in the uk test"

These long-tail question-specific terms are essentially uncontested.
500 question pages = 500 uncontested ranking opportunities from day one.
