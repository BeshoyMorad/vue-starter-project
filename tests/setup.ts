import type { VueWrapper, MountingOptions } from '@vue/test-utils';
import type { Component } from 'vue';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

export const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export function findByTestId(wrapper: VueWrapper, testId: string) {
  return wrapper.find(`[data-test-id="${testId}"]`);
}

export interface MountWithProvidersOptions extends MountingOptions<Record<string, unknown>> {
  queryClient?: QueryClient;
  piniaOptions?: Parameters<typeof createTestingPinia>[0];
}

export function mountWithProviders(component: Component, options: MountWithProvidersOptions = {}) {
  const queryClient =
    options.queryClient ||
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });

  const { global = {}, piniaOptions = {}, ...restOptions } = options;
  const { plugins = [], stubs = {}, ...restGlobal } = global;

  return mount(component, {
    ...restOptions,
    global: {
      ...restGlobal,
      plugins: [
        createTestingPinia({ stubActions: false, ...piniaOptions }),
        [VueQueryPlugin, { queryClient }],
        ...plugins,
      ],
      stubs: {
        RouterLink: true,
        ...stubs,
      },
    },
  });
}
