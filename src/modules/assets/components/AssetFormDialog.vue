<script setup lang="ts">
  import { ref } from 'vue';
  import { Dialog } from '@/components';
  import AvailableAssetsForm from './AvailableAssetsForm.vue';
  import CustomTokenForm from './CustomTokenForm.vue';

  const isOpen = defineModel<boolean>('open');

  const activeTab = ref<'available' | 'custom'>('available');
</script>

<template>
  <Dialog
    v-model:open="isOpen"
    :hide-header="true"
    content-class="sm:max-w-3xl"
    body-class="p-0 flex flex-col"
  >
    <!-- Custom Full-Width Tabs Header -->
    <div class="border-border bg-background-surface relative flex w-full border-b">
      <button
        type="button"
        class="flex-1 cursor-pointer py-5 text-center font-semibold transition-colors duration-200"
        :class="activeTab === 'available' ? 'text-primary' : 'text-foreground'"
        @click="activeTab = 'available'"
      >
        Available Assets
      </button>

      <button
        type="button"
        class="flex-1 cursor-pointer py-5 text-center font-semibold transition-colors duration-200"
        :class="activeTab === 'custom' ? 'text-primary' : 'text-foreground'"
        @click="activeTab = 'custom'"
      >
        Custom Token
      </button>

      <!-- Active Tab Indicator Line -->
      <div
        class="bg-primary absolute bottom-0 h-1 transition-all duration-300"
        :style="{
          width: '50%',
          left: activeTab === 'available' ? '0%' : '50%',
        }"
      />
    </div>

    <!-- Dialog Content Body -->
    <div class="p-6">
      <AvailableAssetsForm v-if="activeTab === 'available'" @close="isOpen = false" />
      <CustomTokenForm v-if="activeTab === 'custom'" @close="isOpen = false" />
    </div>
  </Dialog>
</template>
