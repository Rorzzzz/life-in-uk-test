## PHASE 0 — SETUP

1. Read adsense/ADSENSE-RULES.md fully.
2. Run the tool-readiness check (adsense/ADSENSE-RULES.md §2.7) and detect the working mode (§2.8).
3. Confirm the subagents in `.claude/agents/` and commands in `.claude/commands/` exist. If any are missing, recreate them from the descriptions in adsense/ADSENSE-RULES.md.
4. Create `/research/` with subfolders `tracks/`, `charts/`, `screenshots/`, `placement/`, plus `STATE.md` at the project root and, inside `/research/`, `assumptions.md`, `decisions.md`, `glossary.md`, `blocked-sources.md`. Add `/data/` to `.gitignore`.

---

## PHASE 0A — INTAKE

Ask me, in **one** concise message:

1. Site URL, niche, content types, CMS/framework, hosting, and how I deploy changes.
2. Monthly sessions and page views; top countries; mobile/desktop split; main traffic sources; my reporting currency.
3. Current ad setup: Auto ads on/off, formats enabled, ad load setting, manual units, other networks, CMP used.
4. Goals and limits (revenue target, "don't hurt SEO," "keep it clean," time I can spend per week).
5. Any policy messages, warnings, or ad serving limits I've received (paste the text).
6. Top 3–5 competitor or role-model sites in my niche.

Data to put in `/data` as CSV (continue with whatever is available and note gaps):
- **AdSense:** last 90 days by Page (URL), Country, Platform, Ad unit, Ad format/type, and by Date (daily); last 12–16 months by month.
- **Google Analytics:** pages (views, sessions, engagement time, entrances), traffic acquisition, country, device, over the same 90 days.
- **Search Console:** queries and pages, last 3 months.
- **AdSense extras (if available):** report by Ad type/Ad size (or "Ad format"), and by "Targeting type"/bid type if shown; screenshots or notes of Blocking controls, Ad review center blocks, and Auto ads settings.
- **Viewability:** AdSense report with **Active View viewable %** (and measurable %) by ad unit, platform, and page if available.
- **Scroll & attention data (optional but powerful):** GA4 scroll events, and/or heatmap exports from a tool like Microsoft Clarity (free scroll maps, click maps, session recordings). If I don't have this, Phase 4B will help me set it up properly behind my consent banner.
- **Keyword data (optional, helps CPC analysis):** Google Ads Keyword Planner export for my main topics, with top-of-page bid ranges by my top countries.

---

## PHASE 0B — QUICK START (value in the first session)

Before the deep work begins, spend a short pass on obvious, low-risk, high-confidence wins using only official Google sources, a quick look at my site, and my data. Examples of what to check: ads.txt correct, CMP present for UK/EEA traffic, Auto ads formats and ad load reasonable, obvious ad-caused layout shift, ads crammed near buttons, missing ads on high-traffic templates. Give me a **Top 5 Quick Wins** list with plain-English steps. Don't implement yet; the full process may refine them.

---

## DEFINITION OF DONE
- [ ] Tool readiness checked; missing tools reported or installed with approval
- [ ] Working mode (repo / live-site / mixed) identified
- [ ] Intake questions asked in one message and answers recorded in STATE.md
- [ ] Every file in `/data` listed with date range, rows, and any integrity issues
- [ ] `/data/` in `.gitignore`
- [ ] Top 5 Quick Wins delivered in plain English, each with source and risk level
- [ ] STATE.md updated with next step
