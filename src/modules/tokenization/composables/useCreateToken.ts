import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { tokenizationServices } from '@/modules/tokenization/services';
import { QUERY_KEYS } from '@/lib/query-keys';
import type { CreateTokenPayload } from '@/modules/tokenization/types';
import { success as toastSuccess } from '@/utils/toast';

export function useCreateToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTokenPayload) => tokenizationServices.createToken(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tokenization.list() });
      toastSuccess(data.message ?? 'Token created successfully');
    },
  });
}
