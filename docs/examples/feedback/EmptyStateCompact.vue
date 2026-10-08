<script setup lang="ts">
import { ref } from "vue";
import EmptyState from "../../../src/components/feedback/EmptyState.vue";

const status = ref("");
</script>

<template>
  <div class="space-y-3">
    <EmptyState
      compact
      icon="heroicons:chat-bubble-left-right"
      title="No replies yet"
      description="Replies from your team show up here."
      action-label="Start a reply"
      :ui="{
        root: 'rounded-xl border border-dashed border-gray-200 dark:border-white/10',
        iconWrapper: 'ring-1 ring-primary-300/70',
        description: 'font-medium',
      }"
      @action="status = 'action emitted'"
    />

    <p class="text-center text-xs text-gray-400 dark:text-white/30">
      Last event: {{ status || "—" }}
    </p>
  </div>
</template>
