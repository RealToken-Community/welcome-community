# Realtoken Website

This project is the foundation of the website to present the Realtoken DAO.

A technology like WordPress was complicated to maintain on the community server, so a static technology like VueJS is perfect for creating a reliable, consistent, and scalable website foundation.

# Technologies

- VueJS 3 (https://vuejs.org/)
- Vite (https://vite.dev/)

## Run website with make

```sh
make dev-build   # Build 
make dev-run     # Run on port 5173
make dev-kill    # Stop container
make dev-logs    # Show container logs
```

### Sitemap (SEO)

The sitemap is generated automatically:

- **On each build** : `npm run build` runs `scripts/generate-sitemap.js` then `scripts/check-app-links.js`, then Vite. `public/sitemap.xml` and `public/app-links-status.json` match the last build/deploy (Application Hub status page uses this file).
- **On demand** : `npm run sitemap` regenerates only the sitemap; `npm run check:app-links` regenerates only the link status JSON.

To set the site base URL for production (e.g. `https://realtoken.community`), use either `SITEMAP_BASE_URL` or `VITE_SITE_URL` when building:

```sh
SITEMAP_BASE_URL=https://realtoken.community npm run build
```

### Application-hub check list URL 

Each url is check on build 

