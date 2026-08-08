<script setup lang="ts">
  import { useFieldArray } from 'vee-validate';
  import { Field, Button } from '@/components';
  import { generateId } from '@/utils/generateId';

  interface InternalRow {
    id: string;
    key: string;
    value: string;
  }

  const { fields, push, remove } = useFieldArray<InternalRow>('metaPairs');

  const addRow = () => {
    push({ id: generateId(), key: '', value: '' });
  };

  const removeRow = (index: number) => {
    if (fields.value.length > 1) {
      remove(index);
    } else {
      // Reset the only row instead of removing it
      fields.value[0].value.key = '';
      fields.value[0].value.value = '';
    }
  };
</script>

<template>
  <div class="col-span-full space-y-4">
    <h3 class="text-foreground text-sm font-semibold">
      Metadata <span class="text-foreground-caption text-xs font-normal">(Optional)</span>
    </h3>

    <div v-for="(field, index) in fields" :key="field.key" class="flex items-center gap-4">
      <Field.Text
        :name="`metaPairs[${index}].key`"
        test-id="meta-key-input"
        placeholder="e.g. ISIN"
        container-class="flex-1"
      />

      <Field.Text
        :name="`metaPairs[${index}].value`"
        test-id="meta-value-input"
        placeholder="e.g. US1234567890"
        container-class="flex-1"
      />

      <Button
        type="button"
        variant="ghost"
        icon="hugeicons--delete-03"
        icon-class="text-danger"
        icon-size="lg"
        test-id="remove-meta-btn"
        @click="removeRow(index)"
      />
    </div>

    <Button
      type="button"
      variant="outline"
      icon="hugeicons--plus-sign"
      test-id="add-meta-btn"
      @click="addRow"
    >
      Add Field
    </Button>
  </div>
</template>
