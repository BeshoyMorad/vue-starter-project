/**
 * Global registry for all Tanstack Query Keys.
 * Use these constants/functions to avoid typos and ensure invalidations target the exact query.
 */
export const QUERY_KEYS = {
  auth: {
    profile: () => ["auth.profile"] as const,
  },
} as const;
