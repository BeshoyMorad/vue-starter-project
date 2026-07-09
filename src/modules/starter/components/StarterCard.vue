<script setup lang="ts">
  import type { StarterProfile } from '@/modules/starter/types';
  import { TEST_IDS } from '@/lib/test-ids';
  import { computed } from 'vue';

  const props = defineProps<{
    profile: StarterProfile;
    isFilterActive: boolean;
  }>();

  const statusText = computed(() => props.profile.status.toUpperCase());
  const statusBadgeClass = computed(() => {
    return props.profile.status === 'active'
      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      : 'bg-rose-500/10 text-rose-500 border-rose-500/20';
  });

  const borderClass = computed(() => {
    return props.isFilterActive
      ? 'border-2 border-indigo-500 shadow-indigo-500/20 scale-[1.02]'
      : 'border border-gray-200 dark:border-gray-800 shadow-sm';
  });
</script>

<template>
  <div
    :data-test-id="TEST_IDS.starter.card"
    class="relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 dark:bg-zinc-900"
    :class="borderClass"
  >
    <!-- Background Decoration -->
    <div class="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl" />

    <div class="flex items-center gap-4">
      <!-- Avatar -->
      <div
        class="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl font-bold text-indigo-500"
      >
        <img
          v-if="profile.avatarUrl"
          :src="profile.avatarUrl"
          :alt="profile.name"
          class="h-full w-full rounded-2xl object-cover"
        />
        <span v-else>{{ profile.name.charAt(0) }}</span>
      </div>

      <!-- User Details -->
      <div class="min-w-0 flex-1">
        <h3
          :data-test-id="TEST_IDS.starter.cardTitle"
          class="truncate text-lg font-bold text-gray-900 dark:text-zinc-50"
        >
          {{ profile.name }}
        </h3>
        <p
          :data-test-id="TEST_IDS.starter.cardDescription"
          class="truncate text-sm text-gray-500 dark:text-zinc-400"
        >
          {{ profile.email }}
        </p>
      </div>
    </div>

    <!-- Info section -->
    <div
      class="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 dark:border-zinc-800"
    >
      <span
        class="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {{ profile.role }}
      </span>
      <span class="rounded-lg border px-2.5 py-1 text-xs font-semibold" :class="statusBadgeClass">
        {{ statusText }}
      </span>
    </div>
  </div>
</template>
