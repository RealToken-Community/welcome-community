<template>
  <div class="legal-page">
    <header class="legal-header">
      <div class="header-content">
        <p class="tag">{{ $t('confidentialite.tag') }}</p>
        <h1>{{ $t('confidentialite.pageTitle') }}</h1>
        <p class="lead">{{ $t('confidentialite.pageDescription') }}</p>
      </div>
    </header>

    <section class="legal-section">
      <div class="legal-content">
        <template v-for="(block, i) in blocks" :key="i">
          <h2 v-if="block.type === 'h2'" class="content-h2">{{ block.text }}</h2>
          <p v-else-if="block.type === 'p'" class="content-p">{{ block.text }}</p>
          <ul v-else-if="block.type === 'ul'" class="content-ul">
            <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
          </ul>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const blocks = computed(() => {
  const defs = [
    { type: 'h2', textKey: 'confidentialite.s1Title' },
    { type: 'p', textKey: 'confidentialite.s1Intro' },
    { type: 'h2', textKey: 'confidentialite.s2Title' },
    { type: 'ul', listKey: 'confidentialite.s2List' },
    { type: 'h2', textKey: 'confidentialite.s3Title' },
    { type: 'ul', listKey: 'confidentialite.s3List' },
    { type: 'h2', textKey: 'confidentialite.s4Title' },
    { type: 'p', textKey: 'confidentialite.s4Content' },
    { type: 'h2', textKey: 'confidentialite.s5Title' },
    { type: 'p', textKey: 'confidentialite.s5Content' },
    { type: 'h2', textKey: 'confidentialite.s6Title' },
    { type: 'p', textKey: 'confidentialite.s6Content' },
    { type: 'h2', textKey: 'confidentialite.s7Title' },
    { type: 'p', textKey: 'confidentialite.s7Content' }
  ]
  return defs.map((b) => {
    if (b.type === 'h2') return { type: 'h2', text: t(b.textKey) }
    if (b.type === 'p') return { type: 'p', text: t(b.textKey) }
    if (b.type === 'ul') return { type: 'ul', items: t(b.listKey).split('\n').filter(Boolean) }
    return b
  })
})
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.legal-header {
  padding: 48px min(8vw, 120px) 80px;
  background:
    linear-gradient(rgba(10, 31, 68, 0.88), rgba(10, 31, 68, 0.95)),
    url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1600&q=80')
      center/cover;
}

.header-content {
  max-width: 720px;
  margin-top: 24px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-orange);
}

.tag::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--color-orange);
}

h1 {
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin: 24px 0;
  color: #fff;
}

.lead {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.82);
  margin-top: 16px;
}

.legal-section {
  padding: 48px min(8vw, 120px) 96px;
  max-width: 820px;
  margin: 0 auto;
}

.legal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-h2 {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-orange);
  margin: 32px 0 8px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.content-h2:first-child {
  margin-top: 0;
}

.content-p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
}

.content-ul {
  margin: 0 0 0 20px;
  padding: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

.content-ul li {
  margin-bottom: 8px;
}

.content-ul li::marker {
  color: var(--color-orange);
}

@media (max-width: 768px) {
  .legal-header,
  .legal-section {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }
}
</style>
