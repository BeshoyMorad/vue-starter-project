<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Form } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';

  import { Button, Field } from '@/components';
  import { passwordSchema } from '@/lib/yup';

  const { t, locale } = useI18n();

  const formRef = ref<{ validate: () => Promise<unknown> } | null>(null);
  const hasSubmitted = ref(false);
  const isValid = ref(false);

  const validationSchema = computed(() =>
    toTypedSchema(
      yup.object({
        email: yup.string().label(t('demo.validation.email')).required().email(),
        username: yup.string().label(t('demo.validation.username')).required().min(3),
        password: passwordSchema(t('demo.validation.password')),
      })
    )
  );

  watch(
    () => [locale.value, t('demo.validation.email'), t('yup.mixed.required')] as const,
    () => {
      if (!hasSubmitted.value) return;
      void formRef.value?.validate();
    },
    { flush: 'post' }
  );

  function onSubmit() {
    hasSubmitted.value = true;
    isValid.value = true;
  }

  function onInvalidSubmit() {
    hasSubmitted.value = true;
    isValid.value = false;
  }
</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <p class="text-text-secondary text-xs leading-5">
      {{ t('demo.validation.hint') }}
    </p>

    <Form
      ref="formRef"
      :validation-schema="validationSchema"
      class="space-y-4"
      @submit="onSubmit"
      @invalid-submit="onInvalidSubmit"
    >
      <Field.Text
        :label="t('demo.validation.email')"
        :placeholder="t('demo.validation.emailPlaceholder')"
        name="email"
        test-id="localization-yup-email"
      />

      <Field.Text
        :label="t('demo.validation.username')"
        :placeholder="t('demo.validation.usernamePlaceholder')"
        name="username"
        test-id="localization-yup-username"
      />

      <Field.Password
        :label="t('demo.validation.password')"
        :placeholder="t('demo.validation.passwordPlaceholder')"
        name="password"
        test-id="localization-yup-password"
      />

      <Button test-id="localization-yup-submit" class="w-full" type="submit">
        {{ t('common.submit') }}
      </Button>
    </Form>

    <p
      v-if="isValid"
      class="border-border-secondary bg-primary-500/5 text-primary-600 rounded-lg border p-3 text-sm"
    >
      {{ t('demo.validation.success') }}
    </p>
  </div>
</template>
