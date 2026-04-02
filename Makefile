COMPOSE_DEV=docker compose -f docker-compose-dev.yml

.PHONY: dev-build dev-run dev-kill dev-logs

dev-build:
	$(COMPOSE_DEV) build

dev-run:
	npm run sitemap && $(COMPOSE_DEV) up

dev-kill:
	$(COMPOSE_DEV) down

dev-logs:
	$(COMPOSE_DEV) logs -f
