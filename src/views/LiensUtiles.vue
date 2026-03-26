<template>
  <div class="app-hub-page">
    <header class="hero hero--compact">
      <div class="hero-content">
        <p class="tag">{{ $t('liensUtiles.tag') }}</p>
        <h1>{{ $t('liensUtiles.pageTitle') }}</h1>
        <p class="lead">{{ $t('liensUtiles.pageDescription') }}</p>
      </div>
    </header>

    <!-- Une seule section : onglets + contenu avec transition -->
    <section class="hub-one-section">
      <div class="hub-one-inner">
        <nav class="hub-tabs" role="tablist" aria-label="Catégories d'applications">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.id"
            :aria-controls="'panel-' + tab.id"
            :id="'tab-' + tab.id"
            :class="['hub-tab', { 'hub-tab--active': activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>

        <div class="hub-panel-wrap">
          <Transition name="tab-fade" mode="out-in">
            <div
              v-if="activeTab === 'community'"
              :id="'panel-community'"
              key="community"
              role="tabpanel"
              :aria-labelledby="'tab-community'"
              class="hub-panel hub-panel--community"
            >
              <p class="hub-panel-disclaimer">{{ $t('liensUtiles.communitySection.disclaimer') }}</p>
              <div class="hub-panel-grid">
                <a
                  v-for="(tool, i) in communityTools"
                  :key="i"
                  :href="tool.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hub-tool-card hub-tool-card--community"
                >
                  <span class="hub-tool-title">{{ tool.title }}</span>
                  <p class="hub-tool-desc">{{ tool.description }}</p>
                  <div class="hub-tool-footer">
                    <span class="hub-tool-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 19h2v-7H3v2h2v5zm2 0h10v-2H7v2zm0-4h10v-2H7v2zm0-6h10V7H7v2z"/></svg></span>
                    <span class="hub-managed-badge hub-managed-badge--community">{{ $t('liensUtiles.managedBy.community') }}</span>
                  </div>
                </a>
              </div>
            </div>

            <div
              v-else
              :id="'panel-' + activeTab"
              :key="activeTab"
              role="tabpanel"
              :aria-labelledby="'tab-' + activeTab"
              class="hub-panel"
            >
              <template v-if="activeSection">
                <!-- Carte principale (RMM, YAM, REG) -->
                <div v-if="activeSection.main" class="hub-panel-main">
                  <a
                    :href="activeSection.main.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hub-main-card hub-main-card--link"
                  >
                    <div class="hub-main-icon" aria-hidden="true"></div>
                    <h3>{{ activeSection.main.title }}</h3>
                    <p>{{ activeSection.main.description }}</p>
                    <span class="hub-managed-badge">{{ $t('liensUtiles.managedBy.' + activeSection.main.managedBy) }}</span>
                    <span class="app-link">{{ activeSection.main.linkText }} →</span>
                  </a>
                </div>
                <!-- Grille d'outils -->
                <div class="hub-panel-grid">
                  <a
                    v-for="(tool, i) in activeSection.tools"
                    :key="i"
                    :href="tool.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hub-tool-card"
                  >
                    <span class="hub-tool-title">{{ tool.title }}</span>
                    <p class="hub-tool-desc">{{ tool.description }}</p>
                    <div class="hub-tool-footer">
                      <span class="hub-tool-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 19h2v-7H3v2h2v5zm2 0h10v-2H7v2zm0-4h10v-2H7v2zm0-6h10V7H7v2z"/></svg></span>
                      <span v-if="tool.managedBy" class="hub-managed-badge">{{ $t('liensUtiles.managedBy.' + tool.managedBy) }}</span>
                    </div>
                  </a>
                </div>
              </template>
            </div>
          </Transition>
        </div>

        <!-- Qui gère : compact dans la même section -->
        <div class="hub-legend">
          <p class="hub-legend-title">{{ $t('liensUtiles.whoManages.title') }}</p>
          <div class="hub-legend-cards">
            <article class="hub-legend-card">
              <h4>{{ $t('liensUtiles.whoManages.dao.title') }}</h4>
              <p class="hub-legend-desc" v-html="$t('liensUtiles.whoManages.dao.description')"></p>
            </article>
            <article class="hub-legend-card">
              <h4>{{ $t('liensUtiles.whoManages.realt.title') }}</h4>
              <p>{{ $t('liensUtiles.whoManages.realt.description') }}</p>
            </article>
            <article class="hub-legend-card">
              <h4>{{ $t('liensUtiles.whoManages.community.title') }}</h4>
              <p>{{ $t('liensUtiles.whoManages.community.description') }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
const SECTION_IDS = ['rmm', 'yam', 'realtokens', 'reg']

const activeTab = ref('rmm')

const sectionsWithId = computed(() => {
  return SECTION_IDS.map((id) => {
    const data = tm(`liensUtiles.sections.${id}`)
    return data && data.title ? { id, ...data } : null
  }).filter(Boolean)
})

const sectionsDaoOnly = computed(() => {
  return sectionsWithId.value.map((section) => ({
    ...section,
    tools: (section.tools || []).filter((t) => t.managedBy !== 'community')
  }))
})

const communityTools = computed(() => {
  return sectionsWithId.value.flatMap((section) =>
    (section.tools || []).filter((t) => t.managedBy === 'community')
  )
})

const tabs = computed(() => {
  const list = sectionsDaoOnly.value.map((s) => ({
    id: s.id,
    label: s.title
  }))
  list.push({ id: 'community', label: tm('liensUtiles.communitySection.title') })
  return list
})

const activeSection = computed(() => {
  if (activeTab.value === 'community') return null
  return sectionsDaoOnly.value.find((s) => s.id === activeTab.value) || null
})
</script>

<style scoped>
.app-hub-page {
  color: #f8fbff;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  min-height: 100vh;
}

.hero {
  position: relative;
  padding: 48px min(8vw, 120px) 80px;
  background:
    linear-gradient(rgba(10, 31, 68, 0.88), rgba(10, 31, 68, 0.95)),
    url('https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?auto=format&fit=crop&w=1600&q=80')
      center/cover;
}

.hero--compact {
  padding: 32px min(8vw, 120px) 40px;
}

.hero-content {
  max-width: 720px;
  position: relative;
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

.hero h1 {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.1;
  margin: 16px 0 8px;
  color: #fff;
}

.hero--compact .lead {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.82);
  margin: 0;
}

/* Une seule section : onglets + contenu */
.hub-one-section {
  background: var(--color-navy);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 min(8vw, 120px) 48px;
}

.hub-one-inner {
  max-width: 1120px;
  margin: 0 auto;
}

/* Barre d’onglets */
.hub-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 24px 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 0;
}

.hub-tab {
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.hub-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 140, 66, 0.4);
  color: #fff;
}

.hub-tab--active {
  background: var(--color-orange);
  border-color: var(--color-orange);
  color: var(--color-navy, #0a1f44);
}

/* Panneau avec transition */
.hub-panel-wrap {
  min-height: 320px;
  padding: 28px 0 32px;
}

.hub-panel {
  overflow-y: auto;
  max-height: min(60vh, 520px);
  padding-right: 8px;
}

.hub-panel::-webkit-scrollbar {
  width: 8px;
}

.hub-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
}

.hub-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 140, 66, 0.4);
  border-radius: 4px;
}

/* Transition entre onglets */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.hub-panel-disclaimer {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px;
  line-height: 1.55;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-left: 3px solid var(--color-orange);
}

.hub-panel--community .hub-panel-disclaimer {
  background: rgba(180, 75, 70, 0.08);
  border-left-color: rgba(180, 75, 70, 0.5);
}

.hub-panel-main {
  margin-bottom: 24px;
}

.hub-main-card--link {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 22px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.hub-main-card--link:hover {
  border-color: rgba(255, 140, 66, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

.hub-main-card--link .app-link {
  margin-top: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-orange);
}

.hub-main-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-orange);
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(255, 140, 66, 0.4);
}

.hub-main-card--link h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0;
  color: #fff;
}

.hub-main-card--link p {
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.hub-panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.hub-tool-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.hub-tool-card:hover {
  border-color: rgba(255, 140, 66, 0.4);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.hub-tool-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: #fff;
}

.hub-tool-desc {
  font-size: 0.85rem;
  line-height: 1.45;
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
}

.hub-tool-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.hub-tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 140, 66, 0.15);
  color: var(--color-orange);
}

.hub-tool-card:hover .hub-tool-icon {
  background: rgba(255, 140, 66, 0.25);
}

.hub-managed-badge {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

/* Initiative hors DAO : fond rouge très léger pour les distinguer dans le thème */
.hub-tool-card--community {
  background: rgba(180, 75, 70, 0.06);
  border-color: rgba(180, 75, 70, 0.18);
}

.hub-tool-card--community:hover {
  background: rgba(180, 75, 70, 0.1);
  border-color: rgba(180, 75, 70, 0.28);
}

.hub-managed-badge--community {
  color: rgba(220, 140, 135, 0.95);
}

.hub-legend-desc :deep(a) {
  color: var(--color-orange);
  text-decoration: underline;
}

/* Bloc « Qui gère » compact */
.hub-legend {
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 8px;
}

.hub-legend-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px;
  letter-spacing: 0.02em;
}

.hub-legend-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.hub-legend-card {
  padding: 16px 18px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.hub-legend-card h4 {
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: #fff;
}

.hub-legend-card p {
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 900px) {
  .hub-legend-cards {
    grid-template-columns: 1fr;
  }

  .hub-tabs {
    gap: 6px;
  }

  .hub-tab {
    padding: 10px 14px;
    font-size: 0.88rem;
  }

  .hub-panel-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero,
  .hub-one-section {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }
}
</style>
