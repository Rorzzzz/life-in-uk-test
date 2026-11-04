## PHASE 4 — TECHNICAL & UX AUDIT

Output `/research/site-audit.md`. Each finding: severity (Critical / High / Medium / Low), evidence (file + line, or URL + screenshot), fix, expected impact, lever affected.

**Setup:** ads.txt at root and correct; publisher ID matches; AdSense script loaded once, async, unmodified; Auto ads vs. manual config found in code.

**Live rendering:** using Playwright, load each key template (home, article, category, top 10 earning pages) at mobile and desktop sizes. Screenshot full pages to `/research/screenshots/site/`. Note how anchor/vignette behave. (Detailed slot measurement happens in Phase 4B.)

**Technical SEO basics that protect traffic:** indexability, canonical tags, sitemap health, broken links, duplicate titles, mobile usability, structured data. Traffic is the biggest lever, so flag anything that threatens it.

**Performance:** run Lighthouse (e.g. `npx lighthouse <url> --output=json --quiet --chrome-flags="--headless"`) on key templates, mobile and desktop. Check ad-caused CLS, reserved slot heights, lazy loading, third-party script weight. Also note field data (CrUX/Search Console) if available, since lab data alone can mislead.

**Content & structure:** article length and structure vs. ad opportunities; internal linking; related-content modules; thin or duplicate pages.

**Compliance:** Google-certified CMP for EEA/UK/Switzerland traffic and its configuration; privacy policy covers ads and cookies; any placement or content policy risks (run each through `policy-officer`).

---

## DEFINITION OF DONE
- [ ] Every finding has severity, evidence (file+line or URL+screenshot), fix, impact, lever
- [ ] ads.txt, ad code, CMP, and privacy policy checked
- [ ] Lighthouse run on key templates for mobile and desktop
- [ ] Technical SEO risks listed
- [ ] Policy risks run through policy-officer
