<script setup lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '@/components';
  import Card from '@/components/card/ExampleCard.vue';

  import {
    AVATAR_IMPORT_CODE,
    AVATAR_BASIC_CODE,
    AVATAR_FALLBACK_CODE,
    AVATAR_SIZE_CODE,
    AVATAR_USER_CODE,
    AVATAR_DOC,
    AVATAR_CODE_HEADER,
  } from '../constants/constants';
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ AVATAR_DOC.title }}
      </h1>

      <p class="text-text-secondary text-sm leading-6">
        {{ AVATAR_DOC.description }}
      </p>
    </section>

    <!-- Import -->
    <Card
      title="Import"
      description="Import the Avatar components from the shared components library."
      :code="AVATAR_IMPORT_CODE"
      :header="AVATAR_CODE_HEADER.import"
      :show-preview="false"
    />

    <!-- Examples -->
    <section class="space-y-4">
      <div>
        <h2 class="text-text-primary text-xl font-semibold">{{ AVATAR_DOC.examples.title }}</h2>

        <p class="text-text-secondary mt-1 text-sm">
          {{ AVATAR_DOC.examples.description }}
        </p>
      </div>

      <div class="space-y-5">
        <!-- Basic -->
        <Card
          :title="AVATAR_DOC.basic.title"
          :description="AVATAR_DOC.basic.description"
          :how-to-use="AVATAR_DOC.basic.howToUse"
          :header="AVATAR_CODE_HEADER.template"
          :code="AVATAR_BASIC_CODE"
        >
          <template #preview>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User avatar" />

              <AvatarFallback> {{ AVATAR_DOC.basic.fallback }} </AvatarFallback>
            </Avatar>
          </template>
        </Card>

        <!-- Fallback -->
        <Card
          :title="AVATAR_DOC.fallback.title"
          :description="AVATAR_DOC.fallback.description"
          :how-to-use="AVATAR_DOC.fallback.howToUse"
          :code="AVATAR_FALLBACK_CODE"
          :header="AVATAR_CODE_HEADER.template"
        >
          <template #preview>
            <Avatar>
              <AvatarFallback class="bg-primary-500 text-white">
                {{ AVATAR_DOC.fallback.fallback }}
              </AvatarFallback>
            </Avatar>
          </template>
        </Card>

        <!-- Custom Size -->
        <Card
          :title="AVATAR_DOC.size.title"
          :description="AVATAR_DOC.size.description"
          :how-to-use="AVATAR_DOC.size.howToUse"
          :header="AVATAR_CODE_HEADER.template"
          :code="AVATAR_SIZE_CODE"
        >
          <template #preview>
            <div class="flex items-center gap-4">
              <Avatar class="size-8">
                <AvatarImage
                  :src="AVATAR_DOC.size.image.src"
                  :alt="AVATAR_DOC.size.image.small.alt"
                />

                <AvatarFallback>
                  {{ AVATAR_DOC.size.image.small.fallback }}
                </AvatarFallback>
              </Avatar>

              <Avatar class="size-12">
                <AvatarImage
                  :src="AVATAR_DOC.size.image.src"
                  :alt="AVATAR_DOC.size.image.medium.alt"
                />

                <AvatarFallback>
                  {{ AVATAR_DOC.size.image.medium.fallback }}
                </AvatarFallback>
              </Avatar>

              <Avatar class="size-16">
                <AvatarImage
                  :src="AVATAR_DOC.size.image.src"
                  :alt="AVATAR_DOC.size.image.large.alt"
                />

                <AvatarFallback>
                  {{ AVATAR_DOC.size.image.large.fallback }}
                </AvatarFallback>
              </Avatar>
            </div>
          </template>
        </Card>

        <!-- User Profile -->
        <Card
          :title="AVATAR_DOC.user.title"
          :description="AVATAR_DOC.user.description"
          :how-to-use="AVATAR_DOC.user.howToUse"
          :code="AVATAR_USER_CODE"
          :header="AVATAR_CODE_HEADER.template"
        >
          <template #preview>
            <div class="flex items-center gap-3">
              <Avatar class="size-12">
                <AvatarImage :src="AVATAR_DOC.user.image.src" :alt="AVATAR_DOC.user.image.alt" />

                <AvatarFallback>
                  {{ AVATAR_DOC.user.fallback }}
                </AvatarFallback>
              </Avatar>

              <div>
                <p class="text-text-primary font-medium">
                  {{ AVATAR_DOC.user.name }}
                </p>

                <p class="text-text-secondary text-sm">
                  {{ AVATAR_DOC.user.email }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>
