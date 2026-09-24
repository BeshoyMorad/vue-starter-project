import { componentsPaths } from './components.paths';
import { RouterView, type RouteRecordRaw } from 'vue-router';

export const componentsRoutes = [
  {
    path: 'components',
    name: componentsPaths.root,
    component: RouterView,
    redirect: { name: componentsPaths.overview },
    meta: {
      title: 'Components',
      sidebar: true,
      icon: 'hugeicons--block-game',
    },
    children: [
      {
        path: '',
        name: componentsPaths.overview,
        component: () => import('@/modules/doc/components/pages/index.vue'),
      },
      {
        path: 'accordion',
        name: componentsPaths.accordion,
        component: () => import('@/modules/doc/components/accordion/pages/index.vue'),
        meta: {
          title: 'Accordion',
          sidebar: true,
        },
      },
      {
        path: 'avatar',
        name: componentsPaths.avatar,
        component: () => import('@/modules/doc/components/avatar/pages/index.vue'),
        meta: {
          title: 'Avatar',
          sidebar: true,
        },
      },
      {
        path: 'button',
        name: componentsPaths.button,
        component: () => import('@/modules/doc/components/button/pages/index.vue'),
        meta: {
          title: 'Button',
          sidebar: true,
        },
      },
      {
        path: 'toaster',
        name: componentsPaths.toaster,
        component: () => import('@/modules/doc/components/toaster/pages/index.vue'),
        meta: {
          title: 'Toaster',
          sidebar: true,
        },
      },
      {
        path: 'table',
        name: componentsPaths.table,
        component: () => import('@/modules/doc/components/table/pages/index.vue'),
        meta: {
          title: 'Table',
          sidebar: true,
        },
      },
      {
        path: 'dialog',
        name: componentsPaths.dialog,
        component: () => import('@/modules/doc/components/dialog/pages/index.vue'),
        meta: {
          title: 'Dialog',
          sidebar: true,
        },
      },
      {
        path: 'dropdown-menu',
        name: componentsPaths.dropDownMenu,
        component: () => import('@/modules/doc/components/dropdown-menu/pages/index.vue'),
        meta: {
          title: 'Drop-down',
          sidebar: true,
        },
      },
      {
        path: 'skeleton',
        name: componentsPaths.skeleton,
        component: () => import('@/modules/doc/components/skeleton/pages/index.vue'),
        meta: {
          title: 'Skeleton',
          sidebar: true,
        },
      },
      {
        path: 'tooltip',
        name: componentsPaths.tooltip,
        component: () => import('@/modules/doc/components/tooltip/pages/index.vue'),
        meta: {
          title: 'Tooltip',
          sidebar: true,
        },
      },
      {
        path: 'icon',
        name: componentsPaths.icon,
        component: () => import('@/modules/doc/components/icons/pages/index.vue'),
        meta: {
          title: 'Icon',
          sidebar: true,
        },
      },
      {
        path: 'infinite-scroll',
        name: componentsPaths.infiniteScroll,
        component: () => import('@/modules/doc/components/infinite-scroll/pages/index.vue'),
        meta: {
          title: 'Infinite Scroll',
          sidebar: true,
        },
      },
    ],
  },
] as RouteRecordRaw[];
