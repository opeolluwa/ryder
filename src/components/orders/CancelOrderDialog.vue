<script setup lang="ts">
import { computed } from "vue";
import Dialog from "../feedback/Dialog.vue";
import Button from "../primitives/Button.vue";
import { formatPrice } from "../../utils/formatPrice";
import type { Order } from "../../types/orders";

const open = defineModel<boolean>("open", { default: false });

const props = withDefaults(
  defineProps<{
    order: Order | null;
    loading: boolean;
    formatMoney?: (amount: string | number, currency: string) => string;
  }>(),
  {
    formatMoney: formatPrice,
  },
);

const emit = defineEmits<{
  confirm: [identifier: string];
}>();

/**
 * What the cancellation actually stops, stated before it happens: an admin
 * should not have to open the order to find out what is about to be called off.
 */
const impact = computed(() => {
  const order = props.order;

  if (!order) return [];

  const units = order.items.reduce((sum, item) => sum + item.quantity, 0);

  const lines = [
    `${order.items.length} line${order.items.length === 1 ? "" : "s"}`,
    `${units} unit${units === 1 ? "" : "s"}`,
  ];

  if (order.paymentReference) {
    lines.push("a recorded payment, which will need refunding separately");
  }

  if (order.delivery) {
    lines.push("a delivery address that may already be in transit");
  }

  return lines;
});

const total = computed(() => {
  const order = props.order;

  if (!order || order.items.length === 0) return "—";

  const currency = order.items[0]?.price?.currency;
  const sum = order.items.reduce((acc, item) => {
    const amount = Number(item.price?.amount);
    return acc + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  return props.formatMoney(sum, currency);
});

function onConfirm() {
  if (!props.order) return;

  emit("confirm", props.order.identifier);
}
</script>

<template>
  <Dialog
    v-model:open="open"
    title="Cancel this order?"
    description="The customer sees the order as cancelled. This cannot be undone from the console."
  >
    <template #body>
      <div class="space-y-4">
        <div
          v-if="order"
          class="flex items-baseline justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm dark:bg-white/5"
        >
          <span class="font-mono text-xs text-gray-500 dark:text-white/40">
            #{{ order.identifier }}
          </span>

          <span class="font-medium text-gray-900 dark:text-white">
            {{ total }}
          </span>
        </div>

        <div v-if="impact.length > 0" class="space-y-1.5">
          <p class="text-xs font-medium text-gray-500 dark:text-white/40">
            This order has
          </p>

          <ul class="space-y-1">
            <li
              v-for="line in impact"
              :key="line"
              class="text-xs text-gray-500 dark:text-white/40"
            >
              {{ line }}
            </li>
          </ul>
        </div>

        <div class="flex justify-end gap-2">
          <Button color="neutral" variant="soft" @click="open = false">
            Keep order
          </Button>

          <Button
            color="error"
            :loading="loading"
            :disabled="loading || !order"
            @click="onConfirm"
          >
            Cancel order
          </Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>