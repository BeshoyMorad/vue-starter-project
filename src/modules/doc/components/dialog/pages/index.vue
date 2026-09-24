<script setup lang="ts">
  import { Button, Dialog, ConfirmDialog, FormDialog, Field } from '@/components';
  import Codeblock from '@/components/codeblock/codeblock.vue';
  import { DIALOG_VARIANTS } from '../constants/constants';
  import { useAppLocale } from '@/composables';
  import { ref } from 'vue';
  const isOpen = ref(false);
  const name = ref('');
  const email = ref('');
  const onSubmit = () => {
    const formData = {
      name: name.value.trim().toUpperCase(),
      email: email.value.trim().toLowerCase(),
    };
    console.log('Submitted data:', formData);

    isOpen.value = false;
    onCancel();
  };
  const onCancel = () => {
    name.value = '';
    email.value = '';
  };
  const { t } = useAppLocale();
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ t('dialog.title') }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ t('dialog.description') }}
      </p>
    </section>

    <section class="space-y-4">
      <div class="grid grid-cols-1 gap-5">
        <div
          v-for="item in DIALOG_VARIANTS"
          :key="item.type"
          class="border-border-base/50 bg-surface-primary overflow-hidden rounded-xl border shadow-xs"
        >
          <div class="border-border-base/50 border-b px-6 py-4">
            <h3 class="text-text-primary font-semibold">
              {{ t(item.nameKey) }}
            </h3>

            <p class="text-text-secondary mt-1 text-sm">
              {{ t(item.descriptionKey) }}
            </p>
          </div>

          <div class="space-y-3 p-6">
            <div>
              <h4 class="text-text-primary text-sm font-semibold">
                {{ t('dialog.import.title') }}
              </h4>

              <p class="text-text-secondary mt-1 text-xs">
                {{ t('dialog.import.description') }}
              </p>
            </div>

            <Codeblock :code="item.importCode" :header="t('dialog.import.codeHeader')" />
          </div>
          <!-- Preview -->
          <div class="space-y-3 px-6 pb-6">
            <div
              class="border-border-base/50 flex min-h-24 items-center justify-center rounded-lg border p-6"
            >
              <Dialog v-if="item.type === 'dialog'" title="Dialog" description="Description">
                <template #trigger>
                  <Button test-id="">Open</Button>
                </template>

                <div>dialog content goes here</div>

                <template #footer>
                  <div>footer</div>
                </template>
              </Dialog>

              <ConfirmDialog
                v-else-if="item.type === 'confirm'"
                test-id=""
                title="title"
                description="description"
                icon="hugeicons--circle"
              >
                <template #trigger>
                  <Button test-id="">Open Confirm</Button>
                </template>
              </ConfirmDialog>

              <FormDialog
                v-else
                v-model:open="isOpen"
                title="Create User"
                description="Enter the user information below."
                submit-label="Create User"
                cancel-label="Cancel"
                is-dirty
                test-id="create-user-dialog"
                @cancel="onCancel"
                @submit="onSubmit"
              >
                <div class="space-y-4">
                  <Field.Text
                    v-model="name"
                    test-id="create-user-name"
                    label="Name"
                    placeholder="Enter your name"
                  />
                  <Field.Text
                    v-model="email"
                    type="email"
                    test-id="create-user-email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                </div>
                <template #trigger>
                  <Button test-id="">Open Form Dialog</Button>
                </template>
              </FormDialog>
            </div>
          </div>

          <div class="p-6">
            <div class="mb-3">
              <h4 class="text-text-primary text-sm font-semibold">
                {{ t('dialog.howToUse.title') }}
              </h4>

              <p class="text-text-secondary mt-1 text-xs">
                {{ t('dialog.howToUse.description') }}
              </p>
            </div>

            <Codeblock :code="item.code" :header="t('dialog.howToUse.codeHeader')" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
