## PHASE 3 — DATA ANALYSIS

Use the `data-analyst` subagent (Python: pandas, matplotlib). Output `/research/data-analysis.md` + charts.

1. **Data integrity first:** check date ranges, timezone, currency, missing values, URL normalization (trailing slashes, parameters, http/https), and whether AdSense and Analytics totals roughly reconcile. Report problems before analysis.
2. **Baseline:** RPS, Page RPM, impressions per page, CTR, CPC, pages/session, engagement time — overall and by device and country.
3. **Concentration:** % of revenue from top 10/20% of pages, countries, devices.
4. **Opportunity map:** high-traffic / low-RPM pages; pages with high engagement but few ad impressions; templates under-monetized vs. site median.
5. **Opportunity sizing:** estimated monthly gain if each segment reached the site median and top quartile (conservative / likely / optimistic).
6. **Trends:** seasonality, sudden drops, and what changed around those dates.
7. **Risk scan:** CTR anomalies by page, country, or source that could signal invalid traffic.
8. **Content intelligence:** which topics/page types earn most per session; cross-reference Search Console to find high-RPS topics with growth room.
9. **Testability:** using daily variance, estimate the **minimum detectable effect** for a 2- and 4-week test at my traffic level, so we know which experiments are even measurable.

---

## DEFINITION OF DONE
- [ ] Data integrity report written before any analysis
- [ ] Baseline table (RPS, Page RPM, impressions/page, CTR, CPC, viewability, pages/session) by device and country
- [ ] Opportunity sizing with conservative / likely / optimistic ranges, calculations shown
- [ ] Invalid-traffic risk scan done
- [ ] Minimum detectable effect calculated for 2- and 4-week tests
