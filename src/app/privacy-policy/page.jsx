import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'Privacy Policy — Pass the UK Test',
  description: 'How PassTheUKTest handles your data: what stays on your device, which providers process data, cookies, advertising, your UK GDPR rights and how to complain.',
  alternates: { canonical: 'https://passtheuktest.co.uk/privacy-policy' },
}

const A = 'text-brand-400 underline hover:text-brand-300'
const H2 = 'text-xl font-display font-bold text-ink mb-3'

function Ext({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={A}>{children}</a>
}

const PROVIDERS = [
  { who: 'Google (AdSense, Funding Choices)', what: 'Shows ads, measures them, and records your cookie choice', when: 'Every visit', where: 'USA / global', link: 'https://policies.google.com/privacy' },
  { who: 'Google Analytics 4', what: 'Counts visits and how the site is used, in aggregate', when: 'Every visit (cookies only with consent in the UK/EEA)', where: 'USA / global', link: 'https://policies.google.com/privacy' },
  { who: 'OpenAI (Whisper)', what: 'Turns your B2 speaking recording into text', when: 'Only when you record an answer and ask for feedback', where: 'USA', link: 'https://openai.com/policies/privacy-policy' },
  { who: 'Anthropic (Claude)', what: 'Writes feedback on your B2 speaking transcript or writing answer', when: 'Only when you ask for feedback', where: 'USA', link: 'https://www.anthropic.com/legal/privacy' },
  { who: 'postcodes.io', what: 'Looks up a postcode to find your nearest test centre', when: 'Only when you search by postcode', where: 'UK', link: 'https://postcodes.io/about' },
  { who: 'YouTube (privacy-enhanced mode)', what: 'Plays embedded videos', when: 'Only after you press play on a video', where: 'USA / global', link: 'https://policies.google.com/privacy' },
  { who: 'Vercel', what: 'Hosts the site; keeps standard server logs (e.g. IP address, page requested) for security', when: 'Every visit', where: 'USA / global', link: 'https://vercel.com/legal/privacy-policy' },
]

const STORAGE = [
  { name: 'passtheuktest_v1, passtheuktest_theme', type: 'Your browser storage (this site)', purpose: 'Your progress, XP, streak and theme. Never sent to us', consent: 'Not needed (strictly necessary for the features you use)' },
  { name: 'FCCDCF, FCNEC', type: 'Cookies (Google Funding Choices)', purpose: 'Remember your cookie choice', consent: 'Not needed' },
  { name: '_ga, _ga_*', type: 'Cookies (Google Analytics)', purpose: 'Tell visits and visitors apart for statistics', consent: 'Needed in the UK/EEA' },
  { name: '__gads, __gpi, __eoi, IDE and similar', type: 'Cookies (Google advertising)', purpose: 'Serve, cap and measure ads; personalise ads if you agree', consent: 'Needed in the UK/EEA' },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]} />
      <div className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-display font-bold text-ink mb-2">Privacy Policy</h1>
      <p className="text-xs text-ink-muted mb-8">Last updated: November 2026</p>

      <div className="space-y-8 text-base text-ink leading-relaxed">

        <section>
          <h2 className={H2}>1. Who we are</h2>
          <p>
            PassTheUKTest (<strong>passtheuktest.co.uk</strong>) is a free study site run by Rory Stephenson,
            who is the data controller for this site. Contact:{' '}
            <a href="mailto:admin@passtheuktest.co.uk" className={A}>admin@passtheuktest.co.uk</a>.
            We have no user accounts and no database of users.
          </p>
        </section>

        <section>
          <h2 className={H2}>2. What stays on your device</h2>
          <p>
            Your quiz answers, XP, streak, badges and settings are stored in your browser&apos;s{' '}
            <code className="text-brand-400 text-sm">localStorage</code>. They are not sent to us. Clearing your
            browser data deletes them.
          </p>
        </section>

        <section>
          <h2 className={H2}>3. Who processes data, and when</h2>
          <p className="mb-4">
            Some features need outside services. We do not sell your data, and we do not keep copies of your
            recordings, transcripts or written answers.
          </p>
          <div className="space-y-3">
            {PROVIDERS.map(p => (
              <div key={p.who} className="bg-card border border-border rounded-xl p-4 text-sm">
                <p className="font-semibold text-ink mb-1"><Ext href={p.link}>{p.who}</Ext></p>
                <p className="text-ink-muted"><strong className="text-ink">What:</strong> {p.what}</p>
                <p className="text-ink-muted"><strong className="text-ink">When:</strong> {p.when}</p>
                <p className="text-ink-muted"><strong className="text-ink">Where:</strong> {p.where}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            <strong className="text-ink">B2 speaking and writing feedback:</strong> your recording or text is sent
            to OpenAI and Anthropic only to produce your feedback, then shown back to you. These providers process
            it under their API terms, which do not use it to train their models by default and may keep it for a
            limited time for abuse and safety monitoring. Do not include personal details (names, addresses) in
            your answers.
          </p>
        </section>

        <section>
          <h2 className={H2}>4. Cookies and similar technologies</h2>
          <div className="space-y-3 mb-4">
            {STORAGE.map(s => (
              <div key={s.name} className="bg-card border border-border rounded-xl p-4 text-sm">
                <p className="font-semibold text-ink mb-1"><code className="text-brand-400">{s.name}</code></p>
                <p className="text-ink-muted"><strong className="text-ink">Type:</strong> {s.type}</p>
                <p className="text-ink-muted"><strong className="text-ink">Purpose:</strong> {s.purpose}</p>
                <p className="text-ink-muted"><strong className="text-ink">Consent:</strong> {s.consent}</p>
              </div>
            ))}
          </div>
          <p>
            If you are in the UK, EEA or Switzerland, analytics and advertising cookies are only set after you
            agree in the consent message shown on your first visit (provided by Google, a certified consent
            platform). Refusing is as easy as agreeing. You can change or withdraw your choice at any time with
            the <strong>Cookie settings</strong> link at the bottom of every page.
          </p>
        </section>

        <section>
          <h2 className={H2}>5. Advertising</h2>
          <p className="mb-3">
            The site is free because it shows ads served by <strong>Google AdSense</strong> (Google LLC). Google
            and its advertising partners use cookies to show ads, limit how often you see them and measure them.
            If you agree, ads can also be personalised based on your visits to this and other websites. Without
            your agreement you may still see non-personalised or limited ads.
          </p>
          <p className="mb-3">
            Google works with a set of third-party advertising vendors. You can see them in{' '}
            <Ext href="https://support.google.com/admanager/answer/9012903">Google&apos;s list of ad technology providers</Ext>{' '}
            and in the &ldquo;Vendors&rdquo; section of our consent message. Learn{' '}
            <Ext href="https://policies.google.com/technologies/partner-sites">how Google uses data from sites that use its services</Ext>.
          </p>
          <p>
            To control ad personalisation, visit{' '}
            <Ext href="https://myadcenter.google.com">Google My Ad Center</Ext>. You can also opt out of many
            vendors&apos; personalised ads at{' '}
            <Ext href="https://www.youronlinechoices.com/uk/">youronlinechoices.com/uk</Ext>{' '}(UK and Europe) or{' '}
            <Ext href="https://www.aboutads.info">aboutads.info</Ext>{' '}(USA).
          </p>
        </section>

        <section>
          <h2 className={H2}>6. Why we use data (lawful bases)</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Consent</strong>: analytics and advertising cookies in the UK, EEA and Switzerland.</li>
            <li><strong>To give you a feature you ask for</strong>: speaking and writing feedback, postcode search, playing a video.</li>
            <li><strong>Legitimate interests</strong>: keeping the site secure and working (server logs), and contextual (non-personalised) ads that keep the site free.</li>
          </ul>
        </section>

        <section>
          <h2 className={H2}>7. International transfers</h2>
          <p>
            Google, OpenAI, Anthropic and Vercel may process data in the USA. These transfers rely on the
            safeguards these providers offer for UK data, such as the UK–US data bridge or the UK International
            Data Transfer Addendum.
          </p>
        </section>

        <section>
          <h2 className={H2}>8. How long data is kept</h2>
          <p>
            We keep nothing ourselves. Progress stays in your browser until you clear it. Google Analytics data
            is kept for up to 14 months. Your cookie choice is remembered for up to 13 months. Providers keep
            their own logs under their policies linked above.
          </p>
        </section>

        <section>
          <h2 className={H2}>9. Your rights</h2>
          <p className="mb-3">
            Under UK GDPR you can ask to access, correct or delete your personal data, object to its use, and
            withdraw consent at any time (use <strong>Cookie settings</strong> at the bottom of any page). Because
            we hold no accounts, most data is on your own device and you can delete it by clearing your browser
            data. For anything else, email{' '}
            <a href="mailto:admin@passtheuktest.co.uk" className={A}>admin@passtheuktest.co.uk</a>.
          </p>
          <p>
            If you are unhappy with how your data is handled, you can complain to the Information
            Commissioner&apos;s Office (ICO):{' '}
            <Ext href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</Ext>.
          </p>
        </section>

        <section>
          <h2 className={H2}>10. Changes</h2>
          <p className="text-ink-muted">
            We will update this page if anything changes and show the date at the top.
          </p>
        </section>

      </div>
    </div>
    </>
  )
}
