import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  const env = loadEnv(mode, process.cwd());

  const config = {
    plugins: [react()],
  };

  // Setup custom host and allowed hosts for local development (WSL/Reverse Proxy)
  if (env.VITE_ENVIRONMENT_MODE === 'Development') {
    if (env.VITE_SERVER_HOST || env.VITE_ALLOWED_HOSTS) {
      config.server = {};
      
      if (env.VITE_SERVER_HOST) {
        config.server.host = env.VITE_SERVER_HOST;
      }

      if (env.VITE_ALLOWED_HOSTS) {
        // Convert comma-separated string to array
        config.server.allowedHosts = env.VITE_ALLOWED_HOSTS.split(',').map(host => host.trim());
      }
    }
  }

  return config;
});
