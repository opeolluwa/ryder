<script setup lang="ts">
import { kApp } from "konsta/vue";
import { usePlatform } from "../../src/composables/usePlatform";

const { framework7Theme } = usePlatform();
</script>

<template>
  <UApp :toaster="{ position: 'top-right', progress: true, duration: 2500 }">
    <kApp :theme="framework7Theme">
      <NuxtLayout>
        <NuxtPage :key="$route.fullPath" />
      </NuxtLayout>
    </kApp>
  </UApp>
</template>
