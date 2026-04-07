// Pass the UK Test — XP Level Thresholds
// 20 levels with titles themed around the Life in the UK journey

export const LEVELS = [
  { level: 1,  title: 'Newcomer',        xpRequired: 0     },
  { level: 2,  title: 'Curious Learner', xpRequired: 100   },
  { level: 3,  title: 'Apprentice',      xpRequired: 250   },
  { level: 4,  title: 'Keen Student',    xpRequired: 500   },
  { level: 5,  title: 'Historian',       xpRequired: 800   },
  { level: 6,  title: 'Civic Aware',     xpRequired: 1200  },
  { level: 7,  title: 'Debater',         xpRequired: 1700  },
  { level: 8,  title: 'Resident Scholar',xpRequired: 2300  },
  { level: 9,  title: 'Law Abider',      xpRequired: 3000  },
  { level: 10, title: 'Patriot',         xpRequired: 4000  },
  { level: 11, title: 'Heritage Keeper', xpRequired: 5200  },
  { level: 12, title: 'Cultural Expert', xpRequired: 6500  },
  { level: 13, title: 'Institution Know-It-All', xpRequired: 8000 },
  { level: 14, title: 'Parliamentary Sage', xpRequired: 9700 },
  { level: 15, title: 'History Buff',    xpRequired: 11500 },
  { level: 16, title: 'Commonwealth Scholar', xpRequired: 13500 },
  { level: 17, title: 'Royal Advisor',   xpRequired: 16000 },
  { level: 18, title: 'Brexit Survivor', xpRequired: 19000 },
  { level: 19, title: 'True Brit',       xpRequired: 22500 },
  { level: 20, title: 'Citizenship Champion', xpRequired: 27000 },
]

// Returns current level object for a given XP total
export function getLevelForXP(xp) {
  let current = LEVELS[0]
  for (const lvl of LEVELS) {
    if (xp >= lvl.xpRequired) current = lvl
    else break
  }
  return current
}

// Returns XP needed to reach the next level (null if max level)
export function getXPToNextLevel(xp) {
  const current = getLevelForXP(xp)
  const nextLevel = LEVELS.find(l => l.level === current.level + 1)
  if (!nextLevel) return null
  return nextLevel.xpRequired - xp
}

// Returns progress percentage toward next level (0-100)
export function getLevelProgress(xp) {
  const current = getLevelForXP(xp)
  const nextLevel = LEVELS.find(l => l.level === current.level + 1)
  if (!nextLevel) return 100
  const range = nextLevel.xpRequired - current.xpRequired
  const earned = xp - current.xpRequired
  return Math.round((earned / range) * 100)
}
