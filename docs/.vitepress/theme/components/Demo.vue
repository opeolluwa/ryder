<script setup lang="ts">
import { onMounted, ref } from "vue";

// Bordered stage that hosts a live component demo inside a docs page.
// Demos mount client-side only: several kit components (konsta sheets,
// dialogs, route-aware nav) are unsafe to render on the server.
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div
    class="not-prose my-4 min-h-16 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-left dark:border-white/10 dark:bg-onyx-700"
  >
    <slot v-if="mounted" />
  </div>
</template>
