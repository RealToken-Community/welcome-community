import { createRouter, createWebHistory } from 'vue-router'
import { getEnglishSlug } from './utils/blog.js'
import i18n from './i18n'
import Home from './views/Home.vue'
import Blog from './views/Blog.vue'
import BlogPost from './views/BlogPost.vue'
import Faq from './views/Faq.vue'
import Comite from './views/Comite.vue'
import LiensUtiles from './views/LiensUtiles.vue'
import Reg from './views/Reg.vue'
import Partenaires from './views/Partenaires.vue'
import Confidentialite from './views/Confidentialite.vue'
import MentionsLegales from './views/MentionsLegales.vue'
import NotFound from './views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'RealToken DAO',
      description: 'Decentralized ecosystem for tokenized real-world assets.'
    }
  },
  {
    path: '/ressource/blog',
    name: 'Blog',
    component: Blog,
    meta: { titleKey: 'blog.pageTitle', descriptionKey: 'blog.pageDescription' }
  },
  {
    path: '/ressource/blog/:slug',
    name: 'BlogPost',
    component: BlogPost,
    meta: { titleKey: 'blog.pageTitle', descriptionKey: 'blog.pageDescription' },
    beforeEnter(to, _from, next) {
      const englishSlug = getEnglishSlug(to.params.slug)
      if (englishSlug !== to.params.slug) {
        next({ path: `/ressource/blog/${englishSlug}`, replace: true })
      } else {
        next()
      }
    }
  },
  {
    path: '/ressource/faq',
    name: 'Faq',
    component: Faq,
    meta: { titleKey: 'faq.pageTitle', descriptionKey: 'faq.pageDescription' }
  },
  {
    path: '/governance/committee',
    name: 'Comite',
    component: Comite,
    meta: { titleKey: 'comite.pageTitle', descriptionKey: 'comite.pageDescription' }
  },
  {
    path: '/applications/application-hub',
    name: 'LiensUtiles',
    component: LiensUtiles,
    meta: { titleKey: 'liensUtiles.pageTitle', descriptionKey: 'liensUtiles.pageDescription' }
  },
  {
    path: '/governance/reg',
    name: 'Reg',
    component: Reg,
    meta: { titleKey: 'reg.pageTitle', descriptionKey: 'reg.pageDescription' }
  },
  {
    path: '/partners',
    name: 'Partenaires',
    component: Partenaires,
    meta: { titleKey: 'partenaires.pageTitle', descriptionKey: 'partenaires.pageDescription' }
  },
  {
    path: '/privacy',
    name: 'Confidentialite',
    component: Confidentialite,
    meta: { titleKey: 'confidentialite.pageTitle', descriptionKey: 'confidentialite.pageDescription' }
  },
  {
    path: '/legal-notice',
    name: 'MentionsLegales',
    component: MentionsLegales,
    meta: { titleKey: 'mentions.pageTitle', descriptionKey: 'mentions.pageDescription' }
  },
  // Redirects: anciennes URLs FR → URLs anglaises (SEO, bookmarks)
  { path: '/comite', redirect: '/governance/committee' },
  { path: '/committee', redirect: '/governance/committee' },
  { path: '/liens-utiles', redirect: '/applications/application-hub' },
  { path: '/application-hub', redirect: '/applications/application-hub' },
  { path: '/reg', redirect: '/governance/reg' },
  { path: '/blog', redirect: '/ressource/blog' },
  { path: '/blog/:slug', redirect: (to) => `/ressource/blog/${to.params.slug}` },
  { path: '/faq', redirect: '/ressource/faq' },
  { path: '/devenir-partenaire', redirect: '/partners' },
  { path: '/confidentialite', redirect: '/privacy' },
  { path: '/mentions-legales', redirect: '/legal-notice' },
  {
    path: '/not-found',
    name: 'NotFoundPage',
    component: NotFound,
    meta: { titleKey: 'notFound.pageTitle', descriptionKey: 'notFound.pageDescription' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { titleKey: 'notFound.pageTitle', descriptionKey: 'notFound.pageDescription' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Sur /ressource/faq, les ancres sont gérées par le composant Faq (openFromHash) après montage
    if (to.hash && to.path === '/ressource/faq') {
      return { top: 0 }
    }
    // Ancre explicite dans l’URL (ex: /page#section) → on scroll vers l’élément
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Retour arrière : restaurer la position sauvegardée par le navigateur
    if (savedPosition) {
      return savedPosition
    }
    // Par défaut : toujours en haut de la page
    return { top: 0 }
  }
})

const DEFAULT_TITLE = 'RealToken DAO'
const DEFAULT_DESCRIPTION = 'Decentralized ecosystem for tokenized real-world assets.'

function resolveMetaValue(to, key, defaultValue) {
  const routeWithMeta = [...to.matched].reverse().find((r) => r.meta && (r.meta[key] || r.meta[`${key}Key`]))
  if (!routeWithMeta) return defaultValue

  const rawValue = routeWithMeta.meta[key]
  if (typeof rawValue === 'string' && rawValue.trim()) return rawValue

  const i18nKey = routeWithMeta.meta[`${key}Key`]
  if (typeof i18nKey === 'string' && i18nKey.trim()) {
    const translated = i18n.global.t(i18nKey)
    return translated && translated !== i18nKey ? translated : defaultValue
  }

  return defaultValue
}

function upsertMetaDescription(content) {
  let descriptionTag = document.querySelector('meta[name="description"]')
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }
  descriptionTag.setAttribute('content', content)
}

router.afterEach((to) => {
  const pageTitle = resolveMetaValue(to, 'title', DEFAULT_TITLE)
  const pageDescription = resolveMetaValue(to, 'description', DEFAULT_DESCRIPTION)
  document.title = pageTitle === DEFAULT_TITLE ? DEFAULT_TITLE : `${pageTitle} | ${DEFAULT_TITLE}`
  upsertMetaDescription(pageDescription)
})

export default router

