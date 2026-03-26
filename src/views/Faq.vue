<template>
  <div class="faq-page">
    <header class="faq-header">
      <div class="header-content">
        <p class="tag">{{ $t('faq.tag') }}</p>
        <h1>{{ $t('faq.pageTitle') }}</h1>
        <p class="lead">{{ $t('faq.pageDescription') }}</p>
      </div>
    </header>

    <section class="faq-section">
      <div class="faq-list">
        <div
          v-for="(key, index) in faqItemKeys"
          :key="key"
          :id="faqAnchors[key]"
          class="faq-item"
          :class="{ open: openIndex === index }"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-answer-${index}`"
            :id="`faq-question-${index}`"
            @click="toggle(index)"
          >
            <span class="faq-question-text">{{ $t(`faq.items.${key}.question`) }}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 15.5l-5.5-5.5 1.41-1.41L12 12.67l4.09-4.08L17.5 10 12 15.5z"/>
              </svg>
            </span>
          </button>
          <div
            :id="`faq-answer-${index}`"
            class="faq-answer-wrapper"
            role="region"
            :aria-labelledby="`faq-question-${index}`"
          >
            <div class="faq-answer">
              <template v-for="(block, i) in answerBlocks(key)" :key="i">
                <p v-if="block.type === 'p'" class="faq-answer-p" v-html="block.text"></p>
                <ul v-else-if="block.type === 'ul'" class="faq-answer-list">
                  <li v-for="(item, j) in block.items" :key="j" v-html="item"></li>
                </ul>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const faqItemKeys = ref([
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
  'q6',
  'q7',
  'q8',
  'q9'
])

/** Ancres en anglais pour l’URL (/faq#slug) — partage et cohérence */
const faqAnchors = {
  q1: 'what-is-realtoken-dao',
  q2: 'realt-realtoken-link',
  q3: 'how-to-participate-dao',
  q4: 'what-is-rwa',
  q5: 'how-decisions-made-dao',
  q6: 'risks-rwa-dao',
  q7: 'propose-project-idea',
  q8: 'help-questions',
  q9: 'dao-beginners'
}

const openIndex = ref(null)

/** Ouvre la question correspondant au hash et scroll vers elle (lien reçu avec ancre) */
function openFromHash() {
  try {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    if (!hash) return
    const key = Object.keys(faqAnchors).find((k) => faqAnchors[k] === hash)
    if (!key) return
    const index = faqItemKeys.value.indexOf(key)
    if (index === -1) return
    openIndex.value = index
    nextTick(() => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  } catch (_) {
    // ne pas propager d’erreur pour éviter de casser le reste de l’app
  }
}

function toggle(index) {
  const isClosing = openIndex.value === index
  openIndex.value = isClosing ? null : index
  try {
    const key = faqItemKeys.value[index]
    const slug = key ? faqAnchors[key] : null
    if (slug) {
      const newHash = isClosing ? '' : '#' + slug
      const url = window.location.pathname + window.location.search + newHash
      window.history.replaceState(null, '', url)
    }
  } catch (_) {
    // ne pas propager d’erreur
  }
}

onMounted(() => {
  openFromHash()
  window.addEventListener('popstate', openFromHash)
})

onUnmounted(() => {
  window.removeEventListener('popstate', openFromHash)
})

const BULLET = '•'

function answerBlocks(key) {
  const raw = t(`faq.items.${key}.answer`)
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean)
  const blocks = []
  let currentList = []

  function flushList() {
    if (currentList.length) {
      blocks.push({ type: 'ul', items: currentList })
      currentList = []
    }
  }

  for (const line of lines) {
    const isBullet = line.startsWith(BULLET + ' ') || line.startsWith(BULLET)
    if (isBullet) {
      const text = (line.startsWith(BULLET + ' ') ? line.slice(2) : line.slice(1)).trim()
      if (text) currentList.push(text)
    } else {
      flushList()
      blocks.push({ type: 'p', text: line })
    }
  }
  flushList()
  return blocks
}
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.faq-header {
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

.faq-section {
  padding: 48px min(8vw, 120px) 96px;
  max-width: 920px;
  margin: 0 auto;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  /* Quand on arrive via un lien avec ancre, le scroll laisse de la place sous la nav fixe (72px) */
  scroll-margin-top: 88px;
}

.faq-item:hover {
  border-color: rgba(255, 140, 66, 0.25);
}

.faq-item.open {
  border-color: rgba(255, 140, 66, 0.4);
  box-shadow: 0 0 0 1px rgba(255, 140, 66, 0.15), 0 8px 24px rgba(0, 0, 0, 0.2);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  text-align: left;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.faq-question:hover {
  color: var(--color-orange);
  background: rgba(255, 255, 255, 0.03);
}

.faq-question-text {
  flex: 1;
  line-height: 1.4;
}

.faq-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 140, 66, 0.15);
  color: var(--color-orange);
  transition: transform 0.3s ease, background 0.2s ease;
}

.faq-icon svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.faq-item.open .faq-icon svg {
  transform: rotate(180deg);
}

.faq-item.open .faq-icon {
  background: rgba(255, 140, 66, 0.25);
}

.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease-out;
}

.faq-item.open .faq-answer-wrapper {
  grid-template-rows: 1fr;
}

.faq-answer {
  min-height: 0;
  overflow: hidden;
  padding-top: 4px;
}

.faq-answer-p,
.faq-answer p {
  margin: 0 24px 16px;
  padding-top: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
}

.faq-answer-p:first-child,
.faq-answer > p:first-child {
  margin-top: 0;
}

.faq-answer-list {
  margin: 0 24px 16px;
  padding-left: 1.5em;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
  list-style: disc;
}

.faq-answer-list li {
  margin-bottom: 6px;
}

.faq-answer-list li::marker {
  color: var(--color-orange);
}

.faq-answer :deep(a) {
  color: var(--color-orange);
  text-decoration: underline;
}
.faq-answer :deep(a:hover) {
  text-decoration: none;
}

.faq-answer > *:last-child {
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .faq-header,
  .faq-section {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }

  .faq-question {
    padding: 16px 20px;
    font-size: 1rem;
  }

  .faq-answer-p,
  .faq-answer p {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 12px;
  }

  .faq-answer-list {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 12px;
  }

  .faq-answer > *:last-child {
    margin-bottom: 20px;
  }
}
</style>
