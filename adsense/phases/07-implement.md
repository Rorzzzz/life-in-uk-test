## PHASE 7 — IMPLEMENTATION

- One change at a time, on its own git branch, presented as a diff with explanation. Wait for approval.
- Run `/adsense-check-change` before each change.
- Where possible, make changes easy to switch off (config flag or isolated component) for fast rollback.
- After each change: re-run Lighthouse, re-screenshot affected templates, confirm ads.txt and ad code are intact.
- Log every change with date and expected effect in `/research/CHANGELOG.md`.

---

## DEFINITION OF DONE
- [ ] Each change approved, on its own branch (repo mode) or as precise CMS steps (live-site mode)
- [ ] /adsense-check-change passed before each change
- [ ] Post-change checks done: Lighthouse, screenshots, ads.txt and ad code intact
- [ ] CHANGELOG.md updated with date and expected effect
