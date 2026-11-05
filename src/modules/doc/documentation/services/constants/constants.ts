import type { DocSection } from '@/modules/doc/shared/types';

export const SERVICES_DOC = {
  title: 'Building Services',
  description:
    'A service is the only layer that talks to the backend. It builds the URL with apiRoute, sends the request with the shared api client, and returns a typed result using the API contract. Reference implementation: src/modules/helper/services/index.ts and src/modules/auth/services/index.ts.',
} as const;

const LAYERS_CODE = `Component  ->  composable / mutation  ->  service  ->  api client  ->  backend
(UI)         (state, toast, cache)       (URL + request)  (auth, errors)

Service      : apiRoute(...) + api.get/post/patch/delete + return response.data
Mutation     : useMutation, invalidate QUERY_KEYS, success toast
Composable   : useForm + schema + mutation + payload mapping`;

const STEP_ROUTE_CODE = `// 1) src/lib/api/endpoints.ts  - register the route name once
const routes = {
  // ASSETS
  'assets.list':   { uri: 'assets', methods: ['GET'] },
  'assets.create': { uri: 'assets', methods: ['POST'] },
  'assets.details': { uri: 'assets/{id}', methods: ['GET'] },
  'assets.add-available': { uri: 'assets/available', methods: ['POST'] },
  'assets.toggle-status': { uri: 'assets/{id}/toggle-status', methods: ['PATCH'] },
  'assets.contract-details': { uri: 'networks/{networkId}/contracts/{contractAddress}', methods: ['GET'] },
} as const satisfies Config['routes'];

// 2) src/lib/query-keys.ts  - register the cache keys
assets: {
  all: () => ['assets'] as const,
  list: () => [...QUERY_KEYS.assets.all(), 'list'] as const,
  details: (id: number | string) => [...QUERY_KEYS.assets.all(), 'details', String(id)] as const,
},`;

const STEP_TYPES_CODE = `// 3) src/modules/assets/types.ts  - interface, not type
export interface Asset {
  id: number;
  name: string;
  symbol: string;
}

// request payloads sent to the backend (what the service receives)
export interface CreateCustomTokenPayload {
  name: string;
  symbol: string;
  networkId: number;
  mediaIdsToAdd?: string[];
}`;

const SERVICE_CODE = `// 4) src/modules/assets/services/index.ts
import { api } from '@/lib/api/client';
import { apiRoute } from '@/lib/api/endpoints';
import type { Asset, CreateCustomTokenPayload } from '@/modules/assets/types';

export const assetsServices = {
  // GET with a path param: the type tells callers what data holds
  getAsset: async (id: number) => {
    const response = await api.get<ApiResponse<Asset>>(apiRoute('assets.details', { id }));
    return response.data;
  },

  // POST with a body
  createCustomToken: async (payload: CreateCustomTokenPayload) => {
    const response = await api.post<ApiResponse<Asset>>(apiRoute('assets.create'), payload);
    return response.data;
  },

  // PATCH without a body
  toggleAssetStatus: async (id: number) => {
    const response = await api.patch<ApiResponse<null>>(apiRoute('assets.toggle-status', { id }));
    return response.data;
  },

  // Params that are not in the uri become the query string: /assets?filters[networkId]=3
  addAvailable: async (payload: AddAvailablePayload, networkId?: number) => {
    const route = networkId
      ? apiRoute('assets.add-available', { 'filters[networkId]': networkId })
      : apiRoute('assets.add-available');
    const response = await api.post<ApiResponse<null>>(route, payload);
    return response.data;
  },
};`;

const RETURN_CODE = `// WHAT TO RETURN
return response.data;        // ApiResponse<T> = { message, data }   <- default

// Why the whole envelope?
//  - mutations show data.message in the success toast
//  - callers choose what they need: select: (res) => res.data
//  - the type stays ApiResponse<T>, matching the API contract

// Lists in tables do NOT need a service: useDataTable calls fetchTableData itself
useDataTable<Asset>({ queryKey: QUERY_KEYS.assets.list(), endpoint: apiRoute('assets.list') });

// Keep ONE convention per module. Do not return response.data.data in one function
// and response.data in the next.`;

const QUERY_USAGE_CODE = `// A detail query in a composable (modules/assets/composables/useAsset.ts)
export function useAsset(id: MaybeRefOrGetter<number>) {
  return useQuery({
    queryKey: computed(() => QUERY_KEYS.assets.details(toValue(id))),
    queryFn: () => assetsServices.getAsset(toValue(id)),
    select: (res) => res.data,          // component receives Asset
  });
}`;

const MUTATION_USAGE_CODE = `// modules/assets/mutations/useCreateCustomTokenMutation.ts
export const useCreateCustomTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Asset>, unknown, CreateCustomTokenPayload>({
    mutationFn: (payload) => assetsServices.createCustomToken(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assets.list() });
      success(data.message || 'Custom token added successfully');
    },
  });
};
// Error handling is NOT here: the form composable maps it with applyApiErrorToForm.`;

const RULES_ITEMS = [
  {
    name: 'Do: one object per module',
    description:
      'export const assetsServices = { ... } with async functions, re-exported from the module index.ts.',
  },
  {
    name: 'Do: apiRoute only',
    description:
      'Every URL comes from apiRoute(name, params). Add the name to endpoints.ts first. No "/api/..." strings.',
  },
  {
    name: 'Do: shared api instance',
    description:
      'Import api from @/lib/api/client (auth header, device-id, 401/403/419/500 handling). Never create another axios instance.',
  },
  {
    name: 'Do: type the response',
    description: 'api.get<ApiResponse<T>>(...) so mutations and queries are typed end to end.',
  },
  {
    name: "Don't: toast or try/catch",
    description:
      'Services only throw. Success toasts live in mutations, errors in apiError and the form composable.',
  },
  {
    name: "Don't: transform for the UI",
    description:
      'Map to display values in the composable or a select function. Services return what the backend sent.',
  },
  {
    name: "Don't: inline query keys",
    description: 'Use QUERY_KEYS. Inline arrays break invalidation.',
  },
  {
    name: 'Exception: presigned upload',
    description:
      'The PUT to storage in useUploadImage uses a fresh axios on purpose: the api interceptors would add auth headers and break the signature.',
  },
] as const;

const TEST_CODE = `// src/modules/assets/services/index.spec.ts
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/setup';
import { assetsServices } from './index';

it('returns the created asset envelope', async () => {
  server.use(
    http.post('*/assets', () => HttpResponse.json({ message: 'ok', data: { id: 1 } }))
  );
  const res = await assetsServices.createCustomToken({ name: 'A', symbol: 'A', networkId: 1 });
  expect(res.data.id).toBe(1);
});`;

export const SERVICES_SECTIONS: readonly DocSection[] = [
  {
    title: 'Where a service sits',
    description:
      'Keep the layers separate so each file has one job. This is the data-fetching rule in .claude/rules.',
    code: LAYERS_CODE,
    header: 'layers',
  },
  {
    title: 'Step 1 and 2: route and query key',
    description:
      'Register the route name and the cache keys before you write the service. This is exactly the first two steps of the add-endpoint skill.',
    code: STEP_ROUTE_CODE,
    header: 'registries',
  },
  {
    title: 'Step 3: types',
    description:
      'Request payload and response entity types live in modules/<feature>/types.ts. Use interface. Types for form values come from the yup schema (InferType), so do not retype them.',
    code: STEP_TYPES_CODE,
    header: 'types.ts',
  },
  {
    title: 'Step 4: the service file',
    description:
      'A plain object of async functions. Each function builds a URL, sends the request, and returns response.data.',
    code: SERVICE_CODE,
    header: 'services/index.ts',
  },
  {
    title: 'What a service should return',
    description: 'Return the typed envelope and let the consumer pick what it needs.',
    code: RETURN_CODE,
    header: 'return value',
  },
  {
    title: 'Using a service',
    description:
      'Queries and mutations are the only consumers. Queries use QUERY_KEYS, mutations invalidate them.',
    codeArr: [
      { header: 'query', code: QUERY_USAGE_CODE },
      { header: 'mutation', code: MUTATION_USAGE_CODE },
    ],
  },
  {
    title: 'Rules checklist',
    description: 'The reviewer (fe-review skill) rejects violations of these.',
    items: RULES_ITEMS,
  },
  {
    title: 'Testing a service',
    description: 'Mock HTTP with MSW on the shared server. Do not stub the api client.',
    code: TEST_CODE,
    header: 'spec',
  },
];
