<script setup lang="ts">
  import { Table } from '@/components';

  import { useI18n } from 'vue-i18n';
  import { TABLE_PROPS } from '../constants/constants';

  const { t } = useI18n();

  const propsColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'descriptionKey',
      header: 'Description',
    },
  ];

  const propsValue = TABLE_PROPS.map((event) => ({
    name: `:${event.name}`,
    type: event.type,
    descriptionKey: t(event.descriptionKey),
  }));
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-text-primary text-xl font-semibold">
        {{ t('table.props.title') }}
      </h2>

      <p class="text-text-secondary mt-1 text-sm">
        {{ t('table.props.description') }}
      </p>
    </div>

    <div>
      <div class="overflow-x-auto">
        <Table :columns="propsColumns" :value="propsValue" />
      </div>
    </div>
  </section>
</template>
