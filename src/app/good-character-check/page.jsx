import GoodCharacterClient from './GoodCharacterClient'

export async function generateMetadata() {
  return {
    title: 'Good Character Check — ILR & Citizenship Requirement 2026',
    description: 'Check if your history might affect your ILR or citizenship good character requirement. Answer 6 questions and get a clear assessment — free, no login needed.',
    alternates: { canonical: 'https://passtheuktest.co.uk/good-character-check' },
    openGraph: {
      title: 'Good Character Check — ILR & Citizenship Requirement 2026',
      description: 'Check if your history might affect your ILR or citizenship good character requirement. Answer 6 questions and get a clear assessment — free, no login needed.',
      url: 'https://passtheuktest.co.uk/good-character-check',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function GoodCharacterCheckPage() {
  return <GoodCharacterClient />
}
