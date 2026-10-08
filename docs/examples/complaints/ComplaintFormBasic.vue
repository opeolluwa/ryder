<script setup lang="ts">
import { ref } from "vue";
import ComplaintForm from "../../../src/components/complaints/ComplaintForm.vue";
import { orders } from "./fixtures";
import type { CreateComplaintPayload } from "../../../src/types/complaints";

const loading = ref(false);
const lastSubmit = ref("—");

// Append the emitted payload so the demo output is visible under the form.
async function onSubmit(payload: CreateComplaintPayload) {
  lastSubmit.value = JSON.stringify(payload);
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  loading.value = false;
}
</script>

<template>
  <div class="max-w-2xl">
    <ComplaintForm
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
