import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    optimizeDeps: {
      include: ['@auth/qwik']
    },
    ssr: {
      noExternal: ['@libsql/client']
    },
    build: {
      target: 'node18',
      rollupOptions: {
        external: ['fs', 'path', 'crypto']
      }
    }
  };
}); 