import type * as yup from 'yup';
import type { GenericObject } from 'vee-validate';

export interface StepDefinition {
  title: string;
  description?: string;
  /** Field names that belong to this step (used for per-step validation). */
  fields: string[];
  schema: yup.ObjectSchema<GenericObject>;
}

export interface MultiStepFormOptions<T extends GenericObject = GenericObject> {
  steps: StepDefinition[];
  initialValues?: T;
}
