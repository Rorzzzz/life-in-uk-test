# Mobile Check
# Usage: /mobile-check [component] or /mobile-check last

Review $ARGUMENTS (or the most recently edited component).

Check every item — PASS or FAIL with file:line for each failure:

TAP TARGETS
- All buttons, links, answer options: minimum 44×44px

OVERFLOW
- No horizontal scroll at 375px viewport width
- No fixed-width elements wider than viewport

TYPOGRAPHY
- Body text minimum 15px (text-base or larger)
- No text truncated unintentionally

SPACING
- Minimum 16px (px-4) horizontal padding on all content
- Bottom nav (72px) not covering last scrollable item

FOCUS & A11Y
- Focus rings visible on all interactive elements
- Icon-only buttons have aria-label

TOUCH FEEDBACK
- Hover states also work as :active states on touch

After checking, list fixes needed with specific code suggestions.
