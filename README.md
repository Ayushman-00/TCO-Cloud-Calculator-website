# ☁️ Cloud TCO Calculator

A web-based **Cloud Total Cost of Ownership (TCO) Calculator** that helps users estimate and compare the long-term cost of migrating infrastructure from on-premises environments to major cloud providers.

The application provides an interactive interface for estimating infrastructure costs, storage expenses, migration costs, and operational expenses over multiple years. It also includes user authentication, visualization of results, and deployment support using Docker and Kubernetes.

---

## 📌 Features

- 🔐 User Authentication using Supabase
- ☁️ Cloud cost estimation
- 🖥️ On-Premises vs Cloud comparison
- 📊 Interactive charts and cost visualization
- 💾 Storage cost estimation
- 🌍 Multiple cloud regions support
- 💱 Currency conversion support
- 📈 Multi-year TCO calculation
- 📦 Docker support
- ☸️ Kubernetes deployment manifests
- 🚀 Helm Chart deployment
- 🔄 GitHub Actions CI/CD Workflow

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

# Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Authentication | Supabase |
| Charts | Chart.js |
| Deployment | Docker |
| Container Orchestration | Kubernetes |
| Package Manager | Helm |
| CI/CD | GitHub Actions |

---

# Project Structure

```
TCO-Cloud-Calculator-website
│
├── .github/
│   └── workflows/
│
├── k8s/
│
├── tco-cloud-calculator-chart/
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

# How It Works

```
                User
                  │
                  ▼
          Login (Supabase)
                  │
                  ▼
        Cloud TCO Calculator
                  │
                  ▼
      Cost Calculation Engine
                  │
                  ▼
       Generate Cost Analysis
                  │
                  ▼
          Charts & Results
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Ayushman-00/TCO-Cloud-Calculator-website.git

cd TCO-Cloud-Calculator-website
```

---

## Run Locally

Since this is a frontend application, simply start a local web server.

Python

```bash
python -m http.server
```

Node

```bash
npx serve .
```

Then open

```
http://localhost:8000
```

or

```
http://localhost:3000
```

depending on the server.

---

# Docker

Build image

```bash
docker build -t cloud-tco-calculator .
```

Run

```bash
docker run -d -p 8080:80 cloud-tco-calculator
```

Open

```
http://localhost:8080
```

---

# Kubernetes

Deploy using manifests

```bash
kubectl apply -f k8s/
```

---

# Helm Deployment

Install chart

```bash
helm install cloud-tco ./tco-cloud-calculator-chart
```

Upgrade

```bash
helm upgrade cloud-tco ./tco-cloud-calculator-chart
```

---

# Cost Parameters Considered

The calculator estimates costs based on:

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

# Supported Cloud Providers

- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud Platform (GCP)

---

# Current Limitations

- Uses a predefined pricing dataset rather than live cloud pricing APIs.
- Enterprise discounts and reserved instance pricing are not currently included.
- Intended for educational and estimation purposes.

---

# Future Enhancements

- AWS Pricing API integration
- Azure Retail Pricing API
- Google Cloud Billing API
- PDF report export
- CSV export
- Saved calculations
- User dashboard
- Cost optimization recommendations
- AI-based migration suggestions
- Dark mode
- Scenario comparison

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

This project is licensed under the MIT License.

---

# Author

**Ayushman**

GitHub: https://github.com/Ayushman-00

---

## ⭐ If you found this project useful, consider giving it a star!
