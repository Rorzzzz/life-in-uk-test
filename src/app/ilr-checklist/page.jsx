import Link from 'next/link'
import ILRChecklistClient from './ILRChecklistClient'

export async function generateMetadata() {
  return {
    title: 'Free ILR Document Checklist 2026 — By Visa Type, Printable',
    description: 'Free, personalised ILR document checklist by visa type. Covers Skilled Worker, Family, Long Residence and more. Tick items off as you gather them — printable.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-checklist' },
    openGraph: {
      title: 'Free ILR Document Checklist 2026 — By Visa Type, Printable',
      description: 'Free, personalised ILR document checklist by visa type. Covers Skilled Worker, Family, Long Residence and more. Tick items off as you gather them — printable.',
      url: 'https://passtheuktest.co.uk/ilr-checklist',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function ILRChecklistIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        ILR Document Checklist 2026 — What You Need to Apply
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Select your visa type to get a personalised, printable checklist of every document you need for your ILR application. The documents required vary depending on your route — Skilled Worker, Family, Long Residence, or other. Tick items off as you gather them.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>Choose from 5 visa routes</li>
        <li>Interactive tick-off checklist</li>
        <li>Print-ready for easy reference</li>
        <li>Updated for 2026 rules and fees</li>
      </ul>
    </div>
  )
}

function ILRChecklistContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Documents all ILR applicants need
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Regardless of your visa route, the following documents are required for almost every ILR application:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Valid passport or travel document — it must not be expired</li>
        <li>Evidence of your current immigration status (eVisa or BRP card if issued before 2025)</li>
        <li>Life in the UK test pass reference number</li>
        <li>Full travel history — every trip outside the UK during your qualifying period, with departure and return dates</li>
        <li>Biometric enrolment appointment booked at UKVCAS (£19.20 standard slot)</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Why getting documents right matters
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        The ILR application fee is £3,226 per person. This fee is not refunded if your application is refused. A refused application means paying again and restarting the process — which can add months to your timeline and thousands of pounds in additional cost.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        UKVI cross-checks travel history, employment records, and financial evidence against other government data. Missing or inconsistent documents are one of the most common reasons for delays and refusals. Preparing a complete, consistent application the first time is essential.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Use our{' '}
        <Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link>{' '}
        to identify any potential issues before you submit.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How long does ILR take to process?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Standard ILR processing usually takes within 6 months of your biometric enrolment appointment. A priority service is available for an additional fee and typically gives a faster decision.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        You can check your application status through your UKVI online account. Do not book international travel after submitting your application until your ILR is confirmed — leaving the UK before a decision can complicate your application.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">What form do I fill in for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Most ILR applications use the SET(O) form (settlement — other categories). Spouse and family applicants may use SET(M). The correct form depends on your visa route. All applications are now submitted online through the UKVI system.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need a B1 English certificate for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Most ILR applicants need to prove B1 English speaking and listening ability. Skilled Worker and Tier 2 visa holders are exempt (English was proved at visa stage). Nationals of certain countries are also exempt. Use our{' '}
        <Link href="/b1-check" className="text-brand underline">B1 English level check</Link>{' '}
        to see if you are ready to book.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I apply for ILR online?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. ILR applications are submitted online through GOV.UK. You upload your documents digitally. You still need to attend a UKVCAS service point in person for biometric enrolment (fingerprints and photograph).
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is biometric enrolment and how much does it cost?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Biometric enrolment is the in-person appointment where UKVCAS records your fingerprints and photograph. It costs £19.20 for a standard appointment. Enhanced appointments (shorter wait times and longer slots) cost more. You book through the UKVCAS website after submitting your online application.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What happens if I submit the wrong documents?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        UKVI may contact you to request missing documents. However, in some cases a missing or incorrect document will result in a straight refusal. There is no guaranteed opportunity to correct errors after submission. Get your documents right before you apply.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How long does ILR take to process?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Standard processing is usually within 6 months. The Home Office publishes current processing times on GOV.UK. Processing times can vary significantly — check before you apply if you have a time-sensitive situation.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/ilr-documents-required-2026" className="text-brand underline">ILR documents required 2026 — full guide</Link></li>
          <li><Link href="/articles/how-much-does-ilr-cost-2026" className="text-brand underline">How much does ILR cost in 2026?</Link></li>
          <li><Link href="/ilr-calculator" className="text-brand underline">ILR eligibility calculator</Link></li>
          <li><Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link></li>
          <li><Link href="/absence-calculator" className="text-brand underline">180-day absence calculator</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function ILRChecklistPage() {
  return (
    <>
      <ILRChecklistIntro />
      <ILRChecklistClient />
      <ILRChecklistContent />
    </>
  )
}
