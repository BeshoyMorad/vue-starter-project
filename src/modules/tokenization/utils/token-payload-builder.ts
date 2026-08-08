import type { CreateTokenPayload, MetaKVPair } from '@/modules/tokenization/types';
import type { CreateTokenFormValues } from '@/modules/tokenization/schemas/token.schema';

/**
 * Pure utility builder function that transforms raw form values into a strictly formatted
 * API payload for token creation (security-tokens POST endpoint).
 *
 * @param rawValues - The unformatted values object from Vee-Validate.
 * @param mediaIdsToAdd - Array of uploaded image media IDs.
 * @param isNFT - True if the token type is NFT (type === 3).
 * @returns Cleaned and formatted CreateTokenPayload.
 */
export function buildTokenPayload(
  rawValues: CreateTokenFormValues,
  mediaIdsToAdd: string[],
  isNFT: boolean
): CreateTokenPayload {
  // 1. Read metaPairs from form values (managed by useFieldArray in SolanaMetadata.vue)
  const metaPairs = (rawValues.metaPairs as MetaKVPair[] | undefined) ?? [];

  // 2. Build additional metadata object from description and metaPairs
  const additional: Record<string, string> = {};

  if (typeof rawValues.description === 'string' && rawValues.description.trim()) {
    additional.description = rawValues.description.trim();
  }

  metaPairs.forEach(({ key, value }) => {
    const trimmedKey = (key ?? '').trim();
    const trimmedValue = (value ?? '').trim();
    if (trimmedKey.length > 0 && trimmedValue.length > 0) {
      additional[trimmedKey] = trimmedValue;
    }
  });

  const hasAdditional = Object.keys(additional).length > 0;

  // 3. Assemble full payload
  const payload: CreateTokenPayload = {
    name: String(rawValues.name),
    symbol: String(rawValues.symbol),
    networkId: Number(rawValues.networkId),
    type: Number(rawValues.type),
    gasStationCategoryId: Number(rawValues.gasStationCategoryId),
    ownerAddress: String(rawValues.ownerAddress),
    mediaIdsToAdd,
    config: {
      canBurn: rawValues.canBurn ? Boolean(rawValues.canBurn) : undefined,
      canMint: rawValues.canMint ? Boolean(rawValues.canMint) : undefined,
      canPause: rawValues.canPause ? Boolean(rawValues.canPause) : undefined,
      document: rawValues.document ? String(rawValues.document).trim() : undefined,
      additional: hasAdditional ? additional : undefined,
    },
  };

  // 4. Handle NFT vs Fungible token fields
  if (isNFT) {
    if (typeof rawValues.isCollection === 'boolean') {
      payload.isCollection = rawValues.isCollection;
    }
    if (rawValues.parentId) {
      payload.parentId = Number(rawValues.parentId);
    }
  } else {
    payload.initialSupply = rawValues.initialSupply ? Number(rawValues.initialSupply) : undefined;
    payload.decimals = Number(rawValues.decimals ?? 0);
  }

  // 5. Cleanup optional recipientAddress
  if (rawValues.recipientAddress && String(rawValues.recipientAddress).trim()) {
    payload.recipientAddress = String(rawValues.recipientAddress).trim();
  }

  return payload;
}
