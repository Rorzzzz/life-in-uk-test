# DIGITAL-TWIN — PassTheUKTest

A model of how the site actually creates search value, grounded in GSC data (3mo to ~2026-08-10) + competitor recon. Updated 2026-08-13.

## Entity identity (how Google likely sees the site)
- Primary entity: **"Life in the UK test" prep site**. This is the topical identity that ranks.
- Secondary/aspirational: UK immigration (ILR, citizenship, visas) via articles + tools. **Weaker entity signal** — see tools finding below.

## Query clusters → pages → performance → competition
| Cluster | Best page | GSC signal | Competition | Verdict |
|---|---|---|---|---|
| **Cheat sheet** | /cheat-sheet | pos ~3, 17-32% CTR, 150+ clicks | low | 🏆 WINNING — the crown jewel. Replicate the format. |
| Reschedule/change-date | how-to-reschedule (+ can-i-change) | ~1,150 imp, pos 7, ~1.4% CTR | mixed | Ranks; CTR low. (Owner: don't retitle.) Possible 2-article cannibalisation. |
| Results/check-results | life-in-the-uk-test-results (+ when-do-you) | ~1,150 imp, pos 8-10, ~1.5% CTR | mixed | Same pattern. Owner: don't retitle. |
| Pass mark/rate | pass-mark, pass-rate | 400+ imp, pos 8-15 | medium | Pass-mark on page 2 — ranking gap. |
| Mock test / practice | /mock-test, /practice | pos 11, commodity | **incumbent (lifeintheuktestweb 400k/mo)** | Hard — commodity red ocean. |
| Test centres (+local) | /test-centres | 338 imp, pos 12, many city variants | medium | Near page 1; local intent untapped. |
| Handbook facts | /questions/[id] | "coronation st soap" 1,820 imp pos 11 / "rspca" 193 / "flower england" 47 | low-medium | Big untapped class, stuck page 2. |
| **Immigration tools** | /ilr-calculator, /absence-calculator etc | **pos 48-80**, ~0 clicks | **exact-match domains (ilrcalculator.com) + solicitor firms** | ❌ Losing head terms. See below. |
| Non-commodity articles | /articles/* | growing; drove 4x traffic | law firms (beatable) | ✅ The growth engine. |

## Strategic conclusion (the important one)
**The site earns traffic as a TEST + informational-content entity, NOT as an immigration-tools destination.** Competitor recon confirms tool head-terms ("ilr calculator") are owned by exact-match domains and established solicitor firms with domain authority a young test-branded domain won't beat short-term.

→ **Reframe the tools:** they are a **UX moat + conversion/engagement asset for content visitors**, and an internal-link magnet — NOT a primary organic-search channel for head calculator terms. Do not over-invest in ranking `/ilr-calculator` for "ilr calculator". Instead: (a) feed tools from content traffic (done — 141 articles link in), (b) target long-tail tool queries dedicated sites ignore, (c) accept tool head-term ranking is a multi-year authority play.

## "If we change X …" dependencies
- Retitle a top article → CTR up but risk ranking wobble; owner has vetoed reschedule/results titles.
- Merge cannibalising pairs (reschedule×2, results×2) → could consolidate signal, but risks losing a ranking URL — needs GSC Pages data first.
- Build authority to tools → slow; needs editorial links, not on-site changes.

## Highest-EV levers (evidence-ranked)
1. Replicate the **cheat-sheet** winning format (proven, low competition).
2. **Handbook-fact** capture — push page-2 question pages (esp. coronation-street 1,820 imp) to page 1 via internal links/enrichment.
3. Keep the **non-commodity article engine** (drove the 4x).
4. Tools = engagement asset, long-game authority — not a title/quick-win target.

## Blocked
- Analytics (Supermetrics unauthorised) → no on-site conversion/engagement data.
- Continuous measurement → not possible in single-turn env; re-export GSC periodically to measure.
