import { useAuthStore } from "@/stores/auth";
import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";
import { paths } from "@/router/paths";

const authGuard = (to: RouteLocationNormalized): NavigationGuardReturn => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return { name: paths.auth.login, query: { redirect: to.fullPath } };
  }
  return true;
};

export default authGuard;
