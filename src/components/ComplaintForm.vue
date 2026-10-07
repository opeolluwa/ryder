<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { CreateComplaintPayload } from "../types/complaints";
import Input from "./Input.vue";
import Select from "./Select.vue";
import Textarea from "./Textarea.vue";
import Button from "./Button.vue";

const SUBJECT_MAX_LENGTH = 255;

const schema = v.object({
  subject: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Subject is required."),
    v.maxLength(SUBJECT_MAX_LENGTH, "Subject is too long."),
  ),
  description: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, "Tell us what went wrong."),
  ),
  orderIdentifier: v.optional(v.string()),
});

type Schema = v.InferOutput<typeof schema>;

withDefaults(
  defineProps<{
    loading: boolean;
    showActions?: boolean;
    orders?: Array<{ identifier: string; status?: string; itemsCount?: number }>;
    ordersLoading?: boolean;
    orderStatusLabel?: (status: any) => string;
    orderItemCount?: (order: any) => number;
  }>(),
  {
    showActions: true,
    orders: () => [],
    ordersLoading: false,
    orderStatusLabel: (status: any) => String(status ?? ""),
    orderItemCount: () => 0,
  },
);

const emit = defineEmits<{
  submit: [payload: CreateComplaintPayload];
  cancel: [];
}>();

const state = reactive<Schema>({
  subject: "",
  description: "",
  orderIdentifier: "",
});

const orderItems = computed(() =>
  props.orders.map((order: any) => ({
    label: `#${(order.identifier || "").slice(0, 8)} · ${props.orderItemCount(order)} items · ${props.orderStatusLabel(order.status)}`,
    value: order.identifier,
  })),
);

const shortOrder = computed(() =>
  (state.orderIdentifier || "").slice(0, 8),
);

function reset() {
  state.subject = "";
  state.description = "";
  state.orderIdentifier = "";
}

function onSubmit({ data }: FormSubmitEvent<Schema>) {
  emit("submit", {
    subject: data.subject,
    description: data.description,
    orderIdentifier: data.orderIdentifier || undefined,
  });
}

const uform = useTemplateRef<{ submit: () => void }>("uform");

function submit() {
  uform.value?.submit();
}

defineExpose({ reset, submit });
</script>

<template>
  <UForm
    ref="uform"
    class="space-y-5"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <div class="grid gap-5 sm:grid-cols-2">
      <Input
        v-model="state.subject"
        name="subject"
        label="Subject"
        placeholder="Damaged on arrival"
        :hint="`${state.subject.length}/${SUBJECT_MAX_LENGTH}`"
      />

      <Select
        v-model="state.orderIdentifier"
        name="orderIdentifier"
        label="Related order"
        :items="orderItems"
        :disabled="ordersLoading"
        placeholder="Select an order"
        hint="Optional"
      />
    </div>

    <p
      v-if="state.orderIdentifier"
      class="-mt-3 text-xs text-gray-400 dark:text-white/30"
    >
      We'll attach order #{{ shortOrder }} to this complaint.
    </p>

    <Textarea
      v-model="state.description"
      name="description"
      label="What happened?"
      placeholder="Describe the issue so we can look into it."
      :rows="6"
    />

    <div
      v-if="showActions"
      class="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-white/5"
    >
      <Button
        type="button"
        color="neutral"
        variant="ghost"
        @click="emit('cancel')"
      >
        Cancel
      </Button>

      <Button type="submit" :loading="loading" :disabled="loading">
        Submit complaint
      </Button>
    </div>
  </UForm>
</template>
