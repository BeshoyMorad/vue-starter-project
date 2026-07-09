<script setup lang="ts">
  import { useStarterStore } from '@/modules/starter/stores/starterStore';
  import { useStarterData } from '@/modules/starter/composables/useStarterData';
  import StarterCard from '@/modules/starter/components/StarterCard.vue';
  import { TEST_IDS } from '@/lib/test-ids';
  import { paths } from '@/router/paths';
  import { computed } from 'vue';

  const store = useStarterStore();
  const { data: profile, isLoading, error } = useStarterData();

  const filterButtonText = computed(() => {
    return store.isFilterActive ? 'Disable Highlight' : 'Enable Highlight';
  });

  const filterButtonClass = computed(() => {
    return store.isFilterActive
      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
      : 'bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800';
  });

  const handleToggleFilter = () => {
    store.toggleFilter();
  };
</script>

<template>
  <div :data-test-id="TEST_IDS.starter.dashboard" class="mx-auto max-w-4xl p-6">
    <!-- Header Section -->
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-50">
          Starter Dashboard
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Best-practice template module showcasing Pinia, Vue Query, MSW, and Vitest.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Router Link to Dashboard Home -->
        <RouterLink
          :to="{ name: paths.dashboard.root }"
          class="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
        >
          Back to Main Dashboard
        </RouterLink>

        <!-- Toggle Button -->
        <button
          :data-test-id="TEST_IDS.starter.filterToggle"
          class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
          :class="filterButtonClass"
          @click="handleToggleFilter"
        >
          {{ filterButtonText }}
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="relative min-h-62.5">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        :data-test-id="TEST_IDS.starter.loading"
        class="flex min-h-50 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800"
      >
        <div
          class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"
        />
        <span class="text-sm font-medium text-zinc-500 dark:text-zinc-400">Loading profile...</span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        :data-test-id="TEST_IDS.starter.error"
        class="flex min-h-50 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-rose-200 bg-rose-500/5 p-6 dark:border-rose-900/30"
      >
        <span class="text-sm font-semibold text-rose-500">Failed to load starter profile.</span>
        <span class="text-xs text-rose-400">{{
          error instanceof Error ? error.message : 'Unknown error'
        }}</span>
      </div>

      <!-- Success State -->
      <div v-else-if="profile" class="grid gap-6 sm:grid-cols-2">
        <StarterCard :profile="profile" :is-filter-active="store.isFilterActive" />
      </div>

      <!-- Empty State -->
      <div
        v-else
        :data-test-id="TEST_IDS.starter.noData"
        class="flex min-h-50 items-center justify-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800"
      >
        <span class="text-sm text-zinc-500">No profile found.</span>
      </div>
    </div>
  </div>
</template>
