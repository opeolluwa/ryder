<script setup lang="ts">
import { useTemplateRef } from "vue";
import type { CreateConversationPayload } from "../../types/messaging";
import CreateDialog from "../feedback/CreateDialog.vue";
import MessagingForm from "./MessagingForm.vue";

const open = defineModel<boolean>("open", { default: false });

defineProps<{
  loading: boolean;
  orders?: Array<{ identifier: string; status?: string; itemsCount?: number }>;
  ordersLoading?: boolean;
  orderStatusLabel?: (status: any) => string;
  orderItemCount?: (order: any) => number;
}>();

const emit = defineEmits<{
  submit: [payload: CreateConversationPayload];
  cancel: [];
}>();

const form = useTemplateRef<{ reset: () => void; submit: () => void }>("form");

function reset() {
  form.value?.reset();
}

function submitForm() {
  form.value?.submit();
}

function onCancel() {
  open.value = false;
  reset();
  emit("cancel");
}

defineExpose({ reset });
</script>

<template>
  <CreateDialog
    v-model:open="open"
    title="New conversation"
    description="Tell us what went wrong and we'll look into it."
    submit-label="Submit"
    :loading="loading"
    @cancel="onCancel"
    @submit="submitForm"
  >
    <MessagingForm
      ref="form"
      :loading="loading"
      :show-actions="false"
      :orders="orders"
      :orders-loading="ordersLoading"
      :order-status-label="orderStatusLabel"
      :order-item-count="orderItemCount"
      @submit="emit('submit', $event)"
    />
  </CreateDialog>
</template>
