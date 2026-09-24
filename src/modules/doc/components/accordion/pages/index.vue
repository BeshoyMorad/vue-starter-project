<script setup lang="ts">
  import Card from '@/components/card/ExampleCard.vue';

  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components';

  import {
    ACCORDION_IMPORT_CODE,
    ACCORDION_BASIC_CODE,
    ACCORDION_MULTIPLE_CODE,
    ACCORDION_DEFAULT_OPEN_CODE,
    ACCORDION_DOC,
    ACCORDION_CODE_HEADER,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ ACCORDION_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ ACCORDION_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      :title="ACCORDION_DOC.import.title"
      :description="ACCORDION_DOC.import.description"
      :code="ACCORDION_IMPORT_CODE"
      :header="ACCORDION_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">
          {{ ACCORDION_DOC.examples.title }}
        </h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ ACCORDION_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="ACCORDION_DOC.basic.title"
          :description="ACCORDION_DOC.basic.description"
          :how-to-use="ACCORDION_DOC.basic.howToUse"
          :header="ACCORDION_CODE_HEADER.template"
          :code="ACCORDION_BASIC_CODE"
        >
          <template #preview>
            <Accordion type="single" collapsible class="w-full">
              <AccordionItem value="item-1 ">
                <AccordionTrigger class="bg-primary-500/2"> What is Vue? </AccordionTrigger>

                <AccordionContent>
                  Vue is a progressive JavaScript framework for building user interfaces.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger class="bg-primary-500/2">
                  What is Composition API?
                </AccordionTrigger>

                <AccordionContent>
                  Composition API is a set of APIs that allows you to write Vue components using
                  imported functions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger class="bg-primary-500/2">
                  Does Vue support TypeScript?
                </AccordionTrigger>

                <AccordionContent>
                  Yes. Vue provides first-class TypeScript support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </template>
        </Card>

        <!-- Multiple -->
        <Card
          :title="ACCORDION_DOC.multiple.title"
          :description="ACCORDION_DOC.multiple.description"
          :how-to-use="ACCORDION_DOC.multiple.howToUse"
          :header="ACCORDION_CODE_HEADER.template"
          :code="ACCORDION_MULTIPLE_CODE"
        >
          <template #preview>
            <Accordion type="multiple" class="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger class="bg-primary-500/2"> What is Vue? </AccordionTrigger>

                <AccordionContent>
                  Vue is a progressive JavaScript framework for building user interfaces.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger class="bg-primary-500/2"> What is Vite? </AccordionTrigger>

                <AccordionContent>
                  Vite is a modern frontend build tool that provides a fast development experience.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger class="bg-primary-500/2"> What is TypeScript? </AccordionTrigger>

                <AccordionContent>
                  TypeScript is a typed superset of JavaScript that adds static type checking.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </template>
        </Card>

        <!-- Default Open -->
        <Card
          :title="ACCORDION_DOC.defaultOpen.title"
          :description="ACCORDION_DOC.defaultOpen.description"
          :how-to-use="ACCORDION_DOC.defaultOpen.howToUse"
          :header="ACCORDION_CODE_HEADER.template"
          :code="ACCORDION_DEFAULT_OPEN_CODE"
        >
          <template #preview>
            <Accordion type="single" collapsible default-value="item-1" class="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger class="bg-primary-500/2"> Getting Started </AccordionTrigger>

                <AccordionContent>
                  This section is opened by default when the Accordion is rendered.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger class="bg-primary-500/2"> Installation </AccordionTrigger>

                <AccordionContent>
                  Install the required dependencies and import the Accordion components into your
                  application.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
