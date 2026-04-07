// Pass the UK Test — Badge Definitions
// 13 badges covering milestones, streaks, chapter mastery, exam performance, accuracy

export const BADGES = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Answer your very first question',
    icon: '👣',
    colour: '#3381ff',
    category: 'milestone',
    unlockCondition: (state) => state.totalAnswered >= 1,
  },
  {
    id: 'half_century',
    name: 'Half Century',
    description: 'Answer 50 questions',
    icon: '🏅',
    colour: '#a855f7',
    category: 'milestone',
    unlockCondition: (state) => state.totalAnswered >= 50,
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Attempt all 570 questions at least once',
    icon: '💯',
    colour: '#f59e0b',
    category: 'milestone',
    unlockCondition: (state) =>
      Object.values(state.progress ?? {}).filter(p => (p.totalAnswered ?? 0) >= 1).length >= 570,
  },
  {
    id: 'hat_trick',
    name: 'Hat Trick',
    description: '3-day practice streak',
    icon: '🎩',
    colour: '#22d07a',
    category: 'streak',
    unlockCondition: (state) => state.streak >= 3,
  },
  {
    id: 'on_fire',
    name: 'On Fire',
    description: '7-day practice streak',
    icon: '🔥',
    colour: '#ff4d6d',
    category: 'streak',
    unlockCondition: (state) => state.streak >= 7,
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: '30-day practice streak',
    icon: '💪',
    colour: '#f59e0b',
    category: 'streak',
    unlockCondition: (state) => state.streak >= 30,
  },
  {
    id: 'historian',
    name: 'Historian',
    description: 'Score 80%+ on the History chapter',
    icon: '⚔️',
    colour: '#a855f7',
    category: 'chapter',
    unlockCondition: (state) => (state.chapterScores?.[3] ?? 0) >= 80,
  },
  {
    id: 'lawmaker',
    name: 'Lawmaker',
    description: 'Score 80%+ on the Government & Law chapter',
    icon: '⚖️',
    colour: '#f59e0b',
    category: 'chapter',
    unlockCondition: (state) => (state.chapterScores?.[5] ?? 0) >= 80,
  },
  {
    id: 'master',
    name: 'Master',
    description: 'Score 80%+ on all 5 chapters',
    icon: '🏆',
    colour: '#f59e0b',
    category: 'chapter',
    unlockCondition: (state) =>
      state.chapterScores &&
      [1, 2, 3, 4, 5].every(ch => (state.chapterScores[ch] ?? 0) >= 80),
  },
  {
    id: 'mock_master',
    name: 'Mock Master',
    description: 'Pass your first mock exam (18/24 or higher)',
    icon: '🎓',
    colour: '#22d07a',
    category: 'exam',
    unlockCondition: (state) => state.examsPassed >= 1,
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Score 24/24 on a mock exam',
    icon: '⭐',
    colour: '#f59e0b',
    category: 'exam',
    unlockCondition: (state) => state.perfectExams >= 1,
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Pass a mock exam with 20+ minutes remaining',
    icon: '⚡',
    colour: '#3381ff',
    category: 'exam',
    unlockCondition: (state) => state.speedExams >= 1,
  },
  {
    id: 'sharp_mind',
    name: 'Sharp Mind',
    description: 'Maintain 90%+ accuracy over 20+ questions',
    icon: '🧠',
    colour: '#a855f7',
    category: 'accuracy',
    unlockCondition: (state) =>
      state.totalAnswered >= 20 &&
      state.totalCorrect / state.totalAnswered >= 0.9,
  },
]

export const getBadgeById = (id) => BADGES.find(b => b.id === id)
