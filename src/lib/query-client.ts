import { QueryClient, hashKey, type QueryKey } from '@tanstack/vue-query';

type LocaleGetter = () => string;

function queryDefaults(getLocale?: LocaleGetter) {
  return {
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
    refetchOnWindowFocus: true,
    ...(getLocale && {
      queryKeyHashFn: (queryKey: QueryKey) => `${hashKey([getLocale(), ...queryKey])}`,
    }),
  };
}

export function createQueryClient(getLocale?: LocaleGetter) {
  return new QueryClient({
    defaultOptions: {
      queries: queryDefaults(getLocale),
    },
  });
}

export const queryClient = createQueryClient();

/** Bind a locale getter from the app layer. Call once at bootstrap — never import i18n here. */
export function setupQueryClientLocale(getLocale: LocaleGetter): void {
  queryClient.setDefaultOptions({
    ...queryClient.getDefaultOptions(),
    queries: {
      ...queryClient.getDefaultOptions().queries,
      ...queryDefaults(getLocale),
    },
  });
}
