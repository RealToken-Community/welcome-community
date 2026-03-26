<template>
  <footer class="site-footer">
    <div class="footer-wave" aria-hidden="true"></div>

    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <router-link to="/" class="footer-logo">
            <img :src="logoImg" alt="RealToken DAO" class="footer-logo-img" />
            <div class="footer-logo-text">
              <span>{{ $t('logo.name') }}</span>
              <small>{{ $t('logo.subtitle') }}</small>
            </div>
          </router-link>
          <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
          <div class="footer-social">
            <span class="footer-social-label">{{ $t('footer.followUs') }}</span>
            <div class="footer-social-icons">
              <a
                v-for="social in socialLinks"
                :key="social.id"
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-link"
              >
                <span class="footer-social-icon" v-html="social.svg"></span>
              </a>
            </div>
          </div>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <div class="footer-col">
            <h4 class="footer-col-title">{{ $t('footer.applications') }}</h4>
            <ul>
              <li><a href="https://rmm.realtoken.network/" target="_blank" rel="noopener noreferrer">RMM</a></li>
              <li><a href="https://yam.realtoken.network" target="_blank" rel="noopener noreferrer">YAM</a></li>
              <li><a href="https://bridge.realtoken.network/" target="_blank" rel="noopener noreferrer">{{ $t('nav.menu.applicationsBridge') }}</a></li>
              <li><a href="https://dashboard.realtoken.community/" target="_blank" rel="noopener noreferrer">{{ $t('nav.menu.applicationsDashboard') }}</a></li>
              <li><router-link to="/application-hub">{{ $t('nav.menu.resourcesLiensUtiles') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">{{ $t('footer.governance') }}</h4>
            <ul>
              <li><a href="https://www.tally.xyz/gov/realtoken-ecosystem-governance" target="_blank" rel="noopener noreferrer">{{ $t('nav.menu.governanceTally') }}</a></li>
              <li><a href="https://forum.realtoken.community/" target="_blank" rel="noopener noreferrer">{{ $t('footer.forum') }}</a></li>
              <li><router-link to="/reg">{{ $t('nav.menu.governanceReg') }}</router-link></li>
              <li><router-link to="/committee">{{ $t('nav.menu.governanceComites') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">{{ $t('footer.resources') }}</h4>
            <ul>
              <li><router-link to="/blog">{{ $t('footer.blog') }}</router-link></li>
              <li><a :href="wikiUrl" target="_blank" rel="noopener noreferrer">{{ $t('footer.wiki') }}</a></li>
              <li><router-link to="/faq">{{ $t('footer.faq') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-col-title">{{ $t('footer.legal') }}</h4>
            <ul>
              <li><router-link to="/privacy">{{ $t('footer.privacy') }}</router-link></li>
              <li><router-link to="/legal-notice">{{ $t('footer.terms') }}</router-link></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import logoImg from '@/assets/logo-v3-orange.png'

const { locale } = useI18n()

const wikiUrl = computed(() =>
  locale.value === 'fr'
    ? 'https://wiki.realtoken.community/fr/home'
    : 'https://wiki.realtoken.community/en/home'
)

// Icônes SVG en chaînes pour affichage via v-html (évite le runtime compiler)
const svgTwitter = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
const svgCoinGecko = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10zm-1-6v2h2v-2h-2zm0-4v2h2v-2h-2zm0-4v2h2V8h-2z"/></svg>'
const svgDeBank = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45v6.9L12 18.82l-6.9-3.45v-6.9L12 4.18z"/></svg>'
const svgTelegram = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
const svgGitHub = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>'

const socialLinks = [
  { id: 'x', label: 'X', href: 'https://x.com/RealTokenDAO', svg: svgTwitter },
  { id: 'coingecko', label: 'CoinGecko', href: 'https://www.coingecko.com/fr/coins/realtoken-ecosystem-governance', svg: svgCoinGecko },
  { id: 'debank', label: 'DeBank', href: 'https://debank.com/official/Realtoken_DAO', svg: svgDeBank },
  { id: 'telegram', label: 'Telegram', href: 'https://t.me/realtokendao_official', svg: svgTelegram },
  { id: 'github', label: 'GitHub', href: 'https://github.com/RealToken-Community', svg: svgGitHub }
]

</script>

<style scoped>
.site-footer {
  position: relative;
  margin-top: auto;
  background: linear-gradient(180deg, #030a18 0%, #050f24 40%, #0a1f44 100%);
  color: rgba(255, 255, 255, 0.88);
}

.footer-wave {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 140, 66, 0.15) 20%,
    rgba(255, 140, 66, 0.4) 50%,
    rgba(255, 140, 66, 0.15) 80%,
    transparent 100%
  );
  opacity: 0.9;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px min(8vw, 80px) 0;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 64px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.footer-logo:hover {
  color: var(--color-orange);
}

.footer-logo-img {
  height: 48px;
  width: auto;
  display: block;
  flex-shrink: 0;
}

.footer-logo-text span {
  display: block;
  font-size: 1rem;
}

.footer-logo-text small {
  display: block;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2em;
  font-weight: 500;
}

.footer-tagline {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  max-width: 280px;
  margin: 0;
}

.footer-social {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-social-label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.footer-social-icons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.footer-social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer-social-icon :deep(svg) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.footer-social-link:hover {
  color: var(--color-orange);
  background: rgba(255, 140, 66, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 140, 66, 0.2);
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.footer-col-title {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-orange);
  margin: 0 0 20px;
}

.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer-col li {
  margin-bottom: 12px;
}

.footer-col a {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.footer-col a:hover {
  color: var(--color-orange);
  padding-left: 4px;
}

.footer-bottom {
  padding: 24px 0 32px;
}

.footer-copyright {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
  text-align: center;
}

@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .footer-nav {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .footer-inner {
    padding-left: min(6vw, 24px);
    padding-right: min(6vw, 24px);
  }

  .footer-top {
    padding-bottom: 32px;
  }

  .footer-nav {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-social-icons {
    justify-content: flex-start;
  }

  .footer-bottom {
    padding: 20px 0 28px;
  }
}
</style>
