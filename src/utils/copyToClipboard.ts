import { useToast } from '@/composables';

export const useCopyToClipboard = () => {
  const toast = useToast();

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  }

  return {
    copyToClipboard,
  };
};
