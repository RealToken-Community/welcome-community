<template>
  <div class="reg-page">
    <header class="reg-header">
      <div class="header-content">
        <p class="tag">{{ $t('reg.tag') }}</p>
        <h1>{{ $t('reg.pageTitle') }}</h1>
        <p class="lead">{{ $t('reg.pageDescription') }}</p>
      </div>
    </header>

    <section class="reg-section">
      <!-- Chargement -->
      <div v-if="loading" class="reg-loading">
        <p>{{ $t('reg.loading') }}</p>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="reg-error">
        <p>{{ $t('reg.error') }}</p>
        <p class="error-detail">{{ error }}</p>
      </div>

      <!-- Contenu principal -->
      <template v-else-if="coin">
        <div class="reg-overview">
          <div class="reg-brand">
            <img
              v-if="coin.image?.large"
              :src="coin.image.large"
              :alt="coin.name"
              class="reg-logo"
              width="120"
              height="120"
            />
            <div class="reg-meta">
              <h2 class="reg-name">{{ coin.name }}</h2>
              <p class="reg-symbol">{{ (coin.symbol || '').toUpperCase() }}</p>
              <p v-if="coin.description?.en" class="reg-desc">{{ coin.description.en }}</p>
              <div v-if="coin.categories?.length" class="reg-categories">
                <span
                  v-for="cat in coin.categories.slice(0, 5)"
                  :key="cat"
                  class="category-tag"
                >{{ cat }}</span>
              </div>
            </div>
          </div>

          <div class="reg-stats">
            <div class="stat-card">
              <span class="stat-label">{{ $t('reg.price') }}</span>
              <span class="stat-value">
                {{ formatPrice(marketData?.current_price?.usd) }}
                <span class="stat-unit">USD</span>
              </span>
              <span
                v-if="marketData?.price_change_percentage_24h != null"
                class="stat-change"
                :class="marketData.price_change_percentage_24h >= 0 ? 'positive' : 'negative'"
              >
                {{ formatPercent(marketData.price_change_percentage_24h) }} (24h)
              </span>
            </div>
            <div class="stat-card">
              <span class="stat-label">{{ $t('reg.marketCap') }}</span>
              <span class="stat-value">{{ formatCompact(marketData?.market_cap?.usd) }}</span>
              <span class="stat-unit">USD</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">{{ $t('reg.volume24h') }}</span>
              <span class="stat-value">{{ formatCompact(marketData?.total_volume?.usd) }}</span>
              <span class="stat-unit">USD</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">{{ $t('reg.circulatingSupply') }}</span>
              <span class="stat-value">{{ formatCompact(marketData?.circulating_supply) }}</span>
              <span class="stat-unit">{{ (coin.symbol || '').toUpperCase() }}</span>
            </div>
          </div>
        </div>

        <div class="reg-whitepaper">
          <h2 class="section-title">{{ $t('reg.whitepaperTitle') }}</h2>
          <p class="section-desc">{{ $t('reg.whitepaperDescription') }}</p>
          <a
            :href="whitepaperUrl"
            class="whitepaper-btn"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
            {{ $t('reg.downloadWhitepaper') }}
          </a>
        </div>

      </template>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const COINGECKO_COIN_ID = 'realtoken-ecosystem-governance'
const WHITEPAPER_FILENAME = 'reg-whitepaper-fr.pdf'

const loading = ref(true)
const error = ref(null)
const coin = ref(null)

const marketData = computed(() => coin.value?.market_data ?? null)
const whitepaperUrl = computed(() => `/${WHITEPAPER_FILENAME}`)

function formatPrice(value) {
  if (value == null || typeof value !== 'number') return '–'
  if (value >= 1) return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
  return value.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 })
}

function formatPercent(value) {
  if (value == null || typeof value !== 'number') return '–'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

function formatCompact(value) {
  if (value == null || typeof value !== 'number') return '–'
  if (value >= 1e9) return (value / 1e9).toFixed(2) + ' B'
  if (value >= 1e6) return (value / 1e6).toFixed(2) + ' M'
  if (value >= 1e3) return (value / 1e3).toFixed(2) + ' K'
  return value.toLocaleString()
}

async function fetchCoin() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${COINGECKO_COIN_ID}?localization=false&tickers=false&community_data=false&developer_data=false`
    )
    if (!res.ok) throw new Error(`API ${res.status}`)
    coin.value = await res.json()
  } catch (e) {
    error.value = e.message || 'Failed to load'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCoin()
})
</script>

<style scoped>
.reg-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.reg-header {
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

.reg-section {
  padding: 48px min(8vw, 120px) 96px;
  max-width: 1000px;
  margin: 0 auto;
}

.reg-loading,
.reg-error {
  text-align: center;
  padding: 48px 24px;
  color: rgba(255, 255, 255, 0.8);
}

.reg-error .error-detail {
  font-size: 0.9rem;
  color: rgba(255, 140, 66, 0.9);
  margin-top: 8px;
}

.reg-overview {
  margin-bottom: 48px;
}

.reg-brand {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.reg-logo {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.06);
  padding: 8px;
}

.reg-meta {
  flex: 1;
  min-width: 0;
}

.reg-name {
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.reg-symbol {
  font-size: 1rem;
  color: var(--color-orange);
  margin: 0 0 12px 0;
}

.reg-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  margin: 0 0 12px 0;
}

.reg-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  background: rgba(255, 140, 66, 0.15);
  color: var(--color-orange);
  border-radius: 999px;
}

.reg-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card:hover {
  border-color: rgba(255, 140, 66, 0.25);
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.stat-unit {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.stat-change {
  font-size: 0.9rem;
  margin-top: 4px;
}

.stat-change.positive {
  color: #22c55e;
}

.stat-change.negative {
  color: #ef4444;
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
}

.reg-whitepaper {
  margin-bottom: 48px;
}

.whitepaper-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  background: var(--color-orange);
  color: #0a1f44;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.whitepaper-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(255, 140, 66, 0.4);
}

@media (max-width: 768px) {
  .reg-header,
  .reg-section {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }

  .reg-brand {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .reg-stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
