<script setup lang="ts">
import { ref } from "vue";
import OrderListItem from "../../../src/components/orders/OrderListItem.vue";
import { orders } from "./fixtures";

const selectedId = ref<string | null>(orders[1]?.identifier ?? null);

function select(identifier: string) {
  selectedId.value = identifier;
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <OrderListItem
      v-for="order in orders"
      :key="order.identifier"
      :order="order"
      :selected="selectedId === order.identifier"
      @select="select"
    />
  </div>
</template>
