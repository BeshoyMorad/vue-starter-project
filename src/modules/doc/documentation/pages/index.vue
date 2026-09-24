<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import {
    ARCHITECTURE_DOM,
    ARCHITECTURE_FEATURE_CODE,
    ARCHITECTURE_FEATURE_ITEMS,
    ARCHITECTURE_FLOWS,
    ARCHITECTURE_NEW_FEATURE_CODE,
    ARCHITECTURE_NEW_FEATURE_STEPS,
    ARCHITECTURE_STRUCTURE_CODE,
    ARCHITECTURE_STRUCTURE_ITEMS,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ ARCHITECTURE_DOM.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ ARCHITECTURE_DOM.description }}
      </p>
    </section>

    <!-- Introduction -->
    <Card
      :title="ARCHITECTURE_DOM.introduction.title"
      :description="ARCHITECTURE_DOM.introduction.description"
      :show-preview="false"
    />

    <!-- Project Structure -->
    <Card
      :title="ARCHITECTURE_DOM.structure.title"
      :description="ARCHITECTURE_DOM.structure.description"
      :border="false"
      :structure="ARCHITECTURE_STRUCTURE_CODE"
    >
      <template #preview>
        <div class="w-full space-y-6">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in ARCHITECTURE_STRUCTURE_ITEMS"
              :key="item.name"
              class="border-border-base hover:bg-primary-500/10 hover:border-border-primary rounded-xl border p-4 transition-all"
            >
              <p class="text-text-primary font-mono text-sm font-semibold">
                {{ item.name }}
              </p>

              <p class="text-text-secondary mt-2 text-xs leading-6">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Feature Structure -->
    <Card
      :title="ARCHITECTURE_DOM.featureStructure.title"
      :description="ARCHITECTURE_DOM.featureStructure.description"
      :border="false"
      :structure="ARCHITECTURE_FEATURE_CODE"
    >
      <template #preview>
        <div class="w-full space-y-6">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in ARCHITECTURE_FEATURE_ITEMS"
              :key="item.name"
              class="border-border-base hover:bg-primary-500/10 hover:border-border-primary rounded-xl border p-4 transition-all"
            >
              <p class="text-text-primary font-mono text-sm font-semibold">
                {{ item.name }}
              </p>
              <p class="text-text-secondary mt-2 text-xs leading-6">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <!-- Feature Architecture -->
    <Card
      :title="ARCHITECTURE_DOM.featureArchitecture.title"
      :description="ARCHITECTURE_DOM.featureArchitecture.description"
      :border="false"
    >
      <template #preview>
        <div class="grid w-full gap-6 pt-6 lg:grid-cols-2">
          <div v-for="flow in ARCHITECTURE_FLOWS" :key="flow.key" class="space-y-4">
            <div>
              <h3 class="text-text-primary flex items-center justify-center font-semibold">
                {{ flow.title }}
              </h3>

              <p class="text-text-secondary mt-1 flex items-center justify-center text-sm">
                {{ flow.description }}
              </p>
            </div>

            <div class="bg-bg-secondary flex flex-col items-center rounded-xl p-5">
              <template v-for="(item, index) in flow.items" :key="item.title">
                <div
                  class="bg-bg-surface border-border-base hover:bg-primary-500/10 hover:border-border-primary w-full rounded-xl border p-4 text-center"
                >
                  <p class="text-text-primary font-mono font-semibold">
                    {{ item.title }}
                  </p>

                  <p class="text-text-secondary mt-1 text-sm leading-5">
                    {{ item.description }}
                  </p>
                </div>

                <div v-if="index < flow.items.length - 1" class="text-text-secondary py-2 text-lg">
                  ↓
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Adding a New Feature -->
    <Card
      :title="ARCHITECTURE_DOM.newFeature.title"
      :description="ARCHITECTURE_DOM.newFeature.description"
      :border="false"
      :structure="ARCHITECTURE_NEW_FEATURE_CODE"
    >
      <template #preview>
        <div class="w-full gap-6 lg:grid-cols-2">
          <!-- Steps -->
          <div class="space-y-3">
            <div
              v-for="(step, index) in ARCHITECTURE_NEW_FEATURE_STEPS"
              :key="step"
              class="border-border-base hover:bg-primary-500/10 hover:border-border-primary flex w-full items-center space-x-2 rounded-xl border p-4 text-center font-mono transition-all"
            >
              <div
                class="bg-primary-500 text-bg-surface flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              >
                {{ index + 1 }}
              </div>

              <p class="text-sm">
                {{ step }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
