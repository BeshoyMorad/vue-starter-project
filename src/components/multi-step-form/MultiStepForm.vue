<script setup lang="ts">
  import { useId } from 'vue';
  import { Button } from '@/components';
  import { cn } from '@/utils';
  import { useMultiStepForm } from '@/composables/useMultiStepForm';
  import StepIndicator from './StepIndicator.vue';
  import type { StepDefinition } from './types';
  import type { GenericObject } from 'vee-validate';
  import type { HTMLAttributes } from 'vue';

  // ── Props & Emits ──────────────────────────────────────────────────────────

  interface Props {
    testId: string;
    steps: StepDefinition[];
    initialValues?: GenericObject;
    nextLabel?: string;
    backLabel?: string;
    submitLabel?: string;
    loading?: boolean;
    /** CSS class applied to the form body area. */
    bodyClass?: HTMLAttributes['class'];
  }

  interface Emits {
    (e: 'submit', values: GenericObject): void;
  }

  const {
    testId,
    steps,
    initialValues = undefined,
    nextLabel = 'Next',
    backLabel = 'Back',
    submitLabel = 'Submit',
    loading = false,
    bodyClass = '',
  } = defineProps<Props>();

  const emit = defineEmits<Emits>();

  const formId = `${useId()}-multi-step-form`;

  const {
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
    form,
  } = useMultiStepForm({
    steps,
    initialValues,
  });

  // ── Handlers ───────────────────────────────────────────────────────────────

  const onNext = async () => {
    await next();
  };

  const onBack = () => {
    back();
  };

  const onSubmit = async () => {
    await submit((values) => {
      emit('submit', values);
    });
  };

  const onFormSubmit = async (event: Event) => {
    event.preventDefault();

    if (isLastStep.value) {
      await onSubmit();
    } else {
      await onNext();
    }
  };

  // ── Expose for programmatic access ─────────────────────────────────────────

  defineExpose({
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
  });
</script>

<template>
  <div :data-test-id="testId" class="flex w-full flex-col gap-6">
    <!-- Header / Step indicator -->
    <slot
      name="header"
      :current-step="currentStep"
      :total-steps="totalSteps"
      :completed-steps="completedSteps"
      :go-to="goTo"
    >
      <StepIndicator
        :test-id="testId"
        :steps="steps"
        :current-step="currentStep"
        :completed-steps="completedSteps"
        @go-to="goTo"
      />
    </slot>

    <!-- Form body -->
    <form
      v-auto-animate
      :id="formId"
      :data-test-id="`${testId}-form`"
      :class="cn('w-full', bodyClass)"
      @submit.prevent="onFormSubmit"
    >
      <!--
        Render only the active step's slot.
        Slot names: #step-0, #step-1, #step-2, etc.
      -->
      <template v-for="(step, index) in steps" :key="index">
        <div v-if="index === currentStep">
          <slot :name="`step-${index}`" :step="step" :index="index" />
        </div>
      </template>
    </form>

    <!-- Footer / Navigation buttons -->
    <slot
      name="footer"
      :current-step="currentStep"
      :is-first-step="isFirstStep"
      :is-last-step="isLastStep"
      :next="onNext"
      :back="onBack"
      :submit="onSubmit"
      :loading="loading"
    >
      <div class="flex items-center justify-end gap-3">
        <Button
          :test-id="`${testId}-back-button`"
          type="button"
          variant="ghost"
          class="min-w-28"
          :class="{ invisible: isFirstStep }"
          @click="onBack"
        >
          {{ backLabel }}
        </Button>

        <Button
          v-if="!isLastStep"
          :test-id="`${testId}-next-button`"
          type="submit"
          :form="formId"
          class="min-w-28"
        >
          {{ nextLabel }}
        </Button>

        <Button
          v-else
          :test-id="`${testId}-submit-button`"
          type="submit"
          :form="formId"
          class="min-w-28"
          :loading="loading"
        >
          {{ submitLabel }}
        </Button>
      </div>
    </slot>
  </div>
</template>
