<template>
  <header class="nav-wrapper">
    <nav class="top-nav">
      <router-link to="/" class="logo" @click="closeAll">
        <img :src="logoImg" alt="RealToken DAO" class="logo-img" />
        <div>
          <span>{{ $t('logo.name') }}</span>
          <small>{{ $t('logo.subtitle') }}</small>
        </div>
      </router-link>

      <button
        type="button"
        class="hamburger"
        :class="{ active: menuOpen }"
        aria-label="Menu"
        aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-desktop">
        <div class="nav-links">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="nav-item"
            @mouseenter="openDropdown = item.id"
            @mouseleave="openDropdown = null"
          >
            <button
              type="button"
              class="nav-trigger"
              :class="{ active: openDropdown === item.id }"
              :aria-expanded="openDropdown === item.id"
              :aria-haspopup="true"
              @click="openDropdown = openDropdown === item.id ? null : item.id"
            >
              {{ $t(item.labelKey) }}
              <span class="chevron" aria-hidden="true"></span>
            </button>
            <Transition name="dropdown">
              <div
                v-show="openDropdown === item.id"
                class="dropdown"
                role="menu"
              >
                <router-link
                  v-for="child in item.routerChildren"
                  :key="child.labelKey"
                  :to="child.to"
                  class="dropdown-item"
                  role="menuitem"
                  @click="closeAll"
                >
                  {{ $t(child.labelKey) }}
                </router-link>
                <a
                  v-for="child in item.children"
                  :key="child.labelKey"
                  :href="child.href"
                  :target="child.external ? '_blank' : undefined"
                  :rel="child.external ? 'noopener noreferrer' : undefined"
                  class="dropdown-item"
                  role="menuitem"
                  @click="closeAll"
                >
                  {{ $t(child.labelKey) }}
                </a>
              </div>
            </Transition>
          </div>
        </div>
        <div class="nav-right">
          <LanguageSelector />
          <a href="mailto:marketing@realtoken.community" class="primary ghost">{{ $t('nav.contact') }}</a>
        </div>
      </div>
    </nav>

    <Transition name="menu">
      <div v-show="menuOpen" class="nav-mobile" aria-hidden="!menuOpen">
        <div class="nav-mobile-inner">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="mobile-group"
          >
            <button
              type="button"
              class="mobile-trigger"
              :aria-expanded="openMobile === item.id"
              @click="toggleMobile(item.id)"
            >
              {{ $t(item.labelKey) }}
              <span class="chevron" :class="{ open: openMobile === item.id }"></span>
            </button>
            <Transition name="accordion">
              <div v-show="openMobile === item.id" class="mobile-children">
                <router-link
                  v-for="child in item.routerChildren"
                  :key="child.labelKey"
                  :to="child.to"
                  class="mobile-link"
                  @click="closeAll"
                >
                  {{ $t(child.labelKey) }}
                </router-link>
                <a
                  v-for="child in item.children"
                  :key="child.labelKey"
                  :href="child.href"
                  :target="child.external ? '_blank' : undefined"
                  :rel="child.external ? 'noopener noreferrer' : undefined"
                  class="mobile-link"
                  @click="closeAll"
                >
                  {{ $t(child.labelKey) }}
                </a>
              </div>
            </Transition>
          </div>
          <div class="nav-mobile-actions">
            <LanguageSelector />
            <a href="mailto:marketing@realtoken.community" class="primary ghost">{{ $t('nav.contact') }}</a>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="openDropdown" class="dropdown-backdrop" @click="openDropdown = null" aria-hidden="true"></div>
    <div class="nav-spacer" aria-hidden="true"></div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageSelector from './LanguageSelector.vue'
import logoImg from '@/assets/logo-v3-orange.png'

const { locale } = useI18n()
const menuOpen = ref(false)
const openDropdown = ref(null)
const openMobile = ref(null)

const wikiUrl = computed(() =>
  locale.value === 'fr'
    ? 'https://wiki.realtoken.community/fr/home'
    : 'https://wiki.realtoken.community/en/home'
)

// Structure du menu : Applications, Projets RWA, Governance, Resources
const menuItems = computed(() => [
  {
    id: 'applications',
    labelKey: 'nav.menu.applications',
    children: [
      { labelKey: 'nav.menu.applicationsYam', href: 'https://yam.realtoken.network', external: true },
      { labelKey: 'nav.menu.applicationsRmm', href: 'https://rmm.realtoken.network/', external: true }
    ],
    routerChildren: [
      { labelKey: 'nav.menu.resourcesLiensUtiles', to: '/application-hub' }
    ]
  },
  {
    id: 'projets-rwa',
    labelKey: 'nav.menu.projetsRwa',
    children: [
      { labelKey: 'nav.menu.projetsRwaRealt', href: 'https://realt.co', external: true }
    ],
    routerChildren: []
  },
  {
    id: 'governance',
    labelKey: 'nav.menu.governance',
    children: [
      { labelKey: 'nav.menu.governanceForum', href: 'https://forum.realtoken.community/', external: true },
      { labelKey: 'nav.menu.governanceTally', href: 'https://www.tally.xyz/gov/realtoken-ecosystem-governance', external: true }
    ],
    routerChildren: [
      { labelKey: 'nav.menu.governanceReg', to: '/reg' },
      { labelKey: 'nav.menu.governanceComites', to: '/committee' }
    ]
  },
  {
    id: 'resources',
    labelKey: 'nav.menu.resources',
    children: [
      { labelKey: 'nav.menu.resourcesWiki', href: wikiUrl.value, external: true }
    ],
    routerChildren: [
      { labelKey: 'nav.menu.resourcesBlog', to: '/blog' },
      { labelKey: 'nav.menu.resourcesFaq', to: '/faq' }
    ]
  }
])

function closeAll() {
  menuOpen.value = false
  openDropdown.value = null
  openMobile.value = null
}

function toggleMobile(id) {
  openMobile.value = openMobile.value === id ? null : id
}

const closeOnEscape = (e) => {
  if (e.key === 'Escape') closeAll()
}

const closeOnResize = () => {
  if (window.innerWidth >= 1401) menuOpen.value = false
}

// Bloquer le scroll du body quand le menu mobile est ouvert (évite la barre de scroll en double)
watch(menuOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape)
  window.addEventListener('resize', closeOnResize)
})

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape)
  window.removeEventListener('resize', closeOnResize)
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
})
</script>

<style scoped>
.nav-wrapper {
  --nav-height: 72px;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: var(--nav-height);
  padding: 0 min(8vw, 120px);
  background: rgba(5, 15, 36, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  min-width: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  min-width: 0;
  flex: 1 1 auto;
}

.logo small {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  letter-spacing: 0.2em;
}

.logo-img {
  height: 44px;
  width: auto;
  display: block;
  flex-shrink: 0;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 32px;
  min-width: 0;
  flex-shrink: 1;
}

.nav-links {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  min-width: 0;
}

.nav-item {
  position: relative;
}

.nav-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}

.nav-trigger:hover,
.nav-trigger.active {
  color: var(--color-orange);
  background: rgba(255, 255, 255, 0.06);
}

.chevron {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  margin-bottom: 3px;
  transition: transform 0.2s ease;
}

.mobile-trigger .chevron.open {
  transform: rotate(-135deg);
  margin-bottom: -3px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  margin-top: 4px;
  padding: 8px 0;
  background: rgba(10, 31, 68, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  z-index: 1001;
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-orange);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
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

.primary.ghost {
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  background: transparent;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(255, 140, 66, 0.4);
}

.nav-spacer {
  height: var(--nav-height);
  pointer-events: none;
}

.hamburger {
  display: none;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  z-index: 1001;
  transition: transform 0.2s ease;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Menu mobile : scroll uniquement dans le panneau, pas de scroll sur le body */
.nav-mobile {
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(5, 15, 36, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.nav-mobile-inner {
  padding: 24px min(8vw, 120px) 48px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-group {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 0;
  font-size: 1.05rem;
  font-family: inherit;
  color: rgba(255, 255, 255, 0.95);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
}

.mobile-trigger:hover {
  color: var(--color-orange);
}

.mobile-children {
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  padding-left: 12px;
}

.mobile-link {
  padding: 10px 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mobile-link:hover {
  color: var(--color-orange);
}

.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 0.2s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
}

.nav-mobile-actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

/* Menu hamburger dès 1400px pour éviter que Ressources / EN-FR / Contact se superposent */
@media (max-width: 1400px) {
  .hamburger {
    display: flex;
  }

  .nav-desktop {
    display: none;
  }
}

/* Barre plus compacte sur petites largeurs */
@media (max-width: 768px) {
  .top-nav {
    padding-left: 16px;
    padding-right: 16px;
    gap: 8px;
  }

  .logo > div span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }

  .logo > div small {
    display: none;
  }
}

@media (max-width: 480px) {
  .logo > div span {
    max-width: 90px;
  }
}

@media (min-width: 1401px) {
  .nav-mobile {
    display: none !important;
  }
}
</style>
