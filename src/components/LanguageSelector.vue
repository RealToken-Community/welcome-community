<template>
  <div class="language-selector">
    <button 
      v-for="lang in languages" 
      :key="lang.code"
      :class="['lang-btn', { active: currentLocale === lang.code }]"
      @click="changeLanguage(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' }
]

const currentLocale = computed(() => locale.value)

const changeLanguage = (langCode) => {
  locale.value = langCode
  localStorage.setItem('locale', langCode)
}
</script>

<style scoped>
.language-selector {
  display: flex;
  gap: 4px;
  align-items: center;
}

.lang-btn {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.lang-btn:hover {
  border-color: var(--color-orange);
  color: var(--color-orange);
  background: rgba(255, 140, 66, 0.1);
}

.lang-btn.active {
  border-color: var(--color-orange);
  background: var(--color-orange);
  color: var(--color-navy);
  font-weight: 600;
}

@media (max-width: 768px) {
  .lang-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}
</style>

