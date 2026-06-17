<script
  setup
  lang="ts"
  generic="
    IsMultiple extends boolean,
    Option extends object,
    Value extends AcceptableValue,
    TOptionValue extends keyof Option | ((data: Option) => Value)
  "
>
  import { Combobox as UICombobox } from '@/components/ui/combobox';
  import type { AcceptableValue } from 'reka-ui';
  import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
  } from '@/components/ui/form';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    options: Option[];
    optionLabel: string;
    optionValue: TOptionValue | ((data: Option) => TOptionValue);
    placeholder?: string;
    searchPlaceholder?: string;
    size?: 'small' | 'default' | 'large';
    multiple?: IsMultiple;
    disabled?: boolean;
    readonly?: boolean;
    showClear?: boolean;
    searchable?: boolean;
    emptyMessage?: string;
    maxSelectedLabels?: number;
    selectedItemsLabel?: string;
    loading?: boolean;
    // Form validation wrapper props
    name?: string;
    label?: string;
    description?: string;
    containerClass?: string;
  }

  withDefaults(defineProps<Props>(), {
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
</script>

<template>
  <template v-if="name">
    <FormField v-slot="{ value, handleChange, errorMessage }" v-model="modelValue" :name="name">
      <FormItem :class="containerClass">
        <FormLabel v-if="label">{{ label }}</FormLabel>

        <FormControl>
          <UICombobox
            :aria-invalid="!!errorMessage"
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
            v-bind="$attrs"
            :model-value="value"
            @update:model-value="handleChange"
          >
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps || {}" />
            </template>
          </UICombobox>
        </FormControl>

        <FormDescription v-if="description">{{ description }}</FormDescription>

        <FormMessage />
      </FormItem>
    </FormField>
  </template>

  <template v-else>
    <UICombobox
      v-model="modelValue"
      v-bind="$attrs"
      :class="containerClass"
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
      <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps || {}" />
      </template>
    </UICombobox>
  </template>
</template>
