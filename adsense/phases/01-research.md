## PHASE 1 — DEEP RESEARCH (parallel, iterative, saturation-driven)

### 1.1 Tracks (run in parallel via the `adsense-researcher` subagent)

| Track | Focus |
|---|---|
| **A. Official Google** | AdSense Help Center, Program Policies, Publisher Policies, Better Ads Standards, AdSense blog & release notes, Search Central, web.dev, Ad Manager & Google Publisher Tag docs, Privacy & messaging / CMP docs, ads.txt & sellers.json (IAB Tech Lab) |
| **B. Formats & placement** | Auto ads (ad load, formats, anchor, vignette, side rail, in-page), manual units, in-article, in-feed, multiplex, responsive sizes, sticky units, fold strategy, desktop vs. mobile, viewability |
| **C. Earnings drivers** | Niche CPC/RPM benchmarks, geo differences, seasonality (Q4 peak, January dip), consent impact, traffic source quality, how traffic quality affects pricing |
| **D. Performance** | Ads and CWV (CLS, LCP, INP), reserving slot space, lazy loading, script strategy, speed vs. revenue trade-off, SEO effects |
| **E. Content & traffic** | High-RPM topic strategy, content formats that earn more per session, internal linking, risks of heavy ad load to rankings |
| **F. Controls & tools** | Blocking controls and evidence on whether they help or hurt, optimization experiments, ad review center, site management |
| **G. Account safety** | Invalid traffic causes & prevention, real suspension cases, appeals, early warning signs |
| **H. Beyond AdSense** | Ad Manager, header bidding, managed networks (e.g. Ezoic, Mediavine, Raptive, Monumetric): requirements, rev share, real comparisons. Distrust affiliate-driven reviews |
| **I. Community** | Reddit (r/adsense, r/juststart, r/Blogging, r/SEO, r/webdev), AdSense Community forum, WebmasterWorld, Hacker News, Indie Hackers, creator case studies. Black-hat forums **only** to learn what to avoid |
| **J. Experts** | Recognized ad-ops/publisher-monetization pros: blogs, newsletters, talks, X/LinkedIn posts (via web search) |
| **K. My niche specifically** | RPM/CPC reports, case studies, and advertiser demand **for my exact niche and top countries** |
| **L. CPC deep dive** | Everything that moves CPC: advertiser demand & competition, contextual signals (how Google understands page topic), commercial intent, geo, device, seasonality, consent/personalized vs. non-personalized ads, ad types allowed (display/text/rich media/video), ad size & format competition, viewability, traffic quality and how Google discounts low-value clicks, blocking controls' effect on auction pressure, sensitive categories, Ad review center, Ad Manager pricing rules & additional demand (Open Bidding, header bidding) |
| **M. Auction mechanics** | How the AdSense/Google Ads auction works: AdSense revenue share, ad rank, quality, smart bidding behavior, how advertisers target content (contextual, placement, topic, audience, Performance Max/Display placements), what makes advertisers exclude sites. Study the **advertiser side**: Google Ads help docs and PPC communities (r/PPC, r/googleads, PPC blogs) |
| **N. Deep & technical sources** | Google patents on ad selection and contextual targeting, academic papers on ad auctions and display advertising, IAB standards, Google's Display & Video/Google Ads documentation, Wayback Machine snapshots of AdSense policy and help pages (to learn what changed and when) |
| **O. International communities** | Large AdSense publisher communities in other languages (e.g. Spanish, Portuguese, Hindi, Indonesian, German, French, Arabic, Vietnamese, Turkish). Search in those languages, translate findings, and note which insights are country-specific |
| **P. Video & audio knowledge** | YouTube videos, webinars, and podcasts by publishers and ad-ops pros: use published transcripts, show notes, or summaries where accessible |

### 1.2 Query patterns (per track, broad → specific → contrarian)
- `[topic] 2026` · `[topic] case study` · `[topic] RPM before after`
- `[topic] site:support.google.com` · `[topic] site:reddit.com`
- `[topic] didn't work` · `[topic] lowered RPM` · `[topic] myth` · `[topic] account disabled`
- Data hunts: `"page RPM went from"` · `"CLS" ads fixed results` · `"ad load" experiment results`

### 1.3 The research loop
```
REPEAT:
  1. Search → open and read full pages (web fetch), not just snippets
  2. Extract every concrete claim, number, tactic, warning
  3. Tag: source URL, date, type (Official / Expert / Case study with data / Anecdotal), confidence
  4. Gap analysis: unknowns, contradictions, single-source claims
  5. New queries aimed at the gaps
UNTIL two consecutive rounds yield nothing meaningfully new (or budget is reached)
```
Log rounds in `/research/research-log.md`.

### 1.4 Verification rules
- Usable claims need **an official Google source OR ≥3 independent sources**.
- Actively search for counter-evidence for every major tactic.
- Resolve contradictions with reasoning; label anything unresolved **UNVERIFIED**.

### 1.5 Competitive teardown
For each competitor/role-model site I listed (plus 3–5 top sites you find in my niche), visit a few representative public pages using a headless browser (e.g. Playwright) at mobile (390×844) and desktop (1440×900) sizes. Document: number of ads per page and per screen, first ad position, formats used (anchor, side rail, in-content, etc.), spacing, page length, related-content modules, and visible ad tech (AdSense, Ad Manager, managed network). Save screenshots to `/research/screenshots/competitors/`. Note: what they do is evidence of what's *possible*, not proof that it's optimal or compliant for my site.

### 1.6 Coverage map (nothing gets missed)
Create `/research/coverage-map.md`: a checklist of every subtopic below, each marked ⬜ not covered / 🟨 thin / ✅ saturated, with source counts. Add any new subtopics you discover. Research continues until every item is ✅ or explicitly marked "no reliable info exists."

- **Account & setup:** approval, site verification, ads.txt, sellers.json, site management, multiple sites, payments & thresholds, tax info, account health, ad serving limits
- **Policy:** program policies, publisher content policies, restricted content, Better Ads Standards, ad placement policies, valid/invalid traffic, policy center, appeals, recent policy changes and history
- **Auto ads:** every format, ad load, page exclusions, area exclusions, optimization behavior, Auto ads vs. manual results
- **Manual units:** display, in-feed, in-article, multiplex, responsive behavior, sizes, sticky/anchor, side rails, vignettes, rewarded/offerwall-type formats where available
- **Placement & UX:** fold, density, spacing, mobile vs. desktop, long-form layouts, infinite scroll, single-page apps, lazy loading, content-aware insertion (after paragraph N, around images/tables/lists), placement by word count, sticky sidebars, ad + related-content interplay, attention and scroll-depth research, measuring per-position performance with ad units and custom channels
- **Viewability:** benchmarks, how it affects pricing, how to raise it
- **CPC:** every item in Track L and M
- **CTR:** legitimate (policy-safe) factors, why CTR differs by format/device, warning thresholds for suspicious CTR
- **RPM:** page vs. impression RPM, niche/geo/device benchmarks, seasonality
- **Performance:** CWV, ad-caused CLS, script loading, CDN/caching interactions, AMP status
- **Consent & privacy:** CMP requirements by region, non-personalized/limited ads, consent rates and their revenue effect, US state privacy laws
- **Content strategy:** high-CPC topics, commercial intent, content depth, evergreen vs. seasonal, localization to high-value geos
- **Traffic:** SEO, Discover, social, referral quality, how traffic source affects earnings and invalid traffic risk
- **Controls:** blocking controls, sensitive categories, Ad review center, experiments, reporting dimensions
- **Platforms:** AdSense for Search, AdSense for YouTube relevance (if any), WordPress/plugin specifics, framework specifics (Next.js, etc.)
- **Scaling:** Ad Manager, Open Bidding, header bidding, managed networks, requirements, switching risks
- **Safety & recovery:** invalid traffic prevention, bot filtering, disablement cases, appeals, reinstatement
- **Emerging:** AI Overviews/AI search effects on publisher traffic, new AdSense formats and products, cookie changes, Privacy Sandbox status

### 1.7 Completeness audit
When you believe research is complete, launch the `coverage-auditor` subagent. It tries to find **important AdSense or CPC information that is missing** from the knowledge base by running fresh, unrelated queries and checking the coverage map. Anything new it finds goes back into the research loop. Repeat until the auditor finds nothing material.

---

## DEFINITION OF DONE
- [ ] Every track has its own file in `/research/tracks/` with tagged, dated, sourced claims
- [ ] Research log shows each loop round, and the stop reason (saturation or budget)
- [ ] Coverage map: every item ✅ or explicitly "no reliable info exists"
- [ ] Coverage auditor's last run found nothing material
- [ ] Blocked sources logged with manual-paste suggestions
- [ ] No claim relies on a source you couldn't actually read
