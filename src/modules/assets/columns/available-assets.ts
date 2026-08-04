import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { Field, EntityAvatar, StatusBadge } from '@/components';
import type { Asset } from '@/modules/assets/types';
import { TEST_IDS } from '@/lib/test-ids';

interface AvailableAssetsColumnsOptions {
  isSelectAll: boolean;
  selectedIds: Set<number>;
  toggleSelectAll: (val: boolean) => void;
  toggleRowSelection: (id: number, checked: boolean) => void;
}

export const getAvailableAssetsColumns = (
  options: AvailableAssetsColumnsOptions
): ColumnDef<Asset, unknown>[] => [
  {
    id: 'select',
    header: () =>
      h(Field.Checkbox, {
        modelValue: options.isSelectAll,
        'onUpdate:modelValue': options.toggleSelectAll,
        testId: TEST_IDS.assets.availableAssetsForm.selectAllCheckbox,
      }),
    cell: ({ row }) =>
      h(Field.Checkbox, {
        modelValue: options.isSelectAll || options.selectedIds.has(row.original.id),
        disabled: options.isSelectAll,
        'onUpdate:modelValue': (checked: boolean) =>
          options.toggleRowSelection(row.original.id, checked),
        testId: TEST_IDS.assets.availableAssetsForm.assetCheckbox.replace(
          '{id}',
          String(row.original.id)
        ),
      }),
    enableSorting: false,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Asset',
    enableSorting: false,
    cell: ({ row }) =>
      h(EntityAvatar, {
        name: row.original.name,
        logo: row.original.logo,
      }),
  },
  {
    id: 'network',
    accessorKey: 'network.name',
    header: 'Network',
    enableSorting: false,
    cell: ({ row }) =>
      h(
        StatusBadge,
        { variant: 'default' },
        () => `${row.original.network.name} (${row.original.network.symbol})`
      ),
  },
];
