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
      {
        path: 'multi-step-form',
        name: paths.dashboard.multiStepForm,
        component: () => import('@/pages/dashboard/pages/MultiStepFormExample.vue'),
        meta: { title: 'Multi Step Form' },
      },
    ],
  },
  ...authRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/errors/NotFound.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    const key = `chunk-load-retry-${to.path}`;
    const retried = sessionStorage.getItem(key);
    if (!retried) {
      sessionStorage.setItem(key, 'true');
      // eslint-disable-next-line no-console
      console.warn(
        '[Router Dynamic Import Error]: forcing page reload to retrieve latest assets',
        error
      );
      window.location.reload();
    } else {
      sessionStorage.removeItem(key);
      // eslint-disable-next-line no-console
      console.error('[Router Dynamic Import Error]: Reload did not resolve the issue.', error);
    }
  }
});

// Update document title after each navigation
router.afterEach((to) => {
  const pageTitle = to.meta.title;

  if (pageTitle) {
    document.title = `${pageTitle}`;
  }
});

export default router;
