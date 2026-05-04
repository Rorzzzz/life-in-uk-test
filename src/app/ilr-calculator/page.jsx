import ILRCalculatorClient from './ILRCalculatorClient'

export async function generateMetadata() {
  return {
    title: 'ILR Eligibility Calculator 2026 — When Can You Apply?',
    description: 'Find out when you can apply for ILR and the total cost. Enter your visa type and arrival date — get your eligibility date and full fee breakdown instantly.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-calculator' },
    openGraph: {
      title: 'ILR Eligibility Calculator 2026 — When Can You Apply?',
      description: 'Find out when you can apply for ILR and the total cost. Enter your visa type and arrival date — get your eligibility date and full fee breakdown instantly.',
      url: 'https://passtheuktest.co.uk/ilr-calculator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function ILRCalculatorPage() {
  return <ILRCalculatorClient />
}
