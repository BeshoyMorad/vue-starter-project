<script setup lang="ts">
  import { useAppLocale } from '@/composables';

  import TableImportSection from '../components/TableImportSection.vue';
  import TableDefinitionSection from '../components/TableDefinitionSection.vue';
  import TableOffsitePaginationSection from '../components/TableOffsitePaginationSection.vue';
  import TableCursorPaginationSection from '../components/TableCursorPaginationSection.vue';
  import TablePropsSection from '../components/TablePropsSection.vue';
  import TableEventsSection from '../components/TableEventsSection.vue';
  import TableMetaStructure from '../components/TableMetaStructure.vue';

  const { t } = useAppLocale();
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ t('table.title') }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ t('table.description') }}
      </p>
    </section>

    <TableImportSection />
    <TableDefinitionSection />
    <TableOffsitePaginationSection />
    <TableCursorPaginationSection />
    <TableMetaStructure />
    <TablePropsSection />
    <TableEventsSection />
  </div>
</template>
