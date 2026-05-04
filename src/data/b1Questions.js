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
