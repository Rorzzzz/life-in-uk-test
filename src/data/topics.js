// Pass the UK Test — Topic Pages
// 12 topic hubs — each aggregates questions by tag for SEO landing pages

import { QUESTIONS } from './questions'

export const TOPICS = [
  {
    slug: 'british-history',
    title: 'British History',
    description: 'Questions covering key dates, events and people in British history from the Romans to devolution.',
    tags: ['history', 'romans', 'magna carta', 'civil war', 'ww1', 'ww2', 'empire', 'tudor', 'victorian', 'normans', 'vikings', 'saxons', 'industrial revolution', 'black death', 'suffragettes', '1066', '1215', '1348', '1603', '1707', 'devolution'],
    icon: 'Sword',
    colour: '#a855f7',
  },
  {
    slug: 'uk-government',
    title: 'UK Government',
    description: 'Questions about Parliament, the Prime Minister, elections, devolution and how Britain is governed.',
    tags: ['parliament', 'government', 'prime minister', 'cabinet', 'elections', 'democracy', 'devolution', 'house of commons', 'house of lords', 'westminster', 'monarchy'],
    icon: 'Building2',
    colour: '#3381ff',
  },
  {
    slug: 'british-values',
    title: 'British Values',
    description: 'Questions on the fundamental values and principles of British life, democracy and individual liberty.',
    tags: ['values', 'principles', 'democracy', 'rule of law', 'liberty', 'tolerance', 'fundamentals'],
    icon: 'Shield',
    colour: '#ff4d6d',
  },
  {
    slug: 'uk-law',
    title: 'UK Law & Rights',
    description: 'Questions covering criminal and civil law, the courts, police, human rights and citizens\' responsibilities.',
    tags: ['law', 'courts', 'police', 'crime', 'rights', 'human rights', 'magna carta', 'bill of rights', 'jury', 'magistrates', 'crown court', 'civil law'],
    icon: 'Scale',
    colour: '#f59e0b',
  },
  {
    slug: 'nhs-welfare',
    title: 'NHS & Welfare State',
    description: 'Questions on the National Health Service, welfare state, social security and healthcare in the UK.',
    tags: ['nhs', 'healthcare', 'welfare state', 'benefits', 'social security', 'education'],
    icon: 'Heart',
    colour: '#22d07a',
  },
  {
    slug: 'religion-culture',
    title: 'Religion & Culture',
    description: 'Questions about religions in the UK, public holidays, customs, traditions and cultural life.',
    tags: ['religion', 'christianity', 'islam', 'church of england', 'public holidays', 'christmas', 'bonfire night', 'customs', 'traditions', 'patron saints'],
    icon: 'Globe',
    colour: '#f59e0b',
  },
  {
    slug: 'arts-literature',
    title: 'Arts & Literature',
    description: 'Questions about British literature, music, film, art and famous cultural figures.',
    tags: ['literature', 'shakespeare', 'dickens', 'austen', 'arts', 'music', 'beatles', 'film', 'bafta', 'turner prize', 'booker prize', 'rowling'],
    icon: 'BookOpen',
    colour: '#a855f7',
  },
  {
    slug: 'sport',
    title: 'Sport',
    description: 'Questions about sport in the UK, major sporting events, famous athletes and the history of British sport.',
    tags: ['sport', 'football', 'cricket', 'rugby', 'tennis', 'golf', 'olympics', 'wimbledon'],
    icon: 'Trophy',
    colour: '#22d07a',
  },
  {
    slug: 'inventions-science',
    title: 'Inventions & Science',
    description: 'Questions about British inventions, scientists and technological achievements.',
    tags: ['inventions', 'science', 'technology', 'berners-lee', 'www', 'fleming', 'penicillin', 'watt', 'steam engine', 'baird', 'television', 'newton', 'darwin'],
    icon: 'Lightbulb',
    colour: '#3381ff',
  },
  {
    slug: 'immigration-citizenship',
    title: 'Immigration & Citizenship',
    description: 'Questions about how to become a British citizen, settlement, indefinite leave to remain and the Life in the UK test.',
    tags: ['citizenship', 'immigration', 'settlement', 'ilr', 'naturalisation', 'passport', 'commonwealth', 'windrush'],
    icon: 'Passport',
    colour: '#ff4d6d',
  },
  {
    slug: 'famous-people',
    title: 'Famous British People',
    description: 'Questions about notable British figures — scientists, writers, politicians, artists and sporting legends.',
    tags: ['famous people', 'shakespeare', 'churchill', 'newton', 'darwin', 'fleming', 'austen', 'dickens', 'beatles', 'rowling', 'baird', 'berners-lee', 'watt', 'brunel'],
    icon: 'User',
    colour: '#a855f7',
  },
  {
    slug: 'geography',
    title: 'UK Geography',
    description: 'Questions about the geography of the UK, its nations, capitals, landscapes and landmarks.',
    tags: ['geography', 'capitals', 'england', 'scotland', 'wales', 'northern ireland', 'uk', 'great britain', 'crown dependencies', 'ben nevis', 'thames', 'landmarks'],
    icon: 'Map',
    colour: '#3381ff',
  },
]

// Returns all questions that match any of a topic's tags
export function getTopicQuestions(slug) {
  const topic = TOPICS.find(t => t.slug === slug)
  if (!topic) return []
  return QUESTIONS.filter(q =>
    q.tags.some(tag => topic.tags.includes(tag))
  )
}

export function getTopicBySlug(slug) {
  return TOPICS.find(t => t.slug === slug)
}
