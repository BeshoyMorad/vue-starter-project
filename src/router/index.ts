import { createRouter, createWebHistory } from 'vue-router';
import { paths } from './paths';
import { authGuard } from './guards';
import { authRoutes } from '@/modules/auth/auth.routes';

export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    beforeEnter: [authGuard],
    children: [
      {
        path: '',
        name: paths.dashboard.root,
        component: () => import('@/pages/dashboard/pages/Index.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'starter',
        name: paths.dashboard.starter,
        component: () => import('@/modules/starter/pages/StarterDashboard.vue'),
        meta: { title: 'Starter' },
      },
    ],
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
