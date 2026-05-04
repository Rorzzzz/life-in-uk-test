import ExemptWizardClient from './ExemptWizardClient'

export async function generateMetadata() {
  return {
    title: 'Am I Exempt from the Life in the UK Test? (2026 Checker)',
    description: 'Find out in 60 seconds if you need to take the Life in the UK test. Answer 5 questions and get a clear yes or no with a full explanation of your exemption.',
    alternates: { canonical: 'https://passtheuktest.co.uk/test-exempt' },
    openGraph: {
      title: 'Am I Exempt from the Life in the UK Test? (2026 Checker)',
      description: 'Find out in 60 seconds if you need to take the Life in the UK test. Answer 5 questions and get a clear yes or no with a full explanation of your exemption.',
      url: 'https://passtheuktest.co.uk/test-exempt',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function TestExemptPage() {
  return <ExemptWizardClient />
}
