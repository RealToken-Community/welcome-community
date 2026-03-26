<template>
  <div class="comite-page">
    <header class="comite-header">
      <div class="header-content">
        <p class="tag">{{ $t('comite.tag') }}</p>
        <h1>{{ $t('comite.pageTitle') }}</h1>
        <p class="lead">{{ $t('comite.pageDescription') }}</p>
      </div>
    </header>

    <section class="comite-section">
      <div class="comite-grid">
        <article
          v-for="(committee, index) in committees"
          :key="committee.id"
          class="comite-card"
          :style="{ '--card-accent': committee.accent }"
        >
          <div class="card-icon" :aria-hidden="true">
            <component :is="committee.icon" />
          </div>
          <h2 class="card-title">{{ $t(`comite.committees.${committee.id}.title`) }}</h2>
          <p class="card-description">{{ $t(`comite.committees.${committee.id}.description`) }}</p>
          <div class="card-members">
            <span class="members-label">{{ $t('comite.members') }}</span>
            <span class="members-list">{{ $t(`comite.committees.${committee.id}.members`) }}</span>
          </div>
          <a
            v-if="committee.telegram"
            :href="committee.telegram"
            target="_blank"
            rel="noopener noreferrer"
            class="card-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            {{ $t('comite.telegram') }}
          </a>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconProposer from '../components/icons/ComiteProposer.vue'
import IconSecurity from '../components/icons/ComiteSecurity.vue'
import IconVoting from '../components/icons/ComiteVoting.vue'
import IconLiquidity from '../components/icons/ComiteLiquidity.vue'
import IconMarketing from '../components/icons/ComiteMarketing.vue'

const committees = computed(() => [
  {
    id: 'proposer',
    icon: IconProposer,
    accent: 'rgba(255, 140, 66, 0.25)'
  },
  {
    id: 'security',
    icon: IconSecurity,
    accent: 'rgba(239, 68, 68, 0.25)'
  },
  {
    id: 'votingPower',
    icon: IconVoting,
    accent: 'rgba(34, 197, 94, 0.25)',
    telegram: 'https://t.me/powervoting_realtoken_dao'
  },
  {
    id: 'liquidity',
    icon: IconLiquidity,
    accent: 'rgba(59, 130, 246, 0.25)',
    telegram: 'https://t.me/RealTokenDAOLiquidityManagement'
  },
  {
    id: 'marketing',
    icon: IconMarketing,
    accent: 'rgba(168, 85, 247, 0.25)'
  }
])
</script>

<style scoped>
.comite-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.comite-header {
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

.comite-section {
  padding: 48px min(8vw, 120px) 96px;
  max-width: 1200px;
  margin: 0 auto;
}

.comite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}

.comite-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 28px 24px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comite-card:hover {
  border-color: var(--card-accent, rgba(255, 140, 66, 0.3));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--card-accent, rgba(255, 140, 66, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-orange);
  flex-shrink: 0;
}

.card-icon :deep(svg) {
  width: 26px;
  height: 26px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  line-height: 1.3;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
  flex: 1;
}

.card-members {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.members-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-orange);
  font-weight: 600;
}

.members-list {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--color-orange);
  text-decoration: none;
  margin-top: 4px;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.card-link:hover {
  color: var(--color-orange-light);
  opacity: 0.95;
}

@media (max-width: 768px) {
  .comite-header,
  .comite-section {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }

  .comite-grid {
    grid-template-columns: 1fr;
  }
}
</style>
