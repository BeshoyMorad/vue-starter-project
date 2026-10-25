import { computed, useAttrs, useId } from 'vue';

/** Resolves the control id: explicit `id` prop, then `id` attr (e.g. from FormControl), then a generated one. */
export function useFieldId(props: { id?: string }) {
  const attrs = useAttrs();
  const generatedId = useId();
  return computed(() => props.id ?? (typeof attrs.id === 'string' ? attrs.id : generatedId));
}
