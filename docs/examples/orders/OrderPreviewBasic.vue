<script setup lang="ts">
import { ref } from "vue";
import OrderPreview from "../../../src/components/orders/OrderPreview.vue";
import Button from "../../../src/components/primitives/Button.vue";
import { order } from "./fixtures";

const receipt = ref("");

function print(current: typeof order) {
  receipt.value = `Receipt queued for ${current.identifier}`;
}
</script>

<template>
  <OrderPreview :order="order">
    <template #actions="{ order: current }">
      <div
        class="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4 dark:border-white/5"
      >
        <Button variant="soft" color="neutral" @click="print(current)">
          Print receipt
        </Button>
        <Button @click="receipt = `Fulfilled ${current.identifier}`">
          Mark fulfilled
        </Button>
      </div>

      <p
        v-if="receipt"
        class="mt-2 text-right text-xs text-gray-500 dark:text-white/50"
      >
        {{ receipt }}
      </p>
    </template>
  </OrderPreview>
</template>
