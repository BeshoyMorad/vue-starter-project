<script setup lang="ts">
import { useDarkTheme } from "@/composables";
import { Toaster } from "@/components/ui/sonner";

useDarkTheme();
</script>

<template>
  <RouterView />

  <Toaster />
</template>
