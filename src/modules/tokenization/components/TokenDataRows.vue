<script setup lang="ts">
  import { ref } from 'vue';
  import { Button } from '@/components';
  import { DataRow } from '@/modules/vaults/features/transactions/components';
  import type { DetailRow } from '@/modules/vaults/features/transactions/utils/transaction-detail-utils';

  defineProps<{
    rows: DetailRow[];
    blockExplorerUrl?: string | null;
    documentUrl?: string | null;
  }>();

  const isExpanded = ref(true);
</script>

<template>
  <div class="bg-gray-900 p-6 text-sm">
    <!-- Header bar: toggle + links -->
    <div class="mb-4 flex items-center justify-between">
      <button class="cursor-pointer text-neutral-50" @click="isExpanded = !isExpanded">
        {{ !isExpanded ? 'More Details' : 'Less Details' }}
      </button>

      <div class="flex items-center gap-3">
        <Button
          v-if="blockExplorerUrl"
          test-id="token-block-explorer-btn"
          variant="ghost"
          icon="hugeicons--share-05"
          icon-position="right"
          class="p-0"
        >
          <a :href="blockExplorerUrl" target="_blank" rel="noopener noreferrer"> Block Explorer </a>
        </Button>

        <div v-if="blockExplorerUrl && documentUrl" class="h-4 w-px bg-neutral-600" />

        <Button
          v-if="documentUrl"
          test-id="token-document-btn"
          variant="ghost"
          icon="hugeicons--file-01"
          icon-position="right"
          class="p-0"
        >
          <a :href="documentUrl" target="_blank" rel="noopener noreferrer"> Document </a>
        </Button>
      </div>
    </div>

    <!-- Collapsible rows -->
    <div
      class="grid transition-all duration-300 ease-in-out"
      :class="isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <template v-for="(row, index) in rows" :key="row.label">
          <DataRow :row="row" dark-mode />
          <div v-if="index !== rows.length - 1" class="h-px bg-neutral-600" />
        </template>
      </div>
    </div>
  </div>
</template>
