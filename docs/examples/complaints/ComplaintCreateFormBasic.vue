<script setup lang="ts">
import { ref } from "vue";
import ComplaintCreateForm from "../../../src/components/complaints/ComplaintCreateForm.vue";
import { orders } from "./fixtures";
import type { CreateComplaintPayload } from "../../../src/types/complaints";

const loading = ref(false);
const lastSubmit = ref("—");

async function onSubmit(payload: CreateComplaintPayload) {
  lastSubmit.value = JSON.stringify(payload);
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  loading.value = false;
}
</script>

<template>
  <div class="max-w-2xl">
    <ComplaintCreateForm
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
