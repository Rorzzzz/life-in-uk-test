import ILRRiskClient from './ILRRiskClient'

export async function generateMetadata() {
  return {
    title: 'ILR Refusal Risk Checker — Free Assessment 2026',
    description: 'Check the most common reasons ILR applications are refused. Answer 9 questions about your situation and get a free risk assessment before you apply.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-risk-check' },
    openGraph: {
      title: 'ILR Refusal Risk Checker — Free Assessment 2026',
      description: 'Check the most common reasons ILR applications are refused. Answer 9 questions about your situation and get a free risk assessment before you apply.',
      url: 'https://passtheuktest.co.uk/ilr-risk-check',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function ILRRiskCheckPage() {
  return <ILRRiskClient />
}
