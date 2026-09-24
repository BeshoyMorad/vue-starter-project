import type { TableParams } from '@/composables';

import { MOCK_USERS, type MockUser } from './data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates an offset-paginated API response.
 */
export const getMockOffsetUsers = (params: TableParams) => {
  const { page = 1, limit = 10, search, role, sortKey, order } = params;

  let users = [...MOCK_USERS];

  // Search
  const normalizedSearch = search?.trim().toLowerCase();

  if (normalizedSearch) {
    users = users.filter((user) =>
      [user.name, user.email, user.role].some((value) =>
        value.toLowerCase().includes(normalizedSearch)
      )
    );
  }

  // Filters
  if (role) {
    users = users.filter((user) => user.role === role);
  }
  if (role === 'all') {
    users = [...MOCK_USERS];
  }

  // Sorting
  if (sortKey) {
    users.sort((a, b) => {
      const aValue = a[sortKey as keyof typeof a];
      const bValue = b[sortKey as keyof typeof b];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      const comparison = String(aValue).localeCompare(String(bValue), undefined, {
        numeric: true,
        sensitivity: 'base',
      });

      return order === 'DESC' ? -comparison : comparison;
    });
  }

  // Pagination
  const total = users.length;
  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const data = users.slice(start, end);

  return {
    data,
    meta: {
      totalItems: users.length,
      currentPage: page,
      itemsPerPage: limit,
      totalPages: totalPages,
      hasNextPage: end < users.length,
      hasPreviousPage: page > 1,
    },
  };
};
/**
 * Simulates a cursor-paginated API response.
 */
export const getMockCursorUsers = async (
  params: TableParams
): Promise<CursorPaginatedResponse<MockUser>> => {
  await delay(500);

  const limit = params.limit;

  const start = params.cursor ? Number(params.cursor) : 0;
  const end = start + limit;

  const data = MOCK_USERS.slice(start, end);

  const nextCursor = end < MOCK_USERS.length ? String(end) : null;

  const previousCursor = start > 0 ? String(Math.max(0, start - limit)) : null;

  return {
    data,
    meta: {
      hasNextPage: nextCursor !== null,
      hasPreviousPage: previousCursor !== null,
      nextCursor,
      previousCursor,
      limit,
    },
  };
};
