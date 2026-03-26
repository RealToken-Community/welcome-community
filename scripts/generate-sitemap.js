/**
 * Génère sitemap.xml à partir des routes du site et des articles de blog.
 * Exécuté automatiquement avant chaque build (npm run build).
 * Pour régénérer à la main : node scripts/generate-sitemap.js
 *
 * Variables d'environnement optionnelles :
 *   SITEMAP_BASE_URL  ou  VITE_SITE_URL  → URL de base du site (ex. https://realtoken.community)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { englishSlugs } from '../src/data/blog-slugs.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const publicDir = join(rootDir, 'public')
const articlesDir = join(publicDir, 'articles', 'en')

const baseUrl = (process.env.SITEMAP_BASE_URL || process.env.VITE_SITE_URL || 'https://realtoken.community').replace(/\/$/, '')

// Routes statiques (URLs en anglais)
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'blog', priority: '0.9', changefreq: 'weekly' },
  { path: 'faq', priority: '0.8', changefreq: 'monthly' },
  { path: 'committee', priority: '0.8', changefreq: 'monthly' },
  { path: 'application-hub', priority: '0.8', changefreq: 'monthly' },
  { path: 'reg', priority: '0.8', changefreq: 'monthly' },
  { path: 'partners', priority: '0.7', changefreq: 'monthly' },
  { path: 'privacy', priority: '0.5', changefreq: 'yearly' },
  { path: 'legal-notice', priority: '0.5', changefreq: 'yearly' }
]

function extractDateFromFrontmatter(filePath) {
  if (!existsSync(filePath)) return null
  try {
    const content = readFileSync(filePath, 'utf-8')
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
    if (!match) return null
    const dateLine = match[1].split('\n').find((l) => l.startsWith('date:'))
    if (!dateLine) return null
    const value = dateLine.replace(/^date:\s*/, '').trim().replace(/^["']|["']$/g, '')
    const d = new Date(value)
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10)
  } catch {
    return null
  }
}

function urlNode(path, lastmod = null, priority = '0.8', changefreq = 'monthly') {
  const loc = path ? `${baseUrl}/${path}` : baseUrl + '/'
  const lastmodLine = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''
  return `  <url>\n    <loc>${loc}</loc>\n${lastmodLine}    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>\n  </url>\n`
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

for (const r of staticRoutes) {
  xml += urlNode(r.path, null, r.priority, r.changefreq)
}

for (const slug of englishSlugs) {
  const mdPath = join(articlesDir, `${slug}.md`)
  const lastmod = extractDateFromFrontmatter(mdPath)
  xml += urlNode(`blog/${slug}`, lastmod, '0.7', 'monthly')
}

xml += '</urlset>\n'

const outPath = join(publicDir, 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log('sitemap.xml generated at', outPath)
