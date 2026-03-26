<template>
  <div class="partenaires-page">
    <header class="partenaires-header">
      <div class="header-content">
        <p class="tag">{{ $t('partenaires.tag') }}</p>
        <h1>{{ $t('partenaires.pageTitle') }}</h1>
        <p class="lead">{{ $t('partenaires.pageDescription') }}</p>
      </div>
    </header>

    <section class="partenaires-section">
      <div class="partenaires-intro">
        <p>{{ $t('partenaires.intro') }}</p>
      </div>

      <div class="partenaires-block">
        <h2 class="section-title">{{ $t('partenaires.criteriaTitle') }}</h2>
        <p class="section-desc">{{ $t('partenaires.criteriaDesc') }}</p>
        <div class="criteria-card">
          <span class="criteria-badge">{{ $t('partenaires.criteriaBadge') }}</span>
          <p class="criteria-text">{{ $t('partenaires.criteriaText') }}</p>
        </div>
      </div>

      <div class="partenaires-block">
        <h2 class="section-title">{{ $t('partenaires.offerTitle') }}</h2>
        <p class="section-desc">{{ $t('partenaires.offerDesc') }}</p>
        <ul class="offer-list">
          <li>
            <span class="offer-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </span>
            <span class="offer-text">{{ $t('partenaires.offer1') }}</span>
          </li>
          <li>
            <span class="offer-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </span>
            <span class="offer-text">{{ $t('partenaires.offer2') }}</span>
          </li>
          <li>
            <span class="offer-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </span>
            <span class="offer-text">{{ $t('partenaires.offer3') }}</span>
          </li>
          <li>
            <span class="offer-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </span>
            <span class="offer-text">{{ $t('partenaires.offer4') }}</span>
          </li>
        </ul>
      </div>

      <div class="partenaires-block">
        <h2 class="section-title">{{ $t('partenaires.seekTitle') }}</h2>
        <p class="section-desc">{{ $t('partenaires.seekIntro') }}</p>
        <ul class="offer-list seek-list">
          <li v-for="(item, i) in seekItems" :key="i">
            <span class="offer-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </span>
            <span class="offer-text">{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="partenaires-cta">
        <p class="cta-text">{{ $t('partenaires.ctaText') }}</p>
        <a href="mailto:marketing@realtoken.community" class="cta-btn">
          {{ $t('partenaires.ctaButton') }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const seekItems = computed(() =>
  t('partenaires.seekList').split('\n').filter(Boolean)
)
</script>

<style scoped>
.partenaires-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.partenaires-header {
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

.partenaires-section {
  padding: 48px min(8vw, 120px) 96px;
  max-width: 820px;
  margin: 0 auto;
}

.partenaires-intro {
  margin-bottom: 48px;
}

.partenaires-intro p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
}

.partenaires-block {
  margin-bottom: 48px;
}

.partenaires-block:last-of-type {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-orange);
  margin: 0 0 8px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.82);
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.criteria-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 140, 66, 0.25);
  border-radius: 12px;
  padding: 24px 28px;
}

.criteria-badge {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-orange);
  margin-bottom: 12px;
}

.criteria-text {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
}

.offer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.offer-list li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.offer-list li:hover {
  border-color: rgba(255, 140, 66, 0.3);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
}

.offer-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 140, 66, 0.15);
  color: var(--color-orange);
  display: flex;
  align-items: center;
  justify-content: center;
}

.offer-icon svg {
  width: 22px;
  height: 22px;
}

.offer-text {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  padding-top: 2px;
}

.partenaires-cta {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.cta-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.88);
  margin: 0 0 24px 0;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: var(--color-orange);
  color: var(--color-navy, #0a1f44);
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(255, 140, 66, 0.4);
}

@media (max-width: 768px) {
  .partenaires-header,
  .partenaires-section {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }

  .offer-list li {
    flex-direction: column;
    gap: 12px;
    padding: 16px 20px;
  }
}
</style>
