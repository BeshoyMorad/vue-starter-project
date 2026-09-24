<script setup lang="ts">
  import { ref } from 'vue';

  import { Field } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    OTP_IMPORT_CODE,
    OTP_BASIC_CODE,
    OTP_LENGTH_CODE,
    OTP_INTEGER_ONLY_CODE,
    OTP_V_MODEL_CODE,
    OTP_DISABLED_CODE,
    OTP_DOC,
  } from '../constants/constants';

  const otpValue = ref('');

  const disabledOtpValue = ref('123');
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ OTP_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ OTP_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="OTP_DOC.import.title"
      :description="OTP_DOC.import.description"
      :code="OTP_IMPORT_CODE"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ OTP_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ OTP_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="OTP_DOC.basic.title"
          :description="OTP_DOC.basic.description"
          :how-to-use="OTP_DOC.basic.howToUse"
          :code="OTP_BASIC_CODE"
        >
          <template #preview>
            <Field.Otp :length="OTP_DOC.basic.length" :test-id="OTP_DOC.basic.testId" />
          </template>
        </Card>

        <!-- Length -->
        <Card
          :title="OTP_DOC.length.title"
          :description="OTP_DOC.length.description"
          :how-to-use="OTP_DOC.length.howToUse"
          :code="OTP_LENGTH_CODE"
        >
          <template #preview>
            <div class="space-y-6">
              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ OTP_DOC.length.fourLabel }}
                </span>

                <Field.Otp :length="4" :test-id="OTP_DOC.length.fourTestId" />
              </div>

              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ OTP_DOC.length.sixLabel }}
                </span>

                <Field.Otp :length="6" :test-id="OTP_DOC.length.sixTestId" />
              </div>

              <div class="space-y-3">
                <span class="text-text-secondary text-sm font-medium">
                  {{ OTP_DOC.length.eightLabel }}
                </span>

                <Field.Otp :length="8" :test-id="OTP_DOC.length.eightTestId" />
              </div>
            </div>
          </template>
        </Card>

        <!-- Integer Only -->
        <Card
          :title="OTP_DOC.integerOnly.title"
          :description="OTP_DOC.integerOnly.description"
          :how-to-use="OTP_DOC.integerOnly.howToUse"
          :code="OTP_INTEGER_ONLY_CODE"
        >
          <template #preview>
            <Field.Otp :length="6" integer-only :test-id="OTP_DOC.integerOnly.testId" />
          </template>
        </Card>

        <!-- v-model -->
        <Card
          :title="OTP_DOC.vModel.title"
          :description="OTP_DOC.vModel.description"
          :how-to-use="OTP_DOC.vModel.howToUse"
          :code="OTP_V_MODEL_CODE"
        >
          <template #preview>
            <div class="space-y-4">
              <Field.Otp
                v-model="otpValue"
                :length="6"
                integer-only
                :test-id="OTP_DOC.vModel.testId"
              />

              <div class="rounded-md border p-3 text-sm">
                <span class="text-text-secondary">
                  {{ OTP_DOC.vModel.currentValueLabel }}
                </span>

                <span class="text-text-primary ml-2 font-medium">
                  {{ otpValue || OTP_DOC.vModel.emptyValue }}
                </span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Disabled -->
        <Card
          :title="OTP_DOC.disabled.title"
          :description="OTP_DOC.disabled.description"
          :how-to-use="OTP_DOC.disabled.howToUse"
          :code="OTP_DISABLED_CODE"
        >
          <template #preview>
            <Field.Otp
              v-model="disabledOtpValue"
              :length="6"
              disabled
              :test-id="OTP_DOC.disabled.testId"
            />
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
