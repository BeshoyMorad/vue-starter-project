<script setup lang="ts">
  import { info, success, error, warn } from '@/utils/toast';

  import Card from '@/components/card/ExampleCard.vue';

  import {
    TOASTER_IMPORT_CODE,
    TOASTER_INFO_CODE,
    TOASTER_SUCCESS_CODE,
    TOASTER_ERROR_CODE,
    TOASTER_WARN_CODE,
    TOASTER_ACTION_CODE,
    TOASTER_DOC,
    TOASTER_CODE_HEADER,
  } from '../constants/constants';
  import Button from '@/components/ui/button/Button.vue';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ TOASTER_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ TOASTER_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="TOASTER_DOC.import.title"
      :description="TOASTER_DOC.import.description"
      :code="TOASTER_IMPORT_CODE"
      :header="TOASTER_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ TOASTER_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ TOASTER_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Info -->
        <Card
          :title="TOASTER_DOC.info.title"
          :description="TOASTER_DOC.info.description"
          :how-to-use="TOASTER_DOC.info.howToUse"
          :header="TOASTER_CODE_HEADER.script"
          :code-arr="[
            { code: TOASTER_INFO_CODE.script, header: TOASTER_CODE_HEADER.script },
            { code: TOASTER_INFO_CODE.template, header: TOASTER_CODE_HEADER.template },
          ]"
        >
          <template #preview>
            <Button
              test-id=""
              class="rounded-md border px-4 py-2 text-sm font-medium"
              @click="info(TOASTER_DOC.info.titleText, TOASTER_DOC.info.body)"
            >
              {{ TOASTER_DOC.info.buttonLabel }}
            </Button>
          </template>
        </Card>

        <!-- Success -->
        <Card
          :title="TOASTER_DOC.success.title"
          :description="TOASTER_DOC.success.description"
          :how-to-use="TOASTER_DOC.success.howToUse"
          :header="TOASTER_CODE_HEADER.script"
          :code-arr="[
            { code: TOASTER_SUCCESS_CODE.script, header: TOASTER_CODE_HEADER.script },
            { code: TOASTER_SUCCESS_CODE.template, header: TOASTER_CODE_HEADER.template },
          ]"
        >
          <template #preview>
            <Button
              variant="success"
              class="rounded-md border px-4 py-2 text-sm font-medium"
              @click="success(TOASTER_DOC.success.body)"
            >
              {{ TOASTER_DOC.success.buttonLabel }}
            </Button>
          </template>
        </Card>

        <!-- Error -->
        <Card
          :title="TOASTER_DOC.error.title"
          :description="TOASTER_DOC.error.description"
          :how-to-use="TOASTER_DOC.error.howToUse"
          :header="TOASTER_CODE_HEADER.script"
          :code-arr="[
            { code: TOASTER_ERROR_CODE.script, header: TOASTER_CODE_HEADER.script },
            { code: TOASTER_ERROR_CODE.template, header: TOASTER_CODE_HEADER.template },
          ]"
        >
          <template #preview>
            <Button
              variant="danger"
              class="rounded-md border px-4 py-2 text-sm font-medium"
              @click="error(TOASTER_DOC.error.body)"
            >
              {{ TOASTER_DOC.error.buttonLabel }}
            </Button>
          </template>
        </Card>

        <!-- Warning -->
        <Card
          :title="TOASTER_DOC.warn.title"
          :description="TOASTER_DOC.warn.description"
          :how-to-use="TOASTER_DOC.warn.howToUse"
          :header="TOASTER_CODE_HEADER.script"
          :code-arr="[
            { code: TOASTER_WARN_CODE.script, header: TOASTER_CODE_HEADER.script },
            { code: TOASTER_WARN_CODE.template, header: TOASTER_CODE_HEADER.template },
          ]"
        >
          <template #preview>
            <Button
              test-id=""
              variant="warning"
              class="rounded-md border px-4 py-2 text-sm font-medium"
              @click="warn(TOASTER_DOC.warn.body)"
            >
              {{ TOASTER_DOC.warn.buttonLabel }}
            </Button>
          </template>
        </Card>

        <!-- Action -->
        <Card
          :title="TOASTER_DOC.action.title"
          :description="TOASTER_DOC.action.description"
          :how-to-use="TOASTER_DOC.action.howToUse"
          :header="TOASTER_CODE_HEADER.script"
          :code-arr="[
            { code: TOASTER_ACTION_CODE.script, header: TOASTER_CODE_HEADER.script },
            { code: TOASTER_ACTION_CODE.template, header: TOASTER_CODE_HEADER.template },
          ]"
        >
          <template #preview>
            <Button
              test-id=""
              class="rounded-md border px-4 py-2 text-sm font-medium"
              @click="
                info(TOASTER_DOC.action.titleText, TOASTER_DOC.action.body, () =>
                  console.log('Action clicked')
                )
              "
            >
              {{ TOASTER_DOC.action.buttonLabel }}
            </Button>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
