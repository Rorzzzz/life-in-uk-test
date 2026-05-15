// Pass the UK Test — FAQ Page Data
// 35 Q&As for /faq — targets People Also Ask and Featured Snippets
// FAQPage schema applied on the page

export const FAQS = [
  // ── The test itself ──
  {
    id: 1,
    question: 'How many questions are in the Life in the UK test?',
    answer: 'The Life in the UK test has 24 questions. You must answer at least 18 correctly (75%) to pass. The test is multiple choice with four options per question.',
    category: 'About the Test',
  },
  {
    id: 2,
    question: 'How long do you have to complete the Life in the UK test?',
    answer: 'You have 45 minutes to complete the Life in the UK test. Most people finish much faster — the average is around 15–20 minutes.',
    category: 'About the Test',
  },
  {
    id: 3,
    question: 'What is the pass mark for the Life in the UK test?',
    answer: 'The pass mark is 18 out of 24 questions correct — that is 75%. If you score 17 or fewer, you fail and must resit (paying the fee again).',
    category: 'About the Test',
  },
  {
    id: 4,
    question: 'How much does the Life in the UK test cost?',
    answer: 'The Life in the UK test costs £50 per attempt. If you fail, you must pay £50 again to resit. There is no limit on the number of attempts.',
    category: 'About the Test',
  },
  {
    id: 5,
    question: 'What happens if you fail the Life in the UK test?',
    answer: 'If you fail, you can resit as many times as you need by paying the £50 fee again. You must wait at least 7 days before booking a new appointment — you cannot rebook within 7 days of a failed attempt.',
    category: 'About the Test',
  },
  {
    id: 6,
    question: 'What ID do you need for the Life in the UK test?',
    answer: 'You must bring a valid physical photo ID: a passport, a pre-2025 Biometric Residence Permit (BRP), or a national identity card (EU/EEA). An eVisa is not valid — it is a digital record, not a physical document. A driving licence is not accepted.',
    category: 'About the Test',
  },
  {
    id: 7,
    question: 'Can you take the Life in the UK test online?',
    answer: 'No. The Life in the UK test must be taken in person at an approved test centre. There is no online or remote version of the official test.',
    category: 'About the Test',
  },
  {
    id: 8,
    question: 'What is the Life in the UK test based on?',
    answer: 'The test is based on the official handbook "Life in the United Kingdom: A Guide for New Residents" (3rd edition). All test questions come from this book. You should study the entire handbook, not just individual chapters.',
    category: 'About the Test',
  },
  // ── Eligibility ──
  {
    id: 9,
    question: 'Who needs to take the Life in the UK test?',
    answer: 'You must pass the Life in the UK test if you are applying for Indefinite Leave to Remain (ILR/settlement) or British citizenship. It is required for most applicants aged 18–64.',
    category: 'Eligibility',
  },
  {
    id: 10,
    question: 'Are there any exemptions from the Life in the UK test?',
    answer: 'Yes. You are exempt if you are under 18 or 65 or over, or if you have a long-term physical or mental condition that prevents you from studying for or taking the test. You must provide medical evidence for health exemptions.',
    category: 'Eligibility',
  },
  {
    id: 11,
    question: 'Do EU citizens need to take the Life in the UK test?',
    answer: 'EU citizens who applied under the EU Settlement Scheme do not need the Life in the UK test for settled status. However, if you later apply for British citizenship, you will need to pass the test.',
    category: 'Eligibility',
  },
  // ── Booking ──
  {
    id: 12,
    question: 'How do you book the Life in the UK test?',
    answer: 'Book online at gov.uk/life-in-the-uk-test (the official GOV.UK booking page). You will need to create an account and choose a test centre and date. Payment is £50 by card.',
    category: 'Booking',
  },
  {
    id: 13,
    question: 'How far in advance can you book the Life in the UK test?',
    answer: 'Test appointments are typically available 2–6 weeks in advance. In busy areas like London, slots fill up quickly so book as early as possible once you are ready.',
    category: 'Booking',
  },
  {
    id: 14,
    question: 'Can you cancel or reschedule the Life in the UK test?',
    answer: 'Yes. You can reschedule for free up to 3 days before your test. If you cancel more than 3 days in advance, you get a full refund. Cancellations within 3 days forfeit the £50 fee.',
    category: 'Booking',
  },
  // ── Study ──
  {
    id: 15,
    question: 'How long should you study for the Life in the UK test?',
    answer: 'Most people study for 2–4 weeks. The test covers 5 chapters of the official handbook. If you do 30 minutes of practice daily using tools like Pass the UK Test, most people are ready in 3 weeks.',
    category: 'Study Tips',
  },
  {
    id: 16,
    question: 'What are the hardest questions on the Life in the UK test?',
    answer: 'The hardest questions tend to be specific dates (e.g., when was Magna Carta signed?), exact statistics (population figures, sports records), and questions about arts and culture. Dates and numbers are the most commonly failed topics.',
    category: 'Study Tips',
  },
  {
    id: 17,
    question: 'Do you need to read the whole Life in the UK handbook?',
    answer: 'Yes. Exam questions can come from any part of the handbook, including chapters many people skip (like arts, sport and religion). Read every chapter and use practice questions to test your knowledge.',
    category: 'Study Tips',
  },
  {
    id: 18,
    question: 'Are practice tests helpful for the Life in the UK test?',
    answer: 'Yes — practice tests are the most effective way to prepare. They reveal which topics you are weak on and reinforce memory through repetition. Aim to score 90%+ consistently on practice tests before booking your real test.',
    category: 'Study Tips',
  },
  // ── Test day ──
  {
    id: 19,
    question: 'What should you bring to the Life in the UK test?',
    answer: 'Bring your booking confirmation (email printout or on your phone) and a valid physical photo ID — passport, pre-2025 BRP, or EU/EEA national identity card. An eVisa is not valid ID. Arrive 15 minutes early. You cannot bring notes, phones, or any study materials into the exam room.',
    category: 'Test Day',
  },
  {
    id: 20,
    question: 'What happens on the day of your Life in the UK test?',
    answer: 'You arrive, show your ID, and are taken to a computer terminal. The test is completed on screen — 24 multiple choice questions in 45 minutes. You find out your result immediately on screen when you finish.',
    category: 'Test Day',
  },
  {
    id: 21,
    question: 'Do you get the results immediately after the Life in the UK test?',
    answer: 'Yes. Your result (pass or fail) is displayed on screen immediately when you finish the test. You will also receive a pass notification letter if you pass, which you use for your visa/citizenship application.',
    category: 'Test Day',
  },
  // ── Content knowledge ──
  {
    id: 22,
    question: 'When was the Magna Carta signed?',
    answer: 'The Magna Carta was signed in 1215 by King John at Runnymede. It established for the first time that the king was subject to the rule of law and gave rights to the English Church and barons.',
    category: 'Content Knowledge',
  },
  {
    id: 23,
    question: 'What year did women get the right to vote in the UK?',
    answer: 'In 1918, women over 30 who met property qualifications were given the vote. In 1928, all women over 21 gained equal voting rights with men. The campaign was led by the Suffragettes.',
    category: 'Content Knowledge',
  },
  {
    id: 24,
    question: 'What are the patron saints of England, Scotland, Wales and Northern Ireland?',
    answer: 'England: St George (23 April). Scotland: St Andrew (30 November). Wales: St David (1 March). Northern Ireland: St Patrick (17 March). These are also the dates of their national days.',
    category: 'Content Knowledge',
  },
  {
    id: 25,
    question: 'When was the NHS founded?',
    answer: 'The National Health Service (NHS) was founded in 1948 by the post-war Labour government under Clement Attlee, based on a report by William Beveridge. It provides free healthcare to all UK residents.',
    category: 'Content Knowledge',
  },
  {
    id: 26,
    question: 'How many MPs are in the House of Commons?',
    answer: 'There are 650 Members of Parliament (MPs) in the House of Commons. Each MP represents a constituency. The Prime Minister is the leader of the party that can command a majority in the Commons.',
    category: 'Content Knowledge',
  },
  {
    id: 27,
    question: 'What is the Commonwealth?',
    answer: 'The Commonwealth (formerly the British Commonwealth of Nations) is a voluntary association of 56 member states, most of which were formerly part of the British Empire. King Charles III is the head of the Commonwealth.',
    category: 'Content Knowledge',
  },
  {
    id: 28,
    question: 'Who wrote Romeo and Juliet?',
    answer: 'Romeo and Juliet was written by William Shakespeare, probably in 1594–1596. Shakespeare, born in Stratford-upon-Avon in 1564, is widely considered the greatest writer in the English language.',
    category: 'Content Knowledge',
  },
  {
    id: 29,
    question: 'What was the Empire Windrush?',
    answer: 'The Empire Windrush was a ship that arrived in the UK in 1948, carrying some of the first large group of post-war migrants from the Caribbean. The Windrush generation helped rebuild post-war Britain and transformed British society.',
    category: 'Content Knowledge',
  },
  {
    id: 30,
    question: 'What year did the Norman Conquest happen?',
    answer: 'The Norman Conquest happened in 1066 when William the Conqueror (Duke of Normandy) defeated King Harold II at the Battle of Hastings. William became King of England and transformed English language, culture and society.',
    category: 'Content Knowledge',
  },
  // ── Application / after ──
  {
    id: 31,
    question: 'How long is the Life in the UK test pass certificate valid?',
    answer: 'Your Life in the UK test pass never expires. Once you have passed, you can use that result for any future ILR or citizenship application, even years later.',
    category: 'After the Test',
  },
  {
    id: 32,
    question: 'Can you use the same Life in the UK pass for both ILR and citizenship?',
    answer: 'Yes. A single Life in the UK test pass can be used for an ILR application and later for a naturalisation (citizenship) application. You do not need to take the test twice.',
    category: 'After the Test',
  },
  {
    id: 33,
    question: 'What other requirements are there for British citizenship besides the Life in the UK test?',
    answer: 'Besides passing the Life in the UK test, you need: 5 years of lawful residence (6 for ILR + 1 year), good character, passing an English language test (unless exempt), and being free from immigration time restrictions.',
    category: 'After the Test',
  },
  {
    id: 34,
    question: 'What is the difference between ILR and British citizenship?',
    answer: 'Indefinite Leave to Remain (ILR) gives you the right to live and work in the UK without a visa. British citizenship additionally gives you a British passport, the right to vote in all elections, and you can pass citizenship to your children.',
    category: 'After the Test',
  },
  {
    id: 35,
    question: 'Do you need a Life in the UK test pass to apply for a British passport?',
    answer: 'The Life in the UK test is required to apply for British citizenship (naturalisation), not directly for a passport. Once you are a British citizen, you can apply for a British passport without any additional test.',
    category: 'After the Test',
  },
]

// Group FAQs by category for display
export function getFAQsByCategory() {
  const categories = {}
  for (const faq of FAQS) {
    if (!categories[faq.category]) categories[faq.category] = []
    categories[faq.category].push(faq)
  }
  return categories
}

export const FAQ_CATEGORIES = [
  'About the Test',
  'Eligibility',
  'Booking',
  'Study Tips',
  'Test Day',
  'Content Knowledge',
  'After the Test',
]
