import type { RowData } from '@tanstack/vue-table';

export {};

declare global {
  export type Prettify<T> = T & { [K in keyof T]: T[K] };

  interface ApiResponse<T = unknown> {
    message: string;
    data: T;
  }

  interface Image {
    url: string;
    extension: string;
    name: string;
    path: string;
  }

  interface CursorPaginatedMeta {
    path: string;
    per_page: number;
    next_cursor: string | null;
    prev_cursor: string | null;
    total?: number;
  }

  interface CursorPaginatedResponse<T = unknown> {
    data: T[];
    meta: CursorPaginatedMeta;
  }
}

declare module '@tanstack/vue-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right';
    width?: string;
    colSpan?: number;
  }
}
