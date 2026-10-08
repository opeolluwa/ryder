<script setup lang="ts">
import { ref } from "vue";
import Dialog from "../../../src/components/feedback/Dialog.vue";

const open = ref(false);
</script>

<template>
  <div class="space-y-3">
    <button
      type="button"
      class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
      @click="open = true"
    >
      Open scrollable dialog
    </button>

    <Dialog
      v-model:open="open"
      scrollable
      size="xl"
      title="Terms of service"
      description="Scroll the body — the header and footer stay put."
    >
      <template #header="{ close }">
        <div class="flex w-full items-center justify-between gap-3">
          <span class="text-sm font-semibold">Custom header</span>

          <button
            type="button"
            aria-label="Close"
            class="rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
            @click="close()"
          >
            Dismiss
          </button>
        </div>
      </template>

      <template #body>
        <div class="space-y-3">
          <p class="text-sm text-gray-500 dark:text-white/50">
            The <code class="font-mono">scrollable</code> prop keeps the header
            and footer pinned while the body scrolls — desktop only; the mobile
            sheet always scrolls its body.
          </p>

          <p class="text-sm text-gray-500 dark:text-white/50">
            1. These paragraphs exist only to make the body taller than the
            modal, so the scroll behaviour is visible in the demo.
          </p>

          <p class="text-sm text-gray-500 dark:text-white/50">
            2. On desktop every slot receives a <code class="font-mono">close</code>
            function, so a header or footer button can dismiss the overlay
            without any local state.
          </p>

          <p class="text-sm text-gray-500 dark:text-white/50">
            3. Below 1024px the sheet branch forwards the same slots without
            props, which is why the footer button below uses
            <code class="font-mono">close?.()</code>.
          </p>

          <p class="text-sm text-gray-500 dark:text-white/50">
            4. The <code class="font-mono">header</code> slot itself is
            desktop-only: the sheet builds its own header out of
            <code class="font-mono">title</code> and
            <code class="font-mono">description</code>.
          </p>

          <p class="text-sm text-gray-500 dark:text-white/50">
            5. Keep filling this pane until it scrolls — that is the whole point
            of the example.
          </p>
        </div>
      </template>

      <template #footer="{ close }">
        <div class="flex w-full justify-end gap-2">
          <button
            type="button"
            class="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
            @click="close?.()"
          >
            Done
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
