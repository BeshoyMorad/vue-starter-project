import type { FormFieldValidationProps } from '@/components/form/types';

export interface FieldShellProps extends FormFieldValidationProps {
  /** Id applied to the control in standalone mode (vee-validate generates one otherwise). */
  id?: string;
  /** Renders a required asterisk next to the label. */
  required?: boolean;
  /**
   * `header`: shell renders the label (+ `label-action` slot) above the control.
   * `none`: the Base component renders its own label (Switch, Checkbox).
   */
  labelMode?: 'header' | 'none';
}
