# ☁️ Cloud TCO Calculator — End-to-End DevOps Deployment Pipeline

A **cloud cost estimation tool built as a showcase of a complete DevOps workflow** — from containerization to Kubernetes orchestration, Helm packaging, and automated CI/CD. The application itself (a Cloud TCO Calculator) is the vehicle; the real focus of this project is the **deployment pipeline** around it.

---

## 🧭 What This Project Demonstrates

| Stage | Tooling |
|-------|---------|
| Containerization | Docker |
| Orchestration | Kubernetes (raw manifests) |
| Package Management | Helm Charts |
| Continuous Integration / Delivery | GitHub Actions |
| Auth Layer | Supabase |
| Frontend | HTML5, CSS3, JavaScript, Chart.js |

The goal is to model a realistic path from **source code → container → cluster**, with a working frontend app as the payload.

---

## 🔄 DevOps Workflow Overview

```
        Source Code (HTML/CSS/JS)
                  │
                  ▼
        GitHub Actions CI/CD
                  │
                  ▼
           Docker Build
                  │
                  ▼
        Container Registry
                  │
                  ▼
   ┌──────────────┴──────────────┐
   ▼                             ▼
Kubernetes Manifests        Helm Chart
   │                             │
   ▼                             ▼
        Deployed to Cluster
                  │
                  ▼
        Cloud TCO Calculator (App)
```

---

## 📌 Application Features (the workload being deployed)

- 🔐 User Authentication using Supabase
- ☁️ Cloud cost estimation (AWS, Azure, GCP)
- 🖥️ On-Premises vs Cloud comparison
- 📊 Interactive charts and cost visualization
- 💾 Storage cost estimation
- 🌍 Multiple cloud regions support
- 💱 Currency conversion support
- 📈 Multi-year TCO calculation

---

# Preview

> Add screenshots here

### Login Page
```
images/login.png
```

### Calculator
```
images/calculator.png
```

### Results
```
images/results.png
```

---

# Project Structure

```
TCO-Cloud-Calculator-website
│
├── .github/
│   └── workflows/          # CI/CD pipeline definitions
│
├── k8s/                     # Kubernetes manifests
│
├── tco-cloud-calculator-chart/   # Helm chart
│
├── app.js
├── data.js
├── index.html
├── login.html
├── style.css
├── Dockerfile
└── README.md
```

---

# Deployment Guide

## 1. Clone Repository

```bash
git clone https://github.com/Ayushman-00/TCO-Cloud-Calculator-website.git
cd TCO-Cloud-Calculator-website
```

## 2. Build & Run with Docker

```bash
docker build -t cloud-tco-calculator .
docker run -d -p 8080:80 cloud-tco-calculator
```
Open: `http://localhost:8080`

## 3. Deploy to Kubernetes

```bash
kubectl apply -f k8s/
```

## 4. Deploy via Helm

```bash
helm install cloud-tco ./tco-cloud-calculator-chart
# to upgrade later:
helm upgrade cloud-tco ./tco-cloud-calculator-chart
```

## 5. CI/CD

GitHub Actions workflows in `.github/workflows/` automatically build and validate the container image on push.

---

## Run Locally Without Docker (optional, for quick frontend checks)

```bash
python -m http.server
# or
npx serve .
```

---

# Cost Parameters Considered (App Logic)

- Compute Instances
- Storage
- Data Transfer
- Migration Cost
- Operational Cost
- Infrastructure Maintenance
- Cloud Provider Pricing
- Region Selection
- Usage Duration
- Currency Conversion

---

# Current Limitations

- Uses a predefined pricing dataset rather than live cloud pricing APIs.
- Enterprise discounts and reserved instance pricing are not currently included.
- Intended as a DevOps pipeline demo and for educational/estimation purposes.

---

# Future Enhancements

- AWS Pricing API / Azure Retail Pricing API / GCP Billing API integration
- PDF/CSV export
- Saved calculations & user dashboard
- Cost optimization recommendations
- Dark mode
- Scenario comparison
- Multi-environment (staging/prod) Helm values
- Automated image scanning in CI

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes
   ```bash
   git commit -m "Added new feature"
   ```
4. Push
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request

---

# License

MIT License

---

# Author

**Ayushman**
GitHub: https://github.com/Ayushman-00

---

## ⭐ If you found this project useful, consider giving it a star!
