import StudyPlanClient from './StudyPlanClient'

export async function generateMetadata() {
  return {
    title: 'Life in the UK Test Study Plan Generator — Free 2026',
    description: 'Enter your test date and current practice score. Get a free personalised day-by-day study plan for the Life in the UK test — built around your schedule.',
    alternates: { canonical: 'https://passtheuktest.co.uk/study-plan-generator' },
    openGraph: {
      title: 'Life in the UK Test Study Plan Generator — Free 2026',
      description: 'Enter your test date and current practice score. Get a free personalised day-by-day study plan for the Life in the UK test — built around your schedule.',
      url: 'https://passtheuktest.co.uk/study-plan-generator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function StudyPlanGeneratorPage() {
  return <StudyPlanClient />
}
