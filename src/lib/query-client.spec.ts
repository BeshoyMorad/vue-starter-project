import { describe, expect, it } from 'vitest';
import { hashKey } from '@tanstack/vue-query';

import { createQueryClient } from './query-client';

describe('createQueryClient', () => {
  it('hashes query keys with the injected locale', () => {
    const client = createQueryClient(() => 'ar');
    const queryKey = ['users', 'list'] as const;
    const hashFn = client.getDefaultOptions().queries?.queryKeyHashFn;

    expect(hashFn?.(queryKey)).toBe(`${hashKey(['ar', ...queryKey])}`);
  });

  it('does not attach a locale hash function when no getter is provided', () => {
    const client = createQueryClient();

    expect(client.getDefaultOptions().queries?.queryKeyHashFn).toBeUndefined();
  });
});
