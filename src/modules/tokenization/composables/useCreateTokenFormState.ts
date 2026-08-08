import { computed } from 'vue';
import { useFormValues } from 'vee-validate';
import { NFT_TOKEN_TYPE, SOLANA_NETWORK_IDS } from '@/modules/tokenization/constants/config';
import type { CreateTokenFormValues } from '@/modules/tokenization/schemas/token.schema';

/**
 * Shared composable to access common token creation form fields and reactive flags
 * across step components cleanly without repeating computed properties.
 */
export function useCreateTokenFormState() {
  const formValues = useFormValues<CreateTokenFormValues>();

  const networkId = computed(() => formValues.value.networkId);
  const gasStationCategoryId = computed(() => formValues.value.gasStationCategoryId);
  const vaultId = computed(() => formValues.value.vaultId ?? undefined);
  const selectedType = computed(() => formValues.value.type);
  const isCollection = computed(() => Boolean(formValues.value.isCollection));

  const isNFT = computed(() => selectedType.value === NFT_TOKEN_TYPE);
  const isSolanaNetwork = computed(
    () => networkId.value != null && SOLANA_NETWORK_IDS.includes(networkId.value)
  );

  return {
    formValues,
    networkId,
    gasStationCategoryId,
    vaultId,
    selectedType,
    isCollection,
    isNFT,
    isSolanaNetwork,
  };
}
