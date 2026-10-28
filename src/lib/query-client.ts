import i18n from '@/locales';
import { QueryClient, hashKey } from '@tanstack/vue-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 3,
      refetchOnWindowFocus: true,
      // Hash locale into every query so each language keeps its own cache entry.
      // Switching back to a fetched locale reuses that response instead of refetching.
      queryKeyHashFn: (queryKey) => `${hashKey([i18n.global.locale.value, ...queryKey])}`,
    },
  },
});
