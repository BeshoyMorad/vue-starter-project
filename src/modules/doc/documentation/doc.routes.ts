import { RouterView, type RouteRecordRaw } from 'vue-router';
import { documentationPaths } from './doc.paths';

export const docRoutes = [
  {
    path: 'documentation',
    name: documentationPaths.root,
    component: RouterView,

    redirect: { name: documentationPaths.overview },
    meta: {
      title: 'Documentation',
      sidebar: true,
      icon: 'hugeicons--document-code',
    },
    children: [
      {
        path: '',
        name: documentationPaths.overview,
        component: () => import('@/modules/doc/documentation/pages/index.vue'),
      },
      {
        path: 'api-structure',
        name: documentationPaths.apiStructure,
        component: () => import('@/modules/doc/documentation/api-structure/pages/index.vue'),
        meta: {
          title: 'API Structure',
          sidebar: true,
        },
      },
      {
        path: 'test-id',
        name: documentationPaths.testId,
        component: () => import('@/modules/doc/documentation/test-id/pages/index.vue'),
        meta: {
          title: 'Test ID',
          sidebar: true,
        },
      },
      {
        path: 'env-configuration',
        name: documentationPaths.envConfig,
        component: () => import('@/modules/doc/documentation/env-config/pages/index.vue'),
        meta: {
          title: 'Env Configuration',
          sidebar: true,
        },
      },
      {
        path: 'localization',
        name: documentationPaths.localization,
        component: () => import('@/modules/doc/documentation/localization/pages/index.vue'),
        meta: {
          title: 'Localization',
          sidebar: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
