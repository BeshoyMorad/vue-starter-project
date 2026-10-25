import type { HTMLAttributes } from 'vue';
import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export interface BaseTextareaProps extends BaseFormFieldProps {
  modelValue?: string | number;
  defaultValue?: string | number;
}

export type TextareaProps = BaseTextareaProps & FormFieldValidationProps;

export interface TextAreaWithMediaProps extends BaseFormFieldProps {
  textAreaName: string;
  mediaName: string;
  placeholder?: string;
  submitLabel?: string;
  containerClass?: HTMLAttributes['class'];
  loading?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  hideAttachmentButton?: boolean;
  hideSaveButton?: boolean;
}
