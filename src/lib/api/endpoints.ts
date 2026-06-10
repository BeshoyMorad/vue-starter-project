import { route as ziggyRoute } from 'ziggy-js';
import type { Config, RouteParams } from 'ziggy-js';

const apiBaseUrl = '';
const routes = {
  'auth.login': { uri: 'login', methods: ['POST'] },
  'auth.logout': { uri: 'logout', methods: ['POST'] },
  'auth.refresh-token': { uri: 'refresh-token', methods: ['POST'] },
  'auth.profile': { uri: 'profile', methods: ['GET'] },
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
  return ziggyRoute(name, params, absolute ?? true, Ziggy) as string;
}
