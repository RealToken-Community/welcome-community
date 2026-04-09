<template>
  <div class="not-found-page">
    <section class="not-found-section">
      <p class="tag">404</p>
      <h1>{{ $t('notFound.title') }}</h1>
      <p class="lead">{{ $t('notFound.description') }}</p>
      <router-link to="/" class="home-link">
        {{ $t('notFound.goHome') }}
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(10, 31, 68, 0.98), rgba(5, 15, 36, 0.95));
  color: #f8fbff;
}

.not-found-section {
  max-width: 760px;
  margin: 0 auto;
  padding: 88px min(8vw, 120px) 120px;
  text-align: center;
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
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  line-height: 1.15;
  margin: 20px 0 12px;
  color: #fff;
}

.lead {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.86);
  margin: 0 auto 28px;
  max-width: 640px;
}

.home-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 999px;
  background: rgba(255, 140, 66, 0.16);
  border: 1px solid rgba(255, 140, 66, 0.5);
  color: var(--color-orange);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.home-link:hover {
  transform: translateY(-1px);
  background: rgba(255, 140, 66, 0.24);
}
</style>
