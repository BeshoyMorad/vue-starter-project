import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { queryClient } from '@/lib/query-client';
import './css/index.css';
import router from './router/index.ts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import App from './App.vue';
import { error as toastError } from '@/utils/toast';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const app = createApp(App);

app.config.errorHandler = (err, _instance, info) => {
  // eslint-disable-next-line no-console
  console.error('[Global Vue Error]:', err, info);
  toastError('An unexpected component error occurred.');
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(VueQueryPlugin, { queryClient }).use(router).mount('#app');
