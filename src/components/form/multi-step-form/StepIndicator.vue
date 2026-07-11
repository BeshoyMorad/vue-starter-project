<script setup lang="ts">
  import { Icon } from '@/components';
  import { cn } from '@/utils';

  interface Props {
    testId: string;
    /** Ordered list of step labels. */
    steps: { title: string; description?: string }[];
    /** 0-based index of the active step. */
    currentStep: number;
    /** Indices of steps that have been validated successfully. */
    completedSteps: Set<number>;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'go-to', step: number): void;
  }>();

  const getStepState = (index: number) => {
    if (props.completedSteps.has(index)) return 'completed';
    if (index === props.currentStep) return 'active';
    return 'pending';
  };
</script>

<template>
  <nav :data-test-id="`${testId}-step-indicator`" class="w-full" aria-label="Form steps">
    <ol class="flex items-center">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center"
        :class="{ 'flex-1': index < steps.length - 1 }"
      >
        <!-- Step circle + label -->
        <button
          type="button"
          :data-test-id="`${testId}-step-${index}`"
          class="group flex shrink-0 cursor-pointer items-center gap-3 outline-none"
          :aria-current="index === currentStep ? 'step' : undefined"
          :aria-label="`Step ${index + 1}: ${step.title}`"
          @click="emit('go-to', index)"
        >
          <!-- Circle -->
          <span
            :class="
              cn(
                'flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                {
                  'border-bg-primary-default bg-bg-primary-default text-text-base':
                    getStepState(index) === 'completed',
                  'border-bg-primary-default text-text-primary bg-transparent':
                    getStepState(index) === 'active',
                  'border-border-default text-text-placeholder bg-transparent':
                    getStepState(index) === 'pending',
                }
              )
            "
          >
            <Icon
              v-if="getStepState(index) === 'completed'"
              :test-id="`${testId}-step-${index}-check`"
              icon="hugeicons--checkmark-circle-02"
              class="size-5"
            />
            <span v-else>{{ index + 1 }}</span>
          </span>

          <!-- Label -->
          <span class="hidden flex-col items-start sm:flex">
            <span
              :class="
                cn('text-sm font-medium transition-colors duration-200', {
                  'text-text-primary': getStepState(index) !== 'pending',
                  'text-text-placeholder': getStepState(index) === 'pending',
                })
              "
            >
              {{ step.title }}
            </span>
            <span v-if="step.description" class="text-text-disabled text-xs">
              {{ step.description }}
            </span>
          </span>
        </button>

        <!-- Connector line -->
        <div
          v-if="index < steps.length - 1"
          :class="
            cn('mx-3 h-0.5 flex-1 rounded-full transition-colors duration-300', {
              'bg-bg-primary-default': completedSteps.has(index),
              'bg-border-default': !completedSteps.has(index),
            })
          "
        />
      </li>
    </ol>
  </nav>
</template>
