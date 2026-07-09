import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useStarterStore = defineStore('starter', () => {
  const isFilterActive = ref<boolean>(false);

  const toggleFilter = () => {
    isFilterActive.value = !isFilterActive.value;
  };

  return {
    isFilterActive,
    toggleFilter,
  };
});
