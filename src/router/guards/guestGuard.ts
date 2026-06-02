import { useAuthStore } from "@/stores/auth";
import type {
  NavigationGuardReturn,
  RouteLocationNormalized,
} from "vue-router";

const guestGuard = (
  _to: RouteLocationNormalized,
  from: RouteLocationNormalized,
): NavigationGuardReturn => {
  const authStore = useAuthStore();
  return authStore.isAuthenticated ? from : true;
};

export default guestGuard;
