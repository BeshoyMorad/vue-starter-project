import { ref } from 'vue';

export function useDialog(initialState: boolean = false) {
  const isOpen = ref(initialState);

  const openDialog = () => {
    isOpen.value = true;
  };

  const closeDialog = () => {
    isOpen.value = false;
  };

  const toggleDialog = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
}
