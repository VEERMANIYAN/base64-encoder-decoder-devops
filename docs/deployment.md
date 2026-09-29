# Deployment & Operations Guide

**Project:** Base64 Encoder / Decoder DevOps Pipeline  
**Author:** Veermaniyan.B  

---

## 1. Deployment Overview

The application supports two primary deployment modes suitable for academic demonstration and production staging:

1. **Direct Web Server Deployment (Static Bundle):** Unpacking `base64-encoder-decoder-build.zip` directly into an Nginx / IIS / Apache web root.
2. **Containerized Container Deployment (Docker & Nginx):** Packaging static files into an Nginx Docker image.

---

## 2. Docker Deployment Commands

### Step 1: Build Docker Image
```powershell
docker build -t base64-encoder-decoder:v1.0.0 -f docker/Dockerfile .
```

### Step 2: Run Container
```powershell
docker run -d -p 8080:80 --name base64_app base64-encoder-decoder:v1.0.0
```

### Step 3: Verify Running Container
```powershell
docker ps
```

### Step 4: Access Application
Open your browser at: `http://localhost:8080`

### Step 5: Stop and Remove Container
```powershell
docker stop base64_app
docker rm base64_app
```

---

## 3. Docker Compose Deployment

Alternative single-command container orchestration:
```powershell
# Launch Container
docker-compose up -d --build

# Shutdown Container
docker-compose down
```
