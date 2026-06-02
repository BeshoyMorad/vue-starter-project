import { usePermissionStore } from "@/stores/permissions";

export const useCan = () => {
  const store = usePermissionStore();
  return {
    can: store.can,
  };
};
