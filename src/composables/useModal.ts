import { ref } from 'vue';

export function useModal(initialState: boolean = false) {
  const isOpen = ref(initialState);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}
