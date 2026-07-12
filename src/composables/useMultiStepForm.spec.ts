import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { useMultiStepForm } from './useMultiStepForm';
import type { MultiStepFormOptions } from '@/components/form/multi-step-form/types';
import * as yup from 'yup';

const TestComponent = defineComponent({
  props: {
    options: {
      type: Object as () => MultiStepFormOptions,
      required: true,
    },
  },
  setup(props) {
    const multiStepForm = useMultiStepForm(props.options);
    return { multiStepForm };
  },
  template: '<div></div>',
});

describe('useMultiStepForm', () => {
  const getOptions = (): MultiStepFormOptions => ({
    steps: [
      {
        title: 'Step 1',
        fields: ['field1'],
        schema: yup.object({
          field1: yup.string().required('Field 1 is required'),
        }),
      },
      {
        title: 'Step 2',
        fields: ['field2'],
        schema: yup.object({
          field2: yup.string().required('Field 2 is required'),
        }),
      },
      {
        title: 'Step 3',
        fields: ['field3'],
        schema: yup.object({
          field3: yup.string().required('Field 3 is required'),
        }),
      },
    ],
    initialValues: {
      field1: '',
      field2: '',
      field3: '',
    },
  });

  it('initializes step state correctly', () => {
    const wrapper = mount(TestComponent, {
      props: { options: getOptions() },
    });

    const form = wrapper.vm.multiStepForm;
    expect(form.currentStep.value).toBe(0);
    expect(form.totalSteps).toBe(3);
    expect(form.isFirstStep.value).toBe(true);
    expect(form.isLastStep.value).toBe(false);
    expect(form.progress.value).toBe(33);
    expect(form.completedSteps.value.size).toBe(0);
  });

  it('navigates next only when current step is valid', async () => {
    const wrapper = mount(TestComponent, {
      props: { options: getOptions() },
    });

    const form = wrapper.vm.multiStepForm;

    // Initially invalid field1 (empty), so next() should fail
    const nextSuccess1 = await form.next();
    expect(nextSuccess1).toBe(false);
    expect(form.currentStep.value).toBe(0);
    expect(form.completedSteps.value.has(0)).toBe(false);

    // Set field1 to valid value
    form.form.setFieldValue('field1', 'valid value');
    await wrapper.vm.$nextTick();

    const nextSuccess2 = await form.next();
    expect(nextSuccess2).toBe(true);
    expect(form.currentStep.value).toBe(1);
    expect(form.completedSteps.value.has(0)).toBe(true);
  });

  it('navigates back without validation', async () => {
    const wrapper = mount(TestComponent, {
      props: { options: getOptions() },
    });

    const form = wrapper.vm.multiStepForm;
    form.form.setFieldValue('field1', 'valid value');
    await form.next();
    expect(form.currentStep.value).toBe(1);

    form.back();
    expect(form.currentStep.value).toBe(0);
  });

  it('goTo checks previous steps and stops at the first invalid step', async () => {
    const wrapper = mount(TestComponent, {
      props: { options: getOptions() },
    });

    const form = wrapper.vm.multiStepForm;

    // Trying to jump from Step 1 to Step 3 directly while Step 1 is invalid
    await form.goTo(2);
    expect(form.currentStep.value).toBe(0); // stays at 0 because 0 is invalid
    expect(form.completedSteps.value.has(0)).toBe(false);

    // Make Step 1 valid, but Step 2 remains invalid
    form.form.setFieldValue('field1', 'valid value');
    await wrapper.vm.$nextTick();

    // Try jumping to Step 3 again
    await form.goTo(2);
    expect(form.currentStep.value).toBe(1); // goes to 1 because 1 is the first invalid step
    expect(form.completedSteps.value.has(0)).toBe(true);
    expect(form.completedSteps.value.has(1)).toBe(false);

    // Make Step 2 valid as well
    form.form.setFieldValue('field2', 'another valid value');
    await wrapper.vm.$nextTick();

    // Try jumping to Step 3
    await form.goTo(2);
    expect(form.currentStep.value).toBe(2); // successfully moved to 2
    expect(form.completedSteps.value.has(0)).toBe(true);
    expect(form.completedSteps.value.has(1)).toBe(true);
  });

  it('goTo goes backward without validation and manages completedSteps', async () => {
    const wrapper = mount(TestComponent, {
      props: { options: getOptions() },
    });

    const form = wrapper.vm.multiStepForm;
    form.form.setFieldValue('field1', 'val1');
    form.form.setFieldValue('field2', 'val2');
    await wrapper.vm.$nextTick();

    // Go to step 3 (index 2)
    await form.goTo(2);
    expect(form.currentStep.value).toBe(2);
    expect(form.completedSteps.value.has(0)).toBe(true);
    expect(form.completedSteps.value.has(1)).toBe(true);

    // Go backward to step 1 (index 0) - should not do validation, just jump
    await form.goTo(0);
    expect(form.currentStep.value).toBe(0);

    // If step 0 becomes invalid, and we try to jump to step 3 again
    form.form.setFieldValue('field1', ''); // invalid again
    await wrapper.vm.$nextTick();

    await form.goTo(2);
    expect(form.currentStep.value).toBe(0); // blocked at 0
    expect(form.completedSteps.value.has(0)).toBe(false);
    expect(form.completedSteps.value.has(1)).toBe(false);
  });
});
