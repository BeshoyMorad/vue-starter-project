<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useVModel } from '@vueuse/core';
  import BaseInputText from '@/components/form/input-text/BaseInputText.vue';
  import { Icon } from '@/components';

  defineOptions({
    inheritAttrs: false,
  });

  interface Props {
    testId: string;
    modelValue?: string | number;
    defaultValue?: string | number;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    defaultValue: undefined,
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  });

  const showPassword = ref(false);
  const inputType = computed(() => (showPassword.value ? 'text' : 'password'));
</script>

<template>
  <BaseInputText v-model="modelValue" v-bind="$attrs" :type="inputType" :test-id="testId">
    <template #right>
      <button
        type="button"
        class="flex items-center justify-center text-text-disabled hover:text-text-default focus:outline-none cursor-pointer"
        :test-id="`${testId}-toggle`"
        @click="showPassword = !showPassword"
      >
        <Icon
          :icon="showPassword ? 'hugeicons--view' : 'hugeicons--view-off-slash'"
          class="size-5"
        />
      </button>
    </template>
  </BaseInputText>
</template>
