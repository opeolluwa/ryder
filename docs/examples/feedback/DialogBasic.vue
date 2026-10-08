<script setup lang="ts">
import { ref } from "vue";
import Dialog from "../../../src/components/feedback/Dialog.vue";

const open = ref(false);
const status = ref("");
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        @click="open = true"
      >
        Open dialog
      </button>

      <span class="text-sm text-gray-500 dark:text-white/50">
        Last event: {{ status || "—" }}
      </span>
    </div>

    <Dialog
      v-model:open="open"
      title="Delete draft?"
      description="The draft is removed from your list."
      size="md"
      @after:leave="status = 'after:leave'"
    >
      <template #body>
        <p class="text-sm text-gray-500 dark:text-white/50">
          Above 1024px this is a Nuxt UI modal; below that the same component
          collapses into a konsta bottom sheet that draws its own header from
          <code class="font-mono">title</code> /
          <code class="font-mono">description</code>.
        </p>
      </template>

      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <button
            type="button"
            class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
            @click="open = false"
          >
            Cancel
          </button>

          <button
            type="button"
            class="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
            @click="status = 'confirmed'; open = false"
          >
            Confirm
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
