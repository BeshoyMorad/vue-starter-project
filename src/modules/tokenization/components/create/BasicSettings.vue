<script setup lang="ts">
  import { computed } from 'vue';
  import { Field, EntityAvatar } from '@/components';
  import { apiRoute } from '@/lib/api/endpoints';
  import { QUERY_KEYS } from '@/lib/query-keys';
  import { useGetTokenNetworks } from '@/modules/tokenization/composables/useGetTokenNetworks';
  import { useGasStationPolling } from '@/modules/tokenization/composables/useGasStationPolling';
  import { useCreateTokenFormState } from '@/modules/tokenization/composables/useCreateTokenFormState';
  import { IMAGE_TYPES } from '@/components/form/image-upload/constants';

  const { networkId, gasStationCategoryId, isNFT } = useCreateTokenFormState();

  // ── Networks & Token Types ─────────────────────────────────────────────────
  const { networks, tokenNetworks, isLoading: isNetworksLoading } = useGetTokenNetworks();

  const tokenTypeOptions = computed(() => {
    if (!networkId.value || !tokenNetworks.value) return [];
    const selectedNetwork = tokenNetworks.value.find((item) => item.network.id === networkId.value);
    return selectedNetwork?.types ?? [];
  });

  // ── Gas Station Live Polling ───────────────────────────────────────────────
  const { maxBalance, availableBalanceText } = useGasStationPolling(
    networkId,
    gasStationCategoryId
  );
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-foreground text-lg font-semibold">Basic Settings</h2>

    <Field.ImageUpload
      name="image"
      test-id="token-image-upload"
      placeholder="Upload Photo"
      size-preset="default"
      :allowed-types="[IMAGE_TYPES.PNG, IMAGE_TYPES.JPG, IMAGE_TYPES.JPEG]"
    />

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Field.Select
        name="networkId"
        test-id="network-select"
        label="Networks"
        placeholder="Select Network"
        :options="networks ?? []"
        :loading="isNetworksLoading"
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
      </Field.Select>

      <Field.Select
        name="type"
        test-id="token-type-select"
        label="Token Type"
        placeholder="Select token type"
        :options="tokenTypeOptions"
        option-label="name"
        option-value="type"
      >
        <template v-if="isNFT" #label-action>
          <Field.Switch
            name="isCollection"
            label="Is Collection"
            size="small"
            test-id="is-collection-switch"
          />
        </template>
      </Field.Select>

      <Field.InfiniteScrollSelect
        name="gasStationCategoryId"
        test-id="gas-station-select"
        label="Gas Station"
        placeholder="Select Gas Station"
        :endpoint="apiRoute('gas-station.categories')"
        :query-key="QUERY_KEYS.gasStation.categories()"
        option-label="name"
        option-value="id"
      >
        <template v-if="maxBalance" #label-action>
          <div class="flex items-center justify-between gap-1 text-xs">
            <span class="text-foreground-caption">Available Balance:</span>
            <span class="text-foreground font-bold">{{ availableBalanceText }}</span>
          </div>
        </template>
      </Field.InfiniteScrollSelect>

      <Field.Text
        name="name"
        test-id="token-name-input"
        label="Token Name"
        placeholder="Enter token name"
      />

      <Field.Text
        name="symbol"
        test-id="token-symbol-input"
        label="Symbol"
        placeholder="Enter token symbol"
      />

      <!-- Initial Supply (Fungible tokens only) -->
      <Field.Number
        v-if="!isNFT"
        name="initialSupply"
        test-id="initial-supply-input"
        label="Initial Supply"
        placeholder="Enter initial supply"
        hide-steppers
      />

      <!-- Decimals (Fungible tokens only) -->
      <Field.Number
        v-if="!isNFT"
        name="decimals"
        test-id="decimals-input"
        label="Decimals"
        placeholder="Enter token decimals"
        hide-steppers
      />
    </div>
  </div>
</template>
