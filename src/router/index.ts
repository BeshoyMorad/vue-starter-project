import { createRouter, createWebHistory } from 'vue-router';
import { paths } from './paths';
import { authGuard } from './guards';
import { authRoutes } from '@/modules/auth/auth.routes';
import { handleOffline } from '@/composables/useNetwork';

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
    path: '/access-denied',
    name: paths.errors.accessDenied,
    component: () => import('@/pages/errors/AccessDenied.vue'),
    meta: {
      title: 'Access Denied',
    },
  },
  {
    path: '/internal-server-error',
    name: paths.errors.serverError,
    component: () => import('@/pages/errors/InternalServerError.vue'),
    meta: {
      title: 'Internal Server Error',
    },
  },
  {
    path: '/no-internet',
    name: paths.errors.noInternet,
    component: () => import('@/pages/errors/NoInternet.vue'),
    meta: {
      title: 'No Internet Connection',
    },
  },
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

router.beforeEach((to, _from, next) => {
  if (!navigator.onLine && to.name !== paths.errors.noInternet) {
    handleOffline(to.fullPath);
    next(false);
  } else {
    next();
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
