import { useVModel } from '@vueuse/core';

interface ModelProps {
  modelValue?: unknown;
  defaultValue?: unknown;
}

/** Local passive `v-model` with a `defaultValue` fallback, shared by every field wrapper/base. */
export function useFieldModel<P extends ModelProps>(
  props: P,
  emit: (event: 'update:modelValue', value: NonNullable<P['modelValue']>) => void,
  fallback?: P['modelValue']
) {
  return useVModel(props, 'modelValue', emit, {
    passive: true,
    defaultValue: (props.defaultValue ?? fallback) as P['modelValue'],
  });
}
