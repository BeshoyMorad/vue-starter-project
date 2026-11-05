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
      {
        path: 'use-data-table-guide',
        name: composablesPaths.dataTableGuide,
        component: () => import('@/modules/doc/composables/useDataTableGuide/pages/index.vue'),
        meta: {
          title: 'useDataTable Deep Dive',
          sidebar: true,
        },
      },
      {
        path: 'use-upload-image-guide',
        name: composablesPaths.uploadImageGuide,
        component: () => import('@/modules/doc/composables/useUploadImageGuide/pages/index.vue'),
        meta: {
          title: 'useUploadImage Deep Dive',
          sidebar: true,
        },
      },
      {
        path: 'use-form-media',
        name: composablesPaths.formMedia,
        component: () => import('@/modules/doc/composables/useFormMedia/pages/index.vue'),
        meta: {
          title: 'useFormMedia',
          sidebar: true,
        },
      },
      {
        path: 'use-table-state',
        name: composablesPaths.tableState,
        component: () => import('@/modules/doc/composables/useTableState/pages/index.vue'),
        meta: {
          title: 'useTableState',
          sidebar: true,
        },
      },
      {
        path: 'app-composables',
        name: composablesPaths.appComposables,
        component: () => import('@/modules/doc/composables/appComposables/pages/index.vue'),
        meta: {
          title: 'App Composables',
          sidebar: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
