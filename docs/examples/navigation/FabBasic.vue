<script setup lang="ts">
import { ref } from "vue";
import Fab from "../../../src/components/navigation/Fab.vue";

const clicks = ref(0);
const useSlot = ref(false);
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap items-center gap-3">
      <span class="text-sm text-gray-500 dark:text-white/50">
        Clicks: {{ clicks }}
      </span>

      <button
        type="button"
        class="text-sm font-medium text-primary-600 underline"
        @click="useSlot = !useSlot"
      >
        {{ useSlot ? "Use icon prop" : "Use default slot" }}
      </button>
    </div>

    <p class="text-xs text-gray-400 dark:text-white/30">
      Fixed to the bottom-right of the viewport and hidden at 1024px and up —
      narrow the window to see it.
    </p>

    <Fab v-if="!useSlot" @click="clicks += 1" />
    <Fab v-else @click="clicks += 1">
      <span class="text-lg leading-none">★</span>
    </Fab>
  </div>
</template>