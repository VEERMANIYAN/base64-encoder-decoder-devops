# Application & DevOps Architecture Document

**Project:** Base64 Encoder / Decoder Application with Complete DevOps CI/CD Pipeline  
**Author:** Veermaniyan.B  
**Institution:** BE Computer Science Engineering  

---

## 1. High-Level Architecture Overview

The system is structured as a zero-backend, client-side web application integrated with an automated DevOps pipeline leveraging **Git**, **GitHub**, **Jenkins**, **Node.js**, **Docker**, and **Nginx**.

```mermaid
flowchart TD
    subgraph Developer Workspace
        DEV[Developer - Veermaniyan.B]
        GIT[Git Local Repository]
    end

    subgraph Version Control System
        GH_FEAT[feature/* branch]
        GH_DEV[develop branch]
        GH_MAIN[main branch]
        PR[GitHub Pull Request / Webhook]
    end

    subgraph Automation & CI/CD Engine
        JENKINS[Jenkins Automation Server]
        S1[Stage 1: Checkout]
        S2[Stage 2: Install Dependencies]
        S3[Stage 3: Syntax Lint & Validate]
        S4[Stage 4: Automated Unit Tests]
        S5[Stage 5: Production Build]
        S6[Stage 6: Artifact Archival]
        S7[Stage 7: Deployment]
        S8[Stage 8: Smoke Verification]
    end

    subgraph Production Runtime Environment
        DIST[Production Package dist/]
        ZIP[base64-encoder-decoder-build.zip]
        NGINX[Nginx / Docker Web Server]
        USER[End User Browser]
    end

    DEV -->|git commit & push| GIT
    GIT -->|Push Code| GH_FEAT
    GH_FEAT -->|Pull Request| GH_DEV
    GH_DEV -->|Merge Trigger| GH_MAIN
    GH_MAIN -->|Webhook Notification| JENKINS

    JENKINS --> S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7 --> S8
    S5 --> DIST & ZIP
    S7 --> NGINX
    NGINX --> USER
```

---

## 2. Component Description

### 2.1 Web Application (Client-Side)
- **HTML5:** Semantic document structure, accessibility attributes, accessible form controls.
- **CSS3:** Responsive layout using CSS Flexbox/Grid, CSS custom variables (design tokens), glassmorphism aesthetic, pulse animations.
- **JavaScript (ES6+):** Pure client-side processing using `TextEncoder`/`TextDecoder` APIs for UTF-8 Unicode compliance, `FileReader` API for document encoding, and Blob/URL APIs for file decoding.

### 2.2 Version Control & Branching Strategy
- **`main`:** Production-ready code only.
- **`develop`:** Staging / integration branch for testing feature combinations.
- **`feature/*`:** Isolated branches for individual development tickets (e.g. `feature/ui`, `feature/file-processing`).

### 2.3 Automation & CI/CD Pipeline (Jenkins)
- **Declarative Jenkinsfile:** 8 distinct pipeline stages defining strict quality gates. Failure at any stage aborts execution immediately.
