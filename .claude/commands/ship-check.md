# Ship Check — Next.js Pre-Deploy Quality Gate
# Usage: /ship-check

Run every item. Report PASS/FAIL.

BUILD
- Run: npm run build → zero errors, zero warnings
- Run: npm run start → app loads at localhost:3000
- Check: sitemap.xml generated at public/sitemap.xml after build

SSG VERIFICATION
- Confirm /questions/[id] pages are pre-rendered (check .next/server/app/questions/)
- Confirm /practice/[chapter] pages are pre-rendered
- Confirm /study/[chapter] pages are pre-rendered
- Run: curl localhost:3000/questions/1 | grep "<title>" → must return actual title, not empty

SEO
- Each question page has unique <title> tag (not just "PassPort")
- Each question page has meta description
- FAQPage schema present on /questions/[id]
- /sitemap.xml is accessible and lists question URLs
- /robots.txt is accessible

GAME LOOP
- Answer a question → XP badge increments
- Refresh page → XP still showing (localStorage persisted)
- Answer 5 questions → streak todayCount increments
- Complete chapter → +25 XP
- Run full exam → timer visible, 24 questions
- Pass exam → confetti fires

MOBILE (simulate 375px in Chrome DevTools)
- Home page renders without horizontal scroll
- Answer buttons fully visible and tappable
- Bottom nav present, no content hidden behind it
- No elements wider than viewport

PERFORMANCE
- PageSpeed Insights mobile score ≥ 85
- No console errors in browser DevTools
- No hydration errors (look for red errors in console)

Report failures as prioritised fix list.
