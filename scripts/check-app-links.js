/**
 * Vérifie les URLs de l'Application Hub et génère un fichier de statut.
 * Les liens non accessibles (hors 2xx/3xx) pourront être masqués côté front.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const frLocalePath = join(rootDir, 'src', 'locales', 'fr.json')
const outPath = join(rootDir, 'public', 'app-links-status.json')

const timeoutMs = 12000
const GET_ONLY_DOMAINS = new Set([
  'dune.com',
  'www.dune.com'
])
const SOFT_ALLOW_RULES = [
  { domain: 'dune.com', status: 403 },
  { domain: 'www.dune.com', status: 403 }
]

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'))
}

function collectUrls(localeJson) {
  const sections = localeJson?.liensUtiles?.sections || {}
  const urls = new Set()

  for (const section of Object.values(sections)) {
    if (section?.main?.href) urls.add(section.main.href)
    for (const tool of section?.tools || []) {
      if (tool?.href) urls.add(tool.href)
    }
  }
  return [...urls]
}

/**
 * Returns true when a non-2xx/3xx status is accepted for display.
 */
function isSoftAllowed(hostname, status) {
  return SOFT_ALLOW_RULES.some((rule) => rule.domain === hostname && rule.status === status)
}

async function checkUrl(url) {
  // Return detailed health for one URL (status code + error).
  async function runAttempt() {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const hostname = new URL(url).hostname.toLowerCase()
      const forceGet = GET_ONLY_DOMAINS.has(hostname)
      // HEAD par defaut pour limiter la charge ; GET direct pour domaines connus.
      let method = forceGet ? 'GET' : 'HEAD'
      let response = await fetch(url, {
        method,
        redirect: 'follow',
        signal: controller.signal
      })

      if (!forceGet && (response.status === 405 || response.status === 501)) {
        method = 'GET'
        response = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          signal: controller.signal
        })
      }

      const ok = response.status >= 200 && response.status < 400
      const softAllowed = isSoftAllowed(hostname, response.status)
      return {
        ok,
        visible: ok || softAllowed,
        softAllowed,
        status: response.status,
        method,
        error: null
      }
    } catch (error) {
      return {
        ok: false,
        visible: false,
        softAllowed: false,
        status: null,
        method: null,
        error: error?.name === 'AbortError' ? `timeout (${timeoutMs}ms)` : (error?.message || 'network error')
      }
    } finally {
      clearTimeout(timer)
    }
  }

  const firstTry = await runAttempt()
  const shouldRetry = firstTry.status === null || firstTry.status >= 500

  if (!shouldRetry) return firstTry

  // Single retry to reduce false negatives on transient network/server issues.
  const secondTry = await runAttempt()
  if (secondTry.ok || secondTry.visible || secondTry.status !== null) {
    return secondTry
  }

  return firstTry
}

async function main() {
  // Generate a full Application Hub link-status report.
  const frJson = readJson(frLocalePath)
  const urls = collectUrls(frJson)
  const links = []

  for (const url of urls) {
    // eslint-disable-next-line no-await-in-loop
    const result = await checkUrl(url)
    links.push({ url, ...result })
  }

  mkdirSync(dirname(outPath), { recursive: true })
  const output = {
    checkedAt: new Date().toISOString(),
    total: links.length,
    links
  }
  writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf-8')
  console.log(`app-links-status.json generated (${urls.length} links checked)`)
}

main()
