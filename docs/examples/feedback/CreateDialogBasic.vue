<script setup lang="ts">
import { ref } from "vue";
import CreateDialog from "../../../src/components/feedback/CreateDialog.vue";

const open = ref(false);
const name = ref("");
const status = ref("");

function onSubmit() {
  status.value = `created "${name.value}"`;
  open.value = false;
  name.value = "";
}

function onCancel() {
  status.value = "cancelled";
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-3">
      <button
        type="button"
        class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        @click="open = true"
      >
        Create thing
      </button>

      <span class="text-sm text-gray-500 dark:text-white/50">
        Last event: {{ status || "—" }}
      </span>
    </div>

    <CreateDialog
      v-model:open="open"
      title="Create thing"
      description="A modal on desktop, a konsta bottom sheet below 1024px."
      submit-label="Create"
      :submit-disabled="name.trim() === ''"
      @submit="onSubmit"
      @cancel="onCancel"
    >
      <label class="block text-sm font-medium text-gray-700 dark:text-white/80">
        Name
        <input
          v-model="name"
          type="text"
          placeholder="Name"
          class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-white/10"
        />
      </label>

      <p class="pt-2 text-xs text-gray-500 dark:text-white/40">
        Submit stays disabled until the field is filled.
      </p>
    </CreateDialog>
  </div>
</template>
