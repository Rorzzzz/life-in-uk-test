// Pass the UK Test — Question Bank Extension: Batch 4
// IDs 571+ — adding to src/data/questions.js
// Source: Life in the United Kingdom: A Guide for New Residents, 3rd Edition
// Open Government Licence v3.0 — Crown copyright
//
// Generation rules (locked):
//  - Correct answer spread evenly across A/B/C/D (~25% each)
//  - Correct answer is NOT systematically the longest option
//  - Facts verified against the official handbook; no duplicates of existing IDs
//  - Exactly 4 plausible, same-category options + a friendly explanation

export const QUESTIONS_BATCH4 = [

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAPTER 2 — WHAT IS THE UK? (additional geography, symbols, currency)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 571, chapter: 2,
    q: 'What is the currency of the United Kingdom?',
    options: ['The euro (€)', 'The US dollar ($)', 'The Irish punt', 'The pound sterling (£)'],
    answer: 3,
    explanation: 'The UK\'s currency is the pound sterling (£). One pound is made up of 100 pence.',
    difficulty: 'easy',
    tags: ['currency', 'geography'],
  },
  {
    id: 572, chapter: 2,
    q: 'As well as the Bank of England, which parts of the UK can issue their own banknotes?',
    options: ['England and Scotland', 'Wales and Scotland', 'Scotland and Northern Ireland', 'England and Wales'],
    answer: 2,
    explanation: 'Banks in Scotland and Northern Ireland are allowed to issue their own banknotes, as well as the Bank of England.',
    difficulty: 'medium',
    tags: ['currency', 'geography'],
  },
  {
    id: 573, chapter: 2,
    q: 'What is the highest mountain in the United Kingdom?',
    options: ['Snowdon (Yr Wyddfa)', 'Scafell Pike', 'Slieve Donard', 'Ben Nevis'],
    answer: 3,
    explanation: 'Ben Nevis, in the Scottish Highlands, is the highest mountain in the UK.',
    difficulty: 'medium',
    tags: ['geography', 'mountains'],
  },
  {
    id: 574, chapter: 2,
    q: 'The Union Flag is made up of the crosses of which three patron saints?',
    options: ['St George, St Andrew and St Patrick', 'St George, St David and St Andrew', 'St Andrew, St Patrick and St David', 'St George, St Patrick and St David'],
    answer: 0,
    explanation: 'The Union Flag combines the crosses of St George (England), St Andrew (Scotland) and St Patrick (Ireland). Wales is not represented as it was already united with England.',
    difficulty: 'medium',
    tags: ['union-flag', 'symbols'],
  },
  {
    id: 575, chapter: 2,
    q: 'Which vegetable is a traditional national emblem of Wales, alongside the daffodil?',
    options: ['The thistle', 'The shamrock', 'The rose', 'The leek'],
    answer: 3,
    explanation: 'The leek is a national emblem of Wales, along with the daffodil.',
    difficulty: 'easy',
    tags: ['symbols', 'wales'],
  },
  {
    id: 576, chapter: 2,
    q: 'In which country of the UK is the Giant\'s Causeway?',
    options: ['Northern Ireland', 'Scotland', 'Wales', 'South-west England'],
    answer: 0,
    explanation: 'The Giant\'s Causeway is a famous natural rock formation on the north-east coast of Northern Ireland.',
    difficulty: 'medium',
    tags: ['geography', 'landmarks', 'northern-ireland'],
  },
  {
    id: 577, chapter: 2,
    q: 'What is the largest island in the British Isles?',
    options: ['Ireland', 'The Isle of Man', 'The Isle of Wight', 'Great Britain'],
    answer: 3,
    explanation: 'Great Britain — made up of England, Scotland and Wales — is the largest island in the British Isles.',
    difficulty: 'medium',
    tags: ['geography'],
  },
  {
    id: 578, chapter: 2,
    q: 'Which country of the UK has the largest population?',
    options: ['England', 'Scotland', 'Northern Ireland', 'Wales'],
    answer: 0,
    explanation: 'England has by far the largest population of the four countries that make up the UK.',
    difficulty: 'easy',
    tags: ['geography', 'population'],
  },
  {
    id: 579, chapter: 2,
    q: 'The English Channel separates southern England from which country?',
    options: ['Ireland', 'France', 'The Netherlands', 'Belgium'],
    answer: 1,
    explanation: 'The English Channel separates southern England from France; the Channel Tunnel links the two countries.',
    difficulty: 'easy',
    tags: ['geography'],
  },
  {
    id: 580, chapter: 2,
    q: 'Which red creature appears on the national flag of Wales?',
    options: ['A red horse', 'A red eagle', 'A red dragon', 'A red lion'],
    answer: 2,
    explanation: 'The flag of Wales (Y Ddraig Goch) features a red dragon on a green and white background.',
    difficulty: 'easy',
    tags: ['symbols', 'wales', 'flags'],
  },
  {
    id: 581, chapter: 2,
    q: 'How many countries make up the United Kingdom?',
    options: ['Two', 'Four', 'Three', 'Five'],
    answer: 1,
    explanation: 'The UK is made up of four countries: England, Scotland, Wales and Northern Ireland.',
    difficulty: 'easy',
    tags: ['geography', 'countries'],
  },
  {
    id: 582, chapter: 2,
    q: 'Which sea lies to the east of Great Britain and is a major source of oil and gas?',
    options: ['The Irish Sea', 'The North Sea', 'The Celtic Sea', 'The English Channel'],
    answer: 1,
    explanation: 'The North Sea lies to the east of Great Britain and has been an important source of oil and gas.',
    difficulty: 'medium',
    tags: ['geography', 'economy'],
  },

]
