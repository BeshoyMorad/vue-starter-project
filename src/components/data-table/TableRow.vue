<script setup lang="ts" generic="TRow extends { id: number | string }">
  import { FlexRender, type Row } from '@tanstack/vue-table';
  import { TableRow, TableCell } from '@/components/ui/table';

  defineProps<{
    row: Row<TRow>;
  }>();
</script>

<template>
  <TableRow>
    <TableCell
      v-for="cell in row.getVisibleCells()"
      :key="cell.id"
      :class="{
        'text-center': cell.column.columnDef.meta?.align === 'center',
      }"
      :col-span="cell.column.columnDef.meta?.colSpan"
      :style="{
        width: cell.column.columnDef.meta?.width,
      }"
    >
      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
    </TableCell>
  </TableRow>
</template>
