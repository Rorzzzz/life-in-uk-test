/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        // CSS variable tokens — automatically switch when data-theme changes
        // NEVER hardcode hex in components — use these tokens only
        surface: {
          DEFAULT: 'var(--surface)',
          card:    'var(--surface-card)',
          raised:  'var(--surface-raised)',
          border:  'var(--surface-border)',
        },
        // Shorthand aliases used throughout components
        card:   'var(--surface-card)',
        raised: 'var(--surface-raised)',
        border: 'var(--surface-border)',
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
        // Chapter accents — vivid enough for both light and dark backgrounds
        chapter: {
          1: '#ff4d6d',
          2: '#3381ff',
          3: '#a855f7',
          4: '#22d07a',
          5: '#f59e0b',
        },
      },
      animation: {
        'slide-up':   'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 0.2s ease forwards',
        'pop':        'pop 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'shake':      'shake 0.4s ease forwards',
        'float-up':   'floatUp 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow':  'spin 3s linear infinite',
      },
      keyframes: {
        slideUp:   { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        pop:       { from: { transform: 'scale(0.8)', opacity: 0 }, to: { transform: 'scale(1)', opacity: 1 } },
        shake:     { '0%,100%': { transform: 'translateX(0)' }, '20%,60%': { transform: 'translateX(-6px)' }, '40%,80%': { transform: 'translateX(6px)' } },
        floatUp:   { '0%': { opacity: 1, transform: 'translateY(0) scale(0.8)' }, '100%': { opacity: 0, transform: 'translateY(-48px) scale(1)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(51,129,255,0.2)' }, '50%': { boxShadow: '0 0 40px rgba(51,129,255,0.5)' } },
      },
    },
  },
  plugins: [],
}
