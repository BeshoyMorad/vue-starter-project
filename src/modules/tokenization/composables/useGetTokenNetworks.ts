import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { QUERY_KEYS } from '@/lib/query-keys';
import { tokenizationServices } from '@/modules/tokenization/services';
import type { TokenNetwork } from '@/modules/tokenization/types';

export function useGetTokenNetworks() {
  const {
    data: tokenNetworks,
    isLoading,
    isFetching,
    error,
  } = useQuery<TokenNetwork[]>({
    queryKey: QUERY_KEYS.tokenization.networks(),
    queryFn: () => tokenizationServices.getTokenNetworks(),
    staleTime: 5 * 60 * 1000,
  });

  const networks = computed(() => (tokenNetworks.value ?? []).map((tn) => tn.network));

  return {
    tokenNetworks,
    networks,
    isLoading: computed(() => isLoading.value || isFetching.value),
    error,
  };
}
