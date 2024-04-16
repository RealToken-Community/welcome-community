FROM caddy:2.6.4-alpine

COPY *.html /usr/share/caddy/
COPY assets /usr/share/caddy/assets