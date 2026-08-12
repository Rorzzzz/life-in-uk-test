# PROJECT-TRUTH — PassTheUKTest

Legend: **[V]** verified this session · **[O]** owner-provided · **[M]** measured · **[U]** unknown/unverified

## Business
- **[V]** Free Life in the UK citizenship-test prep site. No paywall, no login.
- **[V]** Domain: passtheuktest.co.uk. Repo: github.com/Rorzzzz/life-in-uk-test. Owner: Rory Stephenson.
- **[O]** Positioning: the free, gamified, no-paywall alternative to subscription test sites.
- **[U]** Primary conversion — not defined yet. No paid product; likely goal = traffic → (future) ads/affiliate. **NEEDS OWNER INPUT.**

## Stack (verified)
- **[V]** Next.js 14 App Router, SSG. React 18, Tailwind 3. Deployed on Vercel (auto-deploy on push to `main`).
- **[V]** ~1,098 static pages. Content: 767 questions, 60 mock tests, 146 articles, 11 free tools, hubs.
- **[V]** SEO: next-sitemap (1,079 URLs), robots.txt, self-canonical, per-page metadata, JSON-LD (Article/FAQPage/Quiz/BreadcrumbList/WebApplication/ItemList/CollectionPage).

## Search landscape
- **[V]** Commodity space ("mock test", "practice questions") dominated by incumbent lifeintheuktestweb.co.uk (~400k/mo). Not winnable head-on on a young domain.
- **[V]** Strategy = **non-commodity content**: immigration/ILR/citizenship topics the test incumbents don't cover, feeding the differentiated **free-tools cluster** (the moat).
- **[V]** Competitor futurecitizen.co.uk ranks via ~250 bought PBN/`.shop` spam links — do NOT replicate (link-scheme + AdSense risk).

## Measurement — CRITICAL GAPS
- **[U]** **No Google Search Console access.** Cannot measure indexing coverage, queries, CTR, position, or anomalies. Last known (memory, Apr 2026): ~81 pages indexed of ~1,090. Blocks §34–38 of the operating model.
- **[U]** **Analytics not connected** (Supermetrics connector unauthorised; cannot OAuth in this environment). No traffic/conversion/revenue feedback.
- These two gaps mean the evidence loop is **half-blind**: I can build and protect, but cannot measure outcomes. Closing them is the highest-leverage unblock.

## Authorisation (observed pattern this session)
- **[O]** Safe, reversible changes (content, metadata, internal links, schema, tool copy, new pages) made autonomously and pushed. Build must pass before push.
- **[U]** No stated policy on destructive changes (URL migration, deletion) — assume these need explicit approval.

## Known constraints
- **[V]** G: disk chronically near-full — builds occasionally fail on ENOSPC; clear `.next`/npm cache when needed.
- **[V]** All immigration figures must be GOV.UK-verified before publishing (see article process memory).

## Current state (2026-08-08)
- On-page/technical SEO: clean (0 broken internal links, 0 dup/missing metadata, noindex correct).
- Tools cluster + question-index hubs + 5 new non-commodity articles shipped this session.
- Next highest-value action is gated on the measurement gaps above.
