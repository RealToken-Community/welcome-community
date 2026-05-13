/**
 * Après `vite build`, duplique dist/index.html vers dist/ressource/blog/<slug>/index.html
 * en injectant og:* et twitter:* dans le <head> (lecteurs sociaux sans exécution JS).
 *
 * URL de base pour og:image / og:url :
 *   SITEMAP_BASE_URL  ou  VITE_SITE_URL  (défaut : https://realtoken.community)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { englishSlugs } from '../src/data/blog-slugs.js'
import { getArticleSocialMeta, applyBlogMetaToHtmlTemplate } from './blog-article-meta-shared.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const distIndex = join(distDir, 'index.html')
const articlesDir = join(rootDir, 'public', 'articles', 'en')

const baseUrl = (process.env.SITEMAP_BASE_URL || process.env.VITE_SITE_URL || 'https://realtoken.community').replace(/\/$/, '')

function main() {
  if (!existsSync(distIndex)) {
    console.error('inject-blog-social-meta: dist/index.html introuvable. Lancez vite build avant ce script.')
    process.exit(1)
  }

  const template = readFileSync(distIndex, 'utf-8')
  if (!template.includes('<head>')) {
    console.error('inject-blog-social-meta: balise <head> introuvable dans dist/index.html')
    process.exit(1)
  }

  for (const slug of englishSlugs) {
    const meta = getArticleSocialMeta(slug, articlesDir, baseUrl)
    if (!meta) {
      console.warn('inject-blog-social-meta: fichier manquant, ignoré:', join(articlesDir, `${slug}.md`))
      continue
    }
    const outHtml = applyBlogMetaToHtmlTemplate(template, meta)

    const outDir = join(distDir, 'ressource', 'blog', slug)
    mkdirSync(outDir, { recursive: true })
    const outPath = join(outDir, 'index.html')
    writeFileSync(outPath, outHtml, 'utf-8')
    console.log('inject-blog-social-meta:', outPath)
  }
}

main()
