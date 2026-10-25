<script
  setup
  lang="ts"
  generic="
    IsMultiple extends boolean,
    Option extends Record<string, unknown>,
    Value extends AcceptableValue,
    OptionValue extends keyof Option | ((data: Option) => Value)
  "
>
  import BaseInfiniteScrollSelect from './BaseInfiniteScrollSelect.vue';
  import type { AcceptableValue } from 'reka-ui';
  import { computed, useAttrs } from 'vue';
  import { FieldShell, useBaseSlots } from '@/components/form/shared';
  import type { InfiniteScrollSelectProps } from './types';

  defineOptions({
    inheritAttrs: false,
  });

  const props = withDefaults(
    defineProps<InfiniteScrollSelectProps<IsMultiple, Option, Value, OptionValue>>(),
    {
      paginationType: 'offset',
      limit: 10,
      initialFilters: undefined,
      query: undefined,
      disabled: false,
      multiple: undefined,
      size: 'default',
      optionLabel: 'name',
      optionValue: (data: Option) => data.id as Value,
      placeholder: undefined,
      showClear: true,
      searchable: false,
      initialOptions: () => [],
      maxSelectedLabels: 4,
      excludeValues: () => [],
      name: undefined,
      label: undefined,
      description: undefined,
      containerClass: '',
    }
  );

  const modelValue = defineModel<IsMultiple extends true ? Value[] : Value>();

  const emits = defineEmits<{
    (e: 'selected', option: Option | undefined): void;
  }>();

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
      <BaseInfiniteScrollSelect
        v-model="modelValue"
        v-bind="{ ...$attrs, ...componentField }"
        :class="props.class"
        :endpoint="endpoint"
        :query-key="queryKey"
        :limit="limit"
        :initial-filters="initialFilters"
        :query="query"
        :disabled="disabled"
        :option-label="optionLabel"
        :option-value="optionValue"
        :placeholder="placeholder"
        :size="size"
        :show-clear="showClear"
        :searchable="searchable"
        :initial-options="initialOptions"
        :multiple="multiple"
        :max-selected-labels="maxSelectedLabels"
        :exclude-values="excludeValues"
        :test-id="testId"
        @selected="(opt) => emits('selected', opt)"
      >
        <template v-for="slotName in baseSlots" :key="slotName" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
      </BaseInfiniteScrollSelect>
    </template>
  </FieldShell>
</template>
