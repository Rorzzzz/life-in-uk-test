import Link from 'next/link'

const LINKS = [
  { href: '/about',          label: 'About' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms',          label: 'Terms' },
  { href: '/faq',            label: 'FAQ' },
  { href: '/cheat-sheet',    label: 'Cheat Sheet' },
  { href: '/exam-format',    label: 'Exam Format' },
  { href: '/how-to-pass',    label: 'How to Pass' },
  { href: '/test-centres',   label: 'Test Centres' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-12 pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <Link href="/" className="font-display font-bold text-ink hover:text-brand-400 transition-colors">
              Pass<span className="text-brand-400">TheUKTest</span>
            </Link>
            <p className="text-xs text-ink-muted mt-1">
              Free Life in the UK citizenship test practice. Not affiliated with UKVI.
            </p>
            <a href="mailto:admin@passtheuktest.co.uk" className="text-xs text-ink-muted hover:text-ink transition-colors mt-0.5 block">
              admin@passtheuktest.co.uk
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-xs text-ink-muted mt-6 border-t border-border pt-4">
          © {new Date().getFullYear()} PassTheUKTest. All rights reserved. Questions based on the official&nbsp;
          <em>Life in the United Kingdom: A Guide for New Residents</em> handbook.
        </p>
      </div>
    </footer>
  )
}
