/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://passtheuktest.co.uk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/exam', '/progress', '/weak-spots', '/flashcards'] },
    ],
  },
  exclude: ['/exam', '/progress', '/weak-spots', '/flashcards'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    const priorities = {
      '/':          { priority: 1.0, changefreq: 'weekly' },
      '/practice':  { priority: 0.9, changefreq: 'weekly' },
      '/study':     { priority: 0.8, changefreq: 'monthly' },
      '/exam/info': { priority: 0.7, changefreq: 'monthly' },
    }
    const isQuestion = path.startsWith('/questions/')
    const isChapter  = path.startsWith('/practice/') || path.startsWith('/study/')
    return {
      loc: path,
      changefreq: isQuestion ? 'monthly' : isChapter ? 'weekly' : 'weekly',
      priority: priorities[path]?.priority ?? (isQuestion ? 0.8 : isChapter ? 0.9 : 0.7),
      lastmod: new Date().toISOString(),
    }
  },
}
