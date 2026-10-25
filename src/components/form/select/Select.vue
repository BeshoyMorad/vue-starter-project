<script
  setup
  lang="ts"
  generic="
    IsMultiple extends boolean,
    Option extends Record<string, unknown>,
    Value extends AcceptableValue,
    TOptionValue extends keyof Option | ((data: Option) => Value)
  "
>
  import { Combobox as UICombobox } from '@/components/ui/combobox';
  import type { AcceptableValue } from 'reka-ui';
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useBaseSlots } from '@/components/form/shared';
  import type { SelectProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  withDefaults(defineProps<SelectProps<IsMultiple, Option, Value, TOptionValue>>(), {
    placeholder: 'Select..',
    searchPlaceholder: 'Search..',
    size: 'default',
    multiple: undefined,
    disabled: false,
    readonly: false,
    showClear: false,
    searchable: false,
    emptyMessage: 'No results found',
    maxSelectedLabels: 4,
    selectedItemsLabel: '{0} items selected',
    loading: false,
    name: undefined,
    label: undefined,
    description: undefined,
    containerClass: undefined,
  });

  const modelValue = defineModel<IsMultiple extends true ? Value[] : Value>();
  const baseSlots = useBaseSlots();
  const attrs = useAttrs();
  const attrId = computed(() => (typeof attrs.id === 'string' ? attrs.id : undefined));
</script>

<template>
  <FieldShell
    :id="attrId"
    :name="name"
    :label="label"
    :description="description"
    :container-class="containerClass"
  >
    <template v-if="$slots['label-action']" #label-action>
      <slot name="label-action" />
    </template>

    <template #default="{ componentField }">
      <UICombobox
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
        :placeholder="placeholder"
        :search-placeholder="searchPlaceholder"
        :size="size"
        :multiple="multiple"
        :disabled="disabled"
        :readonly="readonly"
        :show-clear="showClear"
        :searchable="searchable"
        :empty-message="emptyMessage"
        :max-selected-labels="maxSelectedLabels"
        :selected-items-label="selectedItemsLabel"
        :loading="loading"
        :test-id="testId"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </UICombobox>
    </template>
  </FieldShell>
</template>
