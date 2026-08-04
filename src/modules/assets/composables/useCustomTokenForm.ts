import { computed, ref, watch, type Ref } from 'vue';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import {
  customTokenSchema,
  type CustomTokenFormValues,
} from '@/modules/assets/schemas/custom-token.schema';
import { useCreateCustomTokenMutation } from '@/modules/assets/mutations/useCreateCustomTokenMutation';
import { assetsServices } from '@/modules/assets/services';
import { error as errorToast } from '@/utils/toast';

interface UseCustomTokenFormOptions {
  onSuccess?: () => void;
}

function useContractPopulation(
  networkId: Ref<number | undefined>,
  contractAddress: Ref<string | undefined>,
  setFieldValue: (f: string, v: unknown) => void
) {
  const isFetchingContract = ref(false);
  const hasFetchedDetails = ref(false);

  async function fetchAndPopulateContract(netId: number, addr: string) {
    isFetchingContract.value = true;
    try {
      const data = await assetsServices.getContractDetails(netId, addr);
      const details = data?.data;

      if (details) {
        if (details.name) setFieldValue('name', details.name);
        if (details.symbol) setFieldValue('symbol', details.symbol);
        if (details.decimals !== undefined) setFieldValue('decimals', details.decimals);
        hasFetchedDetails.value = true;
      }
    } catch {
      errorToast('Failed to fetch contract details');
      hasFetchedDetails.value = false;
    } finally {
      isFetchingContract.value = false;
    }
  }

  watch([networkId, contractAddress], async ([netId, addr]) => {
    const cleanAddr = addr?.trim();
    if (netId && cleanAddr) {
      await fetchAndPopulateContract(netId, cleanAddr);
    } else {
      hasFetchedDetails.value = false;
    }
  });

  return { isFetchingContract, hasFetchedDetails };
}

export function useCustomTokenForm(options?: UseCustomTokenFormOptions) {
  const validationSchema = toTypedSchema(customTokenSchema);

  const { handleSubmit, setFieldValue, meta, values } = useForm<CustomTokenFormValues>({
    validationSchema,
    initialValues: {
      networkId: undefined,
      contractAddress: '',
      name: '',
      symbol: '',
      decimals: undefined,
    },
  });

  const isDirty = computed(() => meta.value.dirty);

  const networkId = computed(() => values.networkId);
  const contractAddress = computed(() => values.contractAddress);

  const { isFetchingContract, hasFetchedDetails } = useContractPopulation(
    networkId,
    contractAddress,
    setFieldValue as (f: string, v: unknown) => void
  );

  const isFieldsDisabled = computed(() => isFetchingContract.value || hasFetchedDetails.value);

  const { mutateAsync: createCustomToken, isPending: isMutationPending } =
    useCreateCustomTokenMutation();
  // const { isUploading } = useFormMedia();

  const onSubmit = handleSubmit(async (values, ctx) => {
    // TODO: Need backend handling, then handle it in the form itself
    // await uploadFormMedia(values, 'ASSETS', setFieldValue);

    // const { mediaIdsToAdd } = extractMediaPayload(values);

    const payload = {
      name: values.name,
      symbol: values.symbol,
      contractAddress: values.contractAddress,
      decimals: Number(values.decimals),
      networkId: Number(values.networkId),
      // mediaIdsToAdd: mediaIdsToAdd as string[],
    };

    try {
      await createCustomToken({ values: payload, ctx });
      options?.onSuccess?.();
    } catch {
      // Silent catch since error handling (toast, form validation error mapping)
      // is already fully handled inside the mutation's onError callback.
    }
  });

  return {
    onSubmit,
    isFetchingContract,
    isFieldsDisabled,
    isPending: isMutationPending,
    // isUploading,
    isDirty,
  };
}
