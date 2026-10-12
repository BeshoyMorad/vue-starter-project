import type { HTMLAttributes } from 'vue';
import type { BaseFormFieldProps, FormFieldValidationProps } from '@/components/form/types';

export type InputColorVariant = 'default' | 'wheel' | 'swatch';
export type InputColorShape = 'square' | 'circle';

export interface BaseInputColorProps extends BaseFormFieldProps {
  modelValue?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  presets?: string[];
  showPresets?: boolean;
  showCustomPicker?: boolean;
  showEyeDropper?: boolean;
  showCopy?: boolean;
  variant?: InputColorVariant;
  shape?: InputColorShape;
  showInput?: boolean;
  required?: boolean;
  validate?: boolean | ((val: string) => boolean | string);
  errorMessage?: string;
  ariaInvalid?: boolean;
  wrapperClass?: HTMLAttributes['class'];
  inputClass?: HTMLAttributes['class'];
  triggerClass?: HTMLAttributes['class'];
  wheelClass?: HTMLAttributes['class'];
}

export type InputColorProps = BaseInputColorProps & FormFieldValidationProps;
