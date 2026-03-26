<script setup>
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted } from 'vue'
import LatestArticles from '../components/blog/LatestArticles.vue'

const { t } = useI18n()

const COINGECKO_REG_ID = 'realtoken-ecosystem-governance'
const regMarketCapUsd = ref(null)

function formatCompact(value) {
  if (value == null || typeof value !== 'number') return null
  if (value >= 1e9) return (value / 1e9).toFixed(2) + ' B'
  if (value >= 1e6) return (value / 1e6).toFixed(2) + ' M'
  if (value >= 1e3) return (value / 1e3).toFixed(2) + ' K'
  return value.toLocaleString()
}

onMounted(async () => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${COINGECKO_REG_ID}?localization=false&tickers=false&community_data=false&developer_data=false`
    )
    if (!res.ok) return
    const data = await res.json()
    const cap = data.market_data?.market_cap?.usd
    if (typeof cap === 'number') regMarketCapUsd.value = cap
  } catch (_) {}
})

const aboutFeatures = computed(() => [
  {
    title: t('about.features.liquidity.title'),
    description: t('about.features.liquidity.description')
  },
  {
    title: t('about.features.exchange.title'),
    description: t('about.features.exchange.description')
  },
  {
    title: t('about.features.available.title'),
    description: t('about.features.available.description')
  },
  {
    title: t('about.features.accessible.title'),
    description: t('about.features.accessible.description')
  }
])

const applications = computed(() => [
  {
    title: t('application.rmm.title'),
    description: t('application.rmm.description'),
    href: 'https://rmm.realtoken.network/'
  },
  {
    title: t('application.yam.title'),
    description: t('application.yam.description'),
    href: 'https://yam.realtoken.network'
  },
  {
    title: t('application.dex.title'),
    description: t('application.dex.description')
  },
  {
    title: t('application.nft.title'),
    description: t('application.nft.description')
  }
])

const daoRoles = computed(() => [
  {
    title: t('daoRole.role1.title'),
    description: t('daoRole.role1.description')
  },
  {
    title: t('daoRole.role2.title'),
    description: t('daoRole.role2.description')
  },
  {
    title: t('daoRole.role3.title'),
    description: t('daoRole.role3.description')
  }
])

const governanceTools = computed(() => [
  {
    title: t('governance.protocol.title'),
    description: t('governance.protocol.description'),
    href: 'https://www.coingecko.com/en/coins/realtoken-ecosystem-governance',
    linkText: t('governance.protocol.link')
  },
  {
    title: t('governance.forum.title'),
    description: t('governance.forum.description'),
    href: 'https://forum.realtoken.community/',
    linkText: t('governance.forum.link')
  },
  {
    title: t('governance.tally.title'),
    description: t('governance.tally.description'),
    href: 'https://www.tally.xyz/gov/realtoken-ecosystem-governance',
    linkText: t('governance.tally.link')
  }
])

const steps = computed(() => [
  {
    number: '01',
    title: t('process.step1.title'),
    text: t('process.step1.text')
  },
  {
    number: '02',
    title: t('process.step2.title'),
    text: t('process.step2.text')
  },
  {
    number: '03',
    title: t('process.step3.title'),
    text: t('process.step3.text')
  }
])

const stats = computed(() => {
  const regCap = regMarketCapUsd.value != null ? formatCompact(regMarketCapUsd.value) + ' USD' : t('stats.comingSoon')
  return [
    { label: t('stats.assets'), value: '$128M' },
    { label: t('stats.members'), value: '6 200+' },
    { label: t('stats.regMarketcap'), value: regCap },
    { label: t('stats.votes'), value: '38' }
  ]
})
</script>

<template>
  <div class="landing">
    <header class="hero">
      <div class="hero-content">
        <p class="tag">{{ $t('hero.tag') }}</p>
        <h1>
          {{ $t('hero.title') }}
          <span>{{ $t('hero.titleSpan') }}</span>
        </h1>
        <p class="lead">
          {{ $t('hero.lead') }}
        </p>
        <div class="hero-cta">
          <a href="https://medium.com/realtfrench/la-naissance-dune-dao-pour-d%C3%A9centraliser-l-%C3%A9cosyst%C3%A8me-1759b1a02b27" class="primary filled" target="_blank" rel="noopener noreferrer">{{ $t('hero.ctaDashboard') }}</a>
          <a href="https://medium.com/realtfrench/token-economy-ce7a2455dead" class="primary outline" target="_blank" rel="noopener noreferrer">{{ $t('hero.ctaVision') }}</a>
        </div>
        <div class="trust-points">
          <div>
            <strong>{{ $t('hero.trustSec') }}</strong>
            <span v-if="$t('hero.trustSecDesc')"> {{ $t('hero.trustSecDesc') }}</span>
          </div>
          <div>
            <strong>{{ $t('hero.trustLloyds') }}</strong>
            <span v-if="$t('hero.trustLloydsDesc')"> {{ $t('hero.trustLloydsDesc') }}</span>
          </div>
          <div>
            <strong>{{ $t('hero.trustChainlink') }}</strong>
            <span v-if="$t('hero.trustChainlinkDesc')"> {{ $t('hero.trustChainlinkDesc') }}</span>
          </div>
        </div>
      </div>
    </header>

    <section id="about" class="section section-light about">
      <div class="section-inner">
        <div class="section-heading">
          <p class="tag">{{ $t('about.tag') }}</p>
          <h2>{{ $t('about.title') }}</h2>
          <p>
            {{ $t('about.description') }}
          </p>
        </div>
        <div class="features">
          <article v-for="feature in aboutFeatures" :key="feature.title">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="application" class="section section-navy application">
      <div class="section-inner">
        <div class="section-heading compact">
          <p class="tag">{{ $t('application.tag') }}</p>
          <h2>{{ $t('application.title') }}</h2>
        </div>
        <div class="cards">
          <article v-for="app in applications" :key="app.title" class="card">
            <h3>{{ app.title }}</h3>
            <p>{{ app.description }}</p>
            <a v-if="app.href" :href="app.href" target="_blank" rel="noopener noreferrer" class="app-link">
              {{ $t('application.openApp') }}
              <span class="app-link-arrow" aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </div>
    </section>

    <section id="dao-role" class="section section-dark dao-role">
      <div class="section-inner">
        <div class="section-heading compact">
          <p class="tag">{{ $t('daoRole.tag') }}</p>
          <h2>{{ $t('daoRole.title') }}</h2>
        </div>
        <div class="cards">
          <article v-for="role in daoRoles" :key="role.title" class="card">
            <h3>{{ role.title }}</h3>
            <p>{{ role.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="governance" class="section section-light governance">
      <div class="section-inner">
        <div class="section-heading compact">
          <p class="tag">{{ $t('governance.tag') }}</p>
          <h2>{{ $t('governance.title') }}</h2>
        </div>
        <div class="cards">
          <article v-for="tool in governanceTools" :key="tool.title" class="card">
            <h3>{{ tool.title }}</h3>
            <p>{{ tool.description }}</p>
            <a v-if="tool.href" :href="tool.href" target="_blank" rel="noopener noreferrer" class="app-link">
              {{ tool.linkText }}
              <span class="app-link-arrow" aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </div>
    </section>

    <section id="process" class="section section-navy process">
      <div class="section-inner">
        <div class="section-heading compact">
          <p class="tag">{{ $t('process.tag') }}</p>
          <h2>{{ $t('process.title') }}</h2>
        </div>
        <div class="timeline">
          <article v-for="step in steps" :key="step.number" class="step">
            <span class="step-number">{{ step.number }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="stats" class="section section-dark stats">
      <div class="section-inner">
        <div class="section-heading compact">
          <p class="tag">{{ $t('stats.tag') }}</p>
          <h2>{{ $t('stats.title') }}</h2>
        </div>
        <div class="stats-grid">
          <article v-for="item in stats" :key="item.label">
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </article>
        </div>
      </div>
    </section>

    <LatestArticles />

    <section class="section cta">
      <div class="section-inner cta-inner">
        <div>
          <p class="tag">{{ $t('cta.tag') }}</p>
          <h2>{{ $t('cta.title') }}</h2>
          <p>
            {{ $t('cta.description') }}
          </p>
        </div>
        <div class="cta-actions">
          <a href="mailto:marketing@realtoken.community" class="primary filled">{{ $t('cta.buttonPartner') }}</a>
          <router-link to="/partners" class="primary outline">{{ $t('cta.buttonLearn') }}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:global(body) {
  background: radial-gradient(circle at top, rgba(10, 31, 68, 0.85), #030a1c 60%);
}

.landing {
  color: #f8fbff;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
}

.section {
  width: 100%;
  max-width: none;
  padding: 80px min(8vw, 120px) 100px;
  margin: 0;
  box-sizing: border-box;
}

.section-inner {
  max-width: 1120px;
  margin: 0 auto;
}

.section-light {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.section-light .section-heading h2 {
  color: #242424;
}

.section-light .section-heading p {
  color: #5c5c5c;
}

.section-light .features article,
.section-light .card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fafafa;
}

.section-light .features article:hover,
.section-light .card:hover {
  border-color: rgba(255, 140, 66, 0.35);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.section-light .features article h3,
.section-light .card h3 {
  color: #242424;
}

.section-light .features article p,
.section-light .card p {
  color: #5c5c5c;
}

.section-light .step {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 3px solid var(--color-orange);
  background: #fafafa;
}

.section-light .step:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.section-light .step h3 {
  color: #242424;
}

.section-light .step p {
  color: #5c5c5c;
}

.section-dark {
  background: #242424;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.section-dark .section-heading h2 {
  color: #fff;
}

.section-dark .section-heading p {
  color: rgba(255, 255, 255, 0.75);
}

.section-dark .card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.section-dark .card:hover {
  border-color: rgba(255, 140, 66, 0.4);
  background: rgba(255, 255, 255, 0.06);
}

.section-dark .card h3 {
  color: #fff;
}

.section-dark .card p {
  color: rgba(255, 255, 255, 0.78);
}

.section-dark .step {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid var(--color-orange);
  background: rgba(255, 255, 255, 0.04);
}

.section-dark .step:hover {
  background: rgba(255, 255, 255, 0.06);
}

.section-dark .step h3 {
  color: #fff;
}

.section-dark .step p {
  color: rgba(255, 255, 255, 0.78);
}

.section-dark .stats-grid article {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.section-dark .stats-grid article:hover {
  border-color: rgba(255, 140, 66, 0.3);
  background: rgba(255, 255, 255, 0.06);
}

.section-dark .stats-grid span {
  color: rgba(255, 255, 255, 0.7);
}

.section-navy {
  background: var(--color-navy);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.section-navy .section-heading h2 {
  color: #fff;
}

.section-navy .section-heading p {
  color: rgba(255, 255, 255, 0.8);
}

.section-navy .card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.section-navy .card:hover {
  border-color: rgba(255, 140, 66, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.section-navy .card h3 {
  color: #fff;
}

.section-navy .card p {
  color: rgba(255, 255, 255, 0.82);
}

.section-navy .step {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 3px solid var(--color-orange);
  background: rgba(255, 255, 255, 0.06);
}

.section-navy .step:hover {
  background: rgba(255, 255, 255, 0.08);
}

.section-navy .step h3 {
  color: #fff;
}

.section-navy .step p {
  color: rgba(255, 255, 255, 0.82);
}

.hero {
  position: relative;
  min-height: 90vh;
  padding: 48px min(8vw, 120px) 120px;
  background:
    linear-gradient(rgba(10, 31, 68, 0.88), rgba(10, 31, 68, 0.95)),
    url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1600&q=80')
      center/cover;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  pointer-events: none;
}

.primary {
  border: 1px solid transparent;
  padding: 12px 28px;
  border-radius: 999px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;
}

a.primary {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.primary.filled {
  background: var(--color-orange);
  color: var(--color-navy);
  box-shadow: 0 15px 30px rgba(255, 140, 66, 0.35);
}

.primary.ghost {
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  background: transparent;
}

.primary.outline {
  border-color: rgba(255, 255, 255, 0.4);
  color: #fff;
  background: transparent;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(255, 140, 66, 0.4);
}

.hero-content {
  position: relative;
  max-width: 720px;
  z-index: 1;
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

h1 span {
  display: block;
  color: var(--color-orange);
}

.lead {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 32px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.trust-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.trust-points div {
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: rgba(5, 15, 36, 0.55);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-heading {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 56px;
}

.section-heading.compact {
  max-width: 520px;
}

.section-heading .tag {
  justify-content: center;
}

.section-heading .tag::before {
  display: none;
}

.section-heading h2 {
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 600;
  margin: 12px 0 16px;
  color: #fff;
  letter-spacing: -0.02em;
}

.section-heading p {
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  line-height: 1.65;
  margin: 0;
}

.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 0;
}

@media (max-width: 900px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .features {
    grid-template-columns: 1fr;
  }
}

.features article {
  padding: 28px 24px;
  border-radius: 14px;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.features article h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 10px;
  letter-spacing: 0.01em;
}

.features article p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 0;
}

.application .cards {
  grid-template-columns: repeat(2, 1fr);
}

.application .card {
  display: flex;
  flex-direction: column;
}

.application .card .app-link,
.governance .card .app-link {
  margin-top: auto;
  padding-top: 1rem;
}

.governance .card {
  display: flex;
  flex-direction: column;
}

.card {
  padding: 28px 26px;
  border-radius: 14px;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 10px;
  letter-spacing: 0.01em;
}

.card p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.app-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-orange);
  text-decoration: none;
  transition: color 0.2s ease, gap 0.2s ease;
}

.app-link:hover {
  color: #ffb97a;
  gap: 0.5rem;
}

.app-link-arrow {
  font-size: 1.1em;
  line-height: 1;
}

.timeline {
  margin-top: 0;
  display: grid;
  gap: 16px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px 28px;
  border-radius: 14px;
  border-left: 3px solid var(--color-orange);
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.step-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-orange);
  opacity: 0.9;
  flex-shrink: 0;
  line-height: 1.2;
}

.step div {
  flex: 1;
  min-width: 0;
}

.step h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 8px;
}

.step p {
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.stats-grid {
  margin-top: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 380px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

.stats-grid article {
  padding: 28px 20px;
  border-radius: 14px;
  text-align: center;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.stats-grid strong {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-orange);
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.stats-grid span {
  font-size: 0.85rem;
}

.section.cta {
  max-width: none;
  width: 100%;
  box-sizing: border-box;
}

.cta-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.cta {
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.18), var(--color-navy) 50%);
}

.cta-actions {
  display: flex;
  gap: 16px;
}

@media (max-width: 768px) {
  .hero::after {
    inset: 16px;
  }

  .section {
    padding: 60px min(5vw, 24px) 80px;
  }

  .application .cards {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: row;
    gap: 16px;
    padding: 20px 20px 20px 24px;
  }

  .step-number {
    font-size: 1.25rem;
  }
}

@media (max-width: 500px) {
  .step {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
