import { RouterView, type RouteRecordRaw } from 'vue-router';
import { composablesPaths } from './composables.paths';

export const composablesRoutes = [
  {
    path: 'composables',
    name: composablesPaths.root,
    component: RouterView,
    redirect: { name: composablesPaths.overview },
    meta: {
      title: 'Composables',
      sidebar: true,
      icon: 'hugeicons--puzzle',
    },
    children: [
      {
        path: '',
        name: composablesPaths.overview,
        component: () => import('@/modules/doc/composables/pages/index.vue'),
      },
      {
        path: 'use-data-table',
        name: composablesPaths.dataTable,
        component: () => import('@/modules/doc/composables/useDataTable/pages/index.vue'),
        meta: {
          title: 'useDataTable',
          sidebar: true,
        },
      },
      {
        path: 'use-dark-theme',
        name: composablesPaths.darkMode,
        component: () => import('@/modules/doc/composables/useDarkMode/pages/index.vue'),
        meta: {
          title: 'useDarkTheme',
          sidebar: true,
        },
      },
      {
        path: 'use-infinite-scroll',
        name: composablesPaths.infiniteScroll,
        component: () => import('@/modules/doc/composables/useInfinteScroll/pages/index.vue'),
        meta: {
          title: 'useInfiniteScroll',
          sidebar: true,
        },
      },
      {
        path: 'use-upload-image',
        name: composablesPaths.uploadImage,
        component: () => import('@/modules/doc/composables/useUploadImage/pages/index.vue'),
        meta: {
          title: 'useUploadImage',
          sidebar: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
