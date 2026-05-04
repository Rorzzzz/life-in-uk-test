import AbsenceCalculatorClient from './AbsenceCalculatorClient'

export async function generateMetadata() {
  return {
    title: 'UK Absence Calculator — 180 Day ILR Rule Checker 2026',
    description: 'Check if your time outside the UK affects your ILR eligibility. Add your trips and instantly see if you have exceeded the 180-day rule in any 12-month period.',
    alternates: { canonical: 'https://passtheuktest.co.uk/absence-calculator' },
    openGraph: {
      title: 'UK Absence Calculator — 180 Day ILR Rule Checker 2026',
      description: 'Check if your time outside the UK affects your ILR eligibility. Add your trips and instantly see if you have exceeded the 180-day rule in any 12-month period.',
      url: 'https://passtheuktest.co.uk/absence-calculator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function AbsenceCalculatorPage() {
  return <AbsenceCalculatorClient />
}
