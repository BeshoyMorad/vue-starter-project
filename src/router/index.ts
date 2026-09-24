import { createRouter, createWebHistory } from 'vue-router';
import { paths } from './paths';
import { authGuard } from './guards';
import { authRoutes } from '@/modules/auth/auth.routes';
import { componentsRoutes } from '@/modules/doc/components/components.routes';
import { handleOffline } from '@/composables/useNetwork';
import { formsRoutes } from '@/modules/doc/forms/forms.routes';
import { composablesRoutes } from '@/modules/doc/composables/composables.routes';
import { docRoutes } from '@/modules/doc/documentation/doc.routes';

export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    beforeEnter: [authGuard],
    children: [
      {
        path: '',
        name: paths.dashboard.root,
        component: () => import('@/modules/doc/documentation/pages/index.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'assets',
        name: paths.dashboard.assets,
        component: () => import('@/modules/assets/pages/Index.vue'),
        meta: {
          title: 'assets',
          sidebar: true,
        },
      },
      ...docRoutes,
      ...componentsRoutes,
      ...formsRoutes,
      ...composablesRoutes,
    ],
  },
  ...authRoutes,
  {
    path: '/access-denied',
    name: paths.errors.accessDenied,
    component: () => import('@/pages/errors/AccessDenied.vue'),
    meta: {
      title: 'Access Denied',
      sidebar: false,
    },
  },
  {
    path: '/internal-server-error',
    name: paths.errors.serverError,
    component: () => import('@/pages/errors/InternalServerError.vue'),
    meta: {
      title: 'Internal Server Error',
      sidebar: false,
    },
  },
  {
    path: '/no-internet',
    name: paths.errors.noInternet,
    component: () => import('@/pages/errors/NoInternet.vue'),
    meta: {
      title: 'No Internet Connection',
      sidebar: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/errors/NotFound.vue'),
    meta: {
      title: 'Page Not Found',
      sidebar: false,
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
