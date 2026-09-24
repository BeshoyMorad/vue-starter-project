import { paths } from '@/router/paths';
import type { RouteRecordRaw } from 'vue-router';

export const assetsRoutes: RouteRecordRaw[] = [
  {
    path: '/assets',
    name: paths.dashboard.assets,

    component: () => import('./pages/Index.vue'),
    meta: { title: 'Assets' },
  },
];
