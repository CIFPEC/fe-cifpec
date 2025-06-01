import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  // Muatkan environment variable berdasarkan mode (contoh: development, production)
  const env = loadEnv(mode, process.cwd());

  const config = {
    plugins: [react()],
  };

  if (env.VITE_ENVIRONMENT_MODE === 'Development') {
    config.server = {
      https: {
        key: fs.readFileSync('./cert/localhost.key'),
        cert: fs.readFileSync('./cert/localhost.crt'),
      },
      host: 'fe.xtivebiz.com',
    };
  }

  return config;
});
