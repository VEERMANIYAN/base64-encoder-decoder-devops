# Phase 1: Build stage (Optional lightweight node setup)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY src/ ./src/
RUN npm run build

# Phase 2: Production Web Server Stage using Nginx Alpine
FROM nginx:alpine
LABEL maintainer="Veermaniyan.B"
LABEL description="Base64 Encoder / Decoder Nginx Production Container"

# Copy custom Nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
