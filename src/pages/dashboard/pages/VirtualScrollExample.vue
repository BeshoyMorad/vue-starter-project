<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { PageWrapper, InfiniteScroll, Button, Icon } from '@/components';

  interface UserItem {
    id: number;
    name: string;
    email: string;
    role: string;
    avatarColor: string;
  }

  const activeTab = ref<'virtual-fit' | 'virtual-fixed' | 'normal'>('virtual-fit');

  const items = ref<UserItem[]>([]);
  const loading = ref(false);
  const hasMore = ref(true);
  const page = ref(1);
  const totalLimit = 500; // Simulated large dataset

  const colors = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-teal-500',
  ];

  const roles = [
    'Software Engineer',
    'Product Manager',
    'UX Designer',
    'Data Scientist',
    'DevOps Specialist',
  ];

  const fetchMoreItems = () => {
    if (loading.value || !hasMore.value) return;

    loading.value = true;
    setTimeout(() => {
      const newItems: UserItem[] = [];
      const currentLength = items.value.length;
      const countToFetch = Math.min(20, totalLimit - currentLength);

      for (let i = 1; i <= countToFetch; i++) {
        const id = currentLength + i;
        newItems.push({
          id,
          name: `User ${id} (Sample Data Item)`,
          email: `user.${id}@company.com`,
          role: roles[id % roles.length],
          avatarColor: colors[id % colors.length],
        });
      }

      items.value.push(...newItems);
      page.value++;
      loading.value = false;

      if (items.value.length >= totalLimit) {
        hasMore.value = false;
      }
    }, 400);
  };

  onMounted(() => {
    fetchMoreItems();
  });

  const resetData = () => {
    items.value = [];
    page.value = 1;
    hasMore.value = true;
    fetchMoreItems();
  };
</script>

<template>
  <PageWrapper
    title="Infinite Scroll with Virtualization & Fit Height"
    subtitle="Demonstrating virtual scrolling with item height and auto parent-container height fitting"
    fit-height
  >
    <template #actions>
      <div class="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <!-- Tab selector -->
        <div class="flex items-center gap-2">
          <Button
            test-id="virtual-fit-tab"
            :variant="activeTab === 'virtual-fit' ? 'default' : 'outline'"
            size="sm"
            @click="activeTab = 'virtual-fit'"
          >
            Virtual + Fit Height
          </Button>
          <Button
            test-id="virtual-fixed-tab"
            :variant="activeTab === 'virtual-fixed' ? 'default' : 'outline'"
            size="sm"
            @click="activeTab = 'virtual-fixed'"
          >
            Virtual + Fixed Height (400px)
          </Button>
          <Button
            test-id="normal-tab"
            :variant="activeTab === 'normal' ? 'default' : 'outline'"
            size="sm"
            @click="activeTab = 'normal'"
          >
            Normal (No Virtual)
          </Button>
        </div>

        <!-- Controls & Meta Stats -->
        <div class="flex items-center gap-3 text-sm">
          <span class="text-text-placeholder font-medium">
            Loaded: <strong class="text-text-default">{{ items.length }}</strong> /
            {{ totalLimit }} items
          </span>
          <Button test-id="reset-data-btn" variant="ghost" size="sm" @click="resetData">
            <Icon icon="hugeicons--rotate-left" class="mr-1 size-4" />
            Reset Data
          </Button>
        </div>
      </div>
    </template>

    <!-- Content Container -->
    <div class="flex min-h-0 flex-1 flex-col px-6 pb-6">
      <!-- Mode 1: Virtual Scroll + Fit Height inside PageWrapper -->
      <div v-if="activeTab === 'virtual-fit'" class="flex min-h-0 flex-1 flex-col space-y-2">
        <div
          class="text-text-placeholder flex shrink-0 items-center justify-between px-2 font-mono text-xs"
        >
          <span>Mode: Virtual Scroll (itemHeight: 64px, fitHeight: true)</span>
          <span>Only visible DOM elements are rendered</span>
        </div>

        <InfiniteScroll
          :items="items"
          virtual
          :item-height="64"
          fit-height
          :has-more="hasMore"
          :loading="loading"
          class="bg-background rounded-md border"
          @load-more="fetchMoreItems"
        >
          <template #default="{ items: visibleItems, startIndex }">
            <div
              v-for="(item, index) in visibleItems"
              :key="item.id"
              class="flex h-16 items-center justify-between border-b px-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                  :class="item.avatarColor"
                >
                  #{{ (startIndex ?? 0) + index + 1 }}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-text-default text-sm font-semibold">{{ item.name }}</span>
                    <span
                      class="text-text-placeholder rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800"
                    >
                      {{ item.role }}
                    </span>
                  </div>
                  <span class="text-text-disabled text-xs">{{ item.email }}</span>
                </div>
              </div>

              <div class="text-text-placeholder text-right font-mono text-xs">
                ID: {{ item.id }}
              </div>
            </div>
          </template>
        </InfiniteScroll>
      </div>

      <!-- Mode 2: Virtual Scroll + Fixed Height -->
      <div v-else-if="activeTab === 'virtual-fixed'" class="space-y-2">
        <div class="text-text-placeholder flex items-center justify-between px-2 font-mono text-xs">
          <span>Mode: Virtual Scroll (itemHeight: 64px, maxHeight: 400px)</span>
          <span>Fixed height container</span>
        </div>

        <InfiniteScroll
          :items="items"
          virtual
          :item-height="64"
          max-height="400px"
          :has-more="hasMore"
          :loading="loading"
          class="bg-background rounded-md border"
          @load-more="fetchMoreItems"
        >
          <template #default="{ items: visibleItems, startIndex }">
            <div
              v-for="(item, index) in visibleItems"
              :key="item.id"
              class="flex h-16 items-center justify-between border-b px-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                  :class="item.avatarColor"
                >
                  #{{ (startIndex ?? 0) + index + 1 }}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-text-default text-sm font-semibold">{{ item.name }}</span>
                    <span
                      class="text-text-placeholder rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800"
                    >
                      {{ item.role }}
                    </span>
                  </div>
                  <span class="text-text-disabled text-xs">{{ item.email }}</span>
                </div>
              </div>

              <div class="text-text-placeholder text-right font-mono text-xs">
                ID: {{ item.id }}
              </div>
            </div>
          </template>
        </InfiniteScroll>
      </div>

      <!-- Mode 3: Normal Non-Virtual Infinite Scroll -->
      <div v-else class="space-y-2">
        <div class="text-text-placeholder flex items-center justify-between px-2 font-mono text-xs">
          <span>Mode: Normal Infinite Scroll (Standard DOM rendering)</span>
          <span>All {{ items.length }} items exist in DOM simultaneously</span>
        </div>

        <InfiniteScroll
          max-height="400px"
          :has-more="hasMore"
          :loading="loading"
          class="bg-background rounded-md border"
          @load-more="fetchMoreItems"
        >
          <div
            v-for="(item, index) in items"
            :key="item.id"
            class="flex h-16 items-center justify-between border-b px-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                :class="item.avatarColor"
              >
                #{{ index + 1 }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-text-default text-sm font-semibold">{{ item.name }}</span>
                  <span
                    class="text-text-placeholder rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800"
                  >
                    {{ item.role }}
                  </span>
                </div>
                <span class="text-text-disabled text-xs">{{ item.email }}</span>
              </div>
            </div>

            <div class="text-text-placeholder text-right font-mono text-xs">ID: {{ item.id }}</div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  </PageWrapper>
</template>
