# PassPort — Design System
# Load this when building UI components or pages

---

## 1. THEME SYSTEM — LIGHT / DARK TOGGLE

PassPort supports both light and dark themes. The user can switch at any time
via the theme toggle in the Navbar. Their preference is saved to localStorage
under the key `passport_theme` ('light' | 'dark').

The default is **dark** — it's our visual identity and most users will keep it.
But light mode must be fully functional and equally polished.

### How theming works in code

```jsx
// src/context/ThemeContext.jsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark') // dark is default

  useEffect(() => {
    const saved = localStorage.getItem('passport_theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('passport_theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

Add `ThemeProvider` to `layout.jsx` wrapping the whole app.
Add `data-theme="dark"` to `<html>` as the default server-rendered state
(prevents flash of wrong theme on first load).

### Theme toggle component

```jsx
// src/components/ui/ThemeToggle.jsx
'use client'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="theme-toggle"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
```

Place `<ThemeToggle />` in the Navbar, right side, next to the XP badge.

---

## 2. COLOUR TOKENS — DUAL THEME

All colour tokens are CSS custom properties set on `[data-theme="dark"]`
and `[data-theme="light"]`. Tailwind uses the CSS vars via `var(--token)`.

### Dark theme tokens (default)

```css
[data-theme="dark"] {
  /* Backgrounds */
  --surface:          #0d0f1a;   /* page background */
  --surface-card:     #131629;   /* default card */
  --surface-raised:   #1a1e33;   /* elevated card / hover */
  --surface-border:   #252944;   /* all borders */

  /* Text */
  --ink:              #f0f2ff;   /* primary text */
  --ink-muted:        #8b90b8;   /* secondary text, labels */
  --ink-faint:        #454970;   /* disabled, placeholder */

  /* Brand */
  --brand-400:        #59a3ff;
  --brand-500:        #3381ff;   /* primary actions */
  --brand-600:        #1a5ff5;
  --brand-900:        #18368f;

  /* Semantic — same in both themes */
  --success:          #22d07a;
  --danger:           #ff4d6d;
  --warning:          #ffb830;
  --xp:               #f59e0b;
}
```

### Light theme tokens

```css
[data-theme="light"] {
  /* Backgrounds */
  --surface:          #f5f6fa;   /* page background — off-white, not blinding */
  --surface-card:     #ffffff;   /* default card */
  --surface-raised:   #eef0f8;   /* elevated card / hover */
  --surface-border:   #d1d5e8;   /* all borders */

  /* Text */
  --ink:              #0f1124;   /* primary text — near-black */
  --ink-muted:        #5a5f80;   /* secondary text, labels */
  --ink-faint:        #a0a4c0;   /* disabled, placeholder */

  /* Brand — slightly deeper for contrast on white */
  --brand-400:        #2d6ee0;
  --brand-500:        #1a5ff5;   /* primary actions */
  --brand-600:        #1249cc;
  --brand-900:        #0a2d7a;

  /* Semantic — same in both themes */
  --success:          #18a060;   /* slightly deeper for light bg */
  --danger:           #e0304d;
  --warning:          #d4960a;
  --xp:               #d97706;
}
```

### Tailwind config mapping

```js
// tailwind.config.js — maps all tokens to CSS vars
colors: {
  surface: {
    DEFAULT: 'var(--surface)',
    card:    'var(--surface-card)',
    raised:  'var(--surface-raised)',
    border:  'var(--surface-border)',
  },
  ink: {
    DEFAULT: 'var(--ink)',
    muted:   'var(--ink-muted)',
    faint:   'var(--ink-faint)',
  },
  brand: {
    400: 'var(--brand-400)',
    500: 'var(--brand-500)',
    600: 'var(--brand-600)',
    900: 'var(--brand-900)',
  },
  success: 'var(--success)',
  danger:  'var(--danger)',
  warning: 'var(--warning)',
  xp:      'var(--xp)',
}
```

### The golden rule
NEVER hardcode a hex colour in a component. Always use the Tailwind token
(e.g. `bg-surface-card text-ink`) or the CSS variable (`var(--surface-card)`).
This is what makes theme switching work automatically with zero component changes.

---

## 3. SEMANTIC COLOURS (same in both themes)

```
CHAPTER ACCENT COLOURS — consistent across all UI
chapter-1   #ff4d6d   ← Values & Principles (red)
chapter-2   #3381ff   ← What is the UK? (blue)
chapter-3   #a855f7   ← History (purple)
chapter-4   #22d07a   ← Modern Society (green)
chapter-5   #f59e0b   ← Government & Law (gold)
```

Chapter colours are vivid enough to work on both light and dark backgrounds.
Do not change these — they're used for consistency across cards, progress bars
and chapter badges throughout the app.

---

## 4. GLOBALS CSS STRUCTURE

```css
/* styles/globals.css */

/* Set dark as the default before JS loads — prevents flash */
:root { color-scheme: dark; }
html { background: var(--surface); }

[data-theme="dark"] {
  /* all dark tokens (see Section 2) */
}

[data-theme="light"] {
  /* all light tokens (see Section 2) */
  color-scheme: light;
}

/* Smooth theme transition — 200ms so it doesn't feel jarring */
*, *::before, *::after {
  transition: background-color 200ms ease, border-color 200ms ease, color 200ms ease;
}

/* Exception — don't animate things that shouldn't transition */
.no-transition, .no-transition * {
  transition: none !important;
}
```

---

## 5. TYPOGRAPHY SCALE (unchanged)

```
Display (Clash Display)
  display-2xl    48px / 500   ← hero scores, big numbers
  display-xl     36px / 500   ← page titles
  display-lg     28px / 500   ← section headers
  display-md     22px / 500   ← card titles
  display-sm     18px / 500   ← sub-headers

Body (Satoshi)
  body-lg        18px / 400   ← question text
  body-md        16px / 400   ← general body (default)
  body-sm        14px / 400   ← labels, captions
  body-xs        12px / 400   ← fine print (minimum size)

Mono (JetBrains Mono)
  mono-lg        16px / 500   ← XP values, scores
  mono-md        14px / 500   ← streaks, stats
  mono-sm        12px / 400   ← timestamps, IDs
```

**In Tailwind:**
```
font-display text-4xl font-medium  → display-xl
font-body text-base                → body-md (default)
font-mono text-sm font-medium      → mono-md
```

---

## 3. SPACING SYSTEM

```
4px   (space-1)   ← tight badge padding
8px   (space-2)   ← icon-to-label gap
12px  (space-3)   ← internal card spacing
16px  (space-4)   ← base horizontal page padding (mobile)
20px  (space-5)   ← card padding
24px  (space-6)   ← section gap, desktop page padding
32px  (space-8)   ← large section gap
48px  (space-12)  ← page section separation
64px  (space-16)  ← hero vertical rhythm
```

---

## 4. BORDER RADIUS

```
none      → data tables, full-width elements
sm (4px)  → small badges, tight pills
md (8px)  → inputs, small buttons
lg (12px) → standard buttons
xl (16px) → cards (rounded-2xl in Tailwind)
2xl (20px)→ modals, large cards
full      → circular badges, avatars, streak counters
```

---

## 5. SHADOW / DEPTH SYSTEM

No box-shadows except:
```
Focus ring:  0 0 0 2px #3381ff   (brand-500)
XP glow:     0 0 20px rgba(245,158,11,0.4)
Brand glow:  0 0 30px rgba(51,129,255,0.25)
Danger glow: 0 0 20px rgba(255,77,109,0.3)
```
These are applied via Tailwind utility classes, not inline styles.

---

## 6. COMPONENT SPECS

### Button
```
Variants:
  primary   bg-brand-500 hover:bg-brand-400 text-white
            shadow-lg shadow-brand-900/30
            active:scale-95 transition-all duration-150

  ghost     border border-surface-border hover:bg-surface-raised
            text-ink-muted hover:text-ink
            active:scale-95 transition-all duration-150

  danger    bg-danger/10 hover:bg-danger/20
            border border-danger/30 text-danger
            active:scale-95

Sizes:
  sm    px-3 py-1.5 text-sm rounded-lg
  md    px-5 py-2.5 text-base rounded-xl      ← default
  lg    px-6 py-3.5 text-lg rounded-xl

Always:
  font-body font-medium
  focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2
  disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
```

### Card
```
Variants:
  default   bg-surface-card border border-surface-border rounded-2xl
  raised    bg-surface-raised border border-surface-border rounded-2xl
  glass     bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl

Padding:
  sm    p-4
  md    p-5    ← default
  lg    p-6

Hover (interactive cards only):
  hover:border-brand-600/40 transition-colors duration-150
```

### AnswerButton
```
States:
  default     card variant, hover:border-brand-600/40 hover:bg-brand-950/30
  selected    border-brand-500 bg-brand-950/40 (before reveal)
  correct     border-success/60 bg-success/10
              ✓ checkmark icon (lucide: CheckCircle2) text-success
  incorrect   border-danger/60 bg-danger/10
              ✗ X icon (lucide: XCircle) text-danger
  reveal      (show correct answer when user was wrong)
              border-success/60 bg-success/10 with subtle pulse

Layout:
  flex items-start gap-3 p-4 rounded-xl
  Label pill (A/B/C/D): w-7 h-7 rounded-full flex-shrink-0
    default: bg-surface-raised text-ink-muted
    selected: bg-brand-600 text-white
    correct: bg-success text-surface
    incorrect: bg-danger text-white
```

### ProgressBar
```html
<div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
     class="h-1.5 bg-surface-raised rounded-full overflow-hidden">
  <motion.div
    class="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
    initial={{ width: 0 }}
    animate={{ width: `${value}%` }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  />
</div>
```

### ProgressRing (Readiness Score)
```
SVG circle ring, size = prop (default 120px)
Stroke width: 8px
Track colour: #252944 (surface-border)
Fill colour:
  0-49:   #ff4d6d (danger)
  50-74:  #ffb830 (warning)
  75-99:  #22d07a (success)
  100:    #f59e0b (gold/XP)
Animation: strokeDashoffset → 0 over 1s on mount
Centre text:
  Score number: font-display text-2xl (dynamic colour)
  "ready" label: font-mono text-xs text-ink-muted
```

### XPBadge
```html
<span class="xp-badge font-mono">
  <Zap size={12} />
  {xp.toLocaleString()} XP
</span>
<!-- xp-badge class: bg-xp/10 text-xp border border-xp/20 rounded-full px-2.5 py-1 text-xs -->
```

### StreakBadge
```html
<span class="streak-badge font-mono">
  {count > 3 ? '🔥' : '⚡'} {count} day{count !== 1 ? 's' : ''}
</span>
<!-- streak > 7: add animate-pulse-glow -->
```

### Toast Notification
```
Position: bottom-center on mobile, top-right on desktop
Duration: 3s auto-dismiss
Variants:
  xp       gold background, Zap icon, "+N XP"
  badge    purple background, badge icon + name
  levelup  brand background, star icon, "Level up!"
  error    danger background, AlertCircle icon

Animation:
  Enter: slide up from -20px + fade in
  Exit:  fade out + slide down
```

### Modal
```
Backdrop: fixed inset-0 bg-black/60 backdrop-blur-sm
Content:  bg-surface-raised rounded-2xl p-6 max-w-md w-full mx-4
          scale-in animation on open

Accessibility:
  role="dialog" aria-modal="true" aria-labelledby="modal-title"
  Focus trap on open
  Escape key closes
  Click outside closes (optional — add data-outside-click)
```

### TimerBar (Exam mode)
```
Full width progress bar at top of screen
Counts down from 45:00 to 00:00
Colour transitions:
  45:00–10:00  brand-500 (blue)
  10:00–05:00  warning (amber)
  05:00–00:00  danger (red) + pulse animation
At 00:00: auto-submit + show time's up message
```

---

## 7. PAGE LAYOUTS

### Mobile Layout
```
┌─────────────────────┐
│  Navbar (56px)      │  ← logo + XP badge + streak (hidden on small screens)
├─────────────────────┤
│                     │
│  Page content       │  ← flex-1 overflow-y-auto pb-24 (space for BottomNav)
│  (scrollable)       │
│                     │
│                     │
├─────────────────────┤
│  BottomNav (72px)   │  ← fixed bottom, 5 icons: home/practice/exam/progress/study
└─────────────────────┘
```

### Desktop Layout
```
┌─────────────────────────────────────────────────┐
│  Navbar (64px) — logo + nav links + XP + streak │
├─────────────────────────────────────────────────┤
│                                                 │
│  Page content (max-w-3xl mx-auto px-6 py-8)    │
│                                                 │
└─────────────────────────────────────────────────┘
BottomNav hidden on md: and above
```

### Question Flow Layout (Practice & Exam)
```
┌─────────────────────┐
│ ← Back   Q 3/10    │  ← Header: back button, question count, timer (exam only)
│ ████████░░ 30%     │  ← Progress bar
├─────────────────────┤
│                     │
│  [Chapter tag]      │
│                     │
│  Question text      │  ← font-body text-lg leading-relaxed
│  (can be 2-3 lines) │
│                     │
├─────────────────────┤
│  [A] Option text    │  ← AnswerButton × 4
│  [B] Option text    │
│  [C] Option text    │
│  [D] Option text    │
├─────────────────────┤
│  ExplanationPanel   │  ← Slides up after answer (practice mode only)
│  (conditionally     │
│   shown)            │
└─────────────────────┘
```

---

## 8. ANIMATION LIBRARY (Framer Motion patterns)

Copy-paste these into components:

### Page transition wrapper
```jsx
// Wrap every page's root element
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```

### Question card transition (practice mode)
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={question.id}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    <QuestionCard ... />
  </motion.div>
</AnimatePresence>
```

### Shake (wrong answer)
```jsx
<motion.div
  animate={isWrong ? {
    x: [0, -6, 6, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 }
  } : {}}
>
```

### XP float-up popup
```jsx
<AnimatePresence>
  {showXP && (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 0.8 }}
      animate={{ opacity: 0, y: -50, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute top-0 right-4 xp-badge pointer-events-none"
    >
      +{xpAmount} XP
    </motion.div>
  )}
</AnimatePresence>
```

### Badge unlock reveal
```jsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: [0, 1.1, 1], opacity: 1 }}
  transition={{ duration: 0.5, times: [0, 0.6, 1] }}
>
  {/* Badge content */}
</motion.div>
```

### Staggered list items (Progress page, chapter list)
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i.id} variants={item}>...</motion.li>)}
</motion.ul>
```

---

## 9. ICON USAGE (lucide-react only)

```
Navigation:
  Home, BookOpen, Trophy, BarChart2, GraduationCap, CreditCard

Actions:
  Play, ChevronRight, ChevronLeft, X, Check, ArrowLeft

Game:
  Zap (XP), Flame (streak), Star (badge), Target (readiness),
  Clock (timer), Flag (flag question), RotateCcw (retry)

Status:
  CheckCircle2 (correct), XCircle (incorrect), AlertCircle (warning),
  Info, Lock, Unlock

Chapters:
  Map (ch1), Sword (ch2), Building2 (ch3), Scale (ch4), Shield (ch5)
```

**Icon sizes:**
```
Inline with text:  size={16} className="inline-block"
Button icon:       size={18}
Nav icon:          size={22}
Hero/empty state:  size={40} strokeWidth={1.5}
```

---

## 10. EMPTY STATES

Every list or data-dependent view needs a thoughtful empty state:

```
No questions answered yet (WeakSpots):
  Icon: Target (large, brand colour)
  Title: "No weak spots yet!"
  Body: "Answer some practice questions and we'll track which topics need work."
  CTA: "Start practising" → /practice

No exam history (Progress):
  Icon: Trophy (large)
  Title: "No exams taken yet"
  Body: "Take a mock exam to see how ready you are."
  CTA: "Take mock exam" → /exam

No badges (Progress — badge section):
  Show all badges as locked silhouettes with "???" name
  First badge (first_steps) always shows with hint: "Answer your first question to unlock"
```

---

## 11. LOADING STATES

```
Page loading (Suspense fallback):
  Full page Skeleton with:
  - Fake heading block (w-48 h-8 bg-surface-raised animate-pulse rounded)
  - Fake card blocks (w-full h-24 bg-surface-card animate-pulse rounded-2xl)

Data loading within page:
  Use Skeleton component, same dimensions as real content
  Min visible time: 200ms (avoid flash)

Question loading:
  Never shows skeleton — questions are local data, instant
```

---

## 12. RESPONSIVE BREAKPOINTS

```
Default (< 640px):  mobile — bottom nav, single column, full-width cards
sm (≥ 640px):       large mobile — two-column chapter grid
md (≥ 768px):       tablet — hide bottom nav, show top nav links
lg (≥ 1024px):      desktop — max-w-3xl content width, generous padding
xl (≥ 1280px):      wide desktop — max-w-4xl, side-by-side progress stats
```

**Always design mobile first. Desktop is an enhancement, not the primary target.**
