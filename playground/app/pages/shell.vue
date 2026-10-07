<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "dashboard",
  breadcrumb: { title: "Shell demo" },
});

const count = ref(0);
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">Shell layout</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-white/50">
        The console's dashboard chrome: sidebar, search (⌘F), bell, theme
        toggle, avatar menu, breadcrumbs, offline banner.
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <RyderButton @click="count++">Clicked {{ count }} times</RyderButton>

      <RyderButton variant="outline" color="neutral">
        <NuxtLink to="/settings">Go to settings</NuxtLink>
      </RyderButton>
    </div>

    <div
      class="rounded-2xl border border-gray-100 bg-white p-6 dark:border-white/10 dark:bg-onyx-600"
    >
      <p class="text-sm text-gray-500 dark:text-white/50">
        Try the header search — it submits to
        <code class="font-mono">/search?q=…</code>, and toggling your network
        swaps the page body for the offline state.
      </p>
    </div>
  </div>
</template>
