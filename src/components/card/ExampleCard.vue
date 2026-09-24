<script setup lang="ts">
  import Codeblock from '@/components/codeblock/codeblock.vue';

  interface Props {
    title?: string;
    description?: string;
    howToUse?: string;
    header?: string;
    code?: string;
    codeArr?: readonly { code: string; header?: string }[];
    usageLabel?: string;
    showPreview?: boolean;
    border?: boolean;
    structure?: string;
  }

  withDefaults(defineProps<Props>(), {
    title: undefined,
    description: undefined,
    howToUse: undefined,
    code: undefined,
    structure: undefined,
    codeArr: undefined,
    usageLabel: 'How to use',
    showPreview: true,
    header: 'code',
    border: true,
  });
</script>

<template>
  <div class="border-border-base/50 rounded-xl border shadow-xs">
    <!-- Header -->
    <div class="px-6 pt-6">
      <h3 class="text-text-primary font-semibold">
        {{ title }}
      </h3>

      <p v-if="description" class="text-text-secondary mt-1 text-sm">
        {{ description }}
      </p>
    </div>

    <!-- Structure + Preview -->
    <div
      v-if="structure || (showPreview && $slots.preview)"
      class="flex flex-col gap-4 px-6 pt-5 lg:flex-row"
    >
      <!-- Structure -->
      <div v-if="structure" class="min-w-0 flex-1">
        <div
          class="border-border-base/50 bg-primary-100/2 dark:bg-primary-900/10 hover:border-border-primary h-full overflow-x-auto rounded-lg border transition-all"
        >
          <pre class="min-w-max px-4 py-3 font-mono text-xs leading-5.5">{{ structure }}</pre>
        </div>
      </div>

      <!-- Preview -->
      <div v-if="showPreview && $slots.preview" class="flex min-w-0 flex-3">
        <div
          class="bg-surface-secondary flex h-full min-h-24 w-full items-center justify-center rounded-lg"
          :class="border ? 'border-border-base/50 border p-6' : ''"
        >
          <slot name="preview" />
        </div>
      </div>
    </div>

    <div class="px-6 pt-6">
      <div v-if="howToUse" class="mb-2">
        <h4 class="text-text-primary text-sm font-semibold">
          {{ usageLabel }}
        </h4>

        <p class="text-text-secondary mt-1 text-xs leading-5">
          {{ howToUse }}
        </p>
      </div>
      <div v-if="code || codeArr" class="flex flex-col gap-5 pb-6">
        <!-- Single Code -->
        <div v-if="code?.length" class="min-w-0">
          <Codeblock :code="String(code)" :header="header" />
        </div>

        <!-- Multiple Code Blocks -->
        <div
          v-if="codeArr?.length"
          class="grid grid-cols-1 gap-4"
          :class="
            codeArr.length === 1
              ? 'md:grid-cols-1'
              : codeArr.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-3'
          "
        >
          <div v-for="(codeItem, index) in codeArr" :key="index" class="min-w-0">
            <Codeblock
              class="h-full w-full"
              :code="codeItem.code"
              :header="codeItem.header ?? 'Code'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
