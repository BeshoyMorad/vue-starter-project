<script setup lang="ts">
  import { computed, toRef } from 'vue';
  import { Dialog } from '@/components/ui/dialog';
  import { useGetToken } from '@/modules/tokenization/composables/useGetToken';
  import { buildTokenRows } from '@/modules/tokenization/utils/token-detail-utils';

  import TokenCardDetails from './TokenCardDetails.vue';
  import TokenDataRows from './TokenDataRows.vue';
  import TokenDetailsSkeleton from './TokenDetailsSkeleton.vue';

  const props = defineProps<{
    tokenId: number;
  }>();

  const model = defineModel<boolean>('open');
  const emit = defineEmits<{ (e: 'close'): void }>();

  const tokenIdRef = toRef(props, 'tokenId');
  const { token, isLoading } = useGetToken(tokenIdRef);

  const detailRows = computed(() => (token.value ? buildTokenRows(token.value) : []));
</script>

<template>
  <Dialog
    v-model:open="model"
    title="Token Information"
    :dismissable="true"
    content-class="max-w-[95vw] overflow-y-auto"
    body-class="p-0"
    header-class="bg-gray-700 text-white"
    @update:open="(v) => !v && emit('close')"
  >
    <TokenDetailsSkeleton v-if="isLoading" />

    <template v-else-if="token">
      <TokenCardDetails :token="token" />

      <TokenDataRows
        :rows="detailRows"
        :block-explorer-url="token.tokenExplorerUrl"
        :document-url="token.config?.document"
      />
    </template>
  </Dialog>
</template>

<style scoped>
  /* Custom scrollbar inside the dialog content */
  :deep([data-slot='dialog-content'])::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    background-color: #111827;
  }
  :deep([data-slot='dialog-content'])::-webkit-scrollbar-track {
    background-color: #111827;
  }
  :deep([data-slot='dialog-content'])::-webkit-scrollbar-thumb {
    background-color: #404040;
    border-radius: 9999px;
    cursor: pointer;
  }
  :deep([data-slot='dialog-content'])::-webkit-scrollbar-thumb:hover {
    background-color: #525252;
  }
</style>
