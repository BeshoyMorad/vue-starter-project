import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

function parseDotNotation(permStr: string): [string, string] {
  const parts = permStr.split(".");
  return [parts[0], parts.slice(1).join(".")];
}

function hasPermission(
  permissions: Record<string, string[]>,
  resource: string,
  action: string,
): boolean {
  return permissions[resource]?.includes(action) ?? false;
}

export const usePermissionStore = defineStore("permissions", () => {
  const authStore = useAuthStore();

  const permissions = computed(
    () => authStore.authEmployee?.role?.permissions || {},
  );

  const can = (
    perms: CanPermission<Models>,
    operator: "or" | "and" = "or",
  ): boolean => {
    const list = Array.isArray(perms) ? perms : [perms];
    if (list.length === 0) return true;

    const checks = list.map((p) => {
      const [resource, action] = parseDotNotation(p);
      return hasPermission(permissions.value, resource, action);
    });

    if (operator === "or") {
      return checks.some(Boolean);
    }
    return checks.every(Boolean);
  };

  return {
    permissions,
    can,
  };
});
