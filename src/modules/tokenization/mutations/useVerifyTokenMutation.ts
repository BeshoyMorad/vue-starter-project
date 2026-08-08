import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { tokenizationServices } from '@/modules/tokenization/services';
import { QUERY_KEYS } from '@/lib/query-keys';
import { success, error } from '@/utils/toast';
import { getApiErrorMessage } from '@/utils/apiError';

export function useVerifyTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await tokenizationServices.verifyToken(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tokenization.list() });
      success(data.message || 'Token verified successfully');
    },
    onError: (err: unknown) => {
      const message = getApiErrorMessage(err);
      error(message);
    },
  });
}
