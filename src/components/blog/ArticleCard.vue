<template>
  <article class="article-card" @click="goToArticle">
    <div class="article-image" v-if="article.imageHeader">
      <img :src="`/ArticleImg/${article.imageHeader}`" :alt="article.title" />
    </div>
    <div class="article-content">
      <div class="article-meta">
        <span class="article-date">{{ formatDate(article.date) }}</span>
        <span class="article-author">{{ article.author }}</span>
      </div>
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-description">{{ article.description }}</p>
      <div class="article-tags" v-if="article.tags && article.tags.length">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const { locale } = useI18n()

const goToArticle = () => {
  router.push(`/blog/${props.article.slug}`)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(locale.value, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
.article-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 0;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 140, 66, 0.3);
}

/* Zone vignette = même ratio que les visuels de référence 1376×768 (évite crop arbitraire 200px). */
.article-image {
  width: 100%;
  aspect-ratio: 1376 / 768;
  overflow: hidden;
  background: rgba(10, 31, 68, 0.5);
  position: relative;
}

.article-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.article-content {
  padding: 24px;
  min-width: 0;
}

.article-title,
.article-description {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 12px;
}

.article-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.4;
}

.article-description {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 16px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: rgba(255, 140, 66, 0.15);
  color: var(--color-orange);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>

