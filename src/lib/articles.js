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
