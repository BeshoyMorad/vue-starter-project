<script setup lang="ts">
  import {
    Button,
    ConfirmDialog,
    Dialog,
    FormDialog,
    InfiniteScrollTable,
    Table,
  } from '@/components';
  import { formatDate } from '@/utils/formatter';
  import type { ColumnDef } from '@tanstack/vue-table';
  import { h } from 'vue';

  const columns: ColumnDef<{ id: number; name: string; createdAt: Date }, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;
        return h('p', {}, data.id);
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original;
        return h('p', {}, data.name);
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      enableSorting: true,
      cell: ({ row }) => {
        const data = row.original;
        return h('p', {}, formatDate(data.createdAt));
      },
    },
  ];

  const data = [
    { id: 1, name: 'name 1', createdAt: new Date() },
    { id: 2, name: 'name 2', createdAt: new Date() },
    { id: 3, name: 'name 3', createdAt: new Date() },
  ];
  const meta: Meta = {
    currentPage: 1,
    totalItems: 50,
    totalPages: 5,
    itemsPerPage: 10,
    hasNextPage: true,
    hasPreviousPage: false,
  };
  const cursorMeta: CursorMeta = {
    hasNextPage: true,
    hasPreviousPage: false,
    limit: 10,
    nextCursor: 'sdffdsdfs',
    previousCursor: null,
  };
</script>

<template>
  <div class="space-y-4">
    <div>
      <h1 class="text-3xl font-bold mb-2">Buttons</h1>

      <Button test-id="" variant="default">default</Button>
      <Button test-id="" variant="danger">danger</Button>
      <Button test-id="" variant="success">success</Button>
      <Button test-id="" variant="warning">warning</Button>
      <Button test-id="" variant="ghost">ghost</Button>
      <Button test-id="" variant="link">link</Button>
      <Button test-id="" variant="outline">outline</Button>
    </div>

    <div>
      <h1 class="text-3xl font-bold mb-2">Dialogs</h1>

      <div class="flex items-center gap-2">
        <Dialog title="Dialog" description="Description">
          <template #trigger><Button test-id="">Open</Button></template>

          <div>dialog content goes here</div>

          <template #footer>
            <div>footer</div>
          </template>
        </Dialog>

        <ConfirmDialog test-id="" title="title" description="des" icon="hugeicons--circle">
          <template #trigger><Button test-id="">Open Confirm</Button></template>
        </ConfirmDialog>

        <FormDialog test-id="" title="title" description="des">
          <template #trigger><Button test-id="">Open Form</Button></template>

          <div>form goes here</div>
        </FormDialog>
      </div>
    </div>

    <div>
      <h1 class="text-3xl font-bold mb-2">Tables</h1>

      <div class="space-y-5">
        <Table :columns="columns" :value="data" :loading="false" :meta="meta" />
        <InfiniteScrollTable :columns="columns" :value="data" :loading="false" :meta="cursorMeta" />
      </div>
    </div>
  </div>
</template>
