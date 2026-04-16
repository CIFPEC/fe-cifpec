# Getting Started

## Prerequisites

- Node.js 20+
- npm / yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CIFPEC/fe-cifpec.git
   cd fe-cifpec
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env
   ```

## Environment Configuration

Edit the `.env` file and set your API URL:

```env
VITE_API_URL=http://localhost:8000/api
VITE_ENVIRONMENT_MODE=Development

# Optional: Custom Local Domain / Reverse Proxy (WSL Setup)
VITE_SERVER_HOST=fe-cifpec.staging.test or 0.0.0.0
VITE_ALLOWED_HOSTS=fe-cifpec.staging.test, dashboard.test
```

## Custom Local Domain (WSL/Reverse Proxy)

If you are using a reverse proxy (like Nginx on WSL) with a custom local domain, you can configure Vite to allow these hosts by setting the following variables in your `.env`:

- `VITE_SERVER_HOST`: The domain name Vite should bind to.
- `VITE_ALLOWED_HOSTS`: A comma-separated list of domains allowed to access the Vite dev server.

This prevents the "Blocked request" error when accessing the dashboard via a custom domain.

## Running the Project

For development mode:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```
