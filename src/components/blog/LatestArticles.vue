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
        <router-link to="/blog" class="primary outline">
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
.blog-preview {
  width: 100%;
  max-width: none;
  padding: 80px min(8vw, 120px) 100px;
  margin: 0;
  box-sizing: border-box;
  background: #f0f0f0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.blog-preview .section-inner {
  max-width: 1120px;
  margin: 0 auto;
}

.blog-preview :deep(.section-heading) {
  text-align: center;
  max-width: 520px;
  margin: 0 auto 56px;
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
}

.blog-preview :deep(.article-image img) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-preview :deep(.article-card) {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.blog-preview :deep(.article-card:hover) {
  border-color: rgba(255, 140, 66, 0.4);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.blog-preview :deep(.article-title) {
  color: #242424;
}

.blog-preview :deep(.article-description),
.blog-preview :deep(.article-meta) {
  color: #5c5c5c;
}

.blog-preview :deep(.article-tags .tag) {
  background: var(--color-navy);
  color: #fff;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.blog-preview :deep(.article-card:hover .article-tags .tag) {
  background: var(--color-orange);
  color: #fff;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 0;
}

.blog-cta {
  margin-top: 40px;
  text-align: center;
}

.primary {
  display: inline-block;
  border: 1px solid #242424;
  padding: 12px 28px;
  border-radius: 999px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #242424;
  text-decoration: none;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 140, 66, 0.25);
  border-color: var(--color-orange);
  color: var(--color-orange);
}
</style>

