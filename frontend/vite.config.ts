import {
  defineConfig,
  loadEnv,
  type UserConfig,
} from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const runningConfig: UserConfig = {
    plugins: [react()],
    build: {
      outDir: './distribution',
    },
  }

  if (mode === 'development') {
    const env = loadEnv(mode, process.cwd(), '');

    runningConfig.server = {
      host: true,
      port: 3000,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      }
    };
  }

  return runningConfig;
})
