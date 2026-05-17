import Link from 'next/link'
import Image from 'next/image'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { CHEAT_SHEET } from '@/data/cheatSheet'
import PrintButton from './PrintButton'
import ShareButton from '@/components/ui/ShareButton'
import NightBeforeSection from './NightBeforeSection'

export const metadata = {
  title: 'Life in the UK Cheat Sheet — Free PDF, Printable & Downloadable',
  description: 'Download or print the free Life in the UK cheat sheet PDF before your test. Key dates, patron saints, famous people, inventions — with test-likelihood ratings. No sign-up.',
  alternates: { canonical: 'https://passtheuktest.co.uk/cheat-sheet' },
  keywords: ['life in the uk cheat sheet pdf', 'life in the uk cheat sheet', 'life in the uk test cheat sheet', 'life in the uk cheat sheet printable', 'life in the uk test pdf'],
  openGraph: {
    title: 'Life in the UK Cheat Sheet — Free PDF, Printable & Downloadable',
    description: 'Download or print the free Life in the UK cheat sheet PDF before your test. Key dates, patron saints, famous people, inventions and more. No sign-up.',
    url: 'https://passtheuktest.co.uk/cheat-sheet',
    type: 'website',
  },
}

// Section colour accents
const SECTION_COLOURS = {
  saints:     '#a855f7', // purple
  capitals:   '#22d07a', // green
  parliament: '#3381ff', // brand blue
  numbers:    '#f59e0b', // amber
  arts:       '#ec4899', // pink
  music:      '#8b5cf6', // violet
  sports:     '#06b6d4', // cyan
  inventions: '#f59e0b', // amber/xp
  people:     '#3381ff', // blue
  dates:      '#ff4d6d', // red
}

function SectionHeader({ title, colour, stars }) {
  return (
    <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: `${colour}44` }}>
      <h2 className="text-lg font-display font-bold text-ink flex items-center gap-2">
        <span className="w-1 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: colour }} />
        {title}
      </h2>
      {stars && <span className="text-xs text-ink-muted" title="How often this topic appears in the test">{stars}</span>}
    </div>
  )
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is on the Life in the UK test cheat sheet?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Life in the UK test cheat sheet covers patron saints and national symbols, capital cities, key historical dates, key numbers (pass mark, MPs, jury size), famous British people, inventions and scientists, arts and architecture, music and composers, sports origins, and government and parliament facts.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use a cheat sheet in the Life in the UK test?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. You cannot take any notes or materials into the Life in the UK test room. The cheat sheet is for studying before your test — use it to memorise key facts in the days leading up to your appointment.' },
    },
    {
      '@type': 'Question',
      name: 'Is this Life in the UK cheat sheet free to download as a PDF?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. This cheat sheet is completely free. Use the Print / Save PDF button to save it as a PDF to your phone or computer, or print it directly. No sign-up required.' },
    },
    {
      '@type': 'Question',
      name: 'What are the patron saints of the UK?',
      acceptedAnswer: { '@type': 'Answer', text: 'England: St George (23 April, Rose). Scotland: St Andrew (30 November, Thistle). Wales: St David (1 March, Daffodil). Northern Ireland: St Patrick (17 March, Shamrock).' },
    },
    {
      '@type': 'Question',
      name: 'What key dates should I memorise for the Life in the UK test?',
      acceptedAnswer: { '@type': 'Answer', text: 'The most important dates are: 1066 (Battle of Hastings), 1215 (Magna Carta), 1707 (Act of Union — England and Scotland), 1918 (women over 30 get the vote), 1928 (all women over 21 get the vote), 1948 (NHS founded, Empire Windrush arrives), and 1999 (devolution — Scottish Parliament, Welsh Senedd, NI Assembly).' },
    },
    {
      '@type': 'Question',
      name: 'What are the most important things to memorise for the Life in the UK test?',
      acceptedAnswer: { '@type': 'Answer', text: 'Focus on: patron saints and their dates, key dates from British history (especially 1066, 1215, 1707, 1918, 1928, 1948), famous British inventors and their inventions, the pass mark (18/24, 75%), the number of MPs (650), and the composition of Parliament.' },
    },
  ],
}

export default function CheatSheetPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Life in the UK Test Key Dates Cheat Sheet 2026',
    description: 'Key dates, facts and people for the Life in the UK citizenship test',
    numberOfItems: CHEAT_SHEET.keyDates.length,
    itemListElement: CHEAT_SHEET.keyDates.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.date,
      description: item.fact,
    })),
  }

  const shareUrl = 'https://passtheuktest.co.uk/cheat-sheet'
  const shareTitle = 'Life in the UK Test Cheat Sheet 2026 — Free'
  const shareText = '📚 Free Life in the UK test cheat sheet 2026 — print this before your test! Patron saints, key dates, famous people and more.'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Cheat Sheet', path: '/cheat-sheet' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header with action buttons */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">Life in the UK Test Cheat Sheet</h1>
          <p className="text-base text-ink-muted mb-2">Free PDF — print or save before your test. 2026 edition.</p>
          <p className="text-sm text-ink-muted mb-3">Covers patron saints, key dates, famous people, inventions, government facts and sports origins — with test-likelihood star ratings on every section.</p>
          <div className="flex items-center gap-2">
            <ShareButton url={shareUrl} title={shareTitle} text={shareText} />
            <PrintButton />
          </div>
        </div>

        {/* Star rating legend */}
        <div className="flex items-center gap-4 mb-6 text-xs text-ink-muted bg-raised rounded-xl px-4 py-2.5">
          <span className="font-semibold text-ink">Test frequency:</span>
          <span>⭐ Common</span>
          <span>⭐⭐ Very common</span>
          <span>⭐⭐⭐ Almost every test</span>
        </div>

        {/* Patron Saints */}
        <section className="mb-8 print-section">
          <SectionHeader title="Patron Saints & National Symbols" colour={SECTION_COLOURS.saints} stars="⭐⭐⭐" />
          <div className="grid grid-cols-2 gap-3">
            {CHEAT_SHEET.patronSaints.map(p => (
              <div key={p.nation} className="bg-card rounded-xl p-4 border-l-4" style={{ borderLeftColor: SECTION_COLOURS.saints }}>
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={p.flagImg}
                    alt={`Flag of ${p.nation}`}
                    width={40}
                    height={30}
                    className="rounded-sm flex-shrink-0"
                  />
                  <p className="font-bold text-ink text-base">{p.nation}</p>
                </div>
                <p className="text-sm font-semibold text-ink-muted">{p.saint}</p>
                <p className="text-xs text-ink-muted mt-1">📅 {p.day}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Image src={p.flowerImg} alt={p.flower} width={28} height={28} className="rounded-full object-cover" />
                  <span className="text-xs text-ink-muted">{p.flower}</span>
                </div>
                <p className="text-xs text-ink-muted">🎨 {p.colour}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Capitals */}
        <section className="mb-8">
          <SectionHeader title="Capitals" colour={SECTION_COLOURS.capitals} stars="⭐⭐" />
          <div className="grid grid-cols-2 gap-2">
            {CHEAT_SHEET.capitals.map(c => (
              <div key={c.nation} className="bg-card rounded-xl p-3 flex justify-between items-center">
                <span className="text-base text-ink-muted">{c.nation}</span>
                <span className="font-semibold text-ink text-base">{c.capital}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Parliament */}
        <section className="mb-8">
          <SectionHeader title="Parliament & Government" colour={SECTION_COLOURS.parliament} stars="⭐⭐" />
          <div className="space-y-2">
            {CHEAT_SHEET.parliament.map(item => (
              <div key={item.fact} className="bg-card rounded-xl p-3 flex items-start gap-3">
                <span className="font-semibold text-ink text-sm whitespace-nowrap min-w-[140px] flex-shrink-0 pt-0.5">{item.fact}</span>
                <span className="text-sm text-ink-muted">{item.detail}</span>
                {item.stars && <span className="ml-auto text-xs flex-shrink-0">{item.stars}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Key Numbers */}
        <section className="mb-8">
          <SectionHeader title="Key Numbers" colour={SECTION_COLOURS.numbers} stars="⭐⭐⭐" />
          <div className="space-y-2">
            {CHEAT_SHEET.keyNumbers.map(item => (
              <div key={item.number} className="bg-card rounded-xl p-3 flex items-start gap-3">
                <span className="font-mono font-bold text-base whitespace-nowrap min-w-[70px] flex-shrink-0" style={{ color: SECTION_COLOURS.numbers }}>{item.number}</span>
                <span className="text-base text-ink-muted">{item.fact}</span>
                {item.stars && <span className="ml-auto text-xs flex-shrink-0">{item.stars}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Arts & Architecture */}
        <section className="mb-8">
          <SectionHeader title="Arts & Architecture" colour={SECTION_COLOURS.arts} stars="⭐⭐" />
          <div className="space-y-2">
            {CHEAT_SHEET.arts.map(item => (
              <div key={item.name} className="bg-card rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-ink text-base">{item.name}</p>
                  <p className="text-sm text-ink-muted">{item.known}</p>
                </div>
                <span className="text-xs bg-raised px-2 py-1 rounded-full text-ink-muted shrink-0">{item.category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Music */}
        <section className="mb-8">
          <SectionHeader title="Music & Composers" colour={SECTION_COLOURS.music} stars="⭐" />
          <div className="space-y-2">
            {CHEAT_SHEET.music.map(item => (
              <div key={item.name} className="bg-card rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-ink text-base">{item.name}</p>
                  <p className="text-sm text-ink-muted">{item.known}</p>
                </div>
                <span className="text-xs font-mono text-ink-muted shrink-0">{item.era}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sports Origins */}
        <section className="mb-8">
          <SectionHeader title="Sports Origins" colour={SECTION_COLOURS.sports} stars="⭐⭐" />
          <div className="space-y-2">
            {CHEAT_SHEET.sportsOrigins.map(item => (
              <div key={item.sport} className="bg-card rounded-xl p-3 flex items-start gap-3">
                <span className="font-semibold text-ink text-sm whitespace-nowrap min-w-[80px] shrink-0 pt-0.5">{item.sport}</span>
                <span className="text-sm text-ink-muted">{item.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Inventions */}
        <section className="mb-8">
          <SectionHeader title="British Inventions & Scientists" colour={SECTION_COLOURS.inventions} stars="⭐⭐⭐" />
          <div className="space-y-2">
            {CHEAT_SHEET.inventions.map(item => (
              <div key={item.invention} className="bg-card rounded-xl p-3 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-ink text-base">{item.invention}</p>
                  <p className="text-sm text-ink-muted">{item.inventor}</p>
                </div>
                <span className="font-mono font-bold text-base" style={{ color: SECTION_COLOURS.inventions }}>{item.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Famous People */}
        <section className="mb-8">
          <SectionHeader title="Famous British People" colour={SECTION_COLOURS.people} stars="⭐⭐" />
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

        {/* Key Dates */}
        <section className="mb-8">
          <SectionHeader title="Key Dates" colour={SECTION_COLOURS.dates} stars="⭐⭐⭐" />
          <div className="space-y-1.5">
            {CHEAT_SHEET.keyDates.map(item => (
              <div key={item.date} className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm whitespace-nowrap w-20 flex-shrink-0 pt-0.5" style={{ color: SECTION_COLOURS.dates }}>{item.date}</span>
                <span className="text-base text-ink-muted">{item.fact}</span>
                {item.stars && <span className="ml-auto text-xs flex-shrink-0 pt-0.5">{item.stars}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Key Acts & Legislation — additional static content for SEO */}
        <div className="bg-card rounded-2xl p-5 mt-6 mb-4">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">Key Acts & Legislation to Know</h2>
          <div className="space-y-2 text-sm">
            {[
              { year: '1215', act: 'Magna Carta', detail: 'Limited royal power — signed by King John at Runnymede' },
              { year: '1679', act: 'Habeas Corpus Act', detail: 'Prevents unlawful imprisonment' },
              { year: '1689', act: 'Bill of Rights', detail: 'Established parliamentary sovereignty, limited royal power' },
              { year: '1707', act: 'Act of Union', detail: 'United England and Scotland to form Great Britain' },
              { year: '1801', act: 'Act of Union (Ireland)', detail: 'Ireland joins Great Britain to form the United Kingdom' },
              { year: '1833', act: 'Slavery Abolition Act', detail: 'Abolished slavery throughout the British Empire' },
              { year: '1918', act: 'Representation of the People Act', detail: 'Women over 30 with property get the vote' },
              { year: '1928', act: 'Equal Franchise Act', detail: 'All women over 21 get equal voting rights with men' },
            ].map(({ year, act, detail }) => (
              <div key={year} className="flex items-start gap-3">
                <span className="font-mono font-bold text-xs text-brand-400 w-10 flex-shrink-0 pt-0.5">{year}</span>
                <div>
                  <span className="font-semibold text-ink">{act}</span>
                  <span className="text-ink-muted"> — {detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Battles — additional static content for SEO */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">Key Battles & Wars</h2>
          <div className="space-y-2 text-sm">
            {[
              { year: '1066', battle: 'Battle of Hastings', detail: 'William the Conqueror defeats King Harold — Norman Conquest begins' },
              { year: '1314', battle: 'Battle of Bannockburn', detail: 'Scotland defeats England — Robert the Bruce; Scotland remains independent' },
              { year: '1455–1485', battle: 'Wars of the Roses', detail: 'House of York vs House of Lancaster for the English throne' },
              { year: '1588', battle: 'Spanish Armada', detail: 'English fleet defeats the Spanish Armada under Queen Elizabeth I' },
              { year: '1642–1651', battle: 'English Civil War', detail: 'Royalists (Cavaliers) vs Parliamentarians (Roundheads)' },
              { year: '1914–1918', battle: 'First World War', detail: 'Britain fought alongside France, Russia and later the USA' },
              { year: '1939–1945', battle: 'Second World War', detail: 'Britain led by Winston Churchill — D-Day landings 1944' },
            ].map(({ year, battle, detail }) => (
              <div key={year} className="flex items-start gap-3">
                <span className="font-mono font-bold text-xs text-danger w-16 flex-shrink-0 pt-0.5">{year}</span>
                <div>
                  <span className="font-semibold text-ink">{battle}</span>
                  <span className="text-ink-muted"> — {detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Night Before section at bottom */}
        <div className="mb-6">
          <NightBeforeSection />
        </div>

        {/* Bottom share CTA */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-5 text-center mb-6">
          <p className="font-semibold text-ink mb-1">Found this useful?</p>
          <p className="text-sm text-ink-muted mb-4">Share with anyone preparing for the Life in the UK test</p>
          <ShareButton url={shareUrl} title={shareTitle} text={shareText} />
        </div>

        <div className="bg-card rounded-2xl p-4 mt-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
          <div className="flex flex-wrap gap-2">
            {[2, 7, 12, 20].map(n => (
              <Link key={n} href={`/mock-test/${n}`} className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Mock Test {n}</Link>
            ))}
            <Link href="/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">All 45 tests →</Link>
          </div>
        </div>

        {/* FAQ section */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I use a cheat sheet in the Life in the UK test?', a: 'No — you cannot take any notes or materials into the test room. Use this cheat sheet to memorise key facts in the days before your appointment.' },
              { q: 'Is this cheat sheet free to download as a PDF?', a: 'Yes — completely free. Use the Print / Save PDF button to save it to your phone or computer. No sign-up required.' },
              { q: 'What are the patron saints of the four UK nations?', a: 'England: St George (23 April). Scotland: St Andrew (30 November). Wales: St David (1 March). Northern Ireland: St Patrick (17 March).' },
              { q: 'What is the pass mark for the Life in the UK test?', a: '18 out of 24 questions correct — that is 75%. You have 45 minutes to complete the test.' },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold text-ink text-sm mb-1">{q}</p>
                <p className="text-sm text-ink-muted">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          <Link href="/articles/what-is-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">What Is the Test?</Link>
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Full FAQ</Link>
          <Link href="/practice" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Practice Questions</Link>
        </div>
      </div>
    </>
  )
}
