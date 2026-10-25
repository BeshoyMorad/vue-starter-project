import { computed, useSlots } from 'vue';

/**
 * Names of the wrapper slots that must be forwarded to the Base component.
 * Slots consumed by the wrapper itself (default: `label-action`) are excluded.
 */
export function useBaseSlots(exclude: string[] = ['label-action']) {
  const slots = useSlots();
  return computed(() => Object.keys(slots).filter((name) => !exclude.includes(name)));
}
