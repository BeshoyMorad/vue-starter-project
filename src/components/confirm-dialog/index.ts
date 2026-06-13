import type { ButtonVariants } from '@/components/ui/button';
import type { HTMLAttributes } from 'vue';

export interface ConfirmDialogProps {
  testId: string;
  icon?: string;
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: ButtonVariants['variant'];
  loading?: boolean;
  autoClose?: boolean;
  hideCloseIcon?: boolean;
  hideHeader?: boolean;
  contentClass?: HTMLAttributes['class'];
  bodyClass?: HTMLAttributes['class'];
  iconClass?: HTMLAttributes['class'];
}

export interface ConfirmDialogEmits {
  (e: 'cancel'): void;
  (e: 'confirm'): void;
}
