import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

// Fonction pour parser le frontmatter manuellement
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    // Pas de frontmatter, retourner tout le contenu comme body
    return {
      data: {},
      content: content
    }
  }
  
  const frontmatter = match[1]
  const body = match[2]
  
  // Parser le YAML frontmatter basique
  const data = {}
  const lines = frontmatter.split('\n')
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()
      
      // Enlever les guillemets si présents
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Parser les tableaux
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => {
          v = v.trim()
          if ((v.startsWith('"') && v.endsWith('"')) || 
              (v.startsWith("'") && v.endsWith("'"))) {
            return v.slice(1, -1)
          }
          return v
        })
      }
      
      data[key] = value
    }
  }
  
  return {
    data,
    content: body
  }
}

// Slugs canoniques : définis dans data/blog-slugs.js (sans dépendance) pour le script sitemap
import { englishSlugs } from '../data/blog-slugs.js'
export { englishSlugs }

// Correspondance des slugs entre locales (même article, slugs différents selon la langue)
// Quand on est sur /blog/perimetre-dao-realtoken et qu'on passe en EN, on doit charger realtoken-dao-scope
const slugEquivalents = {
  'perimetre-dao-realtoken': { en: 'realtoken-dao-scope' },
  'realtoken-dao-scope': { fr: 'perimetre-dao-realtoken' },
  'naissance-dao-realtoken': { en: 'birth-of-realtoken-dao' },
  'birth-of-realtoken-dao': { fr: 'naissance-dao-realtoken' },
  'objectif-dao-realtoken': { en: 'realtoken-dao-objectives' },
  'realtoken-dao-objectives': { fr: 'objectif-dao-realtoken' },
  'lien-realt-dao-realtoken': { en: 'realtoken-dao-realt-relationship' },
  'realtoken-dao-realt-relationship': { fr: 'lien-realt-dao-realtoken' },
  'participation-gouvernance-realtoken-dao': { en: 'realtoken-dao-governance-participation' },
  'realtoken-dao-governance-participation': { fr: 'participation-gouvernance-realtoken-dao' }
}

/** Retourne le slug à utiliser pour une locale (équivalent du même article dans l'autre langue si besoin) */
export function getSlugForLocale(slug, locale) {
  return slugEquivalents[slug]?.[locale] ?? slug
}

/** Retourne le slug canonique anglais (pour les URL). Si le slug est déjà en anglais, le retourne ; sinon retourne l’équivalent EN. */
export function getEnglishSlug(slug) {
  const en = slugEquivalents[slug]?.en
  return en ?? slug
}

// Note: Les slugs correspondent aux noms de fichiers sans l'extension .md

// Fonction pour charger le contenu d'un article
async function loadArticleContent(slug, locale) {
  try {
    const response = await fetch(`/articles/${locale}/${slug}.md`)
    if (!response.ok) return null
    const text = await response.text()
    return text
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error)
    return null
  }
}

// Charge tous les articles ; les URL restent en anglais (slug = englishSlug)
export async function loadArticles(locale = 'fr') {
  const articles = []
  for (const englishSlug of englishSlugs) {
    const contentSlug = getSlugForLocale(englishSlug, locale)
    const content = await loadArticleContent(contentSlug, locale)
    if (content) {
      const parsed = parseFrontmatter(content)
      articles.push({
        ...parsed.data,
        slug: englishSlug,
        content: md.render(parsed.content),
        rawContent: parsed.content
      })
    }
  }
  articles.sort((a, b) => new Date(b.date) - new Date(a.date))
  return articles
}

// Charge un article ; slug dans l'URL est toujours en anglais, contenu selon locale
export async function loadArticle(slug, locale = 'fr') {
  const contentSlug = getSlugForLocale(slug, locale)
  const content = await loadArticleContent(contentSlug, locale)
  if (!content) return null
  const parsed = parseFrontmatter(content)
  return {
    ...parsed.data,
    slug,
    content: md.render(parsed.content),
    rawContent: parsed.content
  }
}

// Fonction pour obtenir les derniers articles
export async function getLatestArticles(count = 3, locale = 'fr') {
  const articles = await loadArticles(locale)
  return articles.slice(0, count)
}

