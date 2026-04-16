# Architecture Overview

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Bootstrap 5 & SCSS (Material Dashboard Theme) |
| Routing | React Router 7 |
| API Client | Axios |
| State Management | React Hooks (Context API / Local State) |

## Project Structure

```text
src/
├── assets/             # Global images, CSS, and JS
├── components/         # Reusable components (Sidebar, Loading, etc.)
├── pages/              # Main application pages (Dashboard, Auth, etc.)
├── utils/              # Helper functions & Axios configuration
├── AppWrapper.jsx      # Root component wrapper
├── main.jsx            # Application entry point
└── router.jsx          # Routing configuration
```

## Design Principles

- **Component-Based:** Breaking down UI into small, reusable components.
- **Lazy Loading:** Utilizing code splitting to optimize initial load time.
- **Centralized API:** All API calls go through `src/utils/axiosInstance.js` for consistency and easier maintenance.
