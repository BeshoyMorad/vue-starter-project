<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Icon from '@/components/icon/Icon.vue';
  import { Field } from '@/components/form';

  const router = useRouter();
  const emit = defineEmits<{ close: [] }>();
  const searchQuery = ref('');
  const openSections = ref<Record<string, boolean>>({});
  const sidebarRoutes = computed(() => {
    const mainLayoutRoute = router.options.routes.find((route) => route.path === '/');
    if (!mainLayoutRoute?.children) return [];
    return mainLayoutRoute.children.filter((route) => route.meta?.sidebar !== false);
  });

  const filteredSidebarRoutes = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    if (!query) return sidebarRoutes.value;

    return sidebarRoutes.value
      .map((route) => {
        if (!route.children?.length) {
          return null;
        }
        const filteredChildren = route.children.filter((child) => {
          const title = String(child.meta?.title ?? '').toLowerCase();

          return title.includes(query);
        });

        if (!filteredChildren.length) return null;

        return {
          ...route,
          children: filteredChildren,
        };
      })
      .filter(Boolean);
  });

  const isSectionOpen = (section: string) => {
    if (searchQuery.value.trim()) return true;

    return openSections.value[section] ?? true;
  };

  const toggleSection = (section: string) => {
    openSections.value[section] = !isSectionOpen(section);
  };
</script>

<template>
  <aside
    class="bg-bg-surface border-primary-600/35 relative flex h-full h-screen w-64 shrink-0 flex-col border-r border-l"
  >
    <div class="px-4 pt-3">
      <Field.Text
        v-model="searchQuery"
        type="search"
        placeholder="Search..."
        icon="hugeicons--search-01"
        icon-position="left"
        test-id="sidebar-search"
      />
    </div>
    <nav
      class="[&::-webkit-scrollbar-thumb]:bg-primary-600/10 hover:[&::-webkit-scrollbar-thumb]:bg-primary-600/25 flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
    >
      <template v-for="route in filteredSidebarRoutes" :key="String(route?.path)">
        <section
          v-if="route?.children && route.children.length > 0"
          class="mt-2 flex flex-col gap-1"
        >
          <div class="flex h-9 items-center justify-between">
            <RouterLink
              :to="{ name: route.name }"
              class="plain-font flex flex-1 items-center"
              active-class="text-primary-600 font-semibold"
            >
              <Icon :icon="route.meta?.icon as string" class="text-primary-600 size-4" />

              <span
                class="text-text-tertiary px-3 text-[11px] font-semibold tracking-wider uppercase"
              >
                {{ route.meta?.title }}
              </span>
            </RouterLink>

            <button
              type="button"
              class="text-text-tertiary hover:bg-surface-secondary hover:text-text-primary flex size-8 items-center justify-center rounded-md transition-colors"
              @click="toggleSection(String(route.path))"
            >
              <span
                class="text-sm transition-transform duration-200"
                :class="{ 'rotate-180': isSectionOpen(String(route.path)) }"
              >
                <Icon icon="hugeicons--arrow-down-01" class="size-4" />
              </span>
            </button>
          </div>

          <div v-show="isSectionOpen(String(route.path))" class="mx-3 flex flex-col">
            <template v-for="child in route.children" :key="String(child.name)">
              <RouterLink
                v-if="child.meta?.sidebar === true"
                :to="{ name: child.name }"
                class="plain-font hover:text-text-primary font-inherit flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors"
                active-class="bg-primary-600/15 text-primary-600 font-semibold"
                @click="emit('close')"
              >
                {{ child.meta?.title }}
              </RouterLink>
            </template>
          </div>
        </section>
      </template>
    </nav>
  </aside>
</template>
