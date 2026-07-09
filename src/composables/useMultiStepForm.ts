import { computed, ref, type Ref } from 'vue';
import { useForm, type GenericObject, type FormContext } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import type { MultiStepFormOptions } from '@/components/multi-step-form/types';

export interface UseMultiStepFormReturn {
  /** The underlying VeeValidate form context (exposes values, errors, setFieldValue, etc.). */
  form: FormContext<GenericObject>;

  currentStep: Ref<number>;
  totalSteps: number;
  isFirstStep: Ref<boolean>;
  isLastStep: Ref<boolean>;
  progress: Ref<number>;
  completedSteps: Ref<Set<number>>;

  /** Validate current step's fields, advance if valid. Returns `true` if advanced. */
  next: () => Promise<boolean>;
  /** Move to the previous step (no validation). */
  back: () => void;
  /** Jump to an arbitrary step index. */
  goTo: (step: number) => void;
  /**
   * Validate all steps, then call the provided `onSubmit` callback.
   * If validation fails, auto-navigates to the first step with errors.
   * Returns `true` if submission was triggered.
   */
  submit: (onSubmit: (values: GenericObject) => void | Promise<void>) => Promise<boolean>;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Build a single Yup schema by merging the `fields` from every step's schema.
 */
function buildCombinedSchema(steps: MultiStepFormOptions['steps']) {
  const combinedShape = steps.reduce<Record<string, yup.Schema>>(
    (shape, step) => Object.assign(shape, step.schema.fields),
    {}
  );
  return yup.object(combinedShape);
}

/**
 * Validate only the fields that belong to a given step.
 * Returns `true` when every field is valid.
 */
async function validateStepFields(
  form: FormContext<GenericObject>,
  fields: string[]
): Promise<boolean> {
  const results = await Promise.all(fields.map((field) => form.validateField(field as never)));
  return results.every((r) => r.valid);
}

/**
 * Given the current error map, find the first step (by index) that
 * contains at least one field with an error.
 */
function findFirstStepWithError(
  options: MultiStepFormOptions,
  errors: Record<string, string | undefined>,
  fallback: number
): number {
  const errorFields = new Set(Object.keys(errors).filter((k) => errors[k]));

  for (let i = 0; i < options.steps.length; i++) {
    if (options.steps[i].fields.some((f) => errorFields.has(f))) return i;
  }

  return fallback;
}

// ─── Navigation factory ────────────────────────────────────────────────────────

function createNavigation(
  form: FormContext<GenericObject>,
  options: MultiStepFormOptions,
  currentStep: Ref<number>,
  isFirstStep: Ref<boolean>,
  isLastStep: Ref<boolean>,
  completedSteps: Ref<Set<number>>
) {
  const { steps } = options;
  const totalSteps = steps.length;

  const next = async (): Promise<boolean> => {
    const isValid = await validateStepFields(form, steps[currentStep.value].fields);
    if (!isValid) return false;
    completedSteps.value = new Set([...completedSteps.value, currentStep.value]);
    if (!isLastStep.value) currentStep.value++;
    return true;
  };

  const back = (): void => {
    if (!isFirstStep.value) currentStep.value--;
  };

  const goTo = (step: number): void => {
    if (step >= 0 && step < totalSteps) currentStep.value = step;
  };

  const submit = async (
    onSubmit: (values: GenericObject) => void | Promise<void>
  ): Promise<boolean> => {
    const validations = await Promise.all(
      steps.map((_, i) => validateStepFields(form, steps[i].fields))
    );

    if (!validations.every(Boolean)) {
      goTo(findFirstStepWithError(options, form.errors.value, currentStep.value));
      return false;
    }

    completedSteps.value = new Set(steps.map((_, i) => i));
    await form.handleSubmit(async (values) => onSubmit(values))();
    return true;
  };

  return { next, back, goTo, submit };
}

export function useMultiStepForm(options: MultiStepFormOptions): UseMultiStepFormReturn {
  const { steps, initialValues } = options;

  const form = useForm<GenericObject>({
    validationSchema: toTypedSchema(buildCombinedSchema(steps)),
    initialValues,
    keepValuesOnUnmount: true,
  });

  const currentStep = ref(0);
  const totalSteps = steps.length;
  const completedSteps = ref<Set<number>>(new Set());

  const isFirstStep = computed(() => currentStep.value === 0);
  const isLastStep = computed(() => currentStep.value === totalSteps - 1);
  const progress = computed(() => Math.round(((currentStep.value + 1) / totalSteps) * 100));

  const { next, back, goTo, submit } = createNavigation(
    form,
    options,
    currentStep,
    isFirstStep,
    isLastStep,
    completedSteps
  );

  return {
    form,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    progress,
    completedSteps,
    next,
    back,
    goTo,
    submit,
  };
}
