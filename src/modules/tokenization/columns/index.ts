import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import type { Token } from '@/modules/tokenization/types';
import { EntityAvatar, StatusBadge, WalletAddress } from '@/components';
import TokenActions from '@/modules/tokenization/components/TokenActions.vue';
import { formatStatus } from '@/utils/format-status';

export const tokenColumns: ColumnDef<Token, unknown>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Token',
    enableSorting: false,
    cell: ({ row }) =>
      h(EntityAvatar, {
        name: row.original.name,
        subtitle: row.original.symbol,
        logo: row.original.image,
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
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Token Type',
    enableSorting: false,
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.type),
  },
  {
    id: 'contractAddress',
    accessorKey: 'contractAddress',
    header: 'Contract Address',
    enableSorting: false,
    cell: ({ row }) => h(WalletAddress, { address: row.original.contractAddress }),
  },
  {
    id: 'verificationStatus',
    accessorKey: 'verificationStatus',
    header: 'Verification Status',
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.verificationStatus;
      const variant =
        status === 'VERIFIED' ? 'success' : status === 'PENDING' ? 'warning' : 'danger';
      return h(StatusBadge, { variant }, () => formatStatus(status));
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === 'DEPLOYED' ? 'success' : status === 'PENDING' ? 'warning' : 'danger';
      return h(StatusBadge, { variant }, () => formatStatus(status));
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: { align: 'center' },
    enableSorting: false,
    cell: ({ row }) =>
      h(TokenActions, {
        token: row.original,
      }),
  },
];
