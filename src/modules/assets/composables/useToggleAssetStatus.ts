import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { assetsServices } from '@/modules/assets/services';
import { QUERY_KEYS } from '@/lib/query-keys';
import { success, error } from '@/utils/toast';
import { getApiErrorMessage } from '@/utils/apiError';

export function useToggleAssetStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await assetsServices.toggleAssetStatus(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets.list() });

      success(data.message);
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(err);
      error(message);
    },
  });
}
