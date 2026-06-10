import { toast } from 'vue-sonner';

export const TOAST_LIFE = 5000;

export const useToast = () => {
  const success = (message: string) => {
    toast.success(message, {
      duration: TOAST_LIFE,
    });
  };

  const error = (message: string) => {
    toast.error(message, {
      duration: TOAST_LIFE,
    });
  };

  const warn = (message: string) => {
    toast.warning(message, {
      duration: TOAST_LIFE,
    });
  };

  const info = (message: string) => {
    toast.info(message, {
      duration: TOAST_LIFE,
    });
  };

  return { success, error, warn, info };
};
