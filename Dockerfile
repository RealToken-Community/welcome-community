FROM node:24-alpine AS build

WORKDIR /app

# Install deps
COPY package*.json ./

RUN npm ci

# Build app
COPY . .
RUN npm run build

# Runtime
FROM nginx:1.27-alpine

# SPA fallback for Vue Router history mode
RUN printf '%s\n' \
'server {' \
'  listen 80;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'  location / {' \
'    try_files $uri $uri/ /index.html;' \
'  }' \
'}' > /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]