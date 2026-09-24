import { computed, ref } from 'vue';

import { allUsers } from '../constants/constants';

export function useTableCursorPagination() {
  const cursorLimit = ref(5);
  const cursorPage = ref(0);

  const users = computed(() => {
    const start = cursorPage.value * cursorLimit.value;

    return allUsers.slice(start, start + cursorLimit.value);
  });

  const meta = computed(() => {
    const totalPages = Math.ceil(allUsers.length / cursorLimit.value);

    return {
      hasNextPage: cursorPage.value < totalPages - 1,
      hasPreviousPage: cursorPage.value > 0,
      nextCursor: cursorPage.value < totalPages - 1 ? `cursor - ${cursorPage.value + 1} ` : null,
      previousCursor: cursorPage.value > 0 ? `cursor - ${cursorPage.value - 1} ` : null,
      limit: cursorLimit.value,
    };
  });

  function handleLimitChange(limit: number) {
    cursorLimit.value = limit;
    cursorPage.value = 0;
  }

  function handleNext() {
    if (meta.value.hasNextPage) {
      cursorPage.value++;
    }
  }

  function handlePrevious() {
    if (meta.value.hasPreviousPage) {
      cursorPage.value--;
    }
  }

  return {
    users,
    meta,
    handleLimitChange,
    handleNext,
    handlePrevious,
  };
}
