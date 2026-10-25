import type { MediaValue } from '@/types/media';
import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export interface BaseFileUploadProps {
  testId?: string;
  modelValue?: MediaValue[];
  disabled?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  ariaInvalid?: boolean;
  allowedTypes?: string[];
  maxFiles?: number;
  maxSizeMb?: number;
  hasDisplayHint?: boolean;
  hasPlaceholder?: boolean;
}

export type FileUploadProps = Omit<BaseFileUploadProps, 'testId' | 'ariaInvalid'> &
  BaseFormFieldProps &
  FormFieldValidationProps;
