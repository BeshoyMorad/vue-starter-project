import { createRouter, createWebHistory } from 'vue-router';
import { paths } from './paths';
import authGuard from './guards/authGuard';
import guestGuard from './guards/guestGuard';

export const routes = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    beforeEnter: [guestGuard],
    children: [
      {
        path: 'login',
        name: paths.auth.login,
        component: () => import('@/pages/auth/Login.vue'),
        meta: { title: 'Sign In' },
      },
    ],
  },
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
