<script setup lang="ts">
  import type { ColumnDef } from '@tanstack/vue-table';

  import { Table } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';
  import { useAppLocale } from '@/composables';

  import {
    TABLE_DEFINITION_CODE,
    allUsers,
    TABLE_CODE_HEADER_SCRIPT,
    TABLE_CODE_HEADER_TEMPLATE,
  } from '../constants/constants';

  const { t } = useAppLocale();

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const columns: ColumnDef<User, unknown>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
  ];
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-text-primary text-xl font-semibold">
        {{ t('table.definition.title') }}
      </h2>

      <p class="text-text-secondary mt-1 text-sm">
        {{ t('table.definition.description') }}
      </p>
    </div>

    <Card
      :title="t('table.definition.title')"
      :description="t('table.definition.description')"
      :how-to-use="t('table.definition.howToUseDescription')"
      :border="false"
      :code-arr="[
        { code: TABLE_DEFINITION_CODE.columns, header: TABLE_CODE_HEADER_SCRIPT },
        { code: TABLE_DEFINITION_CODE.value, header: TABLE_CODE_HEADER_SCRIPT },
        { code: TABLE_DEFINITION_CODE.template, header: TABLE_CODE_HEADER_TEMPLATE },
      ]"
      :preview-label="t('table.preview')"
      :usage-label="t('table.howToUse.title')"
    >
      <template #preview>
        <div class="bg-surface-secondary border-border-base/50 w-full rounded-lg border p-6">
          <Table :columns="columns" :value="allUsers.slice(0, 5)" />
        </div>
      </template>
    </Card>
  </section>
</template>
