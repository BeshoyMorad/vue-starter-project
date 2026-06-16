<script setup lang="ts">
  import { computed, useAttrs, watch } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { REGEXP_ONLY_DIGITS } from 'vue-input-otp';
  import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string;
    defaultValue?: string;
    length?: number;
    integerOnly?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
    length: 6,
    integerOnly: false,
    disabled: false,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const value = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue ?? '',
  });

  const attrs = useAttrs();

  const isInvalid = computed(() => {
    return attrs['aria-invalid'] === 'true' || attrs['aria-invalid'] === true;
  });

  const otpPattern = computed(() => {
    return props.integerOnly ? REGEXP_ONLY_DIGITS : undefined;
  });

  watch(value, (newValue) => {
    if (props.integerOnly && newValue) {
      const sanitized = newValue.replace(/\D/g, '');
      if (sanitized !== newValue) {
        value.value = sanitized;
      }
    }
  });
</script>

<template>
  <InputOTP
    v-model="value"
    v-bind="$attrs"
    :disabled="disabled"
    :inputmode="integerOnly ? 'numeric' : undefined"
    :maxlength="length"
    :pattern="otpPattern"
    :test-id="testId"
  >
    <InputOTPGroup>
      <InputOTPSlot
        v-for="index in length"
        :key="index - 1"
        :aria-invalid="isInvalid || undefined"
        :index="index - 1"
      />
    </InputOTPGroup>
  </InputOTP>
</template>
