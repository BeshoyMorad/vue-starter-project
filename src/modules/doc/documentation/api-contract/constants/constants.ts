import type { DocSection } from '@/modules/doc/shared/types';
import { API_CONTRACT_ERROR_SECTIONS } from './api-error';

export const API_CONTRACT_DOC = {
  title: 'API Contract',
  description:
    'The API contract is the set of response shapes the frontend agrees on with the backend. It is declared once, as global types, in src/types/global.d.ts. Services, mutations, tables and error handling all depend on it, so start here before you build any feature and change it carefully.',
} as const;

const GLOBAL_D_CODE = `// src/types/global.d.ts  (global: no import needed anywhere)
declare global {
  // Every successful response: { message, data }
  interface ApiResponse<T = unknown> {
    message: string;
    data: T;
  }

  // Every failed response
  interface ApiErrorResponse {
    message: string;
    error?: string;
    statusCode: number;
    errors?: Record<string, string | string[]>; // field -> message(s)
  }

  // Offset pagination (page / limit)
  interface Meta {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }
  interface OffsetPaginatedResponse<T = unknown> { data: T[]; meta: Meta }

  // Cursor pagination (cursor / limit)
  interface CursorMeta {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextCursor: string | null;
    previousCursor: string | null;
    limit: number;
  }
  interface CursorPaginatedResponse<T = unknown> { data: T[]; meta: CursorMeta }

  interface Image { url: string; extension: string; name: string; path: string }
  export type Prettify<T> = T & { [K in keyof T]: T[K] };
}`;

const SHAPES_JSON_CODE = `// GET /users  -> OffsetPaginatedResponse<User>
{ "data": [ { "id": 1, "name": "Sara" } ],
  "meta": { "currentPage": 1, "itemsPerPage": 10, "totalItems": 42,
            "totalPages": 5, "hasPreviousPage": false, "hasNextPage": true } }

// POST /users  -> ApiResponse<User>
{ "message": "User created successfully", "data": { "id": 2, "name": "Omar" } }

// 422 -> ApiErrorResponse
{ "message": "Validation failed", "statusCode": 422,
  "errors": { "email": "Email already taken", "wallets.0.address": ["Invalid address"] } }`;

const USAGE_CODE = `// 1) Service: the contract types the payload
const response = await api.get<ApiResponse<User>>(apiRoute('users.detail', { id }));
return response.data;                     // ApiResponse<User>

// 2) Mutation: success type + error type + variables
useMutation<ApiResponse<User>, unknown, CreateUserPayload>({ ... });

// 3) Table: the same Meta type feeds Table and pagination
const { data, meta } = useDataTable<User>({ queryKey, endpoint });
const total = (meta.value as Meta | null)?.totalItems;

// 4) Errors: ApiErrorResponse is read only in src/utils/apiError.ts
getApiErrorMessage(err); // reads response.data.message`;

const DEPENDENTS_ITEMS = [
  {
    name: 'src/composables/useDataTable.ts',
    description:
      'Reads rawResponse.data and rawResponse.meta, and Meta / CursorMeta (hasNextPage, nextCursor, previousCursor) in goToNext and goToPrev.',
  },
  {
    name: 'src/composables/useDataInfiniteScroll.ts',
    description:
      'Reads page.data, and meta.nextCursor / meta.hasNextPage / meta.currentPage in getNextPageParam.',
  },
  {
    name: 'src/composables/types.ts',
    description:
      'BaseDataQueryReturn and the return types expose Meta | CursorMeta. Update them if the meta shape changes.',
  },
  {
    name: 'src/lib/api/table.ts',
    description:
      'fetchTableData returns the raw body typed by the caller (OffsetPaginatedResponse or CursorPaginatedResponse).',
  },
  {
    name: 'src/composables/useUploadImage.ts',
    description: 'Reads response.data.data for the presigned urls, and the message on error.',
  },
  {
    name: 'src/utils/apiError.ts',
    description:
      'The only reader of ApiErrorResponse (message, errors). Every form error goes through it.',
  },
  {
    name: 'src/components/data-table/Table.vue',
    description: 'Takes the meta prop (Meta or CursorMeta) to render pagination.',
  },
  {
    name: 'modules/*/services and mutations',
    description: 'Use ApiResponse<T> for return types and data.message for success toasts.',
  },
] as const;

const EDIT_STEPS_CODE = `1. Edit the interface in src/types/global.d.ts
2. Run   pnpm type-check     -> every broken usage is listed by TypeScript
3. Search the readers of the changed field:
   grep -rn "\\.meta\\|\\.data\\.data\\|\\.message\\|\\.errors" src --include=*.ts --include=*.vue
4. Fix the shared readers first (apiError, useDataTable, useDataInfiniteScroll,
   useTableState, types.ts, useUploadImage), then the module services
5. Update the mock handlers in tests/ (MSW) and the doc mocks in modules/doc
6. Run   pnpm type-check && pnpm test:unit --run <spec>`;

const EDIT_EXAMPLE_CODE = `// Example: the backend renames "meta" to "pagination" and "data" stays.

// 1) global.d.ts
interface OffsetPaginatedResponse<T = unknown> { data: T[]; pagination: Meta }

// 2) useDataTable.ts  (only place that reads it for tables)
const meta = computed(() => rawResponse.value?.pagination ?? null);

// 3) useDataInfiniteScroll.ts
const meta = (lastPage as OffsetPaginatedResponse<TData>).pagination;
rawPages.value?.pages.at(0)?.pagination;

// Prefer: map it ONCE in fetchTableData (src/lib/api/table.ts) so the
// composables, Table and every page keep working unchanged:
const { data } = await api.get(endpoint, { params: cleanParams });
return { data: data.data, meta: data.pagination } as TResponse;`;

const CONTRACT_STEPS_CODE = `// Checklist when you start a new project or a new backend
[ ] Success envelope?        -> ApiResponse<T>
[ ] Error envelope?          -> ApiErrorResponse (message, statusCode, errors)
[ ] Field error format?      -> errors: { field: 'msg' | ['msg'] } (nested + indexed OK)
[ ] Offset or cursor lists?  -> Meta / CursorMeta
[ ] Query params names?      -> page, limit, search, sortKey, order, filters[x]
                                (set in useTableState + TableParams in composables/types.ts)
[ ] Auth error codes?        -> 401 / 403 / 419 / 500 handled in src/lib/api/client.ts`;

export const API_CONTRACT_SECTIONS: readonly DocSection[] = [
  {
    title: 'Where the contract lives',
    description:
      'src/types/global.d.ts declares global interfaces, so you can use ApiResponse, ApiErrorResponse, Meta, CursorMeta, OffsetPaginatedResponse and CursorPaginatedResponse anywhere without importing them. It also augments TanStack ColumnMeta with align, width and colSpan. Module-only types (User, Asset) do not belong here: put them in modules/<feature>/types.ts.',
    header: 'global.d.ts',
    code: GLOBAL_D_CODE,
  },
  {
    title: 'The agreed response shapes',
    description:
      'These are the three payloads the whole frontend expects. If the backend sends something else, change the contract (and its readers) rather than casting in a component.',
    header: 'JSON',
    code: SHAPES_JSON_CODE,
  },
  {
    title: 'Start with the contract',
    description:
      'Before building a feature, confirm the backend follows the contract. This is the first step of the add-endpoint and new-feature skills.',
    code: CONTRACT_STEPS_CODE,
    header: 'checklist',
  },
  {
    title: 'How the contract is used',
    description:
      'Use ApiResponse<T> for single results and the paginated types for lists. Never redeclare the envelope inside a module.',
    code: USAGE_CODE,
    header: 'usage',
  },
  {
    title: 'Every file that depends on the contract',
    description:
      'When you edit global.d.ts, review this list. TypeScript catches most breaks, but not the ones that read from an untyped body.',
    items: DEPENDENTS_ITEMS,
  },
  {
    title: 'How to edit the contract safely',
    description:
      'Change the type first and let the compiler guide you. Keep the translation from backend to frontend shape in one place (fetchTableData for lists, apiError for errors) instead of spreading it over pages.',
    codeArr: [
      { header: 'steps', code: EDIT_STEPS_CODE },
      { header: 'example', code: EDIT_EXAMPLE_CODE },
    ],
  },
  ...API_CONTRACT_ERROR_SECTIONS,
];
