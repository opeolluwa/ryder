<script setup lang="ts">
import { ref } from "vue";
import MessagingForm from "../../../src/components/messaging/MessagingForm.vue";
import { orders } from "./fixtures";
import type { CreateConversationPayload } from "../../../src/types/messaging";

const loading = ref(false);
const lastPayload = ref<CreateConversationPayload | null>(null);
const lastEvent = ref("—");

function orderStatusLabel(status: string) {
  return status.replace(/_/g, " ");
}

function orderItemCount(order: { itemsCount?: number }) {
  return order.itemsCount ?? 0;
}

async function onSubmit(payload: CreateConversationPayload) {
  lastPayload.value = payload;
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  loading.value = false;
  lastEvent.value = `submitted "${payload.subject}"`;
}

function onCancel() {
  lastEvent.value = "cancelled";
}
</script>

<template>
  <div class="space-y-4">
    <MessagingForm
      :loading="loading"
      :orders="orders"
      :order-status-label="orderStatusLabel"
      :order-item-count="orderItemCount"
      @submit="onSubmit"
      @cancel="onCancel"
    />

    <p class="text-xs text-gray-500 dark:text-white/40">
      Last event: {{ lastEvent }}
    </p>

    <pre
      v-if="lastPayload"
      class="overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs dark:bg-white/5"
    >{{ JSON.stringify(lastPayload, null, 2) }}</pre>
  </div>
</template>
