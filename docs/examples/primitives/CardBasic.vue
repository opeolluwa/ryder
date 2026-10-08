<script setup lang="ts">
import Card from "../../../src/components/primitives/Card.vue";
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Card title="Simple Card">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        This is the card content.
      </p>
    </Card>
    <Card>
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">Custom Header</span>
        </div>
      </template>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        With custom header slot.
      </p>
      <template #trailing>
        <span class="text-xs text-gray-500">v1.0.0</span>
      </template>
    </Card>
  </div>
</template>
