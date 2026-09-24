export const API_STRUCTURE_DOM = {
  title: 'API Structure',
  description:
    'A centralized structure for defining API routes and TanStack Query keys. Use these files as the single source of truth when working with API endpoints and query caching.',

  location: {
    title: 'Where is the API structure?',
    description:
      'API-related route definitions and query keys are located inside the src/lib/api directory. New developers can start from this folder when they need to find or add an API endpoint or query key.',
    path: 'src/lib/api/',
  },

  endpoints: {
    title: 'API Endpoints',
    description:
      'The endpoints.ts file contains the registered API routes used by the application. Routes are defined with Ziggy and exposed through apiRoute(), so API URLs do not need to be hard-coded throughout the application.',
    filePath: 'src/lib/api/endpoints.ts',
    howToUse:
      'Add or find the API route inside endpoints.ts, then use apiRoute() wherever the application needs to generate the endpoint URL.',
  },

  queryKeys: {
    title: 'Query Keys',
    description:
      'The queryKeys.ts file is the global registry for TanStack Query keys. Keeping query keys in one place prevents typos and ensures that queries and invalidations target the same key.',
    filePath: 'src/lib/api/queryKeys.ts',
    howToUse:
      'Find the required key inside QUERY_KEYS and use the corresponding function when creating queries, mutations, or invalidations.',
  },
  services: {
    title: 'API Services',
    description:
      'API services contain the functions responsible for communicating with the backend. Each feature keeps its service methods inside its own module, while apiRoute() provides the endpoint and the shared api client handles the HTTP request.',
    filePath: 'src/modules/tokenization/services/index.ts',
    howToUse:
      'Create service functions inside the feature services folder. Use apiRoute() to get the endpoint, the shared api client to make the request, and TypeScript types to define the request and response data.',
  },
  structure: {
    title: 'Structure',
  },
} as const;

export const API_STRUCTURE_IMPORT_CODE = `import { apiRoute } from '@/lib/api/endpoints';
import { QUERY_KEYS } from '@/lib/queryKeys';`;

export const API_PROJECT_STRUCTURE = `📁 src/
└── 📁 lib/
    ├── 📁 api/
    │   │
    │   └── 📄 endpoints.ts
    └── 📄 query-keys.ts`;

export const API_ENDPOINTS_CODE = `import { route as ziggyRoute } from 'ziggy-js';
import type { Config, RouteParams } from 'ziggy-js';

const apiBaseUrl = '';

const routes = {
  // USERS
  'users.list': { uri: 'users', methods: ['GET'] },
  'users.create': { uri: 'users', methods: ['POST'] },
  'users.detail': { uri: 'users/{id}', methods: ['GET'] },
  'users.edit': { uri: 'users/{id}', methods: ['PATCH'] },
  'users.delete': { uri: 'users/{id}', methods: ['DELETE'] },

  // AUTH
  'auth.login': { uri: 'login', methods: ['POST'] },
  'auth.logout': { uri: 'logout', methods: ['POST'] },
  'auth.refresh-token': { uri: 'refresh-token', methods: ['POST'] },
  'auth.profile': { uri: 'profile', methods: ['GET'] },

  // STARTER
  'starter.profile': {
    uri: 'starter/profile',
    methods: ['GET'],
  },

  // STORAGE
  'storage.presigned-url': {
    uri: 'storage/presigned-url',
    methods: ['POST'],
  },

  /* <-- ... Add new endpoints routes here --> */
  
} as const satisfies Config['routes'];

export const Ziggy: Config = {
  url: apiBaseUrl,
  port: null,
  defaults: {},
  routes,
};

type ApiRoutes = typeof routes;

export function apiRoute<T extends keyof ApiRoutes = keyof ApiRoutes>(
  name: T,
  params?: RouteParams<T>,
  absolute?: boolean
): string {
  return ziggyRoute(
    name,
    params,
    absolute ?? true,
    Ziggy
  ) as string;
}`;

export const API_ROUTE_USAGE_CODE = `import { api } from '@/lib/api/client';
import { apiRoute } from '@/lib/api/endpoints';

export const usersServices = {
  getUsers: async () => {
    const { data } = await api.get<ApiResponse<User[]>>(
      apiRoute('users.list')
    );
    return data;
  },

  createUser: async (payload: CreateUserPayload) => {
    const { data } = await api.post<ApiResponse<User>>(
      apiRoute('users.create'),
      payload
    );
    return data;
  },
};`;

export const API_QUERY_KEYS_CODE = `/**
 * Global registry for all Tanstack Query Keys.
 * Use these constants/functions to avoid typos
 * and ensure invalidations target the exact query.
 */
export const QUERY_KEYS = {
users: {
  all: () => ['users'] as const,
  list: () => [...QUERY_KEYS.users.all(), 'list'] as const,
  details: (id: number | string) =>
    [
      ...QUERY_KEYS.users.all(),
      'details',
      id.toString(),
    ] as const,
}
networks: {
    all: () => ['networks'] as const,
    list: () => [...QUERY_KEYS.networks.all(), 'list'] as const,
    allNetworks: () => [...QUERY_KEYS.networks.all(), 'all-networks'] as const,
    vaultNetworks: (id: number) => [...QUERY_KEYS.networks.all(), 'vault', id] as const,
  },
  starter: {
    all: () => ['starter'] as const,
    profile: () =>
      [...QUERY_KEYS.starter.all(), 'profile'] as const,
  },
} as const;
... 
`;

export const API_QUERY_KEYS_USAGE_CODE = `import { useQuery } from '@tanstack/vue-query';
import { usersServices } from '@/modules/users/services';
import { QUERY_KEYS } from '@/lib/query-keys';

export function useUser() {

return useQuery({
  queryKey: QUERY_KEYS.users.list(),
  queryFn: usersServices.getUsers,
});`;

export const API_QUERY_KEYS_USAGE_CODE_MUTATION = `import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { usersServices } from '@/modules/users/services';
import { QUERY_KEYS } from '@/lib/query-keys';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      usersServices.createUser(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.list(),
      });
    },
  });
}`;
