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
  import { useDataInfiniteScroll } from '@/composables';
  import { computed } from 'vue';
  import { Icon, InfiniteScroll } from '@/components';
  import { type AcceptableValue } from 'reka-ui';
  import { ComboboxItemIndicator, ComboboxItem, Combobox } from '@/components/ui/combobox';
  import type { BaseInfiniteScrollSelectProps } from './types';

  const MAX_HEIGHT = 250;

  const props = withDefaults(
    defineProps<BaseInfiniteScrollSelectProps<IsMultiple, Option, Value, OptionValue>>(),
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
      class: '',
      showClear: true,
      searchable: false,
      initialOptions: () => [],
      maxSelectedLabels: 4,
      excludeValues: () => [],
    }
  );

  const modelValue = defineModel<IsMultiple extends true ? Value[] : Value>();

  const emits = defineEmits<{
    (e: 'selected', option: Option | undefined): void;
  }>();

  const {
    data: fetchedOptions,
    search,
    fetchNextPage,
    hasMore,
    isFetchingNextPage,
    isPending,
  } = useDataInfiniteScroll<Option>({
    endpoint: props.endpoint,
    queryKey: props.queryKey,
    limit: props.limit,
    initialFilters: props.initialFilters,
    query: computed(() => props.query),
    queryOptions: {
      enabled: computed(() => !props.disabled),
    },
    paginationType: props.paginationType,
  });

  const getOptionKey = (item: Option): unknown => {
    if (typeof props.optionValue === 'function') {
      return props.optionValue(item);
    }
    const key = props.optionValue as keyof Option;
    return item[key];
  };

  const options = computed(() => {
    const initial = [props.initialOptions].flat().filter(Boolean) as Option[];
    const allOptions = [
      ...new Map([...initial, ...fetchedOptions.value].map((o) => [getOptionKey(o), o])).values(),
    ];

    if (props.excludeValues && props.excludeValues.length > 0) {
      return allOptions.filter((o) => !props.excludeValues.includes(getOptionKey(o) as Value));
    }

    return allOptions;
  });

  // `InfiniteScroll` only emits `load-more` once the list end is reached.
  const loadMore = () => {
    if (hasMore.value && !isFetchingNextPage.value) fetchNextPage();
  };
</script>

<template>
  <Combobox
    v-model="modelValue"
    v-model:search="search"
    :test-id="testId"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    :multiple="multiple"
    :disabled="disabled"
    :placeholder="placeholder"
    :size="size"
    :show-clear="showClear"
    :loading="isPending"
    :class="props.class"
    :max-selected-labels="props.maxSelectedLabels"
    :searchable="searchable"
    :ignore-filter="true"
    @selected="emits('selected', $event)"
  >
    <template v-if="$slots.chip" #chip="{ chip, remove }">
      <slot name="chip" :chip="chip" :remove="remove" />
    </template>

    <template v-if="$slots.value" #value="slotProps">
      <slot name="value" v-bind="slotProps" />
    </template>

    <template #options="{ isLocked, getOptionValue, getOptionLabel: getOptionLabelCb }">
      <InfiniteScroll
        :has-more="hasMore"
        :loading="isFetchingNextPage"
        :disabled="disabled"
        :max-height="`${MAX_HEIGHT}px`"
        :hide-scrollbar="false"
        @load-more="loadMore"
      >
        <ComboboxItem
          v-for="option in options"
          :key="String(getOptionValue(option))"
          :value="getOptionValue(option) ?? ''"
          :text-value="getOptionLabelCb(option)"
          :class="multiple && 'group gap-2'"
          :disabled="isLocked"
        >
          <span
            v-if="multiple"
            class="border-border-default bg-bg-surface group-data-[state=checked]:border-bg-primary-default group-data-[state=checked]:bg-bg-primary-default relative flex size-4 shrink-0 items-center justify-center rounded border transition-colors"
            aria-hidden="true"
          >
            <ComboboxItemIndicator class="flex items-center justify-center">
              <Icon
                test-id="combobox-item-check-icon"
                icon="hugeicons--tick-02"
                size="xs"
                class="text-text-base"
              />
            </ComboboxItemIndicator>
          </span>

          <slot name="option" :option="option">
            <span class="flex-1 truncate">{{ getOptionLabelCb(option) }}</span>
          </slot>

          <ComboboxItemIndicator v-if="!multiple" class="shrink-0">
            <Icon
              test-id="combobox-item-check-icon"
              icon="hugeicons--tick-02"
              class="text-text-default"
            />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </InfiniteScroll>
    </template>
  </Combobox>
</template>
