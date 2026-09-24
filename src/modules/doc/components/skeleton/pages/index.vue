<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import { Skeleton } from '@/components';

  import {
    SKELETON_IMPORT_CODE,
    SKELETON_BASIC_CODE,
    SKELETON_TEXT_CODE,
    SKELETON_CARD_CODE,
    SKELETON_DOC,
    SKELETON_CODE_HEADER,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ SKELETON_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ SKELETON_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="SKELETON_DOC.import.title"
      :description="SKELETON_DOC.import.description"
      :code="SKELETON_IMPORT_CODE"
      :header="SKELETON_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ SKELETON_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ SKELETON_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="SKELETON_DOC.basic.title"
          :description="SKELETON_DOC.basic.description"
          :how-to-use="SKELETON_DOC.basic.howToUse"
          :header="SKELETON_CODE_HEADER.template"
          :code-arr="[
            {
              code: SKELETON_BASIC_CODE,
              header: SKELETON_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <Skeleton class="h-12 w-12" />
          </template>
        </Card>

        <!-- Text -->
        <Card
          :title="SKELETON_DOC.text.title"
          :description="SKELETON_DOC.text.description"
          :how-to-use="SKELETON_DOC.text.howToUse"
          :header="SKELETON_CODE_HEADER.template"
          :code-arr="[
            {
              code: SKELETON_TEXT_CODE,
              header: SKELETON_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <div class="flex w-full max-w-md flex-col gap-3">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-4/5" />
              <Skeleton class="h-4 w-3/5" />
            </div>
          </template>
        </Card>

        <!-- Card -->
        <Card
          :title="SKELETON_DOC.card.title"
          :description="SKELETON_DOC.card.description"
          :how-to-use="SKELETON_DOC.card.howToUse"
          :header="SKELETON_CODE_HEADER.template"
          :code-arr="[
            {
              code: SKELETON_CARD_CODE,
              header: SKELETON_CODE_HEADER.template,
            },
          ]"
        >
          <template #preview>
            <div class="flex w-full flex-col items-center justify-center space-x-6 md:flex-row">
              <div class="w-full max-w-md space-y-4">
                <Skeleton class="h-48 w-full" />

                <div class="space-y-3">
                  <Skeleton class="h-6 w-3/5" />
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 w-4/5" />
                </div>
              </div>

              <div class="w-full max-w-md space-y-4">
                <Skeleton class="h-48 w-full" />

                <div class="space-y-3">
                  <Skeleton class="h-6 w-3/5" />
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
