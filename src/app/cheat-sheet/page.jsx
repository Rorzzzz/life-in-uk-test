import Link from 'next/link'
import { CHEAT_SHEET } from '@/data/cheatSheet'
import PrintButton from './PrintButton'

export const metadata = {
  title: 'Life in the UK Test Cheat Sheet — Key Dates, Facts & People',
  description: 'Printable cheat sheet for the Life in the UK test. Key dates, famous people, inventions, patron saints, and capitals — everything to memorise.',
  alternates: { canonical: 'https://passtheuktest.co.uk/cheat-sheet' },
}

export default function CheatSheetPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">Cheat Sheet</h1>
          <p className="text-base text-ink-muted">Print this before your test</p>
        </div>
        <PrintButton />
      </div>

      {/* Patron Saints */}
      <section className="mb-8 print-section">
        <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">Patron Saints & National Symbols</h2>
        <div className="grid grid-cols-2 gap-3">
          {CHEAT_SHEET.patronSaints.map(p => (
            <div key={p.nation} className="bg-card rounded-xl p-3">
              <p className="font-semibold text-ink text-base">{p.nation}</p>
              <p className="text-sm text-ink-muted">{p.saint} · {p.day}</p>
              <p className="text-sm text-ink-muted">{p.flower}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capitals */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">Capitals</h2>
        <div className="grid grid-cols-2 gap-2">
          {CHEAT_SHEET.capitals.map(c => (
            <div key={c.nation} className="bg-card rounded-xl p-3 flex justify-between items-center">
              <span className="text-base text-ink-muted">{c.nation}</span>
              <span className="font-semibold text-ink text-base">{c.capital}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key Numbers */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">Key Numbers</h2>
        <div className="space-y-2">
          {CHEAT_SHEET.keyNumbers.map(item => (
            <div key={item.number} className="bg-card rounded-xl p-3 flex items-start gap-3">
              <span className="font-mono font-bold text-brand-400 text-base whitespace-nowrap min-w-[60px]">{item.number}</span>
              <span className="text-base text-ink-muted">{item.fact}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inventions */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">British Inventions</h2>
        <div className="space-y-2">
          {CHEAT_SHEET.inventions.map(item => (
            <div key={item.invention} className="bg-card rounded-xl p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="font-semibold text-ink text-base">{item.invention}</p>
                <p className="text-sm text-ink-muted">{item.inventor}</p>
              </div>
              <span className="font-mono font-bold text-xp text-base">{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Famous People */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">Famous British People</h2>
        <div className="space-y-2">
          {CHEAT_SHEET.famousPeople.map(p => (
            <div key={p.name} className="bg-card rounded-xl p-3">
              <div className="flex items-center justify-between mb-0.5">
                <p className="font-semibold text-ink text-base">{p.name}</p>
                <span className="text-sm font-mono text-ink-muted">{p.dates}</span>
              </div>
              <p className="text-sm text-ink-muted">{p.known}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Dates — condensed */}
      <section className="mb-8">
        <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">Key Dates</h2>
        <div className="space-y-1.5">
          {CHEAT_SHEET.keyDates.map(item => (
            <div key={item.date} className="flex items-start gap-3">
              <span className="font-mono font-bold text-brand-400 text-sm whitespace-nowrap w-20 flex-shrink-0 pt-0.5">{item.date}</span>
              <span className="text-base text-ink-muted">{item.fact}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-card rounded-2xl p-4 mt-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
        <div className="flex flex-wrap gap-2">
          {[2, 7, 12, 20].map(n => (
            <Link key={n} href={`/mock-test/${n}`} className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Mock Test {n}</Link>
          ))}
          <Link href="/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">All 45 tests →</Link>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
          {[
            { slug: 'british-history', title: 'British History',  colour: '#a855f7' },
            { slug: 'famous-people',   title: 'Famous British People', colour: '#a855f7' },
          ].map(t => (
            <Link key={t.slug} href={`/topic/${t.slug}`} className="px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ borderColor: `${t.colour}44`, color: t.colour, backgroundColor: `${t.colour}11` }}>{t.title}</Link>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-4 flex-wrap">
        <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Full FAQ</Link>
        <Link href="/practice" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Practice Questions</Link>
      </div>
    </div>
  )
}
