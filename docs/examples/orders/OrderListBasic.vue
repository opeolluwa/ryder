<script setup lang="ts">
import { computed, ref } from "vue";
import OrderList from "../../../src/components/orders/OrderList.vue";
import { orders } from "./fixtures";
import type { OrderListTab } from "../../../src/types/orders";

const tabs: OrderListTab[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "cancelled", label: "Cancelled" },
];

const activeTab = ref("all");
const selectedId = ref<string | null>(orders[0]?.identifier ?? null);

const rows = computed(() =>
  activeTab.value === "all"
    ? orders
    : orders.filter((order) => order.status === activeTab.value),
);
</script>

<template>
  <OrderList
    :rows="rows"
    :loading="false"
    :tabs="tabs"
    :active-tab="activeTab"
    :selected-id="selectedId"
    @update:active-tab="activeTab = $event"
    @select="selectedId = $event"
  />
</template>
