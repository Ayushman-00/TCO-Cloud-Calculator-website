# Cloud TCO Calculator
Overview

Cloud TCO Calculator is a browser-based application that estimates the Total Cost of Ownership (TCO) of running workloads on-premises versus major cloud providers. It enables organizations to compare infrastructure costs, operational expenses, migration costs, and long-term financial impact before making cloud adoption decisions.

The application performs all cost calculations directly in the browser while using Supabase Authentication for secure user login.

Features
Multi-year TCO comparison (1–10 years)
Compare On-Premises vs Cloud infrastructure
Support for AWS, Azure and Google Cloud regions
Infrastructure sizing using predefined instance catalogs
Storage cost estimation
Network and data transfer estimation
Migration complexity modeling
Currency conversion (USD / INR)
Interactive cost visualization
User authentication using Supabase
Responsive interface
Docker support
Kubernetes manifests
Helm Chart deployment
GitHub Actions CI/CD pipeline
Tech Stack
Category	Technology
Frontend	HTML, CSS, JavaScript
Authentication	Supabase
Charts	Chart.js
Deployment	Docker
Container Orchestration	Kubernetes
Package Manager	Helm
CI/CD	GitHub Actions
Project Structure
.
├── app.js
├── data.js
├── index.html
├── login.html
├── style.css
├── Dockerfile
├── k8s/
├── tco-cloud-calculator-chart/
└── .github/workflows/
Architecture
User

↓

Login (Supabase)

↓

Cloud TCO Calculator

↓

Calculation Engine

↓

Cost Comparison

↓

Charts & Reports
Running Locally
git clone https://github.com/Ayushman-00/TCO-Cloud-Calculator-website.git

cd TCO-Cloud-Calculator-website

Open

index.html

or serve using any static server.

Example

python -m http.server
Docker
docker build -t tco-calculator .

docker run -p 8080:80 tco-calculator
Kubernetes
kubectl apply -f k8s/manifests/
Helm
helm install tco tco-cloud-calculator-chart/
Current Limitations
Pricing values are based on static reference datasets and may not always reflect the latest cloud provider pricing.
This application is intended for estimation purposes and should not be considered a replacement for official cloud pricing calculators.
Some enterprise pricing scenarios and provider-specific discounts are not currently modeled.
Future Improvements
AWS Pricing API integration
Azure Retail Pricing API
Google Cloud Billing API
Scenario comparison
PDF report export
Saved calculations
Cost optimization recommendations
AI-assisted migration suggestions
License

MIT License
