import { useAuthStore } from '@/stores/auth';
import type { NavigationGuardReturn, RouteLocationNormalized } from 'vue-router';
import { paths } from '@/router/paths';
import { useAuthRedirect } from '@/composables/useAuthRedirect';

export const authGuard = (to: RouteLocationNormalized): NavigationGuardReturn => {
  const authStore = useAuthStore();
  const { saveRedirectUrl } = useAuthRedirect();

  if (!authStore.isAuthenticated) {
    saveRedirectUrl(to.fullPath);
    return { name: paths.auth.login };
  }
  return true;
};
