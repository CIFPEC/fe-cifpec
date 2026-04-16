# Deployment Overview

## Environments

| Environment | Purpose | URL |
|---|---|---|
| Local | Development | localhost:5173 |
| Staging | QA / UAT | staging.cifpec.my |
| Production | Live | dashboard.cifpec.my |

## Build Process

The frontend build will be generated in the `dist/` folder. You need to serve the contents of this folder using a web server (e.g., Nginx or Apache).

```bash
npm run build
```

## Nginx Configuration (Example)

Since this application uses `react-router-dom` with the History API, ensure Nginx is configured to redirect all requests to `index.html`.

```nginx
server {
    listen 80;
    server_name dashboard.cifpec.my;
    root /var/www/cifpec-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
