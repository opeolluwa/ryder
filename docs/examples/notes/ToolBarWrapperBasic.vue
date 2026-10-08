<script setup lang="ts">
import UIcon from "@nuxt/ui/components/Icon.vue";
import ToolBarWrapper from "../../../src/components/notes/ToolBarWrapper.vue";

const actions = [
  { label: "Undo", icon: "ri:arrow-go-back-line" },
  { label: "Bold", icon: "ri:bold" },
  { label: "Link", icon: "ri:link" },
  { label: "Emoji", icon: "ri:emotion-happy-line" },
];
</script>

<template>
  <div
    class="relative h-44 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 [transform:translateZ(0)] dark:border-white/10 dark:bg-white/5"
  >
    <p class="p-3 text-xs text-gray-500 dark:text-white/50">
      A fixed bottom bar. Inside this box it is pinned to the box rather than
      the viewport.
    </p>

    <ToolBarWrapper>
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        :title="action.label"
        :aria-label="action.label"
        class="flex size-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
      >
        <UIcon :name="action.icon" class="size-5" />
      </button>
    </ToolBarWrapper>
  </div>
</template>
