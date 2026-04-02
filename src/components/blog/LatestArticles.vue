<template>
  <section id="blog" class="section section-light blog-preview">
    <div class="section-inner">
      <div class="section-heading compact">
        <p class="tag">{{ $t('blog.tag') }}</p>
        <h2>{{ $t('blog.title') }}</h2>
        <p>{{ $t('blog.description') }}</p>
      </div>
      <div class="articles-grid" v-if="articles.length">
        <ArticleCard 
          v-for="article in articles" 
          :key="article.slug" 
          :article="article" 
        />
      </div>
      <div class="blog-cta" v-if="articles.length">
        <router-link to="/ressource/blog" class="primary outline">
          {{ $t('blog.viewAll') }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getLatestArticles } from '../../utils/blog.js'
import ArticleCard from './ArticleCard.vue'

const { locale } = useI18n()
const articles = ref([])

onMounted(async () => {
  articles.value = await getLatestArticles(3, locale.value)
})
</script>

<style scoped>
/* Section blog home : fond neutre + bandeau discret navy pour rester dans l’esprit marque. */
.blog-preview {
  width: 100%;
  max-width: none;
  padding: 88px min(8vw, 120px) 104px;
  margin: 0;
  box-sizing: border-box;
  background: linear-gradient(180deg, #ebeff5 0%, #f2f4f8 48%, #eef1f6 100%);
  border-bottom: 1px solid rgba(10, 31, 68, 0.06);
  position: relative;
}

.blog-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-navy), rgba(10, 31, 68, 0.4));
  opacity: 0.9;
}

.blog-preview .section-inner {
  max-width: 1120px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.blog-preview :deep(.section-heading) {
  text-align: center;
  max-width: 560px;
  margin: 0 auto 48px;
}

.blog-preview :deep(.tag) {
  justify-content: center;
}

.blog-preview :deep(.tag::before) {
  display: none;
}

.blog-preview :deep(.section-heading h2) {
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 600;
  margin: 12px 0 16px;
  letter-spacing: -0.02em;
  color: #242424;
}

.blog-preview :deep(.section-heading p) {
  color: #5c5c5c;
  font-size: 1rem;
  line-height: 1.65;
}

/* Vignettes = ratio 1376×768 comme sur /blog (ArticleCard) — renforcé ici pour la home fond clair. */
.blog-preview :deep(.article-image) {
  width: 100%;
  aspect-ratio: 1376 / 768;
  height: auto;
  overflow: hidden;
  position: relative;
  background: rgba(10, 31, 68, 0.08);
}

.blog-preview :deep(.article-image img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

/* Zoom léger au survol pour mettre en valeur la vignette sans changer le ratio. */
.blog-preview :deep(.article-card:hover .article-image img) {
  transform: scale(1.04);
}

/* Cartes plus lisibles : relief + hover navy (pas orange) pour cohérence section. */
.blog-preview :deep(.article-card) {
  background: #fff;
  border: 1px solid rgba(10, 31, 68, 0.1);
  border-radius: 16px;
  box-shadow:
    0 1px 3px rgba(10, 31, 68, 0.06),
    0 8px 24px rgba(10, 31, 68, 0.06);
}

.blog-preview :deep(.article-card:hover) {
  border-color: rgba(10, 31, 68, 0.22);
  box-shadow:
    0 4px 12px rgba(10, 31, 68, 0.08),
    0 16px 40px rgba(10, 31, 68, 0.1);
}


.blog-preview :deep(.article-description),
.blog-preview :deep(.article-meta) {
  color: #5c5c5c;
}

/* Étiquettes navy fixes : pas de passage orange au survol de la carte. */
.blog-preview :deep(.article-tags .tag) {
  background: var(--color-navy);
  color: #fff;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.blog-preview :deep(.article-card:hover .article-tags .tag) {
  background: var(--color-navy);
  opacity: 0.95;
}

.blog-preview :deep(.article-content) {
  padding: 22px 24px 26px;
}

.blog-preview :deep(.article-title) {
  color: #242424;
  font-size: 1.2rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-preview :deep(.article-description) {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
  margin-top: 0;
}

.blog-cta {
  margin-top: 48px;
  text-align: center;
}

/* CTA aligné section : hover navy au lieu d’orange pour rester homogène. */
.primary {
  display: inline-block;
  border: 1px solid var(--color-navy);
  padding: 14px 32px;
  border-radius: 999px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, color 0.25s ease,
    background 0.25s ease;
  color: var(--color-navy);
  text-decoration: none;
  background: #fff;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(10, 31, 68, 0.12);
  border-color: var(--color-navy);
  color: #fff;
  background: var(--color-navy);
}
</style>

