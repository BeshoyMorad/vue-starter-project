import { paths } from '@/router/paths';
import type { RouteRecordRaw } from 'vue-router';

export const tokenizationRoutes: RouteRecordRaw[] = [
  {
    path: '/tokenization',
    name: paths.tokenization.root,
    component: () => import('./pages/Index.vue'),
    meta: { title: 'Tokenization' },
  },
  {
    path: '/tokenization/create',
    name: paths.tokenization.create,
    component: () => import('./pages/Create.vue'),
    meta: { title: 'Create Token', hasBack: true, parentRoute: paths.tokenization.root },
  },
];
