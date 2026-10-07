<script setup lang="ts">
import { useTemplateRef } from "vue";
import type { CreateComplaintPayload } from "../../types/complaints";
import CreateDialog from "../feedback/CreateDialog.vue";
import ComplaintForm from "./ComplaintForm.vue";

const open = defineModel<boolean>("open", { default: false });

defineProps<{
  loading: boolean;
  orders?: Array<{ identifier: string; status?: string; itemsCount?: number }>;
  ordersLoading?: boolean;
  orderStatusLabel?: (status: any) => string;
  orderItemCount?: (order: any) => number;
}>();

const emit = defineEmits<{
  submit: [payload: CreateComplaintPayload];
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
    title="New complaint"
    description="Tell us what went wrong and we'll look into it."
    submit-label="Submit complaint"
    :loading="loading"
    @cancel="onCancel"
    @submit="submitForm"
  >
    <ComplaintForm
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
