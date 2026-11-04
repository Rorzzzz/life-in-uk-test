# AdSense Revenue Command Center — Setup Guide (v6)

## What this is
A complete Claude Code system for researching AdSense in depth, analysing your site, finding better ad placements, raising CPC and revenue per visitor, and keeping your account safe.

## Install (2 minutes)
1. Unzip this kit **into the root folder of your website project** (the folder you open Claude Code in).
   - The `.claude` folder starts with a dot, so it may be hidden. On Mac press `Cmd + Shift + .` in Finder; on Windows enable "Hidden items" in File Explorer's View menu.
   - **If your project already has a CLAUDE.md**, don't overwrite it: paste the contents of this kit's CLAUDE.md at the bottom of yours.
2. Create a folder called `data` in the same place and add your exports (Claude will tell you exactly which ones in the first session):
   - AdSense reports (last 90 days by page, country, device, ad unit, date; plus last 12–16 months by month)
   - Google Analytics and Search Console exports
   - Optional: Google Ads Keyword Planner export, heatmap data (e.g. Microsoft Clarity)
3. Open Claude Code in the project folder and type: **`/adsense-start`**

## Everyday commands
| Command | What it does |
|---|---|
| `/adsense-start` | Begins everything: setup, questions, quick wins |
| `/adsense-continue` | Picks up exactly where you left off (use in a fresh session) |
| `/adsense-weekly` | Weekly performance review and experiment decisions |
| `/adsense-check-change <idea>` | Safety + sanity check on any change before you make it |
| `/adsense-dashboard` | Builds a local revenue dashboard |
| `/adsense-update-research` | Monthly refresh of AdSense news and policy changes |

## Tips
- Start a **fresh session** whenever Claude suggests it; quality stays higher.
- Claude will **never** change files without your approval, and pauses for sign-off before implementation.
- If your site is hosted WordPress, Wix, or similar with no code in the folder, that's fine: it switches to "live-site mode" and gives you step-by-step instructions instead.
- On smaller plans, say "budget mode" to limit research size.
