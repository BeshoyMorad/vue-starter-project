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
      {
        path: 'charts',
        name: documentationPaths.charts,
        component: () => import('@/modules/doc/ChartsDoc.vue'),
        meta: {
          title: 'Charts',
          sidebar: true,
        },
      },
      {
        path: 'rules-and-skills',
        name: documentationPaths.rulesAndSkills,
        component: () => import('@/modules/doc/documentation/rules-and-skills/pages/index.vue'),
        meta: {
          title: 'Rules and Skills',
          sidebar: true,
        },
      },
      {
        path: 'utils',
        name: documentationPaths.utils,
        component: () => import('@/modules/doc/documentation/utils/pages/index.vue'),
        meta: {
          title: 'Utils',
          sidebar: true,
        },
      },
      {
        path: 'api-contract',
        name: documentationPaths.apiContract,
        component: () => import('@/modules/doc/documentation/api-contract/pages/index.vue'),
        meta: {
          title: 'API Contract',
          sidebar: true,
        },
      },
      {
        path: 'services',
        name: documentationPaths.services,
        component: () => import('@/modules/doc/documentation/services/pages/index.vue'),
        meta: {
          title: 'Services',
          sidebar: true,
        },
      },
      {
        path: 'form-workflow',
        name: documentationPaths.formWorkflow,
        component: () => import('@/modules/doc/documentation/form-workflow/pages/index.vue'),
        meta: {
          title: 'Building Forms',
          sidebar: true,
        },
      },
      {
        path: 'file-uploads',
        name: documentationPaths.fileUploads,
        component: () => import('@/modules/doc/documentation/file-uploads/pages/index.vue'),
        meta: {
          title: 'File Uploads',
          sidebar: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
