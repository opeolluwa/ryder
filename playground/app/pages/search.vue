<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  breadcrumb: { title: "Search" },
  back: true,
});

const route = useRoute();
const q = computed(() => String(route.query.q ?? ""));
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-semibold">Search results</h1>
    <p class="text-sm text-gray-500 dark:text-white/50">
      Query: <code class="font-mono">{{ q || "—" }}</code>
    </p>
  </div>
</template>
