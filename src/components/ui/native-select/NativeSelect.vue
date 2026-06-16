<script setup lang="ts">
  import type { AcceptableValue } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { reactiveOmit, useVModel } from '@vueuse/core';
  import { cn } from '@/utils';
  import { Icon } from '@/components';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps<{
    modelValue?: AcceptableValue | AcceptableValue[];
    class?: HTMLAttributes['class'];
  }>();

  const emit = defineEmits<{
    'update:modelValue': AcceptableValue;
  }>();

  const modelValue = useVModel(props, 'modelValue', emit, {
    passive: true,
    defaultValue: '',
  });

  const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <div
    class="group/native-select relative w-fit has-[select:disabled]:opacity-50"
    data-slot="native-select-wrapper"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      :class="
        cn(
          'border-border-default placeholder:text-text-placeholder selection:bg-bg-primary-default selection:text-text-base h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
          'focus-visible:border-border-ring focus-visible:ring-border-ring/50 focus-visible:ring-3',
          'aria-invalid:ring-danger-300 aria-invalid:border-border-danger',
          props.class
        )
      "
    >
      <slot />
    </select>
    <Icon
      icon="hugeicons--arrow-down-01"
      class="text-text-default pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
      aria-hidden="true"
      data-slot="native-select-icon"
    />
  </div>
</template>
