/* eslint-disable max-lines-per-function */
import { computed, watch } from 'vue';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { useDataInfiniteScroll } from '@/composables/useDataInfiniteScroll';
import { useAddAvailableAssetsMutation } from '@/modules/assets/mutations/useAddAvailableAssetsMutation';
import {
  availableAssetsSchema,
  type AvailableAssetsFormValues,
} from '@/modules/assets/schemas/available-assets.schema';
import { apiRoute } from '@/lib/api/endpoints';
import type { Asset } from '@/modules/assets/types';
import { QUERY_KEYS } from '@/lib/query-keys';

export function useAvailableAssetsForm(options?: { onSuccess?: () => void }) {
  const { handleSubmit, setFieldValue, meta, values, errors, submitCount } =
    useForm<AvailableAssetsFormValues>({
      validationSchema: toTypedSchema(availableAssetsSchema),
      initialValues: { networkId: undefined, isSelectAll: false, selectedIds: [] },
    });

  const {
    data: assets,
    meta: assetsMeta,
    isLoading,
    isFetchingNextPage,
    hasMore,
    fetchNextPage,
    search,
    setFilters,
  } = useDataInfiniteScroll<Asset, { networkId?: number }>({
    queryKey: QUERY_KEYS.assets.allAssets(),
    endpoint: apiRoute('assets.all'),
  });

  const resetSelection = () => {
    setFieldValue('isSelectAll', false);
    setFieldValue('selectedIds', []);
  };

  watch([() => values.networkId, search], ([netId]) => {
    setFilters({ networkId: netId ?? undefined });
    resetSelection();
  });

  const toggleSelectAll = (val: boolean) => {
    setFieldValue('isSelectAll', val);
    setFieldValue('selectedIds', []);
  };

  const toggleRowSelection = (id: number, chk: boolean) => {
    const list = values.selectedIds || [];
    setFieldValue('selectedIds', chk ? [...list, id] : list.filter((x) => x !== id));
  };

  const { mutateAsync: addAvailableAssets, isPending } = useAddAvailableAssetsMutation();

  const onSubmit = handleSubmit(async (fv) => {
    const payload = {
      assetsIds: fv.isSelectAll ? [-1] : fv.selectedIds,
      totalAssetsCount: fv.isSelectAll ? 1 : (assetsMeta.value as Meta | null)?.totalItems || 0,
    };

    try {
      await addAvailableAssets({ payload, networkId: fv.networkId ?? undefined });
      options?.onSuccess?.();
    } catch {
      // Handled in mutation
    }
  });

  const errorMessage = computed(() => {
    if (submitCount.value === 0) return undefined;
    return errors.value[''];
  });

  return {
    onSubmit,
    assets,
    search,
    networkId: computed({
      get: () => values.networkId,
      set: (val) => setFieldValue('networkId', val),
    }),
    isSelectAll: computed(() => !!values.isSelectAll),
    selectedIds: computed(() => new Set(values.selectedIds || [])),
    toggleSelectAll,
    toggleRowSelection,
    isLoading,
    isFetchingNextPage,
    hasMore,
    fetchNextPage,
    isPending,
    isDirty: computed(() => meta.value.dirty),
    errorMessage,
  };
}
