import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MediaValue } from '@/types/media';
import { useObjectUrls } from './useObjectUrls';

const media = (overrides: Partial<MediaValue>): MediaValue => ({
  file: null,
  tempUrl: '',
  mediaId: null,
  initialUrl: null,
  isChanged: false,
  wasRemoved: false,
  ...overrides,
});

describe('useObjectUrls', () => {
  let counter = 0;
  const createSpy = vi.fn(() => `blob:test-${++counter}`);
  const revokeSpy = vi.fn();

  beforeEach(() => {
    counter = 0;
    createSpy.mockClear();
    revokeSpy.mockClear();
    URL.createObjectURL = createSpy;
    URL.revokeObjectURL = revokeSpy;
  });

  afterEach(() => vi.restoreAllMocks());

  const setup = () => {
    let api!: ReturnType<typeof useObjectUrls>;
    const wrapper = mount(
      defineComponent({
        setup() {
          api = useObjectUrls();
          return () => h('div');
        },
      })
    );
    return { api, wrapper };
  };

  it('revokes only the urls it still owns on unmount', () => {
    const { api, wrapper } = setup();
    const a = api.create(new Blob(['a']));
    const b = api.create(new Blob(['b']));
    api.revoke(a);
    revokeSpy.mockClear();

    wrapper.unmount();

    expect(revokeSpy).toHaveBeenCalledTimes(1);
    expect(revokeSpy).toHaveBeenCalledWith(b);
  });

  it('recreates a preview url that this instance does not own', () => {
    const { api } = setup();
    const file = new File(['x'], 'x.png', { type: 'image/png' });

    const adopted = api.adopt(media({ file, tempUrl: 'blob:stale' }));

    expect(adopted.tempUrl).toBe('blob:test-1');
    expect(api.adopt(adopted)).toBe(adopted);
  });

  it('leaves server files and items without a file untouched', () => {
    const { api } = setup();
    const server = media({ initialUrl: '/a.png' });

    expect(api.adopt(server)).toBe(server);
    expect(createSpy).not.toHaveBeenCalled();
  });
});
