import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server, mountWithProviders, findByTestId } from '@/tests/setup';
import { TEST_IDS } from '@/lib/test-ids';
import { useStarterStore } from '@/modules/starter/stores/starterStore';
import StarterDashboard from './StarterDashboard.vue';

describe('StarterDashboard.vue', () => {
  it('renders loading state, then renders profile card on success, and interacts with Pinia', async () => {
    const mockProfile = {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      email: 'john.doe@example.com',
      status: 'active' as const,
    };

    server.use(
      http.get('*/starter/profile', () => {
        return HttpResponse.json({
          message: 'Success',
          data: mockProfile,
        });
      })
    );

    const wrapper = mountWithProviders(StarterDashboard);

    const loadingEl = findByTestId(wrapper, TEST_IDS.starter.loading);
    expect(loadingEl.exists()).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 50));
    await wrapper.vm.$nextTick();

    expect(findByTestId(wrapper, TEST_IDS.starter.loading).exists()).toBe(false);
    expect(findByTestId(wrapper, TEST_IDS.starter.card).exists()).toBe(true);

    const titleEl = findByTestId(wrapper, TEST_IDS.starter.cardTitle);
    expect(titleEl.text()).toContain('John Doe');

    const descEl = findByTestId(wrapper, TEST_IDS.starter.cardDescription);
    expect(descEl.text()).toContain('john.doe@example.com');

    const store = useStarterStore();
    expect(store.isFilterActive).toBe(false);

    const toggleButton = findByTestId(wrapper, TEST_IDS.starter.filterToggle);
    expect(toggleButton.exists()).toBe(true);

    await toggleButton.trigger('click');

    expect(store.isFilterActive).toBe(true);
  });

  it('renders error state on API failure', async () => {
    server.use(
      http.get('*/starter/profile', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const wrapper = mountWithProviders(StarterDashboard);

    await new Promise((resolve) => setTimeout(resolve, 50));
    await wrapper.vm.$nextTick();

    const errorEl = findByTestId(wrapper, TEST_IDS.starter.error);
    expect(errorEl.exists()).toBe(true);
    expect(findByTestId(wrapper, TEST_IDS.starter.card).exists()).toBe(false);
  });
});
