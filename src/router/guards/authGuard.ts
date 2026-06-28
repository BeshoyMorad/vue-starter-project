import { useAuthStore } from '@/stores/auth';
import type { NavigationGuardReturn, RouteLocationNormalized } from 'vue-router';
import { paths } from '@/router/paths';

export const authGuard = (to: RouteLocationNormalized): NavigationGuardReturn => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return { name: paths.auth.login, query: { redirect: to.fullPath } };
  }
  return true;
};
