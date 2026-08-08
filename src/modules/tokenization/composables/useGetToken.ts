import type { Token } from '@/modules/tokenization/types';
import { computed, type Ref } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { QUERY_KEYS } from '@/lib/query-keys';
import { tokenizationServices } from '@/modules/tokenization/services';

export function useGetToken(tokenId: Ref<number>) {
  const queryClient = useQueryClient();

  const queryKey = computed(() => QUERY_KEYS.tokenization.detail(tokenId.value));

  const {
    data: token,
    isLoading,
    isFetching,
    error,
  } = useQuery<Token>({
    queryKey,
    queryFn: () => tokenizationServices.getTokenDetails(tokenId.value),
    enabled: computed(() => Boolean(tokenId.value)),
    staleTime: 30_000,
  });

  /** Force a fresh fetch — used after a mutation succeeds or on manual update. */
  function refetch() {
    return queryClient.refetchQueries({ queryKey: queryKey.value });
  }

  return {
    token,
    isLoading: computed(() => isLoading.value || isFetching.value),
    error,
    refetch,
  };
}
