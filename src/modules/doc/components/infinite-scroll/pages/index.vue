<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { InfiniteScroll, Button, Icon } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import {
    INFINITE_SCROLL_IMPORT_CODE,
    INFINITE_SCROLL_BASIC_CODE,
    INFINITE_SCROLL_VIRTUAL_CODE,
    INFINITE_SCROLL_FIT_HEIGHT_CODE,
    INFINITE_SCROLL_DOC,
    INFINITE_SCROLL_CODE_HEADER,
  } from '../constants/constants';

  interface UserItem {
    id: number;
    name: string;
    email: string;
  }

  const items = ref<UserItem[]>([]);
  const loading = ref(false);
  const hasMore = ref(true);

  const totalLimit = 100;

  const fetchMoreItems = () => {
    if (loading.value || !hasMore.value) return;

    loading.value = true;

    setTimeout(() => {
      const currentLength = items.value.length;
      const countToFetch = Math.min(10, totalLimit - currentLength);

      const newItems: UserItem[] = [];

      for (let i = 1; i <= countToFetch; i++) {
        const id = currentLength + i;

        newItems.push({
          id,
          name: `User ${id}`,
          email: `user.${id}@company.com`,
        });
      }

      items.value.push(...newItems);

      loading.value = false;

      if (items.value.length >= totalLimit) {
        hasMore.value = false;
      }
    }, 500);
  };

  const resetData = () => {
    items.value = [];
    hasMore.value = true;
    fetchMoreItems();
  };

  onMounted(() => {
    fetchMoreItems();
  });
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ INFINITE_SCROLL_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ INFINITE_SCROLL_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      title="Import"
      description="Import the InfiniteScroll component from the shared components library."
      :code="INFINITE_SCROLL_IMPORT_CODE"
      :header="INFINITE_SCROLL_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ INFINITE_SCROLL_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ INFINITE_SCROLL_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="INFINITE_SCROLL_DOC.basic.title"
          :description="INFINITE_SCROLL_DOC.basic.description"
          :how-to-use="INFINITE_SCROLL_DOC.basic.howToUse"
          :code-arr="[
            {
              code: INFINITE_SCROLL_BASIC_CODE.script,
              header: INFINITE_SCROLL_CODE_HEADER.script,
            },
            {
              code: INFINITE_SCROLL_BASIC_CODE.template,
              header: INFINITE_SCROLL_CODE_HEADER.template,
            },
          ]"
          :header="INFINITE_SCROLL_CODE_HEADER.template"
        >
          <template #preview>
            <div class="w-full max-w-2xl space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-text-placeholder text-sm">
                  Loaded: {{ items.length }} / {{ totalLimit }}
                </span>

                <Button test-id="" outline size="sm" @click="resetData">
                  <Icon icon="hugeicons--rotate-left" class="mr-1 size-4" />
                  Reset
                </Button>
              </div>

              <InfiniteScroll
                max-height="300px"
                :has-more="hasMore"
                :loading="loading"
                class="bg-background rounded-md border"
                @load-more="fetchMoreItems"
              >
                <div
                  v-for="item in items"
                  :key="item.id"
                  class="flex items-center justify-between border-b px-4 py-3 last:border-b-0"
                >
                  <div>
                    <p class="text-text-default text-sm font-medium">
                      {{ item.name }}
                    </p>

                    <p class="text-text-placeholder text-xs">
                      {{ item.email }}
                    </p>
                  </div>

                  <span class="text-text-placeholder font-mono text-xs"> #{{ item.id }}</span>
                </div>
              </InfiniteScroll>
            </div>
          </template>
        </Card>

        <!-- Virtual Scroll -->
        <Card
          :title="INFINITE_SCROLL_DOC.virtual.title"
          :description="INFINITE_SCROLL_DOC.virtual.description"
          :how-to-use="INFINITE_SCROLL_DOC.virtual.howToUse"
          :code="INFINITE_SCROLL_VIRTUAL_CODE"
          :header="INFINITE_SCROLL_CODE_HEADER.template"
        >
          <template #preview>
            <div class="w-full max-w-2xl">
              <InfiniteScroll
                :items="items"
                virtual
                :hide-scrollbar="false"
                :item-height="56"
                max-height="300px"
                :has-more="hasMore"
                :loading="loading"
                class="bg-background rounded-md border"
                @load-more="fetchMoreItems"
              >
                <template #default="{ items: visibleItems, startIndex }">
                  <div
                    v-for="(item, index) in visibleItems"
                    :key="item.id"
                    class="flex h-14 items-center justify-between border-b px-4"
                  >
                    <div>
                      <p class="text-text-default text-sm font-medium">
                        {{ item.name }}
                      </p>

                      <p class="text-text-placeholder text-xs">
                        {{ item.email }}
                      </p>
                    </div>

                    <span class="text-text-placeholder font-mono text-xs">
                      #{{ (startIndex ?? 0) + index + 1 }}
                    </span>
                  </div>
                </template>
              </InfiniteScroll>
            </div>
          </template>
        </Card>

        <!-- Fit Height -->
        <Card
          :title="INFINITE_SCROLL_DOC.fitHeight.title"
          :description="INFINITE_SCROLL_DOC.fitHeight.description"
          :how-to-use="INFINITE_SCROLL_DOC.fitHeight.howToUse"
          :code="INFINITE_SCROLL_FIT_HEIGHT_CODE"
          :header="INFINITE_SCROLL_CODE_HEADER.template"
        >
          <template #preview>
            <div class="flex h-80 min-h-0 w-full max-w-2xl flex-col">
              <InfiniteScroll
                :items="items"
                virtual
                :item-height="56"
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
                    class="flex h-14 items-center justify-between border-b px-4"
                  >
                    <div>
                      <p class="text-text-default text-sm font-medium">
                        {{ item.name }}
                      </p>

                      <p class="text-text-placeholder text-xs">
                        {{ item.email }}
                      </p>
                    </div>

                    <span class="text-text-placeholder font-mono text-xs">
                      #{{ (startIndex ?? 0) + index + 1 }}
                    </span>
                  </div>
                </template>
              </InfiniteScroll>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
