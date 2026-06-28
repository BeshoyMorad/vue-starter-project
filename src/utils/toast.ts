import { toast } from 'vue-sonner';
import { h } from 'vue';
import { CustomToast } from '@/components/ui/sonner';
import { Icon } from '@/components';

export type ToastVariant = 'info' | 'success' | 'error' | 'warn';

interface ToastOptions {
  title?: string;
  body?: string;
  action?: () => void;
}

const VARIANTS = {
  info: {
    method: toast.info,
    defaultTitle: 'Info',
    defaultBody: 'Information',
    icon: 'hugeicons--info',
    iconClass: 'self-start mt-1 bg-blue-600 p-1.5 rounded-md !size-6 !justify-center !items-center',
    closeClass: 'hover:!bg-blue-600 hover:!border-blue-600',
  },
  success: {
    method: toast.success,
    defaultTitle: 'Success',
    defaultBody: 'Success',
    icon: 'custom--check',
    iconClass:
      'self-start mt-1 bg-success-900 p-1.5 rounded-md !size-6 !justify-center !items-center',
    closeClass: 'hover:!bg-success-900 hover:!border-success-900',
  },
  warn: {
    method: toast.warning,
    defaultTitle: 'Warning',
    defaultBody: 'Warning',
    icon: 'hugeicons--alert-02',
    iconClass:
      'self-start mt-1 bg-yellow-600 p-1.5 rounded-md !size-6 !justify-center !items-center',
    closeClass: 'hover:!bg-yellow-600 hover:!border-yellow-600',
  },
  error: {
    method: toast.error,
    defaultTitle: 'Error',
    defaultBody: 'An error occurred',
    icon: 'hugeicons--cancel-circle',
    iconClass: 'self-start mt-1 bg-red-600 p-1.5 rounded-md !size-6 !justify-center !items-center',
    closeClass: 'hover:!bg-red-600 hover:!border-red-600',
  },
} as const;

export function notify(variant: ToastVariant, options: ToastOptions) {
  const config = VARIANTS[variant];
  const title = options.title || config.defaultTitle;
  const body = options.body || config.defaultBody;

  config.method(
    h(CustomToast, {
      title,
      body,
      onClick: options.action,
    }),
    {
      icon: h(Icon, { icon: config.icon, class: 'size-4 text-white' }),
      class: options.action ? 'cursor-pointer' : '',
      classes: {
        icon: config.iconClass,
        closeButton: config.closeClass,
      },
    }
  );
}

export const info = (title?: string, body?: string, action?: () => void) =>
  notify('info', { title, body, action });

export const success = (body?: string) => notify('success', { body });

export const error = (body?: string) => notify('error', { body });

export const warn = (body?: string) => notify('warn', { body });
