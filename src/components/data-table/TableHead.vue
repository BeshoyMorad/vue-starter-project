<script setup lang="ts" generic="TRow extends { id: number | string }">
  import { type Table } from '@tanstack/vue-table';
  import { TableHead, TableRow } from '@/components/ui/table';
  import { Icon } from '@/components';

  defineProps<{
    table: Table<TRow>;
  }>();
</script>

<template>
  <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
    <template v-for="header in headerGroup.headers" :key="header.id">
      <TableHead
        v-if="!header.isPlaceholder"
        :col-span="header.colSpan"
        :style="{
          width: header.column.columnDef.meta?.width,
        }"
      >
        <div
          :class="{
            'flex cursor-pointer items-center gap-3 select-none': header.column.getCanSort(),
            'mx-auto justify-center text-center': header.column.columnDef.meta?.align === 'center',
          }"
          @click="header.column.getToggleSortingHandler()?.($event)"
        >
          <span>
            {{ header.column.columnDef.header }}
          </span>

          <span v-if="header.column.getCanSort()" class="inline-flex flex-col items-center gap-1">
            <Icon
              test-id="data-table-sort-asc"
              icon="hugeicons--arrow-up-01"
              size="xs"
              :class="
                header.column.getIsSorted() === 'asc' ? 'text-text-primary' : 'text-text-disabled'
              "
            />
            <Icon
              test-id="data-table-sort-desc"
              size="xs"
              icon="hugeicons--arrow-down-01"
              :class="
                header.column.getIsSorted() === 'desc' ? 'text-text-primary' : 'text-text-disabled'
              "
            />
          </span>
        </div>
      </TableHead>
    </template>
  </TableRow>
</template>
