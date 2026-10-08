<script setup lang="ts">
import { ref } from "vue";
import PullToRefresh from "../../../src/components/notes/PullToRefresh.vue";

const refreshed = ref(0);

function onRefresh() {
  refreshed.value += 1;
}
</script>

<template>
  <div class="space-y-2">
    <p class="text-xs text-gray-500 dark:text-white/50">
      Touch-only — pull down from the top of the box. Refreshed
      {{ refreshed }} time(s).
    </p>

    <div
      class="h-48 overflow-y-auto rounded-xl border border-gray-200 dark:border-white/10"
    >
      <PullToRefresh @refresh="onRefresh">
        <div class="divide-y divide-gray-100 dark:divide-white/5">
          <p
            v-for="row in 12"
            :key="row"
            class="px-4 py-3 text-sm text-gray-600 dark:text-white/60"
          >
            Row {{ row }} — pull down from the top to refresh.
          </p>
        </div>
      </PullToRefresh>
    </div>
  </div>
</template>
