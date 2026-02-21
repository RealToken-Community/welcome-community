import { createRouter, createWebHistory } from 'vue-router'
import { getEnglishSlug } from './utils/blog.js'
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

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPost,
    beforeEnter(to, _from, next) {
      const englishSlug = getEnglishSlug(to.params.slug)
      if (englishSlug !== to.params.slug) {
        next({ path: `/blog/${englishSlug}`, replace: true })
      } else {
        next()
      }
    }
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq
  },
  {
    path: '/committee',
    name: 'Comite',
    component: Comite
  },
  {
    path: '/application-hub',
    name: 'LiensUtiles',
    component: LiensUtiles
  },
  {
    path: '/reg',
    name: 'Reg',
    component: Reg
  },
  {
    path: '/partners',
    name: 'Partenaires',
    component: Partenaires
  },
  {
    path: '/privacy',
    name: 'Confidentialite',
    component: Confidentialite
  },
  {
    path: '/legal-notice',
    name: 'MentionsLegales',
    component: MentionsLegales
  },
  // Redirects: anciennes URLs FR → URLs anglaises (SEO, bookmarks)
  { path: '/comite', redirect: '/committee' },
  { path: '/liens-utiles', redirect: '/application-hub' },
  { path: '/devenir-partenaire', redirect: '/partners' },
  { path: '/confidentialite', redirect: '/privacy' },
  { path: '/mentions-legales', redirect: '/legal-notice' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Sur /faq, les ancres sont gérées par le composant Faq (openFromHash) après montage
    if (to.hash && to.path === '/faq') {
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

export default router

