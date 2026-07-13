<script setup lang="ts">
  import { computed } from 'vue';
  import { Button, Icon } from '@/components';
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from '@/components';
  import { TEST_IDS } from '@/lib/test-ids';

  interface Props {
    meta: Meta | CursorMeta | null | undefined;
    limitOptions?: number[];
  }

  const props = withDefaults(defineProps<Props>(), {
    limitOptions: () => [10, 20, 30],
  });

  const emit = defineEmits<{
    (e: 'pageChange', page: number): void;
    (e: 'limitChange', limit: number): void;
    (e: 'next'): void;
    (e: 'prev'): void;
  }>();

  const paginationType = computed(() => {
    if (!props.meta) return 'offset';
    if ('nextCursor' in props.meta || 'previousCursor' in props.meta) {
      return 'cursor';
    }
    return 'offset';
  });

  const hasNext = computed(() => {
    if (!props.meta) return false;
    if ('nextCursor' in props.meta) {
      return props.meta.nextCursor !== null;
    }
    return (props.meta as Meta).hasNextPage;
  });

  const hasPrev = computed(() => {
    if (!props.meta) return false;
    if ('previousCursor' in props.meta) {
      return props.meta.previousCursor !== null;
    }
    return (props.meta as Meta).hasPreviousPage;
  });

  const showPagination = computed(() => hasNext.value || hasPrev.value);

  const totalItems = computed(() => {
    if (!props.meta || paginationType.value === 'cursor') return 0;
    return (props.meta as Meta).totalItems;
  });

  const limit = computed(() => {
    if (!props.meta) return 10;
    if ('limit' in props.meta) return props.meta.limit;
    return (props.meta as Meta).itemsPerPage ?? 10;
  });

  const currentPage = computed(() => {
    if (!props.meta || paginationType.value === 'cursor') return 1;
    return (props.meta as Meta).currentPage;
  });
</script>

<template>
  <div v-if="showPagination" class="mt-4 flex w-full items-center justify-between p-3">
    <!-- Navigation controls -->
    <div v-if="paginationType === 'cursor'" class="flex items-center gap-2">
      <Button
        :test-id="TEST_IDS.table.pagination.previous"
        variant="ghost"
        size="sm"
        :disabled="!hasPrev"
        @click="emit('prev')"
      >
        <Icon icon="hugeicons--arrow-left-01" class="mr-1 size-4" />
        Previous
      </Button>

      <Button
        :test-id="TEST_IDS.table.pagination.next"
        variant="ghost"
        size="sm"
        :disabled="!hasNext"
        @click="emit('next')"
      >
        Next
        <Icon icon="hugeicons--arrow-right-01" class="ml-1 size-4" />
      </Button>
    </div>

    <div v-else-if="paginationType === 'offset' && totalItems > 0">
      <Pagination
        v-slot="{ page }"
        :total="totalItems"
        :items-per-page="limit"
        :sibling-count="1"
        :show-edges="true"
        :page="currentPage"
        @update:page="emit('pageChange', $event)"
      >
        <PaginationContent v-slot="{ items }">
          <PaginationFirst />
          <PaginationPrevious />

          <template v-for="(item, index) in items">
            <PaginationItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationContent>
      </Pagination>
    </div>

    <!-- Limit Selector -->
    <div class="text-text-default flex items-center gap-2 text-sm">
      <span>Rows per page:</span>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            :test-id="TEST_IDS.table.pagination.limit"
            variant="ghost"
            size="sm"
            class="flex items-center gap-1"
          >
            <span>{{ limit }}</span>
            <Icon icon="hugeicons--arrow-down-01" class="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" class="min-w-0">
          <DropdownMenuItem
            v-for="option in limitOptions"
            :key="option"
            :test-id="`${TEST_IDS.table.pagination.limitOption}-${option}`"
            @click="emit('limitChange', option)"
          >
            {{ option }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
