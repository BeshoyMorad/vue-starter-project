import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import type { AssetVault } from '@/modules/assets/types';
import { EntityAvatar, StatusBadge, WalletAddress } from '@/components';
import AssetActions from '@/modules/assets/components/AssetActions.vue';
import { formatStatus } from '@/utils/format-status';

export const assetColumns: ColumnDef<AssetVault, unknown>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Asset',
    enableSorting: false,
    cell: ({ row }) => h(EntityAvatar, { name: row.original.name, logo: row.original.logo }),
  },
  {
    id: 'symbol',
    accessorKey: 'symbol',
    header: 'Symbol',
    enableSorting: false,
    cell: ({ row }) => h('span', { class: 'uppercase' }, row.original.symbol),
  },
  {
    id: 'contractAddress',
    accessorKey: 'contractAddress',
    header: 'Contract Address',
    enableSorting: false,
    cell: ({ row }) => h(WalletAddress, { address: row.original.contractAddress }),
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
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === 'ACTIVE' ? 'success' : 'danger';
      return h(StatusBadge, { variant }, () => formatStatus(status));
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: { align: 'right' },
    enableSorting: false,
    cell: ({ row }) =>
      h(AssetActions, {
        asset: row.original,
      }),
  },
];
