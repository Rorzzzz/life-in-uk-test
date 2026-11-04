import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles')

function stripToPlainText(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---/, '')       // remove frontmatter
    .replace(/{\/\*[\s\S]*?\*\/}/g, '')   // remove MDX comments
    .replace(/!\[.*?\]\(.*?\)/g, '')      // remove images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → label only
    .replace(/#{1,6}\s+/g, '')            // headings
    .replace(/\*\*(.+?)\*\*/g, '$1')      // bold
    .replace(/\*(.+?)\*/g, '$1')          // italic
    .replace(/`{1,3}[^`]*`{1,3}/g, '')   // code
    .replace(/\|[^\n]+\|/g, ' ')          // table rows
    .replace(/[-*+]\s/g, ' ')             // list bullets
    .replace(/\d+\.\s/g, ' ')             // numbered lists
    .replace(/>\s.+/g, '')                // blockquotes
    .replace(/\s{2,}/g, ' ')              // collapse whitespace
    .trim()
    .toLowerCase()
}

export function getAllArticles() {
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'))

  const articles = files.map(filename => {
    const slug = filename.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf8')
    const { data, content } = matter(raw)
    return { slug, ...data, plainText: stripToPlainText(content) }
  })

  // Only return published articles, sorted newest first
  return articles
    .filter(a => a.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getArticleBySlug(slug) {
  const filepath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  if (!data.published) return null
  return { slug, ...data, content }
}

export function getAllPublishedSlugs() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export function extractFAQs(content) {
  const normalised = content.replace(/\r\n/g, '\n')
  const section = normalised.match(/## Frequently Asked Questions\n([\s\S]*?)(?=\n## |$)/)
  if (!section) return []

  return section[1]
    .split(/^### /m)
    .slice(1)
    .map(block => {
      const [question, ...rest] = block.split('\n')
      const answer = rest
        .join('\n')
        .replace(/^---\s*$/gm, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/\n{2,}/g, ' ')
        .replace(/\n/g, ' ')
        .trim()
      return { question: question.trim(), answer }
    })
    .filter(f => f.question && f.answer)
}

// Up to `limit` related articles: shared keyword words (stopwords removed)
// plus a bonus for the same category. Deterministic, so it works with SSG.
const STOP = new Set(['the','a','an','to','of','in','for','and','or','uk','is','do','i','you','how','what','test','life','2026','2027','your','my','can','does','with','after','be','it','on','are'])
function words(a) {
  const text = [a.title, ...(Array.isArray(a.keywords) ? a.keywords : [])].join(' ').toLowerCase()
  return new Set(text.split(/[^a-z0-9]+/).filter(w => w && !STOP.has(w)))
}
export function getRelatedArticles(slug, limit = 3) {
  const all = getAllArticles()
  const current = all.find(a => a.slug === slug)
  if (!current) return []
  const cw = words(current)
  return all
    .filter(a => a.slug !== slug)
    .map(a => {
      let score = a.category && a.category === current.category ? 2 : 0
      for (const w of words(a)) if (cw.has(w)) score += 1
      return { a, score }
    })
    .filter(x => x.score > 2)
    .sort((x, y) => y.score - x.score || new Date(y.a.date) - new Date(x.a.date))
    .slice(0, limit)
    .map(({ a }) => ({ slug: a.slug, title: a.title, description: a.description }))
}
