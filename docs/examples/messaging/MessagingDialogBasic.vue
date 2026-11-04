<script setup lang="ts">
import { ref } from "vue";
import MessagingDialog from "../../../src/components/messaging/MessagingDialog.vue";
import { orders } from "./fixtures";
import type { CreateConversationPayload } from "../../../src/types/messaging";

const open = ref(false);
const loading = ref(false);
const submitted = ref<CreateConversationPayload | null>(null);
const lastEvent = ref("—");

function orderStatusLabel(status: string) {
  return status.replace(/_/g, " ");
}

function orderItemCount(order: { itemsCount?: number }) {
  return order.itemsCount ?? 0;
}

async function onSubmit(payload: CreateConversationPayload) {
  submitted.value = payload;
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  loading.value = false;
  open.value = false;
  lastEvent.value = `submitted "${payload.subject}"`;
}

function onCancel() {
  lastEvent.value = "cancelled";
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
        Open MessagingDialog
      </button>

      <span class="text-sm text-gray-500 dark:text-white/50">
        Last event: {{ lastEvent }}
      </span>
    </div>

    <MessagingDialog
      v-model:open="open"
      :loading="loading"
      :orders="orders"
      :order-status-label="orderStatusLabel"
      :order-item-count="orderItemCount"
      @submit="onSubmit"
      @cancel="onCancel"
    />

    <pre
      v-if="submitted"
      class="overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs dark:bg-white/5"
    >{{ JSON.stringify(submitted, null, 2) }}</pre>
  </div>
</template>
