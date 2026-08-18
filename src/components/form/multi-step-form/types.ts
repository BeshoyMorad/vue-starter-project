import type * as yup from 'yup';
import type { GenericObject } from 'vee-validate';

export type StorageType = 'session' | 'local';

export interface FormPersistenceConfig {
  /** Unique key used in storage. */
  key: string;
  /** Storage mechanism to use. Defaults to 'session'. */
  storage?: StorageType;
  /** Whether to persist and restore the active step index. Defaults to true. */
  persistStep?: boolean;
  /** Whether to automatically clear storage upon successful form submission. Defaults to true. */
  clearOnSubmit?: boolean;
  /** List of field names to exclude from storage (e.g. passwords, sensitive data). */
  excludeFields?: string[];
  /** Optional custom transformer hook before saving values to storage. */
  beforeSave?: (values: GenericObject) => GenericObject;
}

export type FormPersistenceOption = boolean | string | FormPersistenceConfig;

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
  /**
   * Configuration for persisting form state in session or local storage.
   * Can be a string key or a FormPersistenceConfig object.
   */
  persist?: string | FormPersistenceConfig;
}
