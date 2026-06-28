import { guestGuard } from '@/router/guards';
import { paths } from '@/router/paths';
import type { RouteRecordRaw } from 'vue-router';

export const authRoutes = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    beforeEnter: [guestGuard],
    children: [
      {
        path: 'login',
        name: paths.auth.login,
        component: () => import('./Login.vue'),
        meta: { title: 'Sign In' },
      },
    ],
  },
] as RouteRecordRaw[];
