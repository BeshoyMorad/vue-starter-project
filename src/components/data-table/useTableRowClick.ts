import { computed } from 'vue';

export function useTableRowClick<TRow>(clickable: () => boolean, onRowClick: (row: TRow) => void) {
  const isRowClickable = computed(() => clickable());

  const handleRowClick = (row: TRow, event: MouseEvent) => {
    if (!isRowClickable.value) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const isInteractive = target.closest(
      'button, a, input, select, textarea, [role="menuitem"], [role="button"], svg, path'
    );
    if (isInteractive) return;

    onRowClick(row);
  };

  return {
    isRowClickable,
    handleRowClick,
  };
}
