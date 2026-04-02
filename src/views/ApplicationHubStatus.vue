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
        <div class="summary">
          <span class="summary-item summary-item-ok"><span aria-hidden="true">✓</span> {{ okCount }}</span>
          <span class="summary-item summary-item-ko"><span aria-hidden="true">✕</span> {{ koCount }}</span>
        </div>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.url" class="status-row">
              <td class="td-title" :data-label="$t('appStatus.columns.title')">{{ row.title }}</td>
              <td class="td-url" :data-label="$t('appStatus.columns.url')">
                <a :href="row.url" target="_blank" rel="noopener noreferrer">{{ row.url }}</a>
              </td>
              <td class="td-status" :data-label="$t('appStatus.columns.status')">
                <span class="pill-wrap" :data-tooltip="buildStatusTooltip(row)">
                  <span :class="['pill', row.displayOk ? 'ok' : 'ko']">
                    <span class="status-icon" aria-hidden="true">{{ row.displayOk ? '✓' : '✕' }}</span>
                    <span class="sr-only">{{ row.displayOk ? 'OK' : 'KO' }}</span>
                  </span>
                </span>
              </td>
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

/**
 * Build tooltip text displayed on status badge hover.
 */
function buildStatusTooltip(row) {
  if (row.status == null) return 'HTTP: timeout'
  return `HTTP: ${row.status}`
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
.summary { display:flex; gap:10px; align-items:center; }
.summary-item { display:inline-flex; align-items:center; gap:6px; font-weight:700; border-radius:999px; padding:4px 10px; }
.summary-item-ok { background: rgba(34,197,94,.2); color:#86efac; }
.summary-item-ko { background: rgba(239,68,68,.2); color:#fca5a5; }
.table-wrap { overflow: hidden; border:1px solid rgba(255,255,255,.12); border-radius:12px; }
.status-table { width:100%; border-collapse: collapse; table-layout: fixed; background: rgba(255,255,255,.03); }
.status-table th, .status-table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,.08); text-align:left; vertical-align: top; }
.status-table th:nth-child(1), .status-table td:nth-child(1) { width: 30%; }
.status-table th:nth-child(2), .status-table td:nth-child(2) { width: 55%; }
.status-table th:nth-child(3), .status-table td:nth-child(3) { width: 15%; text-align: center; }
.status-table a { color: var(--color-orange); display: block; overflow-wrap: anywhere; word-break: break-word; }
.pill-wrap { position: relative; display: inline-block; }
.pill { display:inline-block; padding:4px 10px; border-radius:999px; font-size:.75rem; font-weight:700; }
.pill.ok { background: rgba(34,197,94,.2); color:#86efac; }
.pill.ko { background: rgba(239,68,68,.2); color:#fca5a5; }
.status-icon { font-size: 0.9rem; line-height: 1; display: inline-block; min-width: 0.9rem; text-align: center; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.pill-wrap::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.95);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
  z-index: 10;
}
.pill-wrap:hover::after { opacity: 1; }
.state { padding: 16px; border:1px solid rgba(255,255,255,.12); border-radius:10px; }
.state.error { border-color: rgba(239,68,68,.4); color:#fecaca; }

@media (max-width: 900px) {
  .table-wrap { border: 0; }
  .status-table,
  .status-table thead,
  .status-table tbody,
  .status-table td { display: block; width: 100%; }
  .status-table thead { display: none; }
  .status-table .status-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "title status"
      "url status";
    align-items: start;
    gap: 8px 12px;
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 12px;
    margin-bottom: 10px;
    background: rgba(255,255,255,.04);
    padding: 10px 12px;
  }
  .status-table td {
    border: 0;
    padding: 0;
    text-align: left !important;
  }
  .status-table .td-title { grid-area: title; font-weight: 700; color: #fff; }
  .status-table .td-url { grid-area: url; }
  .status-table .td-status {
    grid-area: status;
    justify-self: end;
    align-self: center;
    padding-right: 20px;
    margin-right: 8px;
  }
  .status-table .td-url a { display: block; width: 100%; overflow-wrap: anywhere; word-break: break-word; }
  .status-table .td-url { display: none; }
}
</style>
