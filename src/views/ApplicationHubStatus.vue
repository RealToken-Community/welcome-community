<template>
  <div class="status-page">
    <header class="status-header">
      <div class="header-content">
        <p class="tag">{{ $t('appStatus.tag') }}</p>
        <h1>{{ $t('appStatus.pageTitle') }}</h1>
        <p class="lead">{{ $t('appStatus.pageDescription') }}</p>
      </div>
    </header>

    <section class="status-section">
      <div class="status-toolbar">
        <p v-if="checkedAt" class="checked-at">
          {{ $t('appStatus.checkedAt') }}: {{ checkedAtFormatted }}
        </p>
        <p class="summary">
          {{ $t('appStatus.summary', { ok: okCount, ko: koCount, total: rows.length }) }}
        </p>
      </div>

      <div v-if="loading" class="state">{{ $t('appStatus.loading') }}</div>
      <div v-else-if="error" class="state error">{{ error }}</div>
      <div v-else class="table-wrap">
        <table class="status-table">
          <thead>
            <tr>
              <th>{{ $t('appStatus.columns.title') }}</th>
              <th>{{ $t('appStatus.columns.url') }}</th>
              <th>{{ $t('appStatus.columns.status') }}</th>
              <th>{{ $t('appStatus.columns.http') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.url">
              <td>{{ row.title }}</td>
              <td>
                <a :href="row.url" target="_blank" rel="noopener noreferrer">{{ row.url }}</a>
              </td>
              <td>
                <span :class="['pill', row.displayOk ? 'ok' : 'ko']">
                  {{ row.displayOk ? 'OK' : 'KO' }}
                </span>
              </td>
              <td :class="{ 'http-soft-allowed': row.softAllowed && row.status === 403 }">{{ row.status ?? '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, locale } = useI18n()
const loading = ref(true)
const error = ref('')
const checkedAt = ref('')
const report = ref({ links: [] })

function getAllTools() {
  // Build a flat list of all Application Hub URLs with display titles.
  const sections = tm('liensUtiles.sections') || {}
  const entries = []
  for (const section of Object.values(sections)) {
    if (section?.main?.href) {
      entries.push({ title: section.main.title || 'Main', url: section.main.href })
    }
    for (const tool of section?.tools || []) {
      if (tool?.href) entries.push({ title: tool.title || 'Tool', url: tool.href })
    }
  }
  return entries
}

const rows = computed(() => {
  const titleByUrl = new Map(getAllTools().map((t) => [t.url, t.title]))
  return (report.value.links || []).map((item) => ({
    title: titleByUrl.get(item.url) || item.url,
    url: item.url,
    ok: !!item.ok,
    displayOk: !!item.ok || !!item.softAllowed,
    status: item.status,
    softAllowed: !!item.softAllowed
  }))
})

const okCount = computed(() => rows.value.filter((r) => r.displayOk).length)
const koCount = computed(() => rows.value.filter((r) => !r.displayOk).length)
const checkedAtFormatted = computed(() => formatCheckedAt(checkedAt.value))

/**
 * Format the status report timestamp for FR/EN display.
 */
function formatCheckedAt(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const language = String(locale.value || 'en').toLowerCase()
  const intlLocale = language.startsWith('fr') ? 'fr-FR' : 'en-US'
  return new Intl.DateTimeFormat(intlLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

async function loadReport() {
  // Load the latest link-check report generated during build.
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('/app-links-status.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    report.value = json && typeof json === 'object' ? json : { links: [] }
    checkedAt.value = report.value.checkedAt || ''
  } catch (e) {
    error.value = `Unable to load app-links-status.json: ${e.message || 'unknown error'}`
  } finally {
    loading.value = false
  }
}

onMounted(loadReport)
</script>

<style scoped>
.status-page { min-height: 100vh; background: linear-gradient(135deg, rgba(10,31,68,.98), rgba(5,15,36,.95)); color:#f8fbff; }
.status-header { padding: 48px min(8vw,120px) 56px; }
.header-content { max-width: 900px; margin: 0 auto; }
.tag { color: var(--color-orange); letter-spacing: .2em; text-transform: uppercase; font-size: .85rem; }
h1 { margin: 14px 0 10px; }
.lead { opacity: .85; }
.status-section { max-width: 1200px; margin: 0 auto; padding: 0 min(8vw,120px) 72px; }
.status-toolbar { display:flex; justify-content:space-between; gap:12px; margin-bottom:14px; font-size:.9rem; opacity:.9; flex-wrap: wrap; }
.table-wrap { overflow:auto; border:1px solid rgba(255,255,255,.12); border-radius:12px; }
.status-table { width:100%; border-collapse: collapse; min-width: 760px; background: rgba(255,255,255,.03); }
.status-table th, .status-table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,.08); text-align:left; vertical-align: top; }
.status-table a { color: var(--color-orange); }
.http-soft-allowed { color:#86efac; font-weight:700; }
.pill { display:inline-block; padding:4px 10px; border-radius:999px; font-size:.75rem; font-weight:700; }
.pill.ok { background: rgba(34,197,94,.2); color:#86efac; }
.pill.ko { background: rgba(239,68,68,.2); color:#fca5a5; }
.state { padding: 16px; border:1px solid rgba(255,255,255,.12); border-radius:10px; }
.state.error { border-color: rgba(239,68,68,.4); color:#fecaca; }
</style>
