<script setup lang="ts">
import { ref } from "vue";
import ComplaintCreateDialog from "../../../src/components/complaints/ComplaintCreateDialog.vue";
import { orders } from "./fixtures";
import type { CreateComplaintPayload } from "../../../src/types/complaints";

const open = ref(false);
const loading = ref(false);
const lastSubmit = ref("—");

// The dialog stays open until the (simulated) POST lands, then closes itself.
async function onSubmit(payload: CreateComplaintPayload) {
  lastSubmit.value = JSON.stringify(payload);
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  loading.value = false;
  open.value = false;
}
</script>

<template>
  <div>
    <button
      type="button"
      class="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-gray-900"
      @click="open = true"
    >
      New complaint
    </button>

    <ComplaintCreateDialog
      v-model:open="open"
      :loading="loading"
      :orders="orders"
      @submit="onSubmit"
      @cancel="lastSubmit = 'cancel'"
    />

    <p class="mt-3 text-xs text-gray-500 dark:text-white/40">
      Last submit: {{ lastSubmit }}
    </p>
  </div>
</template>
