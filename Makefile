COMPOSE_DEV=docker compose -f docker-compose-dev.yml

.PHONY: dev-build dev-run dev-kill dev-logs cron-install cron-remove cron-status

dev-build:
	$(COMPOSE_DEV) build

dev-run:
	npm run sitemap && $(COMPOSE_DEV) up

dev-kill:
	$(COMPOSE_DEV) down

dev-logs:
	$(COMPOSE_DEV) logs -f

cron-install:
	./scripts/manage-app-links-cron.sh install

cron-remove:
	./scripts/manage-app-links-cron.sh remove

cron-status:
	./scripts/manage-app-links-cron.sh status