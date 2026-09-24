<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';
  import { useAppLocale } from '@/composables';

  import { TABLE_IMPORT_CODE } from '../constants/constants';

  const { t } = useAppLocale();
</script>

<template>
  <Card
    :title="t('table.import.title')"
    :description="t('table.import.description')"
    :code="TABLE_IMPORT_CODE"
    header="Import"
    :show-preview="false"
  />
</template>
