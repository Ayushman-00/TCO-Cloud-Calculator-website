# ☁️ Cloud TCO Calculator

A browser-based **Total Cost of Ownership (TCO) calculator** that compares **on-premises infrastructure** against **cloud hosting** over a multi-year period.

This project is implemented as a **single self-contained HTML file** (no backend, no frameworks) and runs entirely in the browser.

---


---

## 📌 What This Tool Does

The calculator helps estimate and compare:

### On-Premises Costs
- Servers
- Storage
- Network equipment
- Power & cooling
- IT staff
- Datacenter space
- Hardware maintenance
- Hardware refresh cycles

### Cloud Costs
- Compute (VMs, containers, serverless)
- Storage
- Network & data transfer
- Other managed services (databases, AI, monitoring, etc.)

The tool calculates:
- Total 5–10 year cost
- Annual cost
- Cost breakdown
- Which option is cheaper
- Savings percentage

---

## 🧮 How It Works

All calculations are performed using current cost

- On-prem hardware costs are amortized and refreshed based on the refresh cycle.
- Operating costs are applied annually.
- Cloud costs are calculated from monthly spend × 12 × number of years.
- The cheaper option is selected as the recommended solution.

No data is sent anywhere — everything runs locally in your browser.

---

## 🛠 How to Run

1. Download or clone this repository

   *(Chrome, Edge, Firefox, Safari)*

That’s it.

No server, no build step, no installation.

---

## 📂 Project Structure





---

## 🎯 Intended Use

This tool is useful for:
- Cloud migration planning
- Cost modeling
- Architecture discussions
- Sales engineering
- Finance & IT comparisons

It provides **directional cost estimates**, not vendor-specific billing.

---

## ⚠️ Disclaimer

All calculations are estimates.  
Actual costs depend on cloud provider pricing, discounts, contracts, and real-world usage patterns.

This tool is for **planning and comparison**, not accounting.

---

## 📜 License

You may use, modify, and share this project freely.

