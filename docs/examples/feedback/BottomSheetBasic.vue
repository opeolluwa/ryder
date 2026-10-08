<script setup lang="ts">
import { ref } from "vue";
import BottomSheet from "../../../src/components/feedback/BottomSheet.vue";

const open = ref(false);
</script>

<template>
  <div class="space-y-3">
    <button
      type="button"
      class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
      @click="open = true"
    >
      Open bottom sheet
    </button>

    <BottomSheet
      v-model:open="open"
      title="Archive orders"
      description="Archived orders leave the active list."
      submit-label="Archive"
      @submit="open = false"
      @cancel="open = false"
    >
      <p class="text-sm text-gray-500 dark:text-white/50">
        Body content scrolls between the fixed header and the footer row.
      </p>

      <p class="pt-2 text-sm text-gray-500 dark:text-white/50">
        Tapping the backdrop (or the X) emits
        <code class="font-mono">cancel</code> and closes the sheet on its own.
      </p>
    </BottomSheet>
  </div>
</template>
