/**
 * Métadonnées Open Graph / Twitter pour les billets (partagé build + plugin Vite dev).
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export const DEFAULT_BLOG_ARTICLE_DESC =
  'Explore all our articles on real estate tokenization, decentralized governance and the RealToken ecosystem.'

/** Échappe le contenu des attributs HTML double-quotés. */
export function escapeHtmlAttr(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r?\n/g, ' ')
}

/** Échappe le texte dans <title>. */
export function escapeHtmlText(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\r?\n/g, ' ')
}

/** Parse un frontmatter YAML minimal depuis un fichier .md. */
export function parseFrontmatterFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  if (!match) return {}
  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx <= 0) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return data
}

/** Construit le bloc de meta Open Graph + Twitter Card pour un article. */
export function buildSocialMetaBlock({ title, description, pageUrl, imageUrl }) {
  const t = escapeHtmlAttr(title)
  const d = escapeHtmlAttr(description)
  const lines = [
    `<meta name="description" content="${d}">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:url" content="${escapeHtmlAttr(pageUrl)}">`,
    `<meta property="og:site_name" content="RealToken DAO">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`
  ]
  if (imageUrl) {
    const iu = escapeHtmlAttr(imageUrl)
    lines.push(`<meta property="og:image" content="${iu}">`)
    lines.push(`<meta name="twitter:card" content="summary_large_image">`)
    lines.push(`<meta name="twitter:image" content="${iu}">`)
  } else {
    lines.push(`<meta name="twitter:card" content="summary">`)
  }
  return lines.join('\n    ')
}

/**
 * Lit le frontmatter EN pour un slug et retourne title / description / URLs pour les cartes sociales.
 * @returns {null | { title: string, description: string, pageUrl: string, imageUrl: string }}
 */
export function getArticleSocialMeta(slug, articlesDir, baseUrl) {
  const mdPath = join(articlesDir, `${slug}.md`)
  if (!existsSync(mdPath)) return null
  const fm = parseFrontmatterFile(mdPath)
  const rawTitle = (fm.title || slug).trim()
  const title = rawTitle ? `${rawTitle} | RealToken DAO` : 'RealToken Blog | RealToken DAO'
  const description = (fm.description || DEFAULT_BLOG_ARTICLE_DESC).trim()
  const pageUrl = `${baseUrl.replace(/\/$/, '')}/ressource/blog/${slug}`
  const imageHeader = (fm.imageHeader || '').trim()
  const imageUrl = imageHeader
    ? `${baseUrl.replace(/\/$/, '')}/ArticleImg/${encodeURIComponent(imageHeader)}`
    : ''
  return { title, description, pageUrl, imageUrl }
}

/** Injecte title + meta dans une page HTML (index Vite ou dist). */
export function applyBlogMetaToHtmlTemplate(template, { title, description, pageUrl, imageUrl }) {
  const metaBlock = buildSocialMetaBlock({ title, description, pageUrl, imageUrl })
  let outHtml = template
    .replace(/<meta\s+name="description"[^>]*>/i, '')
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtmlText(title)}</title>`)
  outHtml = outHtml.replace('<head>', `<head>\n    ${metaBlock}\n    `)
  return outHtml
}
