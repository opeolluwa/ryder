<script setup lang="ts">
definePageMeta({
  layout: "settings",
  breadcrumb: { title: "Settings" },
});
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">Profile</h1>
    <p class="text-sm text-gray-500 dark:text-white/50">
      Default tab — rendered through `RyderSettings` inside the shell.
    </p>
    <RyderInput label="Display name" name="displayName" placeholder="Name" />
  </div>
</template>
