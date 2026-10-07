<script setup lang="ts">
import {
  orderStatusBadgeClass,
  orderStatusLabel,
} from "../../utils/orderStatus";
import type { OrderStatus } from "../../types/orders";

defineProps<{
  status: OrderStatus | null;
  /** Consumer override for the status label text (see `orderStatusLabel`). */
  labels?: Partial<Record<OrderStatus, string>>;
}>();
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase"
    :class="orderStatusBadgeClass(status)"
  >
    {{ orderStatusLabel(status, labels) }}
  </span>
</template>