// B1 English Practice Questions
// B1_QUESTIONS: original 15 questions — used by /b1-check tool (backward compat)
// B1_PRACTICE_TESTS: 4 test sets of 15 questions each — used by /b1-practice/[number]
// B1_TEST_NUMBERS: valid test numbers for generateStaticParams

export const B1_QUESTIONS = [
  // SECTION 1: Vocabulary
  {
    id: 1,
    section: 'Vocabulary',
    q: 'What does "indefinitely" mean?',
    options: ['For a short time', 'Without a fixed end date', 'Immediately', 'Occasionally'],
    answer: 1,
    explanation: '"Indefinitely" means without a fixed end date or time limit. ILR (Indefinite Leave to Remain) means you can stay in the UK without a time limit.'
  },
  {
    id: 2,
    section: 'Vocabulary',
    q: 'If something is "mandatory", it means it is...',
    options: ['Optional', 'Recommended but not required', 'Required — you must do it', 'Forbidden'],
    answer: 2,
    explanation: '"Mandatory" means required by law or rules. The Life in the UK test is mandatory for most ILR and citizenship applicants.'
  },
  {
    id: 3,
    section: 'Vocabulary',
    q: 'What does "valid" mean when talking about a passport or document?',
    options: ['Expired and no longer usable', 'Currently acceptable and officially recognised', 'Recently applied for', 'Incorrectly completed'],
    answer: 1,
    explanation: 'A "valid" document is one that is currently accepted and has not expired. You must bring a valid passport to your Life in the UK test.'
  },
  {
    id: 4,
    section: 'Vocabulary',
    q: 'If your visa application is "refused", the Home Office has...',
    options: ['Approved it', 'Asked for more documents', 'Delayed the decision', 'Rejected it'],
    answer: 3,
    explanation: '"Refused" means rejected — your application was not approved. If your application is refused, you may have the right to appeal.'
  },
  {
    id: 5,
    section: 'Vocabulary',
    q: 'What does "eligible" mean?',
    options: ['Required to do something', 'Forbidden from doing something', 'Qualified to receive or do something', 'Uncertain about something'],
    answer: 2,
    explanation: '"Eligible" means you meet the requirements to receive something or do something. For example, you are eligible for ILR after 5 years on most visa routes.'
  },
  // SECTION 2: Grammar
  {
    id: 6,
    section: 'Grammar',
    q: 'Choose the correct sentence:',
    options: [
      'I live in the UK since 2019.',
      'I have lived in the UK since 2019.',
      'I am living in the UK since 2019.',
      'I was living in the UK since 2019.'
    ],
    answer: 1,
    explanation: 'Use "have lived" (present perfect) with "since" to describe an action that started in the past and continues now. "I have lived in the UK since 2019" is correct.'
  },
  {
    id: 7,
    section: 'Grammar',
    q: 'Which sentence is correct?',
    options: [
      'You must to attend the appointment.',
      'You must attending the appointment.',
      'You must attend the appointment.',
      'You must attended the appointment.'
    ],
    answer: 2,
    explanation: '"Must" is followed by the base form of the verb (without "to"). The correct form is "You must attend the appointment."'
  },
  {
    id: 8,
    section: 'Grammar',
    q: 'Choose the correct word: "You need to bring ___ original documents."',
    options: ['a', 'an', 'the', 'your'],
    answer: 3,
    explanation: '"Your" is correct here because it refers to documents that belong to the person. "Your original documents" means the original documents that belong to you.'
  },
  {
    id: 9,
    section: 'Grammar',
    q: 'Which sentence uses the correct tense?',
    options: [
      'My visa will expire last month.',
      'My visa has expired last month.',
      'My visa expired last month.',
      'My visa is expiring last month.'
    ],
    answer: 2,
    explanation: 'For a completed action at a specific time in the past ("last month"), use the simple past tense. "My visa expired last month" is correct.'
  },
  {
    id: 10,
    section: 'Grammar',
    q: 'Choose the correct option: "The application form ___ be completed in English."',
    options: ['should', 'must', 'might', 'would'],
    answer: 1,
    explanation: '"Must" expresses obligation — it is required. "Must" is stronger than "should" (which is advice). The form is required to be in English, so "must" is correct.'
  },
  // SECTION 3: Reading Comprehension
  {
    id: 11,
    section: 'Reading',
    passage: 'To apply for Indefinite Leave to Remain, you must have lived in the UK for at least five years. During this time, you must not have been outside the UK for more than 180 days in any 12-month period. You must also have passed the Life in the UK test and met the English language requirement.',
    q: 'According to the passage, how long must you have lived in the UK before applying for ILR?',
    options: ['Three years', 'Four years', 'Five years', 'Ten years'],
    answer: 2,
    explanation: 'The passage states: "you must have lived in the UK for at least five years." The answer is five years.'
  },
  {
    id: 12,
    section: 'Reading',
    passage: 'To apply for Indefinite Leave to Remain, you must have lived in the UK for at least five years. During this time, you must not have been outside the UK for more than 180 days in any 12-month period. You must also have passed the Life in the UK test and met the English language requirement.',
    q: 'According to the passage, what is the maximum number of days you can be outside the UK in any 12-month period?',
    options: ['90 days', '120 days', '180 days', '365 days'],
    answer: 2,
    explanation: 'The passage states you must not have been outside the UK for "more than 180 days in any 12-month period." The maximum is 180 days.'
  },
  {
    id: 13,
    section: 'Reading',
    passage: 'The Life in the UK test consists of 24 multiple-choice questions. You have 45 minutes to complete the test. To pass, you need to answer at least 18 questions correctly. The test costs £50 per attempt. There is no limit on the number of times you can retake the test, but you must wait at least 7 days between attempts.',
    q: 'How many questions do you need to answer correctly to pass the Life in the UK test?',
    options: ['16', '18', '20', '24'],
    answer: 1,
    explanation: 'The passage states: "To pass, you need to answer at least 18 questions correctly." The answer is 18.'
  },
  {
    id: 14,
    section: 'Reading',
    passage: 'The Life in the UK test consists of 24 multiple-choice questions. You have 45 minutes to complete the test. To pass, you need to answer at least 18 questions correctly. The test costs £50 per attempt. There is no limit on the number of times you can retake the test, but you must wait at least 7 days between attempts.',
    q: 'If you fail the test on a Monday, what is the earliest day you could retake it?',
    options: ['Tuesday', 'Wednesday', 'The following Monday', 'The following month'],
    answer: 2,
    explanation: 'The passage says you must wait at least 7 days between attempts. 7 days after Monday is the following Monday.'
  },
  {
    id: 15,
    section: 'Reading',
    passage: 'When you receive a decision on your visa application, it will be sent to the email address you provided. If your application is successful, you will receive confirmation of your immigration status. If your application is refused, you will receive a letter explaining the reasons for the decision and information about your right to appeal.',
    q: 'According to the passage, what happens if your visa application is refused?',
    options: [
      'You receive a new passport',
      'You must leave the UK immediately',
      'You receive a letter with reasons and information about appealing',
      'Your application is automatically reconsidered'
    ],
    answer: 2,
    explanation: 'The passage states: "you will receive a letter explaining the reasons for the decision and information about your right to appeal."'
  },
]

// ─── Test 2 ───────────────────────────────────────────────────────────────────
const TEST_2 = [
  {
    id: 201, section: 'Vocabulary',
    q: 'What does "consent" mean?',
    options: ['Financial support', 'Formal disagreement', 'Agreement or permission', 'A legal document'],
    answer: 2,
    explanation: '"Consent" means agreement or permission. For example, you must give consent before your data is shared with other government departments.'
  },
  {
    id: 202, section: 'Vocabulary',
    q: 'To "deport" someone means to...',
    options: ['Allow them to stay permanently', 'Formally send them out of the country', 'Grant them citizenship', 'Detain them for questioning'],
    answer: 1,
    explanation: '"Deport" means to officially remove someone from a country and send them back to their home country. It is a serious immigration consequence.'
  },
  {
    id: 203, section: 'Vocabulary',
    q: 'What does "biometric" mean in the context of a visa or residence permit?',
    options: ['Related to financial records', 'Related to employment history', 'Related to unique physical characteristics like fingerprints', 'Related to educational qualifications'],
    answer: 2,
    explanation: '"Biometric" refers to unique physical characteristics used to identify a person — such as fingerprints, face scans, or iris patterns. Biometric residence permits (BRPs) include your photo and fingerprint data.'
  },
  {
    id: 204, section: 'Vocabulary',
    q: 'In immigration, a "sponsor" is...',
    options: ['An official who processes your application', 'A person or employer who supports your visa application', 'A translator who helps with your documents', 'A legal representative who appeals decisions'],
    answer: 1,
    explanation: 'A "sponsor" is an employer or organisation licensed by the Home Office to employ overseas workers. On a Skilled Worker visa, your employer must be a licensed sponsor.'
  },
  {
    id: 205, section: 'Vocabulary',
    q: 'A "surcharge" is...',
    options: ['A refund on a payment already made', 'The main cost of a service', 'An additional charge added on top of the main cost', 'A fine for breaking the rules'],
    answer: 2,
    explanation: 'A "surcharge" is an extra charge on top of the normal price. The Immigration Health Surcharge (IHS) is an additional fee paid by visa applicants on top of the visa fee.'
  },
  {
    id: 206, section: 'Grammar',
    q: 'Choose the correct sentence:',
    options: [
      'She working in the UK for three years.',
      'She has been working in the UK for three years.',
      'She is working in the UK since three years.',
      'She works in the UK since three years.'
    ],
    answer: 1,
    explanation: 'Use the present perfect continuous ("has been working") for an action that started in the past and is still continuing. "For three years" indicates a duration that continues to the present.'
  },
  {
    id: 207, section: 'Grammar',
    q: 'Choose the correct sentence:',
    options: [
      'Your application reviews by a caseworker within 6 months.',
      'Your application reviewing by a caseworker within 6 months.',
      'Your application will be reviewed by a caseworker within 6 months.',
      'Your application has reviewed by a caseworker within 6 months.'
    ],
    answer: 2,
    explanation: 'The passive voice is "will be reviewed" — this means someone else (the caseworker) does the action TO the application. "Will be + past participle" is the future passive.'
  },
  {
    id: 208, section: 'Grammar',
    q: 'Choose the correct option: "If you miss the appointment, you ___ to pay a new booking fee."',
    options: ['will need', 'would need', 'needed', 'have needed'],
    answer: 0,
    explanation: 'First conditional: "If + present simple, will + infinitive." This describes a real possibility and its likely result. "If you miss… you will need" is correct.'
  },
  {
    id: 209, section: 'Grammar',
    q: 'Choose the correct word: "I have studied English ___ I was a child."',
    options: ['for', 'since', 'during', 'while'],
    answer: 1,
    explanation: '"Since" is used with a point in time (a specific moment in the past) to show when an action started. "Since I was a child" = from that point in time until now. Use "for" with a duration ("for ten years").'
  },
  {
    id: 210, section: 'Grammar',
    q: 'Which sentence is correct? The appointment is optional.',
    options: [
      'You don\'t have to attend if you don\'t want to.',
      'You mustn\'t attend if you don\'t want to.',
      'You can\'t attend if you don\'t want to.',
      'You shouldn\'t attend if you don\'t want to.'
    ],
    answer: 0,
    explanation: '"Don\'t have to" means it is not obligatory — you have a choice. "Mustn\'t" means it is forbidden. These are very different in meaning. Because the appointment is optional, "don\'t have to" is correct.'
  },
  {
    id: 211, section: 'Reading',
    passage: 'When you pass the Life in the UK test and meet all other requirements, you will be invited to attend a citizenship ceremony. At the ceremony, you will make an oath of allegiance to the King and a pledge to respect the rights, freedoms and laws of the UK. After the ceremony, you will be given a certificate of naturalisation. This certificate is official proof that you are a British citizen.',
    q: 'According to the passage, what document do you receive at the citizenship ceremony?',
    options: ['A British passport', 'A certificate of naturalisation', 'A biometric residence permit', 'A letter from the Home Office'],
    answer: 1,
    explanation: 'The passage states: "you will be given a certificate of naturalisation." This is the document that proves you are a British citizen.'
  },
  {
    id: 212, section: 'Reading',
    passage: 'When you pass the Life in the UK test and meet all other requirements, you will be invited to attend a citizenship ceremony. At the ceremony, you will make an oath of allegiance to the King and a pledge to respect the rights, freedoms and laws of the UK. After the ceremony, you will be given a certificate of naturalisation. This certificate is official proof that you are a British citizen.',
    q: 'According to the passage, what do you do at the citizenship ceremony?',
    options: ['Sit an English language test', 'Sign a contract with the Home Office', 'Make an oath of allegiance and a pledge', 'Meet the King in person'],
    answer: 2,
    explanation: 'The passage states: "you will make an oath of allegiance to the King and a pledge to respect the rights, freedoms and laws of the UK."'
  },
  {
    id: 213, section: 'Reading',
    passage: 'British citizens and citizens of qualifying Commonwealth countries who are resident in the UK have the right to vote in UK general elections. You must be registered to vote before the electoral registration deadline. Citizens of the European Union can vote in local elections in the UK. The minimum voting age in UK general elections is 18.',
    q: 'According to the passage, at what age can you vote in UK general elections?',
    options: ['16', '17', '18', '21'],
    answer: 2,
    explanation: 'The passage states: "The minimum voting age in UK general elections is 18."'
  },
  {
    id: 214, section: 'Reading',
    passage: 'British citizens and citizens of qualifying Commonwealth countries who are resident in the UK have the right to vote in UK general elections. You must be registered to vote before the electoral registration deadline. Citizens of the European Union can vote in local elections in the UK. The minimum voting age in UK general elections is 18.',
    q: 'According to the passage, who can vote in UK general elections?',
    options: ['All people who live in the UK', 'Only people born in the UK', 'British citizens and qualifying Commonwealth citizens resident in the UK', 'All EU citizens living in the UK'],
    answer: 2,
    explanation: 'The passage states: "British citizens and citizens of qualifying Commonwealth countries who are resident in the UK have the right to vote in UK general elections." EU citizens can vote in local elections only.'
  },
  {
    id: 215, section: 'Reading',
    passage: 'Indefinite Leave to Remain gives you the right to live and work in the UK without any time restrictions. You no longer need a work visa or a Certificate of Sponsorship. You can change jobs freely, start your own business, or work in any sector — including roles that previously required settled status or British citizenship.',
    q: 'According to the passage, which of the following is true about ILR?',
    options: [
      'You can only work in the sector your previous visa covered',
      'You still need a Certificate of Sponsorship to start a new job',
      'You can live and work in the UK without time restrictions',
      'You must apply for British citizenship within five years'
    ],
    answer: 2,
    explanation: 'The passage states: "Indefinite Leave to Remain gives you the right to live and work in the UK without any time restrictions."'
  },
]

// ─── Test 3 ───────────────────────────────────────────────────────────────────
const TEST_3 = [
  {
    id: 301, section: 'Vocabulary',
    q: 'A "provisional" decision is one that is...',
    options: ['Final and cannot be changed', 'Made by the most senior official', 'Temporary and not yet confirmed', 'Based on incomplete evidence only'],
    answer: 2,
    explanation: '"Provisional" means temporary or not yet final. A provisional driving licence allows you to practise driving before you pass your test and get a full licence.'
  },
  {
    id: 302, section: 'Vocabulary',
    q: 'If you are "exempt" from the B1 English test, you...',
    options: ['Must take a different, harder test instead', 'Do not need to take the test', 'Can delay the test for up to 12 months', 'Must prove your exemption to an examiner'],
    answer: 1,
    explanation: '"Exempt" means you are not required to follow a particular rule or complete a particular requirement. Skilled Worker visa holders are typically exempt from the B1 test at ILR stage.'
  },
  {
    id: 303, section: 'Vocabulary',
    q: 'An "entitlement" is...',
    options: ['A financial penalty for breaking a rule', 'The process of applying for a benefit', 'A right to receive or do something', 'A formal objection to a decision'],
    answer: 2,
    explanation: '"Entitlement" means the right to have or receive something. For example, after 5 years on a Skilled Worker visa, you become entitled to apply for ILR.'
  },
  {
    id: 304, section: 'Vocabulary',
    q: '"Naturalisation" is the process by which...',
    options: [
      'A temporary visa is extended for another year',
      'A person becomes a citizen of a country they were not born in',
      'A person applies for the right to work',
      'An employer sponsors a worker\'s visa'
    ],
    answer: 1,
    explanation: '"Naturalisation" is the legal process of acquiring citizenship. When you apply for British citizenship, you are applying for naturalisation as a British citizen.'
  },
  {
    id: 305, section: 'Vocabulary',
    q: 'For ILR, you need a "continuous" period of 5 years in the UK. This means...',
    options: [
      'You can leave the UK as many times as you like with no limits',
      'You must not have taken any holidays abroad during that period',
      'Your residence must not have a significant break or gap beyond the allowed limit',
      'You must have worked without stopping for the full five years'
    ],
    answer: 2,
    explanation: '"Continuous" residence means you must not have broken the qualifying period. The rules allow up to 180 days outside the UK per year — exceeding this can break the continuity of your residence.'
  },
  {
    id: 306, section: 'Grammar',
    q: 'The officer said: "You must submit the form by Friday." In reported speech, this becomes: The officer said that we ___  submit the form by Friday.',
    options: ['must', 'had to', 'have to', 'should have'],
    answer: 1,
    explanation: 'In reported speech, "must" shifts to "had to" when the reporting verb is in the past tense ("said"). "The officer said that we had to submit the form by Friday" is correct.'
  },
  {
    id: 307, section: 'Grammar',
    q: 'Choose the correct sentence: "Thank you ___ your application form."',
    options: ['to complete', 'for completing', 'that you complete', 'to completing'],
    answer: 1,
    explanation: 'After the preposition "for", use a gerund (verb + -ing). "Thank you for completing" is correct. Prepositions are always followed by a gerund, not an infinitive.'
  },
  {
    id: 308, section: 'Grammar',
    q: 'Choose the correct option: "LANGUAGECERT is ___ convenient option because you can take it from home."',
    options: ['more convenient', 'the most convenient', 'most convenient', 'the more convenient'],
    answer: 1,
    explanation: 'Use a superlative ("the most convenient") when comparing one thing against all others in a group. Use "the" before superlatives. "Most convenient" without "the" is not standard English here.'
  },
  {
    id: 309, section: 'Grammar',
    q: 'Choose the correct question tag: "You have been living in the UK for five years, ___?"',
    options: ['haven\'t you', 'don\'t you', 'didn\'t you', 'aren\'t you'],
    answer: 0,
    explanation: 'Question tags use the same auxiliary verb as the main clause. The main clause uses "have been" (present perfect), so the tag uses "haven\'t." "You have been… haven\'t you?" is correct.'
  },
  {
    id: 310, section: 'Grammar',
    q: 'Choose the correct article: "You need to pass ___ Life in the UK test before applying for ILR."',
    options: ['a', 'an', 'the', '— (no article)'],
    answer: 2,
    explanation: 'Use "the" when there is only one specific thing being referred to. The Life in the UK test is a unique, defined test — there is only one official version. "The" is the correct article here.'
  },
  {
    id: 311, section: 'Reading',
    passage: 'Jury service is a legal duty in England, Wales and Northern Ireland. If you are a British citizen or Commonwealth citizen aged 18 to 75 who is registered to vote, you may be called to serve on a jury. When you receive a jury summons, you are legally required to respond. Jury service typically lasts between 10 days and two weeks, but can be longer in complex cases.',
    q: 'According to the passage, who may be called for jury service?',
    options: [
      'Anyone who lives in the UK',
      'Only British citizens who are employed',
      'British or Commonwealth citizens aged 18 to 75 who are registered to vote',
      'British citizens aged 21 and over only'
    ],
    answer: 2,
    explanation: 'The passage states: "If you are a British citizen or Commonwealth citizen aged 18 to 75 who is registered to vote, you may be called to serve on a jury."'
  },
  {
    id: 312, section: 'Reading',
    passage: 'Jury service is a legal duty in England, Wales and Northern Ireland. If you are a British citizen or Commonwealth citizen aged 18 to 75 who is registered to vote, you may be called to serve on a jury. When you receive a jury summons, you are legally required to respond. Jury service typically lasts between 10 days and two weeks, but can be longer in complex cases.',
    q: 'According to the passage, how long does jury service typically last?',
    options: ['One to three days', 'One week exactly', 'Between 10 days and two weeks', 'A minimum of one month'],
    answer: 2,
    explanation: 'The passage states: "Jury service typically lasts between 10 days and two weeks, but can be longer in complex cases."'
  },
  {
    id: 313, section: 'Reading',
    passage: 'As of 8 January 2026, all new Skilled Worker visa applications require English at B2 level — a higher standard than before. However, applicants for Indefinite Leave to Remain still only need B1 English until 26 March 2027, when this standard will also rise to B2. British citizenship by naturalisation continues to require English at B1 level and this standard is not currently changing.',
    q: 'According to the passage, what English level is needed for ILR applications until March 2027?',
    options: ['A2', 'B1', 'B2', 'C1'],
    answer: 1,
    explanation: 'The passage states: "applicants for Indefinite Leave to Remain still only need B1 English until 26 March 2027." B1 is the correct answer.'
  },
  {
    id: 314, section: 'Reading',
    passage: 'As of 8 January 2026, all new Skilled Worker visa applications require English at B2 level — a higher standard than before. However, applicants for Indefinite Leave to Remain still only need B1 English until 26 March 2027, when this standard will also rise to B2. British citizenship by naturalisation continues to require English at B1 level and this standard is not currently changing.',
    q: 'According to the passage, what English level does British citizenship require?',
    options: ['A2', 'B1', 'B2', 'The same level as a new Skilled Worker visa'],
    answer: 1,
    explanation: 'The passage states: "British citizenship by naturalisation continues to require English at B1 level." This has not changed.'
  },
  {
    id: 315, section: 'Reading',
    passage: 'Volunteering is an important part of British society. Around 20 million adults in England volunteer formally at least once a year. Common forms of volunteering include supporting local charities, working in food banks, and helping at community events. Volunteering is unpaid work, but volunteers may claim reasonable out-of-pocket expenses.',
    q: 'According to the passage, approximately how many adults in England volunteer formally at least once a year?',
    options: ['2 million', '10 million', '20 million', '50 million'],
    answer: 2,
    explanation: 'The passage states: "Around 20 million adults in England volunteer formally at least once a year."'
  },
]

// ─── Test 4 ───────────────────────────────────────────────────────────────────
const TEST_4 = [
  {
    id: 401, section: 'Vocabulary',
    q: 'A "discretionary" decision is one that...',
    options: [
      'Must be made within 30 days by law',
      'Is made automatically without any human review',
      'Depends on an official\'s judgment, not fixed rules',
      'Can only be appealed to the High Court'
    ],
    answer: 2,
    explanation: '"Discretionary" means based on personal judgment rather than fixed rules. A discretionary decision gives the official the power to decide based on individual circumstances rather than automatically following a set rule.'
  },
  {
    id: 402, section: 'Vocabulary',
    q: '"Statutory" maternity pay is pay that...',
    options: [
      'Is paid voluntarily by employers who choose to offer it',
      'Is only available to full-time employees',
      'Is required and set by law',
      'Is calculated based on overtime hours only'
    ],
    answer: 2,
    explanation: '"Statutory" means required or authorised by law. Statutory Maternity Pay (SMP) is the minimum amount employers are legally required to pay — it is set by the government, not by the employer.'
  },
  {
    id: 403, section: 'Vocabulary',
    q: 'To "advocate" for something means to...',
    options: ['Formally object to a decision', 'Publicly support or recommend it', 'Submit an official complaint about it', 'Request an extension to a deadline'],
    answer: 1,
    explanation: '"Advocate" means to publicly support or recommend something. For example, charities often advocate for changes in immigration policy on behalf of the people they support.'
  },
  {
    id: 404, section: 'Vocabulary',
    q: 'A "petition" is...',
    options: [
      'A formal application for a visa',
      'A written request for legal advice from a court',
      'A formal written request, often signed by many people',
      'An official letter refusing an application'
    ],
    answer: 2,
    explanation: 'A "petition" is a formal written request, often signed by many people, asking an authority to take action or change something. In the UK, petitions with enough signatures can be debated in Parliament.'
  },
  {
    id: 405, section: 'Vocabulary',
    q: 'If you are "liable" for a debt, you are...',
    options: ['Exempt from paying it', 'Legally responsible for paying it', 'Entitled to claim it back', 'Required to dispute it in court'],
    answer: 1,
    explanation: '"Liable" means legally responsible. If you are liable for the Immigration Health Surcharge, for example, you are legally required to pay it as part of your visa application.'
  },
  {
    id: 406, section: 'Grammar',
    q: 'Choose the correct sentence:',
    options: [
      'If I submitted the form earlier, I would receive a decision by now.',
      'If I had submitted the form earlier, I would have received a decision by now.',
      'If I would submit the form earlier, I had received a decision by now.',
      'If I submitted the form earlier, I would have received a decision by now.'
    ],
    answer: 1,
    explanation: 'Third conditional = "If + past perfect, would have + past participle." This is used for hypothetical situations in the past — things that did not happen. "If I had submitted… I would have received" is correct.'
  },
  {
    id: 407, section: 'Grammar',
    q: 'Which is the correct indirect question form?',
    options: [
      'Could you tell me where is the test centre?',
      'Could you tell me where the test centre is?',
      'Could you tell me where is located the test centre?',
      'Could you tell me where the test centre it is?'
    ],
    answer: 1,
    explanation: 'In indirect questions (embedded questions), use statement word order — not question word order. After "tell me," the subject comes before the verb: "where the test centre is" (not "where is the test centre").'
  },
  {
    id: 408, section: 'Grammar',
    q: 'Choose the correct sentence:',
    options: [
      'By next March, I live in the UK for exactly five years.',
      'By next March, I am living in the UK for exactly five years.',
      'By next March, I have been living in the UK for exactly five years.',
      'By next March, I will have lived in the UK for exactly five years.'
    ],
    answer: 3,
    explanation: 'Future perfect ("will have + past participle") is used for an action that will be completed by a specific future time. "By next March, I will have lived here for five years" is correct.'
  },
  {
    id: 409, section: 'Grammar',
    q: 'Choose the correct modal verb: "She passed the test on her first attempt. She ___ be very well prepared."',
    options: ['could', 'should', 'must', 'would'],
    answer: 2,
    explanation: '"Must" is used for logical deduction when you are almost certain something is true based on evidence. Because she passed first time, it logically follows that she was very well prepared. "She must be well prepared" is correct.'
  },
  {
    id: 410, section: 'Grammar',
    q: 'Choose the correct relative pronoun: "The officer ___ reviewed my application called me yesterday."',
    options: ['which', 'what', 'who', 'whom'],
    answer: 2,
    explanation: 'Use "who" (not "which") in relative clauses that refer to people. "The officer who reviewed my application" — "officer" is a person, so "who" is correct. "Which" is used for things, not people.'
  },
  {
    id: 411, section: 'Reading',
    passage: 'The Magna Carta was signed in 1215 by King John of England. It established for the first time that the power of the king was not absolute and was limited by law. Many historians consider the Magna Carta to be one of the most important legal documents in history. It introduced the idea that all people — including monarchs — must obey the law.',
    q: 'According to the passage, when was the Magna Carta signed?',
    options: ['1066', '1215', '1381', '1642'],
    answer: 1,
    explanation: 'The passage states: "The Magna Carta was signed in 1215 by King John of England."'
  },
  {
    id: 412, section: 'Reading',
    passage: 'The Magna Carta was signed in 1215 by King John of England. It established for the first time that the power of the king was not absolute and was limited by law. Many historians consider the Magna Carta to be one of the most important legal documents in history. It introduced the idea that all people — including monarchs — must obey the law.',
    q: 'According to the passage, what important principle did the Magna Carta establish?',
    options: [
      'That the king should be elected by parliament',
      'That England and Scotland should be united',
      'That the king\'s power was limited by law',
      'That all citizens had the right to vote'
    ],
    answer: 2,
    explanation: 'The passage states: "It established for the first time that the power of the king was not absolute and was limited by law."'
  },
  {
    id: 413, section: 'Reading',
    passage: 'In the UK, eligible employees are entitled to up to 52 weeks of statutory maternity leave. The first 26 weeks are Ordinary Maternity Leave. The remaining 26 weeks are Additional Maternity Leave. Statutory Maternity Pay is paid for up to 39 weeks. For the first six weeks, it is paid at 90% of average weekly earnings. After that, it is paid at the standard weekly rate set by the government.',
    q: 'According to the passage, how many weeks of statutory maternity leave are available in total?',
    options: ['26 weeks', '39 weeks', '52 weeks', '104 weeks'],
    answer: 2,
    explanation: 'The passage states: "eligible employees are entitled to up to 52 weeks of statutory maternity leave" (26 weeks Ordinary + 26 weeks Additional = 52 weeks total).'
  },
  {
    id: 414, section: 'Reading',
    passage: 'In the UK, eligible employees are entitled to up to 52 weeks of statutory maternity leave. The first 26 weeks are Ordinary Maternity Leave. The remaining 26 weeks are Additional Maternity Leave. Statutory Maternity Pay is paid for up to 39 weeks. For the first six weeks, it is paid at 90% of average weekly earnings. After that, it is paid at the standard weekly rate set by the government.',
    q: 'According to the passage, for how many weeks is Statutory Maternity Pay paid?',
    options: ['26 weeks', '39 weeks', '52 weeks', '6 weeks'],
    answer: 1,
    explanation: 'The passage states: "Statutory Maternity Pay is paid for up to 39 weeks." Note that this is less than the full 52 weeks of maternity leave.'
  },
  {
    id: 415, section: 'Reading',
    passage: 'The National Health Service was established in 1948 and provides healthcare free at the point of use to all people who are ordinarily resident in the UK. The NHS is funded through taxation and National Insurance contributions. Overseas visitors without settled status may be charged for certain NHS services. Emergency treatment is always provided regardless of a person\'s immigration status.',
    q: 'According to the passage, who receives NHS healthcare free at the point of use?',
    options: [
      'Only British citizens',
      'Only people who pay National Insurance',
      'All people who are ordinarily resident in the UK',
      'All people in the UK regardless of their immigration status'
    ],
    answer: 2,
    explanation: 'The passage states the NHS "provides healthcare free at the point of use to all people who are ordinarily resident in the UK." Note: overseas visitors without settled status may be charged, and emergency treatment is separate.'
  },
]

// ─── Exports ──────────────────────────────────────────────────────────────────
export const B1_PRACTICE_TESTS = {
  1: B1_QUESTIONS,
  2: TEST_2,
  3: TEST_3,
  4: TEST_4,
}

export const B1_TEST_NUMBERS = [1, 2, 3, 4]
