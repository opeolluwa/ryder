<script setup lang="ts">
import OrderStatusBadge from "../../../src/components/orders/OrderStatusBadge.vue";
import { ORDER_STATUSES } from "../../../src/utils/orderStatus";
import type { OrderStatus } from "../../../src/types/orders";

const labels: Partial<Record<OrderStatus, string>> = {
  pending: "Awaiting payment",
  paid: "Settled",
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <OrderStatusBadge
        v-for="status in ORDER_STATUSES"
        :key="status"
        :status="status"
      />
      <OrderStatusBadge :status="null" />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <OrderStatusBadge status="pending" :labels="labels" />
      <OrderStatusBadge status="paid" :labels="labels" />
      <OrderStatusBadge status="fulfilled" :labels="labels" />
    </div>
  </div>
</template>
