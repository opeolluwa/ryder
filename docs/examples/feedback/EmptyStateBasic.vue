<script setup lang="ts">
import { ref } from "vue";
import EmptyState from "../../../src/components/feedback/EmptyState.vue";

const actionCount = ref(0);

function onAction() {
  actionCount.value += 1;
}
</script>

<template>
  <div class="space-y-3">
    <EmptyState
      icon="heroicons:magnifying-glass"
      title="Nothing matched"
      description="Adjust the filters and try again."
      action-label="Clear filters"
      @action="onAction"
    />

    <p class="text-center text-xs text-gray-400 dark:text-white/30">
      <code class="font-mono">action</code> emitted {{ actionCount }} time(s).
    </p>
  </div>
</template>
