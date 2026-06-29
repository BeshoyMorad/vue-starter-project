<script setup lang="ts">
  import { usePermissionStore } from '@/stores/permissions';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  interface Tab {
    name: string;
    routeName: string;
    permission?: CanPermission<Models>;
  }

  interface Props {
    tabs: Tab[];
    modelValue?: string;
    mode?: 'route' | 'state';
  }

  const props = withDefaults(defineProps<Props>(), {
    mode: 'state',
    modelValue: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const router = useRouter();
  const route = useRoute();
  const { can } = usePermissionStore();

  const activeTab = computed(() => {
    if (props.mode === 'route') {
      return route.name;
    }
    return props.modelValue;
  });

  const handleTabClick = (tab: Tab) => {
    if (props.mode === 'route') {
      router.push({ name: tab.routeName });
    } else if (props.mode === 'state') {
      emit('update:modelValue', tab.routeName);
    }
  };

  const isActive = (tab: Tab) => tab.routeName === activeTab.value;

  const getTestId = (tab: Tab) => `nav-tab-${tab.name.replace(/\s/g, '-').toLowerCase()}`;
</script>

<template>
  <div class="text-txt-default bg-background-surface-3 mb-4 flex w-fit rounded-lg text-sm">
    <button
      v-for="tab in tabs.filter((tab) => (tab.permission ? can(tab.permission) : true))"
      :key="tab.routeName"
      :data-test-id="getTestId(tab)"
      class="min-w-40 cursor-pointer rounded-lg px-6 py-3 whitespace-nowrap transition-colors duration-200"
      :class="{
        'bg-primary text-foreground-base': isActive(tab),
      }"
      @click="handleTabClick(tab)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>
