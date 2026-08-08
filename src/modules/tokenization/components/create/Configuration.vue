<script setup lang="ts">
  import { ref } from 'vue';
  import { Field, EntityAvatar } from '@/components';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import { useVaultOwnerResolve } from '@/modules/tokenization/composables/useVaultOwnerResolve';
  import { useCreateTokenFormState } from '@/modules/tokenization/composables/useCreateTokenFormState';
  import { apiRoute } from '@/lib/api/endpoints';
  import SwitchTooltip from '@/modules/tokenization/components/SwitchTooltip.vue';
  import SolanaMetadata from './SolanaMetadata.vue';
  import { VAULT_TYPES } from '@/modules/vaults/constants';

  // ── Form State & Context ──────────────────────────────────────────────────
  const { networkId, vaultId, isNFT, isSolanaNetwork, isCollection } = useCreateTokenFormState();

  // ── UI Display Toggles (Local v-model state) ─────────────────────────────
  const useOwnerAddress = ref(true);
  const hasDocument = ref(false);

  // ── Vault Owner Address Resolution ────────────────────────────────────────
  const { isResolving } = useVaultOwnerResolve(vaultId, networkId);
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-foreground text-lg font-semibold">Token Configuration</h2>

      <Field.Switch
        v-if="!isSolanaNetwork || isNFT"
        v-model="useOwnerAddress"
        label="Use Owner Address"
        test-id="use-owner-address-switch"
      />
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <Field.InfiniteScrollSelect
          v-if="!useOwnerAddress || (isSolanaNetwork && !isNFT)"
          name="vaultId"
          test-id="vault-select"
          label="Choose Vault"
          placeholder="Select vault"
          :endpoint="apiRoute('vaults.list')"
          :query-key="QUERY_KEYS.vaults.list()"
          :initial-filters="{
            vaultType: `In(${VAULT_TYPES.API_SEGREGATED},${VAULT_TYPES.API_CONSOLIDATED},${VAULT_TYPES.INTERNAL})`,
          }"
          option-label="name"
          option-value="id"
        >
          <template #value="{ selectedOption }">
            <EntityAvatar
              v-if="selectedOption"
              :name="selectedOption.name"
              :logo="selectedOption.logo"
              size="sm"
            />
          </template>

          <template #option="{ option }">
            <EntityAvatar :name="option.name" :logo="option.logo" />
          </template>
        </Field.InfiniteScrollSelect>

        <Field.Text
          name="ownerAddress"
          test-id="owner-address-input"
          label="Owner Address"
          placeholder="Enter owner address"
          :disabled="isResolving"
        />

        <!-- Parent NFT Select -->
        <Field.InfiniteScrollSelect
          v-if="isNFT"
          name="parentId"
          test-id="parent-nft-select"
          label="Parent NFT (Optional)"
          placeholder="Select parent NFT"
          :disabled="isCollection"
          :endpoint="apiRoute('tokenization.list')"
          :query-key="QUERY_KEYS.tokenization.list()"
          :initial-filters="{
            type: 'NFT',
            isCollection: true,
            networkId: networkId,
            vaultId: vaultId,
          }"
          option-label="name"
          option-value="id"
        />

        <!-- Recipient Address (Fungible tokens only) -->
        <Field.Text
          v-if="!isNFT"
          name="recipientAddress"
          test-id="recipient-address-input"
          label="Recipient Address (Optional)"
          placeholder="Enter recipient address"
        />
      </div>

      <Field.Textarea
        name="description"
        test-id="description-input"
        label="Description (Optional)"
        placeholder="Enter Description"
        class="min-h-40"
        :rows="6"
      />

      <!-- Feature Toggles -->
      <div class="col-span-full space-y-6">
        <SwitchTooltip
          v-if="!isNFT && !isSolanaNetwork"
          name="canBurn"
          label="Can Burn"
          test-id="can-burn-switch"
          tooltip="Enables token burning after initial token creation to decrease supply."
        />

        <SwitchTooltip
          v-if="!isNFT"
          name="canMint"
          label="Can Mint"
          test-id="can-mint-switch"
          tooltip="Enables additional token minting after initial creation to increase supply."
        />

        <SwitchTooltip
          v-if="!isNFT"
          name="canPause"
          label="Can Pause"
          test-id="can-pause-switch"
          tooltip="Enables functions to pause and unpause operations on this token."
        />
      </div>

      <!-- Document Section -->
      <div v-if="!isSolanaNetwork" class="col-span-full space-y-4">
        <SwitchTooltip
          v-model="hasDocument"
          label="Has Document"
          test-id="has-document-switch"
          tooltip="A hash or URL referencing documentation of the underlying asset."
        />

        <!-- TODO: need editor -->
        <Field.Textarea
          v-if="hasDocument"
          name="document"
          test-id="document-input"
          label="Document Details"
          placeholder="Type documentation details here..."
          :rows="6"
        />
      </div>

      <!-- Solana Metadata Key-Value Pairs -->
      <SolanaMetadata v-if="isSolanaNetwork" />
    </div>
  </div>
</template>
