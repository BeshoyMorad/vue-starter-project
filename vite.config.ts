import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

const getManualChunks = (id: string): string | undefined => {
  if (!id.includes('node_modules')) return;

  if (
    id.includes('/vue/') ||
    id.includes('/@vue/') ||
    id.includes('/pinia/') ||
    id.includes('/pinia-plugin-persistedstate/') ||
    id.includes('/vue-router/')
  ) {
    return 'vendor-vue';
  }
  if (id.includes('/reka-ui/') || id.includes('/@internationalized/date/')) {
    return 'vendor-reka';
  }
  if (id.includes('/@tanstack/')) {
    return 'vendor-tanstack';
  }
  // if (id.includes('/@unovis/')) {
  //   return 'vendor-unovis';
  // }
  // if (id.includes('/firebase/') || id.includes('/@firebase/')) {
  //   return 'vendor-firebase';
  // }
  if (id.includes('/vee-validate/') || id.includes('/@vee-validate/') || id.includes('/yup/')) {
    return 'vendor-form';
  }
};

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
      target: 'esnext',
      chunkSizeWarningLimit: 1000,
      rolldownOptions: {
        checks: {
          invalidAnnotation: false,
          pluginTimings: false,
        },
        output: {
          assetFileNames: 'project_assets/[name]-[hash][extname]',
          chunkFileNames: 'project_assets/[name]-[hash].js',
          entryFileNames: 'project_assets/[name]-[hash].js',
          manualChunks: getManualChunks,
        },
      },
    },

    plugins: [vue(), tailwindcss()],

    resolve: {
      alias: {
        '@/tests': fileURLToPath(new URL('./tests', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
