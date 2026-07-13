<script setup lang="ts">
  import { computed, ref, useAttrs, useId } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
  import { Popover, Button, Icon } from '@/components';
  import { Calendar } from '@/components/ui/calendar';
  import { inputVariants } from '@/components/ui/input';
  import { cn } from '@/utils';
  import dayjs from 'dayjs';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: Date | string | null;
    defaultValue?: Date | string | null;
    dateFormat?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    placeholder?: string;
    id?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    dateFormat: 'DD MMM, YYYY',
    minDate: undefined,
    maxDate: undefined,
    disabled: false,
    placeholder: 'Pick a date',
    id: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: Date | null): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? null,
  });

  const attrs = useAttrs();

  const resolvedId = computed(() => {
    if (props.id) return props.id;
    if (typeof attrs.id === 'string') return attrs.id;
    return useId();
  });

  const isInvalid = computed(() => {
    return attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true;
  });

  const convertToDateValue = (val: Date | string | null | undefined): CalendarDate | undefined => {
    if (!val) return undefined;
    const d = new Date(val);
    if (isNaN(d.getTime())) return undefined;
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  };

  const calendarValue = computed({
    get() {
      return convertToDateValue(modelValue.value);
    },
    set(newVal: CalendarDate | null | undefined) {
      if (!newVal) {
        modelValue.value = null;
      } else {
        modelValue.value = newVal.toDate(getLocalTimeZone());
      }
    },
  });

  const formattedDate = computed(() => {
    if (!modelValue.value) return props.placeholder;
    return dayjs(modelValue.value).format(props.dateFormat);
  });

  const open = ref(false);
</script>

<template>
  <Popover v-model:open="open" align="start" class="w-auto p-0" :show-arrow="true">
    <template #trigger>
      <Button
        :id="resolvedId"
        v-bind="attrs"
        :aria-invalid="isInvalid || undefined"
        :class="
          cn(
            inputVariants(),
            'aria-invalid:focus:ring-danger-300 inline-flex h-10 w-full justify-start px-2 py-2 text-sm hover:bg-transparent',
            !modelValue && 'text-text-disabled',
            attrs.class
          )
        "
        :disabled="disabled"
        :test-id="testId"
        variant="outline"
      >
        <Icon icon="hugeicons--calendar-01" class="text-text-disabled mr-2 size-5" />

        <span>{{ formattedDate }}</span>
      </Button>
    </template>

    <Calendar
      v-model="calendarValue"
      initial-focus
      layout="month-and-year"
      :max-value="convertToDateValue(maxDate)"
      :min-value="convertToDateValue(minDate)"
      @update:model-value="open = false"
    />
  </Popover>
</template>
