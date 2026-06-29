/**
 * Global registry for all Tanstack Query Keys.
 * Use these constants/functions to avoid typos and ensure invalidations target the exact query.
 */
export const QUERY_KEYS = {
  auth: {
    profile: () => ['auth.profile'] as const,
  },
  corporates: {
    all: () => ['corporates'] as const,
    list: () => [...QUERY_KEYS.corporates.all(), 'list'] as const,
    details: (id: number | string) =>
      [...QUERY_KEYS.corporates.all(), 'details', String(id)] as const,
  },
} as const;
