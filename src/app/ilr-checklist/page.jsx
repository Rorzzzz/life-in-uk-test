import Link from 'next/link'
import ILRChecklistClient from './ILRChecklistClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'ILR Document Checklist 2026 — Free Printable by Visa Type',
    description: 'Free ILR document checklist for 2026 — organised by visa route. Skilled Worker, Family, Long Residence and more. Print before your application. No sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-checklist' },
    openGraph: {
      title: 'ILR Document Checklist 2026 — Free Printable by Visa Type',
      description: 'Free ILR document checklist for 2026 — organised by visa route. Skilled Worker, Family, Long Residence and more. Print before your application. No sign-up.',
      url: 'https://passtheuktest.co.uk/ilr-checklist',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What documents do I need for ILR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All ILR applicants need: a valid passport, evidence of current immigration status (eVisa), a Life in the UK test pass reference number, a full travel history for the qualifying period, and a booked biometric enrolment appointment. Additional documents depend on your visa route — Skilled Worker applicants need employment evidence; Family visa applicants need proof of the relationship.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need original documents or copies for ILR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ILR applications are submitted online through GOV.UK and documents are uploaded digitally. You do not post original documents. However, UKVCAS may ask you to bring originals to your biometric appointment for verification. Keep originals safe and accessible throughout the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if a document is not in English?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any document not in English must be accompanied by a certified translation. The translator must confirm the translation is accurate and provide their name and contact details. UKVI will not accept uncertified translations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far back do bank statements need to go for ILR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most ILR routes, UKVI asks for 6 months of personal bank statements ending as close to the application date as possible. Some routes — particularly Long Residence — may require evidence going back further. Check the specific requirements for your visa route on GOV.UK.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ILR biometric appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biometric appointment is a mandatory in-person visit to a UKVCAS service point where your fingerprints and photograph are recorded. It costs £19.20 for a standard appointment. You book through the UKVCAS website after submitting your online ILR application. You cannot complete your ILR application without attending this appointment.',
      },
    },
  ],
}

function ILRChecklistIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        ILR Document Checklist 2026 — Free Printable by Visa Type
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
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/ilr-checklist"
          title="Free ILR Document Checklist 2026 — By Visa Type, Printable"
          text="Free printable ILR document checklist by visa type — never miss a document 🇬🇧"
        />
      </div>
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

      <h3 className="text-sm font-bold text-ink mb-1">What documents do I need for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        All ILR applicants need: a valid passport, evidence of current immigration status (eVisa), a Life in the UK test pass reference number, a full travel history for the qualifying period, and a booked biometric enrolment appointment. Additional documents depend on your visa route — Skilled Worker applicants need employment evidence; Family visa applicants need proof of the relationship. Use the checklist above to get the full list for your route.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need original documents or copies for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        ILR applications are submitted online through GOV.UK and documents are uploaded digitally — you do not post originals. However, UKVCAS may ask you to bring original documents to your biometric appointment for verification. Keep originals safe and accessible throughout the process.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What if a document is not in English?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Any document not in English must be accompanied by a certified translation. The translator must confirm the translation is accurate and provide their name and contact details. UKVI will not accept uncertified translations.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How far back do bank statements need to go for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        For most ILR routes, UKVI asks for 6 months of personal bank statements ending as close to the application date as possible. Some routes — particularly Long Residence — may require evidence going back further. Check the specific requirements for your visa route on GOV.UK before compiling your documents.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the ILR biometric appointment?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The biometric appointment is a mandatory in-person visit to a UKVCAS service point where your fingerprints and photograph are recorded. It costs £19.20 for a standard appointment. You book through the UKVCAS website after submitting your online ILR application. You cannot complete your ILR application without attending this appointment.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How long does ILR take to process?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Standard processing is usually within 6 months of your biometric enrolment appointment. The Home Office publishes current processing times on GOV.UK. Do not book international travel after submitting your application until your ILR is confirmed.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ILRChecklistIntro />
      <ILRChecklistClient />
      <ILRChecklistContent />
    </>
  )
}
