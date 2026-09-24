import { computed, ref } from 'vue';

import { allUsers } from '../constants/constants';

export function useTablePagination() {
  const currentPage = ref(1);
  const itemsPerPage = ref(5);

  const totalPages = computed(() => Math.ceil(allUsers.length / itemsPerPage.value));

  const users = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;

    return allUsers.slice(start, end);
  });

  const meta = computed(() => ({
    currentPage: currentPage.value,
    itemsPerPage: itemsPerPage.value,
    totalItems: allUsers.length,
    totalPages: totalPages.value,
    hasPreviousPage: currentPage.value > 1,
    hasNextPage: currentPage.value < totalPages.value,
  }));

  function handlePageChange(page: number) {
    currentPage.value = page;
  }

  function handleLimitChange(limit: number) {
    itemsPerPage.value = limit;
    currentPage.value = 1;
  }

  return {
    users,
    meta,
    handlePageChange,
    handleLimitChange,
  };
}
