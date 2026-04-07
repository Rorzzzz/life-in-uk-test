# Accessibility Check (WCAG 2.1 AA)
# Usage: /a11y-check [component or page]

Check $ARGUMENTS for accessibility compliance. Report PASS/FAIL per item:

KEYBOARD
- All interactive elements reachable with Tab
- Enter/Space activates buttons and links
- Escape closes modals and dropdowns
- No keyboard traps (except intentional focus traps in modals)

FOCUS
- focus-visible:ring-2 on all interactive elements
- Focus order is logical (matches visual order)

SCREEN READER
- All images have alt text (or alt="" if decorative)
- Icon-only buttons have aria-label
- Form inputs have associated labels
- Dynamic updates use aria-live="polite"
- Progress bars use role="progressbar" + aria-valuenow

COLOUR & CONTRAST
- Colour is never the ONLY indicator of state (answer correct/wrong must also have icon)
- Body text contrast ≥ 4.5:1 against background
- Large text contrast ≥ 3:1

MODALS
- role="dialog" aria-modal="true" aria-labelledby
- Focus trapped inside when open
- Closes on Escape

MOTION
- No animations faster than 3 flashes per second

Report all failures with specific fix suggestions.
