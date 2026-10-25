import type { HTMLAttributes } from 'vue';
import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export interface BaseEditorProps extends BaseFormFieldProps {
  modelValue?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  minHeight?: string;
  maxHeight?: string;
  class?: HTMLAttributes['class'];
  invalid?: boolean;
}

export type EditorProps = Omit<BaseEditorProps, 'invalid'> & FormFieldValidationProps;
