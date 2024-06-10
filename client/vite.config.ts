import { defineConfig, loadEnv } from 'vite';
// used to add config path in ts into vite
import tsPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'

// ----------------------------------------------------------------------

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
      define: {
          'process.env.SECRET_TOKEN': env.SECRET_TOKEN,
          'process.env.ACCESS_TOKEN': env.ACCESS_TOKEN,
      },
      plugins: [
        react(),
        tsPaths(),
      ],
      base: env.BASE_URL,
      server: {
        port: 3003,
      },
      preview: {
        port: 3003,
      }
  };
});
