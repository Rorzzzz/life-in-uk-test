import ILRChecklistClient from './ILRChecklistClient'

export async function generateMetadata() {
  return {
    title: 'ILR Document Checklist 2026 — What You Need to Apply',
    description: 'Get your personalised ILR document checklist based on your visa type. Tick off each item before you apply for Indefinite Leave to Remain.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-checklist' },
    openGraph: {
      title: 'ILR Document Checklist 2026 — What You Need to Apply',
      description: 'Get your personalised ILR document checklist based on your visa type. Tick off each item before you apply for Indefinite Leave to Remain.',
      url: 'https://passtheuktest.co.uk/ilr-checklist',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function ILRChecklistPage() {
  return <ILRChecklistClient />
}
