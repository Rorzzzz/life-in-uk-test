## PHASE 4B — PLACEMENT LAB (find the optimal ad layout)

Use the `placement-scientist` subagent. Goal: for **each page type and device**, find the layout that maximizes revenue per session without hurting guardrail metrics or breaking policy. Output `/research/placement/PLACEMENT_REPORT.md`.

### Step 1 — Site inventory
- Crawl the sitemap (and the codebase routes) to list every page. If there's no sitemap, crawl internal links from the homepage, politely and rate-limited.
- Classify each page into a **page type** (article, list/listicle, how-to, category, homepage, tool/calculator, gallery, etc.).
- For each page, record: word count, number of headings, images, tables, lists, embeds, page height in pixels on mobile and desktop, internal links, traffic and revenue (from `/data`).
- Group articles into **length buckets** (e.g. <800, 800–1,500, 1,500–3,000, 3,000+ words), because the right number of ads depends heavily on length.
- Output: `/research/placement/page-inventory.csv` and a summary of which page types and buckets carry the most traffic and revenue. Placement work focuses there first.

### Step 2 — Where readers actually are (attention map)
Combine all available signals:
- Heatmap/scroll data (Clarity or similar): average fold position, % of readers reaching 25/50/75/100%, where attention drops off, rage clicks or misclicks near current ads.
- GA4 engagement time and scroll events by page type.
- If no scroll data exists: give me exact steps to add scroll-depth tracking (e.g. 25/50/75/100% events) or Clarity, **loaded only after consent where required**. Until real data arrives, estimate using industry research on scroll depth and label it ESTIMATE.

Produce, per page type × device, a **scroll-depth curve** (% of readers still present at each pixel depth). This is the core input: an ad slot's value ≈ (share of readers who reach it) × (time they spend near it) × (expected Impression RPM for that position and format).

### Step 3 — Measure the current layout precisely
Using Playwright at real device sizes (e.g. 360×800, 390×844, 412×915 mobile; 1366×768, 1440×900, 1920×1080 desktop), for key templates and top-earning pages:
- Detect every ad slot (AdSense `ins` elements and Auto ads iframes) and record its pixel position, size, and format.
- Compute: ads per viewport/screen, ad-to-content ratio per screen, distance from first ad to top, pixel gaps between ads, **minimum distance from each ad to any clickable element** (links, buttons, menus, form fields), and whether any ad sits inside or overlaps content elements.
- Measure layout shift per ad slot (use the browser's layout-shift performance entries) and check reserved space.
- Overlay the scroll-depth curve: which current slots sit where few readers ever arrive, and which high-attention zones have no ad.
- Save annotated screenshots to `/research/placement/current/`.

### Step 4 — Generate candidate placements
For each priority page type × device, list candidate slots using content-aware rules, e.g.:
- After the intro (after paragraph 1–3), never before the reader sees what the page is about.
- Between sections (after H2 blocks), at natural reading pauses.
- Near — but clearly separated from — images, tables, and lists; never inside a list, step sequence, or table.
- Scaling rule: number of in-content ads grows with length (e.g. one per N words or per N screens), with a minimum gap between ads.
- End-of-article and related-content area (multiplex vs. my own related links — test, since my own links may win more via pages/session).
- Sidebar/sticky options on desktop; anchor and side rail behavior.
Research-backed spacing and density rules from the knowledge base set the defaults; my own data and tests override them.

### Step 5 — Score every candidate
For each candidate slot, estimate and score:
- **Reach** (share of readers reaching it, from the scroll curve)
- **Expected viewability** (dwell time near the slot, format, sticky or not)
- **Expected value** (reach × viewability × estimated Impression RPM for that format/position)
- **UX cost** (interrupting reading, ad density per screen, likely effect on engagement and pages/session)
- **CLS risk** (can space be reserved reliably?)
- **Policy risk** (run every candidate through `policy-officer`; any FAIL is removed, GRAY is removed)
Then assemble 2–3 complete **layout variants** per page type × device (e.g. "Lean," "Balanced," "Max-safe") with the predicted RPS and guardrail impact of each.

### Step 6 — Preview before anything ships
Build local preview versions of each layout variant (placeholder boxes sized like real ads, clearly labeled, **no live ad code** in previews) and screenshot them at mobile and desktop sizes into `/research/placement/variants/`. Show me side-by-side comparisons with the current layout so I can judge the reader experience myself.

### Step 7 — Make every position measurable
- Recommend a **naming convention** for manual ad units, e.g. `{pagetype}_{device}_{position}` like `article_mob_incontent2`, so performance per position is visible in reports.
- Use AdSense **custom channels** (and URL channels where useful) to group ad units by layout variant, so experiments can be measured directly in AdSense reports.
- Explain the trade-offs of Auto ads, manual units, and a hybrid (manual units in key positions + Auto ads for selected formats like anchor/vignette), and how to test them without the two fighting over the same space.

### Step 8 — Placement experiments
- Prefer AdSense's built-in experiments where they apply (e.g. Auto ads settings).
- For layout tests, choose the cleanest feasible design for my traffic:
  - **Page-group split:** randomly assign comparable pages (matched by page type, length bucket, traffic, and historical RPS) to control and variant; compare with a difference-in-differences against the pre-period.
  - **Visitor split:** deterministic, privacy-friendly assignment of visitors to variants, with each variant's ad units in its own custom channel. Only if technically clean on my stack and compliant with my consent setup.
- Pre-register each test in `decisions.md`: hypothesis, primary metric (RPS), guardrails (pages/session, engagement time, CWV, viewability, organic clicks), duration from the Phase 3 minimum-detectable-effect calculation, and stop rules (e.g. stop early if CLS or engagement clearly degrades).
- Roll out winners gradually (one page type at a time), then re-measure.

### Step 9 — Placement playbook
Write `/research/placement/PLACEMENT_PLAYBOOK.md`: the final rules per page type × device × length bucket (slot positions, spacing, formats, ad count limits, reserved heights), with evidence, so new pages automatically follow the optimal layout. If the codebase allows, propose a reusable component or insertion function that applies these rules automatically.

---

## DEFINITION OF DONE
- [ ] page-inventory.csv covers all crawlable pages with page type and length bucket
- [ ] Scroll-depth curves per page type × device (real data or clearly labeled ESTIMATE)
- [ ] Current slots measured at the listed viewport sizes, with annotated screenshots
- [ ] Every candidate slot scored; FAIL/GRAY policy candidates removed
- [ ] 2–3 layout variants per priority page type × device, with previews and predicted RPS
- [ ] Ad unit naming convention and custom channel plan written
- [ ] Experiment designs pre-registered in decisions.md
- [ ] PLACEMENT_PLAYBOOK.md written
