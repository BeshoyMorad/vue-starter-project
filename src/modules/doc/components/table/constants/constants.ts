interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const TABLE_IMPORT_CODE = `import { Table } from '@/components';`;
export const TABLE_CODE_HEADER_SCRIPT = `<script>`;
export const TABLE_CODE_HEADER_TEMPLATE = `<template>`;

export const TABLE_PAGINATION = {
  nameKey: 'table.pagination.title',
  descriptionKey: 'table.pagination.description',
  code: `<Table
  :columns="columns"
  :value="users"
  :meta="pagination"
  :limit-options="[5, 10, 20]"
  @page-change="handlePageChange"
  @limit-change="handleLimitChange"
/>`,
};

export const TABLE_CURSOR_PAGINATION = {
  nameKey: 'table.cursorPagination.title',
  descriptionKey: 'table.cursorPagination.description',
  code: `<Table
  :columns="columns"
  :value="users"
  :meta="cursorMeta"
  :limit-options="[5, 10, 20]"
  @next="handleNext"
  @prev="handlePrevious"
  @limit-change="handleLimitChange"
/>`,
};

export const TABLE_PROPS = [
  {
    name: 'columns',
    type: 'ColumnDef<TRow, unknown>[]',
    descriptionKey: 'table.props.columns',
  },
  {
    name: 'value',
    type: 'TRow[]',
    descriptionKey: 'table.props.value',
  },
  {
    name: 'loading',
    type: 'boolean',
    descriptionKey: 'table.props.loading',
  },
  {
    name: 'meta',
    type: 'Meta | CursorMeta | null',
    descriptionKey: 'table.props.meta',
  },
  {
    name: 'limitOptions',
    type: 'number[]',
    descriptionKey: 'table.props.limitOptions',
  },
  {
    name: 'clickable',
    type: 'boolean',
    descriptionKey: 'table.props.clickable',
  },
  {
    name: 'isFilteredEmpty',
    type: 'boolean',
    descriptionKey: 'table.props.isFilteredEmpty',
  },
  {
    name: 'isSearchEmpty',
    type: 'boolean',
    descriptionKey: 'table.props.isSearchEmpty',
  },
] as const;

export const TABLE_EVENTS = [
  {
    name: 'sort',
    payload: `{ 
      sortKey?: string; 
      order?: 'ASC' | 'DESC' 
    }`,
    descriptionKey: 'table.events.sort',
  },
  {
    name: 'pageChange',
    payload: 'number',
    descriptionKey: 'table.events.pageChange',
  },
  {
    name: 'limitChange',
    payload: 'number',
    descriptionKey: 'table.events.limitChange',
  },
  {
    name: 'next',
    payload: 'void',
    descriptionKey: 'table.events.next',
  },
  {
    name: 'prev',
    payload: 'void',
    descriptionKey: 'table.events.prev',
  },
  {
    name: 'rowClick',
    payload: 'TRow',
    descriptionKey: 'table.events.rowClick',
  },
] as const;

export const TABLE_DEFINITION_CODE = {
  value: `const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  },
];
`,
  columns: `const columns: ColumnDef<User, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];
`,
  template: `// passing the columns and value as props
<template>
  <Table
    :columns="columns"
    :value="users"
  />
</template>`,
};
export const PAGINATION_META_COMPARISON_CODE_OFFSET = `// Offset Pagination
interface Meta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}`;

export const PAGINATION_META_COMPARISON_CODE_CURSOR = `// Cursor Pagination
interface CursorMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string | null;
  previousCursor: string | null;
  limit: number;
}`;

export const allUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Editor',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'User',
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Admin',
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'User',
  },
  {
    id: 7,
    name: 'Chris Miller',
    email: 'chris@example.com',
    role: 'Editor',
  },
  {
    id: 8,
    name: 'Olivia Taylor',
    email: 'olivia@example.com',
    role: 'User',
  },
  {
    id: 9,
    name: 'Daniel Anderson',
    email: 'daniel@example.com',
    role: 'Admin',
  },
  {
    id: 10,
    name: 'Sophia Thomas',
    email: 'sophia@example.com',
    role: 'User',
  },
  {
    id: 11,
    name: 'James Jackson',
    email: 'james@example.com',
    role: 'Editor',
  },
  {
    id: 12,
    name: 'Isabella White',
    email: 'isabella@example.com',
    role: 'User',
  },
  {
    id: 13,
    name: 'Robert Harris',
    email: 'robert@example.com',
    role: 'Admin',
  },
  {
    id: 14,
    name: 'Mia Martin',
    email: 'mia@example.com',
    role: 'User',
  },
  {
    id: 15,
    name: 'William Thompson',
    email: 'william@example.com',
    role: 'Editor',
  },
  {
    id: 16,
    name: 'Charlotte Garcia',
    email: 'charlotte@example.com',
    role: 'User',
  },
  {
    id: 17,
    name: 'Thomas Martinez',
    email: 'thomas@example.com',
    role: 'Admin',
  },
  {
    id: 18,
    name: 'Amelia Robinson',
    email: 'amelia@example.com',
    role: 'User',
  },
  {
    id: 19,
    name: 'Henry Clark',
    email: 'henry@example.com',
    role: 'Editor',
  },
  {
    id: 20,
    name: 'Harper Lewis',
    email: 'harper@example.com',
    role: 'User',
  },
];
