```vue
<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    paths: Record<string, string>;
    title: string;
    description: string;
    footer: string;
  }>();

  const router = useRouter();

  const componentRoutes = computed(() => {
    const componentRoute = router
      .getRoutes()
      .find((route) => route.name === props.paths.root && route.children.length > 0);

    return componentRoute?.children.filter((route) => route.meta?.sidebar === true) ?? [];
  });
</script>

<template>
  <div class="mx-auto w-full space-y-8 px-4 sm:px-6 lg:px-8">
    <!-- Page Header -->
    <section class="space-y-2">
      <h1 class="text-text-primary heading-font text-3xl font-bold tracking-tight">
        {{ title }}
      </h1>

      <p class="text-text-secondary max-w-2xl text-sm leading-6">
        {{ description }}
      </p>
    </section>

    <!-- Routes Grid -->
    <section>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="route in componentRoutes"
          :key="String(route.name)"
          :to="{ name: route.name }"
          class="border-border-base/50 hover:border-primary-600/40 hover:bg-surface-secondary group flex min-h-40 flex-col rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
        >
          <div class="flex items-center justify-between gap-4">
            <h2
              class="text-text-primary group-hover:text-primary-600 text-sm font-semibold transition-colors"
            >
              {{ route.meta?.title }}
            </h2>

            <span
              class="text-text-tertiary group-hover:text-primary-600 text-base transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </div>

          <p class="text-text-secondary mt-3 text-sm leading-5">
            view documentation and usage examples for {{ route.meta?.title }}
          </p>

          <div class="text-text-tertiary mt-auto pt-5 text-xs font-medium">
            {{ footer }}
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
```
