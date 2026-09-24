import type { TableParams } from '@/composables';

export interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface UserFilters {
  role?: string;
  status?: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Sara Mohamed',
    email: 'sara@example.com',
    role: 'User',
  },
  {
    id: 3,
    name: 'Omar Ali',
    email: 'omar@example.com',
    role: 'User',
  },
  {
    id: 4,
    name: 'Mariam Samir',
    email: 'mariam@example.com',
    role: 'Manager',
  },
  {
    id: 5,
    name: 'Youssef Ahmed',
    email: 'youssef@example.com',
    role: 'User',
  },
  {
    id: 6,
    name: 'Nour Khaled',
    email: 'nour@example.com',
    role: 'User',
  },
  {
    id: 7,
    name: 'Karim Mostafa',
    email: 'karim@example.com',
    role: 'Admin',
  },
  {
    id: 8,
    name: 'Salma Adel',
    email: 'salma@example.com',
    role: 'Manager',
  },
  {
    id: 9,
    name: 'Hana Ibrahim',
    email: 'hana@example.com',
    role: 'User',
  },
  {
    id: 10,
    name: 'Mahmoud Tarek',
    email: 'mahmoud@example.com',
    role: 'User',
  },
  {
    id: 11,
    name: 'Laila Ashraf',
    email: 'laila@example.com',
    role: 'User',
  },
  {
    id: 12,
    name: 'Adam Sameh',
    email: 'adam@example.com',
    role: 'Manager',
  },
  {
    id: 13,
    name: 'Mina George',
    email: 'mina@example.com',
    role: 'User',
  },
  {
    id: 14,
    name: 'Dina Wael',
    email: 'dina@example.com',
    role: 'Admin',
  },
  {
    id: 15,
    name: 'Tamer Hany',
    email: 'tamer@example.com',
    role: 'User',
  },
  {
    id: 16,
    name: 'Rana Emad',
    email: 'rana@example.com',
    role: 'User',
  },
  {
    id: 17,
    name: 'Mostafa Adel',
    email: 'mostafa@example.com',
    role: 'Manager',
  },
  {
    id: 18,
    name: 'Jana Karim',
    email: 'jana@example.com',
    role: 'User',
  },
  {
    id: 19,
    name: 'Ola Sameh',
    email: 'ola@example.com',
    role: 'User',
  },
  {
    id: 20,
    name: 'Hossam Nabil',
    email: 'hossam@example.com',
    role: 'Admin',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMockOffsetUsers = async (
  params: TableParams
): Promise<OffsetPaginatedResponse<MockUser>> => {
  await delay(500);

  const page = params.page ?? 1;
  const limit = params.limit;

  const start = (page - 1) * limit;
  const end = start + limit;

  const data = MOCK_USERS.slice(start, end);

  const totalItems = MOCK_USERS.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    meta: {
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  };
};

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
