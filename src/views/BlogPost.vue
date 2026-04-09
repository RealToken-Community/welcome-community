<template>
  <div class="blog-post-page">
    <article class="post-content" v-if="article">
      <div class="post-hero-image" v-if="article.imageHeader">
        <img :src="`/ArticleImg/${article.imageHeader}`" :alt="article.title" />
      </div>
      <div class="post-header-content">
        <div class="post-meta">
          <span class="post-date">{{ formatDate(article.date) }}</span>
          <span class="post-author">{{ article.author }}</span>
        </div>
        <h1 class="post-title">{{ article.title }}</h1>
        <p class="post-description">{{ article.description }}</p>
      </div>

      <div class="post-body" v-html="article.content"></div>

      <div class="post-footer">
        <div class="post-tags" v-if="article.tags && article.tags.length">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <router-link to="/ressource/blog" class="back-link">
          ← {{ $t('blog.backToBlog') }}
        </router-link>
      </div>
    </article>

    <div v-else class="loading">
      <p>{{ $t('blog.loading') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loadArticle } from '../utils/blog.js'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const article = ref(null)
const DEFAULT_TITLE = 'RealToken Blog | RealToken DAO'
const DEFAULT_DESCRIPTION = 'Explore all our articles on real estate tokenization, decentralized governance and the RealToken ecosystem.'

function upsertMetaDescription(content) {
  let descriptionTag = document.querySelector('meta[name="description"]')
  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }
  descriptionTag.setAttribute('content', content)
}

function updateSeoHead(post) {
  if (!post) {
    document.title = DEFAULT_TITLE
    upsertMetaDescription(DEFAULT_DESCRIPTION)
    return
  }
  const title = post.title?.trim() ? `${post.title} | RealToken DAO` : DEFAULT_TITLE
  const description = post.description?.trim() ? post.description : DEFAULT_DESCRIPTION
  document.title = title
  upsertMetaDescription(description)
}

const fetchArticle = async () => {
  const slug = route.params.slug
  article.value = await loadArticle(slug, locale.value)
  if (!article.value) {
    router.replace('/not-found')
    return
  }
  updateSeoHead(article.value)
}

onMounted(fetchArticle)
watch([() => route.params.slug, locale], fetchArticle)
watch(article, updateSeoHead)

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
.blog-post-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.post-content {
  max-width: 980px;
  margin: 0 auto;
  padding: 48px min(8vw, 120px) 96px;
}

.post-hero-image {
  width: 100%;
  max-height: 360px;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 32px;
  background: rgba(0, 0, 0, 0.2);
}

.post-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-header-content {
  margin-bottom: 48px;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.post-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  line-height: 1.2;
  color: #fff;
  margin: 24px 0;
}

.post-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 24px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 6px 14px;
  background: rgba(255, 140, 66, 0.15);
  color: var(--color-orange);
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-body {
  max-width: 920px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  text-align: justify;
}

.post-body :deep(h1),
.post-body :deep(h2),
.post-body :deep(h3) {
  color: #fff;
  margin-top: 2em;
  margin-bottom: 1em;
}

.post-body :deep(h2) {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-orange);
  margin-top: 32px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

.post-body :deep(p) {
  margin-bottom: 1.5em;
}

.post-body :deep(a) {
  color: var(--color-orange);
  text-decoration: none;
}

.post-body :deep(a:hover) {
  text-decoration: underline;
}

.post-body :deep(ul),
.post-body :deep(ol) {
  margin: 0 0 0 20px;
  padding: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.post-body :deep(li) {
  margin-bottom: 8px;
}

.post-body :deep(ul li)::marker,
.post-body :deep(ol li)::marker {
  color: var(--color-orange);
}

@media (min-width: 1200px) {
  .post-content {
    max-width: 1100px;
  }

  .post-body {
    max-width: 980px;
    font-size: 1.1rem;
  }
}

.post-body :deep(code) {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.post-body :deep(blockquote) {
  border-left: 4px solid var(--color-orange);
  padding-left: 1.5em;
  margin: 1.5em 0;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

.post-footer {
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
  color: var(--color-orange);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #ffb97a;
}

.loading {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.6);
}
</style>

