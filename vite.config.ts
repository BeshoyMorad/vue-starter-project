import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), '');

  return {
    // server: {
    //   watch: {
    //     usePolling: true,
    //   },
    //   host: !!env.APP_HOST || true,
    //   strictPort: true,
    //   port: Number(env.APP_PORT) || 3000,
    // },

    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          assetFileNames: 'project_assets/[name]-[hash][extname]',
          chunkFileNames: 'project_assets/[name]-[hash].js',
          entryFileNames: 'project_assets/[name]-[hash].js',
        },
      },
    },

    plugins: [vue(), tailwindcss()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
