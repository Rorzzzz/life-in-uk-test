## PHASE 3B — CPC INTELLIGENCE

Use the `cpc-analyst` subagent. Output `/research/cpc-intelligence.md`.

1. **CPC diagnosis:** CPC by page, topic cluster, country, device, ad format/type, month. Find where CPC is unusually low and why (low commercial intent? low-value geo? format restrictions? blocking? low viewability?).
2. **Topic value map:** group my pages into topic clusters. For each, estimate advertiser value using:
   - my actual AdSense CPC/RPM per cluster (ground truth),
   - Google Ads Keyword Planner "top of page bid" ranges for the cluster's main keywords (I'll export these if I have a Google Ads account; otherwise use reputable public keyword tools and label them as estimates),
   - Search Console queries driving each cluster.
   Note: advertiser search bids are only a **proxy** for display/content CPC. Validate against my real data before trusting it.
3. **Content opportunities:** high-value topics adjacent to what I already rank for, where I could realistically win traffic. Rank by estimated traffic × estimated RPS × probability of ranking.
4. **Commercial-intent upgrades:** existing pages that could legitimately serve higher-intent readers (comparisons, buyer's guides, "best X for Y", cost/pricing explainers) without becoming thin or misleading.
5. **Geo strategy:** revenue by country vs. traffic by country; whether content for higher-value geos (spelling, currency, local examples, regulations) is worth creating.
6. **Seasonality calendar:** when CPC peaks and dips in my niche, and a content/publishing calendar to have relevant pages ranking *before* peaks.
7. **Auction-pressure settings:** review my ad type settings, blocking controls, sensitive categories, and Ad review center blocks. Identify any that may be reducing competition. Recommend tests, not blanket changes.
8. **Contextual clarity:** check whether each important page's topic is unmistakable to Google's contextual systems (clear titles, headings, focused content, structured data where appropriate). Mixed-topic pages can attract weaker ads.
9. **Rank all CPC actions** by expected RPS gain, effort, risk, and evidence strength.

---

## DEFINITION OF DONE
- [ ] CPC diagnosis by page cluster, country, device, format, month
- [ ] Topic value map with keyword-bid proxies validated against real AdSense data
- [ ] Content, geo, and seasonality opportunities ranked by expected RPS gain
- [ ] Auction-pressure settings reviewed with test proposals (not blanket changes)
- [ ] All CPC actions ranked by gain, effort, risk, evidence
