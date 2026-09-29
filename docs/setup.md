# Setup & Installation Guide

**Project:** Base64 Encoder / Decoder DevOps Pipeline  
**Author:** Veermaniyan.B  

---

## 1. Prerequisites & Required Tools

Ensure the following tools are installed on your workstation (Windows 10/11):

| Tool | Recommended Version | Download / Verification Command |
| :--- | :--- | :--- |
| **Git** | 2.40+ | `git --version` |
| **Node.js** | 18.x or 20.x LTS | `node -v` |
| **npm** | 9.x+ | `npm -v` |
| **Jenkins** | 2.400+ LTS | `http://localhost:8080` |
| **VS Code** | Latest | Recommended IDE |
| **Docker Desktop** | Optional (for container deployment) | `docker --version` |

---

## 2. Local Environment Setup

### Step 1: Clone or Open Workspace
In PowerShell / VS Code Terminal:
```powershell
cd "e:\Cloud project"
```

### Step 2: Install Node Dependencies
```powershell
npm install
```

### Step 3: Run Local Development Server
To launch the application locally without a backend:
```powershell
npm start
```
Open your browser at `http://localhost:8080`.

---

## 3. Jenkins Installation & Job Setup (Windows)

1. **Download Jenkins WAR / Installer:** Download Jenkins LTS for Windows or run via Java:
   ```powershell
   java -jar jenkins.war --httpPort=8080
   ```
2. **Initial Setup:** Open `http://localhost:8080`, retrieve initial admin password from `%USERPROFILE%\.jenkins\secrets\initialAdminPassword`.
3. **Install Plugins:** Install **Git Plugin**, **Pipeline Plugin**, and **GitHub Plugin**.
4. **Create Pipeline Job:**
   - Click **New Item** -> Enter name `base64-encoder-decoder-pipeline` -> Select **Pipeline**.
   - Under **Definition**, select **Pipeline script from SCM**.
   - Choose **Git**, set Repository URL to `https://github.com/YOUR_GITHUB_USERNAME/base64-encoder-decoder-devops.git`.
   - Set Script Path to `Jenkinsfile`.
5. **Trigger First Build:** Click **Build Now**.
