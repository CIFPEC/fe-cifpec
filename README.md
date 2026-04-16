# Cifpec - Frontend Dashboard

[![Latest Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)](releases)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](actions)
[![React Version](https://img.shields.io/badge/react-19.0.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/vite-6.0.0-646cff?style=flat-square&logo=vite)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**CIFPEC (Creative Innovation Final Project Exhibition and Competition)** is a dedicated platform for **ADTEC Melaka** students to manage their Final Year Projects (PTA - Projek Tahun Akhir) and participate in innovation competitions.

This frontend dashboard serves as the central hub for Students, Supervisors, Coordinators, and Admins to interact with the CIFPEC ecosystem.

## 🚀 Key Technologies

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vite.dev/)
- **Styling:** [Bootstrap 5](https://getbootstrap.com/) (Material Dashboard Theme)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Data Visualization:** [Chart.js](https://www.chartjs.org/)
- **API Client:** [Axios](https://axios-http.com/)

## 🛠️ Project Setup

### Prerequisites
- Node.js 20+
- npm / yarn

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/CIFPEC/fe-cifpec.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup `.env`:
   ```bash
   cp .env.example .env
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

> **Note for WSL/Reverse Proxy users:** If you are using a custom local domain, check the [Getting Started guide](docs/02-development/01-getting-started.md#custom-local-domain-wslreverse-proxy) for configuration details.

## 📂 Full Documentation

Explore our structured documentation in the [`docs/`](docs/README.md) directory:

- [00 Product Specification](docs/00-product/01-product-spec.md) - Project context & goals.
- [01 Architecture Overview](docs/01-architecture/01-overview.md) - Tech stack & project structure.
- [02 Getting Started](docs/02-development/01-getting-started.md) - Detailed setup guide.
- [03 Deployment Guide](docs/03-deployment/01-overview.md) - How to deploy to production.
- [04 API Reference](docs/04-api/01-endpoints.md) - Integration with CIFPEC API.

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

---
© 2026 CIFPEC Team @ ADTEC Melaka. All rights reserved.
