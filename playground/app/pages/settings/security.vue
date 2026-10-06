<script setup lang="ts">
definePageMeta({
  layout: "settings",
  breadcrumb: { title: "Security" },
  back: true,
});
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-semibold">Security</h1>
    <p class="text-sm text-gray-500 dark:text-white/50">
      Nested tab — `settingsTabForPath` keeps this tab highlighted under
      <code class="font-mono">/settings/security</code>.
    </p>
    <SharedInput
      label="Current password"
      name="currentPassword"
      type="password"
    />
  </div>
</template>
