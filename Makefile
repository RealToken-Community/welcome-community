COMPOSE=docker compose

.PHONY: dev-build dev-run dev-kill dev-logs

dev-build:
	$(COMPOSE) build

dev-run:
	npm run sitemap && $(COMPOSE) up

dev-kill:
	$(COMPOSE) down

dev-logs:
	$(COMPOSE) logs -f

