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
  /* eslint-disable max-lines */
  import { computed, type HtmlHTMLAttributes } from 'vue';
  import {
    useForwardPropsEmits,
    type AcceptableValue,
    type ComboboxRootEmits,
    type ComboboxRootProps,
  } from 'reka-ui';
  import { Icon } from '@/components';
  import { cn } from '@/utils';
  import { reactiveOmit } from '@vueuse/core';
  import ComboboxAnchor from './ComboboxAnchor.vue';
  import ComboboxCancel from './ComboboxCancel.vue';
  import ComboboxContent from './ComboboxContent.vue';
  import ComboboxEmpty from './ComboboxEmpty.vue';
  import ComboboxInput from './ComboboxInput.vue';
  import ComboboxItem from './ComboboxItem.vue';
  import ComboboxItemIndicator from './ComboboxItemIndicator.vue';
  import ComboboxPortal from './ComboboxPortal.vue';
  import ComboboxRoot from './ComboboxRoot.vue';
  import ComboboxTrigger from './ComboboxTrigger.vue';
  import ComboboxViewport from './ComboboxViewport.vue';

  interface Props extends ComboboxRootProps {
    testId: string;
    options: Option[];
    optionLabel: string;
    optionValue: TOptionValue | ((data: Option) => TOptionValue);
    placeholder?: string;
    searchPlaceholder?: string;
    size?: 'small' | 'default' | 'large';
    multiple?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    showClear?: boolean;
    searchable?: boolean;
    class?: HtmlHTMLAttributes['class'];
    emptyMessage?: string;
    maxSelectedLabels?: number;
    selectedItemsLabel?: string;
    loading?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'default',
    placeholder: 'Select..',
    searchPlaceholder: 'Search..',
    class: '',
    emptyMessage: 'No results found',
    maxSelectedLabels: 4,
    selectedItemsLabel: '{0} items selected',
    showClear: true,
    searchable: false,
  });

  const emits = defineEmits<ComboboxRootEmits>();

  const delegatedProps = reactiveOmit(
    props,
    'options',
    'optionLabel',
    'optionValue',
    'placeholder',
    'searchPlaceholder',
    'size',
    'multiple',
    'disabled',
    'readonly',
    'showClear',
    'searchable',
    'class',
    'testId',
    'emptyMessage',
    'maxSelectedLabels',
    'selectedItemsLabel'
  );

  const forwarded = useForwardPropsEmits(delegatedProps, emits);
  const modelValue = defineModel<IsMultiple extends true ? Value[] : Value>();
  const search = defineModel<string>('search', { default: '' });

  const iconSizesMap = { small: 'md', default: 'default', large: 'xl' } as const;
  const sizeClasses = {
    small: 'h-10 text-xs px-2 py-2',
    default: 'h-10 text-sm px-2 py-2',
    large: 'h-12 text-lg px-4 py-3.5',
  } as const;

  const getOptionValue = (option: Option): unknown =>
    typeof props.optionValue === 'function'
      ? props.optionValue(option)
      : option[(props.optionValue ?? 'id') as keyof Option];

  const getOptionLabel = (option: Option): string =>
    option[props.optionLabel as keyof Option] == null
      ? ''
      : String(option[props.optionLabel as keyof Option]);

  const selectedCache = new Map<unknown, Option>();

  const displayValue = (val: unknown): string => {
    if (!val) return '';
    const match = props.options?.find((o) => getOptionValue(o) === val);
    if (match) selectedCache.set(val, match);
    const option = match || selectedCache.get(val);
    return option ? getOptionLabel(option) : String(val);
  };

  const selectedLabel = computed(() => displayValue(modelValue.value));

  interface SelectedChip {
    value: unknown;
    label: string;
    data: unknown;
  }

  const selectedChips = computed<SelectedChip[]>(() => {
    if (!props.multiple || !Array.isArray(modelValue.value)) return [];
    return modelValue.value.map((val) => {
      const match = props.options?.find((o) => getOptionValue(o) === val);
      if (match) selectedCache.set(val, match);
      const option = match || selectedCache.get(val);
      return { value: val, label: option ? getOptionLabel(option) : String(val), data: option };
    });
  });

  const showSelectedItemsLabel = computed(
    () => props.multiple && selectedChips.value.length > props.maxSelectedLabels
  );
  const selectedItemsLabelText = computed(() =>
    props.selectedItemsLabel.replace(/\{0\}/g, String(selectedChips.value.length))
  );
  const isEmpty = computed(() =>
    props.multiple ? selectedChips.value.length === 0 : selectedLabel.value.length === 0
  );

  const removeChip = (val: unknown) => {
    if (props.multiple && Array.isArray(modelValue.value)) {
      modelValue.value = modelValue.value.filter((i) => i !== val) as IsMultiple extends true
        ? Value[]
        : Value;
    }
  };

  const hasValue = computed(() =>
    props.multiple
      ? Array.isArray(modelValue.value) && modelValue.value.length > 0
      : Boolean(modelValue.value)
  );
  const isLocked = computed(() => props.disabled || props.readonly);

  const rootClass = computed(() =>
    cn(
      'group flex w-full min-w-0 items-center cursor-pointer relative select-none rounded-md border-[1.5px] border-border-disabled hover:border-border-primary font-medium focus-within:outline-2 focus-within:outline-border-primary aria-invalid:border-border-danger aria-invalid:hover:border-border-danger disabled:bg-bg-disabled disabled:text-text-disabled disabled:pointer-events-none transition-colors duration-200',
      (props.readonly || props.disabled) &&
        'pointer-events-none cursor-default bg-bg-disabled text-text-disabled',
      props.class
    )
  );

  const triggerClass = computed(() =>
    cn(
      sizeClasses[props.size ?? 'default'],
      props.multiple && hasValue.value && 'h-auto min-h-10 py-1',
      props.multiple && 'overflow-hidden'
    )
  );
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    v-model="modelValue"
    :multiple="multiple"
    :disabled="disabled"
    :reset-model-value-on-clear="showClear"
    :as-child="true"
    @update:open="
      (val) => {
        if (!val) search = '';
      }
    "
  >
    <ComboboxAnchor :class="rootClass" :data-test-id="testId" :aria-readonly="readonly">
      <ComboboxTrigger :class="triggerClass" :disabled="isLocked">
        <span
          v-if="isEmpty"
          class="text-text-disabled block min-w-0 flex-1 grow truncate text-left font-medium"
          data-empty="true"
        >
          {{ placeholder }}
        </span>

        <span
          v-else-if="multiple && showSelectedItemsLabel"
          class="text-text-default block min-w-0 flex-1 grow truncate text-left text-sm font-medium"
        >
          {{ selectedItemsLabelText }}
        </span>

        <span
          v-else-if="multiple"
          v-for="chip in selectedChips"
          :key="String(chip.value)"
          @click.stop
        >
          <slot name="chip" :chip="chip" :remove="() => removeChip(chip.value)">
            <span
              class="bg-bg-default text-text-default inline-flex max-w-full shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-sm"
            >
              <span class="max-w-24 truncate">{{ chip.label }}</span>
              <button
                v-if="!isLocked"
                type="button"
                class="text-text-default hover:text-text-default inline-flex shrink-0 items-center justify-center rounded-sm"
                :aria-label="`Remove ${chip.label}`"
                @click.stop="removeChip(chip.value)"
              >
                <Icon test-id="combobox-chip-remove-icon" icon="hugeicons--cancel-circle" />
              </button>
            </span>
          </slot>
        </span>

        <span v-else class="block min-w-0 flex-1 grow truncate text-left font-medium">
          {{ selectedLabel }}
        </span>

        <span class="ms-auto" />

        <Icon
          v-if="loading"
          test-id="combobox-loading-icon"
          icon="hugeicons--loading-03"
          class="animate-spin"
          :size="iconSizesMap[props.size ?? 'default']"
        />

        <ComboboxCancel v-if="showClear && hasValue && !readonly" aria-label="Clear selection">
          <Icon
            test-id="combobox-clear-icon"
            icon="hugeicons--cancel-01"
            class="text-text-placeholder cursor-pointer"
            :size="iconSizesMap[props.size ?? 'default']"
          />
        </ComboboxCancel>

        <slot name="dropdownicon">
          <Icon
            test-id="combobox-dropdown-icon"
            icon="hugeicons--arrow-down-01"
            class="text-text-placeholder pointer-events-none shrink-0"
            :size="iconSizesMap[props.size ?? 'default']"
          />
        </slot>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent position="popper" :side-offset="4">
        <div v-if="searchable" class="relative shrink-0 px-2 pt-2 pb-1">
          <div class="relative">
            <ComboboxInput
              v-model="search"
              :display-value="() => ''"
              :placeholder="props.searchPlaceholder"
            />
            <span class="pointer-events-none absolute top-1/2 right-3 z-1 -mt-2 leading-none">
              <Icon
                test-id="combobox-filter-icon"
                icon="hugeicons--search-02"
                class="text-surface-400"
                :size="iconSizesMap[props.size ?? 'default']"
              />
            </span>
          </div>
        </div>

        <ComboboxViewport>
          <ComboboxEmpty>{{ emptyMessage }}</ComboboxEmpty>

          <slot
            name="options"
            :get-option-value="getOptionValue"
            :get-option-label="getOptionLabel"
            :is-locked="isLocked"
          >
            <div class="max-h-62 overflow-auto">
              <ComboboxItem
                v-for="option in options"
                :key="String(getOptionValue(option))"
                :value="getOptionValue(option) ?? ''"
                :text-value="getOptionLabel(option)"
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
                      class="text-text-base size-3"
                    />
                  </ComboboxItemIndicator>
                </span>

                <span class="flex-1 truncate">{{ getOptionLabel(option) }}</span>

                <ComboboxItemIndicator v-if="!multiple" class="shrink-0">
                  <Icon
                    test-id="combobox-item-check-icon"
                    icon="hugeicons--tick-02"
                    class="text-text-default size-4"
                  />
                </ComboboxItemIndicator>
              </ComboboxItem>
            </div>
          </slot>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
