<script setup lang="ts">
  import type { Token } from '@/modules/tokenization/types';
  import { computed } from 'vue';
  import { Icon, Image, WalletAddress } from '@/components';
  import { formatDate } from '@/utils/formatter';
  import { TokenStatusProperties } from '@/modules/tokenization/constants/token-statuses';

  const props = defineProps<{
    token: Token;
  }>();

  const statusProps = computed(() => TokenStatusProperties[props.token.status]);
</script>

<template>
  <div
    v-if="token"
    class="relative space-y-6 border-b border-neutral-600 bg-gray-900 p-6"
    :data-test-id="`token-card-${token.id}`"
  >
    <!-- Top row: logo + name/symbol/contract + network & type -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3">
        <Image
          :src="token.image"
          :alt="`${token.name} token logo`"
          class="size-12 rounded-full object-cover"
        />

        <div class="flex flex-col items-start gap-1">
          <div
            v-if="token.contractAddress"
            class="rounded-full bg-neutral-800 p-2 text-neutral-300"
          >
            <WalletAddress
              class="text-sm text-neutral-300"
              :address="token.contractAddress"
              :start-length="10"
              :end-length="10"
              :data-test-id="`token-${token.id}-contract-address`"
            />
          </div>

          <p class="text-sm font-medium text-white" data-test-id="token-name">
            {{ token.name }} <span class="text-neutral-400">({{ token.symbol }})</span>
          </p>
        </div>
      </div>

      <span class="text-sm font-semibold text-neutral-300">
        {{ token.type }}
      </span>
    </div>

    <!-- Bottom row: status & date -->
    <div class="flex items-end justify-between">
      <p
        :style="{ color: statusProps.color }"
        class="flex items-center gap-1.5 text-sm font-medium"
        data-test-id="token-status"
      >
        <Icon v-if="statusProps.icon" :icon="statusProps.icon" />
        <span>{{ statusProps.text }}</span>
      </p>

      <p v-if="token.createdAt" class="text-sm text-neutral-400">
        {{ formatDate(token.createdAt, { mode: 'datetime' }) }}
      </p>
    </div>
  </div>
</template>
