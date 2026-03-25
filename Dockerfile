# STAGE 1: The Builder Environment
FROM alpine AS builder
WORKDIR /app

# This copies your HTML, CSS, and JS files (ignoring the README based on .dockerignore)
COPY . .

# STAGE 2: The Production Web Server
FROM nginx:alpine

# This copies the clean files from STAGE 1 directly into the Nginx public folder
COPY --from=builder /app /usr/share/nginx/html

# Opens the port so your browser can access index.html and login.html
EXPOSE 80