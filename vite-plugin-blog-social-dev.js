/**
 * En développement, sert index.html déjà transformé par Vite avec les meta og/twitter
 * pour /ressource/blog/<slug> (crawlers et validateurs de cartes sans build).
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { getArticleSocialMeta, applyBlogMetaToHtmlTemplate } from './scripts/blog-article-meta-shared.js'

/** Déduit l’URL de base (http/https + host) depuis la requête. */
function requestBaseUrl(req, server) {
  const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString().split(',')[0].trim()
  if (!host) return 'http://localhost:5173'
  const xfProto = req.headers['x-forwarded-proto']
  const proto = xfProto
    ? String(xfProto).split(',')[0].trim()
    : server.config.server?.https
      ? 'https'
      : 'http'
  return `${proto}://${host}`.replace(/\/$/, '')
}

export function blogSocialDevPlugin() {
  return {
    name: 'blog-social-dev-html',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
          next()
          return
        }
        const rawUrl = req.originalUrl || req.url || ''
        const pathOnly = rawUrl.split('?')[0].replace(/\/$/, '') || '/'
        const m = pathOnly.match(/^\/ressource\/blog\/([^/]+)$/)
        if (!m) {
          next()
          return
        }
        const slug = m[1]
        if (slug.includes('.')) {
          next()
          return
        }

        const root = server.config.root
        const articlesDir = join(root, 'public', 'articles', 'en')
        const mdPath = join(articlesDir, `${slug}.md`)
        if (!existsSync(mdPath)) {
          next()
          return
        }

        const baseUrl = requestBaseUrl(req, server)
        const meta = getArticleSocialMeta(slug, articlesDir, baseUrl)
        if (!meta) {
          next()
          return
        }

        const indexPath = join(root, 'index.html')
        if (!existsSync(indexPath)) {
          next()
          return
        }

        const rawHtml = readFileSync(indexPath, 'utf-8')
        let html
        try {
          html = await server.transformIndexHtml(rawUrl, rawHtml)
        } catch (e) {
          console.warn('[blog-social-dev] transformIndexHtml:', e?.message || e)
          next()
          return
        }

        const finalHtml = applyBlogMetaToHtmlTemplate(html, meta)
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        if (req.method === 'HEAD') {
          res.end()
          return
        }
        res.end(finalHtml)
      })
    }
  }
}
